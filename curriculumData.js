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
    },

    // ========================================================
    // WEEK 2: 건강한 식습관과 운동·여가 생활
    // ========================================================
    {
      weekNumber: 2,
      title: "Week 2: 건강한 식습관과 운동·여가",
      subtitle: "건강·운동 필수 어휘 및 비교 문장 익히기",
      days: {
        mon: {
          dayKey: "mon",
          dayLabel: "월",
          dayFullLabel: "월요일",
          skill: "Listening",
          title: "동네 스포츠 센터 회원 등록하기",
          description: "스포츠 센터 직원과 회원의 대화를 듣고 이용 시간, 요금, 시설 정보를 파악해 보세요.",
          estimatedMinutes: 7,
          vocabHighlights: [
            { word: "membership", meaning: "회원권", example: "We offer a monthly membership." },
            { word: "include", meaning: "포함하다", example: "The fee includes the swimming pool." }
          ],
          dialogue: [
            {
              speaker: "Receptionist",
              voicePitch: 1.1,
              text: "Good morning! Welcome to Green Park Sports Center. How can I help you?",
              ko: "안녕하세요! 그린 파크 스포츠 센터에 오신 것을 환영합니다. 무엇을 도와드릴까요?"
            },
            {
              speaker: "Minho",
              voicePitch: 0.9,
              text: "Hi, I'd like to ask about a monthly membership for the gym.",
              ko: "안녕하세요, 헬스장 월간 회원권에 대해 문의하고 싶습니다."
            },
            {
              speaker: "Receptionist",
              voicePitch: 1.1,
              text: "Sure! Our standard membership is 45 dollars per month.",
              ko: "물론이죠! 기본 회원권은 한 달에 45달러입니다."
            },
            {
              speaker: "Minho",
              voicePitch: 0.9,
              text: "Does that price include the swimming pool?",
              ko: "그 가격에 수영장 이용도 포함되나요?"
            },
            {
              speaker: "Receptionist",
              voicePitch: 1.1,
              text: "Yes, it includes both the gym and the pool, and we open at 6:00 a.m. on weekdays.",
              ko: "네, 헬스장과 수영장이 모두 포함되며, 평일에는 오전 6시에 문을 엽니다."
            },
            {
              speaker: "Minho",
              voicePitch: 0.9,
              text: "That's great. Do I need to wear special shoes inside the gym?",
              ko: "좋네요. 헬스장 안에서는 특별한 신발을 신어야 하나요?"
            },
            {
              speaker: "Receptionist",
              voicePitch: 1.1,
              text: "Yes, please bring clean sports shoes and a small towel every time you visit.",
              ko: "네, 방문하실 때마다 깨끗한 운동화와 작은 수건을 꼭 가져오세요."
            }
          ],
          questions: [
            {
              id: "w2-mon-q1",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (1/3)",
              sentenceBefore: "Our standard membership is",
              sentenceAfter: "dollars per month.",
              options: ["35", "40", "45", "55"],
              answer: "45",
              explanation: "직원이 '45 dollars per month'라고 안내했습니다.",
              translation: "기본 회원권은 한 달에 45달러입니다."
            },
            {
              id: "w2-mon-q2",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (2/3)",
              sentenceBefore: "We open at",
              sentenceAfter: "a.m. on weekdays.",
              options: ["5:30", "6:00", "6:30", "7:00"],
              answer: "6:00",
              explanation: "평일 개장 시간은 오전 6시(6:00 a.m.)입니다.",
              translation: "평일에는 오전 6시에 문을 엽니다."
            },
            {
              id: "w2-mon-q3",
              type: "short",
              prompt: "대화 스크립트 빈칸 채우기 (3/3) - 한 단어로 입력하세요",
              sentenceBefore: "Please bring clean sports shoes and a small",
              sentenceAfter: "every time you visit.",
              placeholder: "정답 단어 입력 (예: towel)",
              answer: "towel",
              acceptedAnswers: ["towel"],
              explanation: "직원이 깨끗한 운동화와 작은 수건(towel)을 가져오라고 안내했습니다.",
              translation: "방문하실 때마다 깨끗한 운동화와 작은 수건을 가져오세요."
            }
          ]
        },
        tue: {
          dayKey: "tue",
          dayLabel: "화",
          dayFullLabel: "화요일",
          skill: "Reading",
          title: "하루 30분 걷기가 주는 놀라운 변화",
          description: "짧은 건강 칼럼을 읽고 True/False/Not Given 및 동의어 문제를 풀어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "benefit", meaning: "이점, 혜택", example: "Walking has many health benefits." }
          ],
          passageTitle: "The Simple Benefits of a Daily Walk",
          sentences: [
            {
              en: "Many office workers sit at a desk for eight hours or more every day.",
              ko: "많은 사무직 직장인들이 매일 8시간 이상 책상에 앉아 있습니다."
            },
            {
              en: "Because they are busy, they often think they need an expensive gym to stay healthy.",
              ko: "바쁘기 때문에, 그들은 건강을 유지하기 위해 비싼 헬스장이 필요하다고 자주 생각합니다."
            },
            {
              en: "However, doctors say that walking for just thirty minutes a day brings huge health benefits.",
              ko: "하지만 의사들은 하루에 단 30분만 걸어도 큰 건강상 이점이 있다고 말합니다."
            },
            {
              en: "Regular walking strengthens your heart and helps you maintain a healthy weight.",
              ko: "규칙적인 걷기는 심장을 튼튼하게 하고 건강한 체중을 유지하도록 돕습니다."
            },
            {
              en: "Walking outdoors in a park can also improve your mood and clear your mind after work.",
              ko: "공원에서 야외 산책을 하는 것은 또한 기분을 좋게 하고 퇴근 후 머리를 맑게 해줍니다."
            },
            {
              en: "Best of all, walking is completely free and requires no special equipment.",
              ko: "무엇보다도 걷기는 완전히 무료이며 특별한 장비가 필요하지 않습니다."
            }
          ],
          questions: [
            {
              id: "w2-tue-q1",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Doctors believe you must join an expensive gym to stay healthy.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "FALSE",
              explanation: "3번째 문장에서 의사들은 하루 30분 걷기만으로도 큰 이점이 있다고 했으므로, 비싼 헬스장에 꼭 다녀야 한다는 진술은 FALSE입니다.",
              translation: "의사들은 건강을 유지하기 위해 비싼 헬스장에 꼭 등록해야 한다고 믿는다."
            },
            {
              id: "w2-tue-q2",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Morning walks burn more calories than evening walks.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "NOT GIVEN",
              explanation: "지문에서는 아침 산책과 저녁 산책의 칼로리 소모량을 비교한 내용이 전혀 나오지 않으므로 NOT GIVEN입니다.",
              translation: "아침 산책은 저녁 산책보다 더 많은 칼로리를 소모한다."
            },
            {
              id: "w2-tue-q3",
              type: "mcq",
              prompt: "핵심 동의어 찾기: 지문에서 'keep something at the same level(유지하다)'과 같은 의미의 단어는?",
              statement: "Choose the word from the passage that means 'to keep in a good condition or level'.",
              options: ["sit", "maintain", "require", "bring"],
              answer: "maintain",
              explanation: "4번째 문장의 'maintain a healthy weight(건강한 체중을 유지하다)'에서 maintain이 '유지하다'라는 뜻입니다.",
              translation: "지문에서 '좋은 상태나 수준을 유지하다'라는 뜻의 단어를 고르세요."
            }
          ]
        },
        wed: {
          dayKey: "wed",
          dayLabel: "수",
          dayFullLabel: "수요일",
          skill: "Writing",
          title: "IELTS Task 2 미니 영작: 집밥 vs 패스트푸드",
          description: "주어진 필수 영단어 3개를 모두 포함하여 2~3문장으로 자신의 의견을 작성해 보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "healthy", meaning: "건강한", example: "Home-cooked meals are healthy." }
          ],
          taskType: "Task 2 (식습관 비교 의견 쓰기)",
          writingPrompt: "Many busy people eat fast food instead of cooking at home. Do you think cooking at home is better for your health?",
          writingPromptKo: "바쁜 많은 사람들이 집에서 요리하는 대신 패스트푸드를 먹습니다. 집에서 요리하는 것이 건강에 더 좋다고 생각하나요?",
          requiredWords: [
            { word: "healthy", meaning: "건강한" },
            { word: "fresh", meaning: "신선한" },
            { word: "money", meaning: "돈" }
          ],
          sentencePatterns: [
            "I believe cooking at home is ... (집에서 요리하는 것이 ...하다고 생각합니다.)",
            "First, we can use ... ingredients, which makes meals ... (먼저 ...한 재료를 사용할 수 있어 식사가 ...해집니다.)",
            "In addition, it helps us save ... (게다가 ...를 아끼는 데 도움이 됩니다.)"
          ],
          modelAnswer: "I believe cooking at home is much better than eating fast food. First, we can choose fresh vegetables and meat, so our meals are very healthy. In addition, making food at home helps us save money every month.",
          modelAnswerKo: "집에서 요리하는 것이 패스트푸드를 먹는 것보다 훨씬 더 좋다고 생각합니다. 첫째, 신선한 채소와 고기를 고를 수 있어서 식사가 매우 건강합니다. 게다가 집에서 음식을 만드는 것은 매달 돈을 아끼는 데 도움이 됩니다.",
          keyExpressions: [
            { expr: "much better than", desc: "~보다 훨씬 더 나은 (비교급 강조)" },
            { expr: "fresh vegetables", desc: "신선한 채소" },
            { expr: "In addition,", desc: "게다가, 또한 (문장 연결 부사)" }
          ]
        },
        thu: {
          dayKey: "thu",
          dayLabel: "목",
          dayFullLabel: "목요일",
          skill: "Speaking",
          title: "IELTS Speaking Part 1: 음식과 운동",
          description: "30초 동안 답변을 구상하고, 1분 동안 말한 뒤 원어민 모범 답변을 들어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "energetic", meaning: "활기찬, 에너지 넘치는", example: "Exercise makes me feel energetic." }
          ],
          questions: [
            {
              id: "w2-thu-q1",
              questionNumber: 1,
              question: "What kind of food do you like to eat on weekends?",
              questionKo: "주말에는 주로 어떤 종류의 음식을 먹는 것을 좋아하나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "home-cooked meal", ko: "집밥" },
                { en: "spicy soup", ko: "매운 국물 요리" },
                { en: "eat with family", ko: "가족과 함께 먹다" },
                { en: "fresh fruit", ko: "신선한 과일" }
              ],
              modelAnswer: "On weekends, I really enjoy eating home-cooked Korean food with my family. My favorite dish is warm soup with rice and fresh vegetables. It tastes delicious and helps me feel relaxed after a busy week.",
              modelAnswerKo: "주말에는 가족과 함께 집에서 만든 한식을 먹는 것을 정말 좋아합니다. 제가 가장 좋아하는 음식은 밥과 신선한 채소가 곁들여진 따뜻한 국입니다. 맛있고 바쁜 한 주 뒤에 편안한 기분이 들게 해줍니다.",
              tip: "좋아하는 음식을 말할 때는 '음식 이름 + 누구와 먹는지 + 맛/기분'을 함께 말하면 자연스럽게 3문장이 완성됩니다."
            },
            {
              id: "w2-thu-q2",
              questionNumber: 2,
              question: "Do you do any exercise to stay healthy?",
              questionKo: "건강을 유지하기 위해 하는 운동이 있나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "go for a walk", ko: "산책하러 가다" },
                { en: "three times a week", ko: "일주일에 세 번" },
                { en: "feel energetic", ko: "활기차게 느끼다" },
                { en: "stretch at home", ko: "집에서 스트레칭하다" }
              ],
              modelAnswer: "Yes, I try to go for a thirty-minute walk three times a week. Walking in the park near my house is simple and free. After walking, I always feel more energetic and sleep much better at night.",
              modelAnswerKo: "네, 일주일에 세 번 30분씩 산책하려고 노력합니다. 집 근처 공원에서 걷는 것은 간단하고 무료입니다. 걷고 나면 항상 더 활기차지고 밤에 잠도 훨씬 잘 잡니다.",
              tip: "빈도 표현(three times a week, every weekend)을 넣으면 답변이 훨씬 구체적으로 들립니다."
            }
          ]
        },
        fri: {
          dayKey: "fri",
          dayLabel: "금",
          dayFullLabel: "금요일",
          skill: "Weekly Review",
          title: "2주차 핵심 어휘 & 패턴 스피드 복습",
          description: "2주차에 배운 건강·운동 핵심 어휘 5개와 문장 구조를 퀴즈로 복습해 보세요.",
          estimatedMinutes: 5,
          reviewVocab: [
            { word: "membership", meaning: "회원권", day: "월요일 Listening" },
            { word: "include", meaning: "포함하다", day: "월요일 Listening" },
            { word: "maintain", meaning: "유지하다", day: "화요일 Reading" },
            { word: "healthy", meaning: "건강한", day: "수요일 Writing" },
            { word: "energetic", meaning: "활기찬", day: "목요일 Speaking" }
          ],
          questions: [
            {
              id: "w2-fri-q1",
              type: "mcq",
              category: "어휘 뜻 매칭 (1/5)",
              prompt: "다음 중 '헬스장이나 클럽의 회원권'을 뜻하는 단어는?",
              options: ["equipment", "membership", "vegetable", "weekend"],
              answer: "membership",
              explanation: "월요일 Listening에서 'a monthly membership(월간 회원권)'으로 배웠습니다.",
              translation: "membership = 회원권"
            },
            {
              id: "w2-fri-q2",
              type: "mcq",
              category: "어휘 뜻 매칭 (2/5)",
              prompt: "다음 중 'include'의 뜻으로 가장 알맞은 것은?",
              options: ["포함하다", "줄이다", "걷다", "아끼다"],
              answer: "포함하다",
              explanation: "'Does that price include the swimming pool?'에서 '포함하다'라는 뜻으로 쓰였습니다.",
              translation: "include = 포함하다"
            },
            {
              id: "w2-fri-q3",
              type: "mcq",
              category: "어휘 뜻 매칭 (3/5)",
              prompt: "빈칸에 알맞은 단어는? 'Regular walking helps you ______ a healthy weight.'",
              options: ["maintain", "forget", "spend", "register"],
              answer: "maintain",
              explanation: "'maintain a healthy weight'는 '건강한 체중을 유지하다'라는 뜻입니다.",
              translation: "규칙적인 걷기는 건강한 체중을 유지하도록 돕습니다."
            },
            {
              id: "w2-fri-q4",
              type: "short",
              category: "문장 패턴 빈칸 채우기 (4/5)",
              prompt: "빈칸에 알맞은 단어를 입력하세요. (힌트: 건강한)",
              sentenceBefore: "Fresh vegetables make our meals very",
              sentenceAfter: ".",
              placeholder: "단어 입력 (예: healthy)",
              answer: "healthy",
              acceptedAnswers: ["healthy"],
              explanation: "수요일 Writing에서 배운 '건강한'을 뜻하는 형용사 healthy입니다.",
              translation: "신선한 채소는 우리의 식사를 매우 건강하게 만듭니다."
            },
            {
              id: "w2-fri-q5",
              type: "mcq",
              category: "문장 패턴 복습 (5/5)",
              prompt: "목요일 Speaking에서 '더 활기찬 기분이 들다'를 뜻하는 단어는? 'I always feel more ______ after walking.'",
              options: ["tired", "energetic", "expensive", "quiet"],
              answer: "energetic",
              explanation: "'feel energetic(활기찬 기분이 들다)'은 운동 효과를 설명할 때 아주 좋은 형용사입니다.",
              translation: "나는 걷고 나면 항상 더 활기차진다."
            }
          ]
        }
      }
    },

    // ========================================================
    // WEEK 3: 교통수단과 도심 출퇴근
    // ========================================================
    {
      weekNumber: 3,
      title: "Week 3: 교통수단과 도심 출퇴근",
      subtitle: "교통·이동 필수 어휘 및 수치 비교 표현 익히기",
      days: {
        mon: {
          dayKey: "mon",
          dayLabel: "월",
          dayFullLabel: "월요일",
          skill: "Listening",
          title: "지하철역에서 정기 승차권 문의하기",
          description: "역무원과 승객의 대화를 듣고 요금, 플랫폼 번호, 출발 시간을 파악해 보세요.",
          estimatedMinutes: 7,
          vocabHighlights: [
            { word: "commute", meaning: "통근하다, 출퇴근하다", example: "I commute by subway every day." },
            { word: "platform", meaning: "승강장, 플랫폼", example: "The express train leaves from Platform 3." }
          ],
          dialogue: [
            {
              speaker: "Passenger",
              voicePitch: 0.9,
              text: "Excuse me, I commute to the city center every day. Is there a weekly travel pass?",
              ko: "실례합니다, 매일 시내로 출퇴근하는데 주간 정기 승차권이 있나요?"
            },
            {
              speaker: "Staff",
              voicePitch: 1.1,
              text: "Yes! A seven-day city pass costs 28 dollars and allows unlimited rides.",
              ko: "네! 7일 시내 정기권은 28달러이며 무제한 탑승이 가능합니다."
            },
            {
              speaker: "Passenger",
              voicePitch: 0.9,
              text: "That sounds convenient. Which platform does the express train leave from?",
              ko: "편리해 보이네요. 급행열차는 몇 번 승강장에서 출발하나요?"
            },
            {
              speaker: "Staff",
              voicePitch: 1.1,
              text: "It leaves from Platform 3, right next to the ticket gate.",
              ko: "개찰구 바로 옆에 있는 3번 승강장에서 출발합니다."
            },
            {
              speaker: "Passenger",
              voicePitch: 0.9,
              text: "Great. And how often does the express train run in the morning?",
              ko: "좋습니다. 그리고 아침에는 급행열차가 얼마나 자주 오나요?"
            },
            {
              speaker: "Staff",
              voicePitch: 1.1,
              text: "It runs every ten minutes between 7 a.m. and 9 a.m.",
              ko: "오전 7시에서 9시 사이에는 10분마다 운행합니다."
            }
          ],
          questions: [
            {
              id: "w3-mon-q1",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (1/3)",
              sentenceBefore: "A seven-day city pass costs",
              sentenceAfter: "dollars.",
              options: ["18", "24", "28", "38"],
              answer: "28",
              explanation: "역무원이 7일 시내 정기권 가격은 28달러(28 dollars)라고 말했습니다.",
              translation: "7일 시내 정기권은 28달러입니다."
            },
            {
              id: "w3-mon-q2",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (2/3)",
              sentenceBefore: "The express train leaves from",
              sentenceAfter: ".",
              options: ["Platform 1", "Platform 2", "Platform 3", "Platform 5"],
              answer: "Platform 3",
              explanation: "급행열차는 3번 승강장(Platform 3)에서 출발합니다.",
              translation: "급행열차는 3번 승강장에서 출발합니다."
            },
            {
              id: "w3-mon-q3",
              type: "short",
              prompt: "대화 스크립트 빈칸 채우기 (3/3) - 숫자로 입력하세요",
              sentenceBefore: "It runs every",
              sentenceAfter: "minutes between 7 a.m. and 9 a.m.",
              placeholder: "숫자 입력 (예: 10)",
              answer: "10",
              acceptedAnswers: ["10", "ten"],
              explanation: "오전 7시~9시 사이에는 10분(10 minutes)마다 운행합니다.",
              translation: "오전 7시와 9시 사이에 10분마다 운행합니다."
            }
          ]
        },
        tue: {
          dayKey: "tue",
          dayLabel: "화",
          dayFullLabel: "화요일",
          skill: "Reading",
          title: "도심에서 자전거 출퇴근이 늘어나는 이유",
          description: "짧은 도시 교통 지문을 읽고 True/False/Not Given 및 동의어 문제를 풀어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "traffic", meaning: "교통, 차량 통행", example: "Cycling helps avoid heavy traffic." }
          ],
          passageTitle: "Why More Workers Are Cycling to Work",
          sentences: [
            {
              en: "In many large cities, traffic congestion is a serious problem during the morning rush hour.",
              ko: "많은 대도시에서 아침 출근 시간대의 교통 체증은 심각한 문제입니다."
            },
            {
              en: "Driving a car to the office often takes a long time and costs a lot for parking.",
              ko: "사무실까지 자가용을 운전해서 가는 것은 종종 시간이 오래 걸리고 주차 비용도 많이 듭니다."
            },
            {
              en: "As a result, an increasing number of adults are choosing to ride bicycles to work.",
              ko: "그 결과, 점점 더 많은 성인들이 직장에 갈 때 자전거를 타는 것을 선택하고 있습니다."
            },
            {
              en: "City governments have also built safe bike lanes to encourage this healthy trend.",
              ko: "시 정부들도 이 건강한 추세를 장려하기 위해 안전한 자전거 도로를 건설했습니다."
            },
            {
              en: "Cycling not only saves money on fuel, but it also reduces air pollution in busy areas.",
              ko: "자전거 타기는 연료비를 아낄 뿐만 아니라 번잡한 지역의 대기 오염도 줄여줍니다."
            }
          ],
          questions: [
            {
              id: "w3-tue-q1",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Parking a car in large cities is usually inexpensive.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "FALSE",
              explanation: "2번째 문장에서 주차 비용이 많이 든다(costs a lot for parking)고 했으므로, 저렴하다는 진술은 FALSE입니다.",
              translation: "대도시에서 자동차를 주차하는 것은 보통 저렴하다."
            },
            {
              id: "w3-tue-q2",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Electric bicycles are more popular than regular bicycles in Europe.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "NOT GIVEN",
              explanation: "지문에서는 전기 자전거(electric bicycles)나 유럽(Europe)에 대한 언급이 전혀 없으므로 NOT GIVEN입니다.",
              translation: "유럽에서는 일반 자전거보다 전기 자전거가 더 인기가 많다."
            },
            {
              id: "w3-tue-q3",
              type: "mcq",
              prompt: "핵심 동의어 찾기: 지문에서 'growing / getting bigger in number(점점 늘어나는)'를 뜻하는 단어는?",
              statement: "Choose the word from the passage that means 'becoming larger in number or amount'.",
              options: ["serious", "increasing", "safe", "busy"],
              answer: "increasing",
              explanation: "3번째 문장의 'an increasing number of adults(점점 늘어나는 수의 성인들)'에서 increasing이 '증가하는'이라는 뜻입니다.",
              translation: "지문에서 '수나 양이 점점 늘어나는'이라는 뜻의 단어를 고르세요."
            }
          ]
        },
        wed: {
          dayKey: "wed",
          dayLabel: "수",
          dayFullLabel: "수요일",
          skill: "Writing",
          title: "IELTS Task 1 미니 영작: 출퇴근 교통수단 비율 비교",
          description: "간단한 수치 데이터를 보고 필수 영단어 3개를 포함해 2~3문장으로 비교 설명해 보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "popular", meaning: "인기 있는, 대중적인", example: "The subway was the most popular choice." }
          ],
          taskType: "Task 1 (간단한 수치 비교: 직장인 출퇴근 수단 — 지하철 55%, 자가용 30%, 자전거 15%)",
          writingPrompt: "The chart shows how workers travel to work in a city: Subway (55%), Car (30%), and Bicycle (15%). Write 2–3 sentences comparing these numbers.",
          writingPromptKo: "어느 도시 직장인들의 출근 교통수단 비율(지하철 55%, 자가용 30%, 자전거 15%)을 2~3문장으로 비교하여 작성해 보세요.",
          requiredWords: [
            { word: "popular", meaning: "인기 있는" },
            { word: "while", meaning: "반면에" },
            { word: "lowest", meaning: "가장 낮은" }
          ],
          sentencePatterns: [
            "According to the chart, the subway is the most ... (차트에 따르면 지하철이 가장 ...합니다.)",
            "About 30% of workers use a car, ... only 15% ride a bicycle. (약 30%는 자가용을 이용하고, ... 단 15%만이 자전거를 탑니다.)",
            "Overall, cycling has the ... percentage. (전반적으로 자전거가 ... 비율을 보입니다.)"
          ],
          modelAnswer: "According to the chart, the subway is the most popular way to commute, at 55%. Around 30% of workers drive a car, while only 15% ride a bicycle. Overall, cycling has the lowest percentage among the three options.",
          modelAnswerKo: "차트에 따르면 지하철은 55%로 가장 인기 있는 출근 수단입니다. 약 30%의 직장인은 자가용을 운전하는 반면, 단 15%만이 자전거를 탑니다. 전반적으로 세 가지 선택지 중 자전거가 가장 낮은 비율을 차지합니다.",
          keyExpressions: [
            { expr: "According to the chart,", desc: "차트에 따르면 (Task 1 핵심 시작 표현)" },
            { expr: "while", desc: "~인 반면에 (두 수치를 대조할 때 필수)" },
            { expr: "the lowest percentage", desc: "가장 낮은 비율" }
          ]
        },
        thu: {
          dayKey: "thu",
          dayLabel: "목",
          dayFullLabel: "목요일",
          skill: "Speaking",
          title: "IELTS Speaking Part 1: 대중교통과 이동",
          description: "30초 동안 답변을 구상하고, 1분 동안 말한 뒤 원어민 모범 답변을 들어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "crowded", meaning: "붐비는, 혼잡한", example: "The subway is crowded in the morning." }
          ],
          questions: [
            {
              id: "w3-thu-q1",
              questionNumber: 1,
              question: "How do you usually travel to work or school?",
              questionKo: "보통 직장이나 학교에 갈 때 어떤 교통수단을 이용하나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "take the subway", ko: "지하철을 타다" },
                { en: "about 30 minutes", ko: "약 30분" },
                { en: "listen to a podcast", ko: "팟캐스트를 듣다" },
                { en: "avoid traffic", ko: "교통 체증을 피하다" }
              ],
              modelAnswer: "I usually take the subway to work because it is fast and reliable. The trip takes about thirty minutes from my house to the office. During the ride, I often read news or listen to English audio.",
              modelAnswerKo: "저는 빠르고 정확하기 때문에 보통 지하철을 타고 출근합니다. 집에서 사무실까지 약 30분 정도 걸립니다. 타는 동안에는 뉴스를 읽거나 영어 오디오를 자주 듣습니다.",
              tip: "'It takes about ~ minutes'로 소요 시간을 말해주면 IELTS Part 1 답변이 매우 자연스러워집니다."
            },
            {
              id: "w3-thu-q2",
              questionNumber: 2,
              question: "Do you prefer using public transport or driving a car?",
              questionKo: "대중교통을 이용하는 것과 직접 운전하는 것 중 어느 쪽을 더 선호하나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "public transport", ko: "대중교통" },
                { en: "save on parking", ko: "주차비를 아끼다" },
                { en: "crowded during rush hour", ko: "출근 시간에 붐비다" },
                { en: "less stressful", ko: "스트레스가 덜한" }
              ],
              modelAnswer: "I prefer using public transport, especially the subway. Even though it can be crowded during rush hour, I do not have to worry about traffic or parking. It is also much cheaper and less stressful than driving.",
              modelAnswerKo: "저는 대중교통, 특히 지하철을 이용하는 것을 선호합니다. 출퇴근 시간에는 붐빌 수 있지만, 교통 체증이나 주차 걱정을 할 필요가 없습니다. 또한 운전하는 것보다 훨씬 저렴하고 스트레스도 덜합니다.",
              tip: "'Even though ~(비록 ~일지라도)'로 단점을 살짝 인정한 뒤 장점을 말하면 논리력이 돋보입니다."
            }
          ]
        },
        fri: {
          dayKey: "fri",
          dayLabel: "금",
          dayFullLabel: "금요일",
          skill: "Weekly Review",
          title: "3주차 핵심 어휘 & 패턴 스피드 복습",
          description: "3주차에 배운 교통·출퇴근 핵심 어휘 5개와 비교 표현을 퀴즈로 복습해 보세요.",
          estimatedMinutes: 5,
          reviewVocab: [
            { word: "commute", meaning: "출퇴근하다", day: "월요일 Listening" },
            { word: "platform", meaning: "승강장", day: "월요일 Listening" },
            { word: "traffic", meaning: "교통, 차량 통행", day: "화요일 Reading" },
            { word: "popular", meaning: "인기 있는", day: "수요일 Writing" },
            { word: "crowded", meaning: "붐비는", day: "목요일 Speaking" }
          ],
          questions: [
            {
              id: "w3-fri-q1",
              type: "mcq",
              category: "어휘 뜻 매칭 (1/5)",
              prompt: "다음 중 '집과 직장 사이를 오가며 출퇴근하다'라는 뜻의 동사는?",
              options: ["commute", "include", "relax", "prefer"],
              answer: "commute",
              explanation: "월요일 Listening에서 'I commute to the city center every day.'로 배웠습니다.",
              translation: "commute = 통근하다, 출퇴근하다"
            },
            {
              id: "w3-fri-q2",
              type: "mcq",
              category: "어휘 뜻 매칭 (2/5)",
              prompt: "기차나 지하철을 타는 '승강장'을 뜻하는 영어 단어는?",
              options: ["parking", "platform", "pollution", "fuel"],
              answer: "platform",
              explanation: "'The express train leaves from Platform 3.'에서 platform이 승강장입니다.",
              translation: "platform = 승강장, 플랫폼"
            },
            {
              id: "w3-fri-q3",
              type: "mcq",
              category: "어휘 뜻 매칭 (3/5)",
              prompt: "빈칸에 알맞은 단어는? 'The subway can be very ______ during the morning rush hour.'",
              options: ["crowded", "fresh", "simple", "lowest"],
              answer: "crowded",
              explanation: "출근 시간대(rush hour)에는 지하철이 매우 '붐빈다(crowded)'가 자연스럽습니다.",
              translation: "아침 출근 시간에는 지하철이 매우 붐빌 수 있습니다."
            },
            {
              id: "w3-fri-q4",
              type: "short",
              category: "문장 패턴 빈칸 채우기 (4/5)",
              prompt: "빈칸에 알맞은 단어를 입력하세요. (힌트: 인기 있는)",
              sentenceBefore: "The subway is the most",
              sentenceAfter: "way to commute.",
              placeholder: "단어 입력 (예: popular)",
              answer: "popular",
              acceptedAnswers: ["popular"],
              explanation: "수요일 Writing에서 배운 '가장 인기 있는(the most popular)' 패턴입니다.",
              translation: "지하철은 가장 인기 있는 출근 수단입니다."
            },
            {
              id: "w3-fri-q5",
              type: "mcq",
              category: "문장 패턴 복습 (5/5)",
              prompt: "화요일 Reading에서 '교통 체증'을 뜻할 때 함께 쓰인 핵심 명사는? '______ congestion'",
              options: ["traffic", "membership", "habit", "opinion"],
              answer: "traffic",
              explanation: "'traffic congestion'은 IELTS에서 '교통 체증'을 뜻하는 필수 연어(Collocation)입니다.",
              translation: "traffic congestion = 교통 체증"
            }
          ]
        }
      }
    },

    // ========================================================
    // WEEK 4: 디지털 소통과 스마트 기기 활용
    // ========================================================
    {
      weekNumber: 4,
      title: "Week 4: 디지털 소통과 스마트 기기",
      subtitle: "기술·소통 필수 어휘 및 4주 종합 마무리",
      days: {
        mon: {
          dayKey: "mon",
          dayLabel: "월",
          dayFullLabel: "월요일",
          skill: "Listening",
          title: "모바일 요금제 변경 문의하기",
          description: "통신사 고객센터 직원과 고객의 대화를 듣고 데이터 용량, 요금, 약정 조건을 파악해 보세요.",
          estimatedMinutes: 7,
          vocabHighlights: [
            { word: "plan", meaning: "요금제, 계획", example: "I want to change my mobile plan." },
            { word: "contract", meaning: "계약, 약정", example: "There is no long-term contract." }
          ],
          dialogue: [
            {
              speaker: "Agent",
              voicePitch: 1.1,
              text: "Hello, Star Mobile customer service. How may I assist you today?",
              ko: "안녕하세요, 스타 모바일 고객센터입니다. 오늘 무엇을 도와드릴까요?"
            },
            {
              speaker: "Jisoo",
              voicePitch: 0.95,
              text: "Hi, I'd like to upgrade my mobile data plan because I watch study videos on my phone.",
              ko: "안녕하세요, 휴대폰으로 학습 영상을 봐서 모바일 데이터 요금제를 올리고 싶습니다."
            },
            {
              speaker: "Agent",
              voicePitch: 1.1,
              text: "No problem. Our Smart Plan gives you 50 gigabytes of data for 32 dollars a month.",
              ko: "문제없습니다. 스마트 요금제는 월 32달러에 50기가바이트의 데이터를 제공합니다."
            },
            {
              speaker: "Jisoo",
              voicePitch: 0.95,
              text: "Does that require a two-year contract?",
              ko: "그 요금제는 2년 약정이 필요한가요?"
            },
            {
              speaker: "Agent",
              voicePitch: 1.1,
              text: "No, there is no contract, and you can cancel anytime. Your new plan will start on Friday.",
              ko: "아니요, 약정은 없으며 언제든 해지할 수 있습니다. 새 요금제는 금요일부터 시작됩니다."
            }
          ],
          questions: [
            {
              id: "w4-mon-q1",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (1/3)",
              sentenceBefore: "Our Smart Plan gives you",
              sentenceAfter: "gigabytes of data.",
              options: ["20", "30", "50", "100"],
              answer: "50",
              explanation: "상담원이 50기가바이트(50 gigabytes) 데이터를 제공한다고 안내했습니다.",
              translation: "스마트 요금제는 50기가바이트의 데이터를 제공합니다."
            },
            {
              id: "w4-mon-q2",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (2/3)",
              sentenceBefore: "The monthly price is",
              sentenceAfter: "dollars.",
              options: ["22", "32", "42", "52"],
              answer: "32",
              explanation: "월 요금은 32달러(32 dollars a month)입니다.",
              translation: "월 요금은 32달러입니다."
            },
            {
              id: "w4-mon-q3",
              type: "short",
              prompt: "대화 스크립트 빈칸 채우기 (3/3) - 요일을 영어로 입력하세요",
              sentenceBefore: "Your new plan will start on",
              sentenceAfter: ".",
              placeholder: "요일 입력 (예: Friday)",
              answer: "Friday",
              acceptedAnswers: ["friday"],
              explanation: "새 요금제는 금요일(Friday)부터 시작됩니다.",
              translation: "새 요금제는 금요일부터 시작됩니다."
            }
          ]
        },
        tue: {
          dayKey: "tue",
          dayLabel: "화",
          dayFullLabel: "화요일",
          skill: "Reading",
          title: "스마트폰으로 읽는 전자책의 장단점",
          description: "짧은 IT/독서 지문을 읽고 True/False/Not Given 및 동의어 문제를 풀어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "screen", meaning: "화면", example: "Reading on a bright screen can tire your eyes." }
          ],
          passageTitle: "Reading E-books on Smartphones",
          sentences: [
            {
              en: "Today, millions of people read articles and e-books on their smartphones every day.",
              ko: "오늘날 수백만 명의 사람들이 매일 스마트폰으로 기사와 전자책을 읽습니다."
            },
            {
              en: "One clear advantage is that you can carry hundreds of books in your pocket wherever you go.",
              ko: "한 가지 분명한 장점은 어디를 가든 주머니 속에 수백 권의 책을 가지고 다닐 수 있다는 것입니다."
            },
            {
              en: "In addition, digital dictionaries allow readers to check unfamiliar words in just one second.",
              ko: "게다가 디지털 사전은 독자들이 낯선 단어를 단 1초 만에 확인할 수 있게 해줍니다."
            },
            {
              en: "On the other hand, looking at a bright screen for too long can cause eye strain.",
              ko: "반면에, 밝은 화면을 너무 오래 보는 것은 눈의 피로를 유발할 수 있습니다."
            },
            {
              en: "For this reason, many experts suggest taking a short break every thirty minutes.",
              ko: "이러한 이유로 많은 전문가들은 30분마다 짧은 휴식을 취할 것을 제안합니다."
            }
          ],
          questions: [
            {
              id: "w4-tue-q1",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Digital dictionaries make it slow to look up new words.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "FALSE",
              explanation: "3번째 문장에서 디지털 사전은 단 1초 만에(in just one second) 단어를 확인할 수 있게 해준다고 했으므로, 느리다는 진술은 FALSE입니다.",
              translation: "디지털 사전은 새 단어를 찾아보는 데 시간이 오래 걸리게 한다."
            },
            {
              id: "w4-tue-q2",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Paper books are more popular among teenagers than older adults.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "NOT GIVEN",
              explanation: "지문에는 십대와 노년층의 종이책 선호도를 비교한 내용이 전혀 나오지 않으므로 NOT GIVEN입니다.",
              translation: "종이책은 노년층보다 십대들 사이에서 더 인기가 많다."
            },
            {
              id: "w4-tue-q3",
              type: "mcq",
              prompt: "핵심 동의어 찾기: 지문에서 'not known or not seen before(낯선, 익숙하지 않은)'를 뜻하는 단어는?",
              statement: "Choose the word from the passage that means 'new to you; not familiar'.",
              options: ["clear", "unfamiliar", "bright", "digital"],
              answer: "unfamiliar",
              explanation: "3번째 문장의 'unfamiliar words(낯선 단어들)'에서 unfamiliar가 '익숙하지 않은'이라는 뜻입니다.",
              translation: "지문에서 '새롭고 익숙하지 않은'이라는 뜻의 단어를 고르세요."
            }
          ]
        },
        wed: {
          dayKey: "wed",
          dayLabel: "수",
          dayFullLabel: "수요일",
          skill: "Writing",
          title: "IELTS Task 2 미니 영작: 스마트폰 사용",
          description: "주어진 필수 영단어 3개를 모두 포함하여 2~3문장으로 장단점을 서술해 보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "useful", meaning: "유용한", example: "Smartphones are very useful for learning." }
          ],
          taskType: "Task 2 (기술/스마트폰 장단점 쓰기)",
          writingPrompt: "Smartphones have become an essential part of daily life. What are the advantages and disadvantages of using a smartphone?",
          writingPromptKo: "스마트폰은 일상생활의 필수품이 되었습니다. 스마트폰 사용의 장점과 단점은 무엇인가요?",
          requiredWords: [
            { word: "useful", meaning: "유용한" },
            { word: "communicate", meaning: "소통하다" },
            { word: "however", meaning: "하지만" }
          ],
          sentencePatterns: [
            "Smartphones are very ... because we can ... (스마트폰은 ~할 수 있기 때문에 매우 ...합니다.)",
            "..., spending too much time on the screen can ... (..., 화면을 너무 오래 보는 것은 ...할 수 있습니다.)"
          ],
          modelAnswer: "Smartphones are very useful tools because they help us communicate with friends and learn new things anytime. However, spending too much time looking at the screen can be bad for our eyes and sleep.",
          modelAnswerKo: "스마트폰은 언제든 친구들과 소통하고 새로운 것을 배우도록 도와주기 때문에 매우 유용한 도구입니다. 하지만 화면을 보며 너무 많은 시간을 보내는 것은 눈과 수면에 해로울 수 있습니다.",
          keyExpressions: [
            { expr: "useful tools", desc: "유용한 도구들" },
            { expr: "communicate with ~", desc: "~와 소통하다" },
            { expr: "However,", desc: "하지만, 그러나 (장점에서 단점으로 전환할 때 필수)" }
          ]
        },
        thu: {
          dayKey: "thu",
          dayLabel: "목",
          dayFullLabel: "목요일",
          skill: "Speaking",
          title: "IELTS Speaking Part 1: 스마트폰과 인터넷",
          description: "30초 동안 답변을 구상하고, 1분 동안 말한 뒤 원어민 모범 답변을 들어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "message", meaning: "메시지, 문자", example: "I send messages to my colleagues." }
          ],
          questions: [
            {
              id: "w4-thu-q1",
              questionNumber: 1,
              question: "How often do you use your smartphone?",
              questionKo: "스마트폰을 얼마나 자주 사용하나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "every day", ko: "매일" },
                { en: "check emails", ko: "이메일을 확인하다" },
                { en: "send messages", ko: "메시지를 보내다" },
                { en: "study English", ko: "영어를 공부하다" }
              ],
              modelAnswer: "I use my smartphone every day for both work and personal life. In the morning, I check my messages and read the news on the bus. In the evening, I also use it to study English for ten minutes.",
              modelAnswerKo: "저는 업무와 개인 생활 모두를 위해 매일 스마트폰을 사용합니다. 아침에는 버스에서 메시지를 확인하고 뉴스를 읽습니다. 저녁에는 10분 동안 영어를 공부하는 데도 사용합니다.",
              tip: "'for both work and personal life(일과 개인 생활 모두를 위해)'는 성인 학습자가 쓰기 아주 좋은 만능 표현입니다."
            },
            {
              id: "w4-thu-q2",
              questionNumber: 2,
              question: "Do you prefer calling people or sending text messages?",
              questionKo: "전화로 통화하는 것과 문자 메시지를 보내는 것 중 어느 것을 더 선호하나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "send text messages", ko: "문자 메시지를 보내다" },
                { en: "quick and polite", ko: "빠르고 예의 바른" },
                { en: "at the office", ko: "사무실에서" },
                { en: "call in an emergency", ko: "급할 때 전화하다" }
              ],
              modelAnswer: "I usually prefer sending text messages because it is quick and does not disturb others. When I am at the office, texting is much easier than making a phone call. Of course, I still call people if something is urgent.",
              modelAnswerKo: "저는 빠르고 다른 사람을 방해하지 않기 때문에 보통 문자 메시지를 보내는 것을 선호합니다. 사무실에 있을 때는 전화 통화보다 문자가 훨씬 쉽습니다. 물론 급한 일이 있으면 여전히 전화를 겁니다.",
              tip: "두 가지 선택지를 비교할 때 '보통은 A를 선호하지만, 급할 때는 B를 쓴다'처럼 예외를 덧붙이면 답변이 풍부해집니다."
            }
          ]
        },
        fri: {
          dayKey: "fri",
          dayLabel: "금",
          dayFullLabel: "금요일",
          skill: "Weekly Review",
          title: "4주차 핵심 어휘 & 4주 완성 스피드 복습",
          description: "4주차에 배운 디지털·소통 핵심 어휘 5개와 문장 연결 표현을 최종 복습해 보세요.",
          estimatedMinutes: 5,
          reviewVocab: [
            { word: "plan", meaning: "요금제, 계획", day: "월요일 Listening" },
            { word: "contract", meaning: "계약, 약정", day: "월요일 Listening" },
            { word: "unfamiliar", meaning: "낯선, 익숙하지 않은", day: "화요일 Reading" },
            { word: "communicate", meaning: "소통하다", day: "수요일 Writing" },
            { word: "useful", meaning: "유용한", day: "수요일 Writing" }
          ],
          questions: [
            {
              id: "w4-fri-q1",
              type: "mcq",
              category: "어휘 뜻 매칭 (1/5)",
              prompt: "통신사 등에서 '약정, 계약'을 뜻하는 영어 단어는?",
              options: ["contract", "screen", "message", "pocket"],
              answer: "contract",
              explanation: "월요일 Listening에서 'a two-year contract(2년 약정)'으로 배웠습니다.",
              translation: "contract = 계약, 약정"
            },
            {
              id: "w4-fri-q2",
              type: "mcq",
              category: "어휘 뜻 매칭 (2/5)",
              prompt: "다음 중 'unfamiliar'의 뜻으로 가장 알맞은 것은?",
              options: ["낯선, 익숙하지 않은", "유용한", "빠른", "무료의"],
              answer: "낯선, 익숙하지 않은",
              explanation: "화요일 Reading에서 'check unfamiliar words(낯선 단어를 확인하다)'로 등장했습니다.",
              translation: "unfamiliar = 낯선, 익숙하지 않은"
            },
            {
              id: "w4-fri-q3",
              type: "mcq",
              category: "어휘 뜻 매칭 (3/5)",
              prompt: "빈칸에 알맞은 단어는? 'Smartphones help us ______ with friends anytime.'",
              options: ["communicate", "cancel", "cause", "upgrade"],
              answer: "communicate",
              explanation: "'communicate with ~(와 소통하다)'는 IELTS Writing/Speaking 핵심 동사입니다.",
              translation: "스마트폰은 우리가 언제든 친구들과 소통하도록 도와줍니다."
            },
            {
              id: "w4-fri-q4",
              type: "short",
              category: "문장 패턴 빈칸 채우기 (4/5)",
              prompt: "빈칸에 알맞은 단어를 입력하세요. (힌트: 유용한)",
              sentenceBefore: "Digital dictionaries are very",
              sentenceAfter: "for English learners.",
              placeholder: "단어 입력 (예: useful)",
              answer: "useful",
              acceptedAnswers: ["useful"],
              explanation: "수요일 Writing에서 배운 '유용한'을 뜻하는 형용사 useful입니다.",
              translation: "디지털 사전은 영어 학습자들에게 매우 유용합니다."
            },
            {
              id: "w4-fri-q5",
              type: "mcq",
              category: "문장 패턴 복습 (5/5)",
              prompt: "장점에서 단점으로 이야기를 전환할 때 가장 적절한 연결 부사는?",
              options: ["However", "Because", "First", "Inside"],
              answer: "However",
              explanation: "'However,(하지만)'는 앞 문장과 반대되는 단점이나 다른 의견을 이어줄 때 필수입니다.",
              translation: "However = 하지만, 그러나"
            }
          ]
        }
      }
    },

    // ========================================================
    // WEEK 5 (Band 5.0~5.5): 직장 업무와 자기계발
    // ========================================================
    {
      weekNumber: 5,
      title: "Week 5: 직장 업무와 자기계발",
      subtitle: "Band 5.0–5.5 도약 · 비즈니스/협업 어휘 및 복문 구조",
      difficultyLevel: "Level 3 · Band 5.0–5.5",
      days: {
        mon: {
          dayKey: "mon",
          dayLabel: "월",
          dayFullLabel: "월요일",
          skill: "Listening",
          title: "사내 워크숍 및 교육 일정 안내",
          description: "인사팀 담당자와 직원의 대화를 듣고 워크숍 주제, 장소, 신청 마감일을 파악해 보세요.",
          estimatedMinutes: 7,
          vocabHighlights: [
            { word: "workshop", meaning: "워크숍, 연수", example: "We are holding a communication workshop." },
            { word: "deadline", meaning: "마감일", example: "The registration deadline is Thursday." }
          ],
          dialogue: [
            {
              speaker: "HR Manager",
              voicePitch: 1.1,
              text: "Hi, everyone. Just a reminder that our communication skills workshop will take place next Monday.",
              ko: "안녕하세요, 여러분. 다음 주 월요일에 커뮤니케이션 기술 워크숍이 열린다는 점을 다시 알려드립니다."
            },
            {
              speaker: "Eric",
              voicePitch: 0.9,
              text: "Excuse me, which room is it in, and do we need to sign up in advance?",
              ko: "실례합니다, 몇 호에서 열리며 미리 신청해야 하나요?"
            },
            {
              speaker: "HR Manager",
              voicePitch: 1.1,
              text: "It will be held in Conference Room B on the third floor. Please submit your name before the deadline on Thursday at 5 p.m.",
              ko: "3층 회의실 B에서 진행됩니다. 목요일 오후 5시 마감 전까지 이름을 제출해 주세요."
            },
            {
              speaker: "Eric",
              voicePitch: 0.9,
              text: "Got it. Will we receive any printed materials or certificates?",
              ko: "알겠습니다. 인쇄 자료나 수료증을 받게 되나요?"
            },
            {
              speaker: "HR Manager",
              voicePitch: 1.1,
              text: "Digital handouts will be emailed to all participants, and light refreshments will be provided.",
              ko: "모든 참가자에게 디지털 유인물이 이메일로 발송되며, 간단한 다과가 제공될 예정입니다."
            }
          ],
          questions: [
            {
              id: "w5-mon-q1",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (1/3)",
              sentenceBefore: "It will be held in Conference Room B on the",
              sentenceAfter: "floor.",
              options: ["first", "second", "third", "fourth"],
              answer: "third",
              explanation: "인사팀 담당자가 'on the third floor(3층)'라고 안내했습니다.",
              translation: "3층 회의실 B에서 진행됩니다."
            },
            {
              id: "w5-mon-q2",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (2/3)",
              sentenceBefore: "Please submit your name before the deadline on",
              sentenceAfter: "at 5 p.m.",
              options: ["Monday", "Wednesday", "Thursday", "Friday"],
              answer: "Thursday",
              explanation: "신청 마감일은 목요일(Thursday) 오후 5시입니다.",
              translation: "목요일 오후 5시 마감 전까지 이름을 제출해 주세요."
            },
            {
              id: "w5-mon-q3",
              type: "short",
              prompt: "대화 스크립트 빈칸 채우기 (3/3) - 한 단어로 입력하세요",
              sentenceBefore: "Digital handouts will be emailed to all",
              sentenceAfter: ".",
              placeholder: "정답 단어 입력 (예: participants)",
              answer: "participants",
              acceptedAnswers: ["participants", "participant"],
              explanation: "'participants(참가자들)'에게 디지털 유인물이 이메일로 발송됩니다.",
              translation: "모든 참가자에게 디지털 유인물이 이메일로 발송됩니다."
            }
          ]
        },
        tue: {
          dayKey: "tue",
          dayLabel: "화",
          dayFullLabel: "화요일",
          skill: "Reading",
          title: "원격 근무(재택근무)가 업무 생산성에 미치는 영향",
          description: "Band 5.0~5.5 수준의 비즈니스 독해 지문을 읽고 TFNG 및 핵심 동의어를 찾아보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "flexible", meaning: "유연한", example: "Flexible hours improve job satisfaction." },
            { word: "productivity", meaning: "생산성", example: "Quiet environments boost productivity." }
          ],
          passageTitle: "How Remote Work Changes Office Productivity",
          sentences: [
            {
              en: "In recent years, many companies have allowed employees to work from home several days a week.",
              ko: "최근 몇 년 동안 많은 기업들이 직원들에게 일주일에 며칠씩 재택근무를 허용하고 있습니다."
            },
            {
              en: "One major advantage of this flexible arrangement is that workers save significant time by avoiding daily commutes.",
              ko: "이러한 유연한 근무 방식의 주요 장점 중 하나는 직원들이 매일의 출퇴근을 피해 상당한 시간을 절약한다는 것입니다."
            },
            {
              en: "Studies suggest that employees who work in a quiet home environment often show higher productivity.",
              ko: "연구에 따르면 조용한 가정 환경에서 일하는 직원들이 종종 더 높은 생산성을 보입니다."
            },
            {
              en: "However, working remotely can sometimes make team communication slower and cause feelings of isolation.",
              ko: "하지만 원격으로 일하는 것은 때때로 팀 소통을 느리게 만들고 고립감을 유발할 수 있습니다."
            },
            {
              en: "Therefore, a balanced hybrid model that combines office collaboration with home focus is becoming the preferred solution.",
              ko: "따라서 사무실 협업과 가정에서의 집중을 결합한 균형 잡힌 하이브리드 모델이 선호되는 해결책이 되고 있습니다."
            }
          ],
          questions: [
            {
              id: "w5-tue-q1",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Working from home always makes team communication faster.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "FALSE",
              explanation: "4번째 문장에서 원격 근무가 팀 소통을 때때로 느리게(slower) 만들 수 있다고 했으므로 FALSE입니다.",
              translation: "재택근무는 항상 팀 소통을 더 빠르게 만든다."
            },
            {
              id: "w5-tue-q2",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Small technology startups adopted remote work earlier than large banks.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "NOT GIVEN",
              explanation: "지문에서는 소규모 스타트업과 대형 은행을 비교한 내용이 전혀 나오지 않으므로 NOT GIVEN입니다.",
              translation: "소규모 기술 스타트업들이 대형 은행보다 먼저 재택근무를 도입했다."
            },
            {
              id: "w5-tue-q3",
              type: "mcq",
              prompt: "핵심 동의어 찾기: 지문에서 'important or large enough to be noticed(상당한, 중요한)'를 뜻하는 단어는?",
              statement: "Choose the word from the passage that means 'large or important enough to have an effect'.",
              options: ["flexible", "significant", "quiet", "balanced"],
              answer: "significant",
              explanation: "2번째 문장의 'significant time(상당한 시간)'에서 significant는 IELTS Reading 빈출 학술 형용사입니다.",
              translation: "지문에서 '효과가 있을 만큼 크거나 중요한(상당한)'이라는 뜻의 단어를 고르세요."
            }
          ]
        },
        wed: {
          dayKey: "wed",
          dayLabel: "수",
          dayFullLabel: "수요일",
          skill: "Writing",
          title: "IELTS Task 2 심화 영작: 재택근무의 장단점",
          description: "필수 연결어와 핵심 어휘 3개를 조합해 논리적인 3문장을 작성해 보세요.",
          estimatedMinutes: 9,
          vocabHighlights: [
            { word: "flexible", meaning: "유연한", example: "Flexible schedules reduce stress." }
          ],
          taskType: "Task 2 (직장/근무 형태 의견 쓰기)",
          writingPrompt: "Some companies allow employees to work from home part of the week. Do the advantages of this trend outweigh the disadvantages?",
          writingPromptKo: "일부 기업은 주중 일부를 재택근무하도록 허용합니다. 이러한 추세의 장점이 단점보다 더 크다고 생각하나요?",
          requiredWords: [
            { word: "flexible", meaning: "유연한" },
            { word: "productivity", meaning: "생산성" },
            { word: "therefore", meaning: "그러므로" }
          ],
          sentencePatterns: [
            "Although working from home can reduce face-to-face talk, it offers a ... schedule. (비록 재택근무가 대면 대화를 줄일 수 있지만, ...한 일정을 제공합니다.)",
            "This helps employees boost their ... while saving commute time. (이는 출퇴근 시간을 아끼면서 ...을 높이는 데 도움이 됩니다.)",
            "..., I believe the benefits clearly outweigh the drawbacks. (..., 장점이 단점을 분명히 능가한다고 생각합니다.)"
          ],
          modelAnswer: "Although working from home may reduce casual office chat, it gives workers a flexible schedule and saves travel time. As a result, many employees can focus better and improve their productivity. Therefore, I believe the advantages of remote work clearly outweigh the disadvantages.",
          modelAnswerKo: "재택근무가 가벼운 사무실 대화를 줄일 수는 있지만, 직장인들에게 유연한 일정을 제공하고 이동 시간을 절약해 줍니다. 그 결과 많은 직원들이 더 잘 집중하고 생산성을 높일 수 있습니다. 그러므로 저는 원격 근무의 장점이 단점을 분명히 능가한다고 생각합니다.",
          keyExpressions: [
            { expr: "Although + 주어 + 동사,", desc: "비록 ~일지라도 (Band 5.5+ 양보절 핵심 패턴)" },
            { expr: "As a result,", desc: "그 결과 (원인-결과 연결)" },
            { expr: "outweigh the disadvantages", desc: "단점을 능가하다 (IELTS 에세이 만능 표현)" }
          ]
        },
        thu: {
          dayKey: "thu",
          dayLabel: "목",
          dayFullLabel: "목요일",
          skill: "Speaking",
          title: "IELTS Speaking Part 1: 직업과 업무 환경",
          description: "30초 준비 후 1분 동안 복문 구조를 활용해 답변하고, 원어민 발음을 들어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "colleague", meaning: "직장 동료", example: "I get along well with my colleagues." }
          ],
          questions: [
            {
              id: "w5-thu-q1",
              questionNumber: 1,
              question: "Do you enjoy working with other people in a team?",
              questionKo: "팀 안에서 다른 사람들과 함께 일하는 것을 즐기시나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "share ideas", ko: "아이디어를 공유하다" },
                { en: "helpful colleagues", ko: "도움이 되는 동료들" },
                { en: "solve problems faster", ko: "문제를 더 빨리 해결하다" },
                { en: "learn from others", ko: "다른 사람에게서 배우다" }
              ],
              modelAnswer: "Yes, I really enjoy working in a team because we can share different ideas. Whenever a difficult problem comes up, my colleagues are always ready to help. Working together not only saves time but also makes the office atmosphere much friendlier.",
              modelAnswerKo: "네, 서로 다른 아이디어를 공유할 수 있기 때문에 팀으로 일하는 것을 정말 즐깁니다. 어려운 문제가 생길 때마다 동료들이 항상 기꺼이 도와줍니다. 함께 일하는 것은 시간을 절약할 뿐만 아니라 사무실 분위기도 훨씬 더 친근하게 만들어 줍니다.",
              tip: "'not only A but also B(A뿐만 아니라 B도)' 구문을 Speaking에서 자연스럽게 쓰면 Band 5.5 이상으로 평가받기 좋습니다."
            },
            {
              id: "w5-thu-q2",
              questionNumber: 2,
              question: "What kind of skill would you like to learn for your future career?",
              questionKo: "미래의 커리어를 위해 배우고 싶은 기술이 있다면 무엇인가요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "business English", ko: "비즈니스 영어" },
                { en: "international clients", ko: "해외 고객" },
                { en: "career opportunities", ko: "경력 기회" },
                { en: "more confident", ko: "더 자신감 있는" }
              ],
              modelAnswer: "I would like to improve my business English skills so that I can communicate with international clients. These days, many companies value employees who can write clear emails and join global meetings. Learning this skill will definitely open up more career opportunities for me.",
              modelAnswerKo: "해외 고객들과 소통할 수 있도록 비즈니스 영어 실력을 향상시키고 싶습니다. 요즘 많은 회사들이 명확한 이메일을 쓰고 글로벌 회의에 참여할 수 있는 직원을 높이 평가합니다. 이 기술을 배우면 제게 더 많은 경력 기회가 열릴 것입니다.",
              tip: "'so that I can ~(~할 수 있도록)'으로 목적을 설명하면 문장 구조가 훨씬 매끄러워집니다."
            }
          ]
        },
        fri: {
          dayKey: "fri",
          dayLabel: "금",
          dayFullLabel: "금요일",
          skill: "Weekly Review",
          title: "5주차 핵심 어휘 & Band 5.5 패턴 복습",
          description: "5주차 비즈니스·협업 핵심 어휘 5개와 연결 구조를 퀴즈로 복습해 보세요.",
          estimatedMinutes: 5,
          reviewVocab: [
            { word: "deadline", meaning: "마감일", day: "월요일 Listening" },
            { word: "flexible", meaning: "유연한", day: "화/수요일" },
            { word: "significant", meaning: "상당한, 중요한", day: "화요일 Reading" },
            { word: "productivity", meaning: "생산성", day: "화/수요일" },
            { word: "colleague", meaning: "직장 동료", day: "목요일 Speaking" }
          ],
          questions: [
            {
              id: "w5-fri-q1",
              type: "mcq",
              category: "어휘 뜻 매칭 (1/5)",
              prompt: "과제나 신청을 마쳐야 하는 '마감일'을 뜻하는 영어 단어는?",
              options: ["deadline", "handout", "isolation", "client"],
              answer: "deadline",
              explanation: "월요일 Listening에서 'before the deadline on Thursday'로 배웠습니다.",
              translation: "deadline = 마감일"
            },
            {
              id: "w5-fri-q2",
              type: "mcq",
              category: "어휘 뜻 매칭 (2/5)",
              prompt: "다음 중 'significant'의 뜻으로 가장 알맞은 것은?",
              options: ["상당한, 중요한", "지루한", "불가능한", "느린"],
              answer: "상당한, 중요한",
              explanation: "화요일 Reading에서 'save significant time(상당한 시간을 절약하다)'으로 쓰였습니다.",
              translation: "significant = 상당한, 중요한"
            },
            {
              id: "w5-fri-q3",
              type: "mcq",
              category: "어휘 뜻 매칭 (3/5)",
              prompt: "빈칸에 알맞은 단어는? 'A ______ schedule allows workers to balance work and life.'",
              options: ["flexible", "crowded", "urgent", "printed"],
              answer: "flexible",
              explanation: "'flexible schedule(유연한 일정)'은 일과 삶의 균형을 말할 때 핵심 표현입니다.",
              translation: "유연한 일정은 직장인들이 일과 삶의 균형을 맞추게 해줍니다."
            },
            {
              id: "w5-fri-q4",
              type: "short",
              category: "문장 패턴 빈칸 채우기 (4/5)",
              prompt: "빈칸에 알맞은 단어를 입력하세요. (힌트: 직장 동료)",
              sentenceBefore: "Whenever a problem comes up, my",
              sentenceAfter: "are always ready to help.",
              placeholder: "단어 입력 (예: colleagues)",
              answer: "colleagues",
              acceptedAnswers: ["colleagues", "colleague"],
              explanation: "목요일 Speaking에서 배운 '직장 동료'를 뜻하는 colleague(복수형 colleagues)입니다.",
              translation: "문제가 생길 때마다 제 동료들은 항상 기꺼이 도와줍니다."
            },
            {
              id: "w5-fri-q5",
              type: "mcq",
              category: "문장 패턴 복습 (5/5)",
              prompt: "수요일 Writing에서 '그러므로, 따라서'라는 결론을 이끌 때 사용한 연결어는?",
              options: ["Therefore", "Although", "Whenever", "Instead"],
              answer: "Therefore",
              explanation: "'Therefore,(그러므로)'는 앞선 근거를 바탕으로 결론을 내릴 때 가장 적합한 연결 부사입니다.",
              translation: "Therefore = 그러므로, 따라서"
            }
          ]
        }
      }
    },

    // ========================================================
    // WEEK 6 (Band 5.0~5.5): 환경 보호와 지속 가능한 도시
    // ========================================================
    {
      weekNumber: 6,
      title: "Week 6: 환경 보호와 지속 가능한 도시",
      subtitle: "Band 5.0–5.5 도약 · 환경·사회 주제 어휘 및 원인/해결 구조",
      difficultyLevel: "Level 3 · Band 5.0–5.5",
      days: {
        mon: {
          dayKey: "mon",
          dayLabel: "월",
          dayFullLabel: "월요일",
          skill: "Listening",
          title: "지역 사회 재활용 캠페인 자원봉사 안내",
          description: "캠페인 코디네이터와 자원봉사자의 대화를 듣고 집합 장소, 시간, 준비물을 파악해 보세요.",
          estimatedMinutes: 7,
          vocabHighlights: [
            { word: "volunteer", meaning: "자원봉사자 / 자원하다", example: "Thank you for joining as a volunteer." },
            { word: "separate", meaning: "분리하다", example: "We will separate plastic and glass bottles." }
          ],
          dialogue: [
            {
              speaker: "Coordinator",
              voicePitch: 1.1,
              text: "Thanks for calling the City Clean-Up Campaign. Are you interested in volunteering this Saturday?",
              ko: "도시 정화 캠페인에 전화 주셔서 감사합니다. 이번 주 토요일 자원봉사에 관심이 있으신가요?"
            },
            {
              speaker: "Minji",
              voicePitch: 0.95,
              text: "Yes, I'd love to help. Where do we meet, and what time does it start?",
              ko: "네, 돕고 싶습니다. 어디서 만나며 몇 시에 시작하나요?"
            },
            {
              speaker: "Coordinator",
              voicePitch: 1.1,
              text: "We meet at the East Gate of Riverside Park at 9:30 a.m. Please bring your own reusable water bottle.",
              ko: "오전 9시 30분에 리버사이드 공원 동쪽 문에서 만납니다. 개인용 다회용 물병을 꼭 가져오세요."
            },
            {
              speaker: "Minji",
              voicePitch: 0.95,
              text: "Okay. What kind of work will volunteers do there?",
              ko: "알겠습니다. 그곳에서 자원봉사자들은 어떤 일을 하게 되나요?"
            },
            {
              speaker: "Coordinator",
              voicePitch: 1.1,
              text: "We will collect litter along the river and separate plastic, paper, and glass for recycling.",
              ko: "강가를 따라 쓰레기를 줍고 재활용을 위해 플라스틱, 종이, 유리를 분리할 예정입니다."
            }
          ],
          questions: [
            {
              id: "w6-mon-q1",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (1/3)",
              sentenceBefore: "We meet at the",
              sentenceAfter: "of Riverside Park at 9:30 a.m.",
              options: ["North Gate", "South Gate", "East Gate", "West Gate"],
              answer: "East Gate",
              explanation: "집합 장소는 리버사이드 공원 동문(East Gate)입니다.",
              translation: "오전 9시 30분에 리버사이드 공원 동쪽 문에서 만납니다."
            },
            {
              id: "w6-mon-q2",
              type: "mcq",
              prompt: "대화 스크립트 빈칸 채우기 (2/3)",
              sentenceBefore: "Please bring your own reusable",
              sentenceAfter: "bottle.",
              options: ["water", "coffee", "milk", "juice"],
              answer: "water",
              explanation: "개인용 다회용 물병(reusable water bottle)을 가져오라고 안내했습니다.",
              translation: "개인용 다회용 물병을 가져오세요."
            },
            {
              id: "w6-mon-q3",
              type: "short",
              prompt: "대화 스크립트 빈칸 채우기 (3/3) - 한 단어로 입력하세요",
              sentenceBefore: "We will",
              sentenceAfter: "plastic, paper, and glass for recycling.",
              placeholder: "정답 단어 입력 (예: separate)",
              answer: "separate",
              acceptedAnswers: ["separate"],
              explanation: "재활용을 위해 플라스틱, 종이, 유리를 '분리하다(separate)'가 정답입니다.",
              translation: "재활용을 위해 플라스틱, 종이, 유리를 분리할 예정입니다."
            }
          ]
        },
        tue: {
          dayKey: "tue",
          dayLabel: "화",
          dayFullLabel: "화요일",
          skill: "Reading",
          title: "일회용 플라스틱을 줄이기 위한 도시의 노력",
          description: "환경 정책 지문을 읽고 TFNG 및 학술 동의어 문제를 풀어보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "alternative", meaning: "대안, 대체물", example: "Paper bags are a common alternative." },
            { word: "encourage", meaning: "장려하다, 격려하다", example: "Laws encourage people to recycle." }
          ],
          passageTitle: "Reducing Single-Use Plastics in Modern Cities",
          sentences: [
            {
              en: "Single-use plastics, such as shopping bags and coffee cups, create a massive amount of waste every year.",
              ko: "쇼핑백이나 커피 컵 같은 일회용 플라스틱은 매년 엄청난 양의 쓰레기를 만들어 냅니다."
            },
            {
              en: "Because plastic takes hundreds of years to break down, it often harms oceans and wildlife.",
              ko: "플라스틱은 분해되는 데 수백 년이 걸리기 때문에 종종 바다와 야생 동물에게 해를 끼칩니다."
            },
            {
              en: "To solve this issue, many cities now charge a small fee for plastic bags in supermarkets.",
              ko: "이 문제를 해결하기 위해 많은 도시들은 이제 슈퍼마켓에서 비닐봉지에 소액의 요금을 부과합니다."
            },
            {
              en: "At the same time, cafes encourage customers to bring reusable tumblers by offering a small discount.",
              ko: "동시에 카페들은 소액 할인을 제공함으로써 손님들이 다회용 텀블러를 가져오도록 장려합니다."
            },
            {
              en: "Choosing sustainable alternatives in daily life can make a lasting difference for future generations.",
              ko: "일상생활에서 지속 가능한 대안을 선택하는 것은 미래 세대를 위해 지속적인 변화를 만들 수 있습니다."
            }
          ],
          questions: [
            {
              id: "w6-tue-q1",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Plastic waste breaks down completely within a few months.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "FALSE",
              explanation: "2번째 문장에서 플라스틱은 분해되는 데 수백 년(hundreds of years)이 걸린다고 했으므로 FALSE입니다.",
              translation: "플라스틱 쓰레기는 몇 달 안에 완전히 분해된다."
            },
            {
              id: "w6-tue-q2",
              type: "tfng",
              prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
              statement: "Glass bottles are heavier to transport than plastic bottles.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              answer: "NOT GIVEN",
              explanation: "유리병과 플라스틱병의 운송 무게 비교는 지문에 언급되지 않았으므로 NOT GIVEN입니다.",
              translation: "유리병은 플라스틱병보다 운반하기에 더 무겁다."
            },
            {
              id: "w6-tue-q3",
              type: "mcq",
              prompt: "핵심 동의어 찾기: 지문에서 'very large in size or amount(엄청난, 대규모의)'를 뜻하는 단어는?",
              statement: "Choose the word from the passage that means 'extremely large'.",
              options: ["massive", "reusable", "small", "lasting"],
              answer: "massive",
              explanation: "1번째 문장의 'a massive amount of waste(엄청난 양의 쓰레기)'에서 massive가 '매우 큰/엄청난'입니다.",
              translation: "지문에서 '극도로 큰, 엄청난'이라는 뜻의 단어를 고르세요."
            }
          ]
        },
        wed: {
          dayKey: "wed",
          dayLabel: "수",
          dayFullLabel: "수요일",
          skill: "Writing",
          title: "IELTS Task 2 심화 영작: 환경 문제의 원인과 해결책",
          description: "필수 어휘 3개를 모두 포함하여 환경 문제 해결 방안을 3문장으로 작성해 보세요.",
          estimatedMinutes: 9,
          vocabHighlights: [
            { word: "pollution", meaning: "오염", example: "Plastic waste causes serious pollution." }
          ],
          taskType: "Task 2 (환경 문제 해결책 제시하기)",
          writingPrompt: "Plastic waste has become a serious environmental problem. What can individuals do in daily life to reduce this problem?",
          writingPromptKo: "플라스틱 쓰레기가 심각한 환경 문제가 되었습니다. 개인이 일상생활에서 이 문제를 줄이기 위해 무엇을 할 수 있을까요?",
          requiredWords: [
            { word: "pollution", meaning: "오염" },
            { word: "encourage", meaning: "장려하다" },
            { word: "alternative", meaning: "대안" }
          ],
          sentencePatterns: [
            "To reduce plastic ..., individuals can choose a reusable ... (플라스틱 ...을 줄이기 위해 개인은 다회용 ...을 선택할 수 있습니다.)",
            "For instance, carrying a cloth bag is a practical ... to plastic bags. (예를 들어 천 가방을 들고 다니는 것은 비닐봉지의 실용적인 ...입니다.)",
            "Furthermore, governments and shops should ... people to recycle more. (게다가 정부와 상점들은 사람들이 더 많이 재활용하도록 ...해야 합니다.)"
          ],
          modelAnswer: "To reduce plastic pollution, individuals should use fewer single-use items every day. For instance, bringing a reusable tumbler or cloth bag is a simple alternative to plastic products. Furthermore, local communities should encourage citizens to separate and recycle waste properly.",
          modelAnswerKo: "플라스틱 오염을 줄이기 위해 개인들은 매일 일회용품을 덜 사용해야 합니다. 예를 들어 다회용 텀블러나 천 가방을 가져가는 것은 플라스틱 제품의 간단한 대안입니다. 게다가 지역 사회는 시민들이 쓰레기를 올바르게 분리하고 재활용하도록 장려해야 합니다.",
          keyExpressions: [
            { expr: "To reduce ~,", desc: "~을 줄이기 위해서 (목적 부정사로 문장 시작)" },
            { expr: "a simple alternative to ~", desc: "~에 대한 간단한 대안" },
            { expr: "Furthermore,", desc: "게다가, 더욱이 (추가 아이디어를 제시할 때)" }
          ]
        },
        thu: {
          dayKey: "thu",
          dayLabel: "목",
          dayFullLabel: "목요일",
          skill: "Speaking",
          title: "IELTS Speaking Part 1: 자연과 재활용 습관",
          description: "30초 준비 후 1분 동안 구체적인 예시를 들어 말하고 원어민 발음을 확인해 보세요.",
          estimatedMinutes: 8,
          vocabHighlights: [
            { word: "environment", meaning: "환경", example: "We should protect the environment." }
          ],
          questions: [
            {
              id: "w6-thu-q1",
              questionNumber: 1,
              question: "Do you recycle things at home? How?",
              questionKo: "집에서 재활용을 하시나요? 어떻게 하나요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "separate waste", ko: "쓰레기를 분리하다" },
                { en: "plastic and paper", ko: "플라스틱과 종이" },
                { en: "every week", ko: "매주" },
                { en: "protect the environment", ko: "환경을 보호하다" }
              ],
              modelAnswer: "Yes, I always separate my household waste at home. Every week, I sort plastic bottles, paper boxes, and glass cans into different bins. Even though it takes a little extra effort, I think it is essential to protect the environment.",
              modelAnswerKo: "네, 집에서 항상 생활 쓰레기를 분리수거합니다. 매주 플라스틱 병, 종이 상자, 유리 캔을 각각 다른 통에 나눕니다. 약간의 노력이 더 들긴 하지만, 환경을 보호하기 위해 꼭 필요하다고 생각합니다.",
              tip: "이유를 말할 때 'I think it is essential to ~(~하는 것이 필수적이라고 생각한다)'를 활용하면 설득력이 높아집니다."
            },
            {
              id: "w6-thu-q2",
              questionNumber: 2,
              question: "Are there many parks or green spaces in your city?",
              questionKo: "당신이 사는 도시에는 공원이나 녹지 공간이 많은 편인가요?",
              prepSeconds: 30,
              speakSeconds: 60,
              hints: [
                { en: "green spaces", ko: "녹지 공간" },
                { en: "fresh air", ko: "신선한 공기" },
                { en: "jog or walk", ko: "조깅하거나 산책하다" },
                { en: "escape city noise", ko: "도시 소음에서 벗어나다" }
              ],
              modelAnswer: "Yes, my city has several lovely parks along the river. People often go there on weekends to jog, ride bicycles, and enjoy fresh air. Having these green spaces makes it easy to relax and escape the noisy city streets.",
              modelAnswerKo: "네, 제가 사는 도시에는 강을 따라 멋진 공원들이 여러 개 있습니다. 사람들은 주말에 조깅을 하거나 자전거를 타고 신선한 공기를 마시러 그곳에 자주 갑니다. 이런 녹지 공간이 있어서 시끄러운 도시 거리에서 벗어나 쉬기가 좋습니다.",
              tip: "동명사 주어('Having these green spaces makes it easy to...')를 사용하면 Band 5.5 문법 점수를 노릴 수 있습니다."
            }
          ]
        },
        fri: {
          dayKey: "fri",
          dayLabel: "금",
          dayFullLabel: "금요일",
          skill: "Weekly Review",
          title: "6주차 핵심 어휘 & 환경 패턴 스피드 복습",
          description: "6주차 환경·도시 핵심 어휘 5개와 문장 연결 표현을 퀴즈로 복습해 보세요.",
          estimatedMinutes: 5,
          reviewVocab: [
            { word: "separate", meaning: "분리하다", day: "월요일 Listening" },
            { word: "massive", meaning: "엄청난, 대규모의", day: "화요일 Reading" },
            { word: "alternative", meaning: "대안", day: "화/수요일" },
            { word: "encourage", meaning: "장려하다", day: "화/수요일" },
            { word: "environment", meaning: "환경", day: "목요일 Speaking" }
          ],
          questions: [
            {
              id: "w6-fri-q1",
              type: "mcq",
              category: "어휘 뜻 매칭 (1/5)",
              prompt: "재활용을 위해 쓰레기를 종류별로 '분리하다'를 뜻하는 동사는?",
              options: ["separate", "charge", "harm", "escape"],
              answer: "separate",
              explanation: "월요일 Listening에서 'separate plastic, paper, and glass'로 배웠습니다.",
              translation: "separate = 분리하다"
            },
            {
              id: "w6-fri-q2",
              type: "mcq",
              category: "어휘 뜻 매칭 (2/5)",
              prompt: "다음 중 'massive'의 뜻으로 가장 알맞은 것은?",
              options: ["엄청난, 대규모의", "다회용의", "조용한", "불필요한"],
              answer: "엄청난, 대규모의",
              explanation: "화요일 Reading에서 'a massive amount of waste(엄청난 양의 쓰레기)'로 쓰였습니다.",
              translation: "massive = 엄청난, 대규모의"
            },
            {
              id: "w6-fri-q3",
              type: "mcq",
              category: "어휘 뜻 매칭 (3/5)",
              prompt: "빈칸에 알맞은 단어는? 'A cloth bag is a practical ______ to plastic bags.'",
              options: ["alternative", "discount", "litter", "noise"],
              answer: "alternative",
              explanation: "'alternative to ~(에 대한 대안)'는 IELTS Writing/Reading 핵심 표현입니다.",
              translation: "천 가방은 비닐봉지에 대한 실용적인 대안입니다."
            },
            {
              id: "w6-fri-q4",
              type: "short",
              category: "문장 패턴 빈칸 채우기 (4/5)",
              prompt: "빈칸에 알맞은 단어를 입력하세요. (힌트: 장려하다)",
              sentenceBefore: "Cafes",
              sentenceAfter: "customers to bring reusable tumblers.",
              placeholder: "단어 입력 (예: encourage)",
              answer: "encourage",
              acceptedAnswers: ["encourage"],
              explanation: "화요일 Reading과 수요일 Writing에서 배운 '장려하다(encourage)'입니다.",
              translation: "카페들은 손님들이 다회용 텀블러를 가져오도록 장려합니다."
            },
            {
              id: "w6-fri-q5",
              type: "mcq",
              category: "문장 패턴 복습 (5/5)",
              prompt: "목요일 Speaking에서 '환경을 보호하다'를 뜻하는 가장 자연스러운 표현은?",
              options: ["protect the environment", "break down plastic", "charge a fee", "avoid traffic"],
              answer: "protect the environment",
              explanation: "'protect the environment(환경을 보호하다)'는 환경 주제의 가장 기본적인 필수 연어입니다.",
              translation: "protect the environment = 환경을 보호하다"
            }
          ]
        }
      }
    }
  ],
  vocabularyDict: {
    adult: {
      word: "adult",
      pronunciationKo: "어덜트",
      ipa: "/əˈdʌlt/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "어른, 성인",
              en: "a fully grown person who is no longer a child",
              exampleEn: "Many working adults want to improve their English.",
              exampleKo: "많은 직장인 성인들이 영어를 향상시키고 싶어 합니다."
            },
            {
              level: "심화",
              ko: "(동식물의) 성체, 다 자란 개체",
              en: "a fully developed animal or plant",
              exampleEn: "An adult bird feeds its young several times a day.",
              exampleKo: "성체 새는 하루에 여러 번 새끼에게 먹이를 줍니다."
            }
          ]
        },
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "성인의, 어른을 위한",
              en: "for or relating to grown-up people",
              exampleEn: "Short daily practice is effective for adult learners.",
              exampleKo: "짧은 매일의 연습은 성인 학습자에게 효과적입니다."
            },
            {
              level: "심화",
              ko: "성숙한, 어른스러운",
              en: "behaving in a sensible and mature way",
              exampleEn: "They had an adult discussion about their career plans.",
              exampleKo: "그들은 진로 계획에 대해 성숙한 대화를 나누었습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "young adult", ko: "청년, 젊은 성인", example: "This program is popular with young adults." },
        { expr: "adult education", ko: "성인 교육, 평생 교육", example: "Adult education helps workers learn new skills." },
        { expr: "reach adulthood", ko: "성인이 되다 (IELTS Writing 빈출)", example: "When people reach adulthood, they manage their own time." }
      ]
    },
    register: {
      word: "register",
      pronunciationKo: "레지스터",
      ipa: "/ˈredʒ.ɪ.stər/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "등록하다, 신청하다",
              en: "to put your name on an official list to join a class or event",
              exampleEn: "I'd like to register for an evening English class.",
              exampleKo: "저녁 영어 수업에 등록하고 싶습니다."
            },
            {
              level: "심화",
              ko: "(공식적으로) 기록하다, 신고하다",
              en: "to record information officially",
              exampleEn: "All visitors must register at the front desk.",
              exampleKo: "모든 방문객은 안내 데스크에 등록해야 합니다."
            }
          ]
        },
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "명부, 출석부, 등록부",
              en: "an official list of names or records",
              exampleEn: "The teacher checked the class register.",
              exampleKo: "선생님이 수업 출석부를 확인했습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "register for + 명사", ko: "~에 등록(신청)하다", example: "You can register for the IELTS test online." },
        { expr: "register with + 기관", ko: "~에 회원/이용자 등록하다", example: "Please register with your local library." }
      ]
    },
    schedule: {
      word: "schedule",
      pronunciationKo: "스케줄",
      ipa: "/ˈskedʒ.uːl/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "일정, 시간표",
              en: "a plan of activities or events and when they will happen",
              exampleEn: "That class fits my daily schedule.",
              exampleKo: "그 수업은 제 하루 일정에 잘 맞습니다."
            },
            {
              level: "심화",
              ko: "예정, 계획표 (업무·교통)",
              en: "a planned timetable for work, flights, or trains",
              exampleEn: "The train arrived right on schedule.",
              exampleKo: "기차가 예정 시간표대로 정각에 도착했습니다."
            }
          ]
        },
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "심화",
              ko: "(특정 시간으로) 일정을 잡다, 예정하다",
              en: "to arrange for something to happen at a particular time",
              exampleEn: "The meeting is scheduled for Tuesday at 7 p.m.",
              exampleKo: "회의는 화요일 오후 7시로 예정되어 있습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "on schedule", ko: "예정대로, 정각에", example: "We finished the project on schedule." },
        { expr: "ahead of / behind schedule", ko: "예정보다 앞서 / 늦어져", example: "I have a tight schedule this week." },
        { expr: "fit into one's schedule", ko: "~의 일정에 맞추다", example: "I can fit ten minutes of study into my schedule." }
      ]
    },
    take: {
      word: "take",
      pronunciationKo: "테이크",
      ipa: "/teɪk/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "가져가다, 데려가다 / (시간이) 걸리다",
              en: "to carry or move something, or to require a certain amount of time",
              exampleEn: "It takes ten minutes to walk to the station.",
              exampleKo: "역까지 걸어가는 데 10분이 걸립니다."
            },
            {
              level: "기초",
              ko: "(수업·시험을) 듣다, 치르다 / (산책 등을) 하다",
              en: "to attend a course, do an exam, or perform an action like a walk",
              exampleEn: "I like to take a short walk after dinner.",
              exampleKo: "저는 저녁 식사 후에 짧게 산책하는 것을 좋아합니다."
            },
            {
              level: "심화",
              ko: "(조치·책임·기회를) 취하다, 받아들이다",
              en: "to accept or act upon an opportunity, responsibility, or measure",
              exampleEn: "Governments should take action to reduce pollution.",
              exampleKo: "정부는 오염을 줄이기 위한 조치를 취해야 합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "take a walk / break", ko: "산책하다 / 휴식을 취하다", example: "Let's take a short break." },
        { expr: "take part in", ko: "~에 참여하다 (IELTS 필수 숙어)", example: "Many adults take part in evening classes." },
        { expr: "take place", ko: "(행사·사건이) 열리다, 발생하다", example: "The class takes place in Room 204." },
        { expr: "take care of", ko: "~을 돌보다, 처리하다", example: "She takes care of her family after work." }
      ]
    },
    improve: {
      word: "improve",
      pronunciationKo: "임프루브",
      ipa: "/ɪmˈpruːv/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "더 좋아지다, 실력이 늘다",
              en: "to become better than before",
              exampleEn: "My listening skills improved quickly.",
              exampleKo: "제 듣기 실력이 빠르게 향상되었습니다."
            },
            {
              level: "심화",
              ko: "~을 향상시키다, 개선하다",
              en: "to make something better in quality or condition",
              exampleEn: "Many working adults want to improve their English.",
              exampleKo: "많은 직장인 성인들이 영어를 향상시키고 싶어 합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "improve one's skills", ko: "실력을 향상시키다", example: "Daily reading helps improve your skills." },
        { expr: "room for improvement", ko: "개선의 여지", example: "There is always room for improvement." }
      ]
    },
    concentrate: {
      word: "concentrate",
      pronunciationKo: "컨센트레이트",
      ipa: "/ˈkɒn.sən.treɪt/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "집중하다, 정신을 모으다",
              en: "to give all your attention to the thing you are doing",
              exampleEn: "It is much easier to concentrate for ten minutes.",
              exampleKo: "10분 동안 집중하는 것이 훨씬 더 쉽습니다."
            },
            {
              level: "심화",
              ko: "(자원을) 한곳에 집중시키다, 농축하다",
              en: "to bring people, efforts, or substances together in one place",
              exampleEn: "The company decided to concentrate on online education.",
              exampleKo: "그 회사는 온라인 교육에 집중하기로 결정했습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "concentrate on + 명사/동명사", ko: "~에 집중하다 (= focus on)", example: "I need to concentrate on studying for IELTS." }
      ]
    },
    convenient: {
      word: "convenient",
      pronunciationKo: "컨비니언트",
      ipa: "/kənˈviː.ni.ənt/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "편리한, 쓰기 편한",
              en: "easy to use or suited to your needs without causing trouble",
              exampleEn: "Online learning is very convenient for busy adults.",
              exampleKo: "온라인 학습은 바쁜 성인들에게 매우 편리합니다."
            },
            {
              level: "심화",
              ko: "(시간·장소가) 알맞은, 형편이 좋은",
              en: "useful, easy, or quick to do at a suitable time or place",
              exampleEn: "Would 7:30 p.m. be convenient for you?",
              exampleKo: "오후 7시 30분이 괜찮으신가요?"
            }
          ]
        }
      ],
      idioms: [
        { expr: "be convenient for ~", ko: "~에게 편리하다", example: "The library is convenient for local workers." },
        { expr: "at your earliest convenience", ko: "가능한 한 빠른 시일 내에 (비즈니스 격식)", example: "Please reply at your earliest convenience." }
      ]
    },
    focus: {
      word: "focus",
      pronunciationKo: "포커스",
      ipa: "/ˈfəʊ.kəs/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "집중하다",
              en: "to give full attention to something",
              exampleEn: "Studying in a quiet room helps me focus better.",
              exampleKo: "조용한 방에서 공부하는 것은 더 잘 집중하는 데 도움이 됩니다."
            }
          ]
        },
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "심화",
              ko: "초점, 중심, 핵심 관심사",
              en: "the main center of attention or interest",
              exampleEn: "The main focus of this course is daily conversation.",
              exampleKo: "이 강좌의 핵심 초점은 일상 회화입니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "focus on ~", ko: "~에 집중하다", example: "Let's focus on five new words today." },
        { expr: "stay focused", ko: "집중력을 유지하다", example: "Short sessions help you stay focused." }
      ]
    },
    relax: {
      word: "relax",
      pronunciationKo: "릴랙스",
      ipa: "/rɪˈlæks/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "쉬다, 휴식을 취하다",
              en: "to rest and become calm after work or stress",
              exampleEn: "I often relax on the sofa after work.",
              exampleKo: "저는 퇴근 후 소파에서 자주 휴식을 취합니다."
            },
            {
              level: "심화",
              ko: "(규칙·긴장을) 완화하다, 느슨하게 하다",
              en: "to make a rule or control less strict",
              exampleEn: "The school decided to relax its dress code.",
              exampleKo: "학교는 복장 규정을 완화하기로 결정했습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "relax at home", ko: "집에서 편히 쉬다", example: "I prefer to relax at home on weekends." },
        { expr: "feel relaxed", ko: "편안함을 느끼다", example: "Listening to music makes me feel relaxed." }
      ]
    },
    prefer: {
      word: "prefer",
      pronunciationKo: "프리퍼",
      ipa: "/prɪˈfɜːr/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "~을 더 좋아하다, 선호하다",
              en: "to like one thing or person better than another",
              exampleEn: "I definitely prefer spending my evenings at home.",
              exampleKo: "저는 확실히 저녁 시간을 집에서 보내는 것을 선호합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "prefer A to B", ko: "B보다 A를 더 선호하다", example: "Many adults prefer online study to classroom lessons." },
        { expr: "prefer to + 동사원형", ko: "~하는 것을 더 선호하다", example: "I prefer to study in the morning." }
      ]
    },
    effective: {
      word: "effective",
      pronunciationKo: "이펙티브",
      ipa: "/ɪˈfek.tɪv/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "효과적인, 효과가 있는",
              en: "producing the result that was wanted or intended",
              exampleEn: "Short, daily practice is often more effective.",
              exampleKo: "짧고 매일 하는 연습이 종종 더 효과적입니다."
            },
            {
              level: "심화",
              ko: "(법·규칙이) 발효되는, 시행되는",
              en: "starting to be used or applied officially",
              exampleEn: "The new library hours are effective from Monday.",
              exampleKo: "새로운 도서관 운영 시간은 월요일부터 적용됩니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "cost-effective", ko: "비용 대비 효과적인 (가성비 좋은)", example: "Online apps are a cost-effective way to learn." }
      ]
    },
    reduce: {
      word: "reduce",
      pronunciationKo: "리듀스",
      ipa: "/rɪˈdjuːs/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "줄이다, 낮추다",
              en: "to make something smaller in size, amount, or degree",
              exampleEn: "Short lessons also reduce stress.",
              exampleKo: "짧은 수업은 또한 스트레스를 줄여줍니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "reduce stress", ko: "스트레스를 줄이다", example: "Walking helps reduce daily stress." },
        { expr: "reduce the cost / time", ko: "비용/시간을 줄이다", example: "Studying at home reduces travel time." }
      ]
    },
    habit: {
      word: "habit",
      pronunciationKo: "해빗",
      ipa: "/ˈhæb.ɪt/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "습관, 버릇",
              en: "something that you do often and regularly, sometimes without thinking",
              exampleEn: "Reading one paragraph can build a strong habit.",
              exampleKo: "한 단락을 읽는 것이 탄탄한 습관을 만들어 줄 수 있습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "build / form a habit", ko: "습관을 들이다, 형성하다", example: "Try to build a daily study habit." },
        { expr: "out of habit", ko: "습관적으로", example: "I check my phone out of habit." }
      ]
    },
    study: {
      word: "study",
      pronunciationKo: "스터디",
      ipa: "/ˈstʌd.i/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "공부하다, 학습하다",
              en: "to spend time learning about a subject",
              exampleEn: "When you study for just ten minutes a day, it is easier.",
              exampleKo: "하루에 단 10분만 공부할 때 더 쉽습니다."
            }
          ]
        },
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "공부, 학습",
              en: "the activity of learning or reading",
              exampleEn: "Why short daily study works for busy adults.",
              exampleKo: "왜 짧은 매일의 공부가 바쁜 성인에게 효과가 있을까."
            },
            {
              level: "심화",
              ko: "(학술) 연구, 조사",
              en: "a detailed scientific or academic investigation",
              exampleEn: "Recent education studies show positive results.",
              exampleKo: "최근 교육 연구들은 긍정적인 결과를 보여줍니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "case study", ko: "사례 연구", example: "The report includes a case study on adult learners." }
      ]
    },
    work: {
      word: "work",
      pronunciationKo: "워크",
      ipa: "/wɜːrk/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "일하다, 근무하다",
              en: "to do a job to earn money",
              exampleEn: "I work nearby and want to join an evening class.",
              exampleKo: "저는 근처에서 일하며 저녁 수업에 참여하고 싶습니다."
            },
            {
              level: "심화",
              ko: "효과가 있다, 작동하다",
              en: "to operate successfully or produce the expected effect",
              exampleEn: "Why short daily study works for busy adults.",
              exampleKo: "짧은 매일의 학습이 왜 바쁜 성인들에게 효과가 있는지."
            }
          ]
        },
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "일, 직장, 업무",
              en: "a job or place of employment",
              exampleEn: "What do you usually do after work?",
              exampleKo: "퇴근 후에 보통 무엇을 하나요?"
            }
          ]
        }
      ],
      idioms: [
        { expr: "after work", ko: "퇴근 후에", example: "I usually relax after work." },
        { expr: "work out", ko: "운동하다 / 잘 풀리다", example: "I work out twice a week." }
      ]
    },
    free: {
      word: "free",
      pronunciationKo: "프리",
      ipa: "/friː/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "무료의, 공짜의",
              en: "costing no money",
              exampleEn: "The class is completely free for local workers.",
              exampleKo: "지역 직장인에게는 수업이 완전히 무료입니다."
            },
            {
              level: "기초",
              ko: "한가한, 시간이 비어 있는",
              en: "not busy or not having any planned activities",
              exampleEn: "Are you free this Tuesday evening?",
              exampleKo: "이번 주 화요일 저녁에 시간 되시나요?"
            },
            {
              level: "심화",
              ko: "자유로운, ~이 없는",
              en: "able to act as you want, or without something unpleasant",
              exampleEn: "Short lessons offer a stress-free way to learn.",
              exampleKo: "짧은 수업은 스트레스 없는 학습 방법을 제공합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "free time", ko: "여가 시간, 자유 시간", example: "In my free time, I enjoy reading." },
        { expr: "for free", ko: "무료로", example: "Members can borrow books for free." }
      ]
    },
    beginner: {
      word: "beginner",
      pronunciationKo: "비기너",
      ipa: "/bɪˈɡɪn.ər/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "초보자, 입문자",
              en: "a person who has just started learning something",
              exampleEn: "We have a beginner conversation class every Tuesday.",
              exampleKo: "매주 화요일에 초급 회화 수업이 있습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "complete beginner", ko: "완전 초보", example: "This guide is designed for complete beginners." }
      ]
    },
    conversation: {
      word: "conversation",
      pronunciationKo: "컨버세이션",
      ipa: "/ˌkɒn.vəˈseɪ.ʃən/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "대화, 회화",
              en: "an informal talk between two or more people",
              exampleEn: "She joined a beginner conversation class.",
              exampleKo: "그녀는 초급 회화 수업에 참여했습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "have a conversation", ko: "대화를 나누다", example: "We had a nice conversation about travel." }
      ]
    },
    nearby: {
      word: "nearby",
      pronunciationKo: "니어바이",
      ipa: "/ˌnɪəˈbaɪ/",
      posGroups: [
        {
          pos: "부사(adv.) / 형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "근처에, 인근의",
              en: "not far away in distance",
              exampleEn: "I work nearby and want to register for a class.",
              exampleKo: "근처에서 일해서 수업에 등록하고 싶습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "live / work nearby", ko: "근처에 살다 / 일하다", example: "A coffee shop nearby stays open late." }
      ]
    },
    library: {
      word: "library",
      pronunciationKo: "라이브러리",
      ipa: "/ˈlaɪ.brər.i/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "도서관",
              en: "a building where books, newspapers, and media are kept for people to read or borrow",
              exampleEn: "Welcome to the Central City Library.",
              exampleKo: "센트럴 시티 도서관에 오신 것을 환영합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "library pass / card", ko: "도서관 출입증 / 회원증", example: "Bring your ID card to get a library pass." }
      ]
    },
    completely: {
      word: "completely",
      pronunciationKo: "컴플리틀리",
      ipa: "/kəmˈpliːt.li/",
      posGroups: [
        {
          pos: "부사(adv.)",
          senses: [
            {
              level: "기초",
              ko: "완전히, 전적으로",
              en: "in every way or as much as possible",
              exampleEn: "The class is completely free for local workers.",
              exampleKo: "지역 직장인에게는 수업이 완전히 무료입니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "completely agree", ko: "전적으로 동의하다", example: "I completely agree with this opinion." }
      ]
    },
    local: {
      word: "local",
      pronunciationKo: "로컬",
      ipa: "/ˈləʊ.kəl/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "지역의, 동네의, 현지의",
              en: "relating to the particular area where you live or work",
              exampleEn: "The class is free for local workers.",
              exampleKo: "이 수업은 지역 직장인들에게 무료입니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "local community", ko: "지역 사회", example: "The center serves the local community." }
      ]
    },
    worker: {
      word: "worker",
      pronunciationKo: "워커",
      ipa: "/ˈwɜːr.kər/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "직장인, 근로자, 일하는 사람",
              en: "a person who works in a particular job or industry",
              exampleEn: "Many local workers attend evening courses.",
              exampleKo: "많은 지역 직장인들이 저녁 강좌에 다닙니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "office worker", ko: "사무직 직장인", example: "Most office workers commute by subway." }
      ]
    },
    often: {
      word: "often",
      pronunciationKo: "오픈",
      ipa: "/ˈɒf.ən/",
      posGroups: [
        {
          pos: "부사(adv.)",
          senses: [
            {
              level: "기초",
              ko: "자주, 종종",
              en: "many times or on many occasions",
              exampleEn: "They often feel too tired after work.",
              exampleKo: "그들은 퇴근 후 종종 너무 피곤함을 느낍니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "more often than not", ko: "대개, 십중팔구", example: "More often than not, short sessions work best." }
      ]
    },
    tired: {
      word: "tired",
      pronunciationKo: "타이어드",
      ipa: "/ˈtaɪərd/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "피곤한, 지친",
              en: "feeling that you need to rest or sleep",
              exampleEn: "I feel quite tired in the evening.",
              exampleKo: "저녁에는 꽤 피곤함을 느낍니다."
            },
            {
              level: "심화",
              ko: "~에 싫증난, 지겨운",
              en: "bored or annoyed with something that has continued too long",
              exampleEn: "I am tired of waiting for the bus.",
              exampleKo: "버스를 기다리는 데 지쳤습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "be tired of ~", ko: "~에 지치다/싫증나다", example: "Many people are tired of long commutes." }
      ]
    },
    office: {
      word: "office",
      pronunciationKo: "오피스",
      ipa: "/ˈɒf.ɪs/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "사무실, 직장",
              en: "a room or building where people work at desks",
              exampleEn: "They feel tired after a long day at the office.",
              exampleKo: "사무실에서 긴 하루를 보낸 후 피곤함을 느낍니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "at the office", ko: "사무실에서, 직장에서", example: "She stays at the office until 6 p.m." }
      ]
    },
    recent: {
      word: "recent",
      pronunciationKo: "리슨트",
      ipa: "/ˈriː.sənt/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "최근의, 얼마 전의",
              en: "having happened or started only a short time ago",
              exampleEn: "Recent education studies show good results.",
              exampleKo: "최근 교육 연구들은 좋은 결과를 보여줍니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "in recent years", ko: "최근 몇 년 동안 (IELTS 에세이 필수)", example: "In recent years, online learning has grown fast." }
      ]
    },
    remember: {
      word: "remember",
      pronunciationKo: "리멤버",
      ipa: "/rɪˈmem.bər/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "기억하다, 잊지 않다",
              en: "to keep a piece of information in your mind",
              exampleEn: "It is easier to remember new words.",
              exampleKo: "새로운 단어를 기억하는 것이 더 쉽습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "remember to + 동사", ko: "(앞으로) ~할 것을 기억하다", example: "Remember to bring your ID card." }
      ]
    },
    stress: {
      word: "stress",
      pronunciationKo: "스트레스",
      ipa: "/stres/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "스트레스, 정신적 압박감",
              en: "pressure or worry caused by problems in life or work",
              exampleEn: "Short lessons also reduce stress.",
              exampleKo: "짧은 수업은 또한 스트레스를 줄여줍니다."
            }
          ]
        },
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "심화",
              ko: "강조하다, 역설하다",
              en: "to give special importance to something",
              exampleEn: "Teachers often stress the value of daily practice.",
              exampleKo: "교사들은 매일 연습하는 것의 가치를 자주 강조합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "under stress", ko: "스트레스를 받고 있는", example: "Many workers are under stress." }
      ]
    },
    paragraph: {
      word: "paragraph",
      pronunciationKo: "패러그래프",
      ipa: "/ˈpær.ə.ɡrɑːf/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "단락, 문단",
              en: "a distinct section of a piece of writing, starting on a new line",
              exampleEn: "Try reading one paragraph during lunch.",
              exampleKo: "점심시간에 한 단락을 읽어 보세요."
            }
          ]
        }
      ],
      idioms: [
        { expr: "opening paragraph", ko: "첫 문단, 서론 단락", example: "The opening paragraph introduces the main topic." }
      ]
    },
    opinion: {
      word: "opinion",
      pronunciationKo: "오피니언",
      ipa: "/əˈpɪn.jən/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "의견, 생각, 견해",
              en: "your feelings or beliefs about someone or something",
              exampleEn: "In my opinion, online learning is a great choice.",
              exampleKo: "제 생각에는 온라인 학습이 훌륭한 선택입니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "in my opinion", ko: "내 생각에는, 내 의견으로는", example: "In my opinion, daily practice works best." }
      ]
    },
    choice: {
      word: "choice",
      pronunciationKo: "초이스",
      ipa: "/tʃɔɪs/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "선택, 선택권",
              en: "an act of choosing between two or more possibilities",
              exampleEn: "Online learning is a good choice for busy adults.",
              exampleKo: "온라인 학습은 바쁜 성인들에게 좋은 선택입니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "make a choice", ko: "선택을 하다", example: "Students have to make a choice." },
        { expr: "have no choice but to", ko: "~할 수밖에 없다", example: "Workers have no choice but to study at night." }
      ]
    },
    neighborhood: {
      word: "neighborhood",
      pronunciationKo: "네이버후드",
      ipa: "/ˈneɪ.bər.hʊd/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "동네, 이웃 지역",
              en: "a particular area of a town or city where people live",
              exampleEn: "I like to take a short walk in my neighborhood.",
              exampleKo: "저는 동네에서 짧게 산책하는 것을 좋아합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "in the neighborhood", ko: "근처에, 우리 동네에", example: "There is a quiet park in the neighborhood." }
      ]
    },
    comfortable: {
      word: "comfortable",
      pronunciationKo: "컴퍼터블",
      ipa: "/ˈkʌm.fər.tə.bəl/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "편안한, 쾌적한",
              en: "making you feel physically relaxed without pain or discomfort",
              exampleEn: "I just want a quiet, comfortable space.",
              exampleKo: "저는 그저 조용하고 편안한 공간을 원합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "feel comfortable with", ko: "~에 편안함을 느끼다, 익숙하다", example: "I feel comfortable speaking English with friends." }
      ]
    },
    definitely: {
      word: "definitely",
      pronunciationKo: "데피니틀리",
      ipa: "/ˈdef.ɪ.nət.li/",
      posGroups: [
        {
          pos: "부사(adv.)",
          senses: [
            {
              level: "기초",
              ko: "확실히, 분명히, 틀림없이",
              en: "without any doubt; certainly",
              exampleEn: "I definitely prefer spending my evenings at home.",
              exampleKo: "저는 확실히 저녁 시간을 집에서 보내는 것을 선호합니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "definitely worth + ~ing", ko: "분명히 ~할 가치가 있는", example: "This app is definitely worth trying." }
      ]
    },
    enough: {
      word: "enough",
      pronunciationKo: "이너프",
      ipa: "/ɪˈnʌf/",
      posGroups: [
        {
          pos: "형용사(adj.) / 부사(adv.)",
          senses: [
            {
              level: "기초",
              ko: "충분한 / 충분히",
              en: "as much or as many as necessary",
              exampleEn: "Staying at home helps me get enough sleep.",
              exampleKo: "집에 있는 것은 충분한 수면을 취하는 데 도움이 됩니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "fair enough", ko: "그렇군, 일리가 있네", example: "Fair enough, let's try your plan." }
      ]
    },
    usually: {
      word: "usually",
      pronunciationKo: "유주얼리",
      ipa: "/ˈjuː.ʒu.ə.li/",
      posGroups: [
        {
          pos: "부사(adv.)",
          senses: [
            {
              level: "기초",
              ko: "보통, 대개, 평소에는",
              en: "in the way that most often happens",
              exampleEn: "What do you usually do after work?",
              exampleKo: "퇴근 후에는 보통 무엇을 하나요?"
            }
          ]
        }
      ],
      idioms: [
        { expr: "as usual", ko: "평소처럼, 늘 그렇듯이", example: "I went straight home as usual." }
      ]
    },
    evening: {
      word: "evening",
      pronunciationKo: "이브닝",
      ipa: "/ˈiːv.nɪŋ/",
      posGroups: [
        {
          pos: "명사(n.)",
          senses: [
            {
              level: "기초",
              ko: "저녁, 해 질 녘부터 밤까지",
              en: "the part of the day between the end of the afternoon and night",
              exampleEn: "I feel quite tired in the evening.",
              exampleKo: "저녁에는 꽤 피곤함을 느낍니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "in the evening", ko: "저녁에", example: "I study English in the evening." }
      ]
    },
    quiet: {
      word: "quiet",
      pronunciationKo: "콰이어트",
      ipa: "/ˈkwaɪ.ət/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "조용한, 한적한",
              en: "making very little noise",
              exampleEn: "Studying in a quiet room helps me focus.",
              exampleKo: "조용한 방에서 공부하는 것이 집중에 도움이 됩니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "keep quiet", ko: "조용히 하다", example: "Please keep quiet in the library." }
      ]
    },
    simple: {
      word: "simple",
      pronunciationKo: "심플",
      ipa: "/ˈsɪm.pəl/",
      posGroups: [
        {
          pos: "형용사(adj.)",
          senses: [
            {
              level: "기초",
              ko: "간단한, 쉬운, 소박한",
              en: "easy to understand or do; not complicated",
              exampleEn: "I usually go home and have a simple dinner.",
              exampleKo: "보통 집에 가서 간단한 저녁을 먹습니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "plain and simple", ko: "명백한, 단순 명료한", example: "It is a good habit, plain and simple." }
      ]
    },
    save: {
      word: "save",
      pronunciationKo: "세이브",
      ipa: "/seɪv/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "(돈·시간을) 아끼다, 절약하다 / 저장하다",
              en: "to keep money or time for the future instead of wasting it",
              exampleEn: "Staying at home also helps me save money.",
              exampleKo: "집에 있는 것은 또한 돈을 아끼는 데 도움이 됩니다."
            },
            {
              level: "심화",
              ko: "(위험에서) 구하다, 구출하다",
              en: "to rescue someone or something from danger or harm",
              exampleEn: "Recycling helps save the environment.",
              exampleKo: "재활용은 환경을 보호하는(구하는) 데 도움이 됩니다."
            }
          ]
        }
      ],
      idioms: [
        { expr: "save time / money", ko: "시간 / 돈을 아끼다", example: "Online classes save travel time." },
        { expr: "save up (for)", ko: "(~을 위해) 돈을 모으다", example: "I am saving up for a trip." }
      ]
    },
    spend: {
      word: "spend",
      pronunciationKo: "스펜드",
      ipa: "/spend/",
      posGroups: [
        {
          pos: "동사(v.)",
          senses: [
            {
              level: "기초",
              ko: "(시간을) 보내다 / (돈을) 쓰다",
              en: "to use time doing something or pay money for something",
              exampleEn: "Do you prefer spending your evenings at home?",
              exampleKo: "저녁 시간을 집에서 보내는 것을 선호하나요?"
            }
          ]
        }
      ],
      idioms: [
        { expr: "spend time + ~ing", ko: "~하는 데 시간을 보내다", example: "I spend ten minutes reading every day." }
      ]
    }
  }
};

/**
 * 주차별 순차적 난이도 메타데이터 반환
 */
curriculumData.getDifficultyMeta = function (weekNumber) {
  if (weekNumber <= 2) {
    return { tier: 1, label: "Level 1 · Band 4.5 기초", desc: "기초 필수 어휘 및 단문 구조" };
  }
  if (weekNumber <= 4) {
    return { tier: 2, label: "Level 2 · Band 4.5–5.0 도약", desc: "비교 표현 및 일상 복문 구조" };
  }
  if (weekNumber <= 6) {
    return { tier: 3, label: "Level 3 · Band 5.0–5.5 중급", desc: "비즈니스·사회 어휘 및 양보/인과절" };
  }
  if (weekNumber <= 10) {
    return { tier: 4, label: "Level 4 · Band 5.5–6.0 심화", desc: "학술 동의어 및 논리적 에세이 구조" };
  }
  return {
    tier: 5,
    label: `Level ${Math.min(10, 4 + Math.floor((weekNumber - 7) / 4))} · Band 6.0+ 마스터`,
    desc: "고급 연어 및 심층 분석 훈련"
  };
};

/**
 * 무제한 연속 학습 커리큘럼 생성기 (Week 1~6 정적 데이터 + Week 7+ 동적 확장)
 */
curriculumData.getWeek = function (weekNumber) {
  const existing = this.weeks.find((w) => w.weekNumber === weekNumber);
  if (existing) {
    return {
      ...existing,
      difficultyMeta: this.getDifficultyMeta(weekNumber)
    };
  }

  const meta = this.getDifficultyMeta(weekNumber);
  const themes = [
    {
      topicKo: "평생 교육과 온라인 학습",
      listeningTitle: "대학교 평생교육원 강좌 상담",
      listeningDialogue: [
        { speaker: "Advisor", voicePitch: 1.1, text: "Good afternoon, Lifelong Learning Center. How can I assist you?", ko: "안녕하세요, 평생교육원입니다. 무엇을 도와드릴까요?" },
        { speaker: "Learner", voicePitch: 0.95, text: "Hello, I want to enroll in the academic writing course starting next month.", ko: "안녕하세요, 다음 달에 시작하는 아카데믹 라이팅 강좌에 등록하고 싶습니다." },
        { speaker: "Advisor", voicePitch: 1.1, text: "Certainly. That course runs for eight weeks and costs 120 dollars, including online feedback.", ko: "물론입니다. 해당 강좌는 8주 과정이며 온라인 피드백을 포함해 120달러입니다." },
        { speaker: "Learner", voicePitch: 0.95, text: "Are the lectures recorded in case I have to work late?", ko: "야근을 해야 할 경우를 대비해 강의가 녹화되나요?" },
        { speaker: "Advisor", voicePitch: 1.1, text: "Yes, every session is uploaded within two hours, so you can review anytime.", ko: "네, 모든 수업은 2시간 이내에 업로드되므로 언제든 복습하실 수 있습니다." }
      ],
      lQ1: { before: "That course runs for", after: "weeks.", opts: ["four", "six", "eight", "ten"], ans: "eight", exp: "상담원이 8주 과정(eight weeks)이라고 안내했습니다.", ko: "해당 강좌는 8주 동안 진행됩니다." },
      lQ2: { before: "The total fee is", after: "dollars, including online feedback.", opts: ["100", "110", "120", "150"], ans: "120", exp: "수강료는 온라인 피드백 포함 120달러입니다.", ko: "온라인 피드백을 포함해 총 비용은 120달러입니다." },
      lQ3: { before: "Every session is uploaded within two", after: ".", ans: "hours", acc: ["hours", "hour"], exp: "수업 종료 후 2시간(two hours) 이내에 녹화본이 업로드됩니다.", ko: "모든 수업은 2시간 이내에 업로드됩니다." },
      readingTitle: "Why Lifelong Learning Matters in a Changing Economy",
      readingSentences: [
        { en: "As technology develops rapidly, many job skills become outdated within just a few years.", ko: "기술이 빠르게 발전함에 따라 많은 직무 기술이 불과 몇 년 만에 구식이 됩니다." },
        { en: "Consequently, continuous learning is no longer optional for adults who wish to advance their careers.", ko: "그 결과, 경력을 발전시키고자 하는 성인들에게 지속적인 학습은 더 이상 선택 사항이 아닙니다." },
        { en: "Flexible online platforms enable workers to acquire new qualifications without leaving their jobs.", ko: "유연한 온라인 플랫폼은 직장인들이 직장을 그만두지 않고도 새로운 자격을 취득할 수 있게 해줍니다." },
        { en: "Furthermore, regular mental stimulation keeps the brain active and improves long-term problem-solving ability.", ko: "게다가 규칙적인 두뇌 자극은 뇌를 활발하게 유지하고 장기적인 문제 해결 능력을 향상시킵니다." }
      ],
      rQ1: { stmt: "Once you finish university, your job skills never become outdated.", ans: "FALSE", exp: "첫 문장에서 많은 직무 기술이 몇 년 만에 구식이 된다(become outdated)고 했으므로 FALSE입니다.", ko: "대학을 졸업하면 직무 기술은 절대 구식이 되지 않는다." },
      rQ2: { stmt: "Online courses are more expensive than evening university degrees.", ans: "NOT GIVEN", exp: "온라인 강좌와 야간 대학 학위의 가격 비교는 지문에 언급되지 않았습니다.", ko: "온라인 강좌는 야간 대학 학위보다 더 비싸다." },
      rQ3: { stmt: "Choose the word that means 'to gain or learn a skill or qualification'.", opts: ["develop", "acquire", "leave", "keep"], ans: "acquire", exp: "3번째 문장의 'acquire new qualifications(새 자격을 취득하다)'에서 acquire가 '습득하다/취득하다'입니다.", ko: "'기술이나 자격을 얻다, 습득하다'라는 뜻의 단어를 고르세요." },
      writingPrompt: "Some people believe adults should continue learning new skills throughout their lives. To what extent do you agree?",
      writingPromptKo: "일부 사람들은 성인이 평생 동안 새로운 기술을 계속 배워야 한다고 믿습니다. 어느 정도 동의하나요?",
      reqWords: [
        { word: "essential", meaning: "필수적인" },
        { word: "acquire", meaning: "습득하다" },
        { word: "career", meaning: "경력" }
      ],
      modelAnswer: "I strongly agree that lifelong learning is essential for modern adults. Because industries change quickly, workers must acquire new skills to protect and grow their career. In addition, studying regularly keeps our minds sharp and confident.",
      modelAnswerKo: "저는 평생 학습이 현대 성인에게 필수적이라는 데 깊이 동의합니다. 산업이 빠르게 변하기 때문에 직장인들은 경력을 지키고 성장시키기 위해 새로운 기술을 습득해야 합니다. 게다가 규칙적으로 공부하는 것은 정신을 명석하고 자신감 있게 유지해 줍니다.",
      speakingQ1: "Do you enjoy learning new skills outside of work?",
      speakingQ1Ko: "직장 밖에서 새로운 기술을 배우는 것을 즐기시나요?",
      speakingA1: "Yes, I really enjoy learning practical skills such as English and digital tools. Even though my weekdays are busy, spending ten minutes a day helps me make steady progress.",
      speakingA1Ko: "네, 영어와 디지털 도구 같은 실용적인 기술을 배우는 것을 정말 즐깁니다. 평일이 바쁘지만 하루 10분씩 투자하면 꾸준한 발전을 이룰 수 있습니다.",
      speakingQ2: "Is it easier for adults to learn online or in a classroom?",
      speakingQ2Ko: "성인이 온라인으로 배우는 것과 교실에서 배우는 것 중 어느 쪽이 더 쉽다고 생각하나요?",
      speakingA2: "For working adults, learning online is usually much easier because there is no commute. You can review recorded lessons whenever your schedule allows.",
      speakingA2Ko: "직장인 성인에게는 출퇴근 이동이 없기 때문에 보통 온라인 학습이 훨씬 쉽습니다. 일정이 허락할 때마다 녹화된 수업을 복습할 수 있습니다.",
      vocab5: [
        { word: "enroll", meaning: "등록하다", day: "월요일" },
        { word: "acquire", meaning: "습득하다", day: "화/수요일" },
        { word: "essential", meaning: "필수적인", day: "수요일" },
        { word: "outdated", meaning: "구식의", day: "화요일" },
        { word: "steady", meaning: "꾸준한", day: "목요일" }
      ]
    },
    {
      topicKo: "글로벌 관광과 지역 문화 보존",
      listeningTitle: "시립 박물관 가이드 투어 예약",
      listeningDialogue: [
        { speaker: "Guide", voicePitch: 1.1, text: "Welcome to the Heritage Museum booking desk. How may I help you?", ko: "문화유산 박물관 예약 데스크에 오신 것을 환영합니다. 무엇을 도와드릴까요?" },
        { speaker: "Visitor", voicePitch: 0.95, text: "I'd like to book two tickets for the afternoon cultural tour.", ko: "오후 문화 투어 티켓 두 장을 예약하고 싶습니다." },
        { speaker: "Guide", voicePitch: 1.1, text: "Sure. The English tour starts at 2:30 p.m. and lasts ninety minutes.", ko: "네. 영어 투어는 오후 2시 30분에 시작해서 90분 동안 진행됩니다." },
        { speaker: "Visitor", voicePitch: 0.95, text: "Are photographs allowed inside the traditional gallery?", ko: "전통 전시관 안에서 사진 촬영이 허용되나요?" },
        { speaker: "Guide", voicePitch: 1.1, text: "Yes, you can take photos without flash to protect the ancient paintings.", ko: "네, 고대 회화를 보호하기 위해 플래시 없이 촬영하실 수 있습니다." }
      ],
      lQ1: { before: "The English tour starts at", after: "p.m.", opts: ["1:30", "2:00", "2:30", "3:30"], ans: "2:30", exp: "가이드가 오후 2시 30분(2:30 p.m.)에 시작한다고 안내했습니다.", ko: "영어 투어는 오후 2시 30분에 시작합니다." },
      lQ2: { before: "The tour lasts", after: "minutes.", opts: ["60", "75", "90", "120"], ans: "90", exp: "투어 소요 시간은 90분(ninety minutes)입니다.", ko: "투어는 90분 동안 진행됩니다." },
      lQ3: { before: "You can take photos without", after: "to protect the paintings.", ans: "flash", acc: ["flash"], exp: "플래시(flash) 없이 촬영이 가능합니다.", ko: "그림을 보호하기 위해 플래시 없이 사진을 찍을 수 있습니다." },
      readingTitle: "Balancing Tourism Growth and Local Heritage",
      readingSentences: [
        { en: "International tourism brings vital income to historic towns and supports local small businesses.", ko: "국제 관광은 역사적인 도시에 중요한 수입을 가져다주고 지역 소상공인을 지원합니다." },
        { en: "Visitors also gain a deeper appreciation of traditional architecture, cuisine, and local customs.", ko: "방문객들은 또한 전통 건축, 음식, 지역 관습에 대한 더 깊은 이해를 얻게 됩니다." },
        { en: "However, overcrowding during peak seasons can damage fragile monuments and raise housing prices.", ko: "하지만 성수기 동안의 과밀 현상은 손상되기 쉬운 유적지를 훼손하고 주거비를 올릴 수 있습니다." },
        { en: "To preserve their culture, many destinations now limit daily visitor numbers and promote off-season travel.", ko: "문화를 보존하기 위해 많은 여행지들은 이제 일일 방문객 수를 제한하고 비수기 여행을 장려합니다." }
      ],
      rQ1: { stmt: "Tourism always lowers housing prices in historic towns.", ans: "FALSE", exp: "3번째 문장에서 과밀 현상이 주거비를 올릴 수 있다(raise housing prices)고 했으므로 FALSE입니다.", ko: "관광은 항상 역사 도시의 주거비를 낮춘다." },
      rQ2: { stmt: "Tourists spend more money on souvenirs than on hotel rooms.", ans: "NOT GIVEN", exp: "기념품과 호텔 지출 비교는 지문에 나오지 않았습니다.", ko: "관광객들은 호텔 객실보다 기념품에 더 많은 돈을 쓴다." },
      rQ3: { stmt: "Choose the word that means 'to keep something safe from harm or change'.", opts: ["support", "damage", "preserve", "raise"], ans: "preserve", exp: "4번째 문장의 'preserve their culture(문화를 보존하다)'에서 preserve가 '보존하다'입니다.", ko: "'해나 변화로부터 안전하게 지키다(보존하다)'라는 뜻의 단어를 고르세요." },
      writingPrompt: "International tourism has both positive and negative effects on local communities. Discuss one benefit and one drawback.",
      writingPromptKo: "국제 관광은 지역 사회에 긍정적 영향과 부정적 영향을 모두 줍니다. 장점과 단점을 한 가지씩 서술해 보세요.",
      reqWords: [
        { word: "income", meaning: "수입" },
        { word: "preserve", meaning: "보존하다" },
        { word: "however", meaning: "하지만" }
      ],
      modelAnswer: "Tourism creates valuable income for local shops and restaurants in historic areas. However, too many visitors can cause overcrowding and litter. Therefore, cities must preserve their heritage by managing tourist numbers carefully.",
      modelAnswerKo: "관광은 역사 지역의 지역 상점과 식당에 귀중한 수입을 창출합니다. 하지만 너무 많은 방문객은 과밀과 쓰레기 문제를 일으킬 수 있습니다. 따라서 도시들은 관광객 수를 신중히 관리하여 유산을 보존해야 합니다.",
      speakingQ1: "Do you like visiting museums or historic places when you travel?",
      speakingQ1Ko: "여행할 때 박물관이나 역사적인 장소를 방문하는 것을 좋아하나요?",
      speakingA1: "Yes, I always visit at least one local museum when I travel to a new city. It helps me understand the history and traditions of the people who live there.",
      speakingA1Ko: "네, 새로운 도시를 여행할 때 항상 최소 한 곳의 지역 박물관을 방문합니다. 그곳에 사는 사람들의 역사와 전통을 이해하는 데 도움이 됩니다.",
      speakingQ2: "What kind of places are popular with tourists in your country?",
      speakingQ2Ko: "당신의 나라에서는 어떤 장소들이 관광객들에게 인기가 많나요?",
      speakingA2: "Traditional palaces and modern shopping districts are both very popular. Many visitors enjoy wearing traditional clothes while taking photos in historic neighborhoods.",
      speakingA2Ko: "전통 궁궐과 현대적인 쇼핑 지구 모두 매우 인기가 많습니다. 많은 방문객들이 역사적인 동네에서 사진을 찍으며 전통 의상을 입는 것을 즐깁니다.",
      vocab5: [
        { word: "heritage", meaning: "문화유산", day: "월/수요일" },
        { word: "preserve", meaning: "보존하다", day: "화/수요일" },
        { word: "income", meaning: "수입", day: "화/수요일" },
        { word: "fragile", meaning: "손상되기 쉬운", day: "화요일" },
        { word: "custom", meaning: "관습, 풍습", day: "화요일" }
      ]
    },
    {
      topicKo: "인공지능과 미래의 업무 방식",
      listeningTitle: "스마트 오피스 소프트웨어 교육 문의",
      listeningDialogue: [
        { speaker: "Trainer", voicePitch: 1.1, text: "Hello, IT Support Desk. Are you calling about the new automation tool?", ko: "안녕하세요, IT 지원 데스크입니다. 새로운 자동화 도구 때문에 전화하셨나요?" },
        { speaker: "Staff", voicePitch: 0.9, text: "Yes, I'd like to know how it helps with our weekly data reports.", ko: "네, 주간 데이터 보고서 작성에 어떻게 도움이 되는지 알고 싶습니다." },
        { speaker: "Trainer", voicePitch: 1.1, text: "It summarizes long spreadsheets in thirty seconds and reduces manual errors.", ko: "긴 스프레드시트를 30초 만에 요약해 주고 수작업 오류를 줄여줍니다." },
        { speaker: "Staff", voicePitch: 0.9, text: "That sounds efficient. Is there a user guide available?", ko: "효율적이네요. 사용자 안내서가 있나요?" },
        { speaker: "Trainer", voicePitch: 1.1, text: "Yes, you can download the PDF manual from the company portal using your employee ID.", ko: "네, 사번을 이용해 회사 포털에서 PDF 매뉴얼을 다운로드하실 수 있습니다." }
      ],
      lQ1: { before: "It summarizes long spreadsheets in", after: "seconds.", opts: ["10", "20", "30", "60"], ans: "30", exp: "30초(thirty seconds) 만에 요약해 준다고 안내했습니다.", ko: "긴 스프레드시트를 30초 만에 요약합니다." },
      lQ2: { before: "You can download the", after: "manual from the company portal.", opts: ["video", "PDF", "audio", "paper"], ans: "PDF", exp: "PDF 매뉴얼을 다운로드할 수 있습니다.", ko: "회사 포털에서 PDF 매뉴얼을 다운로드할 수 있습니다." },
      lQ3: { before: "Log in using your employee", after: ".", ans: "ID", acc: ["id"], exp: "사번(employee ID)을 사용해 로그인합니다.", ko: "사번(employee ID)을 사용해 로그인하세요." },
      readingTitle: "How Automation Is Reshaping Workplace Tasks",
      readingSentences: [
        { en: "Modern software and artificial intelligence are transforming how routine office tasks are completed.", ko: "현대 소프트웨어와 인공지능은 반복적인 사무 업무가 처리되는 방식을 변화시키고 있습니다." },
        { en: "Automated systems can process large amounts of data far more accurately than human workers.", ko: "자동화 시스템은 인간 작업자보다 훨씬 더 정확하게 대량의 데이터를 처리할 수 있습니다." },
        { en: "While some people worry about job losses, experts point out that technology also creates new roles.", ko: "일부 사람들은 일자리 감소를 걱정하지만, 전문가들은 기술이 새로운 역할도 만들어 낸다고 지적합니다." },
        { en: "Employees who develop creative thinking and interpersonal skills will remain in high demand.", ko: "창의적 사고와 대인 관계 기술을 기르는 직원들은 계속해서 높은 수요를 유지할 것입니다." }
      ],
      rQ1: { stmt: "Humans always process large amounts of data more accurately than automated systems.", ans: "FALSE", exp: "2번째 문장에서 자동화 시스템이 훨씬 더 정확하게(far more accurately) 처리한다고 했으므로 FALSE입니다.", ko: "인간은 항상 자동화 시스템보다 대량의 데이터를 더 정확하게 처리한다." },
      rQ2: { stmt: "Software engineers earn higher salaries than medical doctors.", ans: "NOT GIVEN", exp: "소프트웨어 엔지니어와 의사의 급여 비교는 지문에 전혀 없습니다.", ko: "소프트웨어 엔지니어는 의사보다 더 높은 급여를 받는다." },
      rQ3: { stmt: "Choose the word that means 'changing the form or structure of something'.", opts: ["worrying", "transforming", "completing", "remaining"], ans: "transforming", exp: "1번째 문장의 'transforming(변화시키다)'이 정답입니다.", ko: "'무언가의 형태나 구조를 바꾸다(변화시키다)'라는 뜻의 단어를 고르세요." },
      writingPrompt: "Artificial intelligence is increasingly used in workplaces. Is this a positive or negative development for workers?",
      writingPromptKo: "직장에서 인공지능이 점점 더 많이 사용되고 있습니다. 이것이 직장인들에게 긍정적인 발전일까요, 부정적인 발전일까요?",
      reqWords: [
        { word: "efficient", meaning: "효율적인" },
        { word: "replace", meaning: "대체하다" },
        { word: "creative", meaning: "창의적인" }
      ],
      modelAnswer: "Using AI in the workplace is mostly a positive development because it makes routine work much more efficient. Although technology may replace some repetitive tasks, workers can focus on creative projects and teamwork instead.",
      modelAnswerKo: "직장에서 AI를 사용하는 것은 반복 업무를 훨씬 더 효율적으로 만들기 때문에 대체로 긍정적인 발전입니다. 비록 기술이 일부 반복적인 작업을 대체할 수는 있지만, 직장인들은 대신 창의적인 프로젝트와 팀워크에 집중할 수 있습니다.",
      speakingQ1: "Do you think technology makes your daily work easier?",
      speakingQ1Ko: "기술이 당신의 일상 업무를 더 쉽게 만든다고 생각하나요?",
      speakingA1: "Yes, definitely. Cloud tools and messaging apps allow me to share files instantly and finish reports in half the time.",
      speakingA1Ko: "네, 확실히 그렇습니다. 클라우드 도구와 메신저 앱 덕분에 파일을 즉시 공유하고 보고서를 절반의 시간 만에 마칠 수 있습니다.",
      speakingQ2: "What kind of jobs cannot be easily replaced by machines?",
      speakingQ2Ko: "기계로 쉽게 대체할 수 없는 직업은 어떤 것들이 있을까요?",
      speakingA2: "Jobs that require empathy and human care, such as teachers, nurses, and counselors, cannot be easily replaced because people need real emotional connection.",
      speakingA2Ko: "교사, 간호사, 상담사처럼 공감과 인간적인 돌봄이 필요한 직업은 사람들이 진정한 정서적 교감을 필요로 하기 때문에 쉽게 대체될 수 없습니다.",
      vocab5: [
        { word: "efficient", meaning: "효율적인", day: "월/수요일" },
        { word: "transform", meaning: "변화시키다", day: "화요일" },
        { word: "replace", meaning: "대체하다", day: "수/목요일" },
        { word: "creative", meaning: "창의적인", day: "화/수요일" },
        { word: "accurate", meaning: "정확한", day: "화요일" }
      ]
    }
  ];

  const theme = themes[(weekNumber - 7) % themes.length];
  const cycleNum = Math.floor((weekNumber - 7) / themes.length) + 1;
  const prefix = `w${weekNumber}`;

  return {
    weekNumber,
    title: `Week ${weekNumber}: ${theme.topicKo}${cycleNum > 1 ? ` (심화 ${cycleNum})` : ""}`,
    subtitle: `${meta.label} · ${meta.desc}`,
    difficultyLevel: meta.label,
    difficultyMeta: meta,
    days: {
      mon: {
        dayKey: "mon",
        dayLabel: "월",
        dayFullLabel: "월요일",
        skill: "Listening",
        title: theme.listeningTitle,
        description: `${meta.label} 수준 대화 음성을 듣고 핵심 정보 빈칸 3개를 채워 보세요.`,
        estimatedMinutes: 7,
        vocabHighlights: theme.vocab5.slice(0, 2).map((v) => ({ word: v.word, meaning: v.meaning })),
        dialogue: theme.listeningDialogue,
        questions: [
          {
            id: `${prefix}-mon-q1`,
            type: "mcq",
            prompt: "대화 스크립트 빈칸 채우기 (1/3)",
            sentenceBefore: theme.lQ1.before,
            sentenceAfter: theme.lQ1.after,
            options: theme.lQ1.opts,
            answer: theme.lQ1.ans,
            explanation: theme.lQ1.exp,
            translation: theme.lQ1.ko
          },
          {
            id: `${prefix}-mon-q2`,
            type: "mcq",
            prompt: "대화 스크립트 빈칸 채우기 (2/3)",
            sentenceBefore: theme.lQ2.before,
            sentenceAfter: theme.lQ2.after,
            options: theme.lQ2.opts,
            answer: theme.lQ2.ans,
            explanation: theme.lQ2.exp,
            translation: theme.lQ2.ko
          },
          {
            id: `${prefix}-mon-q3`,
            type: "short",
            prompt: "대화 스크립트 빈칸 채우기 (3/3) - 한 단어로 입력하세요",
            sentenceBefore: theme.lQ3.before,
            sentenceAfter: theme.lQ3.after,
            placeholder: "정답 입력",
            answer: theme.lQ3.ans,
            acceptedAnswers: theme.lQ3.acc,
            explanation: theme.lQ3.exp,
            translation: theme.lQ3.ko
          }
        ]
      },
      tue: {
        dayKey: "tue",
        dayLabel: "화",
        dayFullLabel: "화요일",
        skill: "Reading",
        title: theme.readingTitle,
        description: `${meta.label} 수준 실용 지문을 읽고 TFNG 및 핵심 동의어 문제를 풀어보세요.`,
        estimatedMinutes: 8,
        vocabHighlights: theme.vocab5.slice(2, 4).map((v) => ({ word: v.word, meaning: v.meaning })),
        passageTitle: theme.readingTitle,
        sentences: theme.readingSentences,
        questions: [
          {
            id: `${prefix}-tue-q1`,
            type: "tfng",
            prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
            statement: theme.rQ1.stmt,
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: theme.rQ1.ans,
            explanation: theme.rQ1.exp,
            translation: theme.rQ1.ko
          },
          {
            id: `${prefix}-tue-q2`,
            type: "tfng",
            prompt: "지문의 내용과 일치하면 TRUE, 반대되면 FALSE, 언급되지 않았으면 NOT GIVEN을 선택하세요.",
            statement: theme.rQ2.stmt,
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: theme.rQ2.ans,
            explanation: theme.rQ2.exp,
            translation: theme.rQ2.ko
          },
          {
            id: `${prefix}-tue-q3`,
            type: "mcq",
            prompt: "핵심 동의어 찾기",
            statement: theme.rQ3.stmt,
            options: theme.rQ3.opts,
            answer: theme.rQ3.ans,
            explanation: theme.rQ3.exp,
            translation: theme.rQ3.ko
          }
        ]
      },
      wed: {
        dayKey: "wed",
        dayLabel: "수",
        dayFullLabel: "수요일",
        skill: "Writing",
        title: `IELTS Task 2 심화 영작: ${theme.topicKo}`,
        description: "필수 영단어 3개를 모두 조합하여 2~3문장의 논리적인 의견을 작성해 보세요.",
        estimatedMinutes: 9,
        vocabHighlights: [theme.vocab5[1], theme.vocab5[2]].map((v) => ({ word: v.word, meaning: v.meaning })),
        taskType: `Task 2 (${meta.label})`,
        writingPrompt: theme.writingPrompt,
        writingPromptKo: theme.writingPromptKo,
        requiredWords: theme.reqWords,
        sentencePatterns: [
          "In my opinion, ... because ... (제 생각에는 ~이기 때문에 ...합니다.)",
          "Although ..., it is clear that ... (비록 ~일지라도 ...한 것은 분명합니다.)"
        ],
        modelAnswer: theme.modelAnswer,
        modelAnswerKo: theme.modelAnswerKo,
        keyExpressions: theme.reqWords.map((rw) => ({
          expr: rw.word,
          desc: `${rw.meaning} — 이번 주 핵심 필수 어휘`
        }))
      },
      thu: {
        dayKey: "thu",
        dayLabel: "목",
        dayFullLabel: "목요일",
        skill: "Speaking",
        title: `IELTS Speaking Part 1: ${theme.topicKo}`,
        description: "30초 준비 후 1분 동안 복문 구조를 활용해 답변하고 원어민 발음을 들어보세요.",
        estimatedMinutes: 8,
        vocabHighlights: [theme.vocab5[4]].map((v) => ({ word: v.word, meaning: v.meaning })),
        questions: [
          {
            id: `${prefix}-thu-q1`,
            questionNumber: 1,
            question: theme.speakingQ1,
            questionKo: theme.speakingQ1Ko,
            prepSeconds: 30,
            speakSeconds: 60,
            hints: theme.vocab5.slice(0, 3).map((v) => ({ en: v.word, ko: v.meaning })),
            modelAnswer: theme.speakingA1,
            modelAnswerKo: theme.speakingA1Ko,
            tip: "이유와 구체적 사례를 한 문장씩 덧붙이면 Band 5.5 이상으로 자연스럽게 답변할 수 있습니다."
          },
          {
            id: `${prefix}-thu-q2`,
            questionNumber: 2,
            question: theme.speakingQ2,
            questionKo: theme.speakingQ2Ko,
            prepSeconds: 30,
            speakSeconds: 60,
            hints: theme.vocab5.slice(2, 5).map((v) => ({ en: v.word, ko: v.meaning })),
            modelAnswer: theme.speakingA2,
            modelAnswerKo: theme.speakingA2Ko,
            tip: "Although / Because 같은 접속사를 활용해 두 문장을 하나로 연결해 보세요."
          }
        ]
      },
      fri: {
        dayKey: "fri",
        dayLabel: "금",
        dayFullLabel: "금요일",
        skill: "Weekly Review",
        title: `${weekNumber}주차 핵심 어휘 & 패턴 스피드 복습`,
        description: `${weekNumber}주차 핵심 어휘 5개와 문장 구조를 퀴즈로 최종 복습해 보세요.`,
        estimatedMinutes: 5,
        reviewVocab: theme.vocab5,
        questions: [
          {
            id: `${prefix}-fri-q1`,
            type: "mcq",
            category: "어휘 뜻 매칭 (1/5)",
            prompt: `다음 중 '${theme.vocab5[0].meaning}'이라는 뜻의 영어 단어는?`,
            options: [theme.vocab5[0].word, theme.vocab5[1].word, theme.vocab5[2].word, theme.vocab5[3].word],
            answer: theme.vocab5[0].word,
            explanation: `'${theme.vocab5[0].word}'는 '${theme.vocab5[0].meaning}'이라는 뜻입니다.`,
            translation: `${theme.vocab5[0].word} = ${theme.vocab5[0].meaning}`
          },
          {
            id: `${prefix}-fri-q2`,
            type: "mcq",
            category: "어휘 뜻 매칭 (2/5)",
            prompt: `다음 중 '${theme.vocab5[1].word}'의 뜻으로 가장 알맞은 것은?`,
            options: [theme.vocab5[1].meaning, theme.vocab5[0].meaning, theme.vocab5[3].meaning, theme.vocab5[4].meaning],
            answer: theme.vocab5[1].meaning,
            explanation: `'${theme.vocab5[1].word}'는 '${theme.vocab5[1].meaning}'이라는 뜻입니다.`,
            translation: `${theme.vocab5[1].word} = ${theme.vocab5[1].meaning}`
          },
          {
            id: `${prefix}-fri-q3`,
            type: "mcq",
            category: "어휘 뜻 매칭 (3/5)",
            prompt: `다음 중 '${theme.vocab5[2].meaning}'을 뜻하는 영어 단어는?`,
            options: [theme.vocab5[2].word, theme.vocab5[0].word, theme.vocab5[1].word, theme.vocab5[4].word],
            answer: theme.vocab5[2].word,
            explanation: `'${theme.vocab5[2].word}'는 '${theme.vocab5[2].meaning}'이라는 뜻입니다.`,
            translation: `${theme.vocab5[2].word} = ${theme.vocab5[2].meaning}`
          },
          {
            id: `${prefix}-fri-q4`,
            type: "short",
            category: "어휘 스펠링 복습 (4/5)",
            prompt: `다음 뜻에 해당하는 영어 단어를 입력하세요: '${theme.vocab5[3].meaning}' (첫 글자: ${theme.vocab5[3].word[0]})`,
            sentenceBefore: "Target word:",
            sentenceAfter: `(${theme.vocab5[3].meaning})`,
            placeholder: "영어 단어 입력",
            answer: theme.vocab5[3].word,
            acceptedAnswers: [theme.vocab5[3].word.toLowerCase()],
            explanation: `'${theme.vocab5[3].meaning}'을 뜻하는 핵심 어휘는 '${theme.vocab5[3].word}'입니다.`,
            translation: `${theme.vocab5[3].word} = ${theme.vocab5[3].meaning}`
          },
          {
            id: `${prefix}-fri-q5`,
            type: "mcq",
            category: "어휘 뜻 매칭 (5/5)",
            prompt: `다음 중 '${theme.vocab5[4].word}'의 뜻으로 알맞은 것은?`,
            options: [theme.vocab5[4].meaning, theme.vocab5[1].meaning, theme.vocab5[2].meaning, theme.vocab5[0].meaning],
            answer: theme.vocab5[4].meaning,
            explanation: `'${theme.vocab5[4].word}'는 '${theme.vocab5[4].meaning}'이라는 뜻입니다.`,
            translation: `${theme.vocab5[4].word} = ${theme.vocab5[4].meaning}`
          }
        ]
      }
    }
  };
};



