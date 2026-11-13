import { DailyChallengeEntry } from "@/types";
import { DRIVERS } from "@/data/drivers";
import { TEAMS } from "@/data/teams";
import { TRACKS } from "@/data/tracks";

// Base anchor date for daily numbering (F1 Wordle launch epoch)
const EPOCH_DATE = new Date("2024-01-01T00:00:00Z");

export function getUtcDateString(d: Date = new Date()): string {
  return d.toISOString().split("T")[0];
}

export function getDailyChallengeNumber(dateStr: string = getUtcDateString()): number {
  const target = new Date(`${dateStr}T00:00:00Z`);
  const diffTime = Math.abs(target.getTime() - EPOCH_DATE.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

// Simple deterministic hash generator
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDailyChallenge(dateStr: string = getUtcDateString()): DailyChallengeEntry {
  // Deterministic seeds for each category using salt
  const driverHash = hashString(`driver-${dateStr}-v1`);
  const teamHash = hashString(`team-${dateStr}-v1`);
  const trackHash = hashString(`track-${dateStr}-v1`);

  const driverIndex = driverHash % DRIVERS.length;
  const teamIndex = teamHash % TEAMS.length;
  const trackIndex = trackHash % TRACKS.length;

  return {
    date: dateStr,
    driverId: DRIVERS[driverIndex].id,
    teamId: TEAMS[teamIndex].id,
    trackId: TRACKS[trackIndex].id,
  };
}

export function getSecondsUntilUtcMidnight(): number {
  const now = new Date();
  const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return Math.max(0, Math.floor((nextMidnight.getTime() - now.getTime()) / 1000));
}

export function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

