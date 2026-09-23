import React from "react";
import { LayoutDashboard, Swords, BookOpen, User } from "lucide-react";
import { Language, TRANSLATIONS } from "@/lib/i18n";

export type NavTab = "home" | "training" | "knowledge" | "profile";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  hasTrainingNotification?: boolean;
  isPhoneFrame?: boolean;
  language?: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  hasTrainingNotification = true,
  isPhoneFrame = false,
  language = "ru",
}) => {
  const t = TRANSLATIONS[language]?.nav || TRANSLATIONS.ru.nav;

  return (
    <nav
      className={`${
        isPhoneFrame
          ? "sticky bottom-0 z-40 w-full shrink-0 border-t border-soft-border dark:border-dark-border bg-white/95 dark:bg-dark-card/95 backdrop-blur-md pb-3 pt-1"
          : "fixed bottom-0 left-0 right-0 z-40 border-t border-soft-border dark:border-dark-border bg-white/95 dark:bg-dark-card/95 backdrop-blur-md pb-[max(env(safe-area-inset-bottom,0px),0.5rem)] pt-1"
      }`}
    >
      <div className="flex items-center justify-around px-2">
        {/* Home */}
        <button
          onClick={() => onTabChange("home")}
          className={`flex min-w-[56px] sm:min-w-[64px] flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all active:scale-95 ${
            activeTab === "home"
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <div
            className={`p-1.5 rounded-2xl transition-colors ${
              activeTab === "home" ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" : ""
            }`}
          >
            <LayoutDashboard size={19} />
          </div>
          <span className="text-[10px]">{t.home}</span>
        </button>

        {/* Training */}
        <button
          onClick={() => onTabChange("training")}
          className={`relative flex min-w-[56px] sm:min-w-[64px] flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all active:scale-95 ${
            activeTab === "training"
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <div
            className={`relative p-1.5 rounded-2xl transition-colors ${
              activeTab === "training" ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" : ""
            }`}
          >
            <Swords size={19} />
            {hasTrainingNotification && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-dark-card" />
            )}
          </div>
          <span className="text-[10px]">{t.training}</span>
        </button>

        {/* Knowledge */}
        <button
          onClick={() => onTabChange("knowledge")}
          className={`flex min-w-[56px] sm:min-w-[64px] flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all active:scale-95 ${
            activeTab === "knowledge"
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <div
            className={`p-1.5 rounded-2xl transition-colors ${
              activeTab === "knowledge" ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" : ""
            }`}
          >
            <BookOpen size={19} />
          </div>
          <span className="text-[10px]">{t.knowledge}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onTabChange("profile")}
          className={`flex min-w-[56px] sm:min-w-[64px] flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all active:scale-95 ${
            activeTab === "profile"
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <div
            className={`p-1.5 rounded-2xl transition-colors ${
              activeTab === "profile" ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" : ""
            }`}
          >
            <User size={19} />
          </div>
          <span className="text-[10px]">{t.profile}</span>
        </button>
      </div>
    </nav>
  );
};
