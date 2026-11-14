import React from "react";

interface TrackSvgProps {
  trackId: string;
  className?: string;
}

// Stylized vector outlines for popular tracks
export const TRACK_PATHS: Record<string, string> = {
  monaco:
    "M 30,85 C 45,85 55,75 55,60 C 55,45 65,30 80,30 C 90,30 95,40 90,50 C 85,60 70,60 70,70 C 70,80 80,85 85,85 C 90,85 92,75 92,65 C 92,55 90,45 85,35 C 80,25 70,20 50,20 C 35,20 25,35 25,50 C 25,65 20,85 30,85 Z",
  silverstone:
    "M 25,50 L 40,30 L 60,35 L 75,25 L 85,35 L 75,55 L 85,75 L 70,80 L 50,70 L 35,80 L 20,65 Z",
  spa:
    "M 20,70 C 25,60 30,40 40,35 C 50,30 65,25 80,25 C 90,25 90,40 85,55 C 80,70 65,80 50,75 C 35,70 25,85 20,70 Z",
  monza:
    "M 20,30 L 70,30 C 85,30 90,45 85,55 L 45,55 C 35,55 35,70 45,70 L 80,70 C 85,70 90,85 75,85 L 25,85 C 15,85 15,30 20,30 Z",
  suzuka:
    "M 25,30 C 40,20 60,30 75,45 C 85,55 85,75 70,80 C 55,85 45,70 55,55 C 65,40 45,35 30,45 C 20,55 15,40 25,30 Z",
  interlagos:
    "M 22,70 C 22,48 38,28 58,28 C 74,28 82,42 78,54 C 74,68 90,72 96,58 C 102,42 92,26 72,22 C 48,16 22,34 20,58 C 18,78 28,90 48,90 C 68,90 78,78 70,68",
  cota:
    "M 18,72 L 32,40 L 52,48 L 62,28 L 86,34 L 80,58 L 92,78 L 70,88 L 48,74 L 28,86 Z",
  yasmarina:
    "M 18,62 C 18,40 40,24 68,28 C 90,32 96,52 82,62 C 70,70 78,86 58,88 C 36,90 22,78 18,62 Z",
  bahrain:
    "M 24,78 C 20,52 38,28 64,26 C 86,24 96,46 88,62 C 80,78 92,88 72,90 C 48,92 28,88 24,78 Z",
  marinabay:
    "M 20,70 L 34,42 C 46,28 70,30 82,46 L 90,70 C 84,86 58,90 40,84 C 28,80 18,78 20,70 Z",
  hungaroring:
    "M 28,74 C 22,50 40,30 64,32 C 84,34 90,54 78,66 C 66,78 82,86 62,90 C 42,94 32,86 28,74 Z",
};

export const TrackSvg: React.FC<TrackSvgProps> = ({ trackId, className = "w-32 h-32" }) => {
  const path = TRACK_PATHS[trackId.toLowerCase()] || TRACK_PATHS.monaco;

  return (
    <div className={`relative flex items-center justify-center p-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(225,6,0,0.6)]">
        <path
          d={path}
          fill="none"
          stroke="#E10600"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={path}
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
};

