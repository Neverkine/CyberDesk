import React, { useState } from "react";
import {
  Globe,
  Moon,
  Sun,
  Shield,
  Compass,
  ArrowRight,
  Check,
  Sparkles,
  Swords,
  BookOpen,
  User,
  LayoutDashboard,
} from "lucide-react";
import { MENTOR_LIST } from "@/lib/cyberhaven-data";

interface OnboardingModalProps {
  isOpen: boolean;
  currentTheme: "dark" | "light";
  onToggleTheme: () => void;
  onSelectMentorStyle: (styleId: string) => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  currentTheme,
  onToggleTheme,
  onSelectMentorStyle,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"ru" | "kz">("ru");
  const [selectedStyle, setSelectedStyle] = useState<string>("strict");

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      onSelectMentorStyle(selectedStyle);
      setStep(3);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-[11px] font-bold">
              {step}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-soft-muted dark:text-slate-400">
              Шаг {step} из 3
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-6 rounded-full transition-all ${step >= 1 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`} />
            <span className={`h-1.5 w-6 rounded-full transition-all ${step >= 2 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`} />
            <span className={`h-1.5 w-6 rounded-full transition-all ${step >= 3 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`} />
          </div>
        </div>

        {/* Step 1: Language & Theme */}
        {step === 1 && (
          <div className="space-y-5 animate-slide-up">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-soft-text dark:text-white">
                Добро пожаловать в CyberDesk! 🛡️
              </h3>
              <p className="text-xs text-soft-muted dark:text-slate-400">
                Настройте удобный язык и тему интерфейса для комфортного обучения.
              </p>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-soft-text dark:text-slate-300 flex items-center gap-1.5">
                <Globe size={14} className="text-emerald-500" />
                <span>Язык интерфейса</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedLanguage("ru")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border p-3 text-xs font-bold transition-all ${
                    selectedLanguage === "ru"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-dark-subtle text-soft-text dark:text-white hover:border-slate-300"
                  }`}
                >
                  <span>🇷🇺</span>
                  <span>Русский</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLanguage("kz")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border p-3 text-xs font-bold transition-all ${
                    selectedLanguage === "kz"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-dark-subtle text-soft-text dark:text-white hover:border-slate-300"
                  }`}
                >
                  <span>🇰🇿</span>
                  <span>Қазақша</span>
                </button>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-soft-text dark:text-slate-300 flex items-center gap-1.5">
                {currentTheme === "dark" ? <Moon size={14} className="text-indigo-400" /> : <Sun size={14} className="text-amber-500" />}
                <span>Тема оформления</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (currentTheme !== "dark") onToggleTheme();
                  }}
                  className={`flex items-center justify-center gap-2 rounded-2xl border p-3 text-xs font-bold transition-all ${
                    currentTheme === "dark"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-dark-subtle text-soft-text dark:text-white hover:border-slate-300"
                  }`}
                >
                  <Moon size={14} />
                  <span>Тёмная тема</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (currentTheme !== "light") onToggleTheme();
                  }}
                  className={`flex items-center justify-center gap-2 rounded-2xl border p-3 text-xs font-bold transition-all ${
                    currentTheme === "light"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-dark-subtle text-soft-text dark:text-white hover:border-slate-300"
                  }`}
                >
                  <Sun size={14} />
                  <span>Светлая тема</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Mentor Character Style */}
        {step === 2 && (
          <div className="space-y-5 animate-slide-up">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-soft-text dark:text-white">
                Характер Кибер-Маскота
              </h3>
              <p className="text-xs text-soft-muted dark:text-slate-400">
                Выберите, в каком тоне наш маскот будет давать подсказки в симуляторе диалогов.
              </p>
            </div>

            <div className="space-y-2.5">
              {MENTOR_LIST.map((m) => {
                const isSelected = selectedStyle === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedStyle(m.id)}
                    className={`flex w-full items-start justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-1 ring-emerald-500"
                        : "border-slate-200 dark:border-dark-border bg-slate-50/40 dark:bg-dark-subtle hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-soft-text dark:text-white">
                          {m.name}
                        </span>
                        {m.id === "strict" && (
                          <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 text-[9px] font-bold">
                            Zero Trust
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-soft-muted dark:text-slate-400 leading-snug">
                        {m.tagline}
                      </p>
                    </div>

                    <div
                      className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center mt-0.5 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Platform Navigation Guide */}
        {step === 3 && (
          <div className="space-y-4 animate-slide-up">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-soft-text dark:text-white">
                Куда заходить и как обучаться? 🗺️
              </h3>
              <p className="text-xs text-soft-muted dark:text-slate-400">
                Краткий обзор 4 главных разделов платформы CyberDesk:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-2xl border border-slate-100 dark:border-dark-border bg-slate-50/60 dark:bg-dark-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <LayoutDashboard size={15} />
                  <span className="text-xs font-bold text-soft-text dark:text-white">
                    1. Главная (6 этапов)
                  </span>
                </div>
                <p className="text-[10px] text-soft-muted dark:text-slate-400 leading-relaxed">
                  Пошаговая цепочка из 6 этапов: Kaspi, eGov, Telegram, звонки. Проходите уроки и открывайте новые уровни!
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-dark-border bg-slate-50/60 dark:bg-dark-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-500 dark:text-indigo-400">
                  <Swords size={15} />
                  <span className="text-xs font-bold text-soft-text dark:text-white">
                    2. Тренировки
                  </span>
                </div>
                <p className="text-[10px] text-soft-muted dark:text-slate-400 leading-relaxed">
                  Чистая практика без риска: свободный выбор любого сценария диалога с мошенником для набора боевого XP.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-dark-border bg-slate-50/60 dark:bg-dark-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400">
                  <BookOpen size={15} />
                  <span className="text-xs font-bold text-soft-text dark:text-white">
                    3. База знаний
                  </span>
                </div>
                <p className="text-[10px] text-soft-muted dark:text-slate-400 leading-relaxed">
                  Чек-листы, памятки и экстренные SOS-алгоритмы на случай звонка лже-следователя или утечки данных.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-dark-border bg-slate-50/60 dark:bg-dark-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400">
                  <User size={15} />
                  <span className="text-xs font-bold text-soft-text dark:text-white">
                    4. Профиль & Бот
                  </span>
                </div>
                <p className="text-[10px] text-soft-muted dark:text-slate-400 leading-relaxed">
                  Настройки наставника, магазин бонусов, аналитика серии и интерактивный чат-бот службы поддержки.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2)}
              className="text-xs font-bold text-slate-400 hover:text-soft-text dark:hover:text-white px-3 py-2 transition-colors"
            >
              ← Назад
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition-all ml-auto"
          >
            <span>{step === 3 ? "Начать обучение 🚀" : "Далее"}</span>
            {step < 3 && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};
