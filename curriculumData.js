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


