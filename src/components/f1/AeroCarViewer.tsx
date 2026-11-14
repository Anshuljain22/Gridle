"use client";

import React, { useState } from "react";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { Icon3D } from "../icons3d/Icon3D";
import { motion, AnimatePresence } from "motion/react";
import { Wind, Shield, Zap, Gauge, ChevronRight, Info } from "lucide-react";

interface AeroHotspot {
  id: string;
  name: string;
  category: "Aerodynamics" | "Safety" | "Power Unit" | "Chassis";
  cx: number;
  cy: number;
  summary: string;
  technicalDetails: string[];
  downforceImpact: string;
}

const AERO_HOTSPOTS: AeroHotspot[] = [
  {
    id: "front-wing",
    name: "Ground-Effect Front Wing & Endplates",
    category: "Aerodynamics",
    cx: 480,
    cy: 160,
    summary: "Multi-element carbon wing guiding clean air into the floor and directing turbulent tire wake outward.",
    technicalDetails: [
      "Generates ~25% of total car downforce",
      "Features adjustable flaps (up to 5° angle-of-attack tuning in pit lane)",
      "Curved endplate diveplanes generate outwash vortex",
    ],
    downforceImpact: "25% Front Axle Load",
  },
  {
    id: "venturi-tunnels",
    name: "Underfloor Venturi Tunnels & Strakes",
    category: "Aerodynamics",
    cx: 280,
    cy: 210,
    summary: "Twin contoured ground-effect tunnels underneath the floor accelerating air to create colossal low-pressure suction.",
    technicalDetails: [
      "Produces over 60% of total car downforce without dirty wake penalty",
      "Features 4 curved entrance guide strakes to condition flow",
      "Sealed dynamically by floor edge vortex strips",
    ],
    downforceImpact: "60% Total Car Suction",
  },
  {
    id: "halo",
    name: "Titanium Halo Safety Cockpit",
    category: "Safety",
    cx: 260,
    cy: 110,
    summary: "Curved Grade 5 titanium structure surrounding the driver's helmet, capable of withstanding 12 tonnes of static load.",
    technicalDetails: [
      "Weighs only 9 kg while sustaining the weight of two London double-decker buses",
      "Aero-faired with custom carbon winglets to minimize helmet buffeting",
      "Mandatory across all FIA single-seater categories since 2018",
    ],
    downforceImpact: "Aero Neutral (Faired)",
  },
  {
    id: "sidepods",
    name: "Downwash Sidepod Undercuts",
    category: "Chassis",
    cx: 240,
    cy: 160,
    summary: "Sculpted aerodynamic radiator housings directing clean high-energy airflow down onto the top of the diffuser.",
    technicalDetails: [
      "Housings for water radiators, intercoolers, and gearbox oil coolers",
      "Extreme undercut channels flow toward the beam wing",
      "Engineered to withstand 40G side-impact crash tests",
    ],
    downforceImpact: "Aero Conditioning",
  },
  {
    id: "drs-rear-wing",
    name: "DRS Actuator & High-Downforce Rear Wing",
    category: "Aerodynamics",
    cx: 90,
    cy: 120,
    summary: "Hydraulically controlled upper flap opening an 85mm slot in designated DRS zones to slash drag and facilitate overtakes.",
    technicalDetails: [
      "Slashing drag by up to 30%, giving 12–18 km/h top speed surge",
      "Automatically shuts upon brake pedal application",
      "Connected to beam wing for secondary diffuser extraction",
    ],
    downforceImpact: "-30% Drag when Open",
  },
  {
    id: "diffuser",
    name: "Carbon Expansion Rear Diffuser",
    category: "Aerodynamics",
    cx: 70,
    cy: 200,
    summary: "The upwardly expanding rear tunnel allowing accelerated underfloor air to slow down and expand back to ambient pressure.",
    technicalDetails: [
      "Pulls air from the entire length of the chassis through Bernoulli principle",
      "Flanked by vertical vortex fences to maintain air separation",
      "Highest efficiency aerodynamic surface on the car",
    ],
    downforceImpact: "35% Rear Axle Downforce",
  },
];

export const AeroCarViewer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<AeroHotspot>(AERO_HOTSPOTS[0]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 select-none animate-fadeIn py-2">
      {/* Header */}
      <SpotlightCard spotlightColor="rgba(225, 6, 0, 0.2)" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon3D name="car" size={38} />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                PADDOCK WIND TUNNEL & CFD
              </span>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono mt-0.5">
                <ShinyText text="INTERACTIVE AERODYNAMICS INSPECTOR" className="text-xl sm:text-2xl font-black italic" />
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            6 ACTIVE TELEMETRY SENSORS
          </span>
        </div>
      </SpotlightCard>

      {/* Main Aero Interactive Canvas & Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Interactive Blueprint Vector Canvas (7 cols) */}
        <div className="lg:col-span-7 f1-glass rounded-3xl p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-zinc-400 font-bold flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse transition-colors"
                style={{ backgroundColor: "var(--team-primary)" }}
              />
              GROUND-EFFECT CHASSIS CAD VIEW
            </span>
            <span className="text-zinc-500 text-[10px]">CLICK SENSORS TO INSPECT</span>
          </div>

          {/* SVG Car Wireframe with Clickable Hotspots */}
          <div className="relative w-full aspect-[16/9] bg-black/80 rounded-2xl border border-white/10 p-2 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Grid & Wind Tunnel Particles */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            {/* Aerodynamic Airflow Streamlines */}
            <svg viewBox="0 0 560 280" className="w-full h-full drop-shadow-lg">
              {/* Airflow Lines */}
              <path
                d="M 540 140 C 460 140 380 90 280 90 C 180 90 120 120 40 120"
                fill="none"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="animate-aero-drift"
              />
              <path
                d="M 540 180 C 460 180 340 220 220 220 C 140 220 90 210 40 210"
                fill="none"
                stroke="rgba(225, 6, 0, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="animate-aero-drift"
              />

              {/* F1 Car Side/Profile Silhouette */}
              <g stroke="#71717A" strokeWidth="1.5" fill="none">
                {/* Rear Wing */}
                <rect x="70" y="80" width="40" height="70" rx="3" stroke="#A1A1AA" fill="rgba(24, 24, 27, 0.8)" />
                {/* Rear Tire */}
                <rect x="100" y="140" width="55" height="90" rx="16" stroke="#EF4444" strokeWidth="2" fill="#09090B" />
                {/* Engine Cover & Shark Fin */}
                <path d="M 110 100 L 220 110 L 280 150 L 140 150 Z" fill="rgba(225, 6, 0, 0.15)" stroke="#DC2626" />
                {/* Halo */}
                <path d="M 230 110 C 240 90 270 90 280 120" stroke="#F4F4F5" strokeWidth="2.5" />
                {/* Monocoque Nosecone */}
                <path d="M 260 130 L 460 155 L 480 165 L 360 165 Z" fill="rgba(39, 39, 42, 0.6)" stroke="#A1A1AA" />
                {/* Front Wing */}
                <path d="M 450 155 L 520 160 L 520 180 L 440 175 Z" fill="rgba(225, 6, 0, 0.2)" stroke="#DC2626" />
                {/* Front Tire */}
                <rect x="420" y="140" width="55" height="90" rx="16" stroke="#EF4444" strokeWidth="2" fill="#09090B" />
                {/* Venturi Floor Edge */}
                <line x1="160" y1="210" x2="410" y2="210" stroke="#10B981" strokeWidth="3" />
                {/* Rear Diffuser Slope */}
                <path d="M 80 200 L 160 210" stroke="#10B981" strokeWidth="3" />
              </g>

              {/* Clickable Hotspots */}
              {AERO_HOTSPOTS.map((spot) => {
                const isSelected = activeHotspot.id === spot.id;
                return (
                  <g
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing Target Ring */}
                    <circle
                      cx={spot.cx}
                      cy={spot.cy}
                      r={isSelected ? "14" : "10"}
                      fill={isSelected ? "rgba(225, 6, 0, 0.4)" : "rgba(255, 255, 255, 0.1)"}
                      stroke={isSelected ? "#EF4444" : "#A1A1AA"}
                      strokeWidth="1.5"
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                    <circle
                      cx={spot.cx}
                      cy={spot.cy}
                      r="4"
                      fill={isSelected ? "#EF4444" : "#FFFFFF"}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Hotspot Select Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {AERO_HOTSPOTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveHotspot(s)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all ${
                  activeHotspot.id === s.id
                    ? "text-white shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5"
                }`}
                style={
                  activeHotspot.id === s.id
                    ? {
                        background: "var(--team-gradient-h)",
                        boxShadow: "0 4px 14px var(--team-glow)",
                      }
                    : undefined
                }
              >
                {s.name.split(" ")[0]} {s.name.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Technical Inspector Dossier (5 cols) */}
        <div className="lg:col-span-5 f1-glass rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-colors"
              style={{
                color: "var(--team-primary-light)",
                backgroundColor: "var(--team-bg-tint)",
                borderColor: "var(--team-border)",
              }}
            >
              {activeHotspot.category}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {activeHotspot.downforceImpact}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-white font-mono tracking-tight">
              {activeHotspot.name}
            </h3>
            <p className="text-xs text-zinc-300 font-mono mt-1.5 leading-relaxed">
              {activeHotspot.summary}
            </p>
          </div>

          {/* Technical Bullets */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
              TECHNICAL SPECIFICATIONS & AERODYNAMICS:
            </span>
            {activeHotspot.technicalDetails.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-zinc-300"
              >
                <ChevronRight className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
            <span className="text-zinc-200 font-bold block mb-1">FIA Regulation Context:</span>
            Ground-effect aerodynamics introduced in 2022 rely heavily on underfloor suction rather than top-body wings, allowing cars to follow closely within 1 second without losing cornering downforce.
          </div>
        </div>
      </div>
    </div>
  );
};
