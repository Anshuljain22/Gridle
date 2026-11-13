"use client";

import React from "react";
import {
  Category,
  ComparisonResult,
  DriverComparison,
  TeamComparison,
  TrackComparison,
  ValueComparison,
} from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";
import { getFlag } from "@/data/continents";
import { motion } from "motion/react";

interface FeedbackGridProps {
  category: Category;
  comparisons: ComparisonResult[];
}

export const FeedbackGrid: React.FC<FeedbackGridProps> = ({
  category,
  comparisons,
}) => {
  if (comparisons.length === 0) {
    return (
      <div className="w-full p-8 rounded-2xl bg-[#090c14]/65 border border-dashed border-white/10 backdrop-blur-xl text-center my-4">
        <h4 className="font-bold text-sm text-zinc-300 font-mono mb-1">
          Telemetry Screen Awaiting Data
        </h4>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Submit your first guess using the command input above to generate attribute comparisons and unlock progressive sector telemetry.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-4 rounded-2xl bg-[#090c14]/70 border border-white/10 p-3 sm:p-4 shadow-[0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="min-w-[660px]">
          {/* Table Headers */}
          <div className="grid grid-cols-7 gap-2 pb-2 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-white/10 text-center">
            {category === "driver" && (
              <>
                <div className="text-left pl-2">Driver</div>
                <div>Nationality</div>
                <div>Born</div>
                <div>F1 Debut</div>
                <div title="World Drivers' Championship Titles (Season Champions)">WDC Titles</div>
                <div title="Total Career Grand Prix Race Victories">GP Wins</div>
                <div>Teams</div>
              </>
            )}
            {category === "team" && (
              <>
                <div className="text-left pl-2">Constructor</div>
                <div>Country</div>
                <div>Debut</div>
                <div title="World Constructors' Championship Titles">WCC Titles</div>
                <div title="Total Grand Prix Race Victories">GP Wins</div>
                <div>Podiums</div>
                <div>Seasons</div>
              </>
            )}
            {category === "track" && (
              <>
                <div className="text-left pl-2">Circuit</div>
                <div>Country</div>
                <div>Length</div>
                <div>Corners</div>
                <div>First GP</div>
                <div>Type</div>
                <div>Direction</div>
              </>
            )}
          </div>

          {/* Guesses Rows */}
          <div className="space-y-2 mt-2">
            {comparisons.map((comp, rowIdx) => {
              const isLatestRow = rowIdx === comparisons.length - 1;

              return (
                <div
                  key={`${comp.id}-${rowIdx}`}
                  className="grid grid-cols-7 gap-2 items-center text-xs"
                >
                  {/* Entity Name Cell with Motion Dev Stagger */}
                  <motion.div
                    initial={isLatestRow ? { rotateX: -90, opacity: 0 } : false}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 0,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 min-h-[54px] shadow-sm backdrop-blur-md"
                  >
                    <span className="text-base shrink-0">
                      {category === "driver"
                        ? getFlag((comp as DriverComparison).guessedItem.nationality)
                        : getFlag(
                            category === "team"
                              ? (comp as TeamComparison).guessedItem.country
                              : (comp as TrackComparison).guessedItem.country
                          )}
                    </span>
                    <div className="flex flex-col truncate">
                      <span className="font-bold text-white truncate text-xs">
                        {comp.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono tabular-nums">
                        Lap {rowIdx + 1}/7
                      </span>
                    </div>
                  </motion.div>

                  {/* Driver Cells */}
                  {category === "driver" &&
                    renderDriverCells(comp as DriverComparison, isLatestRow)}

                  {/* Team Cells */}
                  {category === "team" &&
                    renderTeamCells(comp as TeamComparison, isLatestRow)}

                  {/* Track Cells */}
                  {category === "track" &&
                    renderTrackCells(comp as TrackComparison, isLatestRow)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Render Driver Cells
function renderDriverCells(d: DriverComparison, isLatest: boolean) {
  return (
    <>
      {renderCell(d.nationality, d.nationality.value, 1, isLatest)}
      {renderNumericCell(d.birthYear, d.birthYear.value, 2, isLatest)}
      {renderNumericCell(d.debutYear, d.debutYear.value, 3, isLatest)}
      {renderNumericCell(d.championships, `${d.championships.value}x`, 4, isLatest)}
      {renderNumericCell(d.wins, d.wins.value, 5, isLatest)}
      {renderNumericCell(d.teamsCount, d.teamsCount.value, 6, isLatest)}
    </>
  );
}

// Render Team Cells
function renderTeamCells(t: TeamComparison, isLatest: boolean) {
  return (
    <>
      {renderCell(t.country, t.country.value, 1, isLatest)}
      {renderNumericCell(t.debutYear, t.debutYear.value, 2, isLatest)}
      {renderNumericCell(t.championships, `${t.championships.value}x`, 3, isLatest)}
      {renderNumericCell(t.wins, t.wins.value, 4, isLatest)}
      {renderNumericCell(t.podiums, t.podiums.value, 5, isLatest)}
      {renderNumericCell(t.seasonsCompeted, `${t.seasonsCompeted.value}y`, 6, isLatest)}
    </>
  );
}

// Render Track Cells
function renderTrackCells(tr: TrackComparison, isLatest: boolean) {
  return (
    <>
      {renderCell(tr.country, tr.country.value, 1, isLatest)}
      {renderNumericCell(tr.lengthKm, `${tr.lengthKm.value.toFixed(2)} km`, 2, isLatest)}
      {renderNumericCell(tr.corners, tr.corners.value, 3, isLatest)}
      {renderNumericCell(tr.firstGPYea, tr.firstGPYea.value, 4, isLatest)}
      {renderCell(tr.circuitType, tr.circuitType.value, 5, isLatest)}
      {renderCell(tr.direction, tr.direction.value, 6, isLatest)}
    </>
  );
}

// Generic Categorical Cell with Motion Dev Staggered Reveal
function renderCell(
  comp: ValueComparison<string>,
  displayVal: string | number,
  colIndex: number,
  isLatest: boolean
) {
  const statusClasses = getStatusStyles(comp.status);

  return (
    <motion.div
      initial={isLatest ? { rotateX: -90, opacity: 0 } : false}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{
        duration: 0.35,
        delay: isLatest ? colIndex * 0.08 : 0,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      whileHover={{ scale: 1.02 }}
      className={`flex flex-col items-center justify-center p-1.5 rounded-xl border text-center min-h-[54px] font-mono font-bold ${statusClasses}`}
    >
      <span className="truncate max-w-full px-1">{displayVal}</span>
      {comp.status === "close" && (
        <span className="text-[9px] uppercase tracking-tighter opacity-80 mt-0.5">
          Same Region
        </span>
      )}
    </motion.div>
  );
}

// Generic Numeric Cell with Arrow and Motion Dev Staggered Reveal
function renderNumericCell(
  comp: ValueComparison<number>,
  displayVal: string | number,
  colIndex: number,
  isLatest: boolean
) {
  const statusClasses = getStatusStyles(comp.status);

  return (
    <motion.div
      initial={isLatest ? { rotateX: -90, opacity: 0 } : false}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{
        duration: 0.35,
        delay: isLatest ? colIndex * 0.08 : 0,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      whileHover={{ scale: 1.02 }}
      className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl border text-center min-h-[54px] font-mono font-bold tabular-nums ${statusClasses}`}
    >
      <div className="flex items-center justify-center gap-1">
        <span>{displayVal}</span>
        {comp.direction === "higher" && (
          <ArrowUp className="w-3.5 h-3.5 text-zinc-100 stroke-[2.5]" />
        )}
        {comp.direction === "lower" && (
          <ArrowDown className="w-3.5 h-3.5 text-zinc-100 stroke-[2.5]" />
        )}
      </div>

      {comp.direction && comp.direction !== "match" && (
        <span className="text-[9px] tracking-tight uppercase opacity-85 mt-0.5">
          {comp.direction === "higher" ? "Higher ↑" : "Lower ↓"}
        </span>
      )}
      {comp.status === "exact" && (
        <span className="text-[9px] tracking-tight uppercase opacity-85 mt-0.5">
          Match ✓
        </span>
      )}
    </motion.div>
  );
}

function getStatusStyles(status: string): string {
  switch (status) {
    case "exact":
      return "bg-emerald-950/60 border-emerald-500/80 text-emerald-100 shadow-[0_4px_16px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md";
    case "close":
      return "bg-amber-950/60 border-amber-500/80 text-amber-100 shadow-[0_4px_16px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md";
    default:
      return "bg-black/45 border-white/10 text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md";
  }
}
