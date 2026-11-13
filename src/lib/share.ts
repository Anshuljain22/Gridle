import { Category, ComparisonResult, DriverComparison, TeamComparison, TrackComparison, GameMode } from "@/types";
import { getDailyChallengeNumber, getUtcDateString } from "./daily";

export function generateShareText(
  category: Category,
  mode: GameMode,
  comparisons: ComparisonResult[],
  isWon: boolean,
  maxGuesses: number = 7
): string {
  const categoryTitle =
    category === "driver" ? "Driver Mode 🏎️" : category === "team" ? "Constructor Mode 🏁" : "Circuit Mode 🛣️";

  let header = "";
  if (mode === "daily") {
    const dayNumber = getDailyChallengeNumber(getUtcDateString());
    header = `F1 WORDLE #${dayNumber}\n${categoryTitle}`;
  } else {
    header = `F1 WORDLE (Practice)\n${categoryTitle}`;
  }

  const scoreText = isWon
    ? `Solved in ${comparisons.length}/${maxGuesses} attempts! 🏆`
    : `DNF (Did Not Finish - X/${maxGuesses}) ⚠️`;

  // Generate emoji grid
  const emojiRows = comparisons.map((comp) => {
    const emojis: string[] = [];

    if (category === "driver") {
      const d = comp as DriverComparison;
      emojis.push(statusToEmoji(d.nationality.status));
      emojis.push(statusToEmoji(d.birthYear.status));
      emojis.push(statusToEmoji(d.debutYear.status));
      emojis.push(statusToEmoji(d.championships.status));
      emojis.push(statusToEmoji(d.wins.status));
      emojis.push(statusToEmoji(d.teamsCount.status));
    } else if (category === "team") {
      const t = comp as TeamComparison;
      emojis.push(statusToEmoji(t.country.status));
      emojis.push(statusToEmoji(t.debutYear.status));
      emojis.push(statusToEmoji(t.championships.status));
      emojis.push(statusToEmoji(t.wins.status));
      emojis.push(statusToEmoji(t.podiums.status));
      emojis.push(statusToEmoji(t.seasonsCompeted.status));
    } else {
      const tr = comp as TrackComparison;
      emojis.push(statusToEmoji(tr.country.status));
      emojis.push(statusToEmoji(tr.lengthKm.status));
      emojis.push(statusToEmoji(tr.corners.status));
      emojis.push(statusToEmoji(tr.firstGPYea.status));
      emojis.push(statusToEmoji(tr.circuitType.status));
      emojis.push(statusToEmoji(tr.direction.status));
    }

    return emojis.join(" ");
  });

  return `${header}\n\n${emojiRows.join("\n")}\n\n${scoreText}\nPlay at: https://f1-wordle.vercel.app`;
}

function statusToEmoji(status: string): string {
  if (status === "exact") return "🟩";
  if (status === "close") return "🟨";
  return "⬛";
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  }
  return Promise.resolve(false);
}

