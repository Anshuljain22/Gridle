"use client";

import React from "react";
import { UserStats } from "@/types";
import {
  Trophy,
  Award,
  Flame,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Share2,
  BarChart3,
} from "lucide-react";
import { copyToClipboard } from "@/lib/share";
import { BorderBeam } from "./magicui/BorderBeam";
import { NumberTicker } from "./magicui/NumberTicker";

interface TrophyRoomProps {
  stats: UserStats;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
}

export const TrophyRoom: React.FC<TrophyRoomProps> = ({ stats }) => {
  const winRate =
    stats.totalGames > 0
      ? Math.round((stats.wins / stats.totalGames) * 100)
      : 0;

  // Derive FIA License Grade
  let licenseGrade = "CLASS D (PADDOCK ROOKIE)";
  let licenseColor = "text-zinc-400 border-zinc-700 bg-zinc-900";
  if (stats.wins >= 25 || stats.maxStreak >= 10) {
    licenseGrade = "FIA GRADE A (WORLD CHAMPION)";
    licenseColor = "text-amber-400 border-amber-500/80 bg-amber-950/40";
  } else if (stats.wins >= 10 || stats.maxStreak >= 5) {
    licenseGrade = "FIA GRADE B (GRAND PRIX WINNER)";
    licenseColor = "text-emerald-400 border-emerald-500/80 bg-emerald-950/40";
  } else if (stats.wins >= 3) {
    licenseGrade = "FIA GRADE C (POINTS CONTENDER)";
    licenseColor = "text-blue-400 border-blue-500/80 bg-blue-950/40";
  }

  const achievements: Achievement[] = [
    {
      id: "first_win",
      title: "Chequered Flag",
      description: "Claim your first victory in any category.",
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      isUnlocked: stats.wins >= 1,
    },
    {
      id: "grand_slam",
      title: "Grand Slam",
      description: "Solve a mystery puzzle on your very first guess.",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      isUnlocked: (stats.guessDistribution[1] || 0) >= 1,
    },
    {
      id: "pole_to_flag",
      title: "Pole to Flag",
      description: "Solve a mystery puzzle within 2 attempts.",
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      isUnlocked: (stats.guessDistribution[2] || 0) >= 1,
    },
    {
      id: "streak_master",
      title: "Hat-Trick Streak",
      description: "Maintain a 3-day daily challenge streak.",
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      isUnlocked: stats.maxStreak >= 3,
    },
    {
      id: "driver_expert",
      title: "Driver Whisperer",
      description: "Win 5 Driver mystery challenges.",
      icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
      isUnlocked: stats.byCategory.driver.won >= 5,
    },
    {
      id: "circuit_master",
      title: "Track Master",
      description: "Win 5 Circuit mystery challenges.",
      icon: <BarChart3 className="w-5 h-5 text-sky-400" />,
      isUnlocked: stats.byCategory.track.won >= 5,
    },
  ];

  const handleShareLicense = () => {
    const text = `🏎️ FIA SUPERLICENSE STATUS:\nGrade: ${licenseGrade}\nWins: ${stats.wins}/${stats.totalGames} (${winRate}%)\nStreak: ${stats.currentStreak} 🔥\nPlay F1 Wordle: https://f1-wordle.vercel.app`;
    copyToClipboard(text);
    alert("Superlicense copied to clipboard!");
  };

  const maxGuessCount = Math.max(1, ...Object.values(stats.guessDistribution));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-6">
      {/* Official FIA Holographic Superlicense */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 f1-glass-modal">
        {/* Magic UI Border Beam (FIA Gold & F1 Red) */}
        <BorderBeam size={320} duration={12} colorFrom="#FFD700" colorTo="#E10600" />

        {/* Hologram sheen accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-red-600/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center font-black italic text-white text-xl shadow-lg shadow-red-900/60 border border-red-500">
              FIA
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block font-bold">
                FEDERATION INTERNATIONALE DE L&apos;AUTOMOBILE
              </span>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono">
                FORMULA 1 SUPERLICENSE
              </h2>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border shadow ${licenseColor}`}
          >
            {licenseGrade}
          </span>
        </div>

        {/* License Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              TOTAL GRANDS PRIX
            </span>
            <span className="text-2xl font-black font-mono text-white">
              <NumberTicker value={stats.totalGames} />
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              VICTORIES (P1)
            </span>
            <span className="text-2xl font-black font-mono text-emerald-400">
              <NumberTicker value={stats.wins} />
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              WIN RATE
            </span>
            <span className="text-2xl font-black font-mono text-amber-400">
              <NumberTicker value={winRate} />%
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              MAX STREAK
            </span>
            <span className="text-2xl font-black font-mono text-red-500">
              <NumberTicker value={stats.maxStreak} />
            </span>
          </div>
        </div>

        <button
          onClick={handleShareLicense}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-zinc-200 hover:text-white transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>SHARE OFFICIAL SUPERLICENSE</span>
        </button>
      </div>

      {/* Career Achievements Trophy Showcase */}
      <div className="p-6 rounded-3xl f1-glass">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              CAREER TROPHY SHOWCASE
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {achievements.filter((a) => a.isUnlocked).length}/{achievements.length} UNLOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all ${
                ach.isUnlocked
                  ? "bg-zinc-900/80 border-amber-500/40 shadow-md shadow-amber-950/20"
                  : "bg-zinc-950/40 border-zinc-800/40 opacity-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 rounded-xl bg-black/60 border border-zinc-800">
                  {ach.icon}
                </div>
                {ach.isUnlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-zinc-600" />
                )}
              </div>
              <h4 className="font-bold text-sm text-white font-mono mb-1">
                {ach.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-snug">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Guess Distribution Histogram */}
      <div className="p-6 rounded-3xl f1-glass">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-4">
          QUALIFYING ATTEMPT DISTRIBUTION
        </h3>
        <div className="space-y-2 font-mono text-xs">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const count =
              stats.guessDistribution[num as keyof typeof stats.guessDistribution] || 0;
            const widthPct = Math.max(6, Math.round((count / maxGuessCount) * 100));

            return (
              <div key={num} className="flex items-center gap-3">
                <span className="w-16 text-zinc-400 font-bold">
                  GUESS {num}
                </span>
                <div className="flex-1 bg-zinc-900/80 rounded-xl h-7 p-1 border border-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-lg flex items-center justify-end pr-2 text-white font-bold transition-all duration-700 ${
                      count > 0 ? "bg-red-600" : "bg-zinc-800 text-zinc-600"
                    }`}
                    style={{ width: `${widthPct}%` }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

