import { UserStats, Category, Difficulty, RoundSession } from "@/types";
import { getUtcDateString } from "./daily";

const STATS_KEY = "f1wordle_user_stats_v1";
const DAILY_SESSIONS_KEY = "f1wordle_daily_sessions_v1";
const SOUND_KEY = "f1wordle_sound_enabled_v1";

export const DEFAULT_STATS: UserStats = {
  totalGames: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  },
  byCategory: {
    driver: { played: 0, won: 0 },
    team: { played: 0, won: 0 },
    track: { played: 0, won: 0 },
  },
  byDifficulty: {
    easy: { played: 0, won: 0 },
    medium: { played: 0, won: 0 },
    hard: { played: 0, won: 0 },
  },
};

export function loadUserStats(): UserStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATS, ...parsed };
  } catch (e) {
    console.error("Failed to parse user stats", e);
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error("Failed to save user stats", e);
  }
}

export function recordGameResult(
  category: Category,
  difficulty: Difficulty,
  isDaily: boolean,
  isWon: boolean,
  guessesCount: number
): UserStats {
  const currentStats = loadUserStats();
  const today = getUtcDateString();

  const newStats: UserStats = {
    ...currentStats,
    totalGames: currentStats.totalGames + 1,
    wins: isWon ? currentStats.wins + 1 : currentStats.wins,
    byCategory: {
      ...currentStats.byCategory,
      [category]: {
        played: currentStats.byCategory[category].played + 1,
        won: isWon ? currentStats.byCategory[category].won + 1 : currentStats.byCategory[category].won,
      },
    },
    byDifficulty: {
      ...currentStats.byDifficulty,
      [difficulty]: {
        played: currentStats.byDifficulty[difficulty].played + 1,
        won: isWon ? currentStats.byDifficulty[difficulty].won + 1 : currentStats.byDifficulty[difficulty].won,
      },
    },
  };

  // Update guess distribution if won
  if (isWon && guessesCount >= 1 && guessesCount <= 7) {
    newStats.guessDistribution = {
      ...newStats.guessDistribution,
      [guessesCount]: (newStats.guessDistribution[guessesCount as keyof typeof newStats.guessDistribution] || 0) + 1,
    };
  }

  // Update streaks for daily plays
  if (isDaily) {
    if (isWon) {
      // Check if streak was continued
      if (currentStats.lastPlayedDate) {
        const last = new Date(`${currentStats.lastPlayedDate}T00:00:00Z`);
        const curr = new Date(`${today}T00:00:00Z`);
        const dayDiff = Math.floor((curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

        if (dayDiff === 1) {
          newStats.currentStreak = currentStats.currentStreak + 1;
        } else if (dayDiff === 0) {
          // Same day play in another category
          newStats.currentStreak = currentStats.currentStreak;
        } else {
          // Missed a day
          newStats.currentStreak = 1;
        }
      } else {
        newStats.currentStreak = 1;
      }
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
    } else {
      newStats.currentStreak = 0;
    }
    newStats.lastPlayedDate = today;
  }

  saveUserStats(newStats);
  return newStats;
}

export function loadDailySession(category: Category, dateStr: string = getUtcDateString()): Partial<RoundSession> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${DAILY_SESSIONS_KEY}_${dateStr}_${category}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDailySession(category: Category, session: Partial<RoundSession>, dateStr: string = getUtcDateString()): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${DAILY_SESSIONS_KEY}_${dateStr}_${category}`, JSON.stringify(session));
  } catch (e) {
    console.error("Failed to save daily session", e);
  }
}

export function getSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(SOUND_KEY);
  return raw !== null ? raw === "true" : true;
}

export function setSoundEnabled(val: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SOUND_KEY, val.toString());
}

const THEME_KEY = "f1wordle_team_theme_v1";

export function loadSavedThemeId(): string {
  if (typeof window === "undefined") return "ferrari";
  try {
    return localStorage.getItem(THEME_KEY) || "ferrari";
  } catch {
    return "ferrari";
  }
}

export function saveThemeId(themeId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_KEY, themeId);
  } catch (e) {
    console.error("Failed to save theme id", e);
  }
}

