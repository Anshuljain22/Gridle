"use client";

import React, { useState, useEffect } from "react";
import { formatCountdown } from "@/lib/daily";
import { Thermometer, Wind } from "lucide-react";
import { Marquee } from "./magicui/Marquee";

interface LiveTickerProps {
  secondsRemaining: number;
  streak: number;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({
  secondsRemaining,
  streak,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="w-full bg-black/20 backdrop-blur-xl border-b border-white/10 overflow-hidden select-none font-mono text-[11px] text-zinc-400">
      <div className="flex items-center">
        {/* Fixed Left Badge: Official Timing Status */}
        <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md px-4 py-1.5 border-r border-white/10 shrink-0 z-10">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold tracking-wider uppercase text-[10px]">
            TRACK: GREEN FLAG
          </span>
        </div>

        {/* Smooth Scrolling Marquee Telemetry Bar */}
        <Marquee className="py-1" pauseOnHover repeat={3}>
          <div className="flex items-center gap-8 text-zinc-300">
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3 h-3 text-red-500" />
              <span>ASPHALT 34.2°C</span>
              <span className="text-zinc-600">•</span>
              <Wind className="w-3 h-3 text-sky-400" />
              <span>AIR 23.8°C</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">SECTORS:</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-800 text-amber-300 text-[10px] font-bold">
                S1 23.490
              </span>
              <span className="px-1.5 py-0.2 rounded bg-purple-950/80 border border-purple-700 text-purple-200 text-[10px] font-bold">
                🟣 S2 27.812 (RECORD)
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[10px] font-bold">
                🟢 S3 24.015
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">SPEED TRAP:</span>
              <span className="text-white font-bold tabular-nums">348.4 KM/H</span>
              <span className="text-emerald-400 text-[10px]">(DRS ENABLED)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">NEXT RESET:</span>
              <span
                suppressHydrationWarning
                className="font-bold tabular-nums px-2 py-0.5 rounded border transition-colors"
                style={{
                  color: "var(--team-primary-light)",
                  backgroundColor: "var(--team-bg-tint)",
                  borderColor: "var(--team-border)",
                }}
              >
                {mounted ? formatCountdown(secondsRemaining) : "--:--:--"} UTC
              </span>
              {mounted && streak > 0 && (
                <span className="text-amber-400 font-bold">
                  🔥 {streak} DAY STREAK
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-zinc-400">
              <span>SESSION:</span>
              <span className="text-zinc-200 font-bold">QUALIFYING Q3 SHOOTOUT</span>
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
};
