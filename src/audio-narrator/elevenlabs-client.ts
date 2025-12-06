// ElevenLabs API Client

import { VoiceSettings } from './interfaces';

// Default API configuration
const DEFAULT_BASE_URL = 'https://api.elevenlabs.io/v1';
const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  stability: 0.75,
  similarity_boost: 0.85,
};

// API constraints
const MAX_TEXT_LENGTH = 100000;

/**
 * ElevenLabs Text-to-Speech API Client
 */
export class ElevenLabsClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string, baseUrl = DEFAULT_BASE_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Convert text to speech using ElevenLabs API
   * @throws {Error} if request fails or validation fails
   */
  async textToSpeech(
    text: string,
    voiceId: string,
    settings?: VoiceSettings
  ): Promise<ArrayBuffer> {
    this.validateTextInput(text);

    const url = `${this.baseUrl}/text-to-speech/${voiceId}`;
    const requestBody = {
      text,
      voice_settings: settings ?? DEFAULT_VOICE_SETTINGS,
    };

    console.log('🔍 DEBUG: ElevenLabs request', {
      url,
      voice_id: voiceId,
      text_length: text.length,
      has_api_key: !!this.apiKey,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('🔍 DEBUG: ElevenLabs response', {
        status: response.status,
        ok: response.ok,
        content_type: response.headers.get('content-type'),
      });

      this.handleResponseErrors(response);

      const arrayBuffer = await response.arrayBuffer();

      console.log('🔍 DEBUG: Audio data received', {
        size: arrayBuffer.byteLength,
      });

      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error('Invalid audio response from API');
      }

      return arrayBuffer;
    } catch (error) {
      console.error('🚨 ElevenLabs API error:', error);
      if (error instanceof TypeError) {
        throw new Error('Network error: Unable to reach ElevenLabs API');
      }
      throw error;
    }
  }

  /**
   * Validate text input for TTS
   * @throws {Error} if text is invalid
   */
  private validateTextInput(text: string): void {
    if (!text || text.trim() === '') {
      throw new Error('Text cannot be empty');
    }

    if (text.length > MAX_TEXT_LENGTH) {
      throw new Error('Text exceeds maximum length limit');
    }
  }

  /**
   * Handle HTTP response errors from ElevenLabs API
   * @throws {Error} if response indicates an error
   */
  private handleResponseErrors(response: Response): void {
    if (response.ok) {
      return;
    }

    const errorMap: Record<number, string> = {
      401: 'Unauthorized: Invalid API key',
      404: 'Voice not found',
      429: 'Rate limit exceeded',
    };

    const errorMessage = errorMap[response.status] ?? `ElevenLabs API error: ${response.status}`;
    throw new Error(errorMessage);
  }

  /**
   * Get information about a specific voice
   * @throws {Error} if request fails
   */
  async getVoiceInfo(voiceId: string): Promise<any> {
    const url = `${this.baseUrl}/voices/${voiceId}`;

    try {
      const response = await this.makeGetRequest(url);
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error: Unable to reach ElevenLabs API');
      }
      throw error;
    }
  }

  /**
   * List all available voices
   * @throws {Error} if request fails
   */
  async listVoices(): Promise<any[]> {
    const url = `${this.baseUrl}/voices`;

    try {
      const response = await this.makeGetRequest(url);
      const data = (await response.json()) as { voices?: unknown[] };
      return data.voices ?? [];
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error: Unable to reach ElevenLabs API');
      }
      throw error;
    }
  }

  /**
   * Make a GET request to ElevenLabs API
   * @throws {Error} if request fails
   */
  private async makeGetRequest(url: string): Promise<Response> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'xi-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response;
  }
}
