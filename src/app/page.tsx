"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Category,
  Difficulty,
  GameMode,
  Driver,
  Team,
  Track,
  ComparisonResult,
  Hint,
  UserStats,
  GameStatus,
} from "@/types";
import { getEntityById, getEntitiesByDifficulty } from "@/data";
import { compareEntities } from "@/lib/comparison";
import { getHintsForEntity } from "@/lib/hints";
import { getDailyChallenge, getSecondsUntilUtcMidnight, getUtcDateString } from "@/lib/daily";
import {
  loadUserStats,
  recordGameResult,
  loadDailySession,
  saveDailySession,
  DEFAULT_STATS,
  loadSavedThemeId,
  saveThemeId,
} from "@/lib/storage";
import { sound } from "@/lib/sound";

import { LiveTicker } from "@/components/LiveTicker";
import { Navbar } from "@/components/Navbar";
import { ModeSelector } from "@/components/ModeSelector";
import { SteeringWheelDisplay } from "@/components/SteeringWheelDisplay";
import { StartLights } from "@/components/StartLights";
import { SearchBar } from "@/components/SearchBar";
import { TimingTower } from "@/components/TimingTower";
import { FeedbackGrid } from "@/components/FeedbackGrid";
import { HintPanel } from "@/components/HintPanel";
import { PitRadio } from "@/components/PitRadio";
import { Encyclopedia } from "@/components/Encyclopedia";
import { TrophyRoom } from "@/components/TrophyRoom";
import { ResultModal } from "@/components/ResultModal";
import { HowToPlayModal } from "@/components/HowToPlayModal";
import { GameStatsModal } from "@/components/GameStatsModal";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RetroGrid } from "@/components/magicui/RetroGrid";
import { GarageBackground } from "@/components/f1/GarageBackground";
import { CircuitBackdrop } from "@/components/f1/CircuitBackdrop";
import { CompactCockpitHUD } from "@/components/f1/CompactCockpitHUD";
import { PitWallMFD } from "@/components/f1/PitWallMFD";
import { AnimatedTabs, TabOption } from "@/components/watermelon/AnimatedTabs";
import { MotionButton } from "@/components/watermelon/MotionButton";
import {
  Flag,
  AlertTriangle,
  RotateCcw,
  Compass,
  BookOpen,
  Trophy,
  GitCommit,
  Radio,
  Zap,
  Wind,
  Calendar,
} from "lucide-react";

import { CareerTimelineMode } from "@/components/modes/CareerTimelineMode";
import { RadioQuizMode } from "@/components/modes/RadioQuizMode";
import { CornerQuizMode } from "@/components/modes/CornerQuizMode";
import { HeadToHeadMode } from "@/components/modes/HeadToHeadMode";
import { AeroCarViewer } from "@/components/f1/AeroCarViewer";
import { SeasonHub } from "@/components/f1/SeasonHub";
import { TeamThemeSelector, TEAM_THEMES, TeamTheme } from "@/components/f1/TeamThemeSelector";

type MainTabType =
  | "game"
  | "career"
  | "radio"
  | "corners"
  | "battles"
  | "aero"
  | "season"
  | "archive"
  | "trophies";

export default function F1WordleApp() {
  // Navigation & View Mode
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>("game");
  const [currentTheme, setCurrentTheme] = useState<TeamTheme>(TEAM_THEMES[0]);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  // Game Settings
  const [category, setCategory] = useState<Category>("driver");
  const [gameMode, setGameMode] = useState<GameMode>("daily");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  // User Stats & Daily Progress
  const [userStats, setUserStats] = useState<UserStats>(DEFAULT_STATS);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(getSecondsUntilUtcMidnight());
  const [dailyCompleted, setDailyCompleted] = useState<{
    driver: boolean;
    team: boolean;
    track: boolean;
  }>({ driver: false, team: false, track: false });

  // Deterministic daily target for initial render
  const todayDate = getUtcDateString();
  const initialChallenge = getDailyChallenge(todayDate);
  const initialDriverTarget = getEntityById("driver", initialChallenge.driverId);
  const initialDriverHints = initialDriverTarget ? getHintsForEntity("driver", initialDriverTarget) : [];

  // Current Round State
  const [targetEntity, setTargetEntity] = useState<Driver | Team | Track | null>(initialDriverTarget || null);
  const [hints, setHints] = useState<Hint[]>(initialDriverHints);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [comparisons, setComparisons] = useState<ComparisonResult[]>([]);
  const [status, setStatus] = useState<GameStatus>("in_progress");

  // Sync client-only storage data after mounting to prevent SSR hydration mismatches
  useEffect(() => {
    setHasMounted(true);
    setUserStats(loadUserStats());
    const savedThemeId = loadSavedThemeId();
    const matched = TEAM_THEMES.find((t) => t.id === savedThemeId);
    if (matched) {
      setCurrentTheme(matched);
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", matched.id);
      }
    }
  }, []);

  // Update data-theme on document root whenever theme changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentTheme.id);
    }
  }, [currentTheme]);

  // Navigation Tabs with Watermelon UI spec
  const mainNavTabs: TabOption<MainTabType>[] = [
    { id: "game", label: "COCKPIT", icon: <Compass className="w-3.5 h-3.5" /> },
    { id: "career", label: "TIMELINES", icon: <GitCommit className="w-3.5 h-3.5" /> },
    { id: "radio", label: "RADIO QUIZ", icon: <Radio className="w-3.5 h-3.5" /> },
    { id: "corners", label: "APEX SLEUTH", icon: <Flag className="w-3.5 h-3.5" /> },
    { id: "battles", label: "SHOWDOWN", icon: <Zap className="w-3.5 h-3.5" /> },
    { id: "aero", label: "WIND TUNNEL", icon: <Wind className="w-3.5 h-3.5" /> },
    { id: "season", label: "2025 HUB", icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: "archive", label: "ARCHIVE", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "trophies", label: "SUPERLICENSE", icon: <Trophy className="w-3.5 h-3.5" /> },
  ];

  // Timer for UTC reset countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(getSecondsUntilUtcMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check which daily categories are already completed
  const refreshDailyStatus = useCallback(() => {
    const today = getUtcDateString();
    const driverSession = loadDailySession("driver", today);
    const teamSession = loadDailySession("team", today);
    const trackSession = loadDailySession("track", today);

    setDailyCompleted({
      driver: Boolean(driverSession && driverSession.status !== "in_progress"),
      team: Boolean(teamSession && teamSession.status !== "in_progress"),
      track: Boolean(trackSession && trackSession.status !== "in_progress"),
    });
  }, []);

  useEffect(() => {
    refreshDailyStatus();
  }, [refreshDailyStatus]);

  // Initialize or restore round when category, mode, or difficulty changes
  const initRound = useCallback(
    (cat: Category, mode: GameMode, diff: Difficulty) => {
      const today = getUtcDateString();

      if (mode === "daily") {
        const dailyEntry = getDailyChallenge(today);
        const mysteryId =
          cat === "driver"
            ? dailyEntry.driverId
            : cat === "team"
            ? dailyEntry.teamId
            : dailyEntry.trackId;

        const target = getEntityById(cat, mysteryId);
        if (!target) return;

        setTargetEntity(target);
        setHints(getHintsForEntity(cat, target));

        // Restore saved daily session if any
        const saved = loadDailySession(cat, today);
        if (saved && saved.mysteryId === target.id) {
          setGuesses(saved.guesses || []);
          setComparisons(saved.comparisons || []);
          setStatus(saved.status || "in_progress");
          if (saved.status && saved.status !== "in_progress") {
            setIsResultOpen(true);
          } else {
            setIsResultOpen(false);
          }
        } else {
          setGuesses([]);
          setComparisons([]);
          setStatus("in_progress");
          setIsResultOpen(false);
        }
      } else {
        // Practice Mode: choose a mystery target matching chosen difficulty
        const pool = getEntitiesByDifficulty(cat, diff);
        const randomIndex = Math.floor(Math.random() * pool.length);
        const target = pool[randomIndex];

        setTargetEntity(target);
        setHints(getHintsForEntity(cat, target));
        setGuesses([]);
        setComparisons([]);
        setStatus("in_progress");
        setIsResultOpen(false);
        sound.playEngineRev();
      }
    },
    []
  );

  useEffect(() => {
    initRound(category, gameMode, difficulty);
  }, [category, gameMode, difficulty, initRound]);

  // Handle a guess submission
  const handleGuess = (guessedItem: Driver | Team | Track) => {
    if (status !== "in_progress" || !targetEntity) return;
    if (guesses.includes(guessedItem.id)) return;

    // Run Wordle-style comparison
    const comparison = compareEntities(category, guessedItem, targetEntity);
    const newGuesses = [...guesses, guessedItem.id];
    const newComparisons = [...comparisons, comparison];

    const isMatch = comparison.isCorrect;
    const isOutOfAttempts = newGuesses.length >= 7;

    setGuesses(newGuesses);
    setComparisons(newComparisons);

    // Check game outcome
    if (isMatch) {
      setStatus("won");
      sound.playCorrect();

      const updatedStats = recordGameResult(
        category,
        difficulty,
        gameMode === "daily",
        true,
        newGuesses.length
      );
      setUserStats(updatedStats);

      if (gameMode === "daily") {
        saveDailySession(category, {
          category,
          mode: gameMode,
          difficulty,
          mysteryId: targetEntity.id,
          guesses: newGuesses,
          comparisons: newComparisons,
          status: "won",
        });
        refreshDailyStatus();
      }

      setTimeout(() => setIsResultOpen(true), 800);
    } else if (isOutOfAttempts) {
      setStatus("lost");
      sound.playWrong();

      const updatedStats = recordGameResult(
        category,
        difficulty,
        gameMode === "daily",
        false,
        newGuesses.length
      );
      setUserStats(updatedStats);

      if (gameMode === "daily") {
        saveDailySession(category, {
          category,
          mode: gameMode,
          difficulty,
          mysteryId: targetEntity.id,
          guesses: newGuesses,
          comparisons: newComparisons,
          status: "lost",
        });
        refreshDailyStatus();
      }

      setTimeout(() => setIsResultOpen(true), 800);
    } else {
      sound.playHintUnlock();

      if (gameMode === "daily") {
        saveDailySession(category, {
          category,
          mode: gameMode,
          difficulty,
          mysteryId: targetEntity.id,
          guesses: newGuesses,
          comparisons: newComparisons,
          status: "in_progress",
        });
      }
    }
  };

  // Surrender / Give Up option
  const handleGiveUp = () => {
    if (status !== "in_progress" || !targetEntity) return;

    const confirmGiveUp = window.confirm(
      `Are you sure you want to retire from the race? The mystery ${category} will be revealed.`
    );
    if (!confirmGiveUp) return;

    setStatus("lost");
    sound.playWrong();

    const updatedStats = recordGameResult(
      category,
      difficulty,
      gameMode === "daily",
      false,
      7
    );
    setUserStats(updatedStats);

    if (gameMode === "daily") {
      saveDailySession(category, {
        category,
        mode: gameMode,
        difficulty,
        mysteryId: targetEntity.id,
        guesses,
        comparisons,
        status: "lost",
      });
      refreshDailyStatus();
    }

    setIsResultOpen(true);
  };

  const remainingGuesses = Math.max(0, 7 - guesses.length);

  return (
    <div
      data-theme={currentTheme.id}
      className="relative h-screen max-h-screen flex flex-col selection:bg-[var(--team-primary)] selection:text-white bg-[#050608] overflow-hidden transition-colors duration-500"
    >
      <CircuitBackdrop />
      <GarageBackground className="opacity-40" />
      <RetroGrid className="opacity-10 fixed inset-0 z-0 pointer-events-none" />

      {/* Main Screen Layout (Single Viewport Zero-Scroll) */}
      <div className="relative z-10 flex flex-col h-full overflow-hidden">
        {/* 1. Live F1 Broadcast Telemetry Ticker */}
        <LiveTicker
          secondsRemaining={secondsRemaining}
          streak={userStats.currentStreak}
        />

        {/* 2. Top Motorsport Header with Team Livery Selector */}
        <Navbar
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          onResetGame={() => initRound(category, gameMode, difficulty)}
          streakCount={userStats.currentStreak}
          gameMode={gameMode}
          currentThemeId={currentTheme.id}
          onSelectTheme={(theme) => {
            setCurrentTheme(theme);
            saveThemeId(theme.id);
          }}
        />

        {/* 3. Main Navigation & Dynamic Viewport Arena */}
        <div className="w-full max-w-[1760px] mx-auto px-2.5 sm:px-4 pt-1.5 flex-1 min-h-0 flex flex-col overflow-hidden">
          <Tabs
            value={activeMainTab}
            onValueChange={(val) => setActiveMainTab(val as MainTabType)}
            className="w-full flex-1 flex flex-col min-h-0 overflow-hidden"
          >
            {/* Nav Tabs Ribbon (Slim single-row) */}
            <div className="flex justify-center mb-1.5 shrink-0">
              <AnimatedTabs
                tabs={mainNavTabs}
                activeTab={activeMainTab}
                onTabChange={(val) => setActiveMainTab(val)}
                layoutId="main-nav-pill"
                className="max-w-5xl w-full overflow-x-auto no-scrollbar py-0.5"
              />
            </div>

            {/* TAB 1: RACE COCKPIT (THE GAME) - 100% SINGLE VIEWPORT NO SCROLL */}
            <TabsContent
              value="game"
              className="flex-1 flex flex-col min-h-0 overflow-hidden m-0 p-0 data-[state=inactive]:hidden"
            >
              <div className="w-full flex-1 flex flex-col gap-2 min-h-0 overflow-hidden">
                {/* 1. Integrated Cockpit HUD: Categories + 15-LED Shift Light Bar + Mode + Timer */}
                <CompactCockpitHUD
                  category={category}
                  onSelectCategory={(cat) => setCategory(cat)}
                  gameMode={gameMode}
                  onSelectGameMode={(m) => setGameMode(m)}
                  difficulty={difficulty}
                  onSelectDifficulty={(d) => setDifficulty(d)}
                  currentLap={guesses.length}
                  maxLaps={7}
                  isWon={status === "won"}
                  isGameOver={status !== "in_progress"}
                  dailySecondsRemaining={secondsRemaining}
                  dailyCompleted={dailyCompleted}
                />

                {/* 2. Tactical Autocomplete Command Bar */}
                <SearchBar
                  category={category}
                  guessedIds={guesses}
                  disabled={status !== "in_progress"}
                  onSelectGuess={handleGuess}
                  remainingGuesses={remainingGuesses}
                />

                {/* 3. Main Mission Control Telemetry Split */}
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch overflow-hidden pb-1">
                  {/* Left Hero Pane (62% width / 8 cols): Feedback Comparison Table + Action Bar */}
                  <div className="lg:col-span-8 flex flex-col min-h-0 overflow-hidden space-y-1.5">
                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                      <FeedbackGrid category={category} comparisons={comparisons} />
                    </div>

                    {/* Action Bar (Retire DNF, View Results, New Practice) */}
                    <div className="flex items-center justify-between px-2 py-1 shrink-0 bg-black/40 rounded-xl border border-white/5 backdrop-blur-md">
                      <div>
                        {status === "in_progress" && guesses.length > 0 && (
                          <MotionButton
                            variant="ghost"
                            size="sm"
                            onClick={handleGiveUp}
                            className="text-zinc-500 hover:text-red-400 p-0 hover:bg-transparent text-xs"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            <span>RETIRE FROM RACE (DNF)</span>
                          </MotionButton>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {status !== "in_progress" && (
                          <MotionButton
                            variant="outline"
                            size="sm"
                            onClick={() => setIsResultOpen(true)}
                            className="text-zinc-300 hover:text-white text-xs"
                          >
                            <Flag className="w-3.5 h-3.5 text-red-500" />
                            <span>VIEW RACE RESULTS</span>
                          </MotionButton>
                        )}

                        {gameMode === "practice" && (
                          <MotionButton
                            variant="primary"
                            size="sm"
                            onClick={() => initRound(category, "practice", difficulty)}
                            className="text-white font-bold text-xs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>NEW PRACTICE ROUND</span>
                          </MotionButton>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Dock (38% width / 4 cols): Unified PitWall MFD (Timing Tower, Pit Radio, Hints) */}
                  <div className="lg:col-span-4 h-full min-h-0 overflow-hidden">
                    <PitWallMFD
                      category={category}
                      comparisons={comparisons}
                      hints={hints}
                      targetEntity={targetEntity}
                      attemptsCount={guesses.length}
                      maxLaps={7}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: CAREER TIMELINE MODE */}
            <TabsContent
              value="career"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <CareerTimelineMode />
            </TabsContent>

            {/* TAB 3: TEAM RADIO QUIZ */}
            <TabsContent
              value="radio"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <RadioQuizMode />
            </TabsContent>

            {/* TAB 4: APEX CORNER QUIZ */}
            <TabsContent
              value="corners"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <CornerQuizMode />
            </TabsContent>

            {/* TAB 5: DRIVER SHOWDOWN (HIGHER/LOWER) */}
            <TabsContent
              value="battles"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <HeadToHeadMode />
            </TabsContent>

            {/* TAB 6: WIND TUNNEL & CFD AERO INSPECTOR */}
            <TabsContent
              value="aero"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <AeroCarViewer />
            </TabsContent>

            {/* TAB 7: 2025 SEASON CALENDAR & WEATHER RADAR */}
            <TabsContent
              value="season"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <SeasonHub />
            </TabsContent>

            {/* TAB 8: PADDOCK ENCYCLOPEDIA */}
            <TabsContent
              value="archive"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <Encyclopedia />
            </TabsContent>

            {/* TAB 9: SUPERLICENSE & TROPHY ROOM */}
            <TabsContent
              value="trophies"
              className="flex-1 min-h-0 overflow-y-auto m-0 p-0 data-[state=inactive]:hidden"
            >
              <TrophyRoom stats={userStats} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Ultra-slim Footer */}
        <footer className="w-full py-1 text-center text-[10px] font-mono text-zinc-500 shrink-0 border-t border-white/5 bg-black/40">
          <span>F1 GRIDLE • FIA Motorsport Telemetry Console • Single Viewport Mission Control</span>
        </footer>
      </div>

      {/* Result Modal */}
      {targetEntity && (
        <ResultModal
          isOpen={isResultOpen}
          isWon={status === "won"}
          category={category}
          mode={gameMode}
          targetEntity={targetEntity}
          attemptsCount={guesses.length}
          hintsUsed={Math.min(6, Math.max(0, guesses.length - 1))}
          comparisons={comparisons}
          onPlayAgain={() => initRound(category, "practice", difficulty)}
          onClose={() => setIsResultOpen(false)}
          onNextCategory={(nextCat) => {
            setCategory(nextCat);
            setIsResultOpen(false);
          }}
        />
      )}

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* User Statistics Modal */}
      <GameStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={userStats}
      />
    </div>
  );
}
