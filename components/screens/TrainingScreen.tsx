import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  Search,
  X,
  ShieldAlert,
} from "lucide-react";
import { UserProfile, Mentor } from "@/lib/cyberhaven-data";
import {
  ROLEPLAY_SCENARIOS,
  ScenarioCategory,
} from "@/lib/roleplay-scenarios";
import { ZapIcon } from "../SvgIcons";

interface TrainingScreenProps {
  user: UserProfile;
  selectedMentor: Mentor;
  isDesktop?: boolean;
  onNavigateToProfileMentor: () => void;
  onAwardXp: (xp: number, gems: number) => void;
  onOpenRoleplay: (mentor: Mentor, scenarioId?: string) => void;
}

const CATEGORIES: { id: "all" | ScenarioCategory; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "fintech", label: "Kaspi & Банки" },
  { id: "egov", label: "eGov & 1414" },
  { id: "social", label: "Telegram & WhatsApp" },
  { id: "phone", label: "Звонки мошенников" },
  { id: "malware", label: "Вредоносный софт" },
  { id: "hygiene", label: "Цифровая гигиена" },
];

const DIFFICULTIES = [
  { id: "all", label: "Все уровни" },
  { id: "Легкий", label: "Легкие" },
  { id: "Средний", label: "Средние" },
  { id: "Сложный", label: "Сложные" },
];

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  user,
  selectedMentor,
  isDesktop = false,
  onNavigateToProfileMentor,
  onAwardXp,
  onOpenRoleplay,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<"all" | ScenarioCategory>("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("all");

  const filteredScenarios = useMemo(() => {
    return ROLEPLAY_SCENARIOS.filter((s) => {
      const matchCategory =
        activeCategory === "all" || s.category === activeCategory;
      const matchDifficulty =
        activeDifficulty === "all" || s.difficulty === activeDifficulty;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.attackerName.toLowerCase().includes(q) ||
        s.platform.toLowerCase().includes(q);

      return matchCategory && matchDifficulty && matchSearch;
    });
  }, [searchQuery, activeCategory, activeDifficulty]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveDifficulty("all");
  };

  return (
    <div className={`mx-auto pb-24 space-y-4 sm:space-y-5 ${isDesktop ? "w-full max-w-[1560px] px-6 lg:px-10 xl:px-12 py-6" : "max-w-md w-full px-4 py-4"}`}>
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Интерактивный симулятор
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-soft-text dark:text-white">
          Каталог тренировок
        </h1>
        <p className="text-xs text-soft-muted dark:text-slate-400">
          100% интерактивные диалоги: проверяй бдительность в реалистичном симуляторе
        </p>
      </div>

      {/* Mentor Banner */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-dark-border bg-white dark:bg-dark-card p-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-soft-text dark:text-white">
              Выбран: {selectedMentor.name.toLowerCase()}
            </span>
          </div>
          <p className="text-[10px] text-soft-muted dark:text-slate-400 mt-0.5">{selectedMentor.tagline}</p>
        </div>

        <button
          onClick={onNavigateToProfileMentor}
          className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline shrink-0 pl-2"
        >
          Сменить стиль
        </button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по темам (Kaspi, 1414, Telegram, трояны...)"
            className="w-full rounded-2xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card py-2.5 pl-10 pr-9 text-xs text-soft-text dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-dark-subtle"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setActiveDifficulty(diff.id)}
                className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
                  activeDifficulty === diff.id
                    ? "bg-emerald-500 dark:bg-emerald-600 text-white font-bold"
                    : "bg-slate-100 dark:bg-dark-subtle text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">
            {filteredScenarios.length} из {ROLEPLAY_SCENARIOS.length}
          </span>
        </div>
      </div>

      {/* Scenarios Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
      <div>
        {filteredScenarios.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card p-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-dark-subtle text-slate-400">
              <ShieldAlert size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-soft-text dark:text-white">Симуляции не найдены</h3>
              <p className="text-xs text-soft-muted dark:text-slate-400">
                Попробуйте изменить поисковый запрос или сбросить фильтры категорий
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className={isDesktop ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5" : "grid grid-cols-1 gap-3"}>
            {filteredScenarios.map((s) => (
              <div
                key={s.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-4 sm:p-5 shadow-xs transition-all hover:border-slate-200 dark:hover:border-slate-700 space-y-3"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 dark:bg-dark-subtle text-lg border border-slate-200 dark:border-dark-border shadow-inner">
                        <span>{s.attackerAvatar}</span>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-soft-text dark:text-white leading-snug line-clamp-1">
                          {s.title}
                        </h3>
                        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-soft-muted dark:text-slate-400 font-medium">
                          <span>{s.attackerName}</span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">{s.platform}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border shrink-0 ${
                        s.difficulty === "Легкий"
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40"
                          : s.difficulty === "Средний"
                          ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/40"
                          : "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/40"
                      }`}
                    >
                      {s.difficulty}
                    </span>
                  </div>

                  <p className="text-[11px] text-soft-muted dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                    {s.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-dark-border pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                      <ZapIcon size={13} className="text-emerald-500 dark:text-emerald-400" />
                      +{s.rewardXp} XP
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                      • Тренировка
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenRoleplay(selectedMentor, s.id)}
                    className="flex items-center gap-1.5 rounded-2xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 active:scale-95 transition-all"
                  >
                    <MessageSquare size={13} />
                    <span>Старт</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
