"use client";

import React, { useState } from "react";
import { CAREER_TIMELINES, CareerTimelinePuzzle } from "@/data/careerTimelines";
import { DRIVERS } from "@/data/drivers";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { DecryptedText } from "../reactbits/DecryptedText";
import { Icon3D } from "../icons3d/Icon3D";
import { DriverAvatar } from "../avatars/DriverAvatar";
import { MotionButton } from "../watermelon/MotionButton";
import { sound } from "@/lib/sound";
import { getFlag } from "@/data/continents";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, HelpCircle, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export const CareerTimelineMode: React.FC = () => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [isGivenUp, setIsGivenUp] = useState(false);
  const [score, setScore] = useState(0);

  const currentPuzzle = CAREER_TIMELINES[puzzleIndex];
  const maxAttempts = 4;
  const attemptsLeft = maxAttempts - guesses.length;

  const matches = query.trim()
    ? DRIVERS.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5)
    : [];

  const handleGuess = (driverName: string) => {
    if (isSolved || isGivenUp || guesses.length >= maxAttempts) return;
    if (guesses.includes(driverName)) return;

    const newGuesses = [...guesses, driverName];
    setGuesses(newGuesses);
    setQuery("");

    if (driverName.toLowerCase() === currentPuzzle.driverName.toLowerCase()) {
      setIsSolved(true);
      setScore((s) => s + (maxAttempts - guesses.length) * 100);
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
      if (newGuesses.length >= maxAttempts) {
        setIsGivenUp(true);
      }
    }
  };

  const nextPuzzle = () => {
    const nextIdx = (puzzleIndex + 1) % CAREER_TIMELINES.length;
    setPuzzleIndex(nextIdx);
    setGuesses([]);
    setIsSolved(false);
    setIsGivenUp(false);
    setQuery("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 select-none animate-fadeIn py-2">
      {/* Header Banner */}
      <SpotlightCard spotlightColor="rgba(225, 6, 0, 0.2)" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon3D name="helmet" size={36} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  CAREER SLEUTH
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  PUZZLE {puzzleIndex + 1}/{CAREER_TIMELINES.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono mt-0.5">
                <ShinyText text="CONNECT THE CONSTRUCTORS" className="text-xl sm:text-2xl font-black italic" />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">CAREER SCORE</span>
              <span className="font-bold text-amber-400 text-sm">{score} PTS</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">ATTEMPTS</span>
              <span className="font-bold text-white text-sm">{attemptsLeft}/{maxAttempts}</span>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Main Timeline Board */}
      <div className="f1-glass rounded-3xl p-5 sm:p-7 relative overflow-hidden">
        <div className="mb-4">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            CAREER TEAM TRANSFERS (CHRONOLOGICAL SEQUENCE):
          </span>
          <p className="text-xs text-zinc-400">
            Study this driver&apos;s constructor lineage from their rookie debut to retirement or current seat. Identify who drove this journey.
          </p>
        </div>

        {/* Timeline Sequence Nodes with Motion Dev */}
        <div className="relative py-4">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-red-600 via-zinc-700 to-amber-500 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 relative z-10">
            {currentPuzzle.stops.map((stop, idx) => {
              return (
                <motion.div
                  key={`${stop.team}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.35 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md relative overflow-hidden group shadow-md"
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5"
                    style={{ backgroundColor: stop.color }}
                  />
                  <div className="pl-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                      <span className="font-bold px-1.5 py-0.2 rounded bg-white/5 border border-white/10">
                        STOP #{idx + 1}
                      </span>
                      <span className="text-zinc-400 font-bold">{stop.years}</span>
                    </div>

                    <h4 className="font-bold text-sm text-white font-mono truncate">
                      {stop.team}
                    </h4>

                    {stop.highlight && (
                      <p className="text-[11px] text-zinc-400 mt-1 leading-snug line-clamp-2">
                        {stop.highlight}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Clues Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-center font-mono text-xs">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-zinc-500 block">TOTAL TITLES</span>
            <span className="font-bold text-amber-400 text-sm">
              {currentPuzzle.totalChampionships > 0 ? `${currentPuzzle.totalChampionships}x WDC` : "0 Titles"}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-zinc-500 block">CAREER WINS</span>
            <span className="font-bold text-white text-sm">
              {currentPuzzle.totalWins} Grand Prix Wins
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-zinc-500 block">NATIONALITY</span>
            <span className="font-bold text-zinc-300 text-sm flex items-center justify-center gap-1.5">
              <span>{getFlag(currentPuzzle.nationality)}</span>
              <span>{currentPuzzle.nationality}</span>
            </span>
          </div>
        </div>

        {/* Input Bar or Solved Result */}
        {!isSolved && !isGivenUp ? (
          <div className="mt-6 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type driver name (e.g. Sebastian Vettel, Kimi Räikkönen)..."
                className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-red-500 text-white placeholder-zinc-500 font-mono text-sm outline-none backdrop-blur-md shadow-inner transition-colors"
              />

              {/* Autocomplete Suggestions */}
              {matches.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-white/15 rounded-2xl overflow-hidden z-20 backdrop-blur-xl shadow-xl">
                  {matches.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleGuess(m.name)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs font-mono text-zinc-200 hover:bg-red-600/30 hover:text-white transition-colors border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <DriverAvatar name={m.name} size={24} />
                        <span>{m.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{m.nationality}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Past Guesses in this round */}
            {guesses.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {guesses.map((g, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-950/40 border border-red-800 text-red-300 font-mono text-xs"
                  >
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    <span>{g}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-5 rounded-2xl border ${
              isSolved
                ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-200"
                : "bg-red-950/40 border-red-500/60 text-red-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <DriverAvatar name={currentPuzzle.driverName} size={48} className="shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getFlag(currentPuzzle.nationality)}</span>
                    <h3 className="text-xl font-black font-mono text-white">
                      <DecryptedText text={currentPuzzle.driverName} speed={30} />
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 max-w-lg leading-relaxed">
                    {currentPuzzle.trivia}
                  </p>
                </div>
              </div>

              <MotionButton
                onClick={nextPuzzle}
                variant="primary"
                className="shrink-0 flex items-center gap-2"
              >
                <span>NEXT TIMELINE</span>
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
