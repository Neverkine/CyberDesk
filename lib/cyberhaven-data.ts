export interface UserProfile {
  name: string;
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  streak: number;
  xp: number;
  gems: number;
  lessonsDone: number;
  accuracy: number;
  badges: number;
  avatar: string;
  ownedShopItems: string[];
}

export interface SkillNode {
  id: string;
  emoji: string;
  label: string;
  xp: number;
  state: "completed" | "active" | "locked";
  tierId: string;
}

export interface SkillTier {
  id: string;
  title: string;
  subtitle: string;
  nodes: SkillNode[];
}

export interface Mentor {
  id: string;
  name: string;
  tagline: string;
  role: string;
  avatar: string;
  isCustom?: boolean;
}

export interface ScenarioChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface TrainingScenario {
  id: string;
  title: string;
  sender: string;
  senderRole: string;
  platform: string;
  message: string;
  linkText?: string;
  xpReward: number;
  mentorCommentary: Record<string, string>;
  choices: ScenarioChoice[];
}

export interface SosCard {
  id: string;
  severity: "Критическая" | "Высокая" | "Внимание";
  title: string;
  category: string;
  iconType: "phone" | "mail" | "user";
  stripeColor: string;
  steps: string[];
}

export interface InDepthGuide {
  id: string;
  title: string;
  category: string;
  summary: string;
  warningSigns: string[];
  whatToDo: string[];
  tipBanner: string;
}

export const INITIAL_USER: UserProfile = {
  name: "Артём",
  level: 7,
  levelTitle: "Защитник",
  currentXp: 720,
  nextLevelXp: 1000,
  streak: 12,
  xp: 1450,
  gems: 280,
  lessonsDone: 14,
  accuracy: 92,
  badges: 6,
  avatar: "guest",
  ownedShopItems: [],
};

export const INITIAL_SENIOR_USER: UserProfile = {
  name: "Валентина Ивановна",
  level: 3,
  levelTitle: "Новичок",
  currentXp: 210,
  nextLevelXp: 500,
  streak: 5,
  xp: 410,
  gems: 150,
  lessonsDone: 6,
  accuracy: 96,
  badges: 3,
  avatar: "senior",
  ownedShopItems: [],
};

export const SKILL_TIERS: SkillTier[] = [
  {
    id: "foundations",
    title: "Основы",
    subtitle: "Базовые привычки цифровой гигиены",
    nodes: [
      {
        id: "passwords",
        emoji: "🔑",
        label: "Пароли и 2FA",
        xp: 100,
        state: "completed",
        tierId: "foundations",
      },
      {
        id: "links",
        emoji: "🔗",
        label: "Безопасные ссылки",
        xp: 120,
        state: "completed",
        tierId: "foundations",
      },
    ],
  },
  {
    id: "fintech",
    title: "Kaspi & Финтех РК",
    subtitle: "Безопасность платежей и переводов",
    nodes: [
      {
        id: "kaspi-qr-fraud",
        emoji: "☕",
        label: "Kaspi QR на кассе",
        xp: 120,
        state: "active",
        tierId: "fintech",
      },
      {
        id: "kaspi-wrong-transfer",
        emoji: "👤",
        label: "Ошибочный перевод",
        xp: 140,
        state: "locked",
        tierId: "fintech",
      },
    ],
  },
  {
    id: "egov",
    title: "eGov & Госуслуги 1414",
    subtitle: "Защита цифрового удостоверения и ЭЦП",
    nodes: [
      {
        id: "egov-tax-debt",
        emoji: "⚖️",
        label: "Налоги КГД МФ РК",
        xp: 130,
        state: "locked",
        tierId: "egov",
      },
      {
        id: "egov-social-benefit",
        emoji: "🇰🇿",
        label: "Выплаты Минтруда",
        xp: 120,
        state: "locked",
        tierId: "egov",
      },
    ],
  },
  {
    id: "threats",
    title: "Мессенджеры & Соцсети",
    subtitle: "Угон Telegram, WhatsApp и фишинг",
    nodes: [
      {
        id: "phishing-chat",
        emoji: "🎣",
        label: "Фишинг в чатах",
        xp: 150,
        state: "locked",
        tierId: "threats",
      },
      {
        id: "telegram-premium-gift",
        emoji: "⭐",
        label: "Подарок TG Premium",
        xp: 130,
        state: "locked",
        tierId: "threats",
      },
    ],
  },
  {
    id: "phone",
    title: "Звонки & Социнженерия",
    subtitle: "Лже-следователи, банки и операторы",
    nodes: [
      {
        id: "phone-scams",
        emoji: "📞",
        label: "Звонки мошенников",
        xp: 150,
        state: "locked",
        tierId: "phone",
      },
      {
        id: "relative-accident",
        emoji: "🚨",
        label: "ДТП с близкими",
        xp: 180,
        state: "locked",
        tierId: "phone",
      },
    ],
  },
  {
    id: "advanced",
    title: "Вредоносный софт & RAT",
    subtitle: "Трояны, стилеры и удаленный доступ",
    nodes: [
      {
        id: "rat-malware",
        emoji: "👾",
        label: "Вредоносное ПО & RAT",
        xp: 200,
        state: "locked",
        tierId: "advanced",
      },
      {
        id: "stealers",
        emoji: "🛡️",
        label: "Стилеры данных",
        xp: 250,
        state: "locked",
        tierId: "advanced",
      },
    ],
  },
];

export const MENTOR_LIST: Mentor[] = [
  {
    id: "strict",
    name: "Строгий стиль",
    tagline: "Дисциплина, регламенты и концепция нулевого доверия — Zero Trust",
    role: "Бескомпромиссная проверка и защита от ошибок",
    avatar: "strict",
  },
  {
    id: "gentle",
    name: "Мягкий стиль",
    tagline: "Спокойная поддержка, забота и отсутствие стресса",
    role: "Помогает не паниковать и бережно объясняет шаги",
    avatar: "gentle",
  },
  {
    id: "tutor",
    name: "Обучающий стиль",
    tagline: "Разбор логики атак, понятные аналогии и подсказки",
    role: "Методично обучает устройству мошеннических схем",
    avatar: "tutor",
  },
];

export const TRAINING_SCENARIOS: TrainingScenario[] = [
  {
    id: "scen-1",
    title: "Steam Chat: Подозрительный трейд-подарок",
    platform: "Steam Chat",
    sender: "Steam Community Bot",
    senderRole: "Якобы служба автоматических обменов",
    message:
      "Поздравляем! Вам начислен подарок: редкий скин AWP Dragon Lore. Для подтверждения заберите предмет по ссылке в течение 15 минут:",
    linkText: "steamcommuniity-gift.ru/trade/84920",
    xpReward: 120,
    mentorCommentary: {
      strict: "Нарушение регламента! В домене допущена намеренная опечатка 'steamcommuniity'. Немедленно закрыть диалог и не переходить по ссылке.",
      gentle: "Не торопись нажимать: мошенники часто подсовывают подарки, чтобы сыграть на эмоциях. Давай проверим ссылку вместе.",
      tutor: "Обрати внимание на метод атаки: typosquatting (подделка доменного имени). Вместо steamcommunity.com здесь две буквы 'i'.",
      custom: "Осторожно! В ссылке опечатка, это явная попытка угнать аккаунт.",
    },
    choices: [
      {
        id: "c1",
        text: "Перейти по ссылке и войти через форму Steam",
        isCorrect: false,
        explanation:
          "Ошибка! Ввод логина и Steam Guard кода на стороннем сайте передает сессию злоумышленнику.",
      },
      {
        id: "c2",
        text: "Обратить внимание на опечатку в домене и проигнорировать сообщение",
        isCorrect: true,
        explanation:
          "Верно! Официальный домен Steam — steamcommunity.com. Поддельные сайты используют двойные буквы.",
      },
      {
        id: "c3",
        text: "Отправить ссылку друзьям, чтобы проверили",
        isCorrect: false,
        explanation:
          "Не распространяйте фишинговые ссылки — друзья могут случайно кликнуть по ошибке.",
      },
    ],
  },
  {
    id: "scen-2",
    title: "Срочный звонок и СМС из службы безопасности",
    platform: "SMS & Телефон",
    sender: "Kaspi-Безопасность",
    senderRole: "Якобы отдел финансового мониторинга",
    message:
      "С вашего счета зафиксирована попытка списания 48 500 ₸. Если операция не ваша, назовите код из СМС сотруднику для отмены!",
    xpReward: 120,
    mentorCommentary: {
      strict: "Критическая угроза! Служба безопасности и регламент банка никогда не запрашивают одноразовый пароль. Немедленно завершить звонок.",
      gentle: "Дыши спокойно. Они специально пугают списанием средств, чтобы ты запаниковал. Настоящий банк защитит счет сам.",
      tutor: "Психологический паттерн атаки: вызов страха потери денег для выманивания 2FA-кода. Официальный банк никогда не просит назвать код.",
      custom: "Сбросьте вызов. Никому не сообщайте проверочный код.",
    },
    choices: [
      {
        id: "c4",
        text: "Срочно продиктовать код, чтобы спасти деньги",
        isCorrect: false,
        explanation:
          "Ошибка! Назвав код, вы сами подтверждаете перевод денег мошеннику.",
      },
      {
        id: "c5",
        text: "Положить трубку и перезвонить в банк по номеру 9999 или номеру с пластиковой карты",
        isCorrect: true,
        explanation:
          "Идеальное действие! Самостоятельный звонок по номеру с карты защищает от любой подделки номеров.",
      },
      {
        id: "c6",
        text: "Попросить сотрудника прислать фото удостоверения",
        isCorrect: false,
        explanation:
          "У мошенников заготовлены поддельные картинки удостоверений в фотошопе.",
      },
    ],
  },
  {
    id: "scen-3",
    title: "Просьба проголосовать за племянницу в Telegram",
    platform: "Telegram",
    sender: "Алёна (Подруга)",
    senderRole: "Взломанный контакт из адресной книги",
    message:
      "Привет! Пожалуйста, поддержи мою племянницу в конкурсе рисунков, ей не хватает пары голосов: ballet-kids-vote.online",
    linkText: "ballet-kids-vote.online",
    xpReward: 140,
    mentorCommentary: {
      strict: "Угроза компрометации! Вход по внешним ссылкам через авторизацию Telegram запрещен. Задайте контрольный вопрос.",
      gentle: "Понимаю желание поддержать знакомого, но не спеши: аккаунт подруги взломан. Сделай паузу и позвони ей.",
      tutor: "Схема угона сессии через OAuth/QR-код: мошенники маскируют кражу аккаунта под невинный конкурс детских рисунков.",
      custom: "Не вводите код от Telegram. Задайте подруге личный контрольный вопрос.",
    },
    choices: [
      {
        id: "c7",
        text: "Перейти на сайт и подтвердить вход в Telegram",
        isCorrect: false,
        explanation:
          "Ошибка! Вы привяжете устройство мошенника к своему аккаунту и потеряете доступ.",
      },
      {
        id: "c8",
        text: "Задать контрольный личный вопрос голосом или спросить то, что знает только она",
        isCorrect: true,
        explanation:
          "Верно! Запрос голосового или личного факта сразу отпугивает взломщиков.",
      },
      {
        id: "c9",
        text: "Ответить грубостью и заблокировать",
        isCorrect: false,
        explanation:
          "Лучше предупредить подругу по другому каналу связи (позвонить по телефону), что ее аккаунт взломан.",
      },
    ],
  },
  {
    id: "scen-4",
    title: "Тестовое задание разработчика в архиве .zip",
    platform: "Email",
    sender: "HR Екатерина / Tech Corp",
    senderRole: "Рекрутер международной компании",
    message:
      "Здравствуйте! Мы готовы предложить оффер на 1 500 000 ₸. Скачайте тестовый стенд и запустите task_runner.exe из архива:",
    linkText: "tech-build-share.com/task.zip",
    xpReward: 150,
    mentorCommentary: {
      strict: "Грубое нарушение цифровой гигиены! Запуск .exe файлов от внешних рекрутеров недопустим. Внутри внедрен троян.",
      gentle: "Не расстраивайся, но такое заманчивое предложение — ловушка. Запуск незнакомого файла опасен для твоего компьютера.",
      tutor: "Вектор атаки: Targeted Malware Delivery. Злоумышленники используют привлекательный оффер, чтобы заставить жертву запустить инфостилер.",
      custom: "Никогда не запускайте сторонние .exe файлы из почты.",
    },
    choices: [
      {
        id: "c10",
        text: "Распаковать архив и запустить .exe файл",
        isCorrect: false,
        explanation:
          "Ошибка! Исполняемый файл заражает систему стилером и похищает сохраненные пароли браузера.",
      },
      {
        id: "c11",
        text: "Попросить ссылку на публичный GitHub репозиторий вместо исполняемого файла",
        isCorrect: true,
        explanation:
          "Отлично! Настоящие IT-компании никогда не просят запускать скомпилированные .exe файлы.",
      },
      {
        id: "c12",
        text: "Запустить файл в режиме совместимости",
        isCorrect: false,
        explanation: "Режим совместимости не защищает от вируса.",
      },
    ],
  },
  {
    id: "scen-5",
    title: "Родственник срочно просит перевод в WhatsApp",
    platform: "WhatsApp",
    sender: "Неизвестный номер (фото брата)",
    senderRole: "Якобы близкий родственник",
    message:
      "Мам / привет, я телефон разбил, пишу с номера друга. Срочно переведи 25 000 ₸ на Kaspi по этому номеру, вечером все верну!",
    xpReward: 120,
    mentorCommentary: {
      strict: "Финансовое мошенничество! Любые переводы на сторонние реквизиты без голосового подтверждения категорически запрещены.",
      gentle: "Это очень тревожно, но не паникуй и не переводи деньги. Просто набери брата на его обычный сохранённый номер.",
      tutor: "Социальная инженерия на базе эмоционального давления: спешка и поломка телефона служат предлогом для перевода на карту дроппера.",
      custom: "Позвоните родственнику на его обычный сохраненный номер.",
    },
    choices: [
      {
        id: "c13",
        text: "Срочно перевести деньги по указанному номеру",
        isCorrect: false,
        explanation: "Ошибка! Перевод уйдет мошеннику, вернуть средства будет крайне трудно.",
      },
      {
        id: "c14",
        text: "Набрать родственника по его старому обычному номеру из телефонной книги",
        isCorrect: true,
        explanation:
          "Правильно! В 99% случаев близкий ответит и скажет, что у него всё в порядке.",
      },
      {
        id: "c15",
        text: "Написать в ответ номер своей карты",
        isCorrect: false,
        explanation: "Не стоит вступать в диалог с неизвестным номером.",
      },
    ],
  },
];

export const SOS_CARDS: SosCard[] = [
  {
    id: "sos-bank",
    severity: "Критическая",
    title: "Мне звонят якобы из банка или полиции",
    category: "Телефонное мошенничество",
    iconType: "phone",
    stripeColor: "border-l-soft-terracotta",
    steps: [
      "Сразу нажмите кнопку сброса вызова на телефоне.",
      "Никому не называйте код из СМС и 3 цифры на обороте карты.",
      "Наберите короткий номер банка (Kaspi: 9999, Halyk: 7111) сами с клавиатуры телефона.",
    ],
  },
  {
    id: "sos-pension",
    severity: "Высокая",
    title: "Сообщение о внезапной выплате или надбавке",
    category: "Социальные выплаты",
    iconType: "mail",
    stripeColor: "border-l-soft-honey",
    steps: [
      "Не нажимайте на синие ссылки в сообщении.",
      "Помните: настоящие государственные выплаты начисляются автоматически.",
      "Проверьте информацию лично в ЦОНе (eGov) или на портале egov.kz / enbek.kz.",
    ],
  },
  {
    id: "sos-relative",
    severity: "Высокая",
    title: "Родственник просит деньги в сообщении",
    category: "Взлом аккаунтов близких",
    iconType: "user",
    stripeColor: "border-l-soft-lavender",
    steps: [
      "Не отправляйте перевод в спешке, даже если очень просят.",
      "Позвоните родственнику обычным звонком по номеру из телефонной книги.",
      "Задайте личный контрольный вопрос (например, кличку домашнего питомца).",
    ],
  },
];

export const IN_DEPTH_GUIDES: InDepthGuide[] = [
  {
    id: "guide-phishing",
    title: "Фишинговые ссылки и поддельные сайты",
    category: "Phishing",
    summary:
      "Мошенники создают точные копии сайтов банков, маркетплейсов и соцсетей, чтобы украсть ваши логины и платежные данные.",
    warningSigns: [
      "Ошибки и лишние буквы в адресе: egov-pay.online или kaspi-security.online вместо egov.kz и kaspi.kz",
      "Искусственная паника: «Срочно! Аккаунт будет заблокирован через 2 часа»",
      "Просьба ввести пароль или код подтверждения на незнакомой странице",
    ],
    whatToDo: [
      "Всегда проверяйте адресную строку перед вводом паролей.",
      "Сохраняйте важные сайты в закладки браузера.",
      "Используйте менеджер паролей — он не станет автозаполнять пароль на поддельном домене.",
    ],
    tipBanner:
      "Главный совет: официальные сервисы eGov и банки никогда не требуют срочно ввести пароль под угрозой немедленного удаления профиля.",
  },
  {
    id: "guide-rat",
    title: "RAT-трояны и скрытые майнеры",
    category: "Malware & RATs",
    summary:
      "Вредоносные программы удаленного доступа (RAT) позволяют хакерам видеть ваш экран, включать микрофон и скачивать файлы без вашего ведома.",
    warningSigns: [
      "Файлы с двойным расширением: Photo.jpg.exe или Contract.pdf.scr",
      "Просьба отключить антивирус в скачанной инструкции",
      "Внезапный шум кулера и высокая нагрузка процессора в покое",
    ],
    whatToDo: [
      "Включите отображение расширений файлов в проводнике Windows.",
      "Никогда не отключайте Windows Defender или антивирус по просьбе из интернета.",
      "Проверяйте подозрительные файлы на сайте VirusTotal перед запуском.",
    ],
    tipBanner:
      "Главный совет: ни одна легитимная программа не требует отключить антивирус для своей работы.",
  },
  {
    id: "guide-social",
    title: "Социальная инженерия и имитация личности",
    category: "Social Engineering",
    summary:
      "Хакеры атакуют не компьютеры, а людей. Они используют страх, любопытство, жадность или сострадание, чтобы заставить вас совершить ошибку.",
    warningSigns: [
      "Давление на жалость или срочность («только сейчас», «никому не рассказывай»)",
      "Звонки от имени «начальника», «следователя» или «службы безопасности»",
      "Просьба совершить нестандартное действие (снять наличные, перевести на безопасный счет)",
    ],
    whatToDo: [
      "Возьмите паузу: мошенники боятся времени на размышления.",
      "Свяжитесь с человеком по независимому известному каналу.",
      "Помните: понятия «безопасный счет Нацбанка РК» в реальности не существует.",
    ],
    tipBanner:
      "Главный совет: если вас просят сохранить тайну и не звонить близким — перед вами 100% мошенник.",
  },
];

export const SHOP_ITEMS = [
  {
    id: "streak_freeze",
    title: "Заморозка серии",
    description: "Защищает серию дней от сгорания, если вы пропустите один день тренировок.",
    cost: 50,
    icon: "snowflake",
  },
  {
    id: "xp_boost",
    title: "Удвоение опыта (2x)",
    description: "Удваивает весь получаемый опыт (XP) на следующие 3 тренировки.",
    cost: 80,
    icon: "zap",
  },
];

export interface AvatarOption {
  id: string;
  label: string;
  desc: string;
  image?: string;
  isGuest?: boolean;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: "guest", label: "Гостевой", desc: "По умолчанию", isGuest: true },
  { id: "mascot", label: "Маскот", desc: "Талисман CyberDesk", image: "/mascot-hacker.png" },
  { id: "student", label: "Студент", desc: "Алихан" },
  { id: "senior", label: "Ветеран", desc: "Валентина" },
  { id: "tony", label: "Тони", desc: "Наставник" },
  { id: "senku", label: "Сенку", desc: "Учёный" },
  { id: "elliot", label: "Эллиот", desc: "Хакер" },
  { id: "cyber", label: "Кибербот", desc: "AI-модуль" },
  { id: "fox", label: "Лис", desc: "Разведка" },
  { id: "owl", label: "Сова", desc: "Аудитор" },
  { id: "shield", label: "Страж", desc: "Защитник" },
  { id: "lion", label: "Лев", desc: "Лидер" },
  { id: "panda", label: "Панда", desc: "Спокойствие" },
  { id: "racoon", label: "Енот", desc: "Детектив" },
];
