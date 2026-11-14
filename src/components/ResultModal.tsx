"use client";

import React, { useEffect, useState } from "react";
import { Category, Driver, Team, Track, GameMode, ComparisonResult } from "@/types";
import { Share2, RotateCcw, Check, X, BookOpen, Quote, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { generateShareText, copyToClipboard } from "@/lib/share";
import { getFlag } from "@/data/continents";
import { sound } from "@/lib/sound";
import { motion, AnimatePresence } from "motion/react";
import { MotionButton } from "@/components/watermelon/MotionButton";

interface ResultModalProps {
  isOpen: boolean;
  isWon: boolean;
  category: Category;
  mode: GameMode;
  targetEntity: Driver | Team | Track;
  attemptsCount: number;
  hintsUsed: number;
  comparisons: ComparisonResult[];
  onPlayAgain: () => void;
  onClose: () => void;
  onNextCategory?: (nextCat: Category) => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  isWon,
  category,
  mode,
  targetEntity,
  attemptsCount,
  hintsUsed,
  comparisons,
  onPlayAgain,
  onClose,
  onNextCategory,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && isWon) {
      sound.playVictory();
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E10600", "#FFD700", "#10B981", "#FFFFFF"],
        });
      } catch {}
    } else if (isOpen && !isWon) {
      sound.playWrong();
    }
  }, [isOpen, isWon]);

  // Performance Rating Title
  let performanceTitle = "P10 Scramble";
  let performanceBadge = "bg-zinc-800 text-zinc-300";

  if (isWon) {
    if (attemptsCount === 1) {
      performanceTitle = "GRAND SLAM (FLAWLESS DRIVE)";
      performanceBadge = "bg-amber-500/20 text-amber-300 border-amber-500/50";
    } else if (attemptsCount === 2) {
      performanceTitle = "POLE TO FLAG (MASTERCLASS)";
      performanceBadge = "bg-yellow-500/20 text-yellow-300 border-yellow-500/50";
    } else if (attemptsCount <= 4) {
      performanceTitle = "PODIUM FINISH (EXCEPTIONAL PACE)";
      performanceBadge = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50";
    } else if (attemptsCount <= 6) {
      performanceTitle = "POINTS FINISH (SOLID TACTICS)";
      performanceBadge = "bg-blue-500/20 text-blue-300 border-blue-500/50";
    } else {
      performanceTitle = "P10 SCRAMBLE (CROSSED THE LINE)";
      performanceBadge = "bg-zinc-850 text-zinc-300 border-zinc-700";
    }
  } else {
    performanceTitle = "DNF (DID NOT FINISH - RETIRED)";
    performanceBadge = "bg-red-950/80 text-red-300 border-red-800";
  }

  const handleShare = async () => {
    const text = generateShareText(category, mode, comparisons, isWon, 7);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const flag =
    category === "driver"
      ? getFlag((targetEntity as Driver).nationality)
      : getFlag(
          category === "team"
            ? (targetEntity as Team).country
            : (targetEntity as Track).country
        );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop with Motion Dev Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xl"
          />

          {/* Modal Container with Watermelon UI Spring Scale */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl f1-glass-modal rounded-3xl p-6 sm:p-8 my-8 overflow-hidden z-10"
          >
            {/* Top Accent Strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 ${
                isWon ? "bg-emerald-500" : "bg-red-600"
              }`}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Banner */}
            <div className="text-center mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border mb-3 ${performanceBadge}`}
              >
                {performanceTitle}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white mb-1">
                {isWon ? "CIRCUIT CONQUERED" : "RACE SUMMARY"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                {isWon
                  ? `Mystery ${category} identified in ${attemptsCount}/7 attempts with ${hintsUsed} progressive hints.`
                  : `The mystery ${category} for this session was:`}
              </p>
            </div>

            {/* Answer Reveal Card */}
            <div className="relative p-5 rounded-2xl f1-glass-subtle mb-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl sm:text-5xl">{flag}</div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                    {targetEntity.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {category === "driver" &&
                      `${(targetEntity as Driver).nationality} • Debut: ${
                        (targetEntity as Driver).debutYear
                      } • ${(targetEntity as Driver).championships}x Champion • ${
                        (targetEntity as Driver).wins
                      } Wins`}
                    {category === "team" &&
                      `${(targetEntity as Team).country} • Debut: ${
                        (targetEntity as Team).debutYear
                      } • ${(targetEntity as Team).championships}x Constructors' Titles`}
                    {category === "track" &&
                      `${(targetEntity as Track).country} • ${
                        (targetEntity as Track).lengthKm
                      } km • ${(targetEntity as Track).circuitType} Circuit`}
                  </p>
                </div>
              </div>
            </div>

            {/* Educational F1 Deep Dive Section */}
            <div className="p-4 sm:p-5 rounded-2xl f1-glass-subtle mb-6 text-left">
              <div className="flex items-center gap-2 mb-3 text-red-500">
                <BookOpen className="w-4 h-4" />
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider font-mono text-white">
                  Official F1 Knowledge Archive
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {targetEntity.educationalInfo.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    {targetEntity.educationalInfo.highlight1Title}
                  </span>
                  <span className="text-xs text-zinc-300 leading-snug block">
                    {targetEntity.educationalInfo.highlight1Text}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    {targetEntity.educationalInfo.highlight2Title}
                  </span>
                  <span className="text-xs text-zinc-300 leading-snug block">
                    {targetEntity.educationalInfo.highlight2Text}
                  </span>
                </div>
              </div>

              {/* Famous Quote or Trivia */}
              {targetEntity.educationalInfo.quoteOrTrivia && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-zinc-300 italic">
                  <Quote className="w-4 h-4 text-red-500 shrink-0" />
                  <span>&ldquo;{targetEntity.educationalInfo.quoteOrTrivia}&rdquo;</span>
                </div>
              )}
            </div>

            {/* Action Buttons with Watermelon UI MotionButton */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <MotionButton
                onClick={handleShare}
                size="lg"
                shimmer
                className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60 border-emerald-500/40"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>COPIED RESULT TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>SHARE WORDLE RESULT</span>
                  </>
                )}
              </MotionButton>

              {mode === "practice" ? (
                <MotionButton
                  onClick={onPlayAgain}
                  size="lg"
                  variant="primary"
                  className="w-full sm:flex-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>NEW PRACTICE ROUND</span>
                </MotionButton>
              ) : (
                <div className="w-full sm:flex-1 flex items-center gap-2">
                  {onNextCategory && (
                    <MotionButton
                      onClick={() => {
                        const next =
                          category === "driver" ? "team" : category === "team" ? "track" : "driver";
                        onNextCategory(next);
                      }}
                      size="lg"
                      variant="secondary"
                      className="w-full"
                    >
                      <span>NEXT DAILY CATEGORY</span>
                      <ChevronRight className="w-4 h-4" />
                    </MotionButton>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
