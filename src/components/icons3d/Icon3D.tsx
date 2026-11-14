"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type Icon3DType =
  | "trophy"
  | "helmet"
  | "tyre-soft"
  | "tyre-medium"
  | "tyre-hard"
  | "flag"
  | "stopwatch"
  | "radio"
  | "car";

interface Icon3DProps {
  name: Icon3DType;
  size?: number;
  className?: string;
}

/**
 * 3dicons: Open-Source Motorsport 3D Icon Set
 * Isometric 3D-shaded vectors with specular highlights and ambient drop shadows.
 */
export const Icon3D: React.FC<Icon3DProps> = ({
  name,
  size = 40,
  className,
}) => {
  return (
    <div
      className={cn("inline-flex items-center justify-center shrink-0 drop-shadow-md select-none", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {name === "trophy" && (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="t-gold-1" x1="12" y1="8" x2="52" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE066" />
              <stop offset="0.4" stopColor="#F59E0B" />
              <stop offset="0.8" stopColor="#B45309" />
              <stop offset="1" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="t-gold-shine" x1="20" y1="12" x2="36" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFBEB" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FDE68A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="t-base" x1="18" y1="46" x2="46" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#27272A" />
              <stop offset="1" stopColor="#09090B" />
            </linearGradient>
          </defs>
          {/* Handles */}
          <path
            d="M16 16C9 16 7 24 10 30C13 36 18 36 20 36M48 16C55 16 57 24 54 30C51 36 46 36 44 36"
            stroke="url(#t-gold-1)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Main Cup Body */}
          <path
            d="M18 10H46V24C46 32 38 40 32 40C26 40 18 32 18 24V10Z"
            fill="url(#t-gold-1)"
          />
          {/* Cup Specular Highlight */}
          <path
            d="M22 13C22 13 25 24 30 28C27 26 25 18 25 14L22 13Z"
            fill="url(#t-gold-shine)"
          />
          {/* Stem */}
          <rect x="29" y="40" width="6" height="8" rx="1" fill="url(#t-gold-1)" />
          {/* Pedestal Base */}
          <path d="M22 48H42L45 58H19L22 48Z" fill="url(#t-base)" />
          <rect x="18" y="57" width="28" height="3" rx="1.5" fill="#3F3F46" />
          {/* Gold Plaque on base */}
          <rect x="25" y="51" width="14" height="4" rx="1" fill="#F59E0B" />
        </svg>
      )}

      {name === "helmet" && (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="h-shell" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E10600" />
              <stop offset="0.6" stopColor="#B91C1C" />
              <stop offset="1" stopColor="#450A0A" />
            </linearGradient>
            <linearGradient id="h-visor" x1="16" y1="26" x2="48" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#0284C7" />
              <stop offset="1" stopColor="#082F49" />
            </linearGradient>
          </defs>
          {/* Helmet Outer Shell */}
          <path
            d="M14 36C14 22 22 14 34 14C46 14 52 20 52 34C52 44 46 50 36 50H26C18 50 14 44 14 36Z"
            fill="url(#h-shell)"
          />
          {/* Chin Guard */}
          <path d="M14 38L32 46H44L48 40L38 38H14Z" fill="#18181B" opacity="0.6" />
          {/* Aero Visor */}
          <path
            d="M18 26C18 26 28 24 42 28C46 29 48 34 46 38L38 39C26 39 18 36 18 36V26Z"
            fill="url(#h-visor)"
          />
          {/* Visor Glare Strip */}
          <path d="M22 28L36 30L34 32L21 30Z" fill="white" opacity="0.7" />
          {/* Hans Device Tether Point */}
          <circle cx="20" cy="42" r="2.5" fill="#A1A1AA" />
        </svg>
      )}

      {(name === "tyre-soft" || name === "tyre-medium" || name === "tyre-hard") && (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <defs>
            <radialGradient id="tyre-body" cx="32" cy="32" r="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3F3F46" />
              <stop offset="0.7" stopColor="#18181B" />
              <stop offset="1" stopColor="#09090B" />
            </radialGradient>
          </defs>
          {/* Outer Slick Tyre Tread */}
          <circle cx="32" cy="32" r="26" fill="url(#tyre-body)" />
          {/* Compound Colored Stripe */}
          <circle
            cx="32"
            cy="32"
            r="21"
            stroke={
              name === "tyre-soft"
                ? "#EF4444"
                : name === "tyre-medium"
                ? "#F59E0B"
                : "#F4F4F5"
            }
            strokeWidth="3.5"
            strokeDasharray="16 4"
          />
          {/* Center Wheel Rim */}
          <circle cx="32" cy="32" r="14" fill="#09090B" stroke="#52525B" strokeWidth="1.5" />
          {/* 5-Nut Pattern */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle
              key={deg}
              cx={32 + 7 * Math.cos((deg * Math.PI) / 180)}
              cy={32 + 7 * Math.sin((deg * Math.PI) / 180)}
              r="1.5"
              fill="#D4D4D8"
            />
          ))}
          {/* Red Anodized Center Nut */}
          <circle cx="32" cy="32" r="3.5" fill="#DC2626" />
        </svg>
      )}

      {name === "stopwatch" && (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="sw-body" x1="14" y1="18" x2="50" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#71717A" />
              <stop offset="0.5" stopColor="#27272A" />
              <stop offset="1" stopColor="#09090B" />
            </linearGradient>
            <radialGradient id="sw-dial" cx="32" cy="35" r="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#18181B" />
              <stop offset="1" stopColor="#000000" />
            </radialGradient>
          </defs>
          {/* Top Pusher Button */}
          <rect x="29" y="8" width="6" height="5" rx="1.5" fill="#EF4444" />
          <rect x="27" y="12" width="10" height="3" rx="1" fill="#71717A" />
          {/* Outer Case */}
          <circle cx="32" cy="36" r="22" fill="url(#sw-body)" stroke="#52525B" strokeWidth="1.5" />
          {/* Inner Dial Face */}
          <circle cx="32" cy="36" r="17" fill="url(#sw-dial)" />
          {/* Dial Markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1={32 + 14 * Math.cos((deg * Math.PI) / 180)}
              y1={36 + 14 * Math.sin((deg * Math.PI) / 180)}
              x2={32 + 16 * Math.cos((deg * Math.PI) / 180)}
              y2={36 + 16 * Math.sin((deg * Math.PI) / 180)}
              stroke={deg % 90 === 0 ? "#EF4444" : "#71717A"}
              strokeWidth={deg % 90 === 0 ? "1.5" : "1"}
            />
          ))}
          {/* Chrono Second Hand */}
          <line x1="32" y1="36" x2="41" y2="28" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="36" r="2.5" fill="#EF4444" />
        </svg>
      )}

      {name === "flag" && (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Flagpole */}
          <line x1="14" y1="10" x2="14" y2="54" stroke="#A1A1AA" strokeWidth="3" strokeLinecap="round" />
          <circle cx="14" cy="10" r="3" fill="#F59E0B" />
          {/* Chequered Flag waving */}
          <path
            d="M16 12C26 8 34 16 48 12V36C34 40 26 32 16 36V12Z"
            fill="#18181B"
            stroke="#27272A"
          />
          {/* Chequered Patches */}
          <path d="M16 12C21 10 24 13 28 13V21C24 21 21 18 16 20V12Z" fill="#FFFFFF" />
          <path d="M28 13C33 13 36 15 40 14V22C36 23 33 21 28 21V13Z" fill="#18181B" />
          <path d="M40 14C44 13 46 12 48 12V20C46 20 44 21 40 22V14Z" fill="#FFFFFF" />
          <path d="M16 20C21 18 24 21 28 21V29C24 29 21 26 16 28V20Z" fill="#18181B" />
          <path d="M28 21C33 21 36 23 40 22V30C36 31 33 29 28 29V21Z" fill="#FFFFFF" />
          <path d="M40 22C44 21 46 20 48 20V28C46 28 44 29 40 30V22Z" fill="#18181B" />
        </svg>
      )}

      {name === "radio" && (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Headband */}
          <path
            d="M16 34C16 20 23 14 32 14C41 14 48 20 48 34"
            stroke="#52525B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Earcup */}
          <rect x="12" y="30" width="8" height="16" rx="4" fill="#DC2626" />
          <rect x="18" y="32" width="3" height="12" rx="1.5" fill="#18181B" />
          {/* Right Earcup */}
          <rect x="44" y="30" width="8" height="16" rx="4" fill="#DC2626" />
          <rect x="43" y="32" width="3" height="12" rx="1.5" fill="#18181B" />
          {/* Microphone Boom */}
          <path
            d="M16 42C16 50 24 52 30 52H34"
            stroke="#71717A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="34" y="50" width="6" height="4" rx="2" fill="#18181B" stroke="#DC2626" strokeWidth="1" />
        </svg>
      )}

      {name === "car" && (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* F1 Ground Effect Racer Top/Iso Silhouette */}
          <defs>
            <linearGradient id="car-livery" x1="12" y1="32" x2="52" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E10600" />
              <stop offset="0.7" stopColor="#B91C1C" />
              <stop offset="1" stopColor="#18181B" />
            </linearGradient>
          </defs>
          {/* Rear Wing */}
          <rect x="10" y="24" width="4" height="16" rx="1" fill="#27272A" />
          {/* Rear Tyres */}
          <rect x="12" y="16" width="10" height="7" rx="2" fill="#18181B" stroke="#52525B" />
          <rect x="12" y="41" width="10" height="7" rx="2" fill="#18181B" stroke="#52525B" />
          {/* Chassis Body */}
          <path
            d="M14 27H26L34 29L48 30L56 32L48 34L34 35L26 37H14V27Z"
            fill="url(#car-livery)"
          />
          {/* Halo Safety Cockpit */}
          <circle cx="34" cy="32" r="3" fill="#09090B" stroke="#71717A" strokeWidth="1" />
          {/* Front Tyres */}
          <rect x="42" y="18" width="9" height="6" rx="2" fill="#18181B" stroke="#52525B" />
          <rect x="42" y="40" width="9" height="6" rx="2" fill="#18181B" stroke="#52525B" />
          {/* Front Wing */}
          <path d="M52 24L58 28V36L52 40V24Z" fill="#27272A" />
        </svg>
      )}
    </div>
  );
};
