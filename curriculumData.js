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
  ]
};
