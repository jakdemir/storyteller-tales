// Story Generator Utilities

import { Env } from './raindrop.gen';
import { Narrator, Myth, Story } from './interfaces';

/**
 * Extract error message safely from unknown error types
 */
const extractErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
};

/**
 * Map database row to Narrator type
 */
const mapRowToNarrator = (row: any): Narrator => ({
  id: row.id,
  name: row.name,
  voice_id: row.voice_id ?? '',
  style_description: row.style_description ?? '',
});

/**
 * Map database row to Myth type
 */
const mapRowToMyth = (row: any): Myth => ({
  id: row.id,
  title: row.title,
  culture: row.culture,
  canonical_text: row.canonical_text,
});

/**
 * Fetch all narrators from database
 */
export async function fetchNarratorsFromDatabase(env: Env): Promise<Narrator[]> {
  try {
    env.logger.info('Fetching narrators from database');

    const result = await env.STORYTELLER_DB.prepare(
      `SELECT id, name, elevenlabs_voice_id as voice_id, voice_style as style_description
       FROM narrators ORDER BY name`
    ).all<{ id: string; name: string; voice_id: string; style_description: string }>();

    const narrators = result.results.map(mapRowToNarrator);

    env.logger.info('Fetched narrators', { count: narrators.length });
    return narrators;
  } catch (error) {
    env.logger.error('Failed to fetch narrators', { error: extractErrorMessage(error) });
    throw error;
  }
}

/**
 * Fetch all myths from database, optionally filtered by language
 */
export async function fetchMythsFromDatabase(env: Env, language?: string): Promise<Myth[]> {
  try {
    env.logger.info('Fetching myths from database', { language });

    const query = language
      ? `SELECT id, name as title, cultural_origin as culture, official_text as canonical_text
         FROM myths WHERE language = ? ORDER BY name`
      : `SELECT id, name as title, cultural_origin as culture, official_text as canonical_text
         FROM myths ORDER BY name`;

    const result = language
      ? await env.STORYTELLER_DB.prepare(query)
        .bind(language)
        .all<{ id: string; title: string; culture: string; canonical_text: string }>()
      : await env.STORYTELLER_DB.prepare(query)
        .all<{ id: string; title: string; culture: string; canonical_text: string }>();

    const myths = result.results.map(mapRowToMyth);

    env.logger.info('Fetched myths', { count: myths.length, language });
    return myths;
  } catch (error) {
    env.logger.error('Failed to fetch myths', { error: extractErrorMessage(error), language });
    throw error;
  }
}

/**
 * Fetch a specific myth by ID
 */
export async function fetchMythById(env: Env, mythId: string): Promise<Myth | null> {
  try {
    env.logger.debug('Fetching myth by ID', { myth_id: mythId });

    const result = await env.STORYTELLER_DB.prepare(
      `SELECT id, name as title, cultural_origin as culture, official_text as canonical_text
       FROM myths WHERE id = ? LIMIT 1`
    ).bind(mythId).all<{ id: string; title: string; culture: string; canonical_text: string }>();

    if (!result.results || result.results.length === 0) {
      env.logger.warn('Myth not found', { myth_id: mythId });
      return null;
    }

    return mapRowToMyth(result.results[0]);
  } catch (error) {
    env.logger.error('Failed to fetch myth by ID', {
      myth_id: mythId,
      error: extractErrorMessage(error),
    });
    throw error;
  }
}

/**
 * Fetch a specific narrator by ID
 */
export async function fetchNarratorById(env: Env, narratorId: string): Promise<Narrator | null> {
  try {
    env.logger.debug('Fetching narrator by ID', { narrator_id: narratorId });

    const result = await env.STORYTELLER_DB.prepare(
      `SELECT id, name, elevenlabs_voice_id as voice_id, voice_style as style_description
       FROM narrators WHERE id = ? LIMIT 1`
    ).bind(narratorId).all<{ id: string; name: string; voice_id: string; style_description: string }>();

    if (!result.results || result.results.length === 0) {
      env.logger.warn('Narrator not found', { narrator_id: narratorId });
      return null;
    }

    return mapRowToNarrator(result.results[0]);
  } catch (error) {
    env.logger.error('Failed to fetch narrator by ID', {
      narrator_id: narratorId,
      error: extractErrorMessage(error),
    });
    throw error;
  }
}

/**
 * Validate story personalization inputs
 */
const validatePersonalizationInputs = (myth: Myth, narrator: Narrator): void => {
  if (!myth.canonical_text?.trim()) {
    throw new Error('Myth canonical text cannot be empty');
  }

  if (!narrator.style_description?.trim()) {
    throw new Error('Narrator style description cannot be empty');
  }
};

/**
 * Build prompt for AI story narration (preserving original mythology)
 */
const buildPersonalizationPrompt = (myth: Myth, narrator: Narrator): string => {
  return `You are ${narrator.name}, a narrator with the following voice characteristics:
${narrator.style_description}

Your task is to create a VERY SHORT 3-SENTENCE summary of the following myth using your unique voice style.

CRITICAL INSTRUCTIONS:
1. ONLY 3 SENTENCES - This is for testing, keep it extremely brief
2. Preserve the core plot elements of the myth
3. Apply your voice characteristics (tone, pacing, word choice)
4. Maintain cultural authenticity
5. NO modern interpretations

MYTH TO SUMMARIZE:
Title: ${myth.title}
Cultural Origin: ${myth.culture}

${myth.canonical_text}

Create a 3-sentence narration that captures the essence of this myth in your voice style.`;
};

/**
 * Narrate a myth story using AI with narrator's unique voice style
 * Preserves original mythology while applying narrator's voice characteristics
 */
export async function narrateStory(
  env: Env,
  myth: Myth,
  narrator: Narrator
): Promise<string> {
  validatePersonalizationInputs(myth, narrator);

  try {
    env.logger.info('Narrating story with AI', {
      myth_id: myth.id,
      myth_title: myth.title,
      narrator_id: narrator.id,
      narrator_name: narrator.name,
    });

    const prompt = buildPersonalizationPrompt(myth, narrator);

    const response = await env.AI.run('llama-3.3-70b', {
      model: 'llama-3.3-70b',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150, // Reduced from 2000 to 150 for 3-sentence stories
    });

    const narratedText = response.choices?.[0]?.message?.content ?? '';

    if (!narratedText.trim()) {
      throw new Error('AI service returned empty response');
    }

    env.logger.info('Story narrated successfully', {
      myth_id: myth.id,
      narrator_id: narrator.id,
      output_length: narratedText.length,
    });

    return narratedText;
  } catch (error) {
    env.logger.error('Failed to narrate story', {
      myth_id: myth.id,
      narrator_id: narrator.id,
      error: extractErrorMessage(error),
    });
    throw error;
  }
}

/**
 * Generate a unique story ID
 */
const generateStoryId = (): string => `story-${crypto.randomUUID()}`;

/**
 * Save generated story to database
 */
export async function saveStoryToDatabase(
  env: Env,
  story: Omit<Story, 'id' | 'created_at'>
): Promise<Story> {
  const storyId = generateStoryId();
  const createdAt = new Date().toISOString();

  try {
    env.logger.info('Saving story to database', {
      story_id: storyId,
      myth_id: story.myth_id,
      narrator_id: story.narrator_id,
    });

    await env.STORYTELLER_DB.prepare(
      `INSERT INTO stories (id, narrator_id, myth_id, generated_story, audio_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      storyId,
      story.narrator_id,
      story.myth_id,
      story.personalized_text,
      story.audio_url ?? null,
      Date.now()
    ).run();

    const savedStory: Story = {
      id: storyId,
      ...story,
      created_at: createdAt,
    };

    env.logger.info('Story saved successfully', { story_id: storyId });
    return savedStory;
  } catch (error) {
    env.logger.error('Failed to save story', {
      myth_id: story.myth_id,
      narrator_id: story.narrator_id,
      error: extractErrorMessage(error),
    });
    throw error;
  }
}
