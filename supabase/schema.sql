-- =========================================================================
-- F1 WORDLE - SUPABASE & POSTGRESQL DATABASE SCHEMA
-- Matches the Technical Requirements from Master Development Prompt
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DRIVERS TABLE
CREATE TABLE IF NOT EXISTS drivers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT,
  car_number INTEGER,
  nationality TEXT NOT NULL,
  continent TEXT NOT NULL,
  birth_year INTEGER NOT NULL,
  debut_year INTEGER NOT NULL,
  last_season TEXT NOT NULL,
  wins INTEGER NOT NULL DEFAULT 0,
  podiums INTEGER NOT NULL DEFAULT 0,
  pole_positions INTEGER NOT NULL DEFAULT 0,
  championships INTEGER NOT NULL DEFAULT 0,
  teams TEXT[] NOT NULL DEFAULT '{}',
  teams_count INTEGER NOT NULL DEFAULT 1,
  iconic_team TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TEAMS / CONSTRUCTORS TABLE
CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  country TEXT NOT NULL,
  continent TEXT NOT NULL,
  debut_year INTEGER NOT NULL,
  championships INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  podiums INTEGER NOT NULL DEFAULT 0,
  pole_positions INTEGER NOT NULL DEFAULT 0,
  seasons_competed INTEGER NOT NULL DEFAULT 1,
  famous_drivers TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  color_hex TEXT NOT NULL DEFAULT '#E10600',
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRACKS / CIRCUITS TABLE
CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  country TEXT NOT NULL,
  continent TEXT NOT NULL,
  first_gp_year INTEGER NOT NULL,
  length_km NUMERIC(5, 3) NOT NULL,
  corners INTEGER NOT NULL,
  race_laps INTEGER NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('Clockwise', 'Anticlockwise')),
  circuit_type TEXT NOT NULL CHECK (circuit_type IN ('Permanent', 'Street', 'Hybrid')),
  lap_record TEXT NOT NULL,
  famous_corner TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DAILY CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_date DATE NOT NULL UNIQUE,
  driver_id TEXT REFERENCES drivers(id) ON DELETE SET NULL,
  team_id TEXT REFERENCES teams(id) ON DELETE SET NULL,
  track_id TEXT REFERENCES tracks(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GAME SESSIONS TABLE
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('driver', 'team', 'track')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('daily', 'practice')),
  attempts INTEGER NOT NULL CHECK (attempts >= 1 AND attempts <= 7),
  hints_used INTEGER NOT NULL DEFAULT 0,
  is_won BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. USER STATISTICS TABLE
CREATE TABLE IF NOT EXISTS user_statistics (
  user_id TEXT PRIMARY KEY,
  total_games INTEGER NOT NULL DEFAULT 0,
  total_wins INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  average_attempts NUMERIC(4, 2) DEFAULT 0.0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR HIGH-THROUGHPUT QUERIES
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_date ON game_sessions(completed_at);
CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON daily_challenges(challenge_date);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- Allow public read access to entity data and daily challenges
CREATE POLICY "Allow public read on drivers" ON drivers FOR SELECT USING (true);
CREATE POLICY "Allow public read on teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Allow public read on tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Allow public read on daily_challenges" ON daily_challenges FOR SELECT USING (true);

-- Allow users to insert game sessions and read their own
CREATE POLICY "Allow anonymous insert on game_sessions" ON game_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to read game_sessions" ON game_sessions FOR SELECT USING (true);

