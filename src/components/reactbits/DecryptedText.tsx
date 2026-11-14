"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "mount";
}

/**
 * React-Bits: Decrypted Text (F1 Paddock Telemetry Cipher)
 * Unscrambles alphanumeric telemetry streams into clear tactical readouts.
 */
export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 12,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~-=",
  className,
  encryptedClassName = "text-red-500 font-mono",
  animateOn = "mount",
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / (maxIterations / text.length);
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "mount") {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" && !isHovered) {
      setIsHovered(true);
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === "hover") {
      setIsHovered(false);
    }
  };

  return (
    <span
      className={cn("inline-block font-mono tracking-tight", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};
