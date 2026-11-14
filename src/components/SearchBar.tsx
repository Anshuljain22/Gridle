"use client";

import React, { useState, useRef, useEffect } from "react";
import { Category, Driver, Team, Track } from "@/types";
import { searchEntities, getEntitiesByCategory } from "@/data";
import { getFlag } from "@/data/continents";
import { Search, ChevronRight, X, AlertCircle } from "lucide-react";
import { sound } from "@/lib/sound";

interface SearchBarProps {
  category: Category;
  guessedIds: string[];
  disabled: boolean;
  onSelectGuess: (entity: Driver | Team | Track) => void;
  remainingGuesses: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  category,
  guessedIds,
  disabled,
  onSelectGuess,
  remainingGuesses,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Available options matching query
  const matches = query.trim()
    ? searchEntities(category, query)
    : [];

  // Filter out already guessed
  const availableMatches = matches.filter(
    (item) => !guessedIds.includes(item.id.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (availableMatches.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % availableMatches.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (availableMatches.length > 0) {
        setSelectedIndex((prev) =>
          prev === 0 ? availableMatches.length - 1 : prev - 1
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (availableMatches.length > 0 && availableMatches[selectedIndex]) {
        submitItem(availableMatches[selectedIndex]);
      } else if (query.trim()) {
        const exact = getEntitiesByCategory(category).find(
          (x) =>
            x.name.toLowerCase() === query.trim().toLowerCase() ||
            (x.aliases &&
              x.aliases.some(
                (a) => a.toLowerCase() === query.trim().toLowerCase()
              ))
        );
        if (exact) {
          if (guessedIds.includes(exact.id.toLowerCase())) {
            showError("Already guessed on this Grand Prix!");
          } else {
            submitItem(exact);
          }
        } else {
          showError(`Select a valid registered ${category} from the list`);
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const submitItem = (item: Driver | Team | Track) => {
    if (disabled) return;
    if (guessedIds.includes(item.id.toLowerCase())) {
      showError("Already guessed on this Grand Prix!");
      return;
    }

    sound.playLightBeep(520);
    onSelectGuess(item);
    setQuery("");
    setIsOpen(false);
    setErrorMsg(null);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    sound.playWrong();
    setTimeout(() => {
      setErrorMsg(null);
    }, 2500);
  };

  const placeholderText =
    category === "driver"
      ? `Search driver name or number (${remainingGuesses} attempts left)...`
      : category === "team"
      ? `Search constructor name (${remainingGuesses} attempts left)...`
      : `Search circuit name or country (${remainingGuesses} attempts left)...`;

  // Quick Chips for fast discovery
  const sampleSuggestions =
    category === "driver"
      ? ["Hamilton", "Verstappen", "Senna", "Schumacher", "Alonso", "Leclerc", "Norris"]
      : category === "team"
      ? ["Ferrari", "McLaren", "Mercedes", "Red Bull", "Williams", "Lotus", "Brawn GP"]
      : ["Monaco", "Spa", "Silverstone", "Monza", "Suzuka", "Interlagos", "Austin"];

  return (
    <div className="w-full relative z-30">
      {/* Sleek Command Console Input */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl relative">
        {/* Search Input Box */}
        <div className="relative">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
              <Search className="w-4 h-4 text-zinc-400" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              disabled={disabled}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setErrorMsg(null);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
              className={`w-full bg-black/70 text-white placeholder-zinc-500 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-24 py-2.5 sm:py-3 border transition-all outline-none ${
                disabled
                  ? "opacity-50 cursor-not-allowed border-white/5"
                  : errorMsg
                  ? "border-red-500 ring-2 ring-red-500/30"
                  : "border-white/15 focus:border-[var(--team-primary)] focus:ring-2 focus:ring-[var(--team-glow)]"
              }`}
            />

            {/* Right Action / Submit */}
            <div className="absolute right-1.5 sm:right-2 flex items-center gap-1.5">
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                disabled={disabled || (!availableMatches.length && !query)}
                onClick={() => {
                  if (availableMatches.length > 0) {
                    submitItem(availableMatches[selectedIndex]);
                  }
                }}
                className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-mono text-xs font-bold shadow-md transition-all disabled:opacity-40 hover:brightness-110 active:scale-95"
                style={{
                  background: "var(--team-gradient)",
                  boxShadow: "0 2px 10px var(--team-glow)",
                }}
              >
                <span>SUBMIT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Paddock Filter Chips */}
          {!disabled && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1.5 text-xs font-mono text-zinc-400 no-scrollbar">
              <span className="text-zinc-500 text-[9px] uppercase shrink-0 font-bold">
                QUICK PICKS:
              </span>
              {sampleSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 hover:text-white border border-white/10 text-[10px] shrink-0 transition-all hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Validation / Error Banner */}
          {errorMsg && (
            <div className="absolute -bottom-6 left-3 flex items-center gap-1.5 text-xs font-mono text-red-400 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Autocomplete Dropdown */}
          {isOpen && query.trim().length > 0 && (
            <div
              ref={listRef}
              className="absolute left-0 right-0 mt-2 max-h-72 overflow-y-auto rounded-2xl f1-glass-modal divide-y divide-white/5 z-50 shadow-2xl"
            >
            {availableMatches.length > 0 ? (
              availableMatches.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const flag =
                  category === "driver"
                    ? getFlag((item as Driver).nationality)
                    : getFlag(
                        category === "team"
                          ? (item as Team).country
                          : (item as Track).country
                      );

                let subline = "";
                if (category === "driver") {
                  const d = item as Driver;
                  subline = `${d.nationality} • Debut: ${d.debutYear} • ${
                    d.championships > 0
                      ? `${d.championships}x World Champion`
                      : `${d.wins} wins`
                  }`;
                } else if (category === "team") {
                  const t = item as Team;
                  subline = `${t.country} • Debut: ${t.debutYear} • ${
                    t.championships > 0
                      ? `${t.championships}x Constructors' Titles`
                      : `${t.wins} wins`
                  }`;
                } else {
                  const tr = item as Track;
                  subline = `${tr.country} • ${tr.lengthKm} km • ${tr.circuitType}`;
                }

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => submitItem(item)}
                    className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                      isSelected
                        ? "text-white"
                        : "text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: "var(--team-bg-tint)",
                            borderLeft: "3px solid var(--team-primary)",
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{flag}</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-wide text-white">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {subline}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {category === "driver" && (item as Driver).carNumber && (
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                          #{(item as Driver).carNumber}
                        </span>
                      )}
                      {category === "team" && (
                        <span
                          className="w-3 h-3 rounded-full border border-black"
                          style={{
                            backgroundColor: (item as Team).colorHex || "#e10600",
                          }}
                        />
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected
                            ? "text-red-500 translate-x-0.5"
                            : "text-zinc-600"
                        }`}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs font-mono text-zinc-500">
                No matching registered {category} found. Check spelling or try a surname.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);
};
