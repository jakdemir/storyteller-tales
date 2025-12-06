-- Initial schema for Storyteller Tales database
-- Creates narrators, myths, and stories tables

-- Narrators table: stores narrator profiles with their voice settings
CREATE TABLE IF NOT EXISTS narrators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    cultural_background TEXT NOT NULL,
    voice_style TEXT NOT NULL,
    example_phrases TEXT,
    elevenlabs_voice_id TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
);

-- Index for filtering narrators by cultural background
CREATE INDEX IF NOT EXISTS idx_narrators_cultural_background ON narrators(cultural_background);

-- Myths table: stores original myth texts and metadata
CREATE TABLE IF NOT EXISTS myths (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cultural_origin TEXT NOT NULL,
    official_text TEXT NOT NULL,
    summary TEXT,
    key_characters TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
);

-- Index for filtering myths by cultural origin
CREATE INDEX IF NOT EXISTS idx_myths_cultural_origin ON myths(cultural_origin);

-- Stories table: stores generated personalized stories
CREATE TABLE IF NOT EXISTS stories (
    id TEXT PRIMARY KEY,
    narrator_id TEXT NOT NULL,
    myth_id TEXT NOT NULL,
    generated_story TEXT NOT NULL,
    audio_url TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
    FOREIGN KEY (narrator_id) REFERENCES narrators(id),
    FOREIGN KEY (myth_id) REFERENCES myths(id)
);

-- Indexes for story lookups
CREATE INDEX IF NOT EXISTS idx_stories_narrator_id ON stories(narrator_id);
CREATE INDEX IF NOT EXISTS idx_stories_myth_id ON stories(myth_id);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at);
