"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  shimmer?: boolean;
  children: React.ReactNode;
}

/**
 * Watermelon UI Interactive Button with Motion Dev Gestures & Shimmer
 */
export const MotionButton: React.FC<MotionButtonProps> = ({
  variant = "primary",
  size = "md",
  shimmer = false,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    primary:
      "text-white shadow-lg border hover:brightness-110",
    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 shadow-md border border-zinc-700/60",
    outline:
      "bg-black/60 hover:bg-zinc-900 text-zinc-200 border border-zinc-750 hover:border-zinc-600",
    danger:
      "bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/80",
    ghost:
      "bg-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-white",
  }[variant];

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2 text-xs rounded-xl gap-2",
    lg: "px-5 py-2.5 text-sm rounded-xl gap-2.5",
  }[size];

  const dynamicStyle =
    variant === "primary"
      ? {
          background: "var(--team-gradient)",
          borderColor: "var(--team-primary)",
          boxShadow: "0 4px 16px var(--team-glow)",
          ...props.style,
        }
      : props.style;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      style={dynamicStyle}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center font-mono font-bold select-none transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {/* Optional Watermelon UI Shimmer Gleam */}
      {shimmer && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            repeat: Infinity,
            repeatDelay: 3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </motion.button>
  );
};

