import React from "react";
import {
  Check,
  Lock,
  Play,
  Award,
  Target,
  BookOpen,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";
import { UserProfile, SKILL_TIERS, SkillNode, SkillTier } from "@/lib/cyberhaven-data";
import { CharacterAvatar } from "../Avatars";
import { getScenarioByNodeId, ROLEPLAY_SCENARIOS } from "@/lib/roleplay-scenarios";

import { Language, TRANSLATIONS } from "@/lib/i18n";

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  xp: number;
}

interface HomeScreenProps {
  user: UserProfile;
  skillTiers?: SkillTier[];
  activityHistory?: ActivityItem[];
  isDesktop?: boolean;
  language?: Language;
  onStartDailyFocus: () => void;
  onNodeClick: (node: SkillNode) => void;
  onViewAllClick: () => void;
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  { id: "act-1", title: "Безопасные ссылки", time: "Вчера", xp: 120 },
  { id: "act-2", title: "Пароли и 2FA", time: "2 дня назад", xp: 100 },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  skillTiers,
  activityHistory = DEFAULT_ACTIVITIES,
  isDesktop = false,
  language = "ru",
  onStartDailyFocus,
  onNodeClick,
  onViewAllClick,
}) => {
  const t = TRANSLATIONS[language]?.home || TRANSLATIONS.ru.home;
  const tiers = skillTiers || SKILL_TIERS;

  // Find active node for dynamic Daily Focus
  let activeNode: SkillNode | undefined;
  let activeTier: SkillTier | undefined;
  let activeTierIndex = 0;

  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    const found = t.nodes.find((n) => n.state === "active");
    if (found) {
      activeNode = found;
      activeTier = t;
      activeTierIndex = i;
      break;
    }
  }

  const activeScenario = activeNode
    ? getScenarioByNodeId(activeNode.id)
    : ROLEPLAY_SCENARIOS[0];

  const stageCompletedCount = activeTier
    ? activeTier.nodes.filter((n) => n.state === "completed").length
    : 0;
  const stageTotalCount = activeTier ? activeTier.nodes.length : 1;
  const stageProgressPercent = Math.round((stageCompletedCount / stageTotalCount) * 100);

  // 1. Quick Stats Component
  const QuickStats = (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
      <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-3 sm:p-3.5 shadow-xs text-center">
        <div className="mb-1 sm:mb-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
          <BookOpen size={16} />
        </div>
        <span className="text-base sm:text-lg font-black text-soft-text dark:text-white leading-tight">
          {user.lessonsDone}
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-soft-muted dark:text-slate-400 leading-tight">
          Уроков пройдено
        </span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-3 sm:p-3.5 shadow-xs text-center">
        <div className="mb-1 sm:mb-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
          <Target size={16} />
        </div>
        <span className="text-base sm:text-lg font-black text-soft-text dark:text-white leading-tight">
          {user.accuracy}%
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-soft-muted dark:text-slate-400 leading-tight">
          Точность ответов
        </span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-3 sm:p-3.5 shadow-xs text-center">
        <div className="mb-1 sm:mb-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
          <Award size={16} />
        </div>
        <span className="text-base sm:text-lg font-black text-soft-text dark:text-white leading-tight">
          {user.badges}
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-soft-muted dark:text-slate-400 leading-tight">
          Бейджей получено
        </span>
      </div>
    </div>
  );

  // 2. Dynamic Daily Focus Card Component
  const DailyFocusCard = (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
          фокус дня
        </span>
        <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40">
          Этап 0{activeTierIndex + 1}
        </span>
        <span className="rounded-full bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40">
          {activeScenario.difficulty || "Средний"}
        </span>
      </div>

      <div>
        <h2 className="text-sm sm:text-base font-bold text-soft-text dark:text-white leading-snug">
          {activeScenario.title}
        </h2>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-soft-muted dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            ~5 минут
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <Zap size={13} className="text-emerald-500 fill-emerald-500" />
            +{activeNode?.xp || activeScenario.rewardXp} XP
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] font-semibold text-soft-muted dark:text-slate-400">
          <span>Прогресс текущего этапа</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{stageProgressPercent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-dark-subtle">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${stageProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onStartDailyFocus}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 py-3 text-sm font-bold text-white shadow-xs transition-all"
      >
        <Play size={15} fill="white" />
        <span>Запустить симуляцию урока</span>
      </button>
    </div>
  );

  // 3. Leaderboard Card
  const LeaderboardCard = (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border pb-2.5">
        <h3 className="text-sm font-bold text-soft-text dark:text-white">Таблица лидеров</h3>
        <span className="text-[11px] font-semibold text-soft-muted dark:text-slate-400">Лига Рубин</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-subtle transition-colors">
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-xs text-soft-muted dark:text-slate-400">1</span>
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center text-xs font-bold">
              👨‍💼
            </div>
            <span className="text-xs font-bold text-soft-text dark:text-white">Данияр</span>
          </div>
          <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">1680 XP</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/80 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-xs text-emerald-600 dark:text-emerald-400">2</span>
            <CharacterAvatar type={user.avatar} size="sm" className="!w-8 !h-8 !rounded-full" />
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {user.name} (Вы)
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{user.xp} XP</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-subtle transition-colors">
          <div className="flex items-center gap-3">
            <span className="w-4 text-center font-bold text-xs text-soft-muted dark:text-slate-400">3</span>
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center text-xs font-bold">
              👩‍💻
            </div>
            <span className="text-xs font-bold text-soft-text dark:text-white">Мадина</span>
          </div>
          <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">1390 XP</span>
        </div>
      </div>
    </div>
  );

  // 4. Dynamic Recent Activity Card
  const RecentActivityCard = (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-soft-text dark:text-white">Недавняя активность</h3>
        <button
          onClick={onViewAllClick}
          className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <span>Вся история</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="space-y-2.5">
        {activityHistory.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 dark:bg-dark-subtle border border-slate-100 dark:border-dark-border transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <p className="text-xs font-bold text-soft-text dark:text-white">{item.title}</p>
                <p className="text-[10px] text-soft-muted dark:text-slate-400">
                  Завершено • {item.time}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/40 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
              +{item.xp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // 5. Render Stage Card (Shared between Desktop & Mobile)
  const renderStageCard = (tier: SkillTier, stageIdx: number) => {
    const completedNodes = tier.nodes.filter((n) => n.state === "completed").length;
    const totalNodes = tier.nodes.length;
    const isCompleted = completedNodes === totalNodes;
    const hasActiveNode = tier.nodes.some((n) => n.state === "active");
    const progressPercent = Math.round((completedNodes / totalNodes) * 100);

    return (
      <div
        key={tier.id}
        className={`rounded-3xl border bg-white dark:bg-dark-card p-5 sm:p-6 shadow-xs space-y-4 sm:space-y-5 transition-all ${
          hasActiveNode
            ? "border-emerald-500/50 ring-2 ring-emerald-500/10 dark:ring-emerald-500/5"
            : isCompleted
            ? "border-emerald-500/20 bg-emerald-500/[0.015]"
            : "border-slate-100 dark:border-dark-border"
        }`}
      >
        {/* Stage Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                ЭТАП 0{stageIdx + 1}: {tier.title.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-soft-muted dark:text-slate-400 mt-0.5">
              {tier.subtitle}
            </p>
          </div>

          <div>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 px-2.5 py-0.5 text-[10px] font-bold">
                <Check size={12} strokeWidth={2.5} />
                <span>{t.completed} 100%</span>
              </span>
            ) : hasActiveNode ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[10px] font-bold shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                <span>{t.inProgress} • {completedNodes}/{totalNodes}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-dark-subtle text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-dark-border px-2.5 py-0.5 text-[10px] font-bold">
                <Lock size={11} />
                <span>{t.locked}</span>
              </span>
            )}
          </div>
        </div>

        {/* Stage Progress Bar with clear metric */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-soft-muted dark:text-slate-400">
            <span>{t.stageProgress}</span>
            <span
              className={
                isCompleted
                  ? "font-bold text-emerald-600 dark:text-emerald-400"
                  : hasActiveNode
                  ? "font-bold text-soft-text dark:text-white"
                  : "text-slate-400"
              }
            >
              {completedNodes}/{totalNodes} ({progressPercent}%)
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-dark-subtle">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted
                  ? "bg-emerald-500"
                  : hasActiveNode
                  ? "bg-emerald-500/80"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Nodes Chain */}
        <div className="flex items-center justify-around sm:justify-start sm:gap-8 pt-3 pb-1 px-1">
          {tier.nodes.map((node, nodeIdx) => {
            const isNodeCompleted = node.state === "completed";
            const isNodeActive = node.state === "active";

            return (
              <React.Fragment key={node.id}>
                {/* Connector line between nodes */}
                {nodeIdx > 0 && (
                  <div
                    className={`flex-1 sm:max-w-[70px] border-t-2 border-dashed mx-2 transition-colors ${
                      isNodeCompleted
                        ? "border-emerald-500/60"
                        : isNodeActive
                        ? "border-emerald-500/40"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  />
                )}

                {/* Node Item */}
                <div className="flex flex-col items-center text-center space-y-1.5">
                  {isNodeCompleted ? (
                    <button
                      type="button"
                      onClick={() => onNodeClick(node)}
                      className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10 text-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
                      title={`${node.label} (Пройдено, нажмите для повтора)`}
                    >
                      <Check size={22} strokeWidth={3} />
                    </button>
                  ) : isNodeActive ? (
                    <button
                      type="button"
                      onClick={() => onNodeClick(node)}
                      className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-500/20 ring-offset-2 ring-offset-white dark:ring-offset-dark-card hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title={`${node.label} (Нажмите, чтобы начать)`}
                    >
                      <Play size={20} fill="white" className="ml-0.5" />
                    </button>
                  ) : (
                    <div
                      className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-dark-subtle border border-slate-200 dark:border-dark-border text-slate-400 opacity-60 cursor-not-allowed"
                      title={`${node.label} (Заблокировано)`}
                    >
                      <Lock size={18} />
                    </div>
                  )}

                  <div className="max-w-[120px]">
                    <p
                      className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-1 ${
                        isNodeActive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : isNodeCompleted
                          ? "text-soft-text dark:text-white"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {node.label}
                    </p>
                    <span
                      className={`text-[10px] font-semibold leading-tight ${
                        isNodeActive
                          ? "text-emerald-600 dark:text-emerald-400 font-bold"
                          : isNodeCompleted
                          ? "text-emerald-500"
                          : "text-slate-400 dark:text-slate-600"
                      }`}
                    >
                      {isNodeCompleted ? "Пройдено" : isNodeActive ? `+${node.xp} XP` : "Заблокировано"}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`mx-auto pb-24 ${isDesktop ? "w-full max-w-[1560px] px-6 lg:px-10 xl:px-12 py-6" : "max-w-md w-full px-4 py-4"}`}>
      {/* Personalized Greeting */}
      <div className="space-y-1 mb-5 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-soft-text dark:text-white">
          С возвращением, {user.name}!
        </h1>
        <p className="text-xs sm:text-sm text-soft-muted dark:text-slate-400">
          6 практических этапов кибербезопасности: защита от мошенников в Kaspi, eGov, Telegram и звонках.
        </p>
      </div>

      {isDesktop ? (
        /* ========================================================
            DESKTOP VIEW (Two column layout with all 6 stages)
        ======================================================== */
        <div className="grid grid-cols-12 gap-6 items-start w-full">
          {/* Left Column: All 6 Stages + Recent Activity */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7 2xl:col-span-8 space-y-5">
            <div className="space-y-4">
              {tiers.map((tier, idx) => renderStageCard(tier, idx))}
            </div>

            {/* Recent Activity Card */}
            {RecentActivityCard}
          </div>

          {/* Right Column: Quick Stats + Focus Card + Leaderboard */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5 2xl:col-span-4 space-y-5">
            {QuickStats}
            {DailyFocusCard}
            {LeaderboardCard}
          </div>
        </div>
      ) : (
        /* ========================================================
            MOBILE VIEW (Single column flow)
        ======================================================== */
        <div className="space-y-4">
          {QuickStats}
          {DailyFocusCard}

          {/* 6 Stages List */}
          <div className="space-y-3.5 pt-1">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-soft-muted dark:text-slate-400">
                Этапы обучения (6 этапов)
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {tiers.filter((t) => t.nodes.every((n) => n.state === "completed")).length} из 6 завершено
              </span>
            </div>

            {tiers.map((tier, idx) => renderStageCard(tier, idx))}
          </div>

          {/* Recent Activity */}
          {RecentActivityCard}
        </div>
      )}
    </div>
  );
};
