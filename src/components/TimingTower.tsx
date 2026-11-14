"use client";

import React from "react";
import { Category, ComparisonResult, DriverComparison, TeamComparison, TrackComparison } from "@/types";
import { getFlag } from "@/data/continents";
import { SpotlightCard } from "./reactbits/SpotlightCard";
import { Icon3D } from "./icons3d/Icon3D";

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
    <div className="cockpit-bezel cockpit-chamfer p-4 select-none relative overflow-hidden">
      {/* 4 Titanium hex bolts in bezel corners */}
      <div className="absolute top-2.5 left-2.5 hex-rivet" />
      <div className="absolute top-2.5 right-2.5 hex-rivet" />
      <div className="absolute bottom-2.5 left-2.5 hex-rivet" />
      <div className="absolute bottom-2.5 right-2.5 hex-rivet" />

      {/* Timing Tower Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-xs font-mono pl-1 pr-1">
        <div className="flex items-center gap-2">
          <Icon3D name="stopwatch" size={20} />
          <h3 className="font-black text-white uppercase tracking-wider text-xs">
            FIA OFFICIAL TIMING TOWER
          </h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-300 tabular-nums bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
          LAP {comparisons.length}/{maxLaps}
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
                  ? "shadow-sm"
                  : "bg-black/35 border-white/5 text-zinc-500"
              }`}
              style={
                isCurrentLap
                  ? {
                      backgroundColor: "var(--team-bg-tint)",
                      borderColor: "var(--team-primary)",
                      color: "var(--team-primary-light)",
                      boxShadow: "0 0 14px var(--team-glow)",
                    }
                  : undefined
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs tabular-nums text-zinc-400">
                  P{lapIdx + 1}
                </span>
                <span className="text-[11px] font-medium tracking-wide">
                  {isCurrentLap ? "CURRENT SECTOR ATTEMPT" : "IN PIT (AWAITING LAP)"}
                </span>
              </div>
              <span
                className="text-[10px] font-mono font-bold"
                style={{ color: isCurrentLap ? "var(--team-primary)" : "#71717a" }}
              >
                {isCurrentLap ? "ACTIVE" : "--:--"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

