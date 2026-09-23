import React, { useState } from "react";
import { ShieldCheck, ChevronDown, LogOut } from "lucide-react";
import { UserProfile } from "@/lib/cyberhaven-data";
import { CharacterAvatar } from "./Avatars";
import { FlameIcon, ZapIcon, GemIcon } from "./SvgIcons";

import { Language } from "@/lib/i18n";

interface StatusBarProps {
  user: UserProfile;
  onPillClick: (type: "streak" | "xp" | "gems") => void;
  language?: Language;
  onSelectLanguage?: (lang: Language) => void;
  onLogout?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  user,
  onPillClick,
  language = "ru",
  onSelectLanguage,
  onLogout,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeBounce, setActiveBounce] = useState<string | null>(null);

  const triggerBounce = (type: "streak" | "xp" | "gems") => {
    setActiveBounce(type);
    onPillClick(type);
    setTimeout(() => setActiveBounce(null), 350);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-soft-border dark:border-dark-border bg-white/95 dark:bg-dark-card/95 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]">
      <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-2">
        {/* Brand & Language Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
              <ShieldCheck size={16} strokeWidth={2.4} />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-soft-text dark:text-white hidden min-[360px]:inline">
              CyberDesk
            </span>
          </div>

          {onSelectLanguage && (
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-dark-subtle p-0.5 text-[10px] font-bold">
              {(["kz", "ru", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onSelectLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded uppercase transition-colors ${
                    language === lang
                      ? "bg-emerald-500 text-white"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tappable Pills (Streak, XP, Gems) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Streak Pill */}
          <button
            onClick={() => triggerBounce("streak")}
            title="Текущая серия обучения в днях"
            className={`flex items-center gap-1 rounded-full border border-soft-honey/30 dark:border-amber-800/40 bg-soft-honey-light dark:bg-amber-950/40 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-bold text-soft-honey-dark dark:text-amber-300 shadow-sm transition-transform active:scale-95 ${
              activeBounce === "streak" ? "scale-110" : ""
            }`}
          >
            <FlameIcon size={12} className="text-soft-honey" />
            <span>{user.streak}</span>
          </button>

          {/* XP Pill */}
          <button
            onClick={() => triggerBounce("xp")}
            title="Всего очков опыта"
            className={`flex items-center gap-1 rounded-full border border-soft-lavender/30 dark:border-indigo-800/40 bg-soft-lavender-light dark:bg-indigo-950/40 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-bold text-soft-lavender-dark dark:text-indigo-300 shadow-sm transition-transform active:scale-95 ${
              activeBounce === "xp" ? "scale-110" : ""
            }`}
          >
            <ZapIcon size={12} className="text-soft-lavender" />
            <span>{user.xp}</span>
          </button>

          {/* Gems Pill */}
          <button
            onClick={() => triggerBounce("gems")}
            title="Баланс кристаллов"
            className={`flex items-center gap-1 rounded-full border border-soft-sage/30 dark:border-emerald-800/40 bg-soft-sage-light dark:bg-emerald-950/40 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-bold text-soft-sage-dark dark:text-emerald-300 shadow-sm transition-transform active:scale-95 ${
              activeBounce === "gems" ? "scale-110" : ""
            }`}
          >
            <GemIcon size={12} className="text-soft-sage" />
            <span>{user.gems}</span>
          </button>

          {/* Single User Profile Menu */}
          <div className="relative ml-0.5">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-soft-border dark:border-dark-border bg-white dark:bg-dark-card p-0.5 sm:px-1.5 sm:py-0.5 text-xs font-medium text-soft-text dark:text-white shadow-sm hover:bg-soft-canvas dark:hover:bg-dark-subtle transition-colors"
            >
              <CharacterAvatar type={user.avatar} size="sm" className="!w-6 !h-6 !rounded-full" />
              <ChevronDown size={11} className="text-soft-muted dark:text-slate-400 hidden sm:inline" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-soft-border dark:border-dark-border bg-white dark:bg-dark-card p-2 shadow-xl z-50 animate-slide-up">
                <div className="px-3 py-2 border-b border-soft-border dark:border-dark-border">
                  <p className="text-xs font-bold text-soft-text dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-soft-muted dark:text-slate-400">
                    Уровень {user.level} • {user.levelTitle}
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onLogout?.();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <LogOut size={14} />
                    <span>Выйти из аккаунта</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
