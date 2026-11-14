"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DriverAvatarProps {
  name: string;
  teamColor?: string;
  size?: number;
  className?: string;
}

/**
 * Open Peeps & unDraw-inspired F1 Paddock Character Portrait
 * Dynamic vector racing suit, aero helmet, and team livery accent.
 */
export const DriverAvatar: React.FC<DriverAvatarProps> = ({
  name,
  teamColor = "#E10600",
  size = 48,
  className,
}) => {
  // Generate consistent initials
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden f1-glass-subtle flex items-center justify-center select-none shrink-0 border border-white/10 shadow-inner",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id={`avatar-bg-${name}`} cx="40" cy="40" r="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#27272A" />
            <stop offset="1" stopColor="#09090B" />
          </radialGradient>
        </defs>
        {/* Background */}
        <rect width="80" height="80" fill={`url(#avatar-bg-${name})`} />

        {/* Racing Suit Shoulders */}
        <path
          d="M 10 80 C 15 58 30 52 40 52 C 50 52 65 58 70 80 Z"
          fill="#18181B"
          stroke="#3F3F46"
          strokeWidth="1.5"
        />
        {/* Team Livery Racing Stripes on Suit */}
        <path d="M 28 80 L 34 54 L 38 54 L 32 80 Z" fill={teamColor} />
        <path d="M 52 80 L 46 54 L 42 54 L 48 80 Z" fill={teamColor} />

        {/* Neck / Balaclava */}
        <rect x="34" y="44" width="12" height="12" rx="4" fill="#09090B" />

        {/* Aero Helmet Head */}
        <circle cx="40" cy="30" r="18" fill="#F4F4F5" />
        <path
          d="M 26 24 C 26 14 34 12 40 12 C 46 12 54 14 54 24 C 54 36 48 42 40 42 C 32 42 26 36 26 24 Z"
          fill="#18181B"
        />

        {/* Helmet Team Color Crest */}
        <path d="M 37 12 H 43 V 24 H 37 Z" fill={teamColor} />

        {/* Iridium Visor (Tinted with track reflection) */}
        <path
          d="M 28 24 C 28 24 34 22 40 22 C 46 22 52 24 52 24 C 52 30 46 32 40 32 C 34 32 28 30 28 24 Z"
          fill="url(#visor-gradient)"
        />
        <defs>
          <linearGradient id="visor-gradient" x1="28" y1="22" x2="52" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#EF4444" />
          </linearGradient>
        </defs>

        {/* Visor Specular Reflection */}
        <path d="M 30 24 L 38 25 L 36 27 L 29 25 Z" fill="white" opacity="0.6" />
      </svg>

      {/* Driver Initials Badge */}
      <span className="absolute bottom-1 right-1 text-[8px] font-mono font-black text-white/80 bg-black/70 px-1 rounded">
        {initials}
      </span>
    </div>
  );
};
