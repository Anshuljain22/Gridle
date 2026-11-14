"use client";

import React, { useState, useEffect } from "react";
import { Category, Driver, Team, Track } from "@/types";
import { Icon3D } from "../icons3d/Icon3D";
import { sound } from "@/lib/sound";
import { TRACK_PATHS } from "../TrackSvg";
import {
  Compass,
  Wind,
  Thermometer,
  CloudRain,
  Radio,
  Gauge,
  Navigation,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

interface CockpitTelemetryWingProps {
  category: Category;
  targetEntity: Driver | Team | Track | null;
  attemptsCount: number;
}

export const CockpitTelemetryWing: React.FC<CockpitTelemetryWingProps> = ({
  category,
  targetEntity,
  attemptsCount,
}) => {
  const [activeCircuit, setActiveCircuit] = useState<string>("monaco");
  const [gForce, setGForce] = useState<{ lat: number; long: number }>({ lat: 3.4, long: -2.1 });
  const [steerAngle, setSteerAngle] = useState<number>(14);
  const [radioMsg, setRadioMsg] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Subtle telemetry oscillation simulation for cockpit realism
  useEffect(() => {
    const interval = setInterval(() => {
      const lat = Number((3.0 + Math.random() * 1.8).toFixed(1));
      const long = Number((-1.5 - Math.random() * 3.2).toFixed(1));
      const steer = Math.round(10 + Math.random() * 22);
      setGForce({ lat, long });
      setSteerAngle(steer);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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
          clue = `Engineer: "Historic telemetry alert: This is a classic / defunct constructor. Debut year was ${t.debutYear}."`;
        }
      } else {
        const tr = targetEntity as Track;
        clue = `Engineer: "Track condition steady. Target circuit has ${tr.corners} turns and runs in a ${tr.direction.toLowerCase()} direction."`;
      }

      setRadioMsg(clue);
      setIsBroadcasting(false);
      sound.playHintUnlock();
    }, 600);
  };

  const trackPath = TRACK_PATHS[activeCircuit] || TRACK_PATHS.monaco;

  return (
    <div className="w-full space-y-4">
      {/* 1. Track Radar & GPS Telemetry Display */}
      <div className="cockpit-bezel cockpit-chamfer p-4 relative overflow-hidden">
        {/* Fastener hex bolts in top corners */}
        <div className="absolute top-2.5 left-2.5 hex-rivet" />
        <div className="absolute top-2.5 right-2.5 hex-rivet" />
        <div className="absolute bottom-2.5 left-2.5 hex-rivet" />
        <div className="absolute bottom-2.5 right-2.5 hex-rivet" />

        {/* Header telemetry stamp */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2 pl-2">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: "var(--team-primary)" }}
            />
            <span className="font-bold text-white tracking-wider uppercase text-[11px]">
              GPS TRACK TELEMETRY
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase pr-2">
            RADAR 24Hz
          </span>
        </div>

        {/* Track Silhouette with Animated GPS Racing Beacon */}
        <div className="relative aspect-[4/3] bg-black/60 rounded-xl border border-white/5 p-3 flex items-center justify-center overflow-hidden hud-reticle-grid">
          <svg viewBox="0 0 100 100" className="w-full h-full max-w-[200px]">
            {/* Base circuit asphalt */}
            <path
              d={trackPath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Active team racing line */}
            <path
              d={trackPath}
              fill="none"
              stroke="var(--team-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_var(--team-glow)]"
            />
            {/* Pulsing GPS Car Beacon */}
            <circle cx="30" cy="50" r="3.5" fill="#FFFFFF" className="animate-ping" />
            <circle
              cx="30"
              cy="50"
              r="2.5"
              style={{ fill: "var(--team-accent, #FFD700)" }}
            />
          </svg>

          {/* Mini Track Selector Tabs */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: "monaco", label: "MON" },
              { id: "silverstone", label: "SIL" },
              { id: "spa", label: "SPA" },
              { id: "monza", label: "MNZ" },
              { id: "suzuka", label: "SUZ" },
            ].map((trk) => (
              <button
                key={trk.id}
                onClick={() => {
                  setActiveCircuit(trk.id);
                  sound.playLightBeep(850);
                }}
                className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
                  activeCircuit === trk.id
                    ? "text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300 bg-white/5"
                }`}
                style={
                  activeCircuit === trk.id
                    ? {
                        backgroundColor: "var(--team-primary)",
                        color: "#FFFFFF",
                      }
                    : undefined
                }
              >
                {trk.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Sector Delta Splits */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 text-center font-mono text-[10px]">
          <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-zinc-500 block text-[8px] uppercase">SECTOR 1</span>
            <span className="text-emerald-400 font-bold">🟢 -0.142s</span>
          </div>
          <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-zinc-500 block text-[8px] uppercase">SECTOR 2</span>
            <span className="text-purple-300 font-bold">🟣 PURPLE</span>
          </div>
          <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
            <span className="text-zinc-500 block text-[8px] uppercase">SECTOR 3</span>
            <span className="text-amber-400 font-bold">🟡 +0.028s</span>
          </div>
        </div>
      </div>

      {/* 2. G-Force Accelerometer & Telemetry Sensor */}
      <div className="cockpit-bezel cockpit-chamfer p-4 relative overflow-hidden">
        <div className="absolute top-2.5 left-2.5 hex-rivet" />
        <div className="absolute top-2.5 right-2.5 hex-rivet" />
        <div className="absolute bottom-2.5 left-2.5 hex-rivet" />
        <div className="absolute bottom-2.5 right-2.5 hex-rivet" />

        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono pl-2 pr-2">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" style={{ color: "var(--team-primary)" }} />
            <span className="font-bold text-white tracking-wider uppercase text-[11px]">
              G-FORCE VECTOR
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">FIA SENSOR</span>
        </div>

        <div className="grid grid-cols-2 gap-3 items-center">
          {/* Circular G-Force Reticle */}
          <div className="relative aspect-square max-w-[110px] mx-auto w-full rounded-full border border-white/15 bg-black/50 flex items-center justify-center p-2 shadow-inner">
            {/* Concentric G rings (1G, 3G, 5G) */}
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute inset-5 rounded-full border border-dashed border-white/10" />
            {/* Center crosshair */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/15" />

            {/* Dynamic G-Ball Indicator */}
            <motion.div
              animate={{
                x: (gForce.lat / 5) * 26,
                y: (gForce.long / 5) * 26,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-3.5 h-3.5 rounded-full shadow-[0_0_12px_var(--team-glow)] border border-white"
              style={{ backgroundColor: "var(--team-primary)" }}
            />
          </div>

          {/* Digital Readout */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="p-2 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[9px] text-zinc-500 uppercase block">LATERAL ACCEL</span>
              <span className="text-sm font-black text-white tabular-nums">
                +{gForce.lat} G
              </span>
            </div>
            <div className="p-2 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[9px] text-zinc-500 uppercase block">DECELERATION</span>
              <span className="text-sm font-black text-amber-400 tabular-nums">
                {gForce.long} G
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pit Wall Radio Transceiver */}
      <div className="cockpit-bezel cockpit-chamfer p-4 relative overflow-hidden">
        <div className="absolute top-2.5 left-2.5 hex-rivet" />
        <div className="absolute top-2.5 right-2.5 hex-rivet" />
        <div className="absolute bottom-2.5 left-2.5 hex-rivet" />
        <div className="absolute bottom-2.5 right-2.5 hex-rivet" />

        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono pl-2 pr-2">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-zinc-300" />
            <span className="font-bold text-white tracking-wider uppercase text-[11px]">
              PIT WALL COMMS
            </span>
          </div>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase"
            style={{
              color: "var(--team-primary)",
              backgroundColor: "var(--team-bg-tint)",
            }}
          >
            CH-04 ONLINE
          </span>
        </div>

        <button
          onClick={requestRadioClue}
          disabled={isBroadcasting}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border font-mono text-xs font-bold transition-all shadow-md active:scale-95 group hover:brightness-110"
          style={{
            background: "var(--team-gradient-h)",
            borderColor: "var(--team-primary)",
            boxShadow: "0 4px 14px var(--team-glow)",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white group-hover:animate-ping" />
          <span className="text-white uppercase tracking-wider text-[11px]">
            {isBroadcasting ? "DECRYPTING TRANSMISSION..." : "CALL RACE ENGINEER"}
          </span>
        </button>

        {radioMsg && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2.5 p-2.5 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-200 leading-relaxed italic"
          >
            {radioMsg}
          </motion.div>
        )}
      </div>

      {/* 4. Trackside Environmental Meteorology */}
      <div className="cockpit-bezel cockpit-chamfer p-3 relative overflow-hidden text-xs font-mono">
        <div className="flex items-center justify-between gap-2 text-zinc-400 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5" style={{ color: "var(--team-primary)" }} />
            <span>TRACK: <strong className="text-white">34.2°C</strong></span>
          </div>
          <span className="text-zinc-600">•</span>
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-sky-400" />
            <span>WIND: <strong className="text-white">12 KM/H NW</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
