"use client";

import React from "react";
import { Hint } from "@/types";
import {
  Lock,
  Calendar,
  Flag,
  PlayCircle,
  Trophy,
  Award,
  Users,
  MapPin,
  Sparkles,
  Gauge,
  GitCommit,
  Compass,
  Flame,
} from "lucide-react";

interface HintPanelProps {
  hints: Hint[];
  attemptsCount: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-3.5 h-3.5 text-amber-400" />,
  Flag: <Flag className="w-3.5 h-3.5 text-sky-400" />,
  PlayCircle: <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />,
  Trophy: <Trophy className="w-3.5 h-3.5 text-yellow-400" />,
  Award: <Award className="w-3.5 h-3.5 text-purple-400" />,
  Users: <Users className="w-3.5 h-3.5 text-blue-400" />,
  MapPin: <MapPin className="w-3.5 h-3.5 text-red-400" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5 text-pink-400" />,
  Gauge: <Gauge className="w-3.5 h-3.5 text-teal-400" />,
  GitCommit: <GitCommit className="w-3.5 h-3.5 text-indigo-400" />,
  Compass: <Compass className="w-3.5 h-3.5 text-cyan-400" />,
  Flame: <Flame className="w-3.5 h-3.5 text-orange-400" />,
};

export const HintPanel: React.FC<HintPanelProps> = ({
  hints,
  attemptsCount,
}) => {
  const unlockedCount = Math.min(6, Math.max(0, attemptsCount));

  return (
    <div className="w-full p-4 rounded-2xl bg-[#090b10] border border-zinc-800 shadow-xl my-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
        <h3 className="font-bold text-sm text-white font-mono tracking-tight">
          Sector Telemetry Hints
        </h3>
        <span className="text-xs font-mono tabular-nums text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
          {unlockedCount}/6 Unlocked
        </span>
      </div>

      {/* Hints Grid (6 slots) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {hints.map((hint, idx) => {
          const isUnlocked = idx < unlockedCount;
          const requiredAttempt = idx + 2;

          return (
            <div
              key={hint.id}
              className={`p-3 rounded-xl border transition-all duration-300 min-h-[76px] flex flex-col justify-between ${
                isUnlocked
                  ? "bg-zinc-950 border-zinc-700/80 shadow-sm"
                  : "bg-black/30 border-zinc-850 text-zinc-600"
              }`}
            >
              {isUnlocked ? (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {hint.iconName && ICON_MAP[hint.iconName]}
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                        {hint.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
                      Sector {hint.id}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-zinc-100 leading-snug">
                    {hint.value}
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-between h-full text-zinc-500 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="text-[11px] uppercase tracking-wide">
                      Sector {hint.id} Locked
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-600">
                    Unlocks at Guess {requiredAttempt}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
