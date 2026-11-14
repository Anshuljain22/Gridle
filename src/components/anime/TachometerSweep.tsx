"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";
import { cn } from "@/lib/utils";

interface TachometerSweepProps {
  currentLap: number;
  maxLaps?: number;
  className?: string;
}

/**
 * Anime.js: Precision Mechanical Tachometer Dial
 * Animated RPM needle sweep and mechanical kinetic gauge powered by Anime.js.
 */
export const TachometerSweep: React.FC<TachometerSweepProps> = ({
  currentLap,
  maxLaps = 7,
  className,
}) => {
  const needleRef = useRef<SVGGElement>(null);
  const rpmCounterRef = useRef<HTMLSpanElement>(null);

  // Map 0-7 laps to 0 - 15,000 RPM (and -120deg to +120deg angle)
  const targetRpm = Math.min(15000, Math.round((currentLap / maxLaps) * 15000));
  const targetAngle = -120 + (currentLap / maxLaps) * 240;

  useEffect(() => {
    if (needleRef.current) {
      animate(needleRef.current, {
        transform: `rotate(${targetAngle} 60 60)`,
        duration: 900,
        ease: "outElastic(1, .6)",
      });
    }

    if (rpmCounterRef.current) {
      const obj = { val: Number(rpmCounterRef.current.innerText.replace(/,/g, "")) || 0 };
      animate(obj, {
        val: targetRpm,
        duration: 700,
        ease: "outExpo",
        onUpdate: () => {
          if (rpmCounterRef.current) {
            rpmCounterRef.current.innerText = Math.round(obj.val).toLocaleString();
          }
        },
      });
    }
  }, [currentLap, maxLaps, targetAngle, targetRpm]);

  const isRedline = currentLap >= 5;

  return (
    <div className={cn("flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md", className)}>
      {/* Mini Gauge SVG */}
      <div className="relative w-14 h-14 shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Gauge Background Track */}
          <path
            d="M 25 95 A 50 50 0 1 1 95 95"
            fill="none"
            stroke="#27272A"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active RPM Segment */}
          <path
            d="M 25 95 A 50 50 0 1 1 95 95"
            fill="none"
            stroke={isRedline ? "#EF4444" : "#10B981"}
            strokeWidth="8"
            strokeDasharray="210"
            strokeDashoffset={210 - (currentLap / maxLaps) * 210}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {/* Dial Center Nut */}
          <circle cx="60" cy="60" r="7" fill="#18181B" stroke="#52525B" strokeWidth="2" />
          {/* Animated Needle */}
          <g ref={needleRef} transform="rotate(-120 60 60)">
            <line x1="60" y1="60" x2="60" y2="18" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="60" cy="60" r="3" fill="#EF4444" />
          </g>
        </svg>
      </div>

      {/* Numerical RPM Readout */}
      <div className="font-mono text-left">
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <span>ENGINE RPM</span>
          {isRedline && (
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span
            ref={rpmCounterRef}
            className={cn(
              "text-base font-black tabular-nums transition-colors",
              isRedline ? "text-red-500" : "text-white"
            )}
          >
            0
          </span>
          <span className="text-[10px] text-zinc-400 font-bold">RPM</span>
        </div>
      </div>
    </div>
  );
};
