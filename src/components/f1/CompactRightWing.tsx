"use client";

import React, { useState } from "react";
import { Category, ComparisonResult, Hint, Driver, Team, Track } from "@/types";
import { TimingTower } from "../TimingTower";
import { HintPanel } from "../HintPanel";
import { PitRadio } from "../PitRadio";
import { Radio, Lightbulb, Trophy } from "lucide-react";

interface CompactRightWingProps {
  category: Category;
  comparisons: ComparisonResult[];
  hints: Hint[];
  targetEntity: Driver | Team | Track | null;
  attemptsCount: number;
  maxLaps?: number;
}

export const CompactRightWing: React.FC<CompactRightWingProps> = ({
  category,
  comparisons,
  hints,
  targetEntity,
  attemptsCount,
  maxLaps = 7,
}) => {
  const [activeTab, setActiveTab] = useState<"timing" | "hints" | "radio">("timing");

  const unlockedCount = Math.min(6, Math.max(0, attemptsCount));

  return (
    <div className="w-full space-y-2.5">
      {/* Tab Switcher Header */}
      <div className="flex items-center gap-1 bg-black/70 p-1 rounded-xl border border-white/10 font-mono text-[11px] font-bold">
        <button
          onClick={() => setActiveTab("timing")}
          className={`flex-1 py-1 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "timing" ? "bg-white/20 text-white shadow-sm" : "text-zinc-400 hover:text-white"
          }`}
          style={activeTab === "timing" ? { backgroundColor: "var(--team-primary)" } : undefined}
        >
          <Trophy className="w-3 h-3" />
          <span>TIMING TOWER</span>
          <span className="text-[9px] bg-black/40 px-1.5 py-0.2 rounded">
            {comparisons.length}/{maxLaps}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("hints")}
          className={`flex-1 py-1 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "hints" ? "bg-white/20 text-white shadow-sm" : "text-zinc-400 hover:text-white"
          }`}
          style={activeTab === "hints" ? { backgroundColor: "var(--team-primary)" } : undefined}
        >
          <Lightbulb className="w-3 h-3" />
          <span>HINTS</span>
          <span className="text-[9px] bg-black/40 px-1.5 py-0.2 rounded">
            {unlockedCount}/6
          </span>
        </button>

        <button
          onClick={() => setActiveTab("radio")}
          className={`flex-1 py-1 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "radio" ? "bg-white/20 text-white shadow-sm" : "text-zinc-400 hover:text-white"
          }`}
          style={activeTab === "radio" ? { backgroundColor: "var(--team-primary)" } : undefined}
        >
          <Radio className="w-3 h-3" />
          <span>PIT RADIO</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "timing" && (
        <TimingTower
          category={category}
          comparisons={comparisons}
          maxLaps={maxLaps}
        />
      )}

      {activeTab === "hints" && (
        <HintPanel
          hints={hints}
          attemptsCount={attemptsCount}
        />
      )}

      {activeTab === "radio" && (
        <PitRadio
          category={category}
          targetEntity={targetEntity}
          attemptsCount={attemptsCount}
        />
      )}
    </div>
  );
};
