// Audio Narrator Utilities

import { Env } from './raindrop.gen';

// Regular expression for valid voice IDs (alphanumeric, underscore, hyphen)
const VOICE_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

// Audio file storage configuration
const AUDIO_STORAGE_PREFIX = 'audio';
const AUDIO_FILE_EXTENSION = '.mp3';

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
 * Validate voice ID format
 * @throws {Error} if voice ID is invalid
 */
export function validateVoiceId(voiceId: string): boolean {
  if (isEmpty(voiceId)) {
    throw new Error('Voice ID cannot be empty');
  }

  if (!VOICE_ID_PATTERN.test(voiceId)) {
    throw new Error('Voice ID contains invalid characters');
  }

  return true;
}

/**
 * Generate storage key for audio file
 * @throws {Error} if story ID is invalid
 */
export function generateStorageKey(storyId: string): string {
  if (isEmpty(storyId)) {
    throw new Error('Story ID cannot be empty');
  }

  return `${AUDIO_STORAGE_PREFIX}/${storyId}${AUDIO_FILE_EXTENSION}`;
}

/**
 * Upload audio data to storage bucket
 * @returns Public URL of uploaded audio
 * @throws {Error} if upload fails
 */
export async function uploadAudioToBucket(
  env: Env,
  key: string,
  audioData: ArrayBuffer
): Promise<string> {
  try {
    // Upload audio to storage bucket
    await env.AUDIO_STORAGE.put(key, audioData, {
      httpMetadata: {
        contentType: 'audio/mpeg',
      },
    });

    env.logger.info('Audio uploaded to storage', {
      key,
      size_bytes: audioData.byteLength,
    });

    // Return URL that will be served through API endpoint
    // The API gateway will have a /api/audio/:key endpoint to serve files from bucket
    const audioUrl = `/api/audio/${encodeURIComponent(key)}`;

    env.logger.info('Audio URL generated (via API endpoint)', {
      key,
      url: audioUrl,
    });

    return audioUrl;
  } catch (error) {
    env.logger.error('Failed to upload audio', {
      error: extractErrorMessage(error),
    });
    throw new Error(`Failed to upload audio: ${extractErrorMessage(error)}`);
  }
}
