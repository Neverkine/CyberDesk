import React from "react";
import { ShieldCheck, Sparkles, ArrowRight, Globe } from "lucide-react";
import { Language, TRANSLATIONS } from "@/lib/i18n";

interface WelcomeScreenProps {
  isOpen: boolean;
  onContinue: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  isOpen,
  onContinue,
  language,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language].welcome;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "kz", label: "Қазақша", flag: "🇰🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200/20 dark:border-dark-border bg-white dark:bg-[#131F24] p-6 sm:p-10 shadow-2xl text-center space-y-6 overflow-hidden">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
          <ShieldCheck size={36} strokeWidth={2.4} />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles size={13} />
            <span>CyberDesk v1.0</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {t.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <Globe size={13} />
            <span>{t.chooseLang}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onSelectLanguage(lang.code)}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl border py-2.5 px-2 text-xs font-bold transition-all active:scale-95 ${
                    active
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1A262C] text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onContinue}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 py-3.5 px-6 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all"
          >
            <span>{t.cta}</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
