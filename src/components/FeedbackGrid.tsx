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
      <div className="w-full p-8 rounded-2xl bg-[#090b10] border border-dashed border-zinc-800 text-center my-4">
        <h4 className="font-bold text-sm text-zinc-300 font-mono mb-1">
          Telemetry Screen Awaiting Data
        </h4>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Submit your first guess using the command input above to generate attribute comparisons and unlock progressive sector telemetry.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-4 rounded-2xl bg-[#090b10] border border-zinc-800 p-3 sm:p-4 shadow-xl">
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="min-w-[660px]">
          {/* Table Headers */}
          <div className="grid grid-cols-7 gap-2 pb-2 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 text-center">
            {category === "driver" && (
              <>
                <div className="text-left pl-2">Driver</div>
                <div>Nationality</div>
                <div>Born</div>
                <div>F1 Debut</div>
                <div>Titles</div>
                <div>Wins</div>
                <div>Teams</div>
              </>
            )}
            {category === "team" && (
              <>
                <div className="text-left pl-2">Constructor</div>
                <div>Country</div>
                <div>Debut</div>
                <div>Titles</div>
                <div>Wins</div>
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
            {comparisons.map((comp, idx) => (
              <div
                key={`${comp.id}-${idx}`}
                className="grid grid-cols-7 gap-2 items-center text-xs animate-flipIn"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Entity Name Cell */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-950 border border-zinc-800 min-h-[54px]">
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
                      Lap {idx + 1}/7
                    </span>
                  </div>
                </div>

                {/* Driver Cells */}
                {category === "driver" && renderDriverCells(comp as DriverComparison)}

                {/* Team Cells */}
                {category === "team" && renderTeamCells(comp as TeamComparison)}

                {/* Track Cells */}
                {category === "track" && renderTrackCells(comp as TrackComparison)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Render Driver Cells
function renderDriverCells(d: DriverComparison) {
  return (
    <>
      {renderCell(d.nationality, d.nationality.value)}
      {renderNumericCell(d.birthYear, d.birthYear.value)}
      {renderNumericCell(d.debutYear, d.debutYear.value)}
      {renderNumericCell(d.championships, `${d.championships.value}x`)}
      {renderNumericCell(d.wins, d.wins.value)}
      {renderNumericCell(d.teamsCount, d.teamsCount.value)}
    </>
  );
}

// Render Team Cells
function renderTeamCells(t: TeamComparison) {
  return (
    <>
      {renderCell(t.country, t.country.value)}
      {renderNumericCell(t.debutYear, t.debutYear.value)}
      {renderNumericCell(t.championships, `${t.championships.value}x`)}
      {renderNumericCell(t.wins, t.wins.value)}
      {renderNumericCell(t.podiums, t.podiums.value)}
      {renderNumericCell(t.seasonsCompeted, `${t.seasonsCompeted.value}y`)}
    </>
  );
}

// Render Track Cells
function renderTrackCells(tr: TrackComparison) {
  return (
    <>
      {renderCell(tr.country, tr.country.value)}
      {renderNumericCell(tr.lengthKm, `${tr.lengthKm.value.toFixed(2)} km`)}
      {renderNumericCell(tr.corners, tr.corners.value)}
      {renderNumericCell(tr.firstGPYea, tr.firstGPYea.value)}
      {renderCell(tr.circuitType, tr.circuitType.value)}
      {renderCell(tr.direction, tr.direction.value)}
    </>
  );
}

// Generic Categorical Cell
function renderCell(comp: ValueComparison<string>, displayVal: string | number) {
  const statusClasses = getStatusStyles(comp.status);

  return (
    <div
      className={`flex flex-col items-center justify-center p-1.5 rounded-xl border text-center min-h-[54px] font-mono font-bold ${statusClasses}`}
    >
      <span className="truncate max-w-full px-1">{displayVal}</span>
      {comp.status === "close" && (
        <span className="text-[9px] uppercase tracking-tighter opacity-80 mt-0.5">
          Same Region
        </span>
      )}
    </div>
  );
}

// Generic Numeric Cell with Arrow
function renderNumericCell(
  comp: ValueComparison<number>,
  displayVal: string | number
) {
  const statusClasses = getStatusStyles(comp.status);

  return (
    <div
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
    </div>
  );
}

function getStatusStyles(status: string): string {
  switch (status) {
    case "exact":
      return "bg-emerald-950/70 border-emerald-600/80 text-emerald-200 shadow-sm shadow-emerald-950";
    case "close":
      return "bg-amber-950/70 border-amber-600/80 text-amber-200 shadow-sm shadow-amber-950";
    default:
      return "bg-zinc-950 border-zinc-800 text-zinc-400";
  }
}
