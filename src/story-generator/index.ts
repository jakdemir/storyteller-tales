import { Service } from '@liquidmetal-ai/raindrop-framework';
import { Env } from './raindrop.gen';
import { Narrator, Myth, Story, GenerateStoryRequest } from './interfaces';
import {
  fetchNarratorsFromDatabase,
  fetchMythsFromDatabase,
  fetchMythById,
  fetchNarratorById,
  narrateStory,
  saveStoryToDatabase,
} from './utils';

/**
 * Extract error message safely from unknown error types
 */
const extractErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
};

/**
 * Story Generator Service - Generates narrated stories using AI
 * Preserves original mythologies while applying narrator voice styles
 */
export default class extends Service<Env> {
  /**
   * Private service - no HTTP fetch needed
   */
  async fetch(_request: Request, _env: Env, _ctx: unknown): Promise<Response> {
    return new Response('Not implemented', { status: 501 });
  }

  /**
   * Get all available narrators
   */
  async getNarrators(): Promise<Narrator[]> {
    try {
      return await fetchNarratorsFromDatabase(this.env);
    } catch (error) {
      this.env.logger.error('getNarrators failed', { error: extractErrorMessage(error) });
      throw error;
    }
  }

  /**
   * Get all available myths, optionally filtered by language
   */
  async getMyths(language?: string): Promise<Myth[]> {
    try {
      return await fetchMythsFromDatabase(this.env, language);
    } catch (error) {
      this.env.logger.error('getMyths failed', { error: extractErrorMessage(error), language });
      throw error;
    }
  }

  /**
   * Generate a narrated story preserving original mythology with narrator voice style
   */
  async generateStory(request: GenerateStoryRequest): Promise<Story> {
    const { myth_id, narrator_id } = request;

    this.env.logger.info('Generating story', { myth_id: request.myth_id, narrator_id: request.narrator_id });

    try {
      // Fetch myth and narrator in parallel
      const [myth, narrator] = await Promise.all([
        fetchMythById(this.env, myth_id),
        fetchNarratorById(this.env, narrator_id),
      ]);

      // Validate that both exist
      if (!myth) {
        throw new Error('Myth not found');
      }

      if (!narrator) {
        throw new Error('Narrator not found');
      }

      // Use the myth's canonical text directly (no AI modification)
      // This ensures the audio narrates exactly what's displayed on screen
      const narratedText = myth.canonical_text;

      // Generate audio narration
      let audioUrl: string | undefined = undefined;
      try {
        this.env.logger.info('Generating audio narration', {
          narrator_id,
          voice_id: narrator.voice_id,
          text_length: narratedText.length,
        });

        const audioResponse = await this.env.AUDIO_NARRATOR.generateAudio({
          text: narratedText,
          voice_id: narrator.voice_id,
          story_id: `temp-${Date.now()}`, // Will be replaced with actual story ID
        });

        audioUrl = audioResponse.audio_url;
        this.env.logger.info('Audio generated successfully', { audio_url: audioUrl });
      } catch (audioError) {
        // Audio generation is optional - don't fail the entire story if it fails
        this.env.logger.warn('Audio generation failed, continuing without audio', {
          error: extractErrorMessage(audioError),
        });
      }

      // Save story to database
      const savedStory = await saveStoryToDatabase(this.env, {
        myth_id,
        narrator_id,
        personalized_text: narratedText,
        audio_url: audioUrl,
      });

      this.env.logger.info('Story generated successfully', {
        story_id: savedStory.id,
        myth_id,
        narrator_id,
        has_audio: !!audioUrl,
      });

      return savedStory;
    } catch (error) {
      this.env.logger.error('Story generation failed', {
        myth_id,
        narrator_id,
        error: extractErrorMessage(error),
      });
      throw error;
    }
  }
}