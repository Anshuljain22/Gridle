"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GarageBackgroundProps {
  className?: string;
}

/**
 * F1 Active Pit Garage & Telemetry Dynamics Background
 * Features:
 * 1. Rotating centerlock wheel hub, brake disc & planetary gears
 * 2. Animated aerodynamic wind tunnel streamlines (CFD particle flow)
 * 3. Sweeping telemetry laser scanner line
 * 4. F1 Ground-effect chassis wireframe blueprint
 * 5. Floating live telemetry sensor nodes
 */
export const GarageBackground: React.FC<GarageBackgroundProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Overhead Pit Box Neon Ambient Illumination */}
      <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-gradient-to-b from-white/8 via-cyan-500/5 to-transparent blur-3xl opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

      {/* 2. Top-Right: Rotating F1 Centerlock Rim & Carbon Brake Assembly */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] opacity-25">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-spin-slow text-zinc-500"
          fill="none"
          stroke="currentColor"
        >
          {/* Outer Rim & Tyre Contour */}
          <circle cx="200" cy="200" r="190" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="175" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="200" cy="200" r="150" strokeWidth="2" stroke="rgba(225, 6, 0, 0.4)" />

          {/* Ventilated Carbon Brake Disc with Drilling Holes */}
          <circle cx="200" cy="200" r="125" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.6" />
          <circle cx="200" cy="200" r="100" strokeWidth="1" strokeOpacity="0.3" />

          {/* 10-Spoke Forged Magnesium Wheel Geometry */}
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 200 200)`}>
              <line x1="200" y1="200" x2="200" y2="28" strokeWidth="1.5" strokeOpacity="0.7" />
              <circle cx="200" cy="80" r="4" strokeWidth="1" stroke="rgba(225, 6, 0, 0.5)" />
            </g>
          ))}

          {/* Center-Lock Anodized Nut & Axle Core */}
          <circle cx="200" cy="200" r="45" strokeWidth="2" stroke="rgba(225, 6, 0, 0.7)" />
          <polygon
            points="200,165 230,182 230,218 200,235 170,218 170,182"
            strokeWidth="1.5"
            stroke="rgba(255, 255, 255, 0.8)"
            fill="rgba(225, 6, 0, 0.1)"
          />
          <circle cx="200" cy="200" r="14" fill="rgba(225, 6, 0, 0.4)" strokeWidth="1" />
        </svg>
      </div>

      {/* 3. Bottom-Left: Interlocking Planetary Gearbox Mechanism */}
      <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] opacity-20">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-spin-reverse-slow text-zinc-400"
          fill="none"
          stroke="currentColor"
        >
          {/* Ring Gear Outer Teeth */}
          <circle cx="200" cy="200" r="185" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="160" strokeWidth="1" strokeOpacity="0.5" />

          {/* Planetary Sun Gear */}
          <circle cx="200" cy="200" r="70" strokeWidth="1.5" stroke="rgba(255, 255, 255, 0.5)" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="200"
              y1="130"
              x2="200"
              y2="140"
              transform={`rotate(${deg} 200 200)`}
              strokeWidth="2"
              stroke="rgba(225, 6, 0, 0.6)"
            />
          ))}

          {/* Planet Gears (3 satellite gears) */}
          {[0, 120, 240].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 200 + 115 * Math.sin(rad);
            const cy = 200 - 115 * Math.cos(rad);
            return (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="42" strokeWidth="1.5" stroke="rgba(255, 255, 255, 0.6)" />
                <circle cx={cx} cy={cy} r="10" strokeWidth="1" stroke="rgba(225, 6, 0, 0.8)" fill="rgba(0,0,0,0.5)" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 4. CFD Aerodynamic Wind Tunnel Streamlines (Drifting Airflow) */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* Streamline 1 */}
        <div
          className="absolute top-[18%] left-0 w-[450px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-aero-drift"
          style={{ animationDuration: "11s", animationDelay: "0s" }}
        />
        {/* Streamline 2 */}
        <div
          className="absolute top-[32%] left-0 w-[600px] h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-aero-drift"
          style={{ animationDuration: "14s", animationDelay: "3s" }}
        />
        {/* Streamline 3 */}
        <div
          className="absolute top-[58%] left-0 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-aero-drift"
          style={{ animationDuration: "13s", animationDelay: "6s" }}
        />
        {/* Streamline 4 */}
        <div
          className="absolute top-[78%] left-0 w-[700px] h-[1.5px] bg-gradient-to-r from-transparent via-red-400/80 to-transparent animate-aero-drift"
          style={{ animationDuration: "16s", animationDelay: "1.5s" }}
        />
      </div>

      {/* 5. Center-Ground: F1 Chassis Monocoque Aerodynamic Silhouette Wireframe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-full opacity-10">
        <svg
          viewBox="0 0 900 280"
          className="w-full h-auto text-zinc-400"
          fill="none"
          stroke="currentColor"
        >
          {/* Front Wing Assembly */}
          <path d="M 50 140 Q 80 120 140 125 T 220 135" strokeWidth="1.5" />
          <path d="M 50 150 Q 80 170 140 165 T 220 155" strokeWidth="1.5" />
          <line x1="45" y1="110" x2="45" y2="180" strokeWidth="2" stroke="rgba(225, 6, 0, 0.8)" />

          {/* Nosecone & Cockpit Cell */}
          <path
            d="M 50 145 C 160 140 240 130 350 115 C 440 105 480 95 530 110 C 580 125 640 130 750 130 L 840 130"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M 50 145 C 160 150 240 160 350 175 C 440 185 480 195 530 180 C 580 165 640 160 750 160 L 840 160"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* Halo Titanium Structure */}
          <path d="M 430 145 C 440 120 480 120 490 145" strokeWidth="2" stroke="rgba(255, 255, 255, 0.6)" />

          {/* Sidepods & Venturi Tunnels */}
          <rect x="360" y="70" width="140" height="40" rx="10" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="360" y="180" width="140" height="40" rx="10" strokeWidth="1" strokeOpacity="0.4" />

          {/* Wheels (Front & Rear) */}
          <rect x="180" y="50" width="80" height="35" rx="6" strokeWidth="1.5" stroke="rgba(225, 6, 0, 0.6)" />
          <rect x="180" y="205" width="80" height="35" rx="6" strokeWidth="1.5" stroke="rgba(225, 6, 0, 0.6)" />
          <rect x="680" y="45" width="95" height="42" rx="6" strokeWidth="1.5" stroke="rgba(225, 6, 0, 0.6)" />
          <rect x="680" y="203" width="95" height="42" rx="6" strokeWidth="1.5" stroke="rgba(225, 6, 0, 0.6)" />

          {/* Rear Wing Endplates & Beam Wing */}
          <line x1="820" y1="85" x2="820" y2="205" strokeWidth="2" stroke="rgba(225, 6, 0, 0.9)" />
          <line x1="840" y1="95" x2="840" y2="195" strokeWidth="1.5" stroke="white" />

          {/* Active Sensor Nodes (Pulsing telemetry points) */}
          <circle cx="220" cy="67" r="4" fill="#E10600" className="animate-ping" />
          <circle cx="727" cy="66" r="4" fill="#00E5FF" className="animate-ping" />
          <circle cx="460" cy="145" r="4" fill="#10B981" className="animate-pulse" />
        </svg>
      </div>

      {/* 6. Sweeping Laser Telemetry Scanner Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent animate-laser-scan blur-[1px]" />

      {/* 7. Subtle Floating Telemetry Sensor Reads */}
      <div className="hidden lg:block absolute left-8 top-36 font-mono text-[10px] text-zinc-600/70 space-y-2 opacity-50">
        <div>SYS // CFD.AERO.01: <span className="text-zinc-500">ACTIVE</span></div>
        <div>DOWNFORCE: <span className="text-zinc-400">1,620 KG @ 250 KM/H</span></div>
        <div>MGU-K DEPLOY: <span className="text-emerald-500/80">120 KW [SOC 92%]</span></div>
      </div>

      <div className="hidden lg:block absolute right-8 bottom-28 font-mono text-[10px] text-zinc-600/70 space-y-2 text-right opacity-50">
        <div>TYRE TELEMETRY // S1: <span className="text-amber-500/80">OPTIMAL 102°C</span></div>
        <div>VENTURI DELTA P: <span className="text-zinc-400">-3.84 KPA</span></div>
        <div>BRAKE BIAS: <span className="text-zinc-400">54.5% FWD</span></div>
      </div>
    </div>
  );
};

