(() => {
  "use strict";

  const STORAGE_KEY = "ielts_micro_learning_v1";
  const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri"];

  // =========================================
  // State Management & localStorage
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

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          completedDays: parsed.completedDays || {},
          answers: parsed.answers || {},
          writingDrafts: parsed.writingDrafts || {},
          speakingDone: parsed.speakingDone || {},
          wrongNotes: Array.isArray(parsed.wrongNotes) ? parsed.wrongNotes : [],
          dailyStudySeconds: parsed.dailyStudySeconds || {}
        };
      }
    } catch (e) {
      console.warn("localStorage load failed:", e);
    }
    return {
      completedDays: {},
      answers: {},
      writingDrafts: {},
      speakingDone: {},
      wrongNotes: [],
      dailyStudySeconds: {}
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn("localStorage save failed:", e);
    }
  }

  let appState = loadState();
  let currentWeekNumber = curriculumData.weeks[0].weekNumber;
  let currentDayKey = getDefaultDayKey();

  // Study Timer State
  let timerRunning = true;
  let timerIntervalId = null;

  // TTS State
  let ttsRate = 1.0;
  let isPlayingDialogue = false;
  let dialogueStopRequested = false;

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

  // =========================================
  // Speech Synthesis (Web Speech API)
  // =========================================
  function stopAllSpeech() {
    dialogueStopRequested = true;
    isPlayingDialogue = false;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    document.querySelectorAll(".dialogue-line.speaking").forEach((el) => {
      el.classList.remove("speaking");
    });
  }

  function getEnglishVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === "en-GB" && v.localService) ||
      voices.find((v) => v.lang === "en-US" && v.localService) ||
      voices.find((v) => v.lang.startsWith("en-")) ||
      null
    );
  }

  function speakText(text, rate = 1.0, pitch = 1.0, onEnd = null) {
    if (!("speechSynthesis" in window)) {
      alert("현재 브라우저에서는 음성 재생(TTS)을 지원하지 않습니다.");
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getEnglishVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice ? voice.lang : "en-US";
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };
    window.speechSynthesis.speak(utterance);
  }

  function playDialogueSequence(dialogue, startIndex = 0) {
    if (!("speechSynthesis" in window)) {
      alert("현재 브라우저에서는 음성 재생(TTS)을 지원하지 않습니다.");
      return;
    }
    dialogueStopRequested = false;
    isPlayingDialogue = true;
    updateAudioPlayButtonUI();

    function playNext(idx) {
      if (dialogueStopRequested || idx >= dialogue.length) {
        isPlayingDialogue = false;
        document.querySelectorAll(".dialogue-line.speaking").forEach((el) => {
          el.classList.remove("speaking");
        });
        updateAudioPlayButtonUI();
        return;
      }

      document.querySelectorAll(".dialogue-line").forEach((el, i) => {
        el.classList.toggle("speaking", i === idx);
      });

      const line = dialogue[idx];
      const utterance = new SpeechSynthesisUtterance(line.text);
      const voice = getEnglishVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = voice ? voice.lang : "en-US";
      utterance.rate = ttsRate;
      utterance.pitch = line.voicePitch || 1.0;

      utterance.onend = () => {
        if (!dialogueStopRequested) {
          setTimeout(() => playNext(idx + 1), 280);
        }
      };
      utterance.onerror = () => {
        isPlayingDialogue = false;
        updateAudioPlayButtonUI();
      };
      window.speechSynthesis.speak(utterance);
    }

    window.speechSynthesis.cancel();
    playNext(startIndex);
  }

  function updateAudioPlayButtonUI() {
    const playBtn = document.getElementById("playDialogueBtn");
    if (playBtn) {
      playBtn.textContent = isPlayingDialogue ? "⏹ 정지하기" : "▶ 대화 음성 듣기";
    }
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
          ? `<div class="question-statement">${escapeHtml(q.sentenceBefore)} <span class="blank-pill">${saved ? escapeHtml(saved.userAnswer) : "______"}</span> ${escapeHtml(q.sentenceAfter || "")}</div>`
          : q.statement
          ? `<div class="question-statement">${escapeHtml(q.statement)}</div>`
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
                  `<span class="vocab-chip"><strong>${escapeHtml(v.word)}</strong> ${escapeHtml(v.meaning)}</span>`
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
          <div class="dialogue-en">${escapeHtml(line.text)}</div>
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
        updateAudioPlayButtonUI();
      } else {
        playDialogueSequence(dayData.dialogue, 0);
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
          playDialogueSequence(dayData.dialogue, 0);
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
            <span class="sentence-en">${escapeHtml(s.en)}</span>
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
          <h3 class="passage-title">${escapeHtml(dayData.passageTitle)}</h3>
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
        <p class="question-prompt" style="margin-top:6px;">${escapeHtml(dayData.writingPrompt)}</p>
        <p class="lesson-desc" style="margin-top:4px;">${escapeHtml(dayData.writingPromptKo)}</p>

        <div style="margin-top:14px;">
          <div style="font-size:0.84rem; font-weight:600; color:var(--navy-800);">필수 포함 영단어 (사용 시 초록색으로 체크됩니다):</div>
          <div class="required-words-row" id="requiredWordsRow">
            ${dayData.requiredWords
              .map((rw) => {
                const used = checkWordUsed(rw.word);
                return `<span class="req-word-pill ${used ? "used" : ""}" data-word="${escapeHtml(rw.word)}">${used ? "✓ " : ""}${escapeHtml(rw.word)} (${escapeHtml(rw.meaning)})</span>`;
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
          <p style="margin:0 0 6px 0; font-weight:500; color:var(--navy-900);">${escapeHtml(dayData.modelAnswer)}</p>
          <p style="margin:0 0 10px 0; font-size:0.85rem; color:var(--text-muted);">${escapeHtml(dayData.modelAnswerKo)}</p>
          <div style="font-size:0.84rem;">
            <strong>핵심 표현 정리:</strong>
            <ul style="margin:4px 0 0 18px; padding:0;">
              ${dayData.keyExpressions
                .map(
                  (ke) =>
                    `<li><strong>${escapeHtml(ke.expr)}</strong> — ${escapeHtml(ke.desc)}</li>`
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
        pill.textContent = `${used ? "✓ " : ""}${w} (${meaning})`;
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
            <h3 style="margin:0; font-size:1.05rem; color:var(--navy-900);">${escapeHtml(q.question)}</h3>
            <p class="lesson-desc">${escapeHtml(q.questionKo)}</p>

            <div>
              <div style="font-size:0.8rem; font-weight:600; color:var(--navy-800); margin-bottom:6px;">💡 아이디어 힌트 키워드</div>
              <div class="hint-chips">
                ${q.hints
                  .map(
                    (h) =>
                      `<span class="hint-chip"><strong>${escapeHtml(h.en)}</strong> (${escapeHtml(h.ko)})</span>`
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
              <p style="margin:0 0 6px 0; color:var(--navy-900);">${escapeHtml(q.modelAnswer)}</p>
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
        const qObj = dayData.questions.find((q) => q.id === qid);
        if (qObj) {
          speakText(qObj.modelAnswer, rate, 1.0);
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
                `<span class="vocab-chip"><strong>${escapeHtml(v.word)}</strong>: ${escapeHtml(v.meaning)} <span style="color:var(--text-muted); font-size:0.72rem;">(${escapeHtml(v.day)})</span></span>`
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
      window.speechSynthesis.getVoices();
    }
    renderWeekSelector();
    renderProgressAndStreak();
    renderDayTabs();
    renderLesson();
    updateCompletionBanner();
    renderStudyTimer();
    startStudyTimer();
  }

  init();
})();
