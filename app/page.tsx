"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  UserProfile,
  INITIAL_USER,
  INITIAL_SENIOR_USER,
  SkillNode,
  SkillTier,
  SKILL_TIERS,
  Mentor,
  MENTOR_LIST,
} from "@/lib/cyberhaven-data";
import {
  ROLEPLAY_SCENARIOS,
  getScenarioByNodeId,
  getScenarioById,
  ORDERED_STAGE_NODE_IDS,
  SCENARIO_TO_STAGE_NODE,
} from "@/lib/roleplay-scenarios";
import { StatusBar } from "@/components/StatusBar";
import { BottomNav, NavTab } from "@/components/BottomNav";
import { HomeScreen, ActivityItem } from "@/components/screens/HomeScreen";
import { TrainingScreen } from "@/components/screens/TrainingScreen";
import { KnowledgeScreen } from "@/components/screens/KnowledgeScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { RoleplayChatSimulator } from "@/components/RoleplayChatSimulator";
import { LoadingSplashScreen } from "@/components/LoadingSplashScreen";
import { AuthModal } from "@/components/AuthModal";
import { OnboardingModal } from "@/components/OnboardingModal";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Language, TRANSLATIONS } from "@/lib/i18n";
import { CharacterAvatar } from "@/components/Avatars";
import { FlameIcon, ZapIcon, GemIcon } from "@/components/SvgIcons";
import {
  Smartphone,
  Monitor,
  Copy,
  Check,
  Moon,
  Sun,
  LayoutDashboard,
  Swords,
  BookOpen,
  User,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Globe,
} from "lucide-react";

export default function CyberDeskApp() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>("ru");
  const [activeRoleplaySource, setActiveRoleplaySource] = useState<"stage" | "training">("stage");

  const [activityHistory, setActivityHistory] = useState<ActivityItem[]>([
    { id: "act-1", title: "Безопасные ссылки", time: "Вчера", xp: 120 },
    { id: "act-2", title: "Пароли и 2FA", time: "2 дня назад", xp: 100 },
  ]);

  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [copiedIp, setCopiedIp] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showDesktopUserDropdown, setShowDesktopUserDropdown] = useState(false);

  const [customMentor, setCustomMentor] = useState<{
    name: string;
    bio: string;
    style: string;
  } | null>(null);
  const [selectedMentorId, setSelectedMentorId] = useState<string>("strict");
  const [skillTiers, setSkillTiers] = useState<SkillTier[]>(SKILL_TIERS);
  const [activeScenarioId, setActiveScenarioId] = useState<string>("kaspi-qr-fraud");
  const [activeRoleplayMentor, setActiveRoleplayMentor] = useState<Mentor | null>(null);
  const phoneMainRef = useRef<HTMLElement>(null);
  const desktopMainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    phoneMainRef.current?.scrollTo({ top: 0, behavior: "instant" });
    desktopMainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("cyberdesk_theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    const savedLang = localStorage.getItem("cyberdesk_lang") as Language | null;
    if (savedLang && ["ru", "kz", "en"].includes(savedLang)) {
      setLanguage(savedLang);
    }

    const hasSeenWelcome = sessionStorage.getItem("cyberdesk_welcome_seen");
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }

    const savedUser = localStorage.getItem("cyberdesk_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {}
    }

    const savedTiers = localStorage.getItem("cyberdesk_tiers");
    if (savedTiers) {
      try {
        setSkillTiers(JSON.parse(savedTiers));
      } catch {}
    }

    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("cyberdesk_lang", lang);
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("cyberdesk_welcome_seen", "true");
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("cyberdesk_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  useEffect(() => {
    localStorage.setItem("cyberdesk_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("cyberdesk_tiers", JSON.stringify(skillTiers));
  }, [skillTiers]);

  const mentorsWithCustom: Mentor[] = [
    ...MENTOR_LIST,
    ...(customMentor
      ? [
          {
            id: "custom",
            name: customMentor.name,
            tagline: customMentor.style,
            role: "Кастомный наставник",
            avatar: "custom",
            isCustom: true,
          },
        ]
      : []),
  ];

  const currentMentor =
    mentorsWithCustom.find((m) => m.id === selectedMentorId) || mentorsWithCustom[0];

  const handlePillClick = () => {};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowDesktopUserDropdown(false);
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (user: UserProfile, isNewUser: boolean) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    if (isNewUser) {
      setShowOnboardingModal(true);
    }
  };

  const handleNodeClick = (node: SkillNode) => {
    if (node.state === "locked") {
      return;
    }

    setActiveRoleplaySource("stage");
    const scenario = getScenarioByNodeId(node.id);
    setActiveScenarioId(scenario.id);
    setActiveRoleplayMentor(currentMentor);
  };

  const handleStartDailyFocus = () => {
    let targetNode: SkillNode | undefined;
    for (const tier of skillTiers) {
      const active = tier.nodes.find((n) => n.state === "active");
      if (active) {
        targetNode = active;
        break;
      }
    }

    const scenario = targetNode
      ? getScenarioByNodeId(targetNode.id)
      : ROLEPLAY_SCENARIOS[0];

    setActiveRoleplaySource("stage");
    setActiveScenarioId(scenario.id);
    setActiveRoleplayMentor(currentMentor);
  };

  const handleCompleteLesson = (scenarioId: string, earnedXp: number, earnedGems: number) => {
    const scenario = getScenarioById(scenarioId);
    const completedNodeId =
      SCENARIO_TO_STAGE_NODE[scenarioId] ||
      scenario.nodeId ||
      scenarioId;

    setSkillTiers((prevTiers) => {
      const completedIndex = ORDERED_STAGE_NODE_IDS.indexOf(completedNodeId);

      if (completedIndex === -1) {
        return prevTiers;
      }

      const allFlatNodes = prevTiers.flatMap((tier) => tier.nodes);
      const currentActiveIndex = allFlatNodes.findIndex((n) => n.state === "active");

      if (
        activeRoleplaySource === "training" &&
        currentActiveIndex !== -1 &&
        completedIndex > currentActiveIndex
      ) {
        return prevTiers;
      }

      const highestCompletedIndex = Math.max(
        ...allFlatNodes.map((n) => (n.state === "completed" ? ORDERED_STAGE_NODE_IDS.indexOf(n.id) : -1))
      );
      const newCompletedIndex = Math.max(highestCompletedIndex, completedIndex);

      return prevTiers.map((tier) => ({
        ...tier,
        nodes: tier.nodes.map((node) => {
          const idx = ORDERED_STAGE_NODE_IDS.indexOf(node.id);
          if (idx === -1) return node;

          if (idx <= newCompletedIndex) {
            return { ...node, state: "completed" as const };
          }
          if (idx === newCompletedIndex + 1) {
            return { ...node, state: "active" as const };
          }
          return { ...node, state: "locked" as const };
        }),
      }));
    });

    const newActivity: ActivityItem = {
      id: "act-" + Date.now(),
      title: scenario.title,
      time: "Только что",
      xp: earnedXp,
    };
    setActivityHistory((prev) => [newActivity, ...prev]);

    const effectiveGems = activeRoleplaySource === "training" ? 0 : earnedGems;

    setCurrentUser((prev) => {
      const newLessonsDone = prev.lessonsDone + 1;
      const newAccuracy = Math.min(100, Math.max(90, prev.accuracy + 1));
      return {
        ...prev,
        xp: prev.xp + earnedXp,
        currentXp: prev.currentXp + earnedXp,
        gems: prev.gems + effectiveGems,
        lessonsDone: newLessonsDone,
        accuracy: newAccuracy,
      };
    });
  };

  const handleAwardXp = (earnedXp: number, earnedGems: number) => {
    const effectiveGems = activeRoleplaySource === "training" ? 0 : earnedGems;
    setCurrentUser((prev) => {
      const newXp = prev.xp + earnedXp;
      const newCurrentXp = prev.currentXp + earnedXp;
      const newGems = prev.gems + effectiveGems;

      return {
        ...prev,
        xp: newXp,
        currentXp: newCurrentXp,
        gems: newGems,
      };
    });
  };

  const handleBuyItem = (itemId: string, cost: number): boolean => {
    if (currentUser.gems < cost) {
      return false;
    }

    setCurrentUser((prev) => ({
      ...prev,
      gems: prev.gems - cost,
      ownedShopItems: [...prev.ownedShopItems, itemId],
    }));

    return true;
  };

  const handleUpdateAvatar = (avatarId: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      avatar: avatarId,
    }));
  };

  const handleCopyPhoneLink = () => {
    const url = "http://192.168.10.12:3000";
    navigator.clipboard.writeText(url);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2500);
  };

  const navItems = [
    { id: "home" as const, label: TRANSLATIONS[language].nav.home, icon: LayoutDashboard },
    { id: "training" as const, label: TRANSLATIONS[language].nav.training, icon: Swords },
    { id: "knowledge" as const, label: TRANSLATIONS[language].nav.knowledge, icon: BookOpen },
    { id: "profile" as const, label: TRANSLATIONS[language].nav.profile, icon: User },
  ];

  // Whether we are currently in desktop wide mode:
  // ONLY true when NOT in phone frame preview AND screen is wider than mobile
  const isDesktopMode = !isPhoneFrame && !isMobileScreen;

  return (
    <div className="min-h-screen flex flex-col bg-[#ECEEF2] dark:bg-dark-bg text-soft-text dark:text-dark-text transition-colors">
      {/* ========================================================
          1. DESKTOP FULL-WIDTH HEADER (Shown on md+ when not in phone frame)
      ======================================================== */}
      {isDesktopMode && (
        <header className="sticky top-0 z-40 border-b border-soft-border dark:border-dark-border bg-white/95 dark:bg-[#131F24] backdrop-blur-md">
          <div className="w-full px-6 xl:px-12 h-16 flex items-center justify-between">
            {/* Brand Logo & Title (Figma Screenshot 1) */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                <ShieldCheck size={20} strokeWidth={2.4} />
              </div>
              <span className="text-lg font-bold tracking-tight text-soft-text dark:text-white">
                CyberDesk
              </span>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="flex items-center gap-7 h-16 shrink-0">
              {[
                { id: "home" as const, label: TRANSLATIONS[language].nav.home },
                { id: "training" as const, label: TRANSLATIONS[language].nav.training },
                { id: "knowledge" as const, label: TRANSLATIONS[language].nav.knowledge },
                { id: "profile" as const, label: TRANSLATIONS[language].nav.profile },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative h-full flex items-center px-1 text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400 font-bold"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Stats, Language, Theme Toggle, Phone Frame Toggle, Profile */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Streak */}
              <div className="h-8 shrink-0 flex items-center gap-1.5 rounded-full border border-amber-500/20 dark:border-amber-500/30 bg-amber-50 dark:bg-[#252219] px-3 text-xs font-bold text-amber-700 dark:text-amber-300 whitespace-nowrap leading-none">
                <FlameIcon size={14} className="text-amber-500 shrink-0" />
                <span className="whitespace-nowrap inline-block">{currentUser.streak} дн</span>
              </div>

              {/* XP */}
              <div className="h-8 shrink-0 flex items-center gap-1.5 rounded-full border border-indigo-500/20 dark:border-indigo-500/30 bg-indigo-50 dark:bg-[#1D2138] px-3 text-xs font-bold text-indigo-700 dark:text-indigo-300 whitespace-nowrap leading-none">
                <ZapIcon size={14} className="text-indigo-500 shrink-0" />
                <span className="whitespace-nowrap inline-block">{currentUser.xp}</span>
              </div>

              {/* Gems */}
              <div className="h-8 shrink-0 flex items-center gap-1.5 rounded-full border border-sky-500/20 dark:border-sky-500/30 bg-sky-50 dark:bg-[#162734] px-3 text-xs font-bold text-sky-700 dark:text-sky-300 whitespace-nowrap leading-none">
                <GemIcon size={14} className="text-sky-500 shrink-0" />
                <span className="whitespace-nowrap inline-block">{currentUser.gems}</span>
              </div>

              <div className="h-5 w-px bg-slate-200 dark:bg-slate-700/60 mx-1 shrink-0" />

              {/* Language Switcher */}
              <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1B2A32] p-0.5 text-xs font-bold shrink-0">
                {(["kz", "ru", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleChangeLanguage(lang)}
                    className={`px-2 py-1 rounded-lg uppercase transition-all ${
                      language === lang
                        ? "bg-emerald-500 text-white shadow-2xs"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                title={theme === "dark" ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1B2A32] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Phone Frame Toggle */}
              <button
                onClick={() => setIsPhoneFrame(true)}
                title="Переключить на мобильный предпросмотр"
                className="flex h-8 shrink-0 items-center gap-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1B2A32] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                <Smartphone size={14} />
                <span>Мобильный вид</span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setShowDesktopUserDropdown(!showDesktopUserDropdown)}
                  className="flex h-8 items-center gap-2 pl-1 pr-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1B2A32] text-xs font-semibold text-slate-800 dark:text-white hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  <CharacterAvatar type={currentUser.avatar} size="sm" className="!w-6 !h-6 !rounded-full" />
                  <span className="font-medium truncate max-w-[90px]">{currentUser.name}</span>
                  <ChevronDown size={13} className="text-slate-400" />
                </button>

                {showDesktopUserDropdown && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card p-2 shadow-xl z-50 animate-scale-in">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-dark-border">
                      <p className="text-xs font-bold text-soft-text dark:text-white">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Уровень {currentUser.level} • {currentUser.levelTitle}
                      </p>
                    </div>

                    <div className="py-1 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab("profile");
                          setShowDesktopUserDropdown(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-soft-text dark:text-white hover:bg-slate-50 dark:hover:bg-dark-subtle transition-colors"
                      >
                        <User size={14} className="text-emerald-500" />
                        <span>Мой профиль</span>
                      </button>

                      <button
                        onClick={handleLogout}
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
      )}

      {/* ========================================================
          2. PHONE PREVIEW CONTROLS (Only visible on desktop when phone frame is active)
      ======================================================== */}
      {isPhoneFrame && !isMobileScreen && (
        <div className="flex items-center justify-between w-full max-w-[430px] mx-auto mt-4 px-3 py-2 rounded-2xl bg-white/95 dark:bg-dark-card/95 border border-slate-200/80 dark:border-dark-border shadow-sm text-xs text-soft-text dark:text-white backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Smartphone size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span>На телефоне:</span>
            <button
              onClick={handleCopyPhoneLink}
              className="font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md hover:bg-emerald-100 flex items-center gap-1 border border-emerald-200/60 dark:border-emerald-800/40"
            >
              <span>192.168.10.12:3000</span>
              {copiedIp ? <Check size={11} /> : <Copy size={11} />}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              title="Переключить тему"
              className="text-slate-400 hover:text-soft-text dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setIsPhoneFrame(false)}
              title="Развернуть на весь экран (ПК)"
              className="flex items-center gap-1 text-slate-500 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-subtle transition-colors"
            >
              <Monitor size={15} />
              <span className="text-[11px] font-semibold">ПК версия</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MAIN CONTENT CONTAINER
      ======================================================== */}
      {isPhoneFrame && !isMobileScreen ? (
        /* PHONE FRAME MOCKUP (Only on desktop when explicitly enabled) */
        <div className="w-full max-w-[430px] mx-auto my-3 rounded-[46px] border-[9px] border-slate-800 shadow-2xl h-[860px] max-h-[92vh] flex flex-col overflow-hidden relative bg-white dark:bg-dark-bg">
          {/* Dynamic Island */}
          <div className="flex items-center justify-center pt-2 pb-1 bg-white dark:bg-dark-card border-b border-soft-border/30 dark:border-dark-border shrink-0">
            <div className="h-4 w-28 rounded-full bg-slate-900 flex items-center justify-end px-2">
              <span className="h-2 w-2 rounded-full bg-slate-800 border border-slate-700" />
            </div>
          </div>

          {/* Phone Top Status Bar */}
          <div className="shrink-0">
            <StatusBar
              user={currentUser}
              onPillClick={handlePillClick}
              language={language}
              onSelectLanguage={handleChangeLanguage}
              onLogout={handleLogout}
            />
          </div>

          {/* Phone Screen Scrollable Area */}
          <main ref={phoneMainRef} className="flex-1 overflow-y-auto">
            {activeTab === "home" && (
              <HomeScreen
                user={currentUser}
                skillTiers={skillTiers}
                activityHistory={activityHistory}
                isDesktop={false}
                language={language}
                onStartDailyFocus={handleStartDailyFocus}
                onNodeClick={handleNodeClick}
                onViewAllClick={() => setActiveTab("training")}
              />
            )}

            {activeTab === "training" && (
              <TrainingScreen
                user={currentUser}
                selectedMentor={currentMentor}
                isDesktop={false}
                onNavigateToProfileMentor={() => setActiveTab("profile")}
                onAwardXp={handleAwardXp}
                onOpenRoleplay={(m, scenarioId) => {
                  setActiveRoleplaySource("training");
                  if (scenarioId) {
                    setActiveScenarioId(scenarioId);
                  }
                  setActiveRoleplayMentor(m);
                }}
              />
            )}

            {activeTab === "knowledge" && <KnowledgeScreen isDesktop={false} />}

            {activeTab === "profile" && (
              <ProfileScreen
                user={currentUser}
                selectedMentorId={selectedMentorId}
                isDesktop={false}
                language={language}
                onSelectMentor={setSelectedMentorId}
                customMentor={customMentor}
                onUpdateAvatar={handleUpdateAvatar}
                onBuyItem={handleBuyItem}
                onLogout={handleLogout}
              />
            )}
          </main>

          {/* Phone Bottom Nav Anchored at Bottom */}
          <div className="shrink-0">
            <BottomNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              hasTrainingNotification={true}
              isPhoneFrame={true}
              language={language}
            />
          </div>
        </div>
      ) : (
        /* NORMAL FULLSCREEN CONTAINER (For real mobile phones OR full desktop layout) */
        <div className="w-full flex-1 flex flex-col">
          {/* Mobile Top Status Bar (Only on mobile screens < 768px) */}
          <div className="block md:hidden">
            <StatusBar
              user={currentUser}
              onPillClick={handlePillClick}
              language={language}
              onSelectLanguage={handleChangeLanguage}
              onLogout={handleLogout}
            />
          </div>

          {/* Screen Content Area */}
          <main ref={desktopMainRef} className="flex-1 overflow-y-auto">
            {activeTab === "home" && (
              <HomeScreen
                user={currentUser}
                skillTiers={skillTiers}
                activityHistory={activityHistory}
                isDesktop={isDesktopMode}
                language={language}
                onStartDailyFocus={handleStartDailyFocus}
                onNodeClick={handleNodeClick}
                onViewAllClick={() => setActiveTab("training")}
              />
            )}

            {activeTab === "training" && (
              <TrainingScreen
                user={currentUser}
                selectedMentor={currentMentor}
                isDesktop={isDesktopMode}
                onNavigateToProfileMentor={() => setActiveTab("profile")}
                onAwardXp={handleAwardXp}
                onOpenRoleplay={(m, scenarioId) => {
                  setActiveRoleplaySource("training");
                  if (scenarioId) {
                    setActiveScenarioId(scenarioId);
                  }
                  setActiveRoleplayMentor(m);
                }}
              />
            )}

            {activeTab === "knowledge" && <KnowledgeScreen isDesktop={isDesktopMode} />}

            {activeTab === "profile" && (
              <ProfileScreen
                user={currentUser}
                selectedMentorId={selectedMentorId}
                isDesktop={isDesktopMode}
                language={language}
                onSelectMentor={setSelectedMentorId}
                customMentor={customMentor}
                onUpdateAvatar={handleUpdateAvatar}
                onBuyItem={handleBuyItem}
                onLogout={handleLogout}
              />
            )}
          </main>

          {/* Mobile Fixed Bottom Nav (Only on mobile screens < 768px) */}
          <div className="block md:hidden">
            <BottomNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              hasTrainingNotification={true}
              isPhoneFrame={false}
              language={language}
            />
          </div>
        </div>
      )}

      {/* Fullscreen Roleplay Messenger Simulator Overlay */}
      {activeRoleplayMentor && (
        <RoleplayChatSimulator
          mentor={activeRoleplayMentor}
          user={currentUser}
          initialScenarioId={activeScenarioId}
          onClose={() => setActiveRoleplayMentor(null)}
          onAwardXp={handleAwardXp}
          onCompleteLesson={handleCompleteLesson}
          onSelectNextScenario={(nextScenarioId) => setActiveScenarioId(nextScenarioId)}
        />
      )}

      {/* Welcome Hero Screen */}
      <WelcomeScreen
        isOpen={showWelcome}
        onContinue={handleDismissWelcome}
        language={language}
        onSelectLanguage={handleChangeLanguage}
      />

      {/* Mascot Loading Splash */}
      {showSplash && <LoadingSplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Auth Modal (Login with Google / Credentials / Guest) */}
      <AuthModal
        isOpen={showAuthModal || !isAuthenticated}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Onboarding Guide Walkthrough */}
      <OnboardingModal
        isOpen={showOnboardingModal}
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        onSelectMentorStyle={setSelectedMentorId}
        onComplete={() => setShowOnboardingModal(false)}
      />
    </div>
  );
}
