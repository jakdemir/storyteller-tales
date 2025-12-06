import { expect, test, describe, beforeEach, vi } from 'vitest';
import { Narrator, Myth, Story } from './interfaces';

// Mock environment for testing
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

  // Mock story-generator service
  const mockStoryGenerator = {
    getNarrators: vi.fn(),
    getMyths: vi.fn(),
    generateStory: vi.fn(),
  };

  // Mock audio-narrator service
  const mockAudioNarrator = {
    generateAudio: vi.fn(),
  };

  // Mock database with chainable prepare/bind/all pattern
  const createMockPreparedStatement = (mockResults: unknown[] = []) => ({
    bind: vi.fn().mockReturnThis(),
    all: vi.fn().mockResolvedValue({ results: mockResults, success: true, meta: {} }),
    run: vi.fn().mockResolvedValue({ success: true, meta: {} }),
    first: vi.fn().mockResolvedValue(mockResults[0] ?? null),
  });

  const mockDatabase = {
    prepare: vi.fn().mockReturnValue(createMockPreparedStatement()),
    exec: vi.fn(),
    batch: vi.fn(),
    _setMockResults: (results: unknown[]) => {
      const stmt = createMockPreparedStatement(results);
      mockDatabase.prepare.mockReturnValue(stmt);
      return stmt;
    },
  };

  return {
    _raindrop: {
      app: {
        organizationId: 'test-org',
        applicationName: 'storyteller-tales',
        versionId: 'test-version',
        scriptName: 'api-gateway',
        visibility: 'public',
      },
    },
    logger: mockLogger,
    STORY_GENERATOR: mockStoryGenerator,
    AUDIO_NARRATOR: mockAudioNarrator,
    STORYTELLER_DB: mockDatabase,
  };
}

import handler from './index.js';

describe('API Gateway - Narrators Endpoint', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('GET /api/narrators returns list of narrators', async () => {
    const mockNarrators: Narrator[] = [
      {
        id: 'narrator-1',
        name: 'Zeus',
        voice_id: 'voice-1',
        style_description: 'Authoritative and commanding',
      },
      {
        id: 'narrator-2',
        name: 'Athena',
        voice_id: 'voice-2',
        style_description: 'Wise and strategic',
      },
    ];

    env.STORY_GENERATOR.getNarrators.mockResolvedValue(mockNarrators);

    const request = new Request('https://example.com/api/narrators', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('narrators');
    expect(Array.isArray(data.narrators)).toBe(true);
    expect(data.narrators).toHaveLength(2);
    expect(data.narrators[0]).toHaveProperty('id');
    expect(data.narrators[0]).toHaveProperty('name');
    expect(data.narrators[0]).toHaveProperty('voice_id');
  });

  test('GET /api/narrators handles empty list', async () => {
    env.STORY_GENERATOR.getNarrators.mockResolvedValue([]);

    const request = new Request('https://example.com/api/narrators', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.narrators).toEqual([]);
  });

  test('GET /api/narrators handles service errors', async () => {
    env.STORY_GENERATOR.getNarrators.mockRejectedValue(
      new Error('Database connection failed')
    );

    const request = new Request('https://example.com/api/narrators', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.status).toBe(500);
    expect(env.logger.error).toHaveBeenCalled();
  });
});

describe('API Gateway - Myths Endpoint', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('GET /api/myths returns list of myths', async () => {
    const mockMyths: Myth[] = [
      {
        id: 'myth-1',
        title: 'The Twelve Labors of Hercules',
        culture: 'Greek',
        canonical_text: 'Hercules was tasked with twelve impossible labors...',
      },
      {
        id: 'myth-2',
        title: 'The Odyssey',
        culture: 'Greek',
        canonical_text: 'Odysseus journeyed home after the Trojan War...',
      },
    ];

    env.STORY_GENERATOR.getMyths.mockResolvedValue(mockMyths);

    const request = new Request('https://example.com/api/myths', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('myths');
    expect(Array.isArray(data.myths)).toBe(true);
    expect(data.myths).toHaveLength(2);
    expect(data.myths[0]).toHaveProperty('id');
    expect(data.myths[0]).toHaveProperty('title');
    expect(data.myths[0]).toHaveProperty('culture');
  });

  test('GET /api/myths handles empty list', async () => {
    env.STORY_GENERATOR.getMyths.mockResolvedValue([]);

    const request = new Request('https://example.com/api/myths', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.myths).toEqual([]);
  });

  test('GET /api/myths handles service errors', async () => {
    env.STORY_GENERATOR.getMyths.mockRejectedValue(
      new Error('Database connection failed')
    );

    const request = new Request('https://example.com/api/myths', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.status).toBe(500);
    expect(env.logger.error).toHaveBeenCalled();
  });
});

describe('API Gateway - Generate Story Endpoint', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('POST /api/stories/generate creates new story', async () => {
    const mockStory: Story = {
      id: 'story-1',
      myth_id: 'myth-1',
      narrator_id: 'narrator-1',
      personalized_text: 'I, Zeus, shall tell you of the mighty Hercules...',
      audio_url: 'https://example.com/audio/story-1.mp3',
      created_at: '2025-12-05T00:00:00Z',
    };

    env.STORY_GENERATOR.generateStory.mockResolvedValue(mockStory);

    const request = new Request('https://example.com/api/stories/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        myth_id: 'myth-1',
        narrator_id: 'narrator-1',
      }),
    });

    const response = await service.fetch(request, env, ctx);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty('story');
    expect(data.story).toHaveProperty('id');
    expect(data.story).toHaveProperty('personalized_text');
    expect(data.story).toHaveProperty('audio_url');
  });

  test('POST /api/stories/generate validates required fields', async () => {
    const request = new Request('https://example.com/api/stories/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        myth_id: 'myth-1',
        // Missing narrator_id
      }),
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.status).toBe(400);
  });

  test('POST /api/stories/generate handles invalid myth_id', async () => {
    env.STORY_GENERATOR.generateStory.mockRejectedValue(
      new Error('Myth not found')
    );

    const request = new Request('https://example.com/api/stories/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        myth_id: 'invalid-myth',
        narrator_id: 'narrator-1',
      }),
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.status).toBe(404);
  });

  test('POST /api/stories/generate handles AI service unavailable', async () => {
    env.STORY_GENERATOR.generateStory.mockRejectedValue(
      new Error('AI service unavailable')
    );

    const request = new Request('https://example.com/api/stories/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        myth_id: 'myth-1',
        narrator_id: 'narrator-1',
      }),
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.status).toBe(503);
  });
});

describe('API Gateway - Get Story Endpoint', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('GET /api/stories/:id returns story by ID', async () => {
    // Mock database response with the row data
    env.STORYTELLER_DB._setMockResults([{
      id: 'story-1',
      myth_id: 'myth-1',
      narrator_id: 'narrator-1',
      personalized_text: 'I, Zeus, shall tell you of the mighty Hercules...',
      audio_url: 'https://example.com/audio/story-1.mp3',
      created_at: Date.now(),
    }]);

    const request = new Request('https://example.com/api/stories/story-1', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.status).toBe(200);
  });

  test('GET /api/stories/:id returns 404 for non-existent story', async () => {
    // Mock empty database response
    env.STORYTELLER_DB._setMockResults([]);

    const request = new Request('https://example.com/api/stories/nonexistent', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.status).toBe(404);
  });
});

describe('API Gateway - CORS Headers', () => {
  let service: any;
  let env: any;
  let ctx: any;

  beforeEach(() => {
    env = createMockEnv();
    ctx = { waitUntil: () => Promise.resolve() };
    service = new handler(ctx, env);
  });

  test('API responses include CORS headers', async () => {
    env.STORY_GENERATOR.getNarrators.mockResolvedValue([]);

    const request = new Request('https://example.com/api/narrators', {
      method: 'GET',
    });

    const response = await service.fetch(request, env, ctx);

    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
    expect(response.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
  });

  test('OPTIONS requests handled for CORS preflight', async () => {
    const request = new Request('https://example.com/api/stories/generate', {
      method: 'OPTIONS',
    });

    const response = await service.fetch(request, env, ctx);

    expect([200, 204]).toContain(response.status);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});
