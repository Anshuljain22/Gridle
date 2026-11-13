"use client";

import React from "react";
import { UserStats } from "@/types";
import { X, Trophy, BarChart2 } from "lucide-react";

interface GameStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const GameStatsModal: React.FC<GameStatsModalProps> = ({
  isOpen,
  onClose,
  stats,
}) => {
  if (!isOpen) return null;

  const winPercentage =
    stats.totalGames > 0 ? Math.round((stats.wins / stats.totalGames) * 100) : 0;

  // Calculate average guesses to win
  let totalWinningGuesses = 0;
  let winningGamesCount = 0;
  Object.entries(stats.guessDistribution).forEach(([guessNum, count]) => {
    totalWinningGuesses += Number(guessNum) * count;
    winningGamesCount += count;
  });
  const avgGuesses =
    winningGamesCount > 0
      ? (totalWinningGuesses / winningGamesCount).toFixed(1)
      : "0.0";

  // Scale max count for distribution chart
  const maxGuessCount = Math.max(1, ...Object.values(stats.guessDistribution));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#090b10] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-6">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-black italic tracking-tight text-white font-mono">
            DRIVER TELEMETRY & RECORDS
          </h2>
        </div>

        {/* Top 4 Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
            <span className="block text-2xl sm:text-3xl font-black font-mono tabular-nums text-white">
              {stats.totalGames}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Grands Prix
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
            <span className="block text-2xl sm:text-3xl font-black font-mono tabular-nums text-emerald-400">
              {winPercentage}%
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Win Rate
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
            <span className="block text-2xl sm:text-3xl font-black font-mono tabular-nums text-amber-400">
              {stats.currentStreak}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Current Streak
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
            <span className="block text-2xl sm:text-3xl font-black font-mono tabular-nums text-red-500">
              {stats.maxStreak}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Max Streak
            </span>
          </div>
        </div>

        {/* Guess Distribution Bar Chart (1 to 7) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5 text-red-500" />
              <span>Qualifying Lap Distribution</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400 tabular-nums">
              Average: <strong className="text-white">{avgGuesses}</strong>
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              const count =
                stats.guessDistribution[num as keyof typeof stats.guessDistribution] || 0;
              const widthPct = Math.max(8, Math.round((count / maxGuessCount) * 100));

              return (
                <div key={num} className="flex items-center gap-2">
                  <span className="w-4 font-bold text-zinc-400 tabular-nums">{num}</span>
                  <div className="flex-1 bg-black/60 rounded-xl overflow-hidden h-6 p-0.5 border border-zinc-800/80">
                    <div
                      className={`h-full rounded-lg flex items-center justify-end pr-2 text-[11px] font-bold tabular-nums transition-all duration-500 ${
                        count > 0 ? "bg-red-600 text-white" : "bg-zinc-900 text-zinc-600"
                      }`}
                      style={{ width: `${widthPct}%` }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown By Category & Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Category Breakdown */}
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Category Records
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-300">
                <span>Drivers:</span>
                <span className="font-bold tabular-nums">
                  {stats.byCategory.driver.won}/{stats.byCategory.driver.played}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Constructors:</span>
                <span className="font-bold tabular-nums">
                  {stats.byCategory.team.won}/{stats.byCategory.team.played}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Circuits:</span>
                <span className="font-bold tabular-nums">
                  {stats.byCategory.track.won}/{stats.byCategory.track.played}
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Tyre Compound Records
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-300">
                <span className="text-red-400">Soft (Easy):</span>
                <span className="font-bold tabular-nums">
                  {stats.byDifficulty.easy.won}/{stats.byDifficulty.easy.played}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-amber-400">Medium:</span>
                <span className="font-bold tabular-nums">
                  {stats.byDifficulty.medium.won}/{stats.byDifficulty.medium.played}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-300">Hard:</span>
                <span className="font-bold tabular-nums">
                  {stats.byDifficulty.hard.won}/{stats.byDifficulty.hard.played}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-bold text-sm border border-zinc-800 transition-all"
        >
          CLOSE TELEMETRY
        </button>
      </div>
    </div>
  );
};
