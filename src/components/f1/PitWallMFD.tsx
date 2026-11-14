"use client";

import React, { useState } from "react";
import { Category, ComparisonResult, Hint, Driver, Team, Track, DriverComparison, TeamComparison, TrackComparison } from "@/types";
import { getFlag } from "@/data/continents";
import { Icon3D } from "../icons3d/Icon3D";
import { sound } from "@/lib/sound";
import { DecryptedText } from "../reactbits/DecryptedText";
import {
  Trophy,
  Radio,
  Lightbulb,
  Volume2,
  Lock,
  ChevronRight,
  Flame,
  Gauge,
  Sparkles,
  Calendar,
  Flag,
  Award,
} from "lucide-react";

interface PitWallMFDProps {
  category: Category;
  comparisons: ComparisonResult[];
  hints: Hint[];
  targetEntity: Driver | Team | Track | null;
  attemptsCount: number;
  maxLaps?: number;
}

export const PitWallMFD: React.FC<PitWallMFDProps> = ({
  category,
  comparisons,
  hints,
  targetEntity,
  attemptsCount,
  maxLaps = 7,
}) => {
  const [activeTab, setActiveTab] = useState<"timing" | "radio" | "hints">("timing");
  const [radioMsg, setRadioMsg] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const unlockedCount = Math.min(6, Math.max(0, attemptsCount));

  const requestRadioClue = () => {
    if (!targetEntity) return;

    sound.playRadioStatic();
    setIsBroadcasting(true);

    setTimeout(() => {
      let clue = "";
      if (category === "driver") {
        const d = targetEntity as Driver;
        if (attemptsCount === 0) {
          clue = `Engineer: "Radio check, driver. Target made their Grand Prix debut in ${d.debutYear}. Focus on the sector marks."`;
        } else if (d.championships > 0) {
          clue = `Engineer: "Copy that. We are hunting a World Drivers' Champion (${d.championships}x titles). Keep the tyres in the window."`;
        } else if (d.wins > 0) {
          clue = `Engineer: "Box confirm. This pilot knows what victory champagne tastes like (${d.wins} Grand Prix wins). Bring it home."`;
        } else {
          clue = `Engineer: "Understood. The target drove for ${d.teamsCount} different teams, known for tenacious midfield racing."`;
        }
      } else if (category === "team") {
        const t = targetEntity as Team;
        if (t.active) {
          clue = `Engineer: "Pit wall update: The target constructor is active on the current grid (${t.seasonsCompeted} seasons on record)."`;
        } else {
          clue = `Engineer: "Historic telemetry alert: This is a classic constructor. Debut year was ${t.debutYear}."`;
        }
      } else {
        const tr = targetEntity as Track;
        clue = `Engineer: "Track condition steady. Target circuit has ${tr.corners} turns and runs in a ${tr.direction.toLowerCase()} direction."`;
      }

      setRadioMsg(clue);
      setIsBroadcasting(false);
      sound.playHintUnlock();
    }, 450);
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl p-3 shadow-xl overflow-hidden">
      {/* Top Tab Ribbon */}
      <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/10 shrink-0 font-mono text-xs">
        <button
          onClick={() => {
            setActiveTab("timing");
            sound.playLightBeep(600);
          }}
          className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "timing"
              ? "text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
          style={
            activeTab === "timing"
              ? { backgroundColor: "var(--team-primary)", boxShadow: "0 0 10px var(--team-glow)" }
              : undefined
          }
        >
          <Trophy className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">TIMING TOWER</span>
          <span className="sm:hidden">TIMING</span>
          <span className="text-[10px] bg-black/40 px-1.5 py-0.2 rounded ml-0.5">
            {comparisons.length}/{maxLaps}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab("radio");
            sound.playLightBeep(650);
          }}
          className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "radio"
              ? "text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
          style={
            activeTab === "radio"
              ? { backgroundColor: "var(--team-primary)", boxShadow: "0 0 10px var(--team-glow)" }
              : undefined
          }
        >
          <Radio className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">PIT RADIO</span>
          <span className="sm:hidden">RADIO</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("hints");
            sound.playLightBeep(700);
          }}
          className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "hints"
              ? "text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
          style={
            activeTab === "hints"
              ? { backgroundColor: "var(--team-primary)", boxShadow: "0 0 10px var(--team-glow)" }
              : undefined
          }
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">SECTOR HINTS</span>
          <span className="sm:hidden">HINTS</span>
          <span className="text-[10px] bg-black/40 px-1.5 py-0.2 rounded ml-0.5">
            {unlockedCount}/6
          </span>
        </button>
      </div>

      {/* Main Tab Body */}
      <div className="flex-1 min-h-0 pt-2.5 overflow-y-auto no-scrollbar">
        {/* TAB 1: TIMING TOWER */}
        {activeTab === "timing" && (
          <div className="space-y-1.5 font-mono text-xs">
            {Array.from({ length: maxLaps }).map((_, lapIdx) => {
              const comp = comparisons[lapIdx];
              const isCurrent = comparisons.length === lapIdx;

              if (comp) {
                const isWinner = comp.isCorrect;
                const flag =
                  category === "driver"
                    ? getFlag((comp as DriverComparison).guessedItem.nationality)
                    : getFlag(
                        category === "team"
                          ? (comp as TeamComparison).guessedItem.country
                          : (comp as TrackComparison).guessedItem.country
                      );

                return (
                  <div
                    key={lapIdx}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                      isWinner
                        ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "bg-white/5 border-white/10 text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[11px] tabular-nums ${
                          isWinner ? "bg-emerald-500 text-black font-black" : "bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        P{lapIdx + 1}
                      </span>
                      <span className="text-sm shrink-0">{flag}</span>
                      <span className="font-bold text-white text-xs truncate max-w-[130px] sm:max-w-[170px]">
                        {comp.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] tabular-nums shrink-0">
                      {isWinner ? (
                        <span className="text-emerald-400 font-black tracking-wider uppercase text-[10px]">
                          POLE POSITION
                        </span>
                      ) : (
                        <span className="text-zinc-500 font-mono">
                          +{((lapIdx + 1) * 0.284).toFixed(3)}s
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              if (isCurrent) {
                return (
                  <div
                    key={lapIdx}
                    className="flex items-center justify-between p-2 rounded-xl border border-white/20 bg-white/10 text-white animate-pulse"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[11px] text-white"
                        style={{ backgroundColor: "var(--team-primary)" }}
                      >
                        P{lapIdx + 1}
                      </span>
                      <span className="font-bold text-xs tracking-wider uppercase" style={{ color: "var(--team-primary-light, #FFFFFF)" }}>
                        CURRENT LAP ATTEMPT
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                      IN PROGRESS
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={lapIdx}
                  className="flex items-center justify-between p-2 rounded-xl border border-white/5 bg-black/20 text-zinc-600 opacity-60"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[11px] bg-zinc-900 text-zinc-600">
                      P{lapIdx + 1}
                    </span>
                    <span className="text-xs uppercase tracking-wider">AWAITING LAP</span>
                  </div>
                  <span className="text-[10px] text-zinc-700 font-mono">--:--.---</span>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: PIT RADIO */}
        {activeTab === "radio" && (
          <div className="space-y-3 font-mono">
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: "var(--team-bg-tint)",
                    borderColor: "var(--team-primary)",
                  }}
                >
                  <Radio className="w-4 h-4" style={{ color: "var(--team-primary)" }} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    RACE ENGINEER CHANNEL
                  </h4>
                  <p className="text-[10px] text-zinc-400">
                    One-click encrypted tactical transmission
                  </p>
                </div>
              </div>

              <button
                onClick={requestRadioClue}
                disabled={isBroadcasting}
                className="px-3 py-1.5 rounded-xl font-bold text-xs text-white transition-all shadow-md active:scale-95 disabled:opacity-50 shrink-0"
                style={{
                  background: "var(--team-gradient)",
                  boxShadow: "0 0 10px var(--team-glow)",
                }}
              >
                {isBroadcasting ? "TRANSMITTING..." : "CALL PIT WALL"}
              </button>
            </div>

            {/* Radio Transmission Display */}
            {radioMsg ? (
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/50 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] text-red-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    <span>PIT-TO-CAR RADIO INCOMING</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">FREQ: 462.550 MHz</span>
                </div>
                <div className="text-xs text-red-200 italic leading-relaxed pl-1 border-l-2 border-red-500">
                  <DecryptedText text={radioMsg} speed={25} maxIterations={5} />
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-zinc-500 text-xs rounded-xl bg-black/30 border border-dashed border-white/10 space-y-1">
                <Radio className="w-6 h-6 mx-auto text-zinc-600 mb-1" />
                <p>Press &quot;CALL PIT WALL&quot; to receive tactical strategy notes from the race engineer.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SECTOR HINTS */}
        {activeTab === "hints" && (
          <div className="space-y-2 font-mono text-xs">
            {hints.map((hint, idx) => {
              const isUnlocked = idx < unlockedCount;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isUnlocked
                      ? "bg-white/5 border-white/15 text-white"
                      : "bg-black/30 border-white/5 text-zinc-600 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                      {isUnlocked ? (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--team-primary)" }} />
                      ) : (
                        <Lock className="w-3 h-3 text-zinc-600" />
                      )}
                      <span className={isUnlocked ? "text-white" : "text-zinc-500"}>
                        {hint.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500">
                      {isUnlocked ? "UNLOCKED" : `UNLOCKS LAP ${idx + 1}`}
                    </span>
                  </div>

                  <div className="text-xs font-semibold pl-3">
                    {isUnlocked ? (
                      <span className="text-zinc-200">{hint.value}</span>
                    ) : (
                      <span className="text-zinc-700 tracking-widest">••••••••••••••</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
