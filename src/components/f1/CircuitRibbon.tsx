"use client";

import React from "react";
import { TRACK_PATHS } from "@/components/TrackSvg";

const RIBBON = [
  { id: "monaco", label: "MON" },
  { id: "silverstone", label: "SIL" },
  { id: "spa", label: "SPA" },
  { id: "monza", label: "MNZ" },
  { id: "suzuka", label: "SUZ" },
  { id: "interlagos", label: "INT" },
  { id: "cota", label: "AUS" },
  { id: "yasmarina", label: "YAS" },
];

export const CircuitRibbon: React.FC = () => {
  return (
    <div className="w-full px-4">
      <div className="max-w-7xl mx-auto mt-3 mb-1 rounded-2xl f1-glass px-3 py-2 flex items-center gap-3 overflow-hidden">
        <span
          className="shrink-0 font-mono text-[10px] tracking-[0.28em] font-bold transition-colors"
          style={{ color: "var(--team-primary)" }}
        >
          CIRCUIT MAP
        </span>
        <div className="h-6 w-px bg-white/10 shrink-0" />
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {RIBBON.map((item) => {
            const path = TRACK_PATHS[item.id] || TRACK_PATHS.monaco;
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 shrink-0 text-zinc-400"
              >
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <path
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/50"
                  />
                </svg>
                <span className="font-mono text-[10px] tracking-widest text-zinc-500">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
