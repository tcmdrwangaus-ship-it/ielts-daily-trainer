/**
 * IELTS 4.5~5.0 마이크로 러닝 커리큘럼 데이터
 * 
 * [확장 가이드]
 * 새로운 주차를 추가하려면 `curriculumData.weeks` 배열에
 * `weekNumber: 2`, `title: "..."`, `days: { mon, tue, wed, thu, fri }`
 * 구조의 객체를 추가하면 자동으로 주차 선택 메뉴에 반영됩니다.
 */
const curriculumData = {
  targetBand: "4.5 - 5.0",
  weeks: [
    {
      weekNumber: 1,
      title: "Week 1: 직장인·성인의 일상과 학습 습관",
      subtitle: "기초 필수 어휘 및 핵심 문장 구조 다지기",
      days: {
        // ==========================================
        // 월요일: Listening (Web Speech API TTS + 빈칸 3문제)
        // ==========================================
        mon: {
          dayKey: "mon",
          dayLabel: "월",
          dayFullLabel: "월요일",
          skill: "Listening",
          title: "도서관 저녁 강좌 등록하기",
          description: "지역 도서관 직원과 직장인의 짧은 대화를 듣고 핵심 정보를 파악해 보세요.",
          estimatedMinutes: 7,
          vocabHighlights: [
            { word: "register", meaning: "등록하다", example: "I'd like to register for the evening class." },
            { word: "schedule", meaning: "일정, 시간표", example: "Let me check the class schedule." }
          ],
          dialogue: [
            {
              speaker: "Staff",
              voicePitch: 1.1,
              text: "Good evening! Welcome to the Central City Library. How can I help you today?",
              ko: "안녕하세요! 센트럴 시티 도서관에 오신 것을 환영합니다. 오늘 무엇을 도와드릴까요?"
            },
            {
              speaker: "Daniel",
              voicePitch: 0.9,
              text: "Hi, I work nearby and I'd like to register for an evening English class.",
              ko: "안녕하세요, 근처에서 일하는데 저녁 영어 수업에 등록하고 싶습니다."
            },
            {
              speaker: "Staff",
              voicePitch: 1.1,
              text: "Of course! We have a beginner conversation class every Tuesday and Thursday.",
              ko: "물론이죠! 매주 화요일과 목요일에 초급 회화 수업이 있습니다."
            },
            {
              speaker: "Daniel",
              voicePitch: 0.9,
              text: "That fits my schedule. What time does the class start?",
              ko: "제 일정에 잘 맞네요. 수업은 몇 시에 시작하나요?"
            },
            {
              speaker: "Staff",
              voicePitch: 1.1,
              text: "It starts at 7:30 p.m. and finishes at 8:30 p.m. in Room 204.",
              ko: "오후 7시 30분에 시작해서 8시 30분에 204호에서 끝납니다."
            },
            {
              speaker: "Daniel",
              voicePitch: 0.9,
              text: "Great. Do I need to pay any fee or bring anything?",
              ko: "좋네요. 비용을 내야 하거나 준비물이 있나요?"
            },
            {
              speaker: "Staff",
              voicePitch: 1.1,
              text: "The class is completely free for local workers. Just bring your ID card to get a library pass.",
              ko: "지역 직장인에게는 수업이 완전히 무료입니다. 도서관 출입증을 발급받기 위해 신분증만 가져오세요."
            },
            {
              speaker: "Daniel",
              voicePitch: 0.9,
              text: "Thank you so much. I will see you next Tuesday!",
              ko: "정말 감사합니다. 다음 주 화요일에 뵙겠습니다!"
            }
          ],
          questions: [
            {
              id: "w1-mon-q1",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (1/3)",
              sentenceBefore: "We have a beginner conversation class every",
              sentenceAfter: "and Thursday.",
              options: ["Monday", "Tuesday", "Wednesday", "Friday"],
              answer: "Tuesday",
              explanation: "직원(Staff)이 'every Tuesday and Thursday'라고 안내했습니다. IELTS Listening Part 1에서는 요일과 날짜 철자를 정확히 듣는 것이 중요합니다.",
              translation: "매주 화요일과 목요일에 초급 회화 수업이 있습니다."
            },
            {
              id: "w1-mon-q2",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (2/3)",
              sentenceBefore: "It starts at 7:30 p.m. and finishes at 8:30 p.m. in",
              sentenceAfter: ".",
              options: ["Room 104", "Room 204", "Room 240", "Room 402"],
              answer: "Room 204",
              explanation: "직원이 'in Room 204'라고 말했습니다. 숫자 204(two-oh-four)와 240(two-forty)을 구분해서 듣는 연습이 필요합니다.",
              translation: "오후 7시 30분에 시작해서 8시 30분에 204호에서 끝납니다."
            },
            {
              id: "w1-mon-q3",
              type: "short",
              prompt: "대화 스크립트 빈칸 채우기 (3/3) - 한 단어로 입력하세요",
              sentenceBefore: "The class is completely",
              sentenceAfter: "for local workers. Just bring your ID card.",
              placeholder: "정답 단어 입력 (예: free)",
              answer: "free",
              acceptedAnswers: ["free"],
              explanation: "직원이 'The class is completely free for local workers.'라고 말했습니다. 비용이 들지 않는다는 뜻의 'free'가 정답입니다.",
              translation: "지역 직장인에게는 수업이 완전히 무료입니다. 신분증만 가져오세요."
            }
          ]
        },

        // ==========================================
        // 화요일: Reading (150단어 지문 + 문장별 해석 토글 + 3문제)
        // ==========================================
        tue: {
          dayKey: "tue",
          dayLabel: "화",
          dayFullLabel: "화요일",
          skill: "Reading",
          title: "바쁜 성인을 위한 하루 10분 마이크로 러닝",
          description: "짧은 실용 지문을 읽고 True/False/Not Given 및 핵심 동의어 문제를 풀어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "concentrate", meaning: "집중하다", example: "It is easier to concentrate for ten minutes." }
          ],
          passageTitle: "Why Short Daily Study Works for Busy Adults",
          sentences: [
            {
              en: "Many working adults want to improve their English, but they often feel too tired after a long day at the office.",
              ko: "많은 직장인 성인들이 영어를 향상시키고 싶어 하지만, 사무실에서 긴 하루를 보낸 후에는 종종 너무 피곤함을 느낍니다."
            },
            {
              en: "In the past, people believed that studying for two or three hours at once was the best way to learn a language.",
              ko: "과거에는 사람들이 한 번에 두세 시간씩 공부하는 것이 언어를 배우는 가장 좋은 방법이라고 믿었습니다."
            },
            {
              en: "However, recent education studies show that short, daily practice is often more effective for adult learners.",
              ko: "하지만 최근 교육 연구들은 짧고 매일 하는 연습이 성인 학습자들에게 종종 더 효과적이라는 것을 보여줍니다."
            },
            {
              en: "When you study for just ten minutes a day, it is much easier to concentrate and remember new words.",
              ko: "하루에 단 10분만 공부할 때, 집중하고 새로운 단어를 기억하는 것이 훨씬 더 쉽습니다."
            },
            {
              en: "Short lessons also reduce stress because you do not need to change your whole daily schedule.",
              ko: "짧은 수업은 또한 하루 전체 일정을 바꿀 필요가 없기 때문에 스트레스를 줄여줍니다."
            },
            {
              en: "For example, listening to a short audio clip on the bus or reading one paragraph during lunch can build a strong habit.",
              ko: "예를 들어, 버스에서 짧은 오디오 클립을 듣거나 점심시간에 한 단락을 읽는 것이 탄탄한 습관을 만들어 줄 수 있습니다."
            },
            {
              en: "Over one month, ten minutes every weekday adds up to more than three hours of focused learning.",
              ko: "한 달 동안 평일 매일 10분씩 공부하면 3시간 이상의 집중 학습 시간이 쌓이게 됩니다."
            }
          ],
          questions: [
            {
              id: "w1-tue-q1",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 지문에 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "According to recent studies, studying for three hours at once is better than short daily practice for adults.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "FALSE",
              explanation: "지문 3번째 문장에서 최근 연구는 'short, daily practice is often more effective for adult learners'라고 했으므로, 한 번에 3시간 공부하는 것이 더 낫다는 진술은 지문 내용과 반대(FALSE)입니다.",
              translation: "최근 연구에 따르면, 성인에게는 매일 짧게 연습하는 것보다 한 번에 3시간 동안 공부하는 것이 더 좋다."
            },
            {
              id: "w1-tue-q2",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 지문에 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Online study apps are always cheaper than traditional language schools.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "NOT GIVEN",
              explanation: "지문에서는 짧은 학습의 효과와 버스·점심시간 활용 예시만 언급했을 뿐, 온라인 학습 앱과 일반 어학원의 가격(cheaper) 비교는 전혀 나오지 않았습니다. 따라서 NOT GIVEN입니다.",
              translation: "온라인 학습 앱은 항상 전통적인 어학원보다 더 저렴하다."
            },
            {
              id: "w1-tue-q3",
              type: "mcq",
              prompt: "핵심 동의어 찾기: 지문에서 'focus closely on something(무언가에 깊이 집중하다)'과 같은 의미로 쓰인 단어는 무엇인가요?",
              statement: "Choose the word from the passage that means 'to give all your attention to something'.",
              options: ["improve", "concentrate", "reduce", "build"],
              answer: "concentrate",
              explanation: "4번째 문장의 'concentrate'는 '집중하다(focus)'라는 뜻으로 IELTS Reading에서 매우 자주 출제되는 필수 동의어입니다. (improve: 향상시키다, reduce: 줄이다, build: 쌓다/만들다)",
              translation: "지문에서 '무언가에 모든 주의를 기울이다(집중하다)'라는 뜻의 단어를 고르세요."
            }
          ]
        },

        // ==========================================
        // 수요일: Writing (필수 3단어 조합 영작 + 모범 답안 비교)
        // ==========================================
        wed: {
          dayKey: "wed",
          dayLabel: "수",
          dayFullLabel: "수요일",
          skill: "Writing",
          title: "IELTS Task 2 미니 영작: 온라인 학습",
          description: "주어진 필수 영단어 3개를 모두 포함하여 2~3문장으로 자신의 의견을 작성해 보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "convenient", meaning: "편리한", example: "Online learning is very convenient for workers." }
          ],
          taskType: "Task 2 (일상 주제 의견 쓰기)",
          writingPrompt: "Many working adults prefer studying online rather than going to a classroom. Do you think online learning is a good choice for busy adults?",
          writingPromptKo: "많은 직장인 성인들이 교실에 가는 것보다 온라인으로 공부하는 것을 선호합니다. 바쁜 성인들에게 온라인 학습이 좋은 선택이라고 생각하나요?",
          requiredWords: [
            { word: "convenient", meaning: "편리한" },
            { word: "schedule", meaning: "일정" },
            { word: "focus", meaning: "집중하다" }
          ],
          sentencePatterns: [
            "In my opinion, online learning is ... (제 생각에는 온라인 학습이 ...합니다.)",
            "First, it is very ... because I can ... (첫째, ~할 수 있기 때문에 매우 ...합니다.)",
            "Also, it helps me ... when I ... (또한, ~할 때 ...하는 데 도움이 됩니다.)"
          ],
          modelAnswer: "In my opinion, online learning is a great choice for busy adults. First, it is very convenient because I can study at home and fit lessons into my daily schedule. Also, studying in a quiet room helps me focus better after work.",
          modelAnswerKo: "제 생각에는 온라인 학습이 바쁜 성인들에게 훌륭한 선택입니다. 첫째, 집에서 공부하고 하루 일정에 수업을 맞출 수 있기 때문에 매우 편리합니다. 또한, 조용한 방에서 공부하는 것은 퇴근 후 더 잘 집중하는 데 도움이 됩니다.",
          keyExpressions: [
            { expr: "In my opinion,", desc: "내 의견을 제시할 때 가장 쓰기 좋은 IELTS Task 2 기본 시작 표현" },
            { expr: "fit lessons into my daily schedule", desc: "하루 일정에 수업을 맞추다" },
            { expr: "helps me focus better", desc: "내가 더 잘 집중하도록 도와주다 (help + 목적어 + 동사원형)" }
          ]
        },

        // ==========================================
        // 목요일: Speaking (Part 1 질문 2개 + 30초/1분 타이머 + TTS 모범 답변)
        // ==========================================
        thu: {
          dayKey: "thu",
          dayLabel: "목",
          dayFullLabel: "목요일",
          skill: "Speaking",
          title: "IELTS Speaking Part 1: 퇴근 후 일상",
          description: "30초 동안 답변 아이디어를 정리하고, 1분 동안 큰 소리로 말한 뒤 원어민 모범 답변을 들어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "relax", meaning: "휴식을 취하다", example: "I usually relax at home after work." }
          ],
          questions: [
            {
              id: "w1-thu-q1",
              questionNumber: 1,
              question: "What do you usually do after work or study?",
              questionKo: "일이나 공부가 끝난 후에는 보통 무엇을 하나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "have dinner", ko: "저녁을 먹다" },
                { en: "relax at home", ko: "집에서 쉬다" },
                { en: "take a short walk", ko: "짧게 산책하다" },
                { en: "watch YouTube videos", ko: "유튜브 영상을 보다" }
              ],
              modelAnswer: "After work, I usually go straight home and have a simple dinner. Then, I like to take a short walk in my neighborhood to clear my head. Before going to bed, I often relax on the sofa and listen to music for about twenty minutes.",
              modelAnswerKo: "퇴근 후에는 보통 바로 집에 가서 간단한 저녁을 먹습니다. 그다음에 머리를 식히기 위해 동네를 짧게 산책하는 것을 좋아합니다. 잠자리에 들기 전에는 소파에서 쉬면서 20분 정도 음악을 자주 듣습니다.",
              tip: "IELTS 4.5~5.0에서는 한 문장만 답하지 말고 '보통 하는 일 + 이유/시간' 순서로 2~3문장을 연결해서 말하는 것이 핵심입니다."
            },
            {
              id: "w1-thu-q2",
              questionNumber: 2,
              question: "Do you prefer spending your evenings at home or going out? Why?",
              questionKo: "저녁 시간을 집에서 보내는 것을 선호하나요, 아니면 외출하는 것을 선호하나요? 이유는 무엇인가요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "stay at home", ko: "집에 머물다" },
                { en: "feel tired", ko: "피곤함을 느끼다" },
                { en: "save money", ko: "돈을 아끼다" },
                { en: "comfortable space", ko: "편안한 공간" }
              ],
              modelAnswer: "I definitely prefer spending my evenings at home. Because I work all day, I feel quite tired in the evening and just want a quiet, comfortable space. Staying at home also helps me save money and get enough sleep for the next day.",
              modelAnswerKo: "저는 확실히 저녁 시간을 집에서 보내는 것을 선호합니다. 하루 종일 일하기 때문에 저녁에는 꽤 피곤하고 그저 조용하고 편안한 공간을 원합니다. 집에 있는 것은 또한 돈을 아끼고 다음 날을 위해 충분한 수면을 취하는 데 도움이 됩니다.",
              tip: "'I prefer ~ because ~' 구조를 사용하면 논리적으로 들려 Speaking 점수를 안정적으로 5.0까지 끌어올릴 수 있습니다."
            }
          ]
        },

        // ==========================================
        // 금요일: Weekly Review (핵심 어휘 5개 & 문장 패턴 스피드 퀴즈)
        // ==========================================
        fri: {
          dayKey: "fri",
          dayLabel: "금",
          dayFullLabel: "금요일",
          skill: "Weekly Review",
          title: "1주차 핵심 어휘 & 패턴 스피드 복습",
          description: "월~목요일에 배운 필수 어휘 5개와 핵심 문장 구조를 퀴즈로 빠르게 복습해 보세요.",
          estimatedMinutes: 5,
          reviewVocab: [
            { word: "register", meaning: "등록하다", day: "월요일 Listening" },
            { word: "schedule", meaning: "일정, 시간표", day: "월/수요일" },
            { word: "concentrate", meaning: "집중하다", day: "화요일 Reading" },
            { word: "convenient", meaning: "편리한", day: "수요일 Writing" },
            { word: "relax", meaning: "휴식을 취하다", day: "목요일 Speaking" }
          ],
          questions: [
            {
              id: "w1-fri-q1",
              type: "mcq",
              category: "어휘 뜻 매칭 (1/5)",
              prompt: "다음 중 '수업이나 프로그램에 등록하다'라는 뜻의 영어 단어는?",
              options: ["relax", "register", "reduce", "prefer"],
              answer: "register",
              explanation: "월요일 Listening에서 'register for an evening English class(저녁 영어 수업에 등록하다)'로 배웠습니다.",
              translation: "register = 등록하다"
            },
            {
              id: "w1-fri-q2",
              type: "mcq",
              category: "어휘 뜻 매칭 (2/5)",
              prompt: "다음 중 'concentrate'의 뜻으로 가장 알맞은 것은?",
              options: ["편리한", "일정", "집중하다", "기억하다"],
              answer: "집중하다",
              explanation: "화요일 Reading에서 'concentrate and remember new words(집중하고 새 단어를 기억하다)'로 등장했습니다. 'focus'와 같은 뜻입니다.",
              translation: "concentrate = 집중하다"
            },
            {
              id: "w1-fri-q3",
              type: "mcq",
              category: "어휘 뜻 매칭 (3/5)",
              prompt: "다음 문장의 빈칸에 들어갈 가장 알맞은 단어는? 'Online study is very ______ for busy workers.'",
              options: ["convenient", "tired", "traditional", "expensive"],
              answer: "convenient",
              explanation: "바쁜 직장인들에게 온라인 학습이 매우 '편리하다(convenient)'는 의미가 자연스럽습니다.",
              translation: "온라인 학습은 바쁜 직장인들에게 매우 편리합니다."
            },
            {
              id: "w1-fri-q4",
              type: "short",
              category: "문장 패턴 빈칸 채우기 (4/5)",
              prompt: "빈칸에 알맞은 단어를 입력하세요. (힌트: 일정, 시간표)",
              sentenceBefore: "I can fit lessons into my daily",
              sentenceAfter: ".",
              placeholder: "단어 입력 (예: schedule)",
              answer: "schedule",
              acceptedAnswers: ["schedule"],
              explanation: "'fit ~ into my daily schedule'은 '하루 일정에 ~를 맞추다'라는 매우 유용한 Writing/Speaking 패턴입니다.",
              translation: "나는 하루 일정에 수업을 맞출 수 있다."
            },
            {
              id: "w1-fri-q5",
              type: "mcq",
              category: "문장 패턴 복습 (5/5)",
              prompt: "목요일 Speaking에서 배운 '휴식을 취하다'를 뜻하는 빈칸 표현은? 'I often ______ on the sofa after work.'",
              options: ["register", "relax", "compare", "finish"],
              answer: "relax",
              explanation: "'relax on the sofa(소파에서 휴식을 취하다)'는 일상/여가 질문에서 가장 자연스럽게 쓸 수 있는 핵심 동사입니다.",
              translation: "나는 퇴근 후 소파에서 자주 휴식을 취한다."
            }
          ]
        }
      }
    }
  ],
  vocabularyDict: {
    register: {
      word: "register",
      pronunciationKo: "레지스터",
      ipa: "/ˈredʒ.ɪ.stər/",
      pos: "동사(v.)",
      meaning: "등록하다, 신청하다",
      contextTip: "수업, 시험, 회원 가입 등을 공식적으로 신청할 때 쓰는 IELTS Part 1 단골 동사입니다. 보통 'register for + 명사' 형태로 씁니다.",
      example: "I'd like to register for an evening English class."
    },
    schedule: {
      word: "schedule",
      pronunciationKo: "스케줄",
      ipa: "/ˈskedʒ.uːl/",
      pos: "명사(n.) / 동사(v.)",
      meaning: "일정, 시간표 / 일정을 잡다",
      contextTip: "직장인의 하루 일과나 수업 시간표를 말할 때 쓰입니다. 'fit ~ into my schedule(일정에 맞추다)' 표현으로 익혀두세요.",
      example: "That fits my daily schedule very well."
    },
    beginner: {
      word: "beginner",
      pronunciationKo: "비기너",
      ipa: "/bɪˈɡɪn.ər/",
      pos: "명사(n.)",
      meaning: "초보자, 입문자",
      contextTip: "수업 난이도를 말할 때 'beginner(초급) - intermediate(중급) - advanced(고급)' 순서로 자주 등장합니다.",
      example: "We have a beginner conversation class on Tuesdays."
    },
    conversation: {
      word: "conversation",
      pronunciationKo: "컨버세이션",
      ipa: "/ˌkɒn.vəˈseɪ.ʃən/",
      pos: "명사(n.)",
      meaning: "대화, 회화",
      contextTip: "두 사람 이상이 나누는 일상적인 대화를 뜻합니다. 'have a conversation with ~' 형태로 자주 쓰입니다.",
      example: "She joined a conversation club to practice speaking."
    },
    nearby: {
      word: "nearby",
      pronunciationKo: "니어바이",
      ipa: "/ˌnɪəˈbaɪ/",
      pos: "부사(adv.) / 형용사(adj.)",
      meaning: "근처에, 인근의",
      contextTip: "집이나 직장 가까이에 있는 장소를 설명할 때 Speaking Part 1에서 매우 유용합니다.",
      example: "I work nearby, so I can walk to the library."
    },
    library: {
      word: "library",
      pronunciationKo: "라이브러리",
      ipa: "/ˈlaɪ.brər.i/",
      pos: "명사(n.)",
      meaning: "도서관",
      contextTip: "IELTS Listening Part 1에서 시설 안내(도서관 회원증, 운영 시간 등) 주제로 매우 자주 출제됩니다.",
      example: "Welcome to the Central City Library."
    },
    completely: {
      word: "completely",
      pronunciationKo: "컴플리틀리",
      ipa: "/kəmˈpliːt.li/",
      pos: "부사(adv.)",
      meaning: "완전히, 전적으로",
      contextTip: "'완전히 무료(completely free)'처럼 형용사를 강조할 때 씁니다. Listening에서 정답 단서를 강조하는 신호가 되기도 합니다.",
      example: "The class is completely free for local workers."
    },
    local: {
      word: "local",
      pronunciationKo: "로컬",
      ipa: "/ˈləʊ.kəl/",
      pos: "형용사(adj.)",
      meaning: "지역의, 현지의",
      contextTip: "내가 사는 동네나 해당 지역 주민을 가리킬 때 쓰입니다. 'local workers(지역 직장인)', 'local library(동네 도서관)'.",
      example: "This program is popular with local residents."
    },
    worker: {
      word: "worker",
      pronunciationKo: "워커",
      ipa: "/ˈwɜː.kər/",
      pos: "명사(n.)",
      meaning: "직장인, 근로자",
      contextTip: "일하는 사람을 일반적으로 가리키며, 'office worker(사무직 직장인)'처럼 직군을 붙여 쓰기도 합니다.",
      example: "Many local workers attend evening classes."
    },
    free: {
      word: "free",
      pronunciationKo: "프리",
      ipa: "/friː/",
      pos: "형용사(adj.)",
      meaning: "무료의 / 한가한, 자유로운",
      contextTip: "문맥에 따라 '돈이 들지 않는(무료)'과 '시간이 비어 있는(한가한)' 두 가지 핵심 뜻으로 쓰입니다.",
      example: "Are you free this evening? / The pass is free."
    },
    improve: {
      word: "improve",
      pronunciationKo: "임프루브",
      ipa: "/ɪmˈpruːv/",
      pos: "동사(v.)",
      meaning: "향상시키다, 개선하다",
      contextTip: "실력이나 상태를 더 낫게 만들 때 쓰는 필수 동사입니다. 'improve my English(영어 실력을 높이다)'.",
      example: "Many adults want to improve their English."
    },
    often: {
      word: "often",
      pronunciationKo: "오픈(오프튼)",
      ipa: "/ˈɒf.ən/",
      pos: "부사(adv.)",
      meaning: "자주, 종종",
      contextTip: "Speaking Part 1에서 습관을 말할 때 'usually(보통)'와 함께 가장 많이 쓰는 빈도 부사입니다.",
      example: "They often feel tired after a long day."
    },
    tired: {
      word: "tired",
      pronunciationKo: "타이어드",
      ipa: "/ˈtaɪəd/",
      pos: "형용사(adj.)",
      meaning: "피곤한, 지친",
      contextTip: "사람의 감정을 말할 때는 '-ed' 형태인 'tired'를 씁니다. (tiring은 '피곤하게 만드는'이라는 뜻).",
      example: "I feel quite tired after work."
    },
    office: {
      word: "office",
      pronunciationKo: "오피스",
      ipa: "/ˈɒf.ɪs/",
      pos: "명사(n.)",
      meaning: "사무실, 직장",
      contextTip: "'at the office(사무실에서)' 형태로 직장 생활을 묘사할 때 자주 쓰입니다.",
      example: "She had a long day at the office."
    },
    recent: {
      word: "recent",
      pronunciationKo: "리슨트",
      ipa: "/ˈriː.sənt/",
      pos: "형용사(adj.)",
      meaning: "최근의",
      contextTip: "IELTS Reading 지문에서 'recent studies(최근 연구)'는 과거와 현재를 대조할 때 자주 나오는 핵심 표현입니다.",
      example: "Recent education studies show positive results."
    },
    effective: {
      word: "effective",
      pronunciationKo: "이펙티브",
      ipa: "/ɪˈfek.tɪv/",
      pos: "형용사(adj.)",
      meaning: "효과적인",
      contextTip: "어떤 방법이나 학습법이 좋은 결과를 낼 때 Writing/Reading에서 'more effective(더 효과적인)'로 자주 쓰입니다.",
      example: "Short daily practice is very effective."
    },
    concentrate: {
      word: "concentrate",
      pronunciationKo: "컨센트레이트",
      ipa: "/ˈkɒn.sən.treɪt/",
      pos: "동사(v.)",
      meaning: "집중하다",
      contextTip: "IELTS Reading에서 'focus'의 동의어로 자주 출제됩니다. 'concentrate on ~' 형태로 씁니다.",
      example: "It is easier to concentrate for ten minutes."
    },
    remember: {
      word: "remember",
      pronunciationKo: "리멤버",
      ipa: "/rɪˈmem.bər/",
      pos: "동사(v.)",
      meaning: "기억하다",
      contextTip: "반대말은 'forget(잊다)'입니다. 새 어휘를 암기하거나 추억을 말할 때 쓰입니다.",
      example: "Short lessons help you remember new words."
    },
    reduce: {
      word: "reduce",
      pronunciationKo: "리듀스",
      ipa: "/rɪˈdjuːs/",
      pos: "동사(v.)",
      meaning: "줄이다, 감소시키다",
      contextTip: "스트레스, 비용, 시간 등을 줄일 때 쓰는 IELTS Writing/Reading 핵심 동사입니다.",
      example: "Short lessons also reduce stress."
    },
    stress: {
      word: "stress",
      pronunciationKo: "스트레스",
      ipa: "/stres/",
      pos: "명사(n.) / 동사(v.)",
      meaning: "스트레스, 긴장 / 강조하다",
      contextTip: "직장인 주제에서 'reduce stress(스트레스를 줄이다)' 또는 'under stress(스트레스를 받는)'로 자주 쓰입니다.",
      example: "Listening to music helps reduce stress."
    },
    paragraph: {
      word: "paragraph",
      pronunciationKo: "패러그래프",
      ipa: "/ˈpær.ə.ɡrɑːf/",
      pos: "명사(n.)",
      meaning: "단락, 문단",
      contextTip: "IELTS Reading 지문의 각 문단을 가리킬 때 'Paragraph A, B...'처럼 쓰입니다.",
      example: "Try reading one paragraph during lunch."
    },
    habit: {
      word: "habit",
      pronunciationKo: "해빗",
      ipa: "/ˈhæb.ɪt/",
      pos: "명사(n.)",
      meaning: "습관",
      contextTip: "'build a strong habit(탄탄한 습관을 만들다)'처럼 동사 build/form과 함께 쓰면 자연스럽습니다.",
      example: "Daily practice builds a good study habit."
    },
    prefer: {
      word: "prefer",
      pronunciationKo: "프리퍼",
      ipa: "/prɪˈfɜːr/",
      pos: "동사(v.)",
      meaning: "~을 더 선호하다",
      contextTip: "Speaking과 Writing에서 선택을 말할 때 'prefer A to B' 또는 'prefer ~ing' 형태로 매우 자주 쓰입니다.",
      example: "Many adults prefer studying online."
    },
    convenient: {
      word: "convenient",
      pronunciationKo: "컨비니언트",
      ipa: "/kənˈviː.ni.ənt/",
      pos: "형용사(adj.)",
      meaning: "편리한, 간편한",
      contextTip: "사람이 아닌 사물·서비스·시간이 편리할 때 씁니다. ('I am convenient'는 틀린 표현이고 'It is convenient for me'가 맞습니다.)",
      example: "Online learning is very convenient for workers."
    },
    focus: {
      word: "focus",
      pronunciationKo: "포커스",
      ipa: "/ˈfəʊ.kəs/",
      pos: "동사(v.) / 명사(n.)",
      meaning: "집중하다 / 초점",
      contextTip: "'concentrate'와 같은 뜻으로, Writing과 Speaking에서 'focus better(더 잘 집중하다)'로 쓰기 좋습니다.",
      example: "A quiet room helps me focus better."
    },
    opinion: {
      word: "opinion",
      pronunciationKo: "오피니언",
      ipa: "/əˈpɪn.jən/",
      pos: "명사(n.)",
      meaning: "의견, 생각",
      contextTip: "IELTS Writing Task 2와 Speaking에서 'In my opinion,(제 생각에는)'으로 문장을 시작할 때 필수입니다.",
      example: "In my opinion, online study is a great choice."
    },
    choice: {
      word: "choice",
      pronunciationKo: "초이스",
      ipa: "/tʃɔɪs/",
      pos: "명사(n.)",
      meaning: "선택",
      contextTip: "'choose(선택하다)'의 명사형입니다. 'a good choice(좋은 선택)'로 자주 쓰입니다.",
      example: "Online learning is a good choice for busy adults."
    },
    relax: {
      word: "relax",
      pronunciationKo: "릴랙스",
      ipa: "/rɪˈlæks/",
      pos: "동사(v.)",
      meaning: "휴식을 취하다, 긴장을 풀다",
      contextTip: "Speaking Part 1 여가·주말 질문에서 'relax at home(집에서 쉬다)'로 가장 자주 쓰이는 동사입니다.",
      example: "I often relax on the sofa after work."
    },
    neighborhood: {
      word: "neighborhood",
      pronunciationKo: "네이버후드",
      ipa: "/ˈneɪ.bə.hʊd/",
      pos: "명사(n.)",
      meaning: "동네, 이웃 지역",
      contextTip: "내가 사는 주변 지역을 말할 때 'in my neighborhood(우리 동네에서)' 형태로 씁니다.",
      example: "I take a short walk in my neighborhood."
    },
    comfortable: {
      word: "comfortable",
      pronunciationKo: "컴퍼터블",
      ipa: "/ˈkʌm.fə.tə.bəl/",
      pos: "형용사(adj.)",
      meaning: "편안한, 쾌적한",
      contextTip: "공간, 의자, 옷 등이 편할 때 씁니다. 발음 시 가운데 'for'를 약하게 [컴퍼터블]로 읽는 것이 포인트입니다.",
      example: "I just want a quiet, comfortable space."
    },
    definitely: {
      word: "definitely",
      pronunciationKo: "데피니틀리",
      ipa: "/ˈdef.ɪ.nət.li/",
      pos: "부사(adv.)",
      meaning: "확실히, 분명히",
      contextTip: "Speaking에서 자신의 선호를 자신감 있게 강조할 때 'I definitely prefer ~'처럼 쓰면 좋습니다.",
      example: "I definitely prefer spending evenings at home."
    },
    enough: {
      word: "enough",
      pronunciationKo: "이너프",
      ipa: "/ɪˈnʌf/",
      pos: "형용사(adj.) / 부사(adv.)",
      meaning: "충분한 / 충분히",
      contextTip: "명사 앞에서는 'enough sleep(충분한 잠)', 형용사 뒤에서는 'good enough(충분히 좋은)'처럼 위치가 달라집니다.",
      example: "Staying at home helps me get enough sleep."
    },
    usually: {
      word: "usually",
      pronunciationKo: "유주얼리",
      ipa: "/ˈjuː.ʒu.ə.li/",
      pos: "부사(adv.)",
      meaning: "보통, 대개",
      contextTip: "평소 일과를 말할 때 가장 기본이 되는 빈도 부사입니다.",
      example: "What do you usually do after work?"
    },
    evening: {
      word: "evening",
      pronunciationKo: "이브닝",
      ipa: "/ˈiːv.nɪŋ/",
      pos: "명사(n.)",
      meaning: "저녁",
      contextTip: "퇴근 후 시간대를 말할 때 'in the evening(저녁에)', 'evening class(저녁 수업)'로 씁니다.",
      example: "I prefer spending my evenings at home."
    },
    quiet: {
      word: "quiet",
      pronunciationKo: "콰이어트",
      ipa: "/ˈkwaɪ.ət/",
      pos: "형용사(adj.)",
      meaning: "조용한",
      contextTip: "'quite(꽤)'와 철자가 비슷하니 주의하세요! (quiet = 조용한, quite = 꽤)",
      example: "Studying in a quiet room helps me focus."
    },
    simple: {
      word: "simple",
      pronunciationKo: "심플",
      ipa: "/ˈsɪm.pəl/",
      pos: "형용사(adj.)",
      meaning: "간단한, 단순한",
      contextTip: "거창하지 않고 소박한 식사나 방법을 말할 때 'a simple dinner(간단한 저녁)'처럼 씁니다.",
      example: "I usually go home and have a simple dinner."
    },
    save: {
      word: "save",
      pronunciationKo: "세이브",
      ipa: "/seɪv/",
      pos: "동사(v.)",
      meaning: "아끼다, 절약하다 / 저장하다",
      contextTip: "'save time(시간을 아끼다)', 'save money(돈을 아끼다)'는 IELTS Writing/Speaking 만능 표현입니다.",
      example: "Staying at home helps me save money."
    },
    spend: {
      word: "spend",
      pronunciationKo: "스펜드",
      ipa: "/spend/",
      pos: "동사(v.)",
      meaning: "(시간·돈을) 보내다, 쓰다",
      contextTip: "시간이나 돈을 쓸 때는 'spend + 시간/돈 + ~ing' 형태로 자주 사용합니다.",
      example: "I like to spend my evenings relaxing at home."
    }
  }
};

