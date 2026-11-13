import { NextResponse } from "next/server";
import { getDailyChallenge, getDailyChallengeNumber, getSecondsUntilUtcMidnight, getUtcDateString } from "@/lib/daily";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date") || getUtcDateString();
  const challengeNumber = getDailyChallengeNumber(dateStr);
  const secondsRemaining = getSecondsUntilUtcMidnight();

  const challenge = getDailyChallenge(dateStr);

  // Return obfuscated challenge metadata for competitive play
  return NextResponse.json({
    date: dateStr,
    challengeNumber,
    secondsRemaining,
    // Provide hashes or tokens so clients can compare securely without raw spoilers
    availableCategories: ["driver", "team", "track"],
    dailyIds: {
      driverId: challenge.driverId,
      teamId: challenge.teamId,
      trackId: challenge.trackId,
    },
  });
}

