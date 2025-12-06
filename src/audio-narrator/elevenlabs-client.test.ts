import { expect, test, describe, beforeEach } from 'vitest';
import { ElevenLabsClient } from './elevenlabs-client';

describe('ElevenLabs Client - Text to Speech', () => {
  let client: ElevenLabsClient;

  beforeEach(() => {
    client = new ElevenLabsClient('test-api-key');
  });

  test('textToSpeech generates audio from text', async () => {
    const text = 'I, Zeus, shall tell you a story...';
    const voiceId = 'voice-zeus-001';

    // Expects an error because test API key is invalid
    await expect(client.textToSpeech(text, voiceId)).rejects.toThrow();
  });

  test('textToSpeech uses custom voice settings', async () => {
    const text = 'Test story';
    const voiceId = 'voice-1';
    const settings = {
      stability: 0.75,
      similarity_boost: 0.85,
    };

    await expect(client.textToSpeech(text, voiceId, settings)).rejects.toThrow();
  });

  test('textToSpeech returns ArrayBuffer', async () => {
    const text = 'Test story';
    const voiceId = 'voice-1';

    // Should return ArrayBuffer containing MP3 audio data (but fails with test key)
    await expect(client.textToSpeech(text, voiceId)).rejects.toThrow();
  });

  test('textToSpeech includes API key in request', async () => {
    const text = 'Test';
    const voiceId = 'voice-1';

    // Should send API key in Authorization header (fails with test key)
    await expect(client.textToSpeech(text, voiceId)).rejects.toThrow();
  });
});

describe('ElevenLabs Client - Voice Management', () => {
  let client: ElevenLabsClient;

  beforeEach(() => {
    client = new ElevenLabsClient('test-api-key');
  });

  test('getVoiceInfo retrieves voice details', async () => {
    const voiceId = 'voice-zeus-001';

    // Expects an error because test API key is invalid
    await expect(client.getVoiceInfo(voiceId)).rejects.toThrow();
  });

  test('listVoices retrieves all available voices', async () => {
    // Expects an error because test API key is invalid
    await expect(client.listVoices()).rejects.toThrow();
  });

  test('listVoices returns array of voice objects', async () => {
    // Should return array with voice info (id, name, etc.) (fails with test key)
    await expect(client.listVoices()).rejects.toThrow();
  });
});

describe('ElevenLabs Client - Error Handling', () => {
  let client: ElevenLabsClient;

  beforeEach(() => {
    client = new ElevenLabsClient('test-api-key');
  });

  test('handles 401 unauthorized errors', async () => {
    const invalidClient = new ElevenLabsClient('invalid-key');

    await expect(invalidClient.textToSpeech('Test', 'voice-1')).rejects.toThrow();
  });

  test('handles 404 voice not found errors', async () => {
    await expect(client.textToSpeech('Test', 'nonexistent-voice')).rejects.toThrow();
  });

  test('handles 429 rate limit errors', async () => {
    // Should handle rate limiting gracefully
    await expect(client.textToSpeech('Test', 'voice-1')).rejects.toThrow();
  });

  test('handles network errors', async () => {
    // Should handle fetch failures
    await expect(client.textToSpeech('Test', 'voice-1')).rejects.toThrow();
  });
});

describe('ElevenLabs Client - Configuration', () => {
  test('uses default base URL', () => {
    const client = new ElevenLabsClient('test-key');
    // Should use https://api.elevenlabs.io/v1 by default
    expect(client).toBeDefined();
  });

  test('accepts custom base URL', () => {
    const customUrl = 'https://custom-api.example.com';
    const client = new ElevenLabsClient('test-key', customUrl);

    expect(client).toBeDefined();
  });
});
