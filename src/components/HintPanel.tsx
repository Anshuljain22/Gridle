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
import { motion, AnimatePresence } from "motion/react";

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
        <h3 className="font-bold text-sm text-white font-mono tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          Sector Telemetry Hints
        </h3>
        <motion.span
          key={unlockedCount}
          initial={{ scale: 1.2, color: "#ef4444" }}
          animate={{ scale: 1, color: "#a1a1aa" }}
          transition={{ duration: 0.3 }}
          className="text-xs font-mono tabular-nums bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 font-bold"
        >
          {unlockedCount}/6 Unlocked
        </motion.span>
      </div>

      {/* Hints Grid (6 slots) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {hints.map((hint, idx) => {
          const isUnlocked = idx < unlockedCount;
          const requiredAttempt = idx + 2;

          return (
            <motion.div
              layout
              key={hint.id}
              initial={false}
              animate={{
                borderColor: isUnlocked ? "rgba(82, 82, 91, 0.8)" : "rgba(39, 39, 42, 0.6)",
              }}
              whileHover={{ scale: 1.015 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={`p-3 rounded-xl border min-h-[76px] flex flex-col justify-between overflow-hidden relative ${
                isUnlocked
                  ? "bg-zinc-950 border-zinc-700/80 shadow-sm"
                  : "bg-black/30 border-zinc-850 text-zinc-600"
              }`}
            >
              <AnimatePresence mode="wait">
                {isUnlocked ? (
                  <motion.div
                    key="unlocked"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full"
                  >
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between h-full text-zinc-500 font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-zinc-600" />
                      <span className="text-[11px] uppercase tracking-wide">
                        Sector {hint.id} Locked
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-600">
                      Unlocks at Guess {requiredAttempt}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
