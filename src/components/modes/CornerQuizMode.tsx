"use client";

import React, { useState } from "react";
import { CORNER_PUZZLES, CornerPuzzle } from "@/data/cornerPuzzles";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { DecryptedText } from "../reactbits/DecryptedText";
import { Icon3D } from "../icons3d/Icon3D";
import { MotionButton } from "../watermelon/MotionButton";
import { sound } from "@/lib/sound";
import { getFlag } from "@/data/continents";
import { Gauge, Compass, ArrowRight, CheckCircle2, XCircle, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export const CornerQuizMode: React.FC = () => {
  const [cornerIndex, setCornerIndex] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentCorner = CORNER_PUZZLES[cornerIndex];

  // Generate 4 multiple-choice options (1 correct + 3 random shuffles)
  const options = React.useMemo(() => {
    const wrong = CORNER_PUZZLES.filter((c) => c.id !== currentCorner.id);
    const shuffledWrong = [...wrong].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...shuffledWrong, currentCorner].sort(() => 0.5 - Math.random());
  }, [cornerIndex, currentCorner]);

  const handleSelectOption = (option: CornerPuzzle) => {
    if (isAnswered) return;
    setSelectedGuess(option.id);
    setIsAnswered(true);

    if (option.id === currentCorner.id) {
      setScore((s) => s + 150);
      sound.playCorrect();
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#E10600", "#FFD700", "#10B981"],
        });
      } catch {}
    } else {
      sound.playWrong();
    }
  };

  const nextCorner = () => {
    const nextIdx = (cornerIndex + 1) % CORNER_PUZZLES.length;
    setCornerIndex(nextIdx);
    setSelectedGuess(null);
    setIsAnswered(false);
  };

  const isCorrect = selectedGuess === currentCorner.id;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 select-none animate-fadeIn py-2">
      {/* Header */}
      <SpotlightCard spotlightColor="var(--team-glow)" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon3D name="flag" size={38} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  APEX TELEMETRY
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  SECTOR {cornerIndex + 1}/{CORNER_PUZZLES.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono mt-0.5">
                <ShinyText text="GUESS THE FAMOUS CORNER" className="text-xl sm:text-2xl font-black italic" />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">SECTOR SCORE</span>
              <span className="font-bold text-amber-400 text-sm">{score} PTS</span>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Main Corner Inspection Card */}
      <div className="f1-glass rounded-3xl p-5 sm:p-8 relative overflow-hidden">
        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs mb-6">
          <div className="p-2.5 rounded-2xl bg-black/60 border border-white/10">
            <span className="text-[9px] text-zinc-500 uppercase block">APEX SPEED</span>
            <span className="text-lg font-black text-white tabular-nums">
              {currentCorner.speedKmh} <span className="text-xs text-zinc-400">KM/H</span>
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-black/60 border border-white/10">
            <span className="text-[9px] text-zinc-500 uppercase block">LATERAL LOAD</span>
            <span className="text-lg font-black text-red-500 tabular-nums">
              {currentCorner.lateralG} <span className="text-xs text-zinc-400">G</span>
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-black/60 border border-white/10">
            <span className="text-[9px] text-zinc-500 uppercase block">CORNER TURNS</span>
            <span className="text-sm font-bold text-amber-400">
              {currentCorner.turnNumber}
            </span>
          </div>
        </div>

        {/* Vector SVG Corner Silhouette Box */}
        <div className="relative h-60 w-full rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center p-6 shadow-inner overflow-hidden mb-6">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none" />

          {/* SVG Silhouette Curve with Glowing Team Track Outline */}
          <svg
            viewBox={currentCorner.viewBox}
            className="w-full h-full max-w-sm"
            style={{ filter: "drop-shadow(0 0 15px var(--team-glow))" }}
          >
            {/* Outer Kerbing Pattern */}
            <path
              d={currentCorner.svgPath}
              fill="none"
              stroke="#27272A"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Asphalt Racing Line */}
            <path
              d={currentCorner.svgPath}
              fill="none"
              stroke="var(--team-primary)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Apex Clipping Marker */}
            <circle cx="100" cy="70" r="5" fill="#FFD700" className="animate-pulse" />
          </svg>

          {/* Radar Category Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 border border-white/10 font-mono text-[10px] text-zinc-400">
            {currentCorner.fameFactor} Apex
          </div>
        </div>

        {/* 4 Multi-Choice Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => {
            const isSelected = selectedGuess === option.id;
            const isThisCorrect = option.id === currentCorner.id;

            let cardStyle = "bg-white/5 border-white/10 text-white hover:border-[var(--team-primary)]";

            if (isAnswered) {
              if (isThisCorrect) {
                cardStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/40";
              } else if (isSelected) {
                cardStyle = "bg-red-950/60 border-red-500 text-red-200";
              } else {
                cardStyle = "bg-black/40 border-white/5 text-zinc-500 opacity-50";
              }
            }

            return (
              <motion.button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                className={`p-4 rounded-2xl border text-left font-mono transition-all backdrop-blur-md flex items-center justify-between ${cardStyle}`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">
                      {option.name}
                    </span>
                    <span className="text-xs">{getFlag(option.country)}</span>
                  </div>
                  <span className="text-xs text-zinc-400 block mt-0.5">
                    {option.circuitName} ({option.country})
                  </span>
                </div>

                {isAnswered && (
                  <div>
                    {isThisCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Answer Breakdown when solved */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-5 rounded-2xl border ${
              isCorrect
                ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-200"
                : "bg-red-950/40 border-red-500/60 text-red-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black font-mono text-white flex items-center gap-2">
                  <span>{getFlag(currentCorner.country)}</span>
                  <span>{currentCorner.name}</span>
                </h3>
                <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                  {currentCorner.circuitName} • {currentCorner.turnNumber}
                </span>
                <p className="text-xs text-zinc-300 mt-2 max-w-xl leading-relaxed">
                  {currentCorner.description}
                </p>
              </div>

              <MotionButton
                onClick={nextCorner}
                variant="primary"
                className="shrink-0 flex items-center gap-2"
              >
                <span>NEXT APEX</span>
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
