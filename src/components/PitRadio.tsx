"use client";

import React, { useState } from "react";
import { Category, Driver, Team, Track } from "@/types";
import { Volume2 } from "lucide-react";
import { sound } from "@/lib/sound";
import { Icon3D } from "./icons3d/Icon3D";
import { DecryptedText } from "./reactbits/DecryptedText";

interface PitRadioProps {
  category: Category;
  targetEntity: Driver | Team | Track | null;
  attemptsCount: number;
}

export const PitRadio: React.FC<PitRadioProps> = ({
  category,
  targetEntity,
  attemptsCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [radioMsg, setRadioMsg] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const requestRadioClue = () => {
    if (!targetEntity) return;

    sound.playRadioStatic();
    setIsBroadcasting(true);
    setIsOpen(true);

    // Formulate a smart AI Race Engineer message based on the entity
    setTimeout(() => {
      let clue = "";
      if (category === "driver") {
        const d = targetEntity as Driver;
        if (attemptsCount === 0) {
          clue = `Engineer: "Radio check, driver. Target made their Grand Prix debut in ${d.debutYear}. Focus on the sector marks."`;
        } else if (d.championships > 0) {
          clue = `Engineer: "Copy that. We are hunting a World Drivers' Champion (${d.championships}x titles). Keep the tyres in the window."`;
        } else if (d.wins > 0) {
          clue = `Engineer: "Box confirm. This pilot knows what victory champagne tastes like (${d.wins} Grand Prix wins). Bring it home."`;
        } else {
          clue = `Engineer: "Understood. The target drove for ${d.teamsCount} different teams, known for tenacious midfield racing."`;
        }
      } else if (category === "team") {
        const t = targetEntity as Team;
        if (t.active) {
          clue = `Engineer: "Pit wall update: The target constructor is active on the current 2024 grid (${t.seasonsCompeted} seasons on record)."`;
        } else {
          clue = `Engineer: "Historic telemetry alert: This is a classic / defunct constructor. Debut year was ${t.debutYear}."`;
        }
      } else {
        const tr = targetEntity as Track;
        clue = `Engineer: "Track condition steady. Target circuit has ${tr.corners} turns and runs in a ${tr.direction.toLowerCase()} direction."`;
      }

      setRadioMsg(clue);
      setIsBroadcasting(false);
      sound.playHintUnlock();
    }, 500);
  };

  return (
    <div className="w-full mb-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2.5 rounded-2xl f1-glass">
        {/* Left: Radio Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={requestRadioClue}
            disabled={isBroadcasting}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/80 text-zinc-200 hover:text-white font-mono text-xs font-bold transition-all shadow-sm active:scale-95 group shrink-0 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-red-600 group-hover:animate-ping" />
            <Icon3D name="radio" size={18} />
            <span>PIT WALL RADIO</span>
          </button>

          {isBroadcasting && (
            <div className="flex items-end gap-1 h-4 px-1">
              <span className="w-1 bg-red-500 animate-radio-wave-1 rounded-full" />
              <span className="w-1 bg-red-500 animate-radio-wave-2 rounded-full" />
              <span className="w-1 bg-red-500 animate-radio-wave-3 rounded-full" />
            </div>
          )}
        </div>

        {/* Radio Broadcast Box */}
        {radioMsg && isOpen ? (
          <div className="flex-1 flex items-center justify-between gap-2 px-3 py-1 rounded-xl bg-black/70 border border-red-900/50 text-xs font-mono text-red-300 animate-fadeIn">
            <div className="flex items-center gap-2 truncate">
              <Volume2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <div className="truncate italic">
                <DecryptedText text={radioMsg} speed={25} maxIterations={6} />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold ml-2 uppercase shrink-0"
            >
              DISMISS
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-zinc-500 hidden md:inline pr-2">
            Call race engineer for tactical telemetry radio transmission
          </span>
        )}
      </div>
    </div>
  );
};
