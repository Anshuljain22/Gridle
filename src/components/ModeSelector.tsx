"use client";

import React, { useState, useEffect } from "react";
import { Category, GameMode, Difficulty, UserStats } from "@/types";
import { User, Shield, MapPin, Sparkles, Clock, Compass, CheckCircle2 } from "lucide-react";
import { formatCountdown } from "@/lib/daily";
import { motion } from "motion/react";
import { Icon3D } from "./icons3d/Icon3D";
import { SpotlightCard } from "./reactbits/SpotlightCard";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
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
      icon: <Icon3D name="helmet" size={22} />,
      isCompleted: dailyCompleted.driver,
    },
    {
      id: "team",
      title: "Constructors",
      subtitle: "Heritage & Factory Teams",
      icon: <Icon3D name="car" size={22} />,
      isCompleted: dailyCompleted.team,
    },
    {
      id: "track",
      title: "Circuits",
      subtitle: "Grand Prix Venues",
      icon: <Icon3D name="flag" size={22} />,
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
    <div className="w-full space-y-3 mb-2">
      {/* Top Segmented Mode Bar with Cockpit Chamfer Bezel & Motion Dev Sliding Pill */}
      <div className="cockpit-bezel cockpit-chamfer p-2.5 sm:p-3 relative overflow-hidden flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Hex rivets in corners */}
        <div className="absolute top-2 left-2 hex-rivet" />
        <div className="absolute top-2 right-2 hex-rivet" />
        <div className="absolute bottom-2 left-2 hex-rivet" />
        <div className="absolute bottom-2 right-2 hex-rivet" />

        {/* Daily vs Practice Switcher */}
        <div className="relative flex items-center bg-black/70 p-1 rounded-xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => onSelectGameMode("daily")}
            className={`relative z-10 flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors select-none ${
              gameMode === "daily" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {gameMode === "daily" && (
              <motion.div
                layoutId="mode-selector-pill"
                className="absolute inset-0 z-[-1] rounded-lg shadow-md transition-[background,box-shadow] duration-300"
                style={{
                  background: "var(--team-gradient-h)",
                  boxShadow: "0 4px 14px var(--team-glow)",
                }}
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAILY GRAND PRIX</span>
          </button>

          <button
            onClick={() => onSelectGameMode("practice")}
            className={`relative z-10 flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors select-none ${
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
            <Clock className="w-3.5 h-3.5 animate-pulse" style={{ color: "var(--team-primary)" }} />
            <span>RESET IN</span>
            <span
              suppressHydrationWarning
              className="font-bold text-white tabular-nums bg-black/70 px-2.5 py-0.5 rounded border border-zinc-800"
            >
              {mounted ? formatCountdown(dailySecondsRemaining) : "--:--:--"}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center sm:justify-end gap-3 text-xs font-mono text-zinc-400 px-2">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>UNLIMITED LAPS</span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span
              suppressHydrationWarning
              className="text-zinc-400 tabular-nums hidden sm:inline"
            >
              Record: {mounted ? `${userStats.wins}W / ${userStats.totalGames}GP` : "0W / 0GP"}
            </span>
          </div>
        )}
      </div>

      {/* 3 Categories: Styled like Authentic Cockpit Rotary Dial Switches */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`relative flex flex-col p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "cockpit-bezel-primary ring-1"
                  : "cockpit-bezel hover:border-white/20 text-zinc-300"
              }`}
              style={
                isSelected
                  ? {
                      backgroundColor: "var(--team-bg-tint)",
                      borderColor: "var(--team-primary)",
                      boxShadow: "0 8px 30px var(--team-glow), inset 0 1px 0 rgba(255,255,255,0.18)",
                    }
                  : undefined
              }
            >
              {/* Dial tick marks top right */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? "animate-pulse" : "bg-zinc-700 opacity-40"
                  }`}
                  style={isSelected ? { backgroundColor: "var(--team-primary)" } : undefined}
                />
                {gameMode === "daily" && cat.isCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />
                )}
              </div>

              <div className="flex items-center justify-between w-full mb-1.5">
                <div
                  className="p-2 rounded-xl bg-black/70 border border-zinc-800 transition-colors"
                  style={isSelected ? { borderColor: "var(--team-primary)" } : undefined}
                >
                  {cat.icon}
                </div>
              </div>

              <span
                className={`font-black text-sm tracking-tight font-mono uppercase ${
                  isSelected ? "text-white" : "text-zinc-300"
                }`}
              >
                {cat.title}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono truncate hidden sm:block">
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
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-2xl f1-glass"
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
                  <Icon3D
                    name={
                      diff.id === "easy"
                        ? "tyre-soft"
                        : diff.id === "medium"
                        ? "tyre-medium"
                        : "tyre-hard"
                    }
                    size={16}
                  />
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
