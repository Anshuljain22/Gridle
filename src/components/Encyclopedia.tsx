"use client";

import React, { useState } from "react";
import { DRIVERS } from "@/data/drivers";
import { TEAMS } from "@/data/teams";
import { TRACKS } from "@/data/tracks";
import { Driver, Team, Track, Category } from "@/types";
import { getFlag } from "@/data/continents";
import { TrackSvg } from "./TrackSvg";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedTabs, TabOption } from "@/components/watermelon/AnimatedTabs";
import { MotionButton } from "@/components/watermelon/MotionButton";

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

  const archiveTabs: TabOption<Category>[] = [
    { id: "driver", label: `DRIVERS (${DRIVERS.length})` },
    { id: "team", label: `TEAMS (${TEAMS.length})` },
    { id: "track", label: `TRACKS (${TRACKS.length})` },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      {/* Top Header & Search with Watermelon UI styling */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-3xl f1-glass mb-6">
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
          <AnimatedTabs
            tabs={archiveTabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
            layoutId="archive-tabs-pill"
            className="w-full sm:w-auto"
          />

          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archive..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-600 font-mono transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid of Entities with Motion Dev Stagger */}
      {activeTab === "driver" && (
        <motion.div
          key="drivers-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {filteredDrivers.map((driver) => (
            <motion.div
              key={driver.id}
              onClick={() => setSelectedEntity(driver)}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-2xl f1-glass-interactive cursor-pointer group"
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
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === "team" && (
        <motion.div
          key="teams-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {filteredTeams.map((team) => (
            <motion.div
              key={team.id}
              onClick={() => setSelectedEntity(team)}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-2xl f1-glass-interactive cursor-pointer group"
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
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    team.active
                      ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                      : "bg-zinc-900 text-zinc-500 border-zinc-800"
                  }`}
                >
                  {team.active ? "ACTIVE" : "HISTORIC"}
                </span>
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
                  <span className="text-zinc-500 block text-[9px]">PODIUMS</span>
                  <span className="font-bold text-zinc-300">{team.podiums}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === "track" && (
        <motion.div
          key="tracks-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {filteredTracks.map((track) => (
            <motion.div
              key={track.id}
              onClick={() => setSelectedEntity(track)}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-2xl f1-glass-interactive cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getFlag(track.country)}</span>
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                        {track.name}
                      </h3>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {track.country} • {track.lengthKm} km
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {track.circuitType}
                  </span>
                </div>

                <div className="h-28 flex items-center justify-center p-2 my-2 bg-black/40 rounded-xl border border-zinc-850">
                  <TrackSvg trackId={track.id} className="w-full h-full text-red-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-800/60 text-center font-mono text-[11px]">
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">TURNS</span>
                  <span className="font-bold text-white">{track.corners}</span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">FIRST GP</span>
                  <span className="font-bold text-zinc-300">
                    {track.firstGPYea}
                  </span>
                </div>
                <div className="p-1 rounded bg-black/40">
                  <span className="text-zinc-500 block text-[9px]">DIRECTION</span>
                  <span className="font-bold text-zinc-300 truncate">
                    {track.direction}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Detailed Entity Dossier Modal with Motion Dev */}
      <AnimatePresence>
        {selectedEntity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntity(null)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg f1-glass-modal rounded-3xl p-6 z-10"
            >
              <button
                onClick={() => setSelectedEntity(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
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
                  <h3 className="text-xl font-black text-white font-mono">
                    {selectedEntity.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    FIA Dossier Identification #{selectedEntity.id.toUpperCase()}
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

              <MotionButton
                onClick={() => setSelectedEntity(null)}
                variant="secondary"
                size="md"
                className="w-full"
              >
                CLOSE DOSSIER
              </MotionButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
