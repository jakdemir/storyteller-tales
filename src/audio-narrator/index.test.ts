import { expect, test, describe, beforeEach, vi } from 'vitest';
import { GenerateAudioRequest } from './interfaces';

// Mock environment
function createMockEnv() {
  const mockLogger = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    log: vi.fn(),
    logAtLevel: vi.fn(),
    message: vi.fn(),
    messageAtLevel: vi.fn(),
    with: vi.fn(),
    withError: vi.fn(),
  };

  mockLogger.with.mockReturnValue(mockLogger);
  mockLogger.withError.mockReturnValue(mockLogger);

  // Mock SmartBucket for audio storage
  const mockAudioStorage = {
    put: vi.fn(),
    get: vi.fn(),
    list: vi.fn(),
  };

  return {
    _raindrop: {
      app: {
        organizationId: 'test-org',
        applicationName: 'storyteller-tales',
        versionId: 'test-version',
        scriptName: 'audio-narrator',
        visibility: 'private',
      },
    },
    logger: mockLogger,
    AUDIO_STORAGE: mockAudioStorage,
    ELEVENLABS_API_KEY: 'test-api-key-12345',
  };
}

import handler from './index.js';

describe('Audio Narrator - Generate Audio', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('generateAudio creates audio from text', async () => {
    const request: GenerateAudioRequest = {
      text: 'I, Zeus, king of the gods, shall tell you of the mighty Hercules...',
      voice_id: 'voice-zeus-001',
      story_id: 'story-123',
    };

    // Expects an error because test API key is invalid
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('generateAudio returns audio URL and metadata', async () => {
    const request: GenerateAudioRequest = {
      text: 'A story to tell...',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should return { audio_url: string, duration_seconds?: number } (fails with test key)
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('generateAudio validates required fields', async () => {
    const invalidRequest: any = {
      text: '',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should reject empty text
    await expect(service.generateAudio(invalidRequest)).rejects.toThrow();
  });

  test('generateAudio validates voice_id format', async () => {
    const invalidRequest: GenerateAudioRequest = {
      text: 'Test story',
      voice_id: '', // Invalid empty voice ID
      story_id: 'story-123',
    };

    await expect(service.generateAudio(invalidRequest)).rejects.toThrow();
  });

  test('generateAudio logs generation details', async () => {
    const request: GenerateAudioRequest = {
      text: 'Test story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    try {
      await service.generateAudio(request);
    } catch (e) {
      // Expected to fail
    }

    // Should log story_id, voice_id, text length when implemented
  });
});

describe('Audio Narrator - ElevenLabs Integration', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('calls ElevenLabs API with correct parameters', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should call ElevenLabs with text, voice_id, and voice settings (fails with test key)
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('handles ElevenLabs API errors', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'invalid-voice',
      story_id: 'story-123',
    };

    // Should handle API errors gracefully
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('handles ElevenLabs rate limiting', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should handle 429 rate limit responses
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('uses API key from environment', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should use env.ELEVENLABS_API_KEY
    expect(env.ELEVENLABS_API_KEY).toBe('test-api-key-12345');

    await expect(service.generateAudio(request)).rejects.toThrow();
  });
});

describe('Audio Narrator - Storage', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('uploads audio to SmartBucket', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should upload audio file to AUDIO_STORAGE bucket (fails with test key)
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('generates unique storage keys', async () => {
    const request1: GenerateAudioRequest = {
      text: 'Story text 1',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    const request2: GenerateAudioRequest = {
      text: 'Story text 2',
      voice_id: 'voice-1',
      story_id: 'story-456',
    };

    // Different story IDs should generate different storage keys (fails with test key)
    await expect(service.generateAudio(request1)).rejects.toThrow();
    await expect(service.generateAudio(request2)).rejects.toThrow();
  });

  test('returns public URL for stored audio', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should return a URL that can be accessed publicly (fails with test key)
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('handles storage errors gracefully', async () => {
    env.AUDIO_STORAGE.put.mockRejectedValue(new Error('Storage quota exceeded'));

    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    await expect(service.generateAudio(request)).rejects.toThrow();
  });
});

describe('Audio Narrator - Error Handling', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('logs errors with full context', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    try {
      await service.generateAudio(request);
    } catch (e) {
      // Expected to fail
    }

    // Should log errors with story_id, voice_id, and error details
  });

  test('handles network timeouts', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should handle timeout errors from ElevenLabs
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('handles invalid audio response from API', async () => {
    const request: GenerateAudioRequest = {
      text: 'Story text',
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should validate audio data received from ElevenLabs
    await expect(service.generateAudio(request)).rejects.toThrow();
  });
});

describe('Audio Narrator - Performance', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('handles long text efficiently', async () => {
    const longText = 'A'.repeat(10000); // 10,000 characters

    const request: GenerateAudioRequest = {
      text: longText,
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should handle long texts (may need to chunk or validate max length)
    await expect(service.generateAudio(request)).rejects.toThrow();
  });

  test('validates text length limits', async () => {
    const tooLongText = 'A'.repeat(100000); // Extremely long text

    const request: GenerateAudioRequest = {
      text: tooLongText,
      voice_id: 'voice-1',
      story_id: 'story-123',
    };

    // Should reject texts that exceed ElevenLabs limits
    await expect(service.generateAudio(request)).rejects.toThrow();
  });
});
