import React, { useState, useRef, useEffect } from "react";
import {
  Check,
  HeartHandshake,
  Camera,
  User,
  CheckCircle2,
  X,
  Trash2,
  Bot,
  Send,
  RotateCcw,
  MessageSquare,
  Sparkles,
  LogOut,
} from "lucide-react";
import {
  UserProfile,
  SHOP_ITEMS,
  MENTOR_LIST,
} from "@/lib/cyberhaven-data";
import { CharacterAvatar } from "../Avatars";
import { GemIcon, SnowflakeFreezeIcon, XpSurgeIcon } from "../SvgIcons";

import { Language, TRANSLATIONS } from "@/lib/i18n";

interface SupportMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  badge?: string;
}

interface ProfileScreenProps {
  user: UserProfile;
  selectedMentorId: string;
  onSelectMentor: (mentorId: string) => void;
  customMentor?: { name: string; bio: string; style: string } | null;
  onUpdateAvatar: (avatarId: string) => void;
  onBuyItem: (itemId: string, cost: number) => boolean;
  onSaveCustomMentor?: (name: string, bio: string, style: string) => void;
  isDesktop?: boolean;
  language?: Language;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  selectedMentorId,
  isDesktop = false,
  language = "ru",
  onSelectMentor,
  onUpdateAvatar,
  onBuyItem,
  onLogout,
}) => {
  const [shakingItemId, setShakingItemId] = useState<string | null>(null);

  const t = TRANSLATIONS[language]?.profile || TRANSLATIONS.ru.profile;

  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([
    {
      id: "bot-init",
      sender: "bot",
      text: language === "kz"
        ? `Сәлеметсіз бе, ${user.name}! Мен CyberDesk қолдау ботымын 🛡️. Қалай көмектесе аламын? Төмендегі сұрақтарды таңдаңыз немесе мәселені сипаттаңыз:`
        : language === "en"
        ? `Hello, ${user.name}! I am CyberDesk Support Bot 🛡️. How can I help you? Choose a quick question below or describe your issue:`
        : `Здравствуйте, ${user.name}! Я бот поддержки CyberDesk 🛡️. Чем могу помочь? Выберите частый вопрос ниже или опишите ошибку:`,
      time: "сейчас",
    },
  ]);
  const [supportInput, setSupportInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatStreamRef = useRef<HTMLDivElement>(null);
  const isUserChattingRef = useRef(false);

  const FAQ_CHIPS = [
    { label: t.faqBag, query: language === "kz" ? "Симулятордан қате таптым" : language === "en" ? "Found an issue in simulator" : "Нашёл ошибку в симуляторе" },
    { label: t.faqXp, query: language === "kz" ? "Кристаллдар мен XP қалай есептеледі?" : language === "en" ? "How are gems and XP calculated?" : "Как начисляются кристаллы и XP?" },
    { label: t.faqMobile, query: language === "kz" ? "Телефоннан қалай кіруге болады?" : language === "en" ? "How do I access from mobile?" : "Как войти с телефона?" },
    { label: t.faqIdea, query: language === "kz" ? "Жаңа сценарий ұсынғым келеді" : language === "en" ? "I want to suggest a new scenario" : "Хочу предложить новый урок" },
  ];

  const handleSendSupportMessage = async (textToSend?: string) => {
    const query = (textToSend || supportInput).trim();
    if (!query) return;

    isUserChattingRef.current = true;

    const userMsg: SupportMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setSupportMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setSupportInput("");
    setIsBotTyping(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, language }),
      });
      const data = await res.json();
      const reply = data.reply || (language === "kz" ? "Өтініш тіркелді." : language === "en" ? "Request processed." : "Запрос зарегистрирован.");

      setSupportMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          badge: data.badge,
        },
      ]);
    } catch {
      setSupportMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: language === "kz" ? "Өтініш қабылданды. Жауап жақында беріледі." : language === "en" ? "Request noted. Support team notified." : "Спасибо за обращение! Запрос зафиксирован.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    if (!isUserChattingRef.current) return;
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTo({
        top: chatStreamRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [supportMessages, isBotTyping]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onUpdateAvatar(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleShopPurchase = (itemId: string, cost: number) => {
    const success = onBuyItem(itemId, cost);
    if (!success) {
      setShakingItemId(itemId);
      setTimeout(() => setShakingItemId(null), 500);
    }
  };

  const isUserPhotoUploaded = user.avatar?.startsWith("data:image/") || user.avatar?.startsWith("http");

  return (
    <div className={`mx-auto pb-24 space-y-5 ${isDesktop ? "w-full max-w-[1560px] px-6 lg:px-10 xl:px-12 py-6" : "max-w-md w-full px-4 py-4"}`}>
      {/* Top Profile Card */}
      <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-xs space-y-5 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <CharacterAvatar type={user.avatar} size="xl" />
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Загрузить своё фото"
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs border-2 border-white dark:border-dark-card hover:scale-105 transition-transform"
              >
                <Camera size={12} />
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-bold tracking-tight text-soft-text dark:text-white">{user.name}</h1>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                  Уровень {user.level} — {user.levelTitle}
                </span>
              </div>
              <p className="text-[11px] text-soft-muted dark:text-slate-400">
                CyberDesk Verified Profile
              </p>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 px-3.5 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors shrink-0"
              title="Выйти из аккаунта"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          )}
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-1.5 border-t border-slate-100 dark:border-dark-borderSubtle pt-4">
          <div className="flex justify-between text-xs font-semibold text-soft-muted dark:text-slate-400">
            <span>Прогресс уровня</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {user.currentXp} / {user.nextLevelXp} XP
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-dark-subtle">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(user.currentXp / user.nextLevelXp) * 100}%` }}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-dark-borderSubtle pt-4 text-center">
          <div>
            <span className="text-sm font-bold text-soft-text dark:text-white">{user.lessonsDone}</span>
            <p className="text-[10px] text-soft-muted dark:text-slate-400">Уроков</p>
          </div>
          <div className="border-x border-slate-100 dark:border-dark-borderSubtle">
            <span className="text-sm font-bold text-soft-text dark:text-white">{user.accuracy}%</span>
            <p className="text-[10px] text-soft-muted dark:text-slate-400">Точность</p>
          </div>
          <div>
            <span className="text-sm font-bold text-soft-text dark:text-white">{user.badges}</span>
            <p className="text-[10px] text-soft-muted dark:text-slate-400">Бейджей</p>
          </div>
        </div>
      </div>

      {/* Grid for Settings & Content (Responsive on PC 2-cols, single-column on mobile) */}
      <div className={`grid gap-5 ${isDesktop ? "grid-cols-2" : "grid-cols-1"}`}>
        {/* 1. Clean Avatar Selector: Guest + Upload Photo */}
        <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-xs space-y-4 transition-colors">
          <div>
            <h2 className="text-sm font-bold text-soft-text dark:text-white">Аватар профиля</h2>
            <p className="text-xs text-soft-muted dark:text-slate-400">Гостевой профиль или ваше личное фото</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div className="grid grid-cols-2 gap-3">
            {/* Guest Avatar Option */}
            <button
              onClick={() => onUpdateAvatar("guest")}
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 p-3 transition-all ${
                !isUserPhotoUploaded
                  ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20 shadow-xs"
                  : "border-slate-100 dark:border-dark-border bg-slate-50/50 dark:bg-dark-subtle hover:border-slate-200"
              }`}
            >
              <div className="h-14 w-14 rounded-full overflow-hidden flex items-center justify-center">
                <CharacterAvatar type="guest" size="lg" />
              </div>
              <span className="mt-2 text-xs font-bold text-soft-text dark:text-white">Гостевой</span>
              <span className="text-[10px] text-soft-muted dark:text-slate-400">По умолчанию</span>

              {!isUserPhotoUploaded && (
                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </button>

            {/* Personal Upload Option */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 p-3 transition-all ${
                isUserPhotoUploaded
                  ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20 shadow-xs"
                  : "border-dashed border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/30 dark:bg-dark-subtle hover:bg-emerald-50/60"
              }`}
            >
              <div className="h-14 w-14 rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-dark-card shadow-inner">
                {isUserPhotoUploaded ? (
                  <CharacterAvatar type={user.avatar} size="lg" />
                ) : (
                  <Camera size={22} className="text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              <span className="mt-2 text-xs font-bold text-soft-text dark:text-white">
                {isUserPhotoUploaded ? "Личное фото" : "Загрузить фото"}
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                {isUserPhotoUploaded ? "Заменить" : "С камеры / галереи"}
              </span>

              {isUserPhotoUploaded && (
                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* 2. Mascot Tone & Style Selector (NO AVATARS) */}
        <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-xs space-y-4 transition-colors">
          <div>
            <h2 className="text-sm font-bold text-soft-text dark:text-white">Характер Кибер-Маскота</h2>
            <p className="text-xs text-soft-muted dark:text-slate-400">
              Маскот CyberDesk обучает и даёт подсказки в симуляторе в выбранном стиле
            </p>
          </div>

          <div className="grid gap-2.5">
            {MENTOR_LIST.map((m) => {
              const isSelected = selectedMentorId === m.id;

              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMentor(m.id)}
                  className={`relative flex items-center justify-between rounded-2xl border-2 p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20 shadow-xs"
                      : "border-slate-100 dark:border-dark-border bg-slate-50/50 dark:bg-dark-subtle hover:border-slate-200 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-xs sm:text-sm font-bold ${isSelected ? "text-emerald-900 dark:text-emerald-300" : "text-soft-text dark:text-white"}`}>
                        {m.name}
                      </h3>
                      <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                        {m.id === "strict" ? "Zero Trust" : m.id === "gentle" ? "Забота" : "Аналитика"}
                      </span>
                    </div>
                    <p className="text-[11px] text-soft-muted dark:text-slate-400 leading-snug">
                      {m.tagline}
                    </p>
                    <p className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                      {m.role}
                    </p>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-transparent"
                    }`}
                  >
                    <Check size={11} strokeWidth={3} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Streak Shop */}
        <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-soft-text dark:text-white">Магазин бонусов</h2>
              <p className="text-xs text-soft-muted dark:text-slate-400">Покупайте полезные усиления за кристаллы</p>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
              <GemIcon size={14} className="text-emerald-500" />
              <span>{user.gems}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {SHOP_ITEMS.map((item) => {
              const isOwned = user.ownedShopItems.includes(item.id);
              const isShaking = shakingItemId === item.id;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-dark-borderSubtle bg-slate-50/50 dark:bg-dark-subtle p-3.5 gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-dark-card shadow-xs">
                      {item.icon === "snowflake" && <SnowflakeFreezeIcon size={24} />}
                      {item.icon === "zap" && <XpSurgeIcon size={24} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-soft-text dark:text-white truncate">{item.title}</h3>
                      <p className="text-[10px] text-soft-muted dark:text-slate-400 leading-snug">
                        {item.description}
                      </p>
                      <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                        <GemIcon size={11} className="text-emerald-500" />
                        {item.cost} кристаллов
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isOwned}
                    onClick={() => handleShopPurchase(item.id, item.cost)}
                    className={`shrink-0 rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                      isOwned
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 cursor-default border border-emerald-200/60 dark:border-emerald-800/50"
                        : "bg-emerald-500 text-white shadow-xs hover:bg-emerald-600 active:scale-95"
                    } ${isShaking ? "animate-bounce" : ""}`}
                  >
                    {isOwned ? "Куплено ✓" : "Купить"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Support & Help Chatbot (Replaces Certificate at the bottom) */}
      <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 sm:p-6 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-borderSubtle pb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xs">
              <Bot size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-soft-text dark:text-white">
                  Служба поддержки & Бот CyberDesk
                </h2>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>онлайн</span>
                </span>
              </div>
              <p className="text-xs text-soft-muted dark:text-slate-400">
                Задайте вопрос по урокам, сообщите об ошибке или получите совет
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              isUserChattingRef.current = false;
              setSupportMessages([
                {
                  id: "bot-init",
                  sender: "bot",
                  text: `Здравствуйте, ${user.name}! Я бот поддержки CyberDesk 🛡️. Чем могу помочь? Выберите быстрый вопрос или опишите проблему:`,
                  time: "сейчас",
                },
              ]);
            }}
            title="Очистить переписку"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors text-xs flex items-center gap-1"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline text-[11px]">Очистить</span>
          </button>
        </div>

        {/* Quick FAQ Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {FAQ_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendSupportMessage(chip.query)}
              className="rounded-xl border border-slate-200/80 dark:border-dark-border bg-slate-50/80 dark:bg-dark-subtle px-2.5 py-1 text-[11px] font-medium text-soft-text dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/40 transition-all active:scale-95"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Chat Stream */}
        <div
          ref={chatStreamRef}
          className="max-h-[300px] overflow-y-auto space-y-3 rounded-2xl bg-[#F8F9FA] dark:bg-dark-subtle p-3.5 border border-slate-100 dark:border-dark-borderSubtle"
        >
          {supportMessages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBot ? "items-start" : "items-end"} space-y-1 animate-slide-up`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    isBot
                      ? "rounded-tl-none bg-white dark:bg-dark-card text-soft-text dark:text-slate-100 border border-slate-200/80 dark:border-dark-border"
                      : "rounded-tr-none bg-emerald-500 text-white font-medium shadow-xs"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.badge && (
                    <div className="mt-1.5 inline-block rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                      Тикет: {msg.badge}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 px-1">{msg.time}</span>
              </div>
            );
          })}

          {isBotTyping && (
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-slate-200/80 dark:border-dark-border bg-white dark:bg-dark-card px-3 py-2 w-fit animate-pulse shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              <span className="text-[10px] text-soft-muted dark:text-slate-400 ml-1">CyberBot печатает...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendSupportMessage();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={supportInput}
            onChange={(e) => setSupportInput(e.target.value)}
            placeholder="Опишите вопрос, найденный баг или предложение..."
            className="flex-1 rounded-2xl border border-slate-200 dark:border-dark-border bg-slate-50/60 dark:bg-dark-subtle px-3.5 py-2.5 text-xs text-soft-text dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!supportInput.trim() || isBotTyping}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white shadow-xs transition-all active:scale-95"
            title="Отправить сообщение"
          >
            <Send size={15} />
          </button>
        </form>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-soft-muted dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-dark-borderSubtle">
          <span>Горячая линия безопасности: <strong className="text-soft-text dark:text-white">support@cyberdesk.kz</strong></span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Среднее время ответа: 1 мин</span>
        </div>
      </div>
    </div>
  );
};
