"use client";

import React from "react";
import { Category, ComparisonResult, DriverComparison, TeamComparison, TrackComparison } from "@/types";
import { getFlag } from "@/data/continents";

interface TimingTowerProps {
  category: Category;
  comparisons: ComparisonResult[];
  maxLaps?: number;
}

export const TimingTower: React.FC<TimingTowerProps> = ({
  category,
  comparisons,
  maxLaps = 7,
}) => {
  return (
    <div className="w-full f1-glass rounded-3xl p-3 sm:p-4 relative select-none">
      {/* Timing Tower Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <h3 className="font-bold text-white uppercase tracking-wider">
            F1 TIMING TOWER
          </h3>
        </div>
        <span className="text-[11px] text-zinc-300 tabular-nums bg-white/5 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
          LAPS {comparisons.length}/{maxLaps}
        </span>
      </div>

      {/* 7 Timing Slots (Running Order) */}
      <div className="space-y-1.5 font-mono text-xs">
        {Array.from({ length: maxLaps }).map((_, lapIdx) => {
          const comp = comparisons[lapIdx];
          const isCurrentLap = comparisons.length === lapIdx;

          if (comp) {
            const isWinner = comp.isCorrect;
            const flag =
              category === "driver"
                ? getFlag((comp as DriverComparison).guessedItem.nationality)
                : getFlag(
                    category === "team"
                      ? (comp as TeamComparison).guessedItem.country
                      : (comp as TrackComparison).guessedItem.country
                  );

            return (
              <div
                key={lapIdx}
                className={`flex items-center justify-between p-2 rounded-xl border transition-all backdrop-blur-md ${
                  isWinner
                    ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-950/50"
                    : "bg-white/5 border-white/10 text-zinc-200"
                }`}
              >
                {/* Left: Position & Flag & Name */}
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs tabular-nums ${
                      isWinner
                        ? "bg-emerald-500 text-black font-black"
                        : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    P{lapIdx + 1}
                  </span>
                  <span className="text-sm shrink-0">{flag}</span>
                  <span className="font-bold text-white text-xs truncate max-w-[130px] sm:max-w-[170px]">
                    {comp.name}
                  </span>
                </div>

                {/* Right: Sector Times Status */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isWinner ? "bg-purple-500" : "bg-emerald-500"
                      }`}
                    />
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isWinner ? "bg-purple-500" : "bg-amber-500"
                      }`}
                    />
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isWinner ? "bg-purple-500" : "bg-zinc-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isWinner
                        ? "bg-emerald-500 text-black font-black"
                        : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {isWinner ? "MATCH" : `LAP ${lapIdx + 1}`}
                  </span>
                </div>
              </div>
            );
          }

          // Empty Slot
          return (
            <div
              key={lapIdx}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all backdrop-blur-sm ${
                isCurrentLap
                  ? "bg-red-950/30 border-red-500/50 text-red-300 shadow-sm shadow-red-950/40"
                  : "bg-black/25 border-white/5 text-zinc-500"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs tabular-nums text-zinc-400">
                  P{lapIdx + 1}
                </span>
                <span className="text-[11px] font-medium tracking-wide">
                  {isCurrentLap ? "CURRENT SECTOR ATTEMPT" : "IN PIT (AWAITING LAP)"}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">
                {isCurrentLap ? "ACTIVE" : "--:--"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

