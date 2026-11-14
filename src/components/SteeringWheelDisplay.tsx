"use client";

import React, { useState, useEffect } from "react";
import { BorderBeam } from "./magicui/BorderBeam";
import { SpotlightCard } from "./reactbits/SpotlightCard";
import { TachometerSweep } from "./anime/TachometerSweep";

interface SteeringWheelDisplayProps {
  currentLap: number; // 0 to 7 (attempts used)
  maxLaps?: number;
  isWon?: boolean;
  isGameOver?: boolean;
  category: string;
}

export const SteeringWheelDisplay: React.FC<SteeringWheelDisplayProps> = ({
  currentLap,
  maxLaps = 7,
  isWon = false,
  isGameOver = false,
  category,
}) => {
  const [revLevel, setRevLevel] = useState(0);

  // Animate RPM rev meter dynamically
  useEffect(() => {
    const targetRev = Math.min(15, Math.round((currentLap / maxLaps) * 15));
    setRevLevel(targetRev);
  }, [currentLap, maxLaps]);

  const remainingLaps = Math.max(0, maxLaps - currentLap);

  return (
    <SpotlightCard
      spotlightColor="rgba(225, 6, 0, 0.22)"
      className="w-full p-3 sm:p-4 select-none"
    >
      {/* Carbon edge visual strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-zinc-400 to-red-600 opacity-80" />

      {/* Magic UI Border Beam */}
      <BorderBeam size={240} duration={8} colorFrom="#E10600" colorTo="#FF8000" />

      {/* 1. Authentic 15-LED Shift Light Bar (F1 Wheel Top Cluster) */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-6 py-1.5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 mb-3 shadow-inner">
        {/* 5 Green LEDs (Turns 1-5) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {[1, 2, 3, 4, 5].map((idx) => {
            const isLit = isWon || revLevel >= idx;
            return (
              <span
                key={`g-${idx}`}
                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-200 ${
                  isLit
                    ? "bg-emerald-400 shadow-[0_0_10px_#10B981]"
                    : "bg-emerald-950/40 border border-emerald-900/30"
                }`}
              />
            );
          })}
        </div>

        {/* Center Shift Warning Mark */}
        <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest hidden md:inline">
          {isWon ? "FLAG P1" : isGameOver ? "DNF" : "RPM CLUSTER"}
        </span>

        {/* 5 Red LEDs (Turns 6-10) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {[6, 7, 8, 9, 10].map((idx) => {
            const isLit = isWon || revLevel >= idx;
            return (
              <span
                key={`r-${idx}`}
                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-200 ${
                  isLit
                    ? "bg-red-500 shadow-[0_0_10px_#EF4444]"
                    : "bg-red-950/40 border border-red-900/30"
                }`}
              />
            );
          })}
        </div>

        {/* 5 Blue/Purple LEDs (Turns 11-15) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {[11, 12, 13, 14, 15].map((idx) => {
            const isLit = isWon || revLevel >= idx;
            return (
              <span
                key={`b-${idx}`}
                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-200 ${
                  isLit
                    ? "bg-purple-400 shadow-[0_0_10px_#A855F7]"
                    : "bg-purple-950/40 border border-purple-900/30"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* 2. Steering Wheel Digital Telemetry Screen */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        {/* Gear / Lap Position */}
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
            GEAR / LAP
          </span>
          <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white tabular-nums">
            {isWon ? "P1" : isGameOver ? "R" : `${currentLap + 1}`}
          </span>
        </div>

        {/* Lap Delta Counter */}
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
            REMAINING
          </span>
          <span
            className={`text-2xl sm:text-3xl font-black italic tabular-nums tracking-tighter ${
              remainingLaps <= 2 ? "text-red-500 animate-pulse" : "text-amber-400"
            }`}
          >
            {remainingLaps}
          </span>
        </div>

        {/* Engine Strat Mode */}
        <div className="hidden sm:flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
            STRAT MODE
          </span>
          <span className="text-sm font-bold text-emerald-400 tracking-wider">
            {isWon ? "HOTLAP" : "ATTACK 2"}
          </span>
        </div>

        {/* Target Category Radar */}
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
            TARGET
          </span>
          <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
            {category}
          </span>
        </div>

        {/* DRS Status */}
        <div className="hidden sm:flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
            DRS ZONE
          </span>
          <span className="text-xs font-bold text-emerald-400 tracking-wider">
            ENABLED
          </span>
        </div>
      </div>

      {/* 3. Tachometer Gauge (Anime.js Kinetic Engine) */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <TachometerSweep currentLap={currentLap} maxLaps={maxLaps} className="w-full" />
      </div>
    </SpotlightCard>
  );
};

