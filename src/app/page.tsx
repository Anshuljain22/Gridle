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
import { AnimatedTabs, TabOption } from "@/components/watermelon/AnimatedTabs";
import { MotionButton } from "@/components/watermelon/MotionButton";
import { Flag, AlertTriangle, RotateCcw, Compass, BookOpen, Trophy } from "lucide-react";

export default function F1WordleApp() {
  // Navigation & View Mode
  const [activeMainTab, setActiveMainTab] = useState<"game" | "archive" | "trophies">("game");
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  // Game Settings
  const [category, setCategory] = useState<Category>("driver");
  const [gameMode, setGameMode] = useState<GameMode>("daily");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  // User Stats & Daily Progress
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats());
  const [secondsRemaining, setSecondsRemaining] = useState<number>(getSecondsUntilUtcMidnight());
  const [dailyCompleted, setDailyCompleted] = useState<{
    driver: boolean;
    team: boolean;
    track: boolean;
  }>({ driver: false, team: false, track: false });

  // Current Round State
  const [targetEntity, setTargetEntity] = useState<Driver | Team | Track | null>(null);
  const [hints, setHints] = useState<Hint[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [comparisons, setComparisons] = useState<ComparisonResult[]>([]);
  const [status, setStatus] = useState<GameStatus>("in_progress");

  // Navigation Tabs with Watermelon UI spec
  const mainNavTabs: TabOption<"game" | "archive" | "trophies">[] = [
    { id: "game", label: "RACE COCKPIT", icon: <Compass className="w-3.5 h-3.5" /> },
    { id: "archive", label: "PADDOCK ARCHIVE", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "trophies", label: "SUPERLICENSE & TROPHIES", icon: <Trophy className="w-3.5 h-3.5" /> },
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
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-red-600 selection:text-white bg-[#050608] overflow-x-hidden">
      {/* 0. 3D Racetrack Perspective Grid (Magic UI) */}
      <RetroGrid className="opacity-15 fixed inset-0 z-0 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          {/* 1. Live F1 Broadcast Telemetry Ticker */}
          <LiveTicker
            secondsRemaining={secondsRemaining}
            streak={userStats.currentStreak}
          />

          {/* 2. Top Motorsport Header */}
          <Navbar
            onOpenStats={() => setIsStatsOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onResetGame={() => initRound(category, gameMode, difficulty)}
            streakCount={userStats.currentStreak}
            gameMode={gameMode}
          />

      {/* 3. Main Cockpit Navigation Tabs (Watermelon UI + Motion Dev) */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-3 flex-1">
        <Tabs
          value={activeMainTab}
          onValueChange={(val) => setActiveMainTab(val as "game" | "archive" | "trophies")}
          className="w-full"
        >
          <div className="flex justify-center mb-4">
            <AnimatedTabs
              tabs={mainNavTabs}
              activeTab={activeMainTab}
              onTabChange={(val) => setActiveMainTab(val)}
              layoutId="main-nav-pill"
              className="max-w-xl w-full"
            />
          </div>

          {/* TAB 1: RACE COCKPIT (THE GAME) */}
          <TabsContent value="game">
            <main className="py-1">
              {/* Asymmetrical Pit Wall Command Station */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left Flight Column: Race Engineer, Wheel HUD & Telemetry Feed (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Category, Mode & Compound Selectors */}
                  <ModeSelector
                    selectedCategory={category}
                    onSelectCategory={(cat) => setCategory(cat)}
                    gameMode={gameMode}
                    onSelectGameMode={(m) => setGameMode(m)}
                    difficulty={difficulty}
                    onSelectDifficulty={(d) => setDifficulty(d)}
                    dailySecondsRemaining={secondsRemaining}
                    dailyCompleted={dailyCompleted}
                    userStats={userStats}
                  />

                  {/* F1 Steering Wheel RPM & Shift Light Display */}
                  <SteeringWheelDisplay
                    currentLap={guesses.length}
                    maxLaps={7}
                    isWon={status === "won"}
                    isGameOver={status !== "in_progress"}
                    category={category}
                  />

                  {/* F1 5-Light Starting Gantry */}
                  <StartLights
                    attemptsUsed={guesses.length}
                    maxAttempts={7}
                    isWon={status === "won"}
                    isGameOver={status !== "in_progress"}
                  />

                  {/* AI Team Radio / Strategist Guidance */}
                  <PitRadio
                    category={category}
                    targetEntity={targetEntity}
                    attemptsCount={guesses.length}
                  />

                  {/* 6 Progressive Telemetry Hints Panel */}
                  <HintPanel
                    hints={hints}
                    attemptsCount={guesses.length}
                  />
                </div>

                {/* Right Flight Column: Timing Screen & Guess Matrix (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Search & Guess Input Area */}
                  <SearchBar
                    category={category}
                    guessedIds={guesses}
                    disabled={status !== "in_progress"}
                    onSelectGuess={handleGuess}
                    remainingGuesses={remainingGuesses}
                  />

                  {/* F1 Live Timing Tower */}
                  <TimingTower
                    category={category}
                    comparisons={comparisons}
                    maxLaps={7}
                  />

                  {/* Wordle Attribute Comparison Feedback Grid */}
                  <FeedbackGrid category={category} comparisons={comparisons} />

                  {/* Action Bar (Give Up & Replay) with Watermelon UI MotionButton */}
                  <div className="flex items-center justify-between px-1 py-1">
                    <div>
                      {status === "in_progress" && guesses.length > 0 && (
                        <MotionButton
                          variant="ghost"
                          size="sm"
                          onClick={handleGiveUp}
                          className="text-zinc-500 hover:text-red-400 p-0 hover:bg-transparent"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          <span>RETIRE FROM RACE (DNF)</span>
                        </MotionButton>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {status !== "in_progress" && (
                        <MotionButton
                          variant="outline"
                          size="sm"
                          onClick={() => setIsResultOpen(true)}
                          className="text-zinc-300 hover:text-white"
                        >
                          <Flag className="w-3.5 h-3.5 text-red-500" />
                          <span>VIEW RACE RESULTS</span>
                        </MotionButton>
                      )}

                      {gameMode === "practice" && (
                        <MotionButton
                          variant="secondary"
                          size="sm"
                          onClick={() => initRound(category, gameMode, difficulty)}
                          className="text-zinc-300 hover:text-white"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>NEW PRACTICE ROUND</span>
                        </MotionButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </TabsContent>

          {/* TAB 2: PADDOCK ENCYCLOPEDIA */}
          <TabsContent value="archive">
            <Encyclopedia />
          </TabsContent>

          {/* TAB 3: SUPERLICENSE & TROPHY ROOM */}
          <TabsContent value="trophies">
            <TrophyRoom stats={userStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>

    {/* Footer with Kerbing Stripe */}
    <div>
      <div className="kerb-divider w-full mt-8" />
      <footer className="w-full bg-black/60 py-4 text-center text-xs font-mono text-zinc-500">
        <p>
          F1 GRIDLE • Formula 1 Motorsport Mission Control • Data verified through FIA Official Records
        </p>
      </footer>
    </div>
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
