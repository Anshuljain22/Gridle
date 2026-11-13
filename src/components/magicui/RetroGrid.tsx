"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

/**
 * Magic UI 3D Racetrack Perspective Grid
 */
export const RetroGrid: React.FC<RetroGridProps> = ({
  className,
  angle = 65,
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-30 [perspective:200px]",
        className
      )}
    >
      {/* Grid Plane */}
      <div className="absolute inset-0 [transform-origin:top]">
        <div
          style={{ transform: `rotateX(${angle}deg)` }}
          className={cn(
            "animate-grid-scroll",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_0)]"
          )}
        />
      </div>

      {/* Atmospheric Horizon Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]" />
    </div>
  );
};

