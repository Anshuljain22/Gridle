"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "red" | "emerald" | "amber" | "purple" | "cyan";
  active?: boolean;
}

const GLOW_MAP = {
  red: "from-red-600 via-rose-500 to-amber-500",
  emerald: "from-emerald-500 via-teal-400 to-cyan-500",
  amber: "from-amber-500 via-yellow-400 to-orange-500",
  purple: "from-purple-600 via-fuchsia-500 to-indigo-500",
  cyan: "from-cyan-500 via-sky-400 to-blue-600",
};

/**
 * Motion-Primitives: Glow Effect
 * Dynamic radiating luminescence wrapping around interactive modules.
 */
export const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  className,
  glowColor = "red",
  active = false,
}) => {
  return (
    <div className={cn("relative group", className)}>
      <motion.div
        className={cn(
          "absolute -inset-0.5 rounded-3xl bg-gradient-to-r opacity-30 blur-md transition-all duration-500 group-hover:opacity-80",
          GLOW_MAP[glowColor],
          active && "opacity-90 blur-lg animate-pulse"
        )}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
