"use client";

import React from "react";
import { X, HelpCircle, ArrowUp, Lock } from "lucide-react";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

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
        <div className="flex items-center gap-2.5 mb-4">
          <HelpCircle className="w-5 h-5 text-red-500" />
          <h2 className="text-xl sm:text-2xl font-black italic tracking-tight text-white font-mono">
            RACE REGULATIONS & HOW TO PLAY
          </h2>
        </div>

        <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
          Test your Formula 1 racing knowledge! Identify the mystery{" "}
          <strong className="text-white">Driver</strong>,{" "}
          <strong className="text-white">Constructor</strong>, or{" "}
          <strong className="text-white">Circuit</strong> within{" "}
          <span className="text-red-500 font-bold">7 attempts</span>.
        </p>

        {/* 6 Progressive Hints Schedule */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 mb-6">
          <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Progressive Telemetry Hints</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-3">
            With every incorrect attempt, a new telemetry clue unlocks automatically:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-2 rounded-xl bg-black/50 border border-zinc-800">
              <span className="block text-zinc-500 text-[10px]">GUESS 1</span>
              <span className="font-bold text-zinc-400">0 Hints</span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-zinc-800">
              <span className="block text-zinc-500 text-[10px]">GUESS 2</span>
              <span className="font-bold text-amber-400">1 Hint</span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-zinc-800">
              <span className="block text-zinc-500 text-[10px]">GUESS 3-6</span>
              <span className="font-bold text-amber-400">2-5 Hints</span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-zinc-800">
              <span className="block text-zinc-500 text-[10px]">GUESS 7</span>
              <span className="font-bold text-emerald-400">All 6 Hints</span>
            </div>
          </div>
        </div>

        {/* Wordle Color Feedback System */}
        <div className="space-y-3 mb-6">
          <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Comparison Telemetry Codes
          </h3>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-600 text-emerald-300 font-mono font-bold flex items-center justify-center shrink-0">
              ✓
            </div>
            <div className="text-xs">
              <strong className="text-emerald-400 block font-mono">GREEN - EXACT MATCH</strong>
              <span className="text-zinc-400">
                This exact attribute matches the mystery entity precisely.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-600 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0">
              ~
            </div>
            <div className="text-xs">
              <strong className="text-amber-400 block font-mono">YELLOW - CLOSE / PARTIAL</strong>
              <span className="text-zinc-400">
                Same continent/region for nationalities, or number is close within tolerance (e.g. ±3 years, ±1 championship, ±10 wins).
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono font-bold flex items-center justify-center shrink-0">
              ✕
            </div>
            <div className="text-xs">
              <strong className="text-zinc-300 block font-mono">GREY - MISMATCH</strong>
              <span className="text-zinc-400">
                Not a match and outside the close threshold.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono font-bold flex items-center justify-center shrink-0">
              <ArrowUp className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <strong className="text-zinc-200 block font-mono">DIRECTIONAL ARROWS (↑ / ↓)</strong>
              <span className="text-zinc-400">
                Indicates whether the mystery answer&apos;s numerical value is higher (↑) or lower (↓) than your guess.
              </span>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm shadow-md transition-all"
        >
          CONFIRM REGULATIONS & ENTER COCKPIT
        </button>
      </div>
    </div>
  );
};
