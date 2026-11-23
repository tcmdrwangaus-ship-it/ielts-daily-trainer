(() => {
  "use strict";

  const STORAGE_KEY = "ielts_micro_learning_v1";
  const SYNC_ID_STORAGE_KEY = "ielts_sync_id_v1";
  const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri"];
  const CLIENT_INSTANCE_ID = `c_${Math.random().toString(36).slice(2, 10)}`;

  // =========================================
  // Firebase Realtime Database Config
  // =========================================
  const firebaseConfig = {
    databaseURL: "https://ielts-daily-trainer-default-rtdb.firebaseio.com"
  };

  // =========================================
  // State Management & localStorage + Firebase
  // =========================================
  function getTodayDateKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function getDefaultDayKey() {
    const dayIndex = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat
    if (dayIndex >= 1 && dayIndex <= 5) {
      return DAY_ORDER[dayIndex - 1];
    }
    return "mon";
  }

  function getDefaultState() {
    return {
      completedDays: {},
      answers: {},
      writingDrafts: {},
      speakingDone: {},
      wrongNotes: [],
      dailyStudySeconds: {},
      lastWeekNumber: curriculumData.weeks[0].weekNumber,
      lastDayKey: getDefaultDayKey()
    };
  }

  function normalizeState(parsed) {
    if (!parsed || typeof parsed !== "object") return getDefaultState();
    const validWeek = curriculumData.weeks.some(
      (w) => w.weekNumber === parsed.lastWeekNumber
    )
      ? parsed.lastWeekNumber
      : curriculumData.weeks[0].weekNumber;
    const validDay = DAY_ORDER.includes(parsed.lastDayKey)
      ? parsed.lastDayKey
      : getDefaultDayKey();
    return {
      completedDays: parsed.completedDays || {},
      answers: parsed.answers || {},
      writingDrafts: parsed.writingDrafts || {},
      speakingDone: parsed.speakingDone || {},
      wrongNotes: Array.isArray(parsed.wrongNotes) ? parsed.wrongNotes : [],
      dailyStudySeconds: parsed.dailyStudySeconds || {},
      lastWeekNumber: validWeek,
      lastDayKey: validDay
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return normalizeState(JSON.parse(raw));
      }
    } catch (e) {
      console.warn("localStorage load failed:", e);
    }
    return getDefaultState();
  }

  let appState = loadState();
  let currentWeekNumber = appState.lastWeekNumber;
  let currentDayKey = appState.lastDayKey;

  // Sync State
  let currentSyncId = "";
  let syncEventSource = null;
  let syncPushTimeout = null;

  function saveState(skipRemote = false) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn("localStorage save failed:", e);
    }
    if (!skipRemote && currentSyncId) {
      scheduleFirebasePush();
    }
  }

  // Study Timer State
  let timerRunning = true;
  let timerIntervalId = null;

  // TTS State
  let ttsRate = 1.0;
  let isPlayingDialogue = false;
  let activeSpeakingTts = null; // { qid, rate }
  let ttsStopRequested = false;
  let activeUtterance = null;
  let cachedVoices = [];

  // Speaking Countdown Timer State
  let activeSpeakingTimerId = null;

  // =========================================
  // DOM Elements
  // =========================================
  const weekSelector = document.getElementById("weekSelector");
  const studyTimerDisplay = document.getElementById("studyTimerDisplay");
  const milestone5m = document.getElementById("milestone5m");
  const milestone10m = document.getElementById("milestone10m");
  const timerToggleBtn = document.getElementById("timerToggleBtn");
  const resetProgressBtn = document.getElementById("resetProgressBtn");

  const syncIdInput = document.getElementById("syncIdInput");
  const syncConnectBtn = document.getElementById("syncConnectBtn");
  const syncStatusBadge = document.getElementById("syncStatusBadge");

  const streakCountText = document.getElementById("streakCountText");
  const weeklyGoalSub = document.getElementById("weeklyGoalSub");
  const weeklyProgressBarTrack = document.getElementById("weeklyProgressBarTrack");
  const weeklyProgressBarFill = document.getElementById("weeklyProgressBarFill");
  const streakBadgesEl = document.getElementById("streakBadges");

  const wrongNotesToggleBtn = document.getElementById("wrongNotesToggleBtn");
  const wrongCountBadge = document.getElementById("wrongCountBadge");
  const wrongNotesPanel = document.getElementById("wrongNotesPanel");
  const wrongNotesList = document.getElementById("wrongNotesList");
  const closeWrongNotesBtn = document.getElementById("closeWrongNotesBtn");
  const clearWrongNotesBtn = document.getElementById("clearWrongNotesBtn");

  const dayTabsEl = document.getElementById("dayTabs");
  const completionBanner = document.getElementById("completionBanner");
  const completionMessage = document.getElementById("completionMessage");
  const completionDayScore = document.getElementById("completionDayScore");
  const completionWeeklyRate = document.getElementById("completionWeeklyRate");
  const nextDayBtn = document.getElementById("nextDayBtn");
  const lessonContainer = document.getElementById("lessonContainer");

  const wordDictBackdrop = document.getElementById("wordDictBackdrop");
  const wordDictModal = document.getElementById("wordDictModal");
  const dictWordTitle = document.getElementById("dictWordTitle");
  const dictTtsBtn = document.getElementById("dictTtsBtn");
  const dictPronKo = document.getElementById("dictPronKo");
  const dictIpa = document.getElementById("dictIpa");
  const dictCloseBtn = document.getElementById("dictCloseBtn");
  const dictBody = document.getElementById("dictBody");

  // =========================================
  // Helpers
  // =========================================
  function getCurrentWeek() {
    return (
      curriculumData.weeks.find((w) => w.weekNumber === currentWeekNumber) ||
      curriculumData.weeks[0]
    );
  }

  function getDayStorageKey(weekNum, dayKey) {
    return `w${weekNum}-${dayKey}`;
  }

  function formatMMSS(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function wrapClickableWords(text) {
    const escaped = escapeHtml(text);
    return escaped.replace(/\b([A-Za-z]+(?:'[A-Za-z]+)?)\b/g, (match) => {
      const clean = match.replace(/'/g, "").toLowerCase();
      if (!clean) return match;
      return `<span class="clickable-word" data-word="${escapeHtml(match)}">${match}</span>`;
    });
  }

  // =========================================
  // Firebase Realtime Database Sync (REST + SSE)
  // =========================================
  function sanitizeSyncId(raw) {
    return String(raw || "")
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, "");
  }

  function setSyncUI(status, text) {
    syncStatusBadge.textContent = text;
    syncStatusBadge.classList.remove("synced", "error");
    if (status === "synced") syncStatusBadge.classList.add("synced");
    if (status === "error") syncStatusBadge.classList.add("error");

    if (currentSyncId) {
      syncConnectBtn.textContent = "연결 해제";
      syncConnectBtn.classList.add("connected");
      syncIdInput.value = currentSyncId;
    } else {
      syncConnectBtn.textContent = "연결";
      syncConnectBtn.classList.remove("connected");
    }
  }

  function getFirebaseUserUrl(syncId) {
    const base = firebaseConfig.databaseURL.replace(/\/+$/, "");
    return `${base}/users/${encodeURIComponent(syncId)}.json`;
  }

  async function pushStateToFirebase() {
    if (!currentSyncId) return;
    try {
      const payload = {
        ...appState,
        updatedAt: Date.now(),
        updatedBy: CLIENT_INSTANCE_ID
      };
      const res = await fetch(getFirebaseUserUrl(currentSyncId), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSyncUI("synced", "실시간 동기화 중");
      } else {
        setSyncUI("error", "동기화 오류 (로컬 저장됨)");
      }
    } catch (e) {
      console.warn("Firebase push failed, using localStorage:", e);
      setSyncUI("error", "오프라인 (로컬 저장됨)");
    }
  }

  function scheduleFirebasePush() {
    if (!currentSyncId) return;
    if (syncPushTimeout) clearTimeout(syncPushTimeout);
    syncPushTimeout = setTimeout(() => {
      pushStateToFirebase();
    }, 350);
  }

  function applyRemoteState(remoteData) {
    if (!remoteData || typeof remoteData !== "object") return;
    if (remoteData.updatedBy === CLIENT_INSTANCE_ID) return;

    appState = normalizeState(remoteData);
    currentWeekNumber = appState.lastWeekNumber;
    currentDayKey = appState.lastDayKey;
    saveState(true); // Save locally without re-pushing

    renderWeekSelector();
    renderProgressAndStreak();
    renderWrongNotesList();
    renderDayTabs();
    renderLesson();
    updateCompletionBanner();
    renderStudyTimer();
  }

  function startSyncStream(syncId) {
    if (syncEventSource) {
      syncEventSource.close();
      syncEventSource = null;
    }
    if (typeof EventSource === "undefined") return;

    try {
      const es = new EventSource(getFirebaseUserUrl(syncId));
      es.addEventListener("put", (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed && parsed.path === "/" && parsed.data) {
            applyRemoteState(parsed.data);
            setSyncUI("synced", "실시간 동기화 중");
          }
        } catch (err) {
          console.warn("SSE put parse error:", err);
        }
      });
      es.onerror = () => {
        if (currentSyncId) {
          setSyncUI("error", "재연결 대기 (로컬 저장됨)");
        }
      };
      syncEventSource = es;
    } catch (e) {
      console.warn("EventSource failed:", e);
    }
  }

  async function connectSync(rawId) {
    const safeId = sanitizeSyncId(rawId);
    if (!safeId) {
      alert("동기화 ID는 영문, 숫자, 하이픈(-), 밑줄(_)만 입력할 수 있습니다.\n예: my-ielts-2026");
      return;
    }

    currentSyncId = safeId;
    try {
      localStorage.setItem(SYNC_ID_STORAGE_KEY, safeId);
    } catch (e) {}

    setSyncUI("synced", "동기화 연결 중...");

    try {
      const res = await fetch(getFirebaseUserUrl(safeId));
      if (!res.ok) throw new Error("HTTP " + res.status);
      const remoteData = await res.json();

      if (remoteData && typeof remoteData === "object") {
        applyRemoteState(remoteData);
      } else {
        await pushStateToFirebase();
      }
      setSyncUI("synced", "실시간 동기화 중");
      startSyncStream(safeId);
    } catch (e) {
      console.warn("Firebase initial sync failed, falling back to localStorage:", e);
      setSyncUI("error", "연결 실패 (로컬 저장 사용)");
    }
  }

  function disconnectSync() {
    currentSyncId = "";
    if (syncEventSource) {
      syncEventSource.close();
      syncEventSource = null;
    }
    try {
      localStorage.removeItem(SYNC_ID_STORAGE_KEY);
    } catch (e) {}
    syncIdInput.value = "";
    setSyncUI("local", "로컬 저장");
  }

  syncConnectBtn.addEventListener("click", () => {
    if (currentSyncId) {
      disconnectSync();
    } else {
      connectSync(syncIdInput.value);
    }
  });

  syncIdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !currentSyncId) {
      connectSync(syncIdInput.value);
    }
  });

  // =========================================
  // Clickable Word Dictionary Popup
  // =========================================
  const POS_KO_MAP = {
    noun: "명사(n.)",
    verb: "동사(v.)",
    adjective: "형용사(adj.)",
    adverb: "부사(adv.)",
    pronoun: "대명사(pron.)",
    preposition: "전치사(prep.)",
    conjunction: "접속사(conj.)",
    interjection: "감탄사(interj.)",
    determiner: "한정사(det.)"
  };

  const COMMON_KO_MAP = {
    adult: "성인, 어른",
    after: "~후에",
    all: "모든, 전부",
    also: "또한",
    always: "항상",
    answer: "대답, 정답 / 대답하다",
    any: "어떤, 조금이라도",
    app: "앱, 애플리케이션",
    at: "~에(장소·시간)",
    attend: "참석하다, 다니다",
    audio: "오디오, 음성",
    away: "떨어져",
    bad: "나쁜",
    because: "왜냐하면 ~이기 때문에",
    bed: "침대",
    before: "~전에",
    best: "최고의, 가장 좋은",
    better: "더 좋은, 더 나은",
    book: "책 / 예약하다",
    bring: "가져오다",
    build: "만들다, 쌓다",
    bus: "버스",
    busy: "바쁜",
    but: "하지만",
    can: "~할 수 있다",
    card: "카드",
    center: "센터, 중심지",
    change: "바꾸다, 변화",
    cheap: "저렴한, 싼",
    cheaper: "더 저렴한",
    check: "확인하다",
    city: "도시",
    class: "수업, 강좌",
    clear: "맑은, 명확한 / 비우다",
    clip: "클립, 짧은 영상·음성",
    come: "오다",
    compare: "비교하다",
    computer: "컴퓨터",
    cook: "요리하다",
    cost: "비용, 비용이 들다",
    course: "강좌, 과정",
    daily: "매일의, 일상의",
    day: "하루, 날",
    dinner: "저녁 식사",
    do: "하다",
    during: "~동안",
    each: "각각의",
    easier: "더 쉬운",
    easy: "쉬운",
    eat: "먹다",
    education: "교육",
    energy: "에너지, 힘",
    english: "영어",
    every: "매~, 모든",
    example: "예시, 예",
    expensive: "비싼",
    feel: "느끼다",
    few: "거의 없는 / 몇몇의",
    find: "찾다",
    finish: "끝내다, 끝나다",
    first: "첫 번째의 / 먼저",
    fit: "맞다, 적합하다",
    for: "~을 위해 / ~동안",
    friend: "친구",
    from: "~로부터",
    future: "미래",
    get: "얻다, 받다",
    give: "주다",
    go: "가다",
    good: "좋은",
    great: "훌륭한, 아주 좋은",
    hard: "어려운, 열심히",
    have: "가지다, 먹다",
    head: "머리",
    health: "건강",
    hear: "듣다",
    help: "돕다, 도움이 되다",
    home: "집",
    hour: "시간(60분)",
    hours: "시간",
    how: "어떻게, 얼마나",
    idea: "아이디어, 생각",
    important: "중요한",
    in: "~안에",
    into: "~안으로",
    just: "그저, 단지",
    know: "알다",
    language: "언어",
    last: "지난, 마지막의",
    learn: "배우다",
    learning: "학습, 배움",
    lesson: "수업, 레슨",
    lessons: "수업들",
    life: "삶, 생활",
    like: "좋아하다 / ~처럼",
    listen: "듣다",
    listening: "듣기",
    long: "긴, 오랫동안",
    look: "보다",
    lunch: "점심 식사",
    make: "만들다",
    many: "많은",
    minute: "분(시간)",
    minutes: "분",
    money: "돈",
    month: "달, 한 달",
    more: "더 많은 / 더",
    morning: "아침",
    most: "대부분의, 가장",
    much: "많은 / 훨씬",
    music: "음악",
    need: "필요하다",
    new: "새로운",
    next: "다음의",
    night: "밤",
    not: "~아닌",
    now: "지금",
    number: "숫자, 번호",
    once: "한 번 / 한때",
    one: "하나",
    only: "오직, 단지",
    online: "온라인의",
    other: "다른",
    out: "밖으로",
    over: "~이상 / ~동안",
    pass: "출입증 / 통과하다",
    past: "과거",
    pay: "지불하다, 내다",
    people: "사람들",
    person: "사람",
    place: "장소",
    plan: "계획 / 계획하다",
    play: "놀다, 재생하다",
    popular: "인기 있는",
    practice: "연습 / 연습하다",
    problem: "문제",
    question: "질문, 문제",
    rather: "오히려, 차라리",
    read: "읽다",
    reading: "읽기, 독해",
    room: "방, 호실",
    same: "같은",
    school: "학교",
    see: "보다",
    session: "시간, 세션",
    short: "짧은",
    show: "보여주다",
    sleep: "잠, 수면 / 자다",
    small: "작은",
    sofa: "소파",
    some: "약간의, 몇몇의",
    space: "공간",
    speak: "말하다",
    speaking: "말하기",
    start: "시작하다",
    stay: "머무르다",
    straight: "곧장, 바로",
    strong: "강한, 탄탄한",
    study: "공부하다 / 공부",
    studying: "공부하는 것",
    studies: "연구들",
    take: "타다, 걸리다, 취하다",
    talk: "이야기하다",
    ten: "10, 열",
    than: "~보다",
    thank: "감사하다",
    that: "그것, 저것",
    their: "그들의",
    then: "그다음에, 그때",
    they: "그들",
    thing: "것, 사물",
    think: "생각하다",
    this: "이것",
    three: "3, 셋",
    thursday: "목요일",
    time: "시간",
    today: "오늘",
    too: "너무 / 또한",
    traditional: "전통적인",
    try: "시도하다, 노력하다",
    tuesday: "화요일",
    twenty: "20, 스물",
    two: "2, 둘",
    use: "사용하다",
    very: "매우",
    video: "영상, 비디오",
    walk: "걷다, 산책하다",
    want: "원하다",
    watch: "보다, 시청하다",
    way: "방법, 길",
    week: "주, 일주일",
    weekday: "평일",
    welcome: "환영하다",
    well: "잘",
    what: "무엇",
    when: "~할 때 / 언제",
    where: "어디",
    which: "어느 것",
    whole: "전체의",
    why: "왜",
    will: "~할 것이다",
    with: "~와 함께",
    word: "단어",
    words: "단어들",
    work: "일하다 / 직장",
    working: "일하는, 직장인의",
    write: "쓰다",
    writing: "쓰기, 영작",
    year: "년, 해",
    you: "당신",
    your: "당신의",
    youtube: "유튜브"
  };

  function englishToHangulPron(word) {
    let w = word.toLowerCase().replace(/[^a-z]/g, "");
    if (!w) return "";
    // Common rule-based phonetic approximation for Korean learners
    const rules = [
      [/tion$/g, "션"],
      [/sion$/g, "전"],
      [/ture$/g, "처"],
      [/ous$/g, "어스"],
      [/able$/g, "어블"],
      [/ible$/g, "이블"],
      [/ing$/g, "잉"],
      [/ght/g, "트"],
      [/ph/g, "프"],
      [/sh/g, "쉬"],
      [/ch/g, "치"],
      [/th/g, "쓰"],
      [/qu/g, "쿼"],
      [/ck/g, "크"],
      [/ee/g, "이"],
      [/oo/g, "우"],
      [/ea/g, "이"],
      [/ai/g, "에이"],
      [/ay/g, "에이"],
      [/oa/g, "오우"],
      [/ow/g, "아우"],
      [/ou/g, "아우"],
      [/er$/g, "어"],
      [/or$/g, "어"],
      [/ar$/g, "아"],
      [/le$/g, "을"],
      [/y$/g, "이"],
      [/e$/g, ""]
    ];
    for (const [pattern, rep] of rules) {
      w = w.replace(pattern, rep);
    }
    const charMap = {
      a: "애", b: "브", c: "크", d: "드", e: "에", f: "프", g: "그",
      h: "흐", i: "이", j: "즈", k: "크", l: "을", m: "음", n: "은",
      o: "오", p: "프", q: "크", r: "르", s: "스", t: "트", u: "어",
      v: "브", w: "우", x: "크스", y: "이", z: "즈"
    };
    let out = "";
    for (const ch of w) {
      out += charMap[ch] !== undefined ? charMap[ch] : ch;
    }
    return out;
  }

  function findInVocabularyDict(rawWord) {
    const dict = curriculumData.vocabularyDict || {};
    const lower = rawWord.toLowerCase().replace(/[^a-z']/g, "");
    if (dict[lower]) return dict[lower];

    // Simple lemmatization fallback
    const candidates = [
      lower.replace(/ies$/, "y"),
      lower.replace(/es$/, ""),
      lower.replace(/s$/, ""),
      lower.replace(/ied$/, "y"),
      lower.replace(/ed$/, ""),
      lower.replace(/ing$/, ""),
      lower.replace(/ly$/, "")
    ];
    for (const stem of candidates) {
      if (stem && dict[stem]) return dict[stem];
    }
    return null;
  }

  let currentDictWord = "";

  function closeWordDictionary() {
    wordDictBackdrop.classList.add("hidden");
    wordDictModal.classList.add("hidden");
  }

  dictCloseBtn.addEventListener("click", closeWordDictionary);
  wordDictBackdrop.addEventListener("click", closeWordDictionary);
  dictTtsBtn.addEventListener("click", () => {
    if (currentDictWord) {
      speakTextSentences(currentDictWord, 0.9, 1.0, null);
    }
  });

  async function openWordDictionary(rawWord) {
    const cleanWord = rawWord.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");
    if (!cleanWord) return;
    currentDictWord = cleanWord;

    wordDictBackdrop.classList.remove("hidden");
    wordDictModal.classList.remove("hidden");

    const localEntry = findInVocabularyDict(cleanWord);
    if (localEntry) {
      currentDictWord = localEntry.word;
      dictWordTitle.textContent = localEntry.word;
      dictPronKo.textContent = `[${localEntry.pronunciationKo}]`;
      dictIpa.textContent = localEntry.ipa || "";
      dictBody.innerHTML = `
        <div>
          <span class="dict-pos-badge">${escapeHtml(localEntry.pos)}</span>
          <span class="dict-meaning">${escapeHtml(localEntry.meaning)}</span>
        </div>
        <div class="dict-tip-box">
          <strong>💡 IELTS 4.5 맥락 & 활용 팁:</strong><br />
          ${escapeHtml(localEntry.contextTip)}
        </div>
        <p class="dict-example">예문: "${escapeHtml(localEntry.example)}"</p>
      `;
      return;
    }

    // Fallback: free Dictionary API + built-in Hangul pron & common Korean map
    const lower = cleanWord.toLowerCase();
    const fallbackPronKo = englishToHangulPron(lower);
    const commonKo = COMMON_KO_MAP[lower] || "";

    dictWordTitle.textContent = cleanWord;
    dictPronKo.textContent = fallbackPronKo ? `[${fallbackPronKo}]` : "";
    dictIpa.textContent = "";
    dictBody.innerHTML = `<p class="lesson-desc">사전 정보를 불러오는 중...</p>`;

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(lower)}`
      );
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      const entry = Array.isArray(data) ? data[0] : null;
      if (!entry) throw new Error("Empty");

      const phoneticObj = (entry.phonetics || []).find((p) => p.text);
      dictIpa.textContent = entry.phonetic || (phoneticObj ? phoneticObj.text : "");

      const firstMeaning = entry.meanings && entry.meanings[0];
      const posRaw = firstMeaning ? firstMeaning.partOfSpeech : "word";
      const posKo = POS_KO_MAP[posRaw] || posRaw;
      const defObj = firstMeaning && firstMeaning.definitions && firstMeaning.definitions[0];
      const engDef = defObj ? defObj.definition : "";
      const engExample = defObj && defObj.example ? defObj.example : "";

      dictBody.innerHTML = `
        <div>
          <span class="dict-pos-badge">${escapeHtml(posKo)}</span>
          <span class="dict-meaning">${commonKo ? escapeHtml(commonKo) : escapeHtml(cleanWord)}</span>
        </div>
        <div class="dict-tip-box">
          <strong>📖 영영 풀이:</strong><br />
          ${escapeHtml(engDef || "사전 정의를 찾을 수 없습니다.")}
        </div>
        ${engExample ? `<p class="dict-example">예문: "${escapeHtml(engExample)}"</p>` : ""}
      `;
    } catch (e) {
      dictBody.innerHTML = `
        <div>
          <span class="dict-pos-badge">어휘</span>
          <span class="dict-meaning">${commonKo ? escapeHtml(commonKo) : "기본 단어"}</span>
        </div>
        <div class="dict-tip-box">
          오프라인 상태이거나 사전에 등록되지 않은 형태입니다. 위 🔊 버튼을 눌러 원어민 발음을 직접 들어보세요.
        </div>
      `;
    }
  }

  lessonContainer.addEventListener("click", (e) => {
    const wordEl = e.target.closest(".clickable-word");
    if (!wordEl) return;
    // Do not intercept clicks inside interactive option buttons
    if (wordEl.closest(".option-btn")) return;
    e.stopPropagation();
    openWordDictionary(wordEl.dataset.word || wordEl.textContent);
  });

  // =========================================
  // Study Timer (5m / 10m Count-up)
  // =========================================
  function renderStudyTimer() {
    const todayKey = getTodayDateKey();
    const secs = appState.dailyStudySeconds[todayKey] || 0;
    studyTimerDisplay.textContent = formatMMSS(secs);
    milestone5m.classList.toggle("reached", secs >= 300);
    milestone10m.classList.toggle("reached", secs >= 600);
    timerToggleBtn.textContent = timerRunning ? "⏸" : "▶";
  }

  function startStudyTimer() {
    if (timerIntervalId) clearInterval(timerIntervalId);
    timerIntervalId = setInterval(() => {
      if (!timerRunning) return;
      const todayKey = getTodayDateKey();
      appState.dailyStudySeconds[todayKey] =
        (appState.dailyStudySeconds[todayKey] || 0) + 1;
      if (appState.dailyStudySeconds[todayKey] % 5 === 0) {
        saveState();
      }
      renderStudyTimer();
    }, 1000);
  }

  timerToggleBtn.addEventListener("click", () => {
    timerRunning = !timerRunning;
    renderStudyTimer();
  });

  resetProgressBtn.addEventListener("click", () => {
    const confirmed = window.confirm(
      "모든 학습 진도, 선택한 답안, 오답 기록 및 오늘의 학습 타이머를 초기화할까요?"
    );
    if (!confirmed) return;

    stopAllSpeech();
    if (activeSpeakingTimerId) {
      clearInterval(activeSpeakingTimerId);
      activeSpeakingTimerId = null;
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("localStorage remove failed:", e);
    }

    appState = getDefaultState();
    currentWeekNumber = appState.lastWeekNumber;
    currentDayKey = appState.lastDayKey;
    saveState();

    renderWeekSelector();
    renderProgressAndStreak();
    renderWrongNotesList();
    renderDayTabs();
    renderLesson();
    updateCompletionBanner();
    renderStudyTimer();
  });

  // =========================================
  // Speech Synthesis (Web Speech API)
  // =========================================
  function refreshVoices() {
    if (!("speechSynthesis" in window)) return;
    const list = window.speechSynthesis.getVoices();
    if (list && list.length > 0) {
      cachedVoices = list;
    }
  }

  function splitIntoSentences(text) {
    const matches = String(text).match(/[^.!?]+[.!?]+|[^.!?]+$/g);
    if (!matches) return [String(text).trim()].filter(Boolean);
    return matches.map((s) => s.trim()).filter(Boolean);
  }

  function stopAllSpeech() {
    ttsStopRequested = true;
    isPlayingDialogue = false;
    activeSpeakingTts = null;
    activeUtterance = null;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    document.querySelectorAll(".dialogue-line.speaking").forEach((el) => {
      el.classList.remove("speaking");
    });
    updateAudioPlayButtonUI();
    updateSpeakingTtsButtonsUI();
  }

  function getEnglishVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices =
      cachedVoices.length > 0
        ? cachedVoices
        : window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    return (
      voices.find((v) => v.lang === "en-GB" && v.localService) ||
      voices.find((v) => v.lang === "en-US" && v.localService) ||
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang === "en-GB") ||
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("en")) ||
      null
    );
  }

  function speakQueue(items, rate = 1.0, onItemStart = null, onComplete = null) {
    if (!("speechSynthesis" in window)) {
      alert("현재 브라우저에서는 음성 재생(TTS)을 지원하지 않습니다.");
      if (onComplete) onComplete();
      return;
    }

    // 1) 기존 음성 큐 초기화 및 resume() 호출 (Safari/Chrome/모바일 대응)
    window.speechSynthesis.cancel();
    if (typeof window.speechSynthesis.resume === "function") {
      window.speechSynthesis.resume();
    }

    ttsStopRequested = false;

    function playIndex(idx) {
      if (ttsStopRequested || idx >= items.length) {
        activeUtterance = null;
        if (onComplete) onComplete();
        return;
      }

      const item = items[idx];
      if (onItemStart) onItemStart(item, idx);

      const utterance = new SpeechSynthesisUtterance(item.text);
      activeUtterance = utterance; // Prevent GC from dropping onend in Chrome/Safari

      // 2) getVoices()가 비어있어도 기본 영어 언어로 즉시 폴백 재생
      const voice = getEnglishVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = "en-US";
      }

      utterance.rate = rate;
      utterance.pitch = item.pitch || 1.0;

      let settled = false;
      const finishCurrent = () => {
        if (settled) return;
        settled = true;
        if (!ttsStopRequested) {
          setTimeout(() => playIndex(idx + 1), 180);
        }
      };

      utterance.onend = finishCurrent;
      utterance.onerror = () => {
        if (!ttsStopRequested) {
          finishCurrent();
        }
      };

      window.speechSynthesis.speak(utterance);
      if (window.speechSynthesis.paused && typeof window.speechSynthesis.resume === "function") {
        window.speechSynthesis.resume();
      }
    }

    playIndex(0);
  }

  function speakTextSentences(text, rate = 1.0, pitch = 1.0, qid = null) {
    const sentences = splitIntoSentences(text);
    const items = sentences.map((s) => ({ text: s, pitch }));
    activeSpeakingTts = { qid, rate };
    updateSpeakingTtsButtonsUI();

    speakQueue(items, rate, null, () => {
      activeSpeakingTts = null;
      updateSpeakingTtsButtonsUI();
    });
  }

  function playDialogueSequence(dialogue) {
    const items = [];
    dialogue.forEach((line, lineIdx) => {
      splitIntoSentences(line.text).forEach((sentence) => {
        items.push({
          text: sentence,
          pitch: line.voicePitch || 1.0,
          lineIdx
        });
      });
    });

    isPlayingDialogue = true;
    updateAudioPlayButtonUI();

    speakQueue(
      items,
      ttsRate,
      (item) => {
        document.querySelectorAll(".dialogue-line").forEach((el, i) => {
          el.classList.toggle("speaking", i === item.lineIdx);
        });
      },
      () => {
        isPlayingDialogue = false;
        document.querySelectorAll(".dialogue-line.speaking").forEach((el) => {
          el.classList.remove("speaking");
        });
        updateAudioPlayButtonUI();
      }
    );
  }

  function updateAudioPlayButtonUI() {
    const playBtn = document.getElementById("playDialogueBtn");
    if (playBtn) {
      playBtn.textContent = isPlayingDialogue ? "⏹ 재생 중지" : "▶ 대화 음성 듣기";
    }
  }

  function updateSpeakingTtsButtonsUI() {
    document.querySelectorAll(".play-speaking-tts").forEach((btn) => {
      const qid = btn.dataset.qid;
      const rate = Number(btn.dataset.rate);
      const isThisPlaying =
        activeSpeakingTts &&
        activeSpeakingTts.qid === qid &&
        activeSpeakingTts.rate === rate;
      if (isThisPlaying) {
        btn.textContent = "⏹ 재생 중지";
      } else {
        btn.textContent = rate === 0.8 ? "0.8x 느리게" : "🔊 원어민 발음 듣기";
      }
    });
  }

  // =========================================
  // Progress, Streak & Wrong Notes
  // =========================================
  function getWeeklyCompletionStats() {
    const week = getCurrentWeek();
    let completedCount = 0;
    DAY_ORDER.forEach((dKey) => {
      const key = getDayStorageKey(week.weekNumber, dKey);
      if (appState.completedDays[key]) completedCount += 1;
    });
    const percent = Math.round((completedCount / DAY_ORDER.length) * 100);
    return { completedCount, total: DAY_ORDER.length, percent };
  }

  function renderProgressAndStreak() {
    const week = getCurrentWeek();
    const { completedCount, percent } = getWeeklyCompletionStats();

    streakCountText.textContent = `${completedCount}일`;
    weeklyGoalSub.textContent = `이번 주 목표 달성률 ${percent}% (${completedCount}/5일)`;
    weeklyProgressBarTrack.setAttribute("aria-valuenow", String(percent));
    weeklyProgressBarFill.style.width = `${percent}%`;

    streakBadgesEl.innerHTML = DAY_ORDER.map((dKey) => {
      const dayObj = week.days[dKey];
      const isDone = !!appState.completedDays[getDayStorageKey(week.weekNumber, dKey)];
      return `
        <div class="streak-badge-item ${isDone ? "done" : ""}">
          <span class="badge-icon">${isDone ? "✅" : "○"}</span>
          <span>${dayObj.dayLabel}</span>
        </div>
      `;
    }).join("");

    wrongCountBadge.textContent = String(appState.wrongNotes.length);
  }

  function recordWrongAnswer(questionObj, userAnswer, dayData) {
    const week = getCurrentWeek();
    const existingIdx = appState.wrongNotes.findIndex((n) => n.id === questionObj.id);
    const entry = {
      id: questionObj.id,
      weekNumber: week.weekNumber,
      dayLabel: dayData.dayFullLabel,
      skill: dayData.skill,
      prompt: questionObj.prompt || questionObj.statement || "",
      userAnswer,
      correctAnswer: questionObj.answer,
      explanation: questionObj.explanation,
      timestamp: new Date().toLocaleDateString("ko-KR")
    };
    if (existingIdx >= 0) {
      appState.wrongNotes[existingIdx] = entry;
    } else {
      appState.wrongNotes.unshift(entry);
    }
    saveState();
    renderProgressAndStreak();
    renderWrongNotesList();
  }

  function renderWrongNotesList() {
    if (appState.wrongNotes.length === 0) {
      wrongNotesList.innerHTML = `<p class="lesson-desc">아직 저장된 오답 기록이 없습니다. 틀린 문제가 있으면 여기에 자동으로 저장됩니다.</p>`;
      return;
    }
    wrongNotesList.innerHTML = appState.wrongNotes
      .map(
        (item) => `
      <div class="wrong-note-item">
        <div><strong>[${escapeHtml(item.dayLabel)} · ${escapeHtml(item.skill)}]</strong> ${escapeHtml(item.prompt)}</div>
        <div style="margin-top:4px;">내 답: <span style="color:var(--rose-600);">${escapeHtml(item.userAnswer)}</span> → 정답: <strong style="color:var(--emerald-600);">${escapeHtml(item.correctAnswer)}</strong></div>
        <div style="margin-top:4px; color:var(--text-muted);">${escapeHtml(item.explanation)}</div>
      </div>
    `
      )
      .join("");
  }

  wrongNotesToggleBtn.addEventListener("click", () => {
    wrongNotesPanel.classList.toggle("hidden");
    renderWrongNotesList();
  });

  closeWrongNotesBtn.addEventListener("click", () => {
    wrongNotesPanel.classList.add("hidden");
  });

  clearWrongNotesBtn.addEventListener("click", () => {
    appState.wrongNotes = [];
    saveState();
    renderProgressAndStreak();
    renderWrongNotesList();
  });

  // =========================================
  // Week Selector & Day Tabs
  // =========================================
  function renderWeekSelector() {
    weekSelector.innerHTML = curriculumData.weeks
      .map(
        (w) =>
          `<option value="${w.weekNumber}" ${w.weekNumber === currentWeekNumber ? "selected" : ""}>${escapeHtml(w.title)}</option>`
      )
      .join("");
  }

  weekSelector.addEventListener("change", (e) => {
    currentWeekNumber = Number(e.target.value);
    appState.lastWeekNumber = currentWeekNumber;
    saveState();
    switchDay(currentDayKey);
  });

  function renderDayTabs() {
    const week = getCurrentWeek();
    dayTabsEl.innerHTML = DAY_ORDER.map((dKey) => {
      const day = week.days[dKey];
      const isActive = dKey === currentDayKey;
      const isCompleted = !!appState.completedDays[getDayStorageKey(week.weekNumber, dKey)];
      return `
        <button
          type="button"
          class="day-tab ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}"
          data-day="${dKey}"
          aria-pressed="${isActive}"
        >
          <span class="day-tab-label">${day.dayLabel}</span>
          <span class="day-tab-skill">${day.skill}</span>
        </button>
      `;
    }).join("");

    dayTabsEl.querySelectorAll(".day-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchDay(btn.dataset.day);
      });
    });
  }

  function switchDay(dayKey) {
    stopAllSpeech();
    if (activeSpeakingTimerId) {
      clearInterval(activeSpeakingTimerId);
      activeSpeakingTimerId = null;
    }
    currentDayKey = dayKey;
    appState.lastDayKey = dayKey;
    saveState();
    renderDayTabs();
    renderLesson();
    updateCompletionBanner();
  }

  // =========================================
  // Completion Check & Banner
  // =========================================
  function checkAndMarkDayCompletion(dayData) {
    const week = getCurrentWeek();
    const dayStorageKey = getDayStorageKey(week.weekNumber, dayData.dayKey);
    let isDone = false;

    if (dayData.dayKey === "mon" || dayData.dayKey === "tue" || dayData.dayKey === "fri") {
      isDone = dayData.questions.every((q) => !!appState.answers[q.id]);
    } else if (dayData.dayKey === "wed") {
      isDone = !!appState.completedDays[dayStorageKey];
    } else if (dayData.dayKey === "thu") {
      isDone = dayData.questions.every((q) => !!appState.speakingDone[q.id]);
    }

    if (isDone) {
      appState.completedDays[dayStorageKey] = true;
      saveState();
      renderProgressAndStreak();
      renderDayTabs();
    }
    updateCompletionBanner();
  }

  function updateCompletionBanner() {
    const week = getCurrentWeek();
    const dayData = week.days[currentDayKey];
    const dayStorageKey = getDayStorageKey(week.weekNumber, dayData.dayKey);
    const isDone = !!appState.completedDays[dayStorageKey];

    if (!isDone) {
      completionBanner.classList.add("hidden");
      return;
    }

    const { completedCount, total, percent } = getWeeklyCompletionStats();
    completionBanner.classList.remove("hidden");

    if (dayData.questions && dayData.dayKey !== "thu") {
      const correctCount = dayData.questions.filter(
        (q) => appState.answers[q.id] && appState.answers[q.id].isCorrect
      ).length;
      completionDayScore.textContent = `${dayData.dayFullLabel} 점수: ${correctCount} / ${dayData.questions.length}`;
    } else {
      completionDayScore.textContent = `${dayData.dayFullLabel} (${dayData.skill}) 완료`;
    }

    completionWeeklyRate.textContent = `주간 달성률: ${percent}% (${completedCount}/${total}일)`;
    completionMessage.textContent =
      completedCount === total
        ? "이번 주 월~금 모든 학습을 완주했습니다! 정말 대단해요!"
        : "꾸준한 매일 10분이 IELTS 4.5~5.0 달성의 가장 빠른 길입니다.";

    const currentIdx = DAY_ORDER.indexOf(currentDayKey);
    if (currentIdx < DAY_ORDER.length - 1) {
      nextDayBtn.classList.remove("hidden");
      const nextDay = week.days[DAY_ORDER[currentIdx + 1]];
      nextDayBtn.textContent = `${nextDay.dayFullLabel} (${nextDay.skill}) 보기 →`;
    } else {
      nextDayBtn.classList.add("hidden");
    }
  }

  nextDayBtn.addEventListener("click", () => {
    const idx = DAY_ORDER.indexOf(currentDayKey);
    if (idx >= 0 && idx < DAY_ORDER.length - 1) {
      switchDay(DAY_ORDER[idx + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // =========================================
  // Question Renderer (MCQ, TFNG, Short Answer)
  // =========================================
  function renderQuestionsHTML(questions) {
    return questions
      .map((q, index) => {
        const saved = appState.answers[q.id];
        const statementHTML = q.sentenceBefore
          ? `<div class="question-statement">${wrapClickableWords(q.sentenceBefore)} <span class="blank-pill">${saved ? escapeHtml(saved.userAnswer) : "______"}</span> ${wrapClickableWords(q.sentenceAfter || "")}</div>`
          : q.statement
          ? `<div class="question-statement">${wrapClickableWords(q.statement)}</div>`
          : "";

        let inputHTML = "";
        if (q.type === "short") {
          const val = saved ? escapeHtml(saved.userAnswer) : "";
          inputHTML = `
            <div class="short-answer-row">
              <input type="text" class="text-input" id="input-${q.id}" placeholder="${escapeHtml(q.placeholder || "정답 입력")}" value="${val}" ${saved ? "disabled" : ""} />
              <button type="button" class="primary-btn submit-short-btn" data-qid="${q.id}" ${saved ? "disabled" : ""}>확인</button>
            </div>
          `;
        } else {
          inputHTML = `
            <div class="options-grid">
              ${q.options
                .map((opt) => {
                  let cls = "option-btn";
                  if (saved) {
                    if (opt === q.answer) cls += " correct";
                    else if (opt === saved.userAnswer && !saved.isCorrect) cls += " wrong";
                  }
                  return `<button type="button" class="${cls}" data-qid="${q.id}" data-option="${escapeHtml(opt)}" ${saved ? "disabled" : ""}>${escapeHtml(opt)}</button>`;
                })
                .join("")}
            </div>
          `;
        }

        let feedbackHTML = "";
        if (saved) {
          feedbackHTML = `
            <div class="feedback-box ${saved.isCorrect ? "correct" : "wrong"}">
              <div class="feedback-status">${saved.isCorrect ? "✅ 정답입니다!" : `❌ 아쉽네요! 정답은 '${escapeHtml(q.answer)}' 입니다.`}</div>
              <div>${escapeHtml(q.explanation)}</div>
              ${q.translation ? `<div class="feedback-translation">해석: ${escapeHtml(q.translation)}</div>` : ""}
            </div>
          `;
        }

        return `
          <article class="card question-card" id="qcard-${q.id}">
            <div class="question-meta">Q${index + 1}. ${escapeHtml(q.category || q.prompt)}</div>
            ${q.category ? `<p class="question-prompt">${escapeHtml(q.prompt)}</p>` : ""}
            ${statementHTML}
            ${inputHTML}
            ${feedbackHTML}
          </article>
        `;
      })
      .join("");
  }

  function bindQuestionEvents(dayData) {
    // MCQ / TFNG options
    lessonContainer.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const selected = btn.dataset.option;
        const qObj = dayData.questions.find((q) => q.id === qid);
        if (!qObj || appState.answers[qid]) return;

        const isCorrect = selected === qObj.answer;
        appState.answers[qid] = { userAnswer: selected, isCorrect };
        saveState();

        if (!isCorrect) {
          recordWrongAnswer(qObj, selected, dayData);
        }
        renderLesson();
        checkAndMarkDayCompletion(dayData);
      });
    });

    // Short answer submit
    lessonContainer.querySelectorAll(".submit-short-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const inputEl = document.getElementById(`input-${qid}`);
        const qObj = dayData.questions.find((q) => q.id === qid);
        if (!qObj || !inputEl || appState.answers[qid]) return;

        const rawVal = inputEl.value.trim();
        if (!rawVal) {
          inputEl.focus();
          return;
        }
        const normalized = rawVal.toLowerCase();
        const accepted = (qObj.acceptedAnswers || [qObj.answer]).map((a) =>
          a.toLowerCase()
        );
        const isCorrect = accepted.includes(normalized);

        appState.answers[qid] = { userAnswer: rawVal, isCorrect };
        saveState();

        if (!isCorrect) {
          recordWrongAnswer(qObj, rawVal, dayData);
        }
        renderLesson();
        checkAndMarkDayCompletion(dayData);
      });
    });
  }

  // =========================================
  // Day-Specific Renderers
  // =========================================
  function renderLessonHeader(dayData) {
    const vocabHTML =
      dayData.vocabHighlights && dayData.vocabHighlights.length
        ? `<div class="vocab-chips">
            ${dayData.vocabHighlights
              .map(
                (v) =>
                  `<span class="vocab-chip"><strong>${wrapClickableWords(v.word)}</strong> ${escapeHtml(v.meaning)}</span>`
              )
              .join("")}
           </div>`
        : "";

    return `
      <article class="card lesson-header-card">
        <span class="skill-tag">${escapeHtml(dayData.dayFullLabel)} · ${escapeHtml(dayData.skill)} (약 ${dayData.estimatedMinutes}분)</span>
        <h2 class="lesson-title">${escapeHtml(dayData.title)}</h2>
        <p class="lesson-desc">${escapeHtml(dayData.description)}</p>
        ${vocabHTML}
      </article>
    `;
  }

  // --- MONDAY: Listening ---
  let showListeningScript = false;

  function renderMonday(dayData) {
    const dialogueHTML = dayData.dialogue
      .map(
        (line, idx) => `
        <div class="dialogue-line" data-line-idx="${idx}">
          <div class="speaker-name">${escapeHtml(line.speaker)}</div>
          <div class="dialogue-en">${wrapClickableWords(line.text)}</div>
          <div class="dialogue-ko">${escapeHtml(line.ko)}</div>
        </div>
      `
      )
      .join("");

    lessonContainer.innerHTML = `
      ${renderLessonHeader(dayData)}
      <article class="card">
        <div class="audio-player-bar">
          <div class="audio-controls">
            <button type="button" id="playDialogueBtn" class="primary-btn">▶ 대화 음성 듣기</button>
            <button type="button" id="toggleScriptBtn" class="ghost-btn">
              ${showListeningScript ? "스크립트 숨기기" : "스크립트 & 해석 보기"}
            </button>
          </div>
          <div class="speed-controls">
            <span class="speed-label">속도</span>
            <button type="button" class="ghost-btn-sm speed-btn ${ttsRate === 0.8 ? "active" : ""}" data-rate="0.8">0.8x</button>
            <button type="button" class="ghost-btn-sm speed-btn ${ttsRate === 1.0 ? "active" : ""}" data-rate="1.0">1.0x</button>
          </div>
        </div>
        <div id="dialogueScriptBox" class="dialogue-box ${showListeningScript ? "" : "hidden"}">
          ${dialogueHTML}
        </div>
      </article>
      ${renderQuestionsHTML(dayData.questions)}
    `;

    document.getElementById("playDialogueBtn").addEventListener("click", () => {
      if (isPlayingDialogue) {
        stopAllSpeech();
      } else {
        playDialogueSequence(dayData.dialogue);
      }
    });

    document.getElementById("toggleScriptBtn").addEventListener("click", () => {
      showListeningScript = !showListeningScript;
      renderMonday(dayData);
    });

    lessonContainer.querySelectorAll(".speed-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        ttsRate = Number(btn.dataset.rate);
        if (isPlayingDialogue) {
          stopAllSpeech();
          playDialogueSequence(dayData.dialogue);
        } else {
          renderMonday(dayData);
        }
      });
    });

    bindQuestionEvents(dayData);
  }

  // --- TUESDAY: Reading ---
  let openTranslations = {};

  function renderTuesday(dayData) {
    const allOpen = dayData.sentences.every((_, i) => !!openTranslations[i]);

    const sentencesHTML = dayData.sentences
      .map(
        (s, idx) => `
        <div class="sentence-item">
          <div class="sentence-row">
            <span class="sentence-en">${wrapClickableWords(s.en)}</span>
            <button type="button" class="ghost-btn-sm toggle-sent-ko" data-sidx="${idx}">
              ${openTranslations[idx] ? "해석 닫기" : "해석"}
            </button>
          </div>
          ${openTranslations[idx] ? `<div class="sentence-ko">${escapeHtml(s.ko)}</div>` : ""}
        </div>
      `
      )
      .join("");

    lessonContainer.innerHTML = `
      ${renderLessonHeader(dayData)}
      <article class="card">
        <div class="reading-toolbar">
          <h3 class="passage-title">${wrapClickableWords(dayData.passageTitle)}</h3>
          <button type="button" id="toggleAllReadingKo" class="ghost-btn-sm">
            ${allOpen ? "전체 해석 숨기기" : "전체 해석 보기"}
          </button>
        </div>
        <div class="sentence-list">
          ${sentencesHTML}
        </div>
      </article>
      ${renderQuestionsHTML(dayData.questions)}
    `;

    document.getElementById("toggleAllReadingKo").addEventListener("click", () => {
      const targetState = !allOpen;
      dayData.sentences.forEach((_, i) => {
        openTranslations[i] = targetState;
      });
      renderTuesday(dayData);
    });

    lessonContainer.querySelectorAll(".toggle-sent-ko").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.sidx);
        openTranslations[idx] = !openTranslations[idx];
        renderTuesday(dayData);
      });
    });

    bindQuestionEvents(dayData);
  }

  // --- WEDNESDAY: Writing ---
  function renderWednesday(dayData) {
    const week = getCurrentWeek();
    const dayStorageKey = getDayStorageKey(week.weekNumber, dayData.dayKey);
    const savedDraft = appState.writingDrafts[dayStorageKey] || "";
    const isCompleted = !!appState.completedDays[dayStorageKey];

    const checkWordUsed = (word) => {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      return regex.test(savedDraft);
    };

    lessonContainer.innerHTML = `
      ${renderLessonHeader(dayData)}
      <article class="card">
        <div class="question-meta">${escapeHtml(dayData.taskType)}</div>
        <p class="question-prompt" style="margin-top:6px;">${wrapClickableWords(dayData.writingPrompt)}</p>
        <p class="lesson-desc" style="margin-top:4px;">${escapeHtml(dayData.writingPromptKo)}</p>

        <div style="margin-top:14px;">
          <div style="font-size:0.84rem; font-weight:600; color:var(--navy-800);">필수 포함 영단어 (사용 시 초록색으로 체크됩니다):</div>
          <div class="required-words-row" id="requiredWordsRow">
            ${dayData.requiredWords
              .map((rw) => {
                const used = checkWordUsed(rw.word);
                return `<span class="req-word-pill ${used ? "used" : ""}" data-word="${escapeHtml(rw.word)}">${used ? "✓ " : ""}${wrapClickableWords(rw.word)} (${escapeHtml(rw.meaning)})</span>`;
              })
              .join("")}
          </div>
        </div>

        <textarea id="writingTextarea" class="writing-textarea" placeholder="위 3개의 필수 단어를 포함하여 2~3문장으로 영작해 보세요...">${escapeHtml(savedDraft)}</textarea>

        <div style="margin-top:10px; font-size:0.82rem; color:var(--text-muted);">
          <strong>문장 구조 힌트:</strong>
          <ul style="margin:4px 0 0 18px; padding:0;">
            ${dayData.sentencePatterns.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
          </ul>
        </div>

        <div class="writing-actions">
          <span id="wordCountInfo" style="font-size:0.82rem; color:var(--text-muted);"></span>
          <button type="button" id="submitWritingBtn" class="emerald-btn">
            ${isCompleted ? "모범 답안 다시 비교하기" : "작성 완료 & 모범 답안 비교"}
          </button>
        </div>

        <div id="writingModelBox" class="model-compare-box ${isCompleted ? "" : "hidden"}">
          <h3>✨ 모범 답안 (IELTS 4.5–5.0 목표 수준)</h3>
          <p style="margin:0 0 6px 0; font-weight:500; color:var(--navy-900);">${wrapClickableWords(dayData.modelAnswer)}</p>
          <p style="margin:0 0 10px 0; font-size:0.85rem; color:var(--text-muted);">${escapeHtml(dayData.modelAnswerKo)}</p>
          <div style="font-size:0.84rem;">
            <strong>핵심 표현 정리:</strong>
            <ul style="margin:4px 0 0 18px; padding:0;">
              ${dayData.keyExpressions
                .map(
                  (ke) =>
                    `<li><strong>${wrapClickableWords(ke.expr)}</strong> — ${escapeHtml(ke.desc)}</li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      </article>
    `;

    const textarea = document.getElementById("writingTextarea");
    const wordCountInfo = document.getElementById("wordCountInfo");

    const updateWritingMeta = () => {
      const text = textarea.value;
      appState.writingDrafts[dayStorageKey] = text;
      saveState();

      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      wordCountInfo.textContent = `현재 단어 수: ${words}단어`;

      document.querySelectorAll(".req-word-pill").forEach((pill) => {
        const w = pill.dataset.word;
        const used = new RegExp(`\\b${w}\\b`, "i").test(text);
        pill.classList.toggle("used", used);
        const meaning = dayData.requiredWords.find((rw) => rw.word === w).meaning;
        pill.innerHTML = `${used ? "✓ " : ""}${wrapClickableWords(w)} (${escapeHtml(meaning)})`;
      });
    };

    updateWritingMeta();
    textarea.addEventListener("input", updateWritingMeta);

    document.getElementById("submitWritingBtn").addEventListener("click", () => {
      if (!textarea.value.trim()) {
        alert("먼저 짧은 2~3문장을 작성해 보세요!");
        textarea.focus();
        return;
      }
      appState.completedDays[dayStorageKey] = true;
      saveState();
      document.getElementById("writingModelBox").classList.remove("hidden");
      renderProgressAndStreak();
      renderDayTabs();
      updateCompletionBanner();
    });
  }

  // --- THURSDAY: Speaking ---
  let speakingModelOpen = {};

  function renderThursday(dayData) {
    const questionsHTML = dayData.questions
      .map((q) => {
        const isDone = !!appState.speakingDone[q.id];
        const isModelOpen = !!speakingModelOpen[q.id];
        return `
          <article class="card question-card">
            <div class="question-meta">Part 1 · 질문 ${q.questionNumber} / ${dayData.questions.length}</div>
            <h3 style="margin:0; font-size:1.05rem; color:var(--navy-900);">${wrapClickableWords(q.question)}</h3>
            <p class="lesson-desc">${escapeHtml(q.questionKo)}</p>

            <div>
              <div style="font-size:0.8rem; font-weight:600; color:var(--navy-800); margin-bottom:6px;">💡 아이디어 힌트 키워드</div>
              <div class="hint-chips">
                ${q.hints
                  .map(
                    (h) =>
                      `<span class="hint-chip"><strong>${wrapClickableWords(h.en)}</strong> (${escapeHtml(h.ko)})</span>`
                  )
                  .join("")}
              </div>
            </div>

            <div class="speaking-timers">
              <div class="speaking-timer-box" id="prep-box-${q.id}">
                <span style="font-size:0.78rem; color:var(--text-muted);">답변 준비 타이머</span>
                <span class="speaking-timer-val" id="prep-val-${q.id}">00:${String(q.prepSeconds).padStart(2, "0")}</span>
                <button type="button" class="ghost-btn-sm start-cd-btn" data-type="prep" data-qid="${q.id}" data-sec="${q.prepSeconds}">30초 시작</button>
              </div>
              <div class="speaking-timer-box" id="speak-box-${q.id}">
                <span style="font-size:0.78rem; color:var(--text-muted);">말하기 타이머</span>
                <span class="speaking-timer-val" id="speak-val-${q.id}">01:00</span>
                <button type="button" class="ghost-btn-sm start-cd-btn" data-type="speak" data-qid="${q.id}" data-sec="${q.speakSeconds}">1분 시작</button>
              </div>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:space-between;">
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" class="ghost-btn toggle-speaking-model" data-qid="${q.id}">
                  ${isModelOpen ? "모범 답변 숨기기" : "모범 답변 보기"}
                </button>
                <button type="button" class="primary-btn play-speaking-tts" data-qid="${q.id}" data-rate="1.0">
                  🔊 원어민 발음 듣기
                </button>
                <button type="button" class="ghost-btn-sm play-speaking-tts" data-qid="${q.id}" data-rate="0.8">
                  0.8x 느리게
                </button>
              </div>
              <button type="button" class="${isDone ? "emerald-btn" : "ghost-btn"} mark-speaking-done" data-qid="${q.id}">
                ${isDone ? "✓ 연습 완료됨" : "연습 완료 체크"}
              </button>
            </div>

            <div class="model-compare-box ${isModelOpen ? "" : "hidden"}" style="margin-top:4px;">
              <h3>모범 답변 (Band 4.5–5.0)</h3>
              <p style="margin:0 0 6px 0; color:var(--navy-900);">${wrapClickableWords(q.modelAnswer)}</p>
              <p style="margin:0 0 8px 0; font-size:0.84rem; color:var(--text-muted);">${escapeHtml(q.modelAnswerKo)}</p>
              <div style="font-size:0.82rem; color:var(--emerald-600);"><strong>Speaking Tip:</strong> ${escapeHtml(q.tip)}</div>
            </div>
          </article>
        `;
      })
      .join("");

    lessonContainer.innerHTML = `${renderLessonHeader(dayData)}${questionsHTML}`;

    // Countdown Timers
    lessonContainer.querySelectorAll(".start-cd-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        const qid = btn.dataset.qid;
        let remaining = Number(btn.dataset.sec);
        const valEl = document.getElementById(`${type}-val-${qid}`);
        const boxEl = document.getElementById(`${type}-box-${qid}`);

        if (activeSpeakingTimerId) {
          clearInterval(activeSpeakingTimerId);
          document
            .querySelectorAll(".speaking-timer-box.running")
            .forEach((b) => b.classList.remove("running"));
        }

        boxEl.classList.add("running");
        valEl.textContent = formatMMSS(remaining);

        activeSpeakingTimerId = setInterval(() => {
          remaining -= 1;
          if (remaining <= 0) {
            clearInterval(activeSpeakingTimerId);
            activeSpeakingTimerId = null;
            valEl.textContent = "00:00";
            boxEl.classList.remove("running");
          } else {
            valEl.textContent = formatMMSS(remaining);
          }
        }, 1000);
      });
    });

    // Toggle Model Answer
    lessonContainer.querySelectorAll(".toggle-speaking-model").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        speakingModelOpen[qid] = !speakingModelOpen[qid];
        renderThursday(dayData);
      });
    });

    // TTS Playback
    lessonContainer.querySelectorAll(".play-speaking-tts").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const rate = Number(btn.dataset.rate);
        const isSamePlaying =
          activeSpeakingTts &&
          activeSpeakingTts.qid === qid &&
          activeSpeakingTts.rate === rate;

        if (isSamePlaying) {
          stopAllSpeech();
          return;
        }

        const qObj = dayData.questions.find((q) => q.id === qid);
        if (qObj) {
          speakTextSentences(qObj.modelAnswer, rate, 1.0, qid);
        }
      });
    });

    // Mark Done
    lessonContainer.querySelectorAll(".mark-speaking-done").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        appState.speakingDone[qid] = !appState.speakingDone[qid];
        saveState();
        renderThursday(dayData);
        checkAndMarkDayCompletion(dayData);
      });
    });
  }

  // --- FRIDAY: Weekly Review ---
  function renderFriday(dayData) {
    const vocabSummaryHTML = `
      <article class="card">
        <h3 style="margin:0 0 10px 0; font-size:1rem; color:var(--navy-900);">이번 주 핵심 어휘 5개 한눈에 보기</h3>
        <div class="vocab-chips" style="margin-top:0;">
          ${dayData.reviewVocab
            .map(
              (v) =>
                `<span class="vocab-chip"><strong>${wrapClickableWords(v.word)}</strong>: ${escapeHtml(v.meaning)} <span style="color:var(--text-muted); font-size:0.72rem;">(${escapeHtml(v.day)})</span></span>`
            )
            .join("")}
        </div>
      </article>
    `;

    lessonContainer.innerHTML = `
      ${renderLessonHeader(dayData)}
      ${vocabSummaryHTML}
      ${renderQuestionsHTML(dayData.questions)}
    `;

    bindQuestionEvents(dayData);
  }

  function renderLesson() {
    const week = getCurrentWeek();
    const dayData = week.days[currentDayKey];

    if (currentDayKey === "mon") renderMonday(dayData);
    else if (currentDayKey === "tue") renderTuesday(dayData);
    else if (currentDayKey === "wed") renderWednesday(dayData);
    else if (currentDayKey === "thu") renderThursday(dayData);
    else if (currentDayKey === "fri") renderFriday(dayData);
  }

  // =========================================
  // Initialization
  // =========================================
  function init() {
    if ("speechSynthesis" in window) {
      refreshVoices();
      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
      } else {
        window.speechSynthesis.onvoiceschanged = refreshVoices;
      }
    }

    window.addEventListener("beforeunload", () => saveState(false));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        saveState(false);
      }
    });

    renderWeekSelector();
    renderProgressAndStreak();
    renderDayTabs();
    renderLesson();
    updateCompletionBanner();
    renderStudyTimer();
    startStudyTimer();

    try {
      const savedSyncId = localStorage.getItem(SYNC_ID_STORAGE_KEY);
      if (savedSyncId) {
        connectSync(savedSyncId);
      } else {
        setSyncUI("local", "로컬 저장");
      }
    } catch (e) {
      setSyncUI("local", "로컬 저장");
    }
  }

  init();
})();
