export type Category = "driver" | "team" | "track";
export type Difficulty = "easy" | "medium" | "hard";
export type GameMode = "daily" | "practice";

export interface EducationalInfo {
  overview: string;
  highlight1Title: string;
  highlight1Text: string;
  highlight2Title: string;
  highlight2Text: string;
  famousFact: string;
  quoteOrTrivia?: string;
}

export interface Driver {
  id: string;
  name: string;
  code?: string;
  carNumber?: number;
  aliases: string[];
  nationality: string;
  continent: string;
  countryCode: string;
  birthYear: number;
  debutYear: number;
  lastSeason: number | "Active";
  championships: number;
  championshipYears?: number[];
  wins: number;
  podiums: number;
  polePositions: number;
  teamsCount: number;
  teams: string[];
  iconicTeam: string;
  difficulty: Difficulty;
  educationalInfo: EducationalInfo;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  aliases: string[];
  country: string;
  continent: string;
  countryCode: string;
  debutYear: number;
  championships: number;
  championshipYears?: number[];
  wins: number;
  podiums: number;
  polePositions: number;
  seasonsCompeted: number;
  famousDrivers: string[];
  active: boolean;
  colorHex: string;
  difficulty: Difficulty;
  educationalInfo: EducationalInfo;
}

export interface Track {
  id: string;
  name: string;
  shortName: string;
  aliases: string[];
  country: string;
  continent: string;
  countryCode: string;
  lengthKm: number;
  corners: number;
  firstGPYea: number;
  circuitType: "Permanent" | "Street" | "Hybrid";
  direction: "Clockwise" | "Anticlockwise";
  raceLaps: number;
  lapRecord: string;
  famousCorner: string;
  difficulty: Difficulty;
  svgPath?: string;
  educationalInfo: EducationalInfo;
}

export type EntityItem = Driver | Team | Track;

export type MatchStatus = "exact" | "close" | "mismatch";
export type DirectionStatus = "higher" | "lower" | "match";

export interface ValueComparison<T> {
  status: MatchStatus;
  direction?: DirectionStatus;
  value: T;
  targetValue?: T;
  diff?: number;
  label?: string;
}

export interface DriverComparison {
  id: string;
  name: string;
  guessedItem: Driver;
  nationality: ValueComparison<string>;
  birthYear: ValueComparison<number>;
  debutYear: ValueComparison<number>;
  championships: ValueComparison<number>;
  wins: ValueComparison<number>;
  teamsCount: ValueComparison<number>;
  isCorrect: boolean;
}

export interface TeamComparison {
  id: string;
  name: string;
  guessedItem: Team;
  country: ValueComparison<string>;
  debutYear: ValueComparison<number>;
  championships: ValueComparison<number>;
  wins: ValueComparison<number>;
  podiums: ValueComparison<number>;
  seasonsCompeted: ValueComparison<number>;
  isCorrect: boolean;
}

export interface TrackComparison {
  id: string;
  name: string;
  guessedItem: Track;
  country: ValueComparison<string>;
  lengthKm: ValueComparison<number>;
  corners: ValueComparison<number>;
  firstGPYea: ValueComparison<number>;
  circuitType: ValueComparison<string>;
  direction: ValueComparison<string>;
  isCorrect: boolean;
}

export type ComparisonResult = DriverComparison | TeamComparison | TrackComparison;

export interface Hint {
  id: number;
  title: string;
  value: string;
  unlockedAtGuess: number; // 2, 3, 4, 5, 6, 7
  iconName?: string;
}

export type GameStatus = "in_progress" | "won" | "lost";

export interface RoundSession {
  category: Category;
  mode: GameMode;
  difficulty: Difficulty;
  mysteryId: string;
  guesses: string[]; // IDs
  comparisons: ComparisonResult[];
  hintsRevealed: number;
  maxGuesses: number;
  status: GameStatus;
  startedAt: string;
  completedAt?: string;
}

export interface UserStats {
  totalGames: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate?: string;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
  };
  byCategory: {
    driver: { played: number; won: number };
    team: { played: number; won: number };
    track: { played: number; won: number };
  };
  byDifficulty: {
    easy: { played: number; won: number };
    medium: { played: number; won: number };
    hard: { played: number; won: number };
  };
}

export interface DailyChallengeEntry {
  date: string;
  driverId: string;
  teamId: string;
  trackId: string;
}

