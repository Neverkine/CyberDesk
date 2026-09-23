import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  Check,
  MoreVertical,
  Link2,
  Ban,
  CreditCard,
} from "lucide-react";
import {
  RoleplayScenario,
  ROLEPLAY_SCENARIOS,
  RoleplayChoice,
  getScenarioById,
  ORDERED_STAGE_NODE_IDS,
  STAGE_NODE_TO_SCENARIO,
  SCENARIO_TO_STAGE_NODE,
  getNextStageNodeId,
} from "@/lib/roleplay-scenarios";
import { Mentor, UserProfile } from "@/lib/cyberhaven-data";
import { CharacterAvatar } from "./Avatars";
import { ZapIcon, GemIcon } from "./SvgIcons";

interface RoleplayChatSimulatorProps {
  mentor: Mentor;
  user: UserProfile;
  initialScenarioId?: string;
  onClose: () => void;
  onAwardXp: (xp: number, gems: number) => void;
  onCompleteLesson?: (scenarioId: string, earnedXp: number, earnedGems: number) => void;
  onSelectNextScenario?: (scenarioId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: "attacker" | "user";
  text: string;
  attachment?: {
    type: "link" | "image" | "file";
    text: string;
    title?: string;
    domain?: string;
    subtitle?: string;
  };
  timestamp: string;
}

export const RoleplayChatSimulator: React.FC<RoleplayChatSimulatorProps> = ({
  mentor,
  user,
  initialScenarioId = "passwords-scam",
  onClose,
  onAwardXp,
  onCompleteLesson,
  onSelectNextScenario,
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(initialScenarioId);
  const [currentStepId, setCurrentStepId] = useState<string>("step-1");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [consequenceData, setConsequenceData] = useState<RoleplayChoice["consequence"] | null>(null);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [victoryText, setVictoryText] = useState<string>("");
  const [showMentorTip, setShowMentorTip] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenario =
    ROLEPLAY_SCENARIOS.find((s) => s.id === activeScenarioId) ||
    ROLEPLAY_SCENARIOS[0];

  const currentStep = scenario.steps[currentStepId] || scenario.steps[scenario.initialStepId];

  // Initialize scenario
  useEffect(() => {
    setCurrentStepId(scenario.initialStepId);
    setConsequenceData(null);
    setIsVictory(false);
    setVictoryText("");
    setIsTyping(true);

    const initialStep = scenario.steps[scenario.initialStepId];
    const timer = setTimeout(() => {
      const initMsgs: ChatMessage[] = [
        {
          id: "msg-0",
          sender: "attacker",
          text: initialStep.attackerMessage,
          attachment: initialStep.attackerAttachment,
          timestamp: scenario.id === "kaspi-security-fake" ? "14:32" : "сейчас",
        },
      ];
      if (scenario.id === "kaspi-security-fake") {
        initMsgs.push({
          id: "msg-user-init",
          sender: "user",
          text: "А как я могу проверить вашу личность?",
          timestamp: "14:33",
        });
      }
      setMessages(initMsgs);
      setIsTyping(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [activeScenarioId]);

  // Auto scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSelectChoice = (choice: RoleplayChoice) => {
    // Append user message
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const updated = [
      ...messages,
      {
        id: "msg-" + Date.now(),
        sender: "user" as const,
        text: choice.text,
        timestamp: timeStr,
      },
    ];
    setMessages(updated);

    if (choice.isDangerous && choice.consequence) {
      // Trigger Consequence Simulation!
      setConsequenceData(choice.consequence);
      return;
    }

    if (choice.isVictory) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#52B788", "#7E8CE0", "#F4A261"],
      });
      setIsVictory(true);
      setVictoryText(choice.victoryText || "Вы успешно распознали угрозу и нейтрализовали мошенника!");
      if (onCompleteLesson) {
        onCompleteLesson(scenario.id, scenario.rewardXp, scenario.rewardGems);
      } else {
        onAwardXp(scenario.rewardXp, scenario.rewardGems);
      }
      return;
    }

    if (choice.nextStepId) {
      setCurrentStepId(choice.nextStepId);
      const nextStep = scenario.steps[choice.nextStepId];
      if (nextStep) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "msg-" + Date.now(),
              sender: "attacker",
              text: nextStep.attackerMessage,
              attachment: nextStep.attackerAttachment,
              timestamp: "сейчас",
            },
          ]);
          setIsTyping(false);
        }, 1100);
      }
    }
  };

  const handleRewind = () => {
    setConsequenceData(null);
    setCurrentStepId(scenario.initialStepId);
    const initialStep = scenario.steps[scenario.initialStepId];
    setMessages([
      {
        id: "msg-init-" + Date.now(),
        sender: "attacker",
        text: initialStep.attackerMessage,
        attachment: initialStep.attackerAttachment,
        timestamp: "сейчас",
      },
    ]);
  };

  const mentorAdvice = (() => {
    let rawTip = "";
    if (currentStep?.mentorTips) {
      if (currentStep.mentorTips[mentor.id]) {
        rawTip = currentStep.mentorTips[mentor.id];
      } else if (mentor.id === "strict") {
        rawTip = currentStep.mentorTips["cyber"] || currentStep.mentorTips["strict"] || Object.values(currentStep.mentorTips)[0];
      } else if (mentor.id === "gentle") {
        rawTip = currentStep.mentorTips["gentle"] || currentStep.mentorTips["elliot"] || Object.values(currentStep.mentorTips)[0];
      } else if (mentor.id === "tutor") {
        rawTip = currentStep.mentorTips["tutor"] || currentStep.mentorTips["senku"] || Object.values(currentStep.mentorTips)[0];
      } else {
        rawTip = Object.values(currentStep.mentorTips)[0];
      }
    } else {
      rawTip = "Будьте внимательны к подозрительным деталям этого сообщения.";
    }

    if (mentor.id === "strict") {
      return `🛡️ [Zero Trust]: ${rawTip}`;
    }
    if (mentor.id === "gentle") {
      return `💚 [Поддержка]: ${rawTip}`;
    }
    if (mentor.id === "tutor") {
      return `💡 [Аналитика]: ${rawTip}`;
    }
    return `⚡ [${mentor.name}]: ${rawTip}`;
  })();

  const mentorVictoryQuote = (() => {
    if (mentor.id === "strict") {
      return "Протокол безопасности соблюден безупречно. Нулевое доверие к неизвестным источникам спасло ваши данные.";
    }
    if (mentor.id === "gentle") {
      return "Отлично сработано! Главное — без паники и спешки. Вы поступили очень мудро.";
    }
    if (mentor.id === "tutor") {
      return "Точный разбор! Вы верно распознали паттерн социальной инженерии и обезвредили мошенника.";
    }
    return `${mentor.tagline || "Отличная реакция и безупречная цифровая гигиена!"}`;
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
      <div className="relative w-full h-full sm:h-[860px] sm:max-h-[94vh] sm:max-w-[430px] flex flex-col overflow-hidden sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 dark:sm:border-slate-900 bg-white dark:bg-[#131F24] text-soft-text dark:text-white shadow-2xl transition-colors">
        {/* Dynamic Island on Desktop */}
        <div className="hidden sm:flex items-center justify-center pt-2 pb-0.5 bg-white dark:bg-[#131F24] shrink-0 border-b border-slate-100 dark:border-transparent">
          <div className="h-3.5 w-24 rounded-full bg-slate-900 flex items-center justify-end px-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-800 border border-slate-700" />
          </div>
        </div>

        {/* 1. Messenger Header (Kaspi / Telegram / WhatsApp style) */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 dark:border-[#263842] bg-white/95 dark:bg-[#131F24] px-3.5 py-2.5 shadow-xs pt-[max(env(safe-area-inset-top,0px),0.5rem)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              title="Вернуться назад"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Attacker Avatar & Verified Badge */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-md shadow-red-950/20">
                <ShieldAlert size={20} className="text-white" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#131F24]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold leading-tight text-soft-text dark:text-white">
                    {scenario.attackerName}
                  </h2>
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0EA5E9] text-white shadow-xs">
                    <Check size={10} strokeWidth={3.5} />
                  </span>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium leading-none mt-0.5">
                  {scenario.attackerSubtitle || "в сети"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={onClose}
              title="Опции"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </header>

        {/* 2. Tactical Mentor Advisor Banner */}
        <div className="border-b border-emerald-100 dark:border-[#143B3E] bg-emerald-50/80 dark:bg-[#0C2426] px-3.5 py-2.5 shadow-xs transition-all">
          <div className="flex items-center gap-2.5">
            <CharacterAvatar
              type={mentor.avatar}
              size="sm"
              className="!w-7 !h-7 rounded-full overflow-hidden border border-emerald-500/40 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 leading-tight">
                {mentor.name}
              </div>
              <p className="text-xs text-emerald-800 dark:text-[#2DD4BF] leading-snug font-medium line-clamp-2">
                {mentorAdvice}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Messages Scroll Stream */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F8F9FA] dark:bg-[#131F24]">
        {messages.map((msg) => {
          const isAttacker = msg.sender === "attacker";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAttacker ? "items-start" : "items-end"} animate-slide-up space-y-2`}
            >
              <div
                className={`max-w-[86%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                  isAttacker
                    ? "rounded-tl-none bg-white dark:bg-[#1B2A32] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263842]"
                    : "rounded-tr-none bg-emerald-500 text-white font-medium shadow-xs"
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`mt-1 flex items-center justify-end gap-1 text-[9px] ${
                    isAttacker ? "text-slate-400 dark:text-slate-400" : "text-white/80"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isAttacker && <Check size={11} strokeWidth={2.5} />}
                </div>
              </div>

              {/* Red Flag Attachment Card (Figma Screenshot 2) */}
              {isAttacker && msg.attachment && (
                <div className="w-full max-w-[86%] rounded-2xl border border-rose-300 dark:border-rose-500/40 bg-rose-50/70 dark:bg-[#1C232B] p-3 text-xs text-slate-800 dark:text-slate-200 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-500">
                    <AlertTriangle size={15} className="shrink-0" />
                    <span>{msg.attachment.title || "ПОДОЗРИТЕЛЬНАЯ ССЫЛКА"}</span>
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white font-mono break-all">
                    {msg.attachment.domain || msg.attachment.text}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {msg.attachment.subtitle ||
                      "Фишинговый сайт, замаскированный под личный кабинет Kaspi.kz"}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-slate-200 dark:border-[#263842] bg-white dark:bg-[#1B2A32] px-3.5 py-2.5 shadow-xs w-fit animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Bottom Interactive Choice Deck (Exact match to Figma Screenshot 2) */}
      {!consequenceData && !isVictory && (
        <div className="border-t border-slate-200 dark:border-[#263842] bg-white dark:bg-[#131F24] p-3.5 space-y-2 pb-[max(env(safe-area-inset-bottom,0px),0.75rem)] shadow-lg">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            ВЫБЕРИТЕ ДЕЙСТВИЕ:
          </div>

          <div className="grid gap-2">
            {currentStep?.choices.map((choice) => {
              const isRecommended =
                choice.isVictory || choice.icon === "block" || choice.id === "c-block-contact";

              return (
                <button
                  key={choice.id}
                  disabled={isTyping}
                  onClick={() => handleSelectChoice(choice)}
                  className={`group relative flex w-full items-center gap-2.5 rounded-2xl p-3 text-left text-xs font-semibold transition-all active:scale-[0.98] disabled:opacity-50 ${
                    isRecommended
                      ? "border-2 border-emerald-500 bg-emerald-50/80 dark:bg-[#142B2C] text-emerald-800 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-[#193638]"
                      : "border border-slate-200 dark:border-[#263842] bg-slate-50/80 dark:bg-[#1B2A32] text-slate-800 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-[#20323C]"
                  }`}
                >
                  {choice.icon === "link" || choice.text.toLowerCase().includes("ссылк") ? (
                    <Link2
                      size={16}
                      className={isRecommended ? "text-emerald-600 dark:text-emerald-400 shrink-0" : "text-slate-500 dark:text-slate-400 shrink-0"}
                    />
                  ) : choice.icon === "block" || choice.isVictory || choice.text.toLowerCase().includes("заблокир") ? (
                    <Ban
                      size={16}
                      className={isRecommended ? "text-emerald-600 dark:text-emerald-400 shrink-0" : "text-slate-500 dark:text-slate-400 shrink-0"}
                    />
                  ) : choice.icon === "card" || choice.text.toLowerCase().includes("карт") ? (
                    <CreditCard
                      size={16}
                      className={isRecommended ? "text-emerald-600 dark:text-emerald-400 shrink-0" : "text-slate-500 dark:text-slate-400 shrink-0"}
                    />
                  ) : (
                    <Check
                      size={16}
                      className={isRecommended ? "text-emerald-600 dark:text-emerald-400 shrink-0" : "text-slate-500 dark:text-slate-400 shrink-0"}
                    />
                  )}
                  <span className="flex-1 leading-snug">{choice.text}</span>
                </button>
              );
            })}
          </div>

          <div className="h-1 w-32 bg-slate-200 dark:bg-slate-700/60 rounded-full mx-auto mt-2" />
        </div>
      )}

      {/* 5. Consequence Simulation Overlay ("Симуляция последствий") */}
      {consequenceData && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in p-3 sm:absolute sm:inset-0 sm:h-full sm:rounded-[32px]">
          {/* Simulated Push Notification Banner */}
          <div className="mb-3 animate-slide-up rounded-2xl border-2 border-rose-500 bg-white dark:bg-dark-card p-3.5 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
              <div className="flex items-center gap-1.5">
                <ShieldAlert size={16} />
                <span>{consequenceData.notificationTitle}</span>
              </div>
              <span className="text-[10px] text-soft-muted dark:text-slate-400">только что</span>
            </div>
            <p className="mt-1 text-xs font-bold text-soft-text dark:text-white leading-snug">
              {consequenceData.notificationBody}
            </p>
          </div>

          {/* Educational Post-Mortem Card */}
          <div className="rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-2xl space-y-4 animate-slide-up">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <ShieldAlert size={22} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Имитация последствий
                </span>
                <h3 className="text-base font-bold text-soft-text dark:text-white leading-snug">
                  {consequenceData.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-soft-muted dark:text-slate-400 leading-relaxed font-medium">
              {consequenceData.explanation}
            </p>

            {/* Golden Rule */}
            <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40 p-3 text-xs space-y-1">
              <div className="flex items-center gap-1 font-bold text-amber-800 dark:text-amber-300 text-[11px] uppercase tracking-wider">
                <Lightbulb size={13} />
                <span>Золотое правило защиты:</span>
              </div>
              <p className="text-[11px] text-soft-text dark:text-slate-200 font-medium leading-relaxed">
                {consequenceData.rule}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleRewind}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
              >
                <RotateCcw size={14} />
                <span>Попробовать снова</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-2xl border border-slate-200 dark:border-dark-border px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Victory Screen Overlay */}
      {isVictory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:absolute sm:inset-0 sm:h-full sm:rounded-[32px]">
          <div className="w-full max-w-sm rounded-3xl border border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-2xl text-center space-y-4 animate-slide-up">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <div className="space-y-1">
              <span className="inline-block rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                Угроза нейтрализована!
              </span>
              <h3 className="text-lg font-bold text-soft-text dark:text-white">Вы перехитрили мошенника!</h3>
            </div>

            <p className="text-xs text-soft-muted dark:text-slate-400 leading-relaxed font-medium">
              {victoryText}
            </p>

            {/* Mentor Reaction Box */}
            <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 p-3 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center gap-2.5 text-left">
              <CharacterAvatar type={mentor.avatar} size="sm" className="shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                  {mentor.name}
                </div>
                <div className="text-[11px] text-slate-700 dark:text-slate-300 italic leading-snug">
                  «{mentorVictoryQuote}»
                </div>
              </div>
            </div>

            {/* Reward badges */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                <ZapIcon size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>+{scenario.rewardXp} XP</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                <GemIcon size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>+{scenario.rewardGems} Кристаллов</span>
              </div>
            </div>

            {(() => {
              const currentNodeId = SCENARIO_TO_STAGE_NODE[scenario.id] || scenario.nodeId;
              const nextNodeId = currentNodeId ? getNextStageNodeId(currentNodeId) : null;
              const nextScenarioId = nextNodeId ? STAGE_NODE_TO_SCENARIO[nextNodeId] : null;
              const nextScenario = nextScenarioId ? getScenarioById(nextScenarioId) : null;

              return (
                <div className="flex flex-col gap-2 pt-2">
                  {nextScenario ? (
                    <button
                      onClick={() => {
                        if (nextScenarioId) {
                          setActiveScenarioId(nextScenarioId);
                          if (onSelectNextScenario) {
                            onSelectNextScenario(nextScenarioId);
                          }
                        }
                      }}
                      className="flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
                    >
                      <Sparkles size={14} />
                      <span className="line-clamp-1">Следующий урок: {nextScenario.title}</span>
                    </button>
                  ) : (
                    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 p-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                      Все 6 этапов успешно пройдены!
                    </div>
                  )}
                  <button
                    onClick={onClose}
                    className="rounded-2xl border border-slate-200 dark:border-dark-border px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
                  >
                    Вернуться в дашборд
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  </div>
  );
};
