"use client";

import React, { useState, useEffect } from "react";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { Icon3D } from "../icons3d/Icon3D";
import { sound } from "@/lib/sound";
import { Check, Palette } from "lucide-react";

export interface TeamTheme {
  id: string;
  name: string;
  primary: string;
  accent: string;
  textColor: string;
  borderClass: string;
}

export const TEAM_THEMES: TeamTheme[] = [
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    primary: "#E10600",
    accent: "#FFD700",
    textColor: "text-red-500",
    borderClass: "border-red-500",
  },
  {
    id: "mclaren",
    name: "McLaren Papaya",
    primary: "#FF8000",
    accent: "#00D2BE",
    textColor: "text-orange-500",
    borderClass: "border-orange-500",
  },
  {
    id: "mercedes",
    name: "Mercedes AMG",
    primary: "#00D2BE",
    accent: "#E5E7EB",
    textColor: "text-teal-400",
    borderClass: "border-teal-400",
  },
  {
    id: "redbull",
    name: "Red Bull Racing",
    primary: "#2563EB",
    accent: "#FBBF24",
    textColor: "text-blue-500",
    borderClass: "border-blue-500",
  },
  {
    id: "astonmartin",
    name: "Aston Martin",
    primary: "#00A389",
    accent: "#CEDC00",
    textColor: "text-emerald-500",
    borderClass: "border-emerald-500",
  },
  {
    id: "williams",
    name: "Williams Racing",
    primary: "#0284C7",
    accent: "#00A0DE",
    textColor: "text-sky-500",
    borderClass: "border-sky-500",
  },
];

interface TeamThemeSelectorProps {
  currentThemeId: string;
  onSelectTheme: (theme: TeamTheme) => void;
}

export const TeamThemeSelector: React.FC<TeamThemeSelectorProps> = ({
  currentThemeId,
  onSelectTheme,
}) => {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
      <div className="flex items-center gap-1 px-2 text-[10px] font-mono text-zinc-400 uppercase font-bold hidden sm:flex">
        <Palette className="w-3.5 h-3.5 text-zinc-400" />
        <span>LIVERY:</span>
      </div>

      <div className="flex items-center gap-1.5">
        {TEAM_THEMES.map((theme) => {
          const isSelected = currentThemeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => {
                onSelectTheme(theme);
                sound.playLightBeep(700);
              }}
              title={theme.name}
              className={`w-6 h-6 rounded-full transition-all flex items-center justify-center border-2 ${
                isSelected
                  ? "scale-110 border-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              style={{ backgroundColor: theme.primary }}
            >
              {isSelected && <Check className="w-3 h-3 text-white drop-shadow" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
