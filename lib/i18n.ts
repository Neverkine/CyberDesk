export type Language = "ru" | "kz" | "en";

export interface I18nDictionary {
  welcome: {
    title: string;
    subtitle: string;
    cta: string;
    chooseLang: string;
  };
  nav: {
    home: string;
    training: string;
    knowledge: string;
    profile: string;
  };
  home: {
    dailyFocusTitle: string;
    dailyFocusSubtitle: string;
    startLesson: string;
    recentActivity: string;
    noActivity: string;
    stageProgress: string;
    completed: string;
    inProgress: string;
    locked: string;
    xpLabel: string;
    streakDays: string;
    accuracyLabel: string;
  };
  training: {
    title: string;
    subtitle: string;
    practiceOnlyBadge: string;
    startSimulation: string;
  };
  knowledge: {
    title: string;
    subtitle: string;
    scannerTitle: string;
    scannerSubtitle: string;
    scanPlaceholder: string;
    scanButton: string;
    scanning: string;
    riskScore: string;
    threatsLibrary: string;
  };
  profile: {
    title: string;
    level: string;
    accuracy: string;
    lessonsDone: string;
    shopTitle: string;
    shopSubtitle: string;
    mentorsTitle: string;
    mentorsSubtitle: string;
    supportTitle: string;
    supportSubtitle: string;
    supportPlaceholder: string;
    send: string;
    logout: string;
    faqBag: string;
    faqXp: string;
    faqMobile: string;
    faqIdea: string;
  };
  simulator: {
    online: string;
    close: string;
    tryAgain: string;
    nextLesson: string;
    dashboard: string;
    allStagesDone: string;
    mentorAdvice: string;
    suspiciousLink: string;
  };
}

export const TRANSLATIONS: Record<Language, I18nDictionary> = {
  ru: {
    welcome: {
      title: "Приветствуем вас на платформе CyberDesk!",
      subtitle: "Интерактивный тренажер кибербезопасности и защиты от цифровых угроз и мошенничества в Казахстане",
      cta: "Нажмите, чтобы продолжить",
      chooseLang: "Выберите язык интерфейса",
    },
    nav: {
      home: "Главная",
      training: "Тренировки",
      knowledge: "База знаний",
      profile: "Профиль",
    },
    home: {
      dailyFocusTitle: "Фокус дня",
      dailyFocusSubtitle: "Ключевой сценарий защиты на сегодня",
      startLesson: "Начать урок",
      recentActivity: "Недавняя активность",
      noActivity: "Пока нет активности. Пройдите первый урок!",
      stageProgress: "Прогресс этапа",
      completed: "Завершён",
      inProgress: "В процессе",
      locked: "Заблокирован",
      xpLabel: "Опыт",
      streakDays: "дней подряд",
      accuracyLabel: "Точность",
    },
    training: {
      title: "Лаборатория тренировок",
      subtitle: "Отработка сценариев без риска потери прогресса",
      practiceOnlyBadge: "Только тренировочный режим",
      startSimulation: "Запустить разбор",
    },
    knowledge: {
      title: "База знаний и AI-детектор",
      subtitle: "Энциклопедия актуальных угроз и проверка подозрительных сообщений",
      scannerTitle: "Анализатор подозрительных сообщений",
      scannerSubtitle: "Вставьте текст подозрительного SMS или письма для анализа",
      scanPlaceholder: "Вставьте текст сообщения для проверки на фишинг и манипуляции...",
      scanButton: "Проверить на угрозы",
      scanning: "Анализируем текст...",
      riskScore: "Уровень риска",
      threatsLibrary: "Энциклопедия киберугроз",
    },
    profile: {
      title: "Личный профиль",
      level: "Уровень",
      accuracy: "Точность ответов",
      lessonsDone: "Пройдено уроков",
      shopTitle: "Магазин бонусов",
      shopSubtitle: "Обменивайте заработанные кристаллы на полезные усиления",
      mentorsTitle: "Стиль наставника",
      mentorsSubtitle: "Выберите характер и тон сопровождения в диалогах",
      supportTitle: "Служба поддержки и консультаций",
      supportSubtitle: "Интеллектуальный ассистент по вопросам, багам и кибергигиене",
      supportPlaceholder: "Опишите проблему, задайте вопрос по кибербезопасности...",
      send: "Отправить",
      logout: "Выйти из аккаунта",
      faqBag: "🐛 Нашёл баг в симуляторе",
      faqXp: "💎 Как получить кристаллы и XP?",
      faqMobile: "📱 Как открыть на телефоне?",
      faqIdea: "💡 Предложить новый сценарий",
    },
    simulator: {
      online: "в сети",
      close: "Закрыть",
      tryAgain: "Попробовать снова",
      nextLesson: "Следующий урок",
      dashboard: "Вернуться в дашборд",
      allStagesDone: "Все 6 этапов успешно пройдены!",
      mentorAdvice: "Подсказка наставника",
      suspiciousLink: "ПОДОЗРИТЕЛЬНАЯ ССЫЛКА",
    },
  },
  kz: {
    welcome: {
      title: "CyberDesk платформасына қош келдіңіз!",
      subtitle: "Қазақстандағы киберқауіптер мен цифрлық алаяқтардан қорғануға арналған интерактивті тренажер",
      cta: "Жалғастыру үшін басыңыз",
      chooseLang: "Тілді таңдаңыз",
    },
    nav: {
      home: "Басты бет",
      training: "Жаттығулар",
      knowledge: "Білім базасы",
      profile: "Профиль",
    },
    home: {
      dailyFocusTitle: "Күн фокусы",
      dailyFocusSubtitle: "Бүгінгі басты қорғаныс сценарийі",
      startLesson: "Сабақты бастау",
      recentActivity: "Соңғы белсенділік",
      noActivity: "Әзірге белсенділік жоқ. Алғашқы сабақты өтіңіз!",
      stageProgress: "Кезең барысы",
      completed: "Аяқталды",
      inProgress: "Орындалуда",
      locked: "Бұғатталған",
      xpLabel: "Тәжірибе",
      streakDays: "күн қатарынан",
      accuracyLabel: "Дәлдік",
    },
    training: {
      title: "Жаттығу зертханасы",
      subtitle: "Прогресті жоғалту қаупінсіз сценарийлерді пысықтау",
      practiceOnlyBadge: "Тек жаттығу режимі",
      startSimulation: "Талдауды бастау",
    },
    knowledge: {
      title: "Білім базасы және AI-детектор",
      subtitle: "Өзекті қауіптер энциклопедиясы және күмәнді хабарламаларды тексеру",
      scannerTitle: "Күдікті хабарламаларды талдау",
      scannerSubtitle: "Талдау үшін күдікті SMS немесе хат мәтінін қойыңыз",
      scanPlaceholder: "Фишинг пен айла-шарғыға тексеру үшін хабарлама мәтінін осында енгізіңіз...",
      scanButton: "Қауіптерді тексеру",
      scanning: "Мәтін талдануда...",
      riskScore: "Қауіп деңгейі",
      threatsLibrary: "Киберқауіптер энциклопедиясы",
    },
    profile: {
      title: "Жеке профиль",
      level: "Деңгей",
      accuracy: "Жауап дәлдігі",
      lessonsDone: "Өтілген сабақтар",
      shopTitle: "Бонустар дүкені",
      shopSubtitle: "Жиналған кристаллдарды пайдалы күшейткіштерге айырбастаңыз",
      mentorsTitle: "Тәлімгер стилі",
      mentorsSubtitle: "Диалогтардағы сүйемелдеу мінезі мен үнін таңдаңыз",
      supportTitle: "Қолдау және кеңес беру қызметі",
      supportSubtitle: "Сұрақтар, қателіктер және кибергигиена бойынша зияткерлік көмекші",
      supportPlaceholder: "Мәселені сипаттаңыз немесе киберқауіпсіздік бойынша сұрақ қойыңыз...",
      send: "Жіберу",
      logout: "Аккаунттан шығу",
      faqBag: "🐛 Симулятордан қате таптым",
      faqXp: "💎 Кристалл мен XP қалай жиналады?",
      faqMobile: "📱 Телефоннан қалай кіруге болады?",
      faqIdea: "💡 Жаңа сценарий ұсыну",
    },
    simulator: {
      online: "желіде",
      close: "Жабу",
      tryAgain: "Қайта көру",
      nextLesson: "Келесі сабақ",
      dashboard: "Дашбордқа оралу",
      allStagesDone: "Барлық 6 кезең сәтті аяқталды!",
      mentorAdvice: "Тәлімгер кеңесі",
      suspiciousLink: "КҮДІКТІ СІЛТЕМЕ",
    },
  },
  en: {
    welcome: {
      title: "Welcome to CyberDesk Platform!",
      subtitle: "Interactive cybersecurity simulator protecting against digital threats and fraud in Kazakhstan",
      cta: "Click to continue",
      chooseLang: "Select Interface Language",
    },
    nav: {
      home: "Dashboard",
      training: "Practice",
      knowledge: "Knowledge",
      profile: "Profile",
    },
    home: {
      dailyFocusTitle: "Daily Focus",
      dailyFocusSubtitle: "Key defense scenario recommended for today",
      startLesson: "Start Lesson",
      recentActivity: "Recent Activity",
      noActivity: "No activity yet. Complete your first lesson!",
      stageProgress: "Stage Progress",
      completed: "Completed",
      inProgress: "In Progress",
      locked: "Locked",
      xpLabel: "XP",
      streakDays: "day streak",
      accuracyLabel: "Accuracy",
    },
    training: {
      title: "Practice Lab",
      subtitle: "Hands-on threat scenario drills without risking main progress",
      practiceOnlyBadge: "Practice Mode Only",
      startSimulation: "Start Simulation",
    },
    knowledge: {
      title: "Knowledge Base & AI Detector",
      subtitle: "Threat encyclopedia and live suspicious text analyzer",
      scannerTitle: "Suspicious Message Analyzer",
      scannerSubtitle: "Paste any suspicious SMS, message or email to inspect",
      scanPlaceholder: "Paste message text to scan for phishing and social engineering...",
      scanButton: "Scan for Threats",
      scanning: "Analyzing message...",
      riskScore: "Risk Score",
      threatsLibrary: "Cyber Threat Encyclopedia",
    },
    profile: {
      title: "User Profile",
      level: "Level",
      accuracy: "Accuracy",
      lessonsDone: "Lessons Done",
      shopTitle: "Rewards Shop",
      shopSubtitle: "Redeem earned gems for streak freezes and powerups",
      mentorsTitle: "Mentor Persona",
      mentorsSubtitle: "Choose guidance tone and tactical feedback style",
      supportTitle: "Support & Help Desk",
      supportSubtitle: "Intelligent assistant for technical support and cybersecurity hygiene",
      supportPlaceholder: "Describe your issue or ask a cybersecurity question...",
      send: "Send",
      logout: "Log Out",
      faqBag: "🐛 Found a bug in simulator",
      faqXp: "💎 How do I earn crystals and XP?",
      faqMobile: "📱 How to open on mobile?",
      faqIdea: "💡 Suggest a new scenario",
    },
    simulator: {
      online: "online",
      close: "Close",
      tryAgain: "Try Again",
      nextLesson: "Next Lesson",
      dashboard: "Back to Dashboard",
      allStagesDone: "All 6 stages successfully completed!",
      mentorAdvice: "Mentor Guidance",
      suspiciousLink: "SUSPICIOUS LINK",
    },
  },
};
