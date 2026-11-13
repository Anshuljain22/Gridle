import { NextResponse } from "next/server";
import { Category } from "@/types";
import { getEntityById } from "@/data";
import { compareEntities } from "@/lib/comparison";
import { getHintsForEntity } from "@/lib/hints";
import { getDailyChallenge, getUtcDateString } from "@/lib/daily";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, guessId, mode, dateStr, practiceMysteryId, attemptNumber } = body as {
      category: Category;
      guessId: string;
      mode: "daily" | "practice";
      dateStr?: string;
      practiceMysteryId?: string;
      attemptNumber: number;
    };

    if (!category || !guessId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Determine target mystery item
    let targetId = "";
    if (mode === "daily") {
      const day = getDailyChallenge(dateStr || getUtcDateString());
      targetId =
        category === "driver" ? day.driverId : category === "team" ? day.teamId : day.trackId;
    } else {
      targetId = practiceMysteryId || "";
    }

    const guessedEntity = getEntityById(category, guessId);
    const targetEntity = getEntityById(category, targetId);

    if (!guessedEntity || !targetEntity) {
      return NextResponse.json({ error: "Invalid entity identifier" }, { status: 404 });
    }

    // Run comparison
    const comparison = compareEntities(category, guessedEntity, targetEntity);
    const isCorrect = comparison.isCorrect;

    // Hints up to this attempt
    const allHints = getHintsForEntity(category, targetEntity);
    const unlockedHints = allHints.filter((h) => h.unlockedAtGuess <= attemptNumber);

    // If game is over (isCorrect or attemptNumber >= 7), return target educational data
    const isGameOver = isCorrect || attemptNumber >= 7;

    return NextResponse.json({
      success: true,
      comparison,
      isCorrect,
      unlockedHints,
      revealedTarget: isGameOver ? targetEntity : null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
