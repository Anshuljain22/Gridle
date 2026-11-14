"use client";

import React, { useState } from "react";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { Icon3D } from "../icons3d/Icon3D";
import { DriverAvatar } from "../avatars/DriverAvatar";
import { getFlag } from "@/data/continents";
import { Calendar, CloudRain, Sun, Thermometer, Wind, Flag, Clock, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface GrandPrixRace {
  round: number;
  name: string;
  circuit: string;
  country: string;
  countryCode: string;
  date: string;
  laps: number;
  lengthKm: string;
  airTemp: string;
  trackTemp: string;
  weather: "Dry / Sunny" | "Overcast" | "Rain Threat (40%)" | "Night Race / Clear";
}

const SEASON_CALENDAR: GrandPrixRace[] = [
  {
    round: 1,
    name: "Australian Grand Prix",
    circuit: "Albert Park Circuit",
    country: "Australia",
    countryCode: "AU",
    date: "14–16 Mar 2025",
    laps: 58,
    lengthKm: "5.278 km",
    airTemp: "23°C",
    trackTemp: "36°C",
    weather: "Dry / Sunny",
  },
  {
    round: 2,
    name: "Chinese Grand Prix",
    circuit: "Shanghai International Circuit",
    country: "China",
    countryCode: "CN",
    date: "21–23 Mar 2025",
    laps: 56,
    lengthKm: "5.451 km",
    airTemp: "19°C",
    trackTemp: "27°C",
    weather: "Overcast",
  },
  {
    round: 3,
    name: "Japanese Grand Prix",
    circuit: "Suzuka International Racing Course",
    country: "Japan",
    countryCode: "JP",
    date: "04–06 Apr 2025",
    laps: 53,
    lengthKm: "5.807 km",
    airTemp: "18°C",
    trackTemp: "29°C",
    weather: "Rain Threat (40%)",
  },
  {
    round: 4,
    name: "Bahrain Grand Prix",
    circuit: "Bahrain International Circuit",
    country: "Bahrain",
    countryCode: "BH",
    date: "11–13 Apr 2025",
    laps: 57,
    lengthKm: "5.412 km",
    airTemp: "26°C",
    trackTemp: "31°C",
    weather: "Night Race / Clear",
  },
  {
    round: 5,
    name: "Saudi Arabian Grand Prix",
    circuit: "Jeddah Corniche Circuit",
    country: "Saudi Arabia",
    countryCode: "SA",
    date: "18–20 Apr 2025",
    laps: 50,
    lengthKm: "6.174 km",
    airTemp: "28°C",
    trackTemp: "33°C",
    weather: "Night Race / Clear",
  },
  {
    round: 6,
    name: "Miami Grand Prix",
    circuit: "Miami International Autodrome",
    country: "United States",
    countryCode: "US",
    date: "02–04 May 2025",
    laps: 57,
    lengthKm: "5.412 km",
    airTemp: "30°C",
    trackTemp: "48°C",
    weather: "Dry / Sunny",
  },
  {
    round: 7,
    name: "Monaco Grand Prix",
    circuit: "Circuit de Monaco",
    country: "Monaco",
    countryCode: "MC",
    date: "23–25 May 2025",
    laps: 78,
    lengthKm: "3.337 km",
    airTemp: "22°C",
    trackTemp: "38°C",
    weather: "Dry / Sunny",
  },
  {
    round: 8,
    name: "Spanish Grand Prix",
    circuit: "Circuit de Barcelona-Catalunya",
    country: "Spain",
    countryCode: "ES",
    date: "30 May–01 Jun 2025",
    laps: 66,
    lengthKm: "4.657 km",
    airTemp: "27°C",
    trackTemp: "42°C",
    weather: "Dry / Sunny",
  },
  {
    round: 9,
    name: "Canadian Grand Prix",
    circuit: "Circuit Gilles Villeneuve",
    country: "Canada",
    countryCode: "CA",
    date: "13–15 Jun 2025",
    laps: 70,
    lengthKm: "4.361 km",
    airTemp: "21°C",
    trackTemp: "34°C",
    weather: "Rain Threat (40%)",
  },
  {
    round: 10,
    name: "British Grand Prix",
    circuit: "Silverstone Circuit",
    country: "United Kingdom",
    countryCode: "GB",
    date: "04–06 Jul 2025",
    laps: 52,
    lengthKm: "5.891 km",
    airTemp: "20°C",
    trackTemp: "30°C",
    weather: "Overcast",
  },
];

const CHAMPIONSHIP_STANDINGS = [
  { pos: "P1", name: "Max Verstappen", team: "Red Bull Racing", points: 437, wins: 9, color: "#1E22AA" },
  { pos: "P2", name: "Lando Norris", team: "McLaren", points: 374, wins: 4, color: "#FF8000" },
  { pos: "P3", name: "Charles Leclerc", team: "Scuderia Ferrari", points: 356, wins: 3, color: "#E10600" },
  { pos: "P4", name: "Oscar Piastri", team: "McLaren", points: 292, wins: 2, color: "#FF8000" },
  { pos: "P5", name: "Carlos Sainz", team: "Williams", points: 290, wins: 2, color: "#002F6C" },
  { pos: "P6", name: "George Russell", team: "Mercedes AMG", points: 245, wins: 2, color: "#00D2BE" },
  { pos: "P7", name: "Lewis Hamilton", team: "Scuderia Ferrari", points: 223, wins: 2, color: "#E10600" },
  { pos: "P8", name: "Sergio Pérez", team: "Red Bull Racing", points: 152, wins: 0, color: "#1E22AA" },
];

export const SeasonHub: React.FC = () => {
  const [selectedRace, setSelectedRace] = useState<GrandPrixRace>(SEASON_CALENDAR[0]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 select-none animate-fadeIn py-2">
      {/* Header */}
      <SpotlightCard spotlightColor="rgba(225, 6, 0, 0.2)" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon3D name="flag" size={38} />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                OFFICIAL FIA PADDOCK HUB
              </span>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono mt-0.5">
                <ShinyText text="SEASON CALENDAR & TRACK WEATHER RADAR" className="text-xl sm:text-2xl font-black italic" />
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-3 py-1.5 rounded-xl font-bold">
            2025 FIA WORLD CHAMPIONSHIP
          </span>
        </div>
      </SpotlightCard>

      {/* Grid: Next Grand Prix Details & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Active Race Radar (7 cols) */}
        <div className="lg:col-span-7 f1-glass rounded-3xl p-5 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="font-bold text-white uppercase">ROUND {selectedRace.round} OF 24</span>
            </div>
            <span className="text-zinc-400">{selectedRace.date}</span>
          </div>

          {/* Grand Prix Banner */}
          <div className="flex items-center gap-4">
            <span className="text-4xl">{getFlag(selectedRace.country)}</span>
            <div>
              <h3 className="text-2xl font-black italic text-white font-mono tracking-tight">
                {selectedRace.name}
              </h3>
              <span className="text-xs text-zinc-400 font-mono block">
                {selectedRace.circuit} ({selectedRace.country})
              </span>
            </div>
          </div>

          {/* Track Specs Grid */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="p-3 rounded-2xl bg-black/60 border border-white/10">
              <span className="text-[9px] text-zinc-500 uppercase block mb-1">CIRCUIT LENGTH</span>
              <span className="font-bold text-white text-sm">{selectedRace.lengthKm}</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/60 border border-white/10">
              <span className="text-[9px] text-zinc-500 uppercase block mb-1">TOTAL LAPS</span>
              <span className="font-bold text-white text-sm">{selectedRace.laps} LAPS</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/60 border border-white/10">
              <span className="text-[9px] text-zinc-500 uppercase block mb-1">CONDITIONS</span>
              <span className="font-bold text-amber-400 text-xs truncate block">{selectedRace.weather}</span>
            </div>
          </div>

          {/* Live Track Weather Telemetry */}
          <div className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs space-y-3">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
              PIT LANE METEOROLOGICAL RADAR:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <Thermometer className="w-4 h-4 text-red-500 mx-auto mb-1" />
                <span className="text-[9px] text-zinc-500 block">ASPHALT</span>
                <span className="font-bold text-white text-sm">{selectedRace.trackTemp}</span>
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <Wind className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <span className="text-[9px] text-zinc-500 block">AIR TEMP</span>
                <span className="font-bold text-white text-sm">{selectedRace.airTemp}</span>
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <CloudRain className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[9px] text-zinc-500 block">PRECIPITATION</span>
                <span className="font-bold text-white text-sm">
                  {selectedRace.weather.includes("Rain") ? "40%" : "0%"}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <Sun className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[9px] text-zinc-500 block">TRACK GRIP</span>
                <span className="font-bold text-emerald-400 text-sm">OPTIMAL</span>
              </div>
            </div>
          </div>

          {/* Schedule Select Bar */}
          <div>
            <span className="text-xs font-mono text-zinc-400 block mb-2 font-bold uppercase">
              SELECT GRAND PRIX FROM CALENDAR:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
              {SEASON_CALENDAR.map((race) => (
                <button
                  key={race.round}
                  onClick={() => setSelectedRace(race)}
                  className={`px-3 py-2 rounded-xl font-mono text-xs whitespace-nowrap border transition-all shrink-0 flex items-center gap-1.5 ${
                    selectedRace.round === race.round
                      ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-950/60"
                      : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{getFlag(race.country)}</span>
                  <span>R{race.round}: {race.country}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Driver Championship Standings (5 cols) */}
        <div className="lg:col-span-5 f1-glass rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              WORLD CHAMPIONSHIP STANDINGS
            </span>
            <span className="text-[10px] text-zinc-400">FIA WDC</span>
          </div>

          {/* Standings Table */}
          <div className="space-y-1.5 font-mono text-xs">
            {CHAMPIONSHIP_STANDINGS.map((d) => (
              <div
                key={d.pos}
                className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                      d.pos === "P1"
                        ? "bg-amber-500 text-black font-black"
                        : d.pos === "P2"
                        ? "bg-zinc-300 text-black font-black"
                        : d.pos === "P3"
                        ? "bg-amber-700 text-white font-black"
                        : "bg-black/60 text-zinc-400"
                    }`}
                  >
                    {d.pos}
                  </span>

                  <DriverAvatar name={d.name} teamColor={d.color} size={28} />

                  <div className="truncate">
                    <span className="font-bold text-white block truncate text-xs">
                      {d.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 truncate block">
                      {d.team}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-amber-400 block tabular-nums text-xs">
                    {d.points} PTS
                  </span>
                  <span className="text-[10px] text-zinc-500 tabular-nums">
                    {d.wins} wins
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
