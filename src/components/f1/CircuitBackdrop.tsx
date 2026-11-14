"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CircuitBackdropProps {
  className?: string;
}

const CIRCUITS = [
  {
    id: "spa",
    name: "SPA",
    className: "absolute -left-[8%] top-[18%] w-[52vw] max-w-[760px] opacity-[0.22]",
    viewBox: "0 0 240 160",
    path: "M 28 118 C 22 102 38 92 58 88 C 78 84 86 62 104 42 C 118 26 138 22 158 28 C 182 36 198 52 206 72 C 214 92 206 112 186 122 C 166 132 142 118 128 108 C 112 96 96 118 78 128 C 58 138 36 134 28 118 Z",
    duration: "18s",
  },
  {
    id: "monaco",
    name: "MONACO",
    className: "absolute -right-[6%] top-[8%] w-[44vw] max-w-[620px] opacity-[0.18]",
    viewBox: "0 0 220 180",
    path: "M 36 118 L 78 118 C 90 118 96 104 96 90 L 96 58 C 96 38 114 30 132 40 L 158 62 C 170 72 164 90 148 96 L 128 104 C 114 110 122 128 140 128 L 176 128 C 196 128 202 108 194 92 L 172 56 C 158 34 128 22 92 24 C 52 26 24 58 22 90 C 20 114 24 118 36 118 Z",
    duration: "22s",
  },
  {
    id: "silverstone",
    name: "SILVERSTONE",
    className: "absolute left-[22%] bottom-[-8%] w-[56vw] max-w-[820px] opacity-[0.16]",
    viewBox: "0 0 240 150",
    path: "M 24 78 L 52 38 L 92 46 L 128 22 L 168 38 L 148 72 L 178 108 L 138 122 L 96 102 L 62 124 L 28 96 Z",
    duration: "16s",
  },
  {
    id: "suzuka",
    name: "SUZUKA",
    className: "absolute right-[4%] bottom-[12%] w-[38vw] max-w-[540px] opacity-[0.2]",
    viewBox: "0 0 200 160",
    path: "M 36 42 C 62 22 102 34 128 58 C 148 74 154 104 128 118 C 104 132 88 108 104 86 C 118 66 86 58 62 72 C 42 84 24 60 36 42 Z",
    duration: "20s",
  },
  {
    id: "monza",
    name: "MONZA",
    className: "absolute left-[2%] bottom-[28%] w-[30vw] max-w-[420px] opacity-[0.14]",
    viewBox: "0 0 200 140",
    path: "M 22 28 L 128 28 C 156 28 168 48 156 62 L 78 62 C 58 62 58 86 78 86 L 150 86 C 168 86 176 112 148 112 L 32 112 C 16 112 14 28 22 28 Z",
    duration: "14s",
  },
];

export const CircuitBackdrop: React.FC<CircuitBackdropProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 asphalt-grain opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,6,8,0.55)_78%)]" />

      {/* Floodlight wash over the circuit park */}
      <div className="absolute -top-24 left-1/3 h-56 w-[40%] rounded-full bg-red-600/10 blur-3xl" />
      <div className="absolute bottom-10 right-1/4 h-48 w-[32%] rounded-full bg-cyan-500/8 blur-3xl" />

      {CIRCUITS.map((circuit) => (
        <div key={circuit.id} className={circuit.className}>
          <svg viewBox={circuit.viewBox} className="w-full h-auto" fill="none">
            <path
              d={circuit.path}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={circuit.path}
              stroke="rgba(18,18,22,0.9)"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={circuit.path}
              className="circuit-kerb"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={circuit.path}
              className="circuit-racing-line"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ animationDuration: circuit.duration }}
            />
          </svg>
          <span className="absolute left-6 top-4 font-mono text-[10px] tracking-[0.35em] text-white/25">
            {circuit.name}
          </span>
        </div>
      ))}

      {/* Chequered + kerb rails */}
      <div className="absolute inset-x-0 top-0 h-1.5 kerb-divider opacity-70" />
      <div className="absolute left-0 top-0 h-full w-1.5 kerb-divider-vertical opacity-40" />
      <div className="absolute right-0 top-0 h-full w-1.5 kerb-divider-vertical opacity-40" />
    </div>
  );
};
