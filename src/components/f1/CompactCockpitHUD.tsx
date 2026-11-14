"use client";

import React, { useState, useEffect } from "react";
import { Category, GameMode, Difficulty, UserStats } from "@/types";
import { formatCountdown } from "@/lib/daily";
import { Icon3D, Icon3DType } from "../icons3d/Icon3D";
import { Clock, Sparkles, Compass, CheckCircle2, Shield, User, Flag } from "lucide-react";
import { motion } from "motion/react";
import { sound } from "@/lib/sound";

interface CompactCockpitHUDProps {
  category: Category;
  onSelectCategory: (cat: Category) => void;
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  difficulty: Difficulty;
  onSelectDifficulty: (diff: Difficulty) => void;
  currentLap: number;
  maxLaps?: number;
  isWon?: boolean;
  isGameOver?: boolean;
  dailySecondsRemaining: number;
  dailyCompleted: { driver: boolean; team: boolean; track: boolean };
}

export const CompactCockpitHUD: React.FC<CompactCockpitHUDProps> = ({
  category,
  onSelectCategory,
  gameMode,
  onSelectGameMode,
  difficulty,
  onSelectDifficulty,
  currentLap,
  maxLaps = 7,
  isWon = false,
  isGameOver = false,
  dailySecondsRemaining,
  dailyCompleted,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const remaining = Math.max(0, maxLaps - currentLap);
  const revLevel = Math.min(15, Math.round((currentLap / maxLaps) * 15));

  const categories: { id: Category; label: string; icon: Icon3DType; completed: boolean }[] = [
    { id: "driver", label: "DRIVERS", icon: "helmet", completed: dailyCompleted.driver },
    { id: "team", label: "CONSTRUCTORS", icon: "car", completed: dailyCompleted.team },
    { id: "track", label: "CIRCUITS", icon: "flag", completed: dailyCompleted.track },
  ];

  return (
    <div className="w-full rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl px-3 py-1.5 sm:px-4 sm:py-2 relative select-none shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 pl-1 pr-1">
        
        {/* 1. Category Switcher (Drivers, Constructors, Circuits) */}
        <div className="flex items-center gap-1.5 bg-black/70 p-1 rounded-xl border border-white/10 shrink-0">
          {categories.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  sound.playLightBeep(650);
                }}
                className={`relative px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  isSelected ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: "var(--team-primary)",
                        boxShadow: "0 0 12px var(--team-glow)",
                      }
                    : undefined
                }
              >
                <Icon3D name={cat.icon} size={15} />
                <span>{cat.label}</span>
                {gameMode === "daily" && cat.completed && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. Center Instrument: F1 15-LED Shift Light Cluster & Lap Badge */}
        <div className="flex items-center gap-2 sm:gap-3 bg-black/80 px-3 sm:px-5 py-1 rounded-xl border border-white/10">
          {/* 5 Green LEDs */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={`g-${i}`}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  isWon || revLevel >= i
                    ? "bg-emerald-400 shadow-[0_0_8px_#10B981]"
                    : "bg-emerald-950/40 border border-emerald-900/30"
                }`}
              />
            ))}
          </div>

          {/* Lap / Status Badge */}
          <div className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-center">
            <span className="text-[9px] text-zinc-400 block tracking-widest leading-none">
              {isWon ? "WINNER" : isGameOver ? "DNF" : "ATTEMPT"}
            </span>
            <span
              className="text-xs sm:text-sm font-black italic tracking-tight"
              style={{ color: isWon ? "#10B981" : "var(--team-primary-light, #FFFFFF)" }}
            >
              {isWon ? "P1" : isGameOver ? "OUT" : `${currentLap + 1}/${maxLaps}`}
            </span>
          </div>

          {/* 5 Red LEDs */}
          <div className="flex items-center gap-1">
            {[6, 7, 8, 9, 10].map((i) => (
              <span
                key={`r-${i}`}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  isWon || revLevel >= i
                    ? "bg-red-500 shadow-[0_0_8px_#EF4444]"
                    : "bg-red-950/40 border border-red-900/30"
                }`}
              />
            ))}
          </div>

          {/* 5 Purple LEDs */}
          <div className="flex items-center gap-1 hidden sm:flex">
            {[11, 12, 13, 14, 15].map((i) => (
              <span
                key={`p-${i}`}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  isWon || revLevel >= i
                    ? "bg-purple-400 shadow-[0_0_8px_#C084FC]"
                    : "bg-purple-950/40 border border-purple-900/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. Mode Toggle & Reset Countdown */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <div className="flex items-center bg-black/70 p-0.5 rounded-xl border border-white/10">
            <button
              onClick={() => onSelectGameMode("daily")}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                gameMode === "daily" ? "bg-white/15 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>DAILY</span>
            </button>
            <button
              onClick={() => onSelectGameMode("practice")}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                gameMode === "practice" ? "bg-white/15 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Compass className="w-3 h-3 text-sky-400" />
              <span>PRACTICE</span>
            </button>
          </div>

          {gameMode === "daily" ? (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 border border-white/10 text-[11px] text-zinc-300">
              <Clock className="w-3 h-3 animate-pulse" style={{ color: "var(--team-primary)" }} />
              <span suppressHydrationWarning className="tabular-nums font-bold">
                {mounted ? formatCountdown(dailySecondsRemaining) : "--:--:--"}
              </span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1">
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => onSelectDifficulty(d)}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border transition-all ${
                    difficulty === d
                      ? "bg-white/20 border-white text-white"
                      : "bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {d === "easy" ? "SOFT" : d === "medium" ? "MED" : "HARD"}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
