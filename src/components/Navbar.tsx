"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  HelpCircle,
  Volume2,
  VolumeX,
  Flame,
} from "lucide-react";
import { getSoundEnabled, setSoundEnabled } from "@/lib/storage";
import { sound } from "@/lib/sound";
import { ShinyText } from "./reactbits/ShinyText";
import { Icon3D } from "./icons3d/Icon3D";
import { TeamThemeSelector, TeamTheme } from "./f1/TeamThemeSelector";

interface NavbarProps {
  onOpenStats: () => void;
  onOpenHelp: () => void;
  onResetGame?: () => void;
  streakCount: number;
  gameMode: "daily" | "practice";
  currentThemeId?: string;
  onSelectTheme?: (theme: TeamTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStats,
  onOpenHelp,
  onResetGame,
  streakCount,
  gameMode,
  currentThemeId,
  onSelectTheme,
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setSoundOn(getSoundEnabled());
  }, []);

  const toggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    setSoundEnabled(nextVal);
    if (nextVal) {
      sound.playLightBeep(600);
    }
  };

  return (
    <header className="w-full border-b border-white/10 bg-black/20 backdrop-blur-2xl sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.25)]">
      <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={onResetGame}
            title="Reset Cockpit / Return Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-950/80 border border-red-500/50 group-hover:bg-red-500 transition-colors">
              <span className="font-black italic text-white text-xs sm:text-sm tracking-tighter">
                F1
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-black italic tracking-wide text-base sm:text-lg text-white">
                <ShinyText text="GRID" className="font-black italic tracking-wide" />
                <span className="text-red-500 font-black italic">LE</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300 bg-white/5 px-2 py-0.5 rounded-lg border border-white/10 backdrop-blur-md">
                {gameMode === "daily" ? "Daily" : "Practice"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Team Livery Theme Selector */}
          {onSelectTheme && (
            <TeamThemeSelector
              currentThemeId={currentThemeId || "ferrari"}
              onSelectTheme={onSelectTheme}
            />
          )}

          {/* Daily Streak Pill with 3D Flag/Flame */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono font-bold text-amber-400 shadow-sm"
            title="Current Daily Grand Prix Streak"
          >
            <Icon3D name="flag" size={16} />
            <span suppressHydrationWarning className="tabular-nums">
              {mounted ? streakCount : 0}
            </span>
            <span className="text-[10px] text-zinc-400 font-normal uppercase hidden sm:inline">
              Streak
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:scale-105 active:scale-95"
            title={soundOn ? "Mute Radio & Effects" : "Enable Radio & Effects"}
            aria-label="Toggle Sound"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:scale-105 active:scale-95"
            title="Race Regulations & How to Play"
            aria-label="How to play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Statistics Button */}
          <button
            onClick={onOpenStats}
            className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:scale-105 active:scale-95"
            title="View Race Records & Trophies"
            aria-label="View Race Records"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
