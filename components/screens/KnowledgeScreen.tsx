import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  SOS_CARDS,
  IN_DEPTH_GUIDES,
  SosCard,
  InDepthGuide,
} from "@/lib/cyberhaven-data";

interface ScanResult {
  riskScore: number;
  threatLevel: "critical" | "warning" | "safe";
  title: string;
  category: string;
  triggers: {
    title: string;
    description: string;
  }[];
  mentorVerdict: string;
  actionPlan: string[];
}

const PRESET_EXAMPLES = [
  {
    id: "kaspi-scam",
    label: "Kaspi блокировка",
    icon: "⚡",
    text: "Уведомление Kaspi Gold: Ваша карта заблокирована из-за подозрительной активности. Для отмены блокировки перейдите по ссылке: https://kaspi-kz-security.online/auth и подтвердите проверочный код 1414.",
  },
  {
    id: "egov-scam",
    label: "СМС 1414 eGov",
    icon: "🏛️",
    text: "1414: Зафиксирован вход в личный кабинет eGov с нового устройства в г. Алматы. Если это не вы, сообщите оператору проверочный код отмены: 893-412 для аннулирования заявки выпуска ЭЦП.",
  },
  {
    id: "tg-vote",
    label: "Опрос в Telegram",
    icon: "🗳️",
    text: "Привет! Проголосуй пожалуйста за мою дочку Софию в конкурсе детского рисунка, мы на 2 месте! Вот ссылка: https://teleram-vote-award.online/poll?id=842",
  },
  {
    id: "family-urgent",
    label: "Родственник в беде",
    icon: "💸",
    text: "Мам, я разбил телефон и потерял кошелек, пишу с номера знакомого. Срочно переведи 65 000 ₸ на этот Kaspi номер +7 775 829-11-20, вечером всё верну!",
  },
  {
    id: "legit-delivery",
    label: "Курьер (Безопасно)",
    icon: "📦",
    text: "Ваш заказ #8491 передан в курьерскую службу. Ожидайте доставку сегодня с 14:00 до 18:00. Оплата курьеру при получении через Kaspi QR или наличными.",
  },
];

export const KnowledgeScreen: React.FC<{ isDesktop?: boolean }> = ({ isDesktop = false }) => {
  const [activeTab, setActiveTab] = useState<"inspector" | "wiki">("inspector");

  // AI Scam Inspector State
  const [inputText, setInputText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  // Wiki State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    "guide-phishing": true,
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filterChips = [
    { id: "All", label: "Все темы" },
    { id: "Phishing", label: "Фишинг" },
    { id: "Malware & RATs", label: "Вредоносное ПО & RAT" },
    { id: "Passwords", label: "Пароли и 2FA" },
    { id: "Social Engineering", label: "Социнженерия" },
    { id: "Emergency", label: "🚨 Экстренная помощь", isEmergency: true },
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const runAnalysis = (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const lower = textToAnalyze.toLowerCase().trim();

      const hasDirectPasswordTheft =
        /(скинь|пришли|дай|отправь|скажи|назови|продиктуй|сообщи|напиши|передай|введи|укажи|вышли|поделись|предоставь).*(парол|логин|код|эцп|cvv|cvc|пин|pin|учетк|аккаунт|токен|сид|seed|ключ|секрет|данны)/i.test(
          lower
        ) ||
        /(парол|логин|cvv|cvc|эцп|ncalayer|seed-фраз|сид-фраз).*(скинь|пришли|дай|отправь|назови|продиктуй|сообщи|введи)/i.test(
          lower
        ) ||
        /(логин.*парол|парол.*логин)/i.test(lower);

      const hasMaliciousIntent =
        /(украст|краж|взлом|хак|хакер|слив|слить|выкрас|завладет|шантаж|вымогат|дроп|компромет|похит|разоблач)/i.test(
          lower
        );

      const hasAuthCode =
        /1414|смс|sms|код|эцп|парол|логин|cvv|cvc|пин|pin|двухфакторн|2fa/i.test(
          lower
        );

      const hasSuspiciousDomain =
        /https?:\/\/[^\s]+|\.online|\.site|\.ru|\.xyz|\.top|\.club|\.info|\.work|\.space|\.link|\.vip|\.pay|\.fun|\.click|\.agency|\.tk|\.ga|\.ml|\.cf|\.gq|bit\.ly|t\.co|clck\.ru|tinyurl|is\.gd|kaspi-[a-z0-9]|egov-[a-z0-9]|1414-[a-z0-9]|post-kz|kazpost-[a-z0-9]|olx-[a-z0-9]|teleram|telega-/i.test(
          lower
        );

      const hasBank =
        /kaspi|каспи|halyk|халык|jusan|жусан|банк|карт|перевод|счет|счёт|деньг|тенге|₸|доллар|евро|баланс|депозит|кредит|рассрочк/i.test(
          lower
        );

      const hasUrgency =
        /срочно|немедлен|заблокирован|внимани|штраф|быстрее|отмен|прямо сейчас|в течение|до вечера|до 18:00|осталось.*минут|арест|суд|повестк/i.test(
          lower
        );

      const hasMoneyDemand =
        /(переведи|скинь|отправь|оплати|вышли|пополни|заплати|перечисли|должен).*(тенге|₸|деньг|карт|номер|счет|баланс|рубл|доллар)/i.test(
          lower
        ) ||
        /(тенге|₸|деньг|карт|номер|счет).*(переведи|скинь|отправь|оплати)/i.test(
          lower
        ) ||
        /безопасн.*(счет|счёт|ячейк)|зеркальн.*(транзакц|кредит)/i.test(
          lower
        );

      const hasFamilyBait =
        /(мам|пап|сын|дочь|дочк|брат|сестр|родственник).*(дтп|авари|сбил|в полици|в больниц|разбил|потерял|помоги)/i.test(
          lower
        );

      const hasGovernmentImpersonation =
        /1414|egov|егов|нуц|pki\.gov|нацбанк|национальн.*банк|мвд|кнб|полици|следовател|прокуратур|судебн.*исполнител|сергек|кгд|мф рк|минтруд/i.test(
          lower
        );

      const hasSocialBait =
        /проголосуй|конкурс|детск.*рисунок|племянниц|дочк|выиграл|приз|подарок|поздравляем|бесплатн.*(премиум|premium|nitro)|розыгрыш|аирдроп|airdrop/i.test(
          lower
        );

      const hasMalwareSignals =
        /\.exe|\.apk|\.scr|\.bat|\.cmd|\.vbs|\.ps1|\.zip|\.rar|\.docm|\.xlsm|anydesk|rustdesk|teamviewer|отключи.*антивирус|отключи.*defender/i.test(
          lower
        );

      let result: ScanResult;

      if (hasDirectPasswordTheft || (hasMaliciousIntent && (hasAuthCode || hasDirectPasswordTheft))) {
        result = {
          riskScore: 99,
          threatLevel: "critical",
          title: "Критическая угроза: Прямое выманивание логина/пароля и хищение данных",
          category: "Прямой фишинг / Хищение учетных данных",
          triggers: [
            {
              title: "Прямой запрос пароля или логина",
              description:
                "Обнаружено требование передать конфиденциальные учетные данные. Ни один легитимный сервис или банк никогда не просит передавать пароли.",
            },
            {
              title: "Явный маркер вредоносного умысла",
              description:
                "Текст содержит открытые указания на кражу данных, несанкционированный доступ или взлом аккаунта.",
            },
            {
              title: "Угроза полной компрометации",
              description:
                "Передача пароля даёт злоумышленнику неограниченный контроль над вашими личными переписками, файлами и связанными профилями.",
            },
          ],
          mentorVerdict:
            "Категорическое «НЕТ»! Это прямая атака на вашу безопасность. Ни при каких обстоятельствах не отправляйте логины, пароли и личные данные никому в сети!",
          actionPlan: [
            "Категорически не отправлять пароль, логин или SMS-коды.",
            "Немедленно заблокировать отправителя и пожаловаться на аккаунт.",
            "Если этот пароль совпадает с вашими рабочими учетками, немедленно смените его и включите 2FA.",
          ],
        };
      } else if (lower.includes("kaspi") && (hasUrgency || hasSuspiciousDomain || hasAuthCode || hasMoneyDemand)) {
        result = {
          riskScore: 96,
          threatLevel: "critical",
          title: "Критический риск: Банковский фишинг и перехват кода подтверждения",
          category: "Фишинг / Банковский фрод",
          triggers: [
            {
              title: "Искусственная срочность и паника",
              description: "Фразы «заблокирована», «срочно» используются для отключения бдительности.",
            },
            {
              title: "Поддельный сторонний домен или запрос кода",
              description: "Ссылка ведет на неофициальный ресурс (официальный сайт банка — только kaspi.kz).",
            },
            {
              title: "Выманивание проверочного кода 1414 / SMS",
              description: "«Сервисных кодов отмены» не существует. Любой названный код спишет ваши средства.",
            },
          ],
          mentorVerdict:
            "Классическая атака социальной инженерии. Злоумышленник стремится перехватить код двухфакторной аутентификации под видом отмены несуществующей блокировки.",
          actionPlan: [
            "Никогда не переходите по ссылке и не вводите реквизиты карты.",
            "Не сообщайте проверочный код оператору или боту.",
            "Проверьте статус счетов напрямую в официальном приложении Kaspi.kz.",
          ],
        };
      } else if (hasGovernmentImpersonation && (hasAuthCode || hasUrgency || hasSuspiciousDomain)) {
        result = {
          riskScore: 95,
          threatLevel: "critical",
          title: "Критический риск: Попытка хищения ЭЦП и доступа к eGov / 1414",
          category: "Социальная инженерия / eGov",
          triggers: [
            {
              title: "Маскировка под единый шлюз 1414 / госорган",
              description: "Имитация официального уведомления об авторизации или штрафе.",
            },
            {
              title: "Запрос кода выпуска подписи",
              description: "Код из SMS выпускает новую ЭЦП на злоумышленника, давая ему доступ к вашим документам.",
            },
            {
              title: "Психологическое давление",
              description: "Угрозы ареста счетов, штрафов или суда провоцируют действовать без раздумий.",
            },
          ],
          mentorVerdict:
            "Служба eGov.kz и операторы шлюза 1414 никогда не звонят с просьбой продиктовать код подтверждения. Это категорически запрещено регламентом РК.",
          actionPlan: [
            "Прервите контакт и заблокируйте входящий номер/профиль.",
            "Войдите в приложение eGov Mobile через биометрию и проверьте статус документов.",
            "Если код был случайно передан, немедленно отзовите ЭЦП на портале pki.gov.kz.",
          ],
        };
      } else if (hasFamilyBait && (hasMoneyDemand || hasUrgency || hasBank)) {
        result = {
          riskScore: 94,
          threatLevel: "critical",
          title: "Критический риск: Мошенничество «Родственник в беде»",
          category: "Социальная инженерия / Прессинг",
          triggers: [
            {
              title: "Острая эмоциональная манипуляция",
              description: "Легенда об аварии, больнице или задержании намеренно отключает критическое мышление.",
            },
            {
              title: "Использование стороннего номера или мессенджера",
              description: "Мошенник объясняет чужой номер поломкой или потерей телефона.",
            },
            {
              title: "Требование немедленного денежного перевода",
              description: "Спешка не дает времени связаться с другими членами семьи.",
            },
          ],
          mentorVerdict:
            "Одна из самых разрушительных схем телефонного мошенничества. Всегда проверяйте факт бедствия звонком на настоящий номер родственника.",
          actionPlan: [
            "Не переводите средства по указанным реквизитам.",
            "Позвоните родственнику на его обычный телефон или свяжитесь с близкими.",
            "Задайте личный вопрос, ответ на который знает только настоящий член семьи.",
          ],
        };
      } else if (hasMalwareSignals) {
        result = {
          riskScore: 93,
          threatLevel: "critical",
          title: "Критический риск: Распространение вредоносного ПО или удаленный доступ",
          category: "Вредоносный софт / RAT",
          triggers: [
            {
              title: "Опасные исполняемые вложения или утилиты",
              description: "Обнаружены признаки запуска скриптов, архивов или программ удаленного администрирования.",
            },
            {
              title: "Требование отключить антивирус",
              description: "Ни одна легальная программа не требует отключения системной защиты.",
            },
          ],
          mentorVerdict:
            "Попытка заразить устройство стилером или предоставить злоумышленнику удаленный доступ к вашему рабочему столу.",
          actionPlan: [
            "Не скачивайте и не запускайте присланные файлы.",
            "Не устанавливайте AnyDesk/RustDesk по указке незнакомцев.",
            "Запустите полную проверку встроенным антивирусом Windows Security.",
          ],
        };
      } else if (hasSocialBait && (hasSuspiciousDomain || hasAuthCode)) {
        result = {
          riskScore: 89,
          threatLevel: "critical",
          title: "Высокий риск: Угон аккаунта Telegram / соцсетей через фейковый конкурс",
          category: "Угон сессий / Фишинг",
          triggers: [
            {
              title: "Эксплуатация дружеского доверия и жалости",
              description: "Просьба проголосовать за ребенка или забрать подарок вызывает желание кликнуть.",
            },
            {
              title: "Фишинговая форма авторизации",
              description: "При переходе запрашивается ввод телефонного номера и кода авторизации.",
            },
          ],
          mentorVerdict:
            "После ввода кода мошенники подключают новую сессию к вашему аккаунту и рассылают спам вашим контактам.",
          actionPlan: [
            "Не переходите по ссылке и не вводите свой номер телефона.",
            "Свяжитесь со знакомым альтернативным способом (голосовой звонок).",
            "В Telegram проверьте Настройки → Устройства на наличие неизвестных сессий.",
          ],
        };
      } else if (hasMoneyDemand || hasUrgency || hasSuspiciousDomain || hasBank || hasAuthCode || hasMaliciousIntent) {
        result = {
          riskScore: 72,
          threatLevel: "warning",
          title: "Подозрительное сообщение: Присутствуют признаки социальной инженерии",
          category: "Потенциальная угроза",
          triggers: [
            {
              title: "Маркеры навязчивого побуждения к действию",
              description: "Текст содержит признаки склонения к финансовым операциям, переходу по ссылке или передаче кодов.",
            },
            {
              title: "Требуется повышенная бдительность",
              description: "Рекомендуется перепроверить источник перед любым действием.",
            },
          ],
          mentorVerdict:
            "Сообщение содержит потенциальные триггеры манипуляции. Воздержитесь от передачи конфиденциальных данных.",
          actionPlan: [
            "Не отвечайте на сообщение до подтверждения личности отправителя.",
            "Не открывайте прикрепленные файлы и ссылки.",
          ],
        };
      } else {
        result = {
          riskScore: 5,
          threatLevel: "safe",
          title: "Признаков угроз не обнаружено: Сообщение выглядит легитимным",
          category: "Информационное сообщение",
          triggers: [
            {
              title: "Отсутствуют подозрительные ссылки и домены",
              description: "В тексте нет указаний на фишинговые формы и перехват данных.",
            },
            {
              title: "Нет требований передачи паролей и кодов",
              description: "Сообщение носит чисто уведомительный характер.",
            },
          ],
          mentorVerdict:
            "Текст не содержит типичных сигналов фишинга или социальной инженерии. Опасности не выявлено.",
          actionPlan: [
            "Дополнительных мер защиты не требуется.",
            "Соблюдайте базовую цифровую гигиену при получении посылок и оплате.",
          ],
        };
      }

      setScanResult(result);
      setIsScanning(false);
    }, 450);
  };

  const handleSelectPreset = (text: string) => {
    setInputText(text);
    runAnalysis(text);
  };

  const filteredGuides = IN_DEPTH_GUIDES.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Emergency") return false;
    return matchesSearch && guide.category === activeFilter;
  });

  const showSos = activeFilter === "All" || activeFilter === "Emergency";

  return (
    <div className={`mx-auto pb-24 space-y-5 ${isDesktop ? "w-full max-w-[1560px] px-6 lg:px-10 xl:px-12 py-6" : "max-w-md w-full px-4 py-4"}`}>
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Интеллектуальная защита
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-soft-text dark:text-white">
          База знаний и AI-детектор
        </h1>
        <p className="text-xs text-soft-muted dark:text-slate-400">
          Мгновенный анализ подозрительных сообщений и подробные руководства
        </p>
      </div>

      {/* Segmented Control Tabs */}
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 dark:bg-dark-subtle p-1 border border-slate-200 dark:border-dark-border">
        <button
          onClick={() => setActiveTab("inspector")}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
            activeTab === "inspector"
              ? "bg-white dark:bg-dark-card text-emerald-800 dark:text-emerald-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-soft-text dark:hover:text-white"
          }`}
        >
          <Sparkles size={14} className={activeTab === "inspector" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"} />
          <span>AI-Инспектор угроз</span>
        </button>

        <button
          onClick={() => setActiveTab("wiki")}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
            activeTab === "wiki"
              ? "bg-white dark:bg-dark-card text-emerald-800 dark:text-emerald-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-soft-text dark:hover:text-white"
          }`}
        >
          <Search size={14} className={activeTab === "wiki" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"} />
          <span>Энциклопедия & SOS</span>
        </button>
      </div>

      {/* TAB 1: AI SCAM INSPECTOR */}
      {activeTab === "inspector" && (
        <div className="space-y-5 animate-fade-in">
          {/* Main Input Card */}
          <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-sm space-y-4">
            <div>
              <h2 className="text-sm font-bold text-soft-text dark:text-white">Проверка сообщения на скам</h2>
              <p className="text-xs text-soft-muted dark:text-slate-400">
                Вставьте SMS, сообщение из мессенджера или ссылку
              </p>
            </div>

            {/* Quick Test Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-soft-muted dark:text-slate-400">
                Быстрые сценарии для теста:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_EXAMPLES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.text)}
                    className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-dark-border bg-slate-50/80 dark:bg-dark-subtle px-2.5 py-1 text-[11px] font-semibold text-soft-text dark:text-slate-300 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-slate-800 active:scale-95 transition-all"
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Вставьте сюда текст сообщения, например: «Ваша карта заблокирована, подтвердите код...»"
                rows={4}
                className="w-full rounded-2xl border border-slate-200 dark:border-dark-border bg-slate-50/40 dark:bg-dark-subtle p-3.5 text-xs text-soft-text dark:text-white placeholder:text-soft-muted dark:placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white dark:focus:bg-dark-subtle focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-soft-muted dark:text-slate-400 font-medium">
                  {inputText.length} символов
                </span>

                <div className="flex items-center gap-2">
                  {inputText && (
                    <button
                      onClick={() => {
                        setInputText("");
                        setScanResult(null);
                      }}
                      className="text-xs font-semibold text-slate-400 hover:text-soft-text dark:hover:text-white"
                    >
                      Очистить
                    </button>
                  )}

                  <button
                    disabled={!inputText.trim() || isScanning}
                    onClick={() => runAnalysis(inputText)}
                    className="flex items-center gap-1.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all"
                  >
                    {isScanning ? (
                      <>
                        <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Сканирование...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Проверить на скам</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results Card */}
          {scanResult && (
            <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-sm space-y-4 animate-slide-up">
              {/* Header with Risk Gauge */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-dark-border pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      scanResult.threatLevel === "critical"
                        ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                        : scanResult.threatLevel === "warning"
                        ? "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                        : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {scanResult.threatLevel === "critical" && <ShieldAlert size={26} />}
                    {scanResult.threatLevel === "warning" && <AlertTriangle size={26} />}
                    {scanResult.threatLevel === "safe" && <ShieldCheck size={26} />}
                  </div>

                  <div className="space-y-0.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        scanResult.threatLevel === "critical"
                          ? "text-rose-600 dark:text-rose-400"
                          : scanResult.threatLevel === "warning"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-700 dark:text-emerald-400"
                      }`}
                    >
                      {scanResult.category}
                    </span>
                    <h3 className="text-sm font-bold text-soft-text dark:text-white leading-snug">
                      {scanResult.title}
                    </h3>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-baseline justify-end gap-1">
                    <span
                      className={`text-xl font-extrabold leading-none ${
                        scanResult.threatLevel === "critical"
                          ? "text-rose-600 dark:text-rose-400"
                          : scanResult.threatLevel === "warning"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {scanResult.riskScore}%
                    </span>
                  </div>
                  <span className="text-[9px] font-bold uppercase text-soft-muted dark:text-slate-400">
                    {scanResult.threatLevel === "critical"
                      ? "Уровень угрозы"
                      : scanResult.threatLevel === "warning"
                      ? "Риск"
                      : "Безопасно"}
                  </span>
                </div>
              </div>

              {/* Visual Meter Bar */}
              <div className="space-y-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-dark-subtle">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      scanResult.threatLevel === "critical"
                        ? "bg-rose-500"
                        : scanResult.threatLevel === "warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${scanResult.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Detected Red Flag Triggers */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-soft-muted dark:text-slate-400">
                  Выявленные маркеры угрозы:
                </span>
                <div className="space-y-2">
                  {scanResult.triggers.map((trig, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-100 dark:border-dark-border bg-slate-50/70 dark:bg-dark-subtle p-3 text-xs space-y-1"
                    >
                      <div className="flex items-center gap-2 font-bold text-soft-text dark:text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                        <span>{trig.title}</span>
                      </div>
                      <p className="text-[11px] text-soft-muted dark:text-slate-400 leading-relaxed font-medium pl-3.5">
                        {trig.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Analytical Verdict */}
              <div className="rounded-2xl border border-emerald-100 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/30 p-3.5 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  <Lightbulb size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Экспертное заключение:</span>
                </div>
                <p className="text-[11px] text-soft-text dark:text-slate-200 font-medium leading-relaxed">
                  {scanResult.mentorVerdict}
                </p>
              </div>

              {/* Clear Action Plan */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-soft-muted dark:text-slate-400">
                  Что делать прямо сейчас:
                </span>
                <div className="space-y-1.5">
                  {scanResult.actionPlan.map((action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-soft-text dark:text-slate-200 font-medium"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-dark-border">
                <button
                  onClick={() => {
                    setInputText("");
                    setScanResult(null);
                  }}
                  className="flex items-center justify-center gap-1.5 w-full rounded-2xl border border-slate-200 dark:border-dark-border py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-subtle transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Проверить другое сообщение</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WIKI & SOS GUIDES */}
      {activeTab === "wiki" && (
        <div className="space-y-6 animate-fade-in">
          {/* Quick AI Inspector Banner */}
          <button
            onClick={() => setActiveTab("inspector")}
            className="flex items-center justify-between w-full rounded-2xl border border-emerald-200/80 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/30 p-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Подозрительное сообщение? Проверьте в AI-Инспекторе
              </span>
            </div>
            <ArrowRight size={14} className="text-emerald-700 dark:text-emerald-400" />
          </button>

          {/* Search Bar */}
          <div className="relative">
            <Search
              size={16}
              className={`absolute left-3.5 top-3 transition-colors ${
                isSearchFocused ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по статьям и угрозам..."
              className="w-full rounded-2xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card py-2.5 pl-10 pr-4 text-xs text-soft-text dark:text-white placeholder:text-soft-muted dark:placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none shadow-sm transition-all"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterChips.map((chip) => {
              const isActive = activeFilter === chip.id;
              let chipStyle = "";

              if (chip.isEmergency) {
                chipStyle = isActive
                  ? "bg-rose-500 text-white border-rose-500 shadow-sm font-bold"
                  : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900 hover:bg-rose-100";
              } else {
                chipStyle = isActive
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm font-bold"
                  : "bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-dark-subtle";
              }

              return (
                <button
                  key={chip.id}
                  onClick={() => setActiveFilter(chip.id)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${chipStyle}`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* SOS Cards */}
          {showSos && (
            <section className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-soft-text dark:text-white">Экстренная помощь</h2>
                  <p className="text-xs text-soft-muted dark:text-slate-400">Пошаговый план для критических ситуаций</p>
                </div>
                <span className="rounded-full bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/50">
                  3 ситуации
                </span>
              </div>

              <div className={isDesktop ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" : "grid grid-cols-1 gap-3"}>
                {SOS_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className={`rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-4 sm:p-5 shadow-sm border-l-4 transition-transform active:scale-[0.99] ${card.stripeColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 dark:bg-dark-subtle text-soft-text dark:text-slate-200 text-xs">
                          {card.iconType === "phone" && <Phone size={14} />}
                          {card.iconType === "mail" && <Mail size={14} />}
                          {card.iconType === "user" && <User size={14} />}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-soft-muted dark:text-slate-400">
                          {card.category}
                        </span>
                      </div>
                      <span className="rounded-full bg-slate-100 dark:bg-dark-subtle px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-border">
                        {card.severity}
                      </span>
                    </div>

                    <h3 className="mt-2.5 text-sm font-bold text-soft-text dark:text-white">{card.title}</h3>

                    <div className="mt-3 space-y-2.5 border-t border-slate-100 dark:border-dark-border pt-3">
                      {card.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-soft-text dark:text-slate-200 font-medium">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-snug pt-0.5">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Detailed Guides */}
          <section className="space-y-3.5">
            <div>
              <h2 className="text-base font-bold text-soft-text dark:text-white">Подробные руководства</h2>
              <p className="text-xs text-soft-muted dark:text-slate-400">Разбор векторов атак, признаки и правила защиты</p>
            </div>

            <div className="space-y-3">
              {filteredGuides.map((guide) => {
                const isOpen = Boolean(openAccordions[guide.id]);

                return (
                  <div
                    key={guide.id}
                    className={`overflow-hidden rounded-3xl border bg-white dark:bg-dark-card shadow-sm transition-all ${
                      isOpen ? "border-emerald-500" : "border-slate-100 dark:border-dark-border"
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(guide.id)}
                      className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-slate-50/50 dark:hover:bg-dark-subtle"
                    >
                      <div className="space-y-1 pr-2">
                        <span className="inline-block rounded-md bg-slate-100 dark:bg-dark-subtle px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-dark-border">
                          {guide.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-soft-text dark:text-white pt-0.5">
                          {guide.title}
                        </h3>
                      </div>

                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-dark-subtle text-slate-500 dark:text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400" : ""
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 dark:border-dark-border p-5 space-y-4 text-xs leading-relaxed text-soft-text dark:text-slate-200 bg-white dark:bg-dark-card animate-slide-up">
                        <p className="text-soft-muted dark:text-slate-400 font-medium">{guide.summary}</p>

                        <div className="rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 p-3.5 border border-rose-200/50 dark:border-rose-900/40 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                            <AlertTriangle size={14} />
                            <span>Признаки опасности:</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-soft-text dark:text-slate-200 font-medium pl-1">
                            {guide.warningSigns.map((sign, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-rose-500 font-bold">•</span>
                                <span>{sign}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 p-3.5 border border-emerald-200/50 dark:border-emerald-800/40 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                            <CheckCircle2 size={14} />
                            <span>Что делать:</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-soft-text dark:text-slate-200 font-medium pl-1">
                            {guide.whatToDo.map((action, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 p-3.5 border border-amber-200/50 dark:border-amber-800/40">
                          <Lightbulb size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 leading-snug">
                            {guide.tipBanner}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
