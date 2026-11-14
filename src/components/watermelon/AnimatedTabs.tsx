"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

interface AnimatedTabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onTabChange: (id: T) => void;
  className?: string;
  tabClassName?: string;
  layoutId?: string;
}

/**
 * Watermelon UI Animated Tabs
 * Features fluid spring-physics sliding active indicator pill powered by Motion Dev (motion/react).
 */
export function AnimatedTabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className,
  tabClassName,
  layoutId = "watermelon-active-tab",
}: AnimatedTabsProps<T>) {
  return (
    <div
      className={cn(
        "relative flex items-center p-1 rounded-2xl f1-glass",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-colors select-none",
              isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200",
              tabClassName
            )}
          >
            {/* Sliding Pill Indicator (Motion Dev layoutId) */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-red-600 to-red-700 shadow-md shadow-red-950/60"
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 32,
                }}
              />
            )}

            {tab.icon && (
              <span className={cn("shrink-0", isActive ? "text-white" : "text-zinc-400")}>
                {tab.icon}
              </span>
            )}
            <span className="tracking-tight">{tab.label}</span>
            {tab.badge && <span className="ml-1">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

