"use client";

import React, { useState, useEffect } from "react";
import { BATTLE_DRIVERS, STAT_COMPARISONS, DriverBattleCard, BattleStatComparison } from "@/data/headToHead";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { Icon3D } from "../icons3d/Icon3D";
import { DriverAvatar } from "../avatars/DriverAvatar";
import { MotionButton } from "../watermelon/MotionButton";
import { sound } from "@/lib/sound";
import { getFlag } from "@/data/continents";
import { ArrowUp, ArrowDown, Flame, Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export const HeadToHeadMode: React.FC = () => {
  const [driverA, setDriverA] = useState<DriverBattleCard>(BATTLE_DRIVERS[0]);
  const [driverB, setDriverB] = useState<DriverBattleCard>(BATTLE_DRIVERS[1]);
  const [stat, setStat] = useState<BattleStatComparison>(STAT_COMPARISONS[0]);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(null);

  const initRound = (keepDriverB?: DriverBattleCard) => {
    // Pick Driver A
    const first = keepDriverB || BATTLE_DRIVERS[Math.floor(Math.random() * BATTLE_DRIVERS.length)];
    // Pick Driver B different from A
    let second = BATTLE_DRIVERS[Math.floor(Math.random() * BATTLE_DRIVERS.length)];
    while (second.id === first.id) {
      second = BATTLE_DRIVERS[Math.floor(Math.random() * BATTLE_DRIVERS.length)];
    }
    // Pick random stat metric
    const randomStat = STAT_COMPARISONS[Math.floor(Math.random() * STAT_COMPARISONS.length)];

    setDriverA(first);
    setDriverB(second);
    setStat(randomStat);
    setRevealed(false);
    setLastResult(null);
  };

  useEffect(() => {
    initRound();
  }, []);

  const handleGuess = (choice: "higher" | "lower") => {
    if (revealed || isGameOver) return;

    const valA = driverA[stat.key];
    const valB = driverB[stat.key];
    const isHigher = valB >= valA;
    const isUserCorrect = (choice === "higher" && isHigher) || (choice === "lower" && !isHigher);

    setRevealed(true);

    if (isUserCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setHighScore((h) => Math.max(h, newStreak));
      setLastResult("correct");
      sound.playCorrect();

      if (newStreak % 5 === 0) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {}
      }

      setTimeout(() => {
        initRound(driverB);
      }, 1400);
    } else {
      setLastResult("wrong");
      sound.playWrong();
      setIsGameOver(true);
    }
  };

  const restartGame = () => {
    setStreak(0);
    setIsGameOver(false);
    initRound();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 select-none animate-fadeIn py-2">
      {/* Header Bar */}
      <SpotlightCard spotlightColor="rgba(225, 6, 0, 0.2)" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon3D name="trophy" size={38} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  HEAD-TO-HEAD
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  STAT CLASH ARENA
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono mt-0.5">
                <ShinyText text="HIGHER OR LOWER SHOWDOWN" className="text-xl sm:text-2xl font-black italic" />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">CURRENT STREAK</span>
              <span className="font-bold text-amber-400 text-sm flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{streak}</span>
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">RECORD STREAK</span>
              <span className="font-bold text-white text-sm">{highScore}</span>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Metric Under Comparison */}
      <div className="p-3 rounded-2xl f1-glass text-center font-mono text-xs">
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-0.5">
          STATISTIC UNDER SCRUTINY:
        </span>
        <span className="font-bold text-base text-white uppercase tracking-wider">
          {stat.label}
        </span>
      </div>

      {/* Driver Duel Showdown Grid (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* VS Badge in center */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-red-600 border-4 border-[#050608] items-center justify-center shadow-lg font-black italic text-white text-sm">
          VS
        </div>

        {/* Card 1: Driver A (Known baseline) */}
        <SpotlightCard
          spotlightColor="rgba(255, 255, 255, 0.12)"
          className="p-6 rounded-3xl f1-glass text-center flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-center mb-3">
              <DriverAvatar name={driverA.name} size={72} />
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xl">{getFlag(driverA.nationality)}</span>
              <h3 className="font-black text-xl text-white font-mono">{driverA.name}</h3>
            </div>
            <span className="text-xs font-mono text-zinc-400 block mb-4">
              {driverA.team} ({driverA.era})
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 mt-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
              HAS EXACTLY
            </span>
            <span className="text-4xl sm:text-5xl font-black font-mono text-white tabular-nums">
              {driverA[stat.key]}
            </span>
            <span className="text-xs font-mono text-zinc-400 block mt-1 uppercase">
              {stat.unit}
            </span>
          </div>
        </SpotlightCard>

        {/* Card 2: Driver B (Challenge target) */}
        <SpotlightCard
          spotlightColor="rgba(225, 6, 0, 0.2)"
          className="p-6 rounded-3xl f1-glass text-center flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-center mb-3">
              <DriverAvatar name={driverB.name} size={72} />
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xl">{getFlag(driverB.nationality)}</span>
              <h3 className="font-black text-xl text-white font-mono">{driverB.name}</h3>
            </div>
            <span className="text-xs font-mono text-zinc-400 block mb-4">
              {driverB.team} ({driverB.era})
            </span>
          </div>

          {!revealed ? (
            <div className="space-y-3 mt-4">
              <span className="text-xs font-mono text-zinc-400 block">
                Does {driverB.name} have higher or lower {stat.label.toLowerCase()}?
              </span>

              <div className="grid grid-cols-2 gap-2">
                <MotionButton
                  onClick={() => handleGuess("higher")}
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>HIGHER</span>
                </MotionButton>

                <MotionButton
                  onClick={() => handleGuess("lower")}
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold"
                >
                  <ArrowDown className="w-4 h-4" />
                  <span>LOWER</span>
                </MotionButton>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-5 rounded-2xl border mt-4 ${
                lastResult === "correct"
                  ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                  : "bg-red-950/60 border-red-500 text-red-200"
              }`}
            >
              <span className="text-[10px] font-mono uppercase block mb-1">
                HAS EXACTLY
              </span>
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tabular-nums">
                {driverB[stat.key]}
              </span>
              <span className="text-xs font-mono block mt-1 uppercase">
                {stat.unit}
              </span>
            </motion.div>
          )}
        </SpotlightCard>
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-red-950/50 border border-red-800 text-center space-y-3"
        >
          <XCircle className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="text-xl font-black font-mono text-white">
            STREAK BROKEN AT {streak} CONSECUTIVE WINS
          </h3>
          <p className="text-xs text-zinc-300 font-mono">
            {driverB.name} has {driverB[stat.key]} {stat.unit}, compared to {driverA.name}&apos;s {driverA[stat.key]} {stat.unit}.
          </p>
          <div className="pt-2 flex justify-center">
            <MotionButton
              onClick={restartGame}
              variant="primary"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </MotionButton>
          </div>
        </motion.div>
      )}
    </div>
  );
};
