import React from "react";

interface StartLightsProps {
  attemptsUsed: number;
  maxAttempts?: number;
  isWon?: boolean;
  isGameOver?: boolean;
}

export const StartLights: React.FC<StartLightsProps> = ({
  attemptsUsed,
  maxAttempts = 7,
  isWon = false,
  isGameOver = false,
}) => {
  const remaining = Math.max(0, maxAttempts - attemptsUsed);

  // Scaled 5 lights for the 5-light FIA starting gantry
  const activeLights = Math.min(5, Math.ceil((attemptsUsed / maxAttempts) * 5));

  return (
    <div className="flex flex-col items-center my-3">
      {/* Starting Gantry Frame with Frosted Glassmorphism */}
      <div className="bg-[#080b12]/65 backdrop-blur-2xl p-2.5 px-4 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-between gap-3 sm:gap-6 w-full max-w-md">
        {/* Left: Gantry Light Columns */}
        <div className="flex items-center gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((lightIdx) => {
            const isRedLit = !isWon && activeLights >= lightIdx;
            const isGreenLit = isWon;

            return (
              <div
                key={lightIdx}
                className="flex flex-col items-center gap-1 bg-black/60 p-1.5 rounded-lg border border-white/10"
              >
                {/* Upper LED Lamp */}
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    isGreenLit
                      ? "bg-emerald-500 start-light-green"
                      : isRedLit
                      ? "bg-red-600 start-light-on"
                      : "bg-zinc-900 border border-zinc-800"
                  }`}
                />
                {/* Lower LED Lamp (authentic dual-lens F1 start tower) */}
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    isGreenLit
                      ? "bg-emerald-500 start-light-green"
                      : isRedLit
                      ? "bg-red-600 start-light-on"
                      : "bg-zinc-900 border border-zinc-800"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Right: Telemetry Counter with Tabular Numerals */}
        <div className="flex items-center gap-2 pl-3 border-l border-zinc-800">
          <span className="text-xs text-zinc-400 font-medium">Attempts</span>
          <span
            className={`font-mono text-sm font-bold tabular-nums px-2.5 py-0.5 rounded-lg border ${
              isWon
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-800/80"
                : isGameOver
                ? "bg-zinc-900 text-zinc-500 border-zinc-800"
                : remaining <= 2
                ? "bg-red-950/80 text-red-300 border-red-800/80 animate-pulse"
                : "bg-zinc-900 text-zinc-200 border-zinc-800"
            }`}
          >
            {isWon ? "P1 🏆" : isGameOver ? "DNF ⚠️" : `${attemptsUsed}/${maxAttempts}`}
          </span>
        </div>
      </div>
    </div>
  );
};
