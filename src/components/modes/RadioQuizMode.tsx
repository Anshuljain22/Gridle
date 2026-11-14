"use client";

import React, { useState } from "react";
import { RADIO_QUOTES, RadioQuotePuzzle } from "@/data/radioQuotes";
import { DRIVERS } from "@/data/drivers";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { ShinyText } from "../reactbits/ShinyText";
import { DecryptedText } from "../reactbits/DecryptedText";
import { Icon3D } from "../icons3d/Icon3D";
import { DriverAvatar } from "../avatars/DriverAvatar";
import { MotionButton } from "../watermelon/MotionButton";
import { sound } from "@/lib/sound";
import { Play, Pause, Volume2, ArrowRight, XCircle, CheckCircle2, Radio, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export const RadioQuizMode: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [query, setQuery] = useState("");
  const [revealedClues, setRevealedClues] = useState<number>(0); // 0 = quote only, 1 = year & GP, 2 = team, 3 = answer
  const [isSolved, setIsSolved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuote = RADIO_QUOTES[quoteIndex];

  const matches = query.trim()
    ? DRIVERS.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5)
    : [];

  const toggleRadioPlay = () => {
    sound.playRadioStatic();
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2800);
  };

  const handleGuess = (driverName: string) => {
    if (isSolved || isFailed) return;

    if (driverName.toLowerCase() === currentQuote.driverName.toLowerCase()) {
      setIsSolved(true);
      setRevealedClues(3);
      setScore((s) => s + Math.max(50, 300 - revealedClues * 75));
      sound.playCorrect();
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#E10600", "#FFD700", "#10B981"],
        });
      } catch {}
    } else {
      sound.playWrong();
      if (revealedClues < 2) {
        setRevealedClues((c) => c + 1);
      } else {
        setIsFailed(true);
        setRevealedClues(3);
      }
    }
    setQuery("");
  };

  const unlockNextClue = () => {
    if (revealedClues < 2) {
      setRevealedClues((c) => c + 1);
      sound.playHintUnlock();
    }
  };

  const nextQuote = () => {
    const nextIdx = (quoteIndex + 1) % RADIO_QUOTES.length;
    setQuoteIndex(nextIdx);
    setRevealedClues(0);
    setIsSolved(false);
    setIsFailed(false);
    setQuery("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 select-none animate-fadeIn py-2">
      {/* Header */}
      <SpotlightCard spotlightColor="rgba(225, 6, 0, 0.2)" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon3D name="radio" size={38} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  PIT RADIO VAULT
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  TRANSMISSION {quoteIndex + 1}/{RADIO_QUOTES.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black italic tracking-wide text-white font-mono mt-0.5">
                <ShinyText text="GUESS THE TEAM RADIO" className="text-xl sm:text-2xl font-black italic" />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">SCORE</span>
              <span className="font-bold text-amber-400 text-sm">{score} PTS</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">CLUES UNLOCKED</span>
              <span className="font-bold text-white text-sm">{revealedClues}/2</span>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Radio Acoustic Transmission Console */}
      <div className="f1-glass rounded-3xl p-5 sm:p-8 relative overflow-hidden">
        {/* Transmission Status Badge */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              CH-7 INTERCOM FEED
            </span>
          </div>

          <span className="text-[11px] font-mono text-zinc-400 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {currentQuote.radioType} TRANSMISSION
          </span>
        </div>

        {/* Audio Message Visualizer Box */}
        <div className="p-6 rounded-2xl bg-black/70 border border-white/10 text-center space-y-4 shadow-inner relative overflow-hidden">
          {/* Carbon Fiber subtle grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,6,0,0.1),transparent_70%)] pointer-events-none" />

          {/* Animated Radio Waveform */}
          <div className="flex items-center justify-center gap-1.5 h-10">
            {[8, 14, 28, 18, 36, 24, 16, 32, 20, 10, 22, 34, 16, 26, 12].map((h, i) => (
              <span
                key={i}
                className="w-1.5 bg-red-500 rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.min(36, h * 1.2)}px` : "6px",
                  opacity: isPlaying ? 0.9 : 0.3,
                }}
              />
            ))}
          </div>

          {/* Quote Text (Decrypted Telemetry) */}
          <div className="text-lg sm:text-2xl font-mono font-black italic tracking-tight text-white max-w-xl mx-auto leading-relaxed">
            &ldquo;
            <DecryptedText text={currentQuote.censoredQuote} speed={25} />
            &rdquo;
          </div>

          {/* Audio Squelch Trigger Button */}
          <div className="pt-2 flex justify-center">
            <MotionButton
              onClick={toggleRadioPlay}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-xs font-mono"
            >
              <Volume2 className="w-3.5 h-3.5 text-red-500" />
              <span>{isPlaying ? "BROADCASTING RADIO AUDIO..." : "PLAY RADIO SQUELCH"}</span>
            </MotionButton>
          </div>
        </div>

        {/* Progressive Clue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {/* Clue 1: Year & Grand Prix */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">
              CLUE 1: GRAND PRIX EVENT
            </span>
            {revealedClues >= 1 ? (
              <span className="font-bold text-white text-sm">
                {currentQuote.grandPrix} ({currentQuote.year})
              </span>
            ) : (
              <span className="text-zinc-500 italic">Locked (reveals on incorrect guess or hint)</span>
            )}
          </div>

          {/* Clue 2: Constructor */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">
              CLUE 2: RACING CONSTRUCTOR
            </span>
            {revealedClues >= 2 ? (
              <span className="font-bold text-white text-sm">
                {currentQuote.team}
              </span>
            ) : (
              <span className="text-zinc-500 italic">Locked (reveals on 2nd incorrect guess)</span>
            )}
          </div>
        </div>

        {/* Input Bar or Solved Banner */}
        {!isSolved && !isFailed ? (
          <div className="mt-6 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Identify who said this quote (e.g. Kimi Räikkönen, Fernando Alonso)..."
                className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-red-500 text-white placeholder-zinc-500 font-mono text-sm outline-none backdrop-blur-md shadow-inner transition-colors"
              />

              {matches.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-white/15 rounded-2xl overflow-hidden z-20 backdrop-blur-xl shadow-xl">
                  {matches.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleGuess(m.name)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs font-mono text-zinc-200 hover:bg-red-600/30 hover:text-white transition-colors border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <DriverAvatar name={m.name} size={24} />
                        <span>{m.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{m.nationality}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={unlockNextClue}
                disabled={revealedClues >= 2}
                className="text-xs font-mono text-zinc-400 hover:text-white underline disabled:opacity-40 disabled:no-underline"
              >
                Need help? Unlock Next Clue (-75 pts)
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-5 rounded-2xl border ${
              isSolved
                ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-200"
                : "bg-red-950/40 border-red-500/60 text-red-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <DriverAvatar name={currentQuote.driverName} size={48} className="shrink-0" />
                <div>
                  <h3 className="text-xl font-black font-mono text-white">
                    <DecryptedText text={currentQuote.driverName} speed={30} />
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono block">
                    {currentQuote.team} • {currentQuote.grandPrix} ({currentQuote.year})
                  </span>
                  <p className="text-xs text-zinc-300 mt-1 max-w-lg leading-relaxed">
                    {currentQuote.context}
                  </p>
                </div>
              </div>

              <MotionButton
                onClick={nextQuote}
                variant="primary"
                className="shrink-0 flex items-center gap-2"
              >
                <span>NEXT RADIO</span>
                <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
