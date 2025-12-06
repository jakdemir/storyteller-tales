import { Service } from '@liquidmetal-ai/raindrop-framework';
import { Env } from './raindrop.gen';
import { GenerateAudioRequest, GenerateAudioResponse } from './interfaces';
import { GoogleTTSClient } from './google-tts-client';
import { getGoogleVoice } from './voice-mapping';
import { validateVoiceId, generateStorageKey, uploadAudioToBucket } from './utils';

/**
 * Extract error message safely from unknown error types
 */
const extractErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
};

/**
 * Check if string is empty or whitespace only
 */
const isEmpty = (value: string): boolean => !value || value.trim() === '';

/**
 * Validate audio generation request inputs
 * @throws {Error} if any input is invalid
 */
const validateAudioRequest = (request: GenerateAudioRequest): void => {
  const { text, voice_id, story_id } = request;

  if (isEmpty(text)) {
    throw new Error('Text cannot be empty');
  }

  if (isEmpty(voice_id)) {
    throw new Error('Voice ID cannot be empty');
  }

  if (isEmpty(story_id)) {
    throw new Error('Story ID cannot be empty');
  }

  validateVoiceId(voice_id);
};

/**
 * Audio Narrator Service - Converts text to speech using ElevenLabs
 */
export default class extends Service<Env> {
  /**
   * Private service - no HTTP fetch needed
   */
  async fetch(_request: Request, _env: Env, _ctx: unknown): Promise<Response> {
    return new Response('Not implemented', { status: 501 });
  }

  /**
   * Generate audio narration from text
   */
  async generateAudio(request: GenerateAudioRequest): Promise<GenerateAudioResponse> {
    const { text, voice_id, story_id } = request;

    // Validate all inputs
    try {
      validateAudioRequest(request);
    } catch (error) {
      this.env.logger.error('Audio request validation failed', {
        voice_id,
        error: extractErrorMessage(error),
      });
      throw error;
    }

    this.env.logger.info('Generating audio', {
      story_id,
      voice_id,
      text_length: text.length,
    });

    // DEBUG: Check credentials
    this.env.logger.info('🔍 DEBUG: Google Cloud credentials status', {
      has_credentials: !!this.env.GOOGLE_CLOUD_CREDENTIALS,
      credentials_length: this.env.GOOGLE_CLOUD_CREDENTIALS?.length || 0,
    });

    try {
      // Map voice ID to Google Cloud voice
      const googleVoiceId = getGoogleVoice(voice_id);
      this.env.logger.info('🔍 DEBUG: Voice mapping', {
        original_voice_id: voice_id,
        google_voice_id: googleVoiceId,
      });

      // Create Google Cloud TTS client and generate audio
      this.env.logger.info('🔍 DEBUG: Creating Google TTS client');
      const client = new GoogleTTSClient(this.env.GOOGLE_CLOUD_CREDENTIALS);

      this.env.logger.info('🔍 DEBUG: Calling Google Cloud TTS API', {
        voice_id: googleVoiceId,
        text_preview: text.substring(0, 100) + '...',
      });

      const audioData = await client.textToSpeech(text, googleVoiceId);

      this.env.logger.info('🔍 DEBUG: Google TTS API returned audio', {
        story_id,
        audio_size_bytes: audioData.byteLength,
        audio_type: audioData.constructor.name,
      });

      // Upload to storage bucket
      this.env.logger.info('🔍 DEBUG: Uploading to storage bucket', {
        story_id,
      });

      const storageKey = generateStorageKey(story_id);
      this.env.logger.info('🔍 DEBUG: Storage key generated', {
        key: storageKey,
      });

      const audioUrl = await uploadAudioToBucket(this.env, storageKey, audioData);

      this.env.logger.info('🔍 DEBUG: Audio uploaded successfully', {
        story_id,
        audio_url: audioUrl,
      });

      return {
        audio_url: audioUrl,
        duration_seconds: undefined,
      };
    } catch (error) {
      this.env.logger.error('🚨 Audio generation failed', {
        story_id,
        voice_id,
        error: extractErrorMessage(error),
        error_stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }
}
