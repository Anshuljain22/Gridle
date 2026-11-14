"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

/**
 * React-Bits: Shiny Text
 * Shimmering titanium and metallic gold reflection across typography.
 */
export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-[length:250%_100%]",
        !disabled && "animate-shimmer",
        className
      )}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
};
