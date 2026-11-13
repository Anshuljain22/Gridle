import {
  Driver,
  Team,
  Track,
  Category,
  DriverComparison,
  TeamComparison,
  TrackComparison,
  MatchStatus,
  DirectionStatus,
  ValueComparison,
  ComparisonResult,
} from "@/types";
import { isSameRegion } from "@/data/continents";

function compareNumber(
  guessed: number,
  target: number,
  exactTolerance: number,
  closeTolerance: number
): { status: MatchStatus; direction: DirectionStatus; diff: number } {
  const diff = target - guessed;
  const absDiff = Math.abs(diff);

  let direction: DirectionStatus = "match";
  if (diff > 0) direction = "higher";
  else if (diff < 0) direction = "lower";

  let status: MatchStatus = "mismatch";
  if (absDiff <= exactTolerance) {
    status = "exact";
  } else if (absDiff <= closeTolerance) {
    status = "close";
  }

  return { status, direction, diff };
}

export function compareDriver(guessed: Driver, target: Driver): DriverComparison {
  const isCorrect = guessed.id === target.id;

  // Nationality
  let natStatus: MatchStatus = "mismatch";
  const sameContinent = isSameRegion(guessed.nationality, target.nationality);
  if (guessed.nationality.toLowerCase() === target.nationality.toLowerCase()) {
    natStatus = "exact";
  } else if (sameContinent) {
    natStatus = "close";
  }

  const natComp: ValueComparison<string> = {
    status: natStatus,
    value: guessed.nationality,
    targetValue: target.nationality,
  };

  // Birth Year (within 3 years is close)
  const birthCompResult = compareNumber(guessed.birthYear, target.birthYear, 0, 3);
  const birthComp: ValueComparison<number> = {
    ...birthCompResult,
    value: guessed.birthYear,
    targetValue: target.birthYear,
  };

  // Debut Year (within 3 years is close)
  const debutCompResult = compareNumber(guessed.debutYear, target.debutYear, 0, 3);
  const debutComp: ValueComparison<number> = {
    ...debutCompResult,
    value: guessed.debutYear,
    targetValue: target.debutYear,
  };

  // Championships (within 1 title is close)
  const champCompResult = compareNumber(guessed.championships, target.championships, 0, 1);
  const champComp: ValueComparison<number> = {
    ...champCompResult,
    value: guessed.championships,
    targetValue: target.championships,
  };

  // Career Wins (within 5 wins or 15% is close)
  const winTolerance = Math.max(5, Math.round(target.wins * 0.15));
  const winsCompResult = compareNumber(guessed.wins, target.wins, 0, winTolerance);
  const winsComp: ValueComparison<number> = {
    ...winsCompResult,
    value: guessed.wins,
    targetValue: target.wins,
  };

  // Teams Count (within 1 team is close)
  const teamsCompResult = compareNumber(guessed.teamsCount, target.teamsCount, 0, 1);
  const teamsComp: ValueComparison<number> = {
    ...teamsCompResult,
    value: guessed.teamsCount,
    targetValue: target.teamsCount,
  };

  return {
    id: guessed.id,
    name: guessed.name,
    guessedItem: guessed,
    nationality: natComp,
    birthYear: birthComp,
    debutYear: debutComp,
    championships: champComp,
    wins: winsComp,
    teamsCount: teamsComp,
    isCorrect,
  };
}

export function compareTeam(guessed: Team, target: Team): TeamComparison {
  const isCorrect = guessed.id === target.id;

  // Country
  let countryStatus: MatchStatus = "mismatch";
  const sameContinent = isSameRegion(guessed.country, target.country);
  if (guessed.country.toLowerCase() === target.country.toLowerCase()) {
    countryStatus = "exact";
  } else if (sameContinent) {
    countryStatus = "close";
  }

  const countryComp: ValueComparison<string> = {
    status: countryStatus,
    value: guessed.country,
    targetValue: target.country,
  };

  // Debut Year (within 5 years is close)
  const debutCompResult = compareNumber(guessed.debutYear, target.debutYear, 0, 5);
  const debutComp: ValueComparison<number> = {
    ...debutCompResult,
    value: guessed.debutYear,
    targetValue: target.debutYear,
  };

  // Championships (within 1 title is close)
  const champCompResult = compareNumber(guessed.championships, target.championships, 0, 1);
  const champComp: ValueComparison<number> = {
    ...champCompResult,
    value: guessed.championships,
    targetValue: target.championships,
  };

  // Wins (within 15 wins or 15% is close)
  const winTolerance = Math.max(10, Math.round(target.wins * 0.15));
  const winsCompResult = compareNumber(guessed.wins, target.wins, 0, winTolerance);
  const winsComp: ValueComparison<number> = {
    ...winsCompResult,
    value: guessed.wins,
    targetValue: target.wins,
  };

  // Podiums (within 25 podiums or 15% is close)
  const podTolerance = Math.max(20, Math.round(target.podiums * 0.15));
  const podCompResult = compareNumber(guessed.podiums, target.podiums, 0, podTolerance);
  const podComp: ValueComparison<number> = {
    ...podCompResult,
    value: guessed.podiums,
    targetValue: target.podiums,
  };

  // Seasons Competed (within 5 seasons is close)
  const seasonsCompResult = compareNumber(guessed.seasonsCompeted, target.seasonsCompeted, 0, 5);
  const seasonsComp: ValueComparison<number> = {
    ...seasonsCompResult,
    value: guessed.seasonsCompeted,
    targetValue: target.seasonsCompeted,
  };

  return {
    id: guessed.id,
    name: guessed.name,
    guessedItem: guessed,
    country: countryComp,
    debutYear: debutComp,
    championships: champComp,
    wins: winsComp,
    podiums: podComp,
    seasonsCompeted: seasonsComp,
    isCorrect,
  };
}

export function compareTrack(guessed: Track, target: Track): TrackComparison {
  const isCorrect = guessed.id === target.id;

  // Country
  let countryStatus: MatchStatus = "mismatch";
  const sameContinent = isSameRegion(guessed.country, target.country);
  if (guessed.country.toLowerCase() === target.country.toLowerCase()) {
    countryStatus = "exact";
  } else if (sameContinent) {
    countryStatus = "close";
  }

  const countryComp: ValueComparison<string> = {
    status: countryStatus,
    value: guessed.country,
    targetValue: target.country,
  };

  // Length in KM (within 0.05 km exact, 0.45 km close)
  const lengthDiff = target.lengthKm - guessed.lengthKm;
  let lenDir: DirectionStatus = "match";
  if (lengthDiff > 0.05) lenDir = "higher";
  else if (lengthDiff < -0.05) lenDir = "lower";

  let lenStatus: MatchStatus = "mismatch";
  if (Math.abs(lengthDiff) <= 0.05) lenStatus = "exact";
  else if (Math.abs(lengthDiff) <= 0.45) lenStatus = "close";

  const lenComp: ValueComparison<number> = {
    status: lenStatus,
    direction: lenDir,
    value: guessed.lengthKm,
    targetValue: target.lengthKm,
    diff: lengthDiff,
  };

  // Corners (within 2 corners close)
  const cornerCompResult = compareNumber(guessed.corners, target.corners, 0, 2);
  const cornerComp: ValueComparison<number> = {
    ...cornerCompResult,
    value: guessed.corners,
    targetValue: target.corners,
  };

  // First GP Year (within 5 years close)
  const firstGpCompResult = compareNumber(guessed.firstGPYea, target.firstGPYea, 0, 5);
  const firstGpComp: ValueComparison<number> = {
    ...firstGpCompResult,
    value: guessed.firstGPYea,
    targetValue: target.firstGPYea,
  };

  // Circuit Type (Permanent / Street / Hybrid)
  let typeStatus: MatchStatus = "mismatch";
  if (guessed.circuitType === target.circuitType) {
    typeStatus = "exact";
  } else if (
    (guessed.circuitType === "Hybrid" && target.circuitType === "Street") ||
    (guessed.circuitType === "Street" && target.circuitType === "Hybrid")
  ) {
    typeStatus = "close";
  }

  const typeComp: ValueComparison<string> = {
    status: typeStatus,
    value: guessed.circuitType,
    targetValue: target.circuitType,
  };

  // Direction (Clockwise / Anticlockwise)
  const dirStatus: MatchStatus = guessed.direction === target.direction ? "exact" : "mismatch";
  const dirComp: ValueComparison<string> = {
    status: dirStatus,
    value: guessed.direction,
    targetValue: target.direction,
  };

  return {
    id: guessed.id,
    name: guessed.name,
    guessedItem: guessed,
    country: countryComp,
    lengthKm: lenComp,
    corners: cornerComp,
    firstGPYea: firstGpComp,
    circuitType: typeComp,
    direction: dirComp,
    isCorrect,
  };
}

export function compareEntities(
  category: Category,
  guessed: Driver | Team | Track,
  target: Driver | Team | Track
): ComparisonResult {
  if (category === "driver") {
    return compareDriver(guessed as Driver, target as Driver);
  }
  if (category === "team") {
    return compareTeam(guessed as Team, target as Team);
  }
  return compareTrack(guessed as Track, target as Track);
}

