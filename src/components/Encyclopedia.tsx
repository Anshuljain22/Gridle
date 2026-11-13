"use client";

import React, { useState } from "react";
import { DRIVERS } from "@/data/drivers";
import { TEAMS } from "@/data/teams";
import { TRACKS } from "@/data/tracks";
import { Driver, Team, Track, Category } from "@/types";
import { getFlag } from "@/data/continents";
import { TrackSvg } from "./TrackSvg";
import { Search, X } from "lucide-react";

export const Encyclopedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>("driver");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<Driver | Team | Track | null>(null);

  const cleanQuery = searchQuery.trim().toLowerCase();

  const filteredDrivers = DRIVERS.filter(
    (d) =>
      d.name.toLowerCase().includes(cleanQuery) ||
      d.nationality.toLowerCase().includes(cleanQuery) ||
      d.teams.some((t) => t.toLowerCase().includes(cleanQuery))
  );

  const filteredTeams = TEAMS.filter(
    (t) =>
      t.name.toLowerCase().includes(cleanQuery) ||
      t.country.toLowerCase().includes(cleanQuery) ||
      t.famousDrivers.some((d) => d.toLowerCase().includes(cleanQuery))
  );

  const filteredTracks = TRACKS.filter(
    (tr) =>
      tr.name.toLowerCase().includes(cleanQuery) ||
      tr.country.toLowerCase().includes(cleanQuery)
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-2xl backdrop-blur-md mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono flex items-center gap-2">
            <span>FIA PADDOCK ARCHIVE</span>
            <span className="text-xs font-normal not-italic px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-900/60">
              OFFICIAL RECORDS
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Explore comprehensive telemetry, championship dynasties, and circuit blueprints
          </p>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("driver")}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === "driver"
                  ? "bg-red-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              DRIVERS ({DRIVERS.length})
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === "team"
                  ? "bg-red-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              TEAMS ({TEAMS.length})
            </button>
            <button
              onClick={() => setActiveTab("track")}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === "track"
                  ? "bg-red-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              TRACKS ({TRACKS.length})
            </button>
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archive..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-600 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Grid of Entities */}
      {activeTab === "driver" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              onClick={() => setSelectedEntity(driver)}
              className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50 cursor-pointer transition-all shadow-md group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getFlag(driver.nationality)}</span>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                      {driver.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {driver.nationality} • Born {driver.birthYear}
                    </span>
                  </div>
                </div>
                {driver.carNumber && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    #{driver.carNumber}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-800/60 text-center font-mono text-[11px]">
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">TITLES</span>
                  <span className="font-bold text-amber-400">
                    {driver.championships}x
                  </span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">WINS</span>
                  <span className="font-bold text-white">{driver.wins}</span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">PODIUMS</span>
                  <span className="font-bold text-zinc-300">
                    {driver.podiums}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "team" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedEntity(team)}
              className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50 cursor-pointer transition-all shadow-md group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getFlag(team.country)}</span>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                      {team.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {team.country} • Debut {team.debutYear}
                    </span>
                  </div>
                </div>
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black"
                  style={{ backgroundColor: team.colorHex }}
                />
              </div>

              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-800/60 text-center font-mono text-[11px]">
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">TITLES</span>
                  <span className="font-bold text-amber-400">
                    {team.championships}x
                  </span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">WINS</span>
                  <span className="font-bold text-white">{team.wins}</span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">SEASONS</span>
                  <span className="font-bold text-zinc-300">
                    {team.seasonsCompeted}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "track" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              onClick={() => setSelectedEntity(track)}
              className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50 cursor-pointer transition-all shadow-md group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getFlag(track.country)}</span>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                      {track.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {track.country} • First GP {track.firstGPYea}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  {track.circuitType}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-800/60 text-center font-mono text-[11px]">
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">LENGTH</span>
                  <span className="font-bold text-emerald-400">
                    {track.lengthKm.toFixed(2)} km
                  </span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">CORNERS</span>
                  <span className="font-bold text-white">{track.corners}</span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">LAPS</span>
                  <span className="font-bold text-zinc-300">
                    {track.raceLaps}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inspect Modal */}
      {selectedEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl text-left">
            <button
              onClick={() => setSelectedEntity(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">
                {activeTab === "driver"
                  ? getFlag((selectedEntity as Driver).nationality)
                  : getFlag(
                      activeTab === "team"
                        ? (selectedEntity as Team).country
                        : (selectedEntity as Track).country
                    )}
              </span>
              <div>
                <h3 className="text-xl font-black text-white">
                  {selectedEntity.name}
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  {activeTab === "driver" &&
                    `${(selectedEntity as Driver).nationality} • Debut: ${
                      (selectedEntity as Driver).debutYear
                    }`}
                  {activeTab === "team" &&
                    `${(selectedEntity as Team).country} • Debut: ${
                      (selectedEntity as Team).debutYear
                    }`}
                  {activeTab === "track" &&
                    `${(selectedEntity as Track).country} • ${
                      (selectedEntity as Track).lengthKm
                    } km • ${(selectedEntity as Track).circuitType}`}
                </span>
              </div>
            </div>

            {/* If track, show vector visualizer */}
            {activeTab === "track" && (
              <div className="flex justify-center my-3 bg-black/40 rounded-2xl p-2 border border-zinc-800">
                <TrackSvg trackId={selectedEntity.id} className="w-48 h-32" />
              </div>
            )}

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 mb-4">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                {selectedEntity.educationalInfo.overview}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-black/50 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block font-bold">
                    {selectedEntity.educationalInfo.highlight1Title}
                  </span>
                  <span className="text-zinc-300">
                    {selectedEntity.educationalInfo.highlight1Text}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/50 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block font-bold">
                    {selectedEntity.educationalInfo.highlight2Title}
                  </span>
                  <span className="text-zinc-300">
                    {selectedEntity.educationalInfo.highlight2Text}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedEntity(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

