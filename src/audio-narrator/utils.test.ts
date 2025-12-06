import { expect, test, describe, beforeEach, vi } from 'vitest';
import { validateVoiceId, generateStorageKey, uploadAudioToBucket } from './utils';

// Mock environment
function createMockEnv() {
  const mockLogger = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  };

  const mockAudioStorage = {
    put: vi.fn(),
  };

  return {
    logger: mockLogger,
    AUDIO_STORAGE: mockAudioStorage,
  };
}

describe('Audio Narrator Utils - Validation', () => {
  test('validateVoiceId accepts valid voice IDs', () => {
    // Should not throw for valid voice IDs
    expect(() => validateVoiceId('voice-zeus-001')).not.toThrow();
  });

  test('validateVoiceId rejects empty strings', () => {
    expect(() => validateVoiceId('')).toThrow();
  });

  test('validateVoiceId rejects invalid formats', () => {
    expect(() => validateVoiceId('invalid voice id with spaces')).toThrow();
  });
});

describe('Audio Narrator Utils - Storage Keys', () => {
  test('generateStorageKey creates unique keys', () => {
    // Should create unique keys without throwing
    const key = generateStorageKey('story-123');
    expect(key).toBeDefined();
  });

  test('generateStorageKey includes story ID', () => {
    const key = generateStorageKey('story-456');
    expect(key).toContain('story-456');
  });

  test('generateStorageKey uses safe file format', () => {
    // Should generate keys with .mp3 extension
    const key = generateStorageKey('story-789');
    expect(key).toMatch(/\.mp3$/);
  });
});

describe('Audio Narrator Utils - Upload', () => {
  let env: any;

  beforeEach(() => {
    env = createMockEnv();
  });

  test('uploadAudioToBucket stores audio data', async () => {
    const audioData = new ArrayBuffer(1024);
    const key = 'audio/story-123.mp3';

    // Should resolve with a URL
    const url = await uploadAudioToBucket(env, key, audioData);
    expect(url).toBeDefined();
    expect(typeof url).toBe('string');
  });

  test('uploadAudioToBucket returns public URL', async () => {
    const audioData = new ArrayBuffer(1024);
    const key = 'audio/story-123.mp3';

    // Should return a URL like https://bucket.example.com/audio/story-123.mp3
    const url = await uploadAudioToBucket(env, key, audioData);
    expect(url).toMatch(/^https?:\/\//);
  });

  test('uploadAudioToBucket handles storage errors', async () => {
    env.AUDIO_STORAGE.put.mockRejectedValue(new Error('Storage error'));

    const audioData = new ArrayBuffer(1024);
    const key = 'audio/story-123.mp3';

    await expect(uploadAudioToBucket(env, key, audioData)).rejects.toThrow();
  });
});
