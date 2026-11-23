import asyncio
import html
import io
import logging
import os
import random
import sqlite3
from datetime import time
from zoneinfo import ZoneInfo

import httpx
from dotenv import load_dotenv
from gtts import gTTS
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.constants import ParseMode
from telegram.ext import (
    ApplicationBuilder,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

# 1. 환경변수 및 기본 설정
load_dotenv()
TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
DEFAULT_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "8962382454")

KST = ZoneInfo("Asia/Seoul")
DB_PATH = "omnivocab_free.db"
FREE_DICT_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/{word}"

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger("OmniVocabFree")

LEVEL_LABELS = {
    "kindergarten": "🐥 유치원 (기초 파닉스/생활 단어)",
    "elementary": "🌱 초등 (일상 필수 어휘)",
    "secondary": "📘 중고등 (수능/내신 빈출)",
    "advanced": "🎓 대학/고급 (GRE/SAT/학술)",
}

# 2. 수준별 어휘 풀
WORD_BANK = {
    "kindergarten": [
        "apple", "ball", "cat", "dog", "egg", "fish", "goat", "hat", "ice", "jam",
        "kite", "lion", "moon", "nest", "owl", "pig", "queen", "rain", "sun", "tree",
        "umbrella", "van", "water", "box", "yellow", "zebra", "book", "milk", "star", "bird",
        "red", "blue", "green", "happy", "jump", "run", "eat", "sleep", "smile", "hand",
    ],
    "elementary": [
        "adventure", "brave", "clever", "delicious", "excited", "friendly", "gentle",
        "helpful", "imagine", "journey", "kindness", "library", "morning", "nature",
        "ocean", "practice", "question", "remember", "season", "together", "useful",
        "vacation", "weather", "yesterday", "animal", "bridge", "cloud", "dream", "earth", "forest",
    ],
    "secondary": [
        "achieve", "benefit", "challenge", "determine", "efficient", "focus", "generate",
        "hesitate", "influence", "justify", "knowledge", "maintain", "negotiate", "observe",
        "persuade", "quality", "require", "significant", "transform", "unique", "valuable",
        "abandon", "accurate", "adequate", "analyze", "approach", "capacity", "concept", "diverse", "emerge",
    ],
    "advanced": [
        "ubiquitous", "ephemeral", "pragmatic", "ambiguous", "resilient", "eloquent",
        "meticulous", "paradigm", "scrutinize", "mitigate", "alleviate", "corroborate",
        "discrepancy", "exacerbate", "fastidious", "gregarious", "hypothetical", "immutable",
        "juxtapose", "lucid", "magnanimous", "nostalgia", "ostentatious", "pervasive",
        "quintessential", "reconcile", "superfluous", "tenacious", "unprecedented", "vindicate",
    ],
}


# 3. SQLite DB 관리 (수준 설정 및 중복 방지)
def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                chat_id TEXT PRIMARY KEY,
                level TEXT DEFAULT 'secondary',
                daily_enabled INTEGER DEFAULT 1
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS recommended_words (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                chat_id TEXT,
                level TEXT,
                word TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(chat_id, word)
            )
        """)
        if DEFAULT_CHAT_ID:
            conn.execute(
                "INSERT OR IGNORE INTO users (chat_id, level, daily_enabled) VALUES (?, 'secondary', 1)",
                (str(DEFAULT_CHAT_ID),),
            )
        conn.commit()


def get_user_level(chat_id: str) -> str:
    with sqlite3.connect(DB_PATH) as conn:
        row = conn.execute("SELECT level FROM users WHERE chat_id = ?", (str(chat_id),)).fetchone()
        if row:
            return row[0]
        conn.execute("INSERT INTO users (chat_id) VALUES (?)", (str(chat_id),))
        conn.commit()
        return "secondary"


def set_user_level(chat_id: str, level: str):
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            INSERT INTO users (chat_id, level) VALUES (?, ?)
            ON CONFLICT(chat_id) DO UPDATE SET level = excluded.level
            """,
            (str(chat_id), level),
        )
        conn.commit()


def get_recommended_set(chat_id: str) -> set[str]:
    with sqlite3.connect(DB_PATH) as conn:
        rows = conn.execute(
            "SELECT word FROM recommended_words WHERE chat_id = ?", (str(chat_id),)
        ).fetchall()
        return {r[0].lower() for r in rows}


def save_recommended_words(chat_id: str, level: str, words: list[str]):
    with sqlite3.connect(DB_PATH) as conn:
        conn.executemany(
            "INSERT OR IGNORE INTO recommended_words (chat_id, level, word) VALUES (?, ?, ?)",
            [(str(chat_id), level, w.lower().strip()) for w in words],
        )
        conn.commit()


def get_active_chats() -> list[tuple[str, str]]:
    with sqlite3.connect(DB_PATH) as conn:
        return conn.execute("SELECT chat_id, level FROM users WHERE daily_enabled = 1").fetchall()


# 4. 무료 번역 및 TTS 유틸리티
POS_KO_MAP = {
    "noun": "명사",
    "verb": "동사",
    "adjective": "형용사",
    "adverb": "부사",
    "pronoun": "대명사",
    "preposition": "전치사",
    "conjunction": "접속사",
    "interjection": "감탄사",
}
TRANSLATE_SEM = asyncio.Semaphore(3)


def format_pos(pos_list: list[str]) -> str:
    if not pos_list:
        return "기타"
    return ", ".join(
        f"{p}({POS_KO_MAP[p.lower()]})" if p.lower() in POS_KO_MAP else p
        for p in pos_list
    )


def _extract_gtx_text(payload) -> str:
    if not isinstance(payload, list) or not payload or not isinstance(payload[0], list):
        return ""
    return "".join(chunk[0] for chunk in payload[0] if isinstance(chunk, list) and chunk and chunk[0]).strip()


async def translate_ko(text: str, client: httpx.AsyncClient | None = None) -> str:
    if not text:
        return ""
    async with TRANSLATE_SEM:
        owns_client = client is None
        http = client or httpx.AsyncClient(timeout=8.0)
        try:
            # 1차: Google Translate GTX 엔드포인트
            try:
                r1 = await http.get(
                    "https://translate.googleapis.com/translate_a/single",
                    params={"client": "gtx", "sl": "en", "tl": "ko", "dt": "t", "q": text},
                    timeout=8.0,
                )
                if r1.status_code == 200:
                    res = _extract_gtx_text(r1.json())
                    if res:
                        return res
            except Exception:
                pass

            # 2차 폴백: MyMemory 무료 번역 API
            try:
                r2 = await http.get(
                    "https://api.mymemory.translated.net/get",
                    params={"q": text[:450], "langpair": "en|ko"},
                    timeout=8.0,
                )
                if r2.status_code == 200:
                    res = r2.json().get("responseData", {}).get("translatedText", "").strip()
                    if res and res.upper() != text.upper():
                        return res
            except Exception:
                pass
            return ""
        finally:
            if owns_client:
                await http.aclose()


async def fetch_word_bilingual_ko(
    word: str, client: httpx.AsyncClient
) -> tuple[str, dict[str, list[str]]]:
    """GTX dt=t + dt=bd를 호출해 (대표 한글 뜻, {품사: [대표 한글 단어들]})을 반환합니다."""
    async with TRANSLATE_SEM:
        try:
            r = await client.get(
                "https://translate.googleapis.com/translate_a/single",
                params=[
                    ("client", "gtx"),
                    ("sl", "en"),
                    ("tl", "ko"),
                    ("dt", "t"),
                    ("dt", "bd"),
                    ("q", word),
                ],
                timeout=8.0,
            )
            if r.status_code == 200:
                payload = r.json()
                main_ko = _extract_gtx_text(payload)
                pos_map: dict[str, list[str]] = {}
                if len(payload) > 1 and isinstance(payload[1], list):
                    for item in payload[1]:
                        if isinstance(item, list) and len(item) >= 2 and isinstance(item[1], list):
                            pos_key = str(item[0]).lower().strip()
                            words = [str(w).strip() for w in item[1] if str(w).strip()]
                            if words:
                                pos_map[pos_key] = words[:3]
                if main_ko or pos_map:
                    return main_ko, pos_map
        except Exception:
            pass
    fallback_ko = await translate_ko(word, client)
    return fallback_ko, {}


def _make_tts_sync(text: str) -> io.BytesIO:
    buf = io.BytesIO()
    gTTS(text=text, lang="en").write_to_fp(buf)
    buf.seek(0)
    return buf


async def generate_tts(text: str) -> io.BytesIO:
    return await asyncio.to_thread(_make_tts_sync, text)


CHOSEONG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"
JUNGSEONG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"
JONGSEONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]

IPA_TOKENS = [
    ("tʃ", ("C", "ㅊ")), ("dʒ", ("C", "ㅈ")), ("ts", ("C", "ㅊ")), ("dz", ("C", "ㅈ")),
    ("juː", ("V", ["ㅠ"])), ("ju", ("V", ["ㅠ"])),
    ("ja", ("V", ["ㅑ"])), ("je", ("V", ["ㅖ"])), ("jɛ", ("V", ["ㅖ"])),
    ("jo", ("V", ["ㅛ"])), ("jɔ", ("V", ["ㅛ"])), ("jə", ("V", ["ㅕ"])), ("jʌ", ("V", ["ㅕ"])),
    ("wa", ("V", ["ㅘ"])), ("wɑ", ("V", ["ㅘ"])), ("we", ("V", ["ㅞ"])), ("wɛ", ("V", ["ㅞ"])),
    ("wi", ("V", ["ㅟ"])), ("wɪ", ("V", ["ㅟ"])), ("wo", ("V", ["ㅝ"])), ("wɔ", ("V", ["ㅝ"])), ("wə", ("V", ["ㅝ"])),
    ("aɪ", ("V", ["ㅏ", "ㅣ"])), ("eɪ", ("V", ["ㅔ", "ㅣ"])), ("ɔɪ", ("V", ["ㅗ", "ㅣ"])),
    ("aʊ", ("V", ["ㅏ", "ㅜ"])), ("oʊ", ("V", ["ㅗ", "ㅜ"])), ("əʊ", ("V", ["ㅗ", "ㅜ"])),
    ("ɪə", ("V", ["ㅣ", "ㅓ"])), ("eə", ("V", ["ㅔ", "ㅓ"])), ("ʊə", ("V", ["ㅜ", "ㅓ"])),
    ("ɜːr", ("V", ["ㅓ"])), ("ɜr", ("V", ["ㅓ"])), ("ər", ("V", ["ㅓ"])),
    ("ɑːr", ("V", ["ㅏ"])), ("ɑr", ("V", ["ㅏ"])), ("ɔːr", ("V", ["ㅗ"])), ("ɔr", ("V", ["ㅗ"])),
    ("iː", ("V", ["ㅣ"])), ("ɑː", ("V", ["ㅏ"])), ("ɔː", ("V", ["ㅗ"])), ("uː", ("V", ["ㅜ"])), ("ɜː", ("V", ["ㅓ"])),
    ("i", ("V", ["ㅣ"])), ("ɪ", ("V", ["ㅣ"])), ("e", ("V", ["ㅔ"])), ("ɛ", ("V", ["ㅔ"])),
    ("æ", ("V", ["ㅐ"])), ("a", ("V", ["ㅏ"])), ("ɑ", ("V", ["ㅏ"])), ("ɒ", ("V", ["ㅏ"])),
    ("ɔ", ("V", ["ㅗ"])), ("o", ("V", ["ㅗ"])), ("u", ("V", ["ㅜ"])), ("ʊ", ("V", ["ㅜ"])),
    ("ʌ", ("V", ["ㅓ"])), ("ə", ("V", ["ㅓ"])), ("ɜ", ("V", ["ㅓ"])), ("ɝ", ("V", ["ㅓ"])), ("ɚ", ("V", ["ㅓ"])), ("ɐ", ("V", ["ㅓ"])),
    ("p", ("C", "ㅍ")), ("b", ("C", "ㅂ")), ("t", ("C", "ㅌ")), ("d", ("C", "ㄷ")),
    ("k", ("C", "ㅋ")), ("g", ("C", "ㄱ")), ("ɡ", ("C", "ㄱ")),
    ("f", ("C", "ㅍ")), ("v", ("C", "ㅂ")), ("θ", ("C", "ㅅ")), ("ð", ("C", "ㄷ")),
    ("s", ("C", "ㅅ")), ("z", ("C", "ㅈ")), ("ʃ", ("C", "ㅅ")), ("ʒ", ("C", "ㅈ")),
    ("h", ("C", "ㅎ")), ("m", ("C", "ㅁ")), ("n", ("C", "ㄴ")), ("ŋ", ("C", "ㅇ_JONG")),
    ("l", ("C", "ㄹ")), ("r", ("C", "ㄹ")), ("ɹ", ("C", "ㄹ")), ("ɾ", ("C", "ㄹ")),
    ("w", ("C", "ㅇ")), ("j", ("C", "ㅇ")),
]


def _compose_hangul(cho: str, jung: str, jong: str = "") -> str:
    c_idx = CHOSEONG.index(cho) if cho in CHOSEONG else CHOSEONG.index("ㅇ")
    v_idx = JUNGSEONG.index(jung) if jung in JUNGSEONG else JUNGSEONG.index("ㅡ")
    j_idx = JONGSEONG.index(jong) if jong in JONGSEONG else 0
    return chr(0xAC00 + c_idx * 588 + v_idx * 28 + j_idx)


def ipa_to_korean(ipa: str, fallback_word: str = "") -> str:
    raw = (ipa or "").strip().strip("/[]")
    # IPA가 실제 발음기호 없이 영단어 그대로 들어온 경우 간이 처리
    if not raw or (fallback_word and raw.lower() == fallback_word.lower()):
        raw = fallback_word.lower()

    cleaned = "".join(ch for ch in raw if ch not in "ˈˌ.ː:() ")
    tokens = []
    idx = 0
    while idx < len(cleaned):
        matched = False
        for pat, val in IPA_TOKENS:
            if cleaned.startswith(pat, idx):
                tokens.append(val)
                idx += len(pat)
                matched = True
                break
        if not matched:
            idx += 1

    if not tokens:
        return fallback_word

    syllables: list[tuple[str, str, str]] = []
    pending_c: str | None = None

    for pos_i, (kind, val) in enumerate(tokens):
        next_is_vowel = pos_i + 1 < len(tokens) and tokens[pos_i + 1][0] == "V"

        if kind == "V":
            vowels: list[str] = val
            cho = pending_c if (pending_c and pending_c != "ㅇ_JONG") else "ㅇ"
            pending_c = None
            syllables.append((cho, vowels[0], ""))
            for extra_v in vowels[1:]:
                syllables.append(("ㅇ", extra_v, ""))
        else:
            if val == "ㅇ_JONG":
                if syllables and not syllables[-1][2]:
                    c, v, _ = syllables[-1]
                    syllables[-1] = (c, v, "ㅇ")
                else:
                    syllables.append(("ㅇ", "ㅡ", "ㅇ"))
                continue

            if pending_c:
                # 이전 대기 자음이 있는데 모음 없이 또 자음이 온 경우 'ㅡ' 보충
                syllables.append((pending_c, "ㅡ", ""))
                pending_c = None

            if next_is_vowel:
                pending_c = val
            else:
                # 모음 뒤 받침으로 붙일 수 있는 자음 (ㅁ, ㄴ, ㄹ)
                if val in ("ㅁ", "ㄴ", "ㄹ") and syllables and not syllables[-1][2]:
                    c, v, _ = syllables[-1]
                    syllables[-1] = (c, v, val)
                else:
                    syllables.append((val, "ㅡ", ""))

    if pending_c and pending_c != "ㅇ_JONG":
        syllables.append((pending_c, "ㅡ", ""))

    return "".join(_compose_hangul(c, v, j) for c, v, j in syllables)


def build_fallback_example(word: str, primary_pos: str) -> str:
    pos = primary_pos.lower()
    if pos == "verb":
        return f"We should {word} this carefully before making a decision."
    if pos == "adjective":
        return f"Her explanation was very {word} and easy to understand."
    if pos == "adverb":
        return f"He answered the question {word} during the meeting."
    return f"Knowing how to use the word '{word}' naturally is very helpful."


# 5. Free Dictionary API 조회 로직
async def fetch_dictionary_entry(client: httpx.AsyncClient, word: str) -> dict | None:
    try:
        resp = await client.get(FREE_DICT_URL.format(word=word.strip().lower()), timeout=10.0)
        if resp.status_code != 200:
            return None
        entries = resp.json()
        if not entries:
            return None
        data = entries[0]

        phonetic = data.get("phonetic", "")
        audio_url = ""
        for entry in entries:
            for p in entry.get("phonetics", []):
                if not phonetic and p.get("text"):
                    phonetic = p["text"]
                if not audio_url and p.get("audio"):
                    audio_url = p["audio"]

        meanings = []
        examples = []
        pos_list = []

        for entry in entries:
            for m in entry.get("meanings", []):
                pos = m.get("partOfSpeech", "")
                if pos and pos not in pos_list:
                    pos_list.append(pos)
                for d in m.get("definitions", []):
                    defn = d.get("definition", "").strip()
                    if defn and len(meanings) < 3:
                        meanings.append({"pos": pos, "en": defn})
                    ex = d.get("example", "").strip()
                    if ex and ex not in examples and len(examples) < 2:
                        examples.append(ex)

        primary_pos = pos_list[0] if pos_list else "noun"
        if not meanings:
            meanings.append({"pos": primary_pos, "en": f"An English {primary_pos}: {word}."})
        if not examples:
            examples.append(build_fallback_example(data.get("word", word), primary_pos))

        resolved_word = data.get("word", word)
        (word_ko, pos_map), meaning_translations, example_translations = await asyncio.gather(
            fetch_word_bilingual_ko(resolved_word, client),
            asyncio.gather(*[translate_ko(m["en"], client) for m in meanings]),
            asyncio.gather(*[translate_ko(ex, client) for ex in examples]),
        )

        for i, m in enumerate(meanings):
            pos_key = m["pos"].lower()
            pos_words = list(pos_map.get(pos_key, []))
            if not pos_words and word_ko:
                if pos_key == "noun" and (word_ko.endswith("적인") or word_ko.endswith("의")):
                    pos_words = [f"{word_ko} 것"]
                else:
                    pos_words = [word_ko]
            elif word_ko and pos_key in pos_map and word_ko not in pos_words:
                pos_words = [word_ko] + pos_words[:2]

            m["ko"] = meaning_translations[i] or word_ko or m["en"]
            m["core_ko"] = ", ".join(pos_words[:3]) if pos_words else m["ko"]

        ex_pairs = [
            {"en": examples[i], "ko": example_translations[i] or "예문 해석을 불러오지 못했습니다."}
            for i in range(len(examples))
        ]

        resolved_phonetic = phonetic or f"/{resolved_word}/"
        phonetic_ko = ipa_to_korean(resolved_phonetic, resolved_word)

        return {
            "word": resolved_word,
            "word_ko": word_ko or meanings[0]["core_ko"],
            "phonetic": resolved_phonetic,
            "phonetic_ko": phonetic_ko,
            "audio_url": audio_url,
            "pos_list": pos_list or [primary_pos],
            "meanings": meanings,
            "examples": ex_pairs,
        }
    except Exception as e:
        logger.warning(f"사전 조회 실패 ({word}): {e}")
        return None


# 6. 텔레그램 핸들러
async def start_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = str(update.effective_chat.id)
    level = get_user_level(chat_id)
    msg = (
        f"📚 <b>OmniVocab 무료 영어 사전 봇</b>\n"
        f"🆔 Chat ID: <code>{chat_id}</code>\n"
        f"🎯 현재 수준: <b>{LEVEL_LABELS[level]}</b>\n\n"
        "<b>[사용 방법]</b>\n"
        "• 영어 단어 입력 → 품사, 한글 뜻, 영영 풀이, 예문, 발음(TTS) 즉시 출력\n"
        "• /level → 학습 수준 변경 (유치원 ~ 대학/고급)\n"
        "• /daily → 오늘의 수준별 단어 15개 즉시 받기\n"
        "• 매일 오전 09:00(KST) 자동 추천 발송"
    )
    await update.message.reply_text(msg, parse_mode=ParseMode.HTML)


async def level_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton(label, callback_data=f"lvl:{key}")]
        for key, label in LEVEL_LABELS.items()
    ]
    await update.message.reply_text(
        "🎯 학습 수준을 선택하세요:", reply_markup=InlineKeyboardMarkup(keyboard)
    )


async def level_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    level = query.data.split(":")[1]
    chat_id = str(query.message.chat_id)
    set_user_level(chat_id, level)
    await query.edit_message_text(
        f"✅ 학습 수준이 <b>{LEVEL_LABELS[level]}</b>(으)로 변경되었습니다.",
        parse_mode=ParseMode.HTML,
    )


async def send_daily_words(chat_id: str, level: str, context: ContextTypes.DEFAULT_TYPE):
    pool = WORD_BANK.get(level, WORD_BANK["secondary"])
    already_sent = get_recommended_set(chat_id)
    candidates = [w for w in pool if w.lower() not in already_sent]

    if len(candidates) < 15:
        candidates = pool[:]

    selected = random.sample(candidates, min(15, len(candidates)))
    sem = asyncio.Semaphore(4)

    async def limited_fetch(client, w):
        async with sem:
            return await fetch_dictionary_entry(client, w)

    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(*[limited_fetch(client, w) for w in selected])

    valid_entries = [r for r in results if r]
    if not valid_entries:
        await context.bot.send_message(chat_id=chat_id, text="⚠️ 단어 정보를 가져오지 못했습니다.")
        return

    save_recommended_words(chat_id, level, [e["word"] for e in valid_entries])

    header = f"📅 <b>오늘의 추천 영단어 ({len(valid_entries)}개)</b>\n🎯 {LEVEL_LABELS[level]}\n\n"
    blocks = []
    for idx, e in enumerate(valid_entries, 1):
        word = html.escape(e["word"])
        phonetic = html.escape(e["phonetic"])
        phonetic_ko = html.escape(e["phonetic_ko"])
        pos = html.escape(format_pos(e["pos_list"][:2]))
        core_ko = html.escape(e["meanings"][0]["core_ko"])
        meaning_ko = html.escape(e["meanings"][0]["ko"])
        short_def = e["meanings"][0]["en"]
        if len(short_def) > 140:
            short_def = short_def[:137].rstrip() + "..."
        short_def = html.escape(short_def)
        ex_en = html.escape(e["examples"][0]["en"])
        ex_ko = html.escape(e["examples"][0]["ko"])

        blocks.append(
            f"<b>{idx}. {word}</b> <code>{phonetic}</code> [{phonetic_ko}]\n"
            f"🏷 <b>품사:</b> {pos}\n"
            f"💡 <b>핵심 뜻:</b> {core_ko}\n"
            f"💬 <b>뜻 풀이:</b> {meaning_ko}\n"
            f"📖 <b>영영 풀이:</b> <i>{short_def}</i>\n"
            f"📝 <b>예문:</b> {ex_en}\n"
            f"🇰🇷 <b>해석:</b> {ex_ko}"
        )

    # 5개씩 나누어 전송해 텔레그램 길이 제한(4096자) 방지
    chunk_size = 5
    for start in range(0, len(blocks), chunk_size):
        chunk_text = "\n\n".join(blocks[start : start + chunk_size])
        if start == 0:
            chunk_text = header + chunk_text
        await context.bot.send_message(chat_id=chat_id, text=chunk_text, parse_mode=ParseMode.HTML)


async def daily_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = str(update.effective_chat.id)
    level = get_user_level(chat_id)
    wait = await update.message.reply_text("⏳ 오늘의 단어 15개를 사전에서 불러오는 중입니다...")
    await send_daily_words(chat_id, level, context)
    await wait.delete()


async def search_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    word_input = update.message.text.strip()
    if not word_input or " " in word_input or not word_input.isascii():
        await update.message.reply_text("검색할 영어 단어 1개를 입력해 주세요. (예: resilient)")
        return

    wait = await update.message.reply_text(
        f"🔍 '<b>{html.escape(word_input)}</b>' 사전 검색 중...", parse_mode=ParseMode.HTML
    )

    async with httpx.AsyncClient() as client:
        info = await fetch_dictionary_entry(client, word_input)

    if not info:
        await wait.edit_text(
            f"❌ '<b>{html.escape(word_input)}</b>'에 대한 사전 정보를 찾지 못했습니다.",
            parse_mode=ParseMode.HTML,
        )
        return

    word = html.escape(info["word"])
    phonetic = html.escape(info["phonetic"])
    phonetic_ko = html.escape(info["phonetic_ko"])
    pos = html.escape(format_pos(info["pos_list"]))
    word_ko = html.escape(info["word_ko"])

    meanings_txt = "\n".join(
        f"• <b>[{html.escape(format_pos([m['pos']]))}]</b> 핵심 뜻: <b>{html.escape(m['core_ko'])}</b>\n"
        f"  {html.escape(m['ko'])}\n"
        f"  <i>({html.escape(m['en'])})</i>"
        for m in info["meanings"]
    )
    examples_txt = "\n".join(
        f"• {html.escape(ex['en'])}\n  🇰🇷 {html.escape(ex['ko'])}"
        for ex in info["examples"]
    )

    dict_url = f"https://en.dict.naver.com/#/search?query={word}"
    audio_link = f"\n🎧 <a href='{info['audio_url']}'>원어민 발음 파일 링크</a>" if info["audio_url"] else ""

    reply_text = (
        f"📖 <b>{word}</b> ({word_ko}) <code>{phonetic}</code> [{phonetic_ko}]\n"
        f"🏷 <b>품사:</b> {pos}\n\n"
        f"💡 <b>한글 뜻 및 영영 풀이:</b>\n{meanings_txt}\n\n"
        f"📝 <b>예문 및 해석:</b>\n{examples_txt}\n\n"
        f"🔗 <a href='{dict_url}'>네이버 사전에서 더보기</a>{audio_link}"
    )

    await wait.edit_text(reply_text, parse_mode=ParseMode.HTML, disable_web_page_preview=True)

    audio_buf = await generate_tts(info["word"])
    await update.message.reply_voice(voice=audio_buf, caption=f"🔊 '{info['word']}' 발음 듣기")


async def daily_job(context: ContextTypes.DEFAULT_TYPE):
    for chat_id, level in get_active_chats():
        try:
            await send_daily_words(chat_id, level, context)
        except Exception as e:
            logger.error(f"자동 발송 실패 (chat_id={chat_id}): {e}")


def main():
    init_db()
    app = ApplicationBuilder().token(TELEGRAM_TOKEN).build()

    app.add_handler(CommandHandler("start", start_cmd))
    app.add_handler(CommandHandler("help", start_cmd))
    app.add_handler(CommandHandler("level", level_cmd))
    app.add_handler(CommandHandler("daily", daily_cmd))
    app.add_handler(CallbackQueryHandler(level_callback, pattern="^lvl:"))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, search_handler))

    app.job_queue.run_daily(daily_job, time=time(hour=9, minute=0, tzinfo=KST))

    logger.info(f"OmniVocab 무료 사전 봇 시작 (기본 Chat ID: {DEFAULT_CHAT_ID})")
    app.run_polling()


if __name__ == "__main__":
    main()
