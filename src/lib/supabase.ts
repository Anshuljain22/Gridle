import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export async function syncSessionToSupabase(sessionData: {
  userId: string;
  category: string;
  difficulty: string;
  challengeType: string;
  attempts: number;
  hintsUsed: number;
  isWon: boolean;
}) {
  if (!supabase) return { success: false, reason: "Supabase not configured" };

  try {
    const { data, error } = await supabase.from("game_sessions").insert([
      {
        user_id: sessionData.userId,
        category: sessionData.category,
        difficulty: sessionData.difficulty,
        challenge_type: sessionData.challengeType,
        attempts: sessionData.attempts,
        hints_used: sessionData.hintsUsed,
        is_won: sessionData.isWon,
        completed_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn("Supabase sync warning:", error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Sync error";
    console.warn("Supabase session sync exception:", message);
    return { success: false, error: message };
  }
}
