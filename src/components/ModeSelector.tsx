"use client";

import React from "react";
import { Category, GameMode, Difficulty, UserStats } from "@/types";
import { User, Shield, MapPin, Sparkles, Clock, Compass, CheckCircle2 } from "lucide-react";
import { formatCountdown } from "@/lib/daily";
import { motion } from "motion/react";

interface ModeSelectorProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  difficulty: Difficulty;
  onSelectDifficulty: (diff: Difficulty) => void;
  dailySecondsRemaining: number;
  dailyCompleted: { driver: boolean; team: boolean; track: boolean };
  userStats: UserStats;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  gameMode,
  onSelectGameMode,
  difficulty,
  onSelectDifficulty,
  dailySecondsRemaining,
  dailyCompleted,
  userStats,
}) => {
  const categories: {
    id: Category;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    isCompleted: boolean;
  }[] = [
    {
      id: "driver",
      title: "Drivers",
      subtitle: "Champions & Grid Stars",
      icon: <User className="w-4 h-4 text-red-500" />,
      isCompleted: dailyCompleted.driver,
    },
    {
      id: "team",
      title: "Constructors",
      subtitle: "Heritage & Factory Teams",
      icon: <Shield className="w-4 h-4 text-sky-400" />,
      isCompleted: dailyCompleted.team,
    },
    {
      id: "track",
      title: "Circuits",
      subtitle: "Grand Prix Venues",
      icon: <MapPin className="w-4 h-4 text-emerald-400" />,
      isCompleted: dailyCompleted.track,
    },
  ];

  const difficulties: {
    id: Difficulty;
    name: string;
    tyre: string;
    compound: string;
    dotColor: string;
    borderActive: string;
    desc: string;
  }[] = [
    {
      id: "easy",
      name: "Easy",
      tyre: "SOFT",
      compound: "C5",
      dotColor: "bg-red-500",
      borderActive: "border-red-500/80 bg-red-950/30 text-red-300",
      desc: "Modern legends & iconic teams",
    },
    {
      id: "medium",
      name: "Medium",
      tyre: "MEDIUM",
      compound: "C3",
      dotColor: "bg-amber-500",
      borderActive: "border-amber-500/80 bg-amber-950/30 text-amber-300",
      desc: "Mixed eras & podium contenders",
    },
    {
      id: "hard",
      name: "Hard",
      tyre: "HARD",
      compound: "C1",
      dotColor: "bg-zinc-100",
      borderActive: "border-zinc-300/80 bg-zinc-800/40 text-zinc-100",
      desc: "Historical heroes & defunct teams",
    },
  ];

  return (
    <div className="w-full space-y-4 mb-4">
      {/* Top Segmented Mode Bar with Watermelon UI / Motion Dev Sliding Pill */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#090b10] border border-zinc-800/90 shadow-xl">
        {/* Daily vs Practice Switcher */}
        <div className="relative flex items-center bg-black/70 p-1 rounded-xl border border-zinc-800/80">
          <button
            onClick={() => onSelectGameMode("daily")}
            className={`relative z-10 flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors select-none ${
              gameMode === "daily" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {gameMode === "daily" && (
              <motion.div
                layoutId="mode-selector-pill"
                className="absolute inset-0 z-[-1] rounded-lg bg-red-600 shadow-md shadow-red-950/60"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAILY GRAND PRIX</span>
          </button>

          <button
            onClick={() => onSelectGameMode("practice")}
            className={`relative z-10 flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors select-none ${
              gameMode === "practice" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {gameMode === "practice" && (
              <motion.div
                layoutId="mode-selector-pill"
                className="absolute inset-0 z-[-1] rounded-lg bg-zinc-800 shadow-md"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <Compass className="w-3.5 h-3.5" />
            <span>PRACTICE SESSION</span>
          </button>
        </div>

        {/* Live Daily Timer or Practice Status */}
        {gameMode === "daily" ? (
          <div className="flex items-center justify-center sm:justify-end gap-2 text-xs font-mono text-zinc-400 px-2">
            <Clock className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>RESET IN</span>
            <span className="font-bold text-white tabular-nums bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
              {formatCountdown(dailySecondsRemaining)}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center sm:justify-end gap-3 text-xs font-mono text-zinc-400 px-2">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>UNLIMITED LAPS</span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 tabular-nums hidden sm:inline">
              Record: {userStats.wins}W / {userStats.totalGames}GP
            </span>
          </div>
        )}
      </div>

      {/* 3 Categories: Styled like Cockpit Selection Switches with Motion Dev Gestures */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`relative flex flex-col p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-zinc-900/90 border-red-600 shadow-lg shadow-red-950/30 ring-1 ring-red-600/50"
                  : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="p-1.5 rounded-lg bg-black/60 border border-zinc-800/80">
                  {cat.icon}
                </div>
                {gameMode === "daily" && cat.isCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <span
                className={`font-bold text-sm tracking-tight ${
                  isSelected ? "text-white" : "text-zinc-300"
                }`}
              >
                {cat.title}
              </span>
              <span className="text-[11px] text-zinc-500 truncate hidden sm:block">
                {cat.subtitle}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Difficulty Tyre Compound Picker (Visible in Practice Mode) */}
      {gameMode === "practice" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-2xl bg-black/40 border border-zinc-800/80"
        >
          <span className="text-xs font-mono text-zinc-400 pl-1">
            Tyre Compound / Tolerance:
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {difficulties.map((diff) => {
              const isSelected = difficulty === diff.id;
              return (
                <motion.button
                  key={diff.id}
                  onClick={() => onSelectDifficulty(diff.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? diff.borderActive
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                  title={diff.desc}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${diff.dotColor}`} />
                  <span>{diff.tyre}</span>
                  <span className="text-[10px] opacity-70 font-normal">
                    [{diff.compound}]
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
