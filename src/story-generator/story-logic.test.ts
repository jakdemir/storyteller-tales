import { expect, test, describe, beforeEach, vi } from 'vitest';
import { Narrator, Myth, Story } from './interfaces';
import {
  fetchNarratorsFromDatabase,
  fetchMythsFromDatabase,
  fetchMythById,
  fetchNarratorById,
  narrateStory,
  saveStoryToDatabase,
} from './utils';

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

  // Mock SmartSQL database with chainable prepare/bind/all/run pattern
  const createMockPreparedStatement = (mockResults: unknown[] = []) => ({
    bind: vi.fn().mockReturnThis(),
    all: vi.fn().mockResolvedValue({ results: mockResults, success: true, meta: {} }),
    run: vi.fn().mockResolvedValue({ success: true, meta: {} }),
    first: vi.fn().mockResolvedValue(mockResults[0] ?? null),
  });

  const mockPreparedStatement = createMockPreparedStatement();

  const mockDatabase = {
    prepare: vi.fn().mockReturnValue(mockPreparedStatement),
    exec: vi.fn(),
    batch: vi.fn(),
    // Helper to set mock results for next call
    _setMockResults: (results: unknown[]) => {
      const stmt = createMockPreparedStatement(results);
      mockDatabase.prepare.mockReturnValue(stmt);
      return stmt;
    },
  };

  // Mock AI service
  const mockAI = {
    run: vi.fn(),
  };

  // Mock audio-narrator service
  const mockAudioNarrator = {
    generateAudio: vi.fn(),
  };

  return {
    _raindrop: {
      app: {
        organizationId: 'test-org',
        applicationName: 'storyteller-tales',
        versionId: 'test-version',
        scriptName: 'story-generator',
        visibility: 'private',
      },
    },
    logger: mockLogger,
    STORYTELLER_DB: mockDatabase,
    AI: mockAI,
    AUDIO_NARRATOR: mockAudioNarrator,
  };
}

describe('Story Generator - Database Queries', () => {
  let env: any;

  beforeEach(() => {
    env = createMockEnv();
  });

  test('fetchNarratorsFromDatabase retrieves all narrators', async () => {
    const mockNarrators = [
      { id: 'narrator-1', name: 'Zeus', voice_id: 'voice-1', style_description: 'Authoritative and commanding' },
      { id: 'narrator-2', name: 'Athena', voice_id: 'voice-2', style_description: 'Wise and strategic' },
    ];

    env.STORYTELLER_DB._setMockResults(mockNarrators);

    const result = await fetchNarratorsFromDatabase(env);
    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe('Zeus');
  });

  test('fetchMythsFromDatabase retrieves all myths', async () => {
    const mockMyths = [
      { id: 'myth-1', title: 'Hercules', culture: 'Greek', canonical_text: 'Text...' }
    ];
    env.STORYTELLER_DB._setMockResults(mockMyths);

    const result = await fetchMythsFromDatabase(env);
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Hercules');
  });

  test('fetchMythById retrieves specific myth', async () => {
    const mockMyth = { id: 'myth-1', title: 'Hercules', culture: 'Greek', canonical_text: 'Text...' };
    env.STORYTELLER_DB._setMockResults([mockMyth]);

    const result = await fetchMythById(env, 'myth-1');
    expect(result).not.toBeNull();
    expect(result?.id).toBe('myth-1');
  });

  test('fetchMythById returns null for non-existent myth', async () => {
    env.STORYTELLER_DB._setMockResults([]);

    const result = await fetchMythById(env, 'nonexistent');
    expect(result).toBeNull();
  });

  test('fetchNarratorById retrieves specific narrator', async () => {
    const mockNarrator = { id: 'narrator-1', name: 'Zeus', voice_id: 'voice-1', style_description: 'Commanding' };
    env.STORYTELLER_DB._setMockResults([mockNarrator]);

    const result = await fetchNarratorById(env, 'narrator-1');
    expect(result).not.toBeNull();
    expect(result?.name).toBe('Zeus');
  });

  test('fetchNarratorById returns null for non-existent narrator', async () => {
    env.STORYTELLER_DB._setMockResults([]);

    const result = await fetchNarratorById(env, 'nonexistent');
    expect(result).toBeNull();
  });
});

describe('Story Generator - AI Personalization', () => {
  let env: any;

  beforeEach(() => {
    env = createMockEnv();
  });

  test('narrateStory combines narrator style with myth text', async () => {
    const myth: Myth = {
      id: 'myth-1',
      title: 'The Twelve Labors of Hercules',
      culture: 'Greek',
      canonical_text:
        'Hercules was tasked with twelve impossible labors by King Eurystheus...',
    };

    const narrator: Narrator = {
      id: 'narrator-1',
      name: 'Zeus',
      voice_id: 'voice-1',
      style_description: 'Authoritative and commanding, speaking as if from Mount Olympus',
    };

    env.AI.run.mockResolvedValue({ choices: [{ message: { content: 'Narrated story text' } }] });

    const result = await narrateStory(env, myth, narrator);
    expect(result).toBe('Narrated story text');
    expect(env.AI.run).toHaveBeenCalled();
  });

  test('narrateStory logs AI interactions', async () => {
    const myth: Myth = {
      id: 'myth-1',
      title: 'The Twelve Labors',
      culture: 'Greek',
      canonical_text: 'Hercules completed twelve labors...',
    };

    const narrator: Narrator = {
      id: 'narrator-1',
      name: 'Zeus',
      voice_id: 'voice-1',
      style_description: 'Authoritative',
    };

    try {
      await narrateStory(env, myth, narrator);
    } catch (e) {
      // Expected to fail
    }

    // Should log AI request details when implemented
  });

  test('narrateStory handles AI service errors gracefully', async () => {
    const myth: Myth = {
      id: 'myth-1',
      title: 'Test Myth',
      culture: 'Greek',
      canonical_text: 'Test content',
    };

    const narrator: Narrator = {
      id: 'narrator-1',
      name: 'Zeus',
      voice_id: 'voice-1',
      style_description: 'Test style',
    };

    env.AI.run.mockRejectedValue(new Error('AI service unavailable'));

    // Will fail until implemented with proper error handling
    await expect(narrateStory(env, myth, narrator)).rejects.toThrow();
  });

  test('narrateStory validates inputs', async () => {
    // Test empty canonical text
    const invalidMyth: Myth = {
      id: 'myth-1',
      title: 'Test',
      culture: 'Greek',
      canonical_text: '',
    };

    const narrator: Narrator = {
      id: 'narrator-1',
      name: 'Zeus',
      voice_id: 'voice-1',
      style_description: 'Authoritative',
    };

    // Will fail until implemented with validation
    await expect(narrateStory(env, invalidMyth, narrator)).rejects.toThrow();
  });
});

describe('Story Generator - Story Persistence', () => {
  let env: any;

  beforeEach(() => {
    env = createMockEnv();
  });

  test('saveStoryToDatabase stores story with generated ID', async () => {
    const storyData = {
      myth_id: 'myth-1',
      narrator_id: 'narrator-1',
      personalized_text: 'I, Zeus, shall tell you...',
      audio_url: 'https://example.com/audio.mp3',
    };

    // Mock already returns successful run() by default
    const story = await saveStoryToDatabase(env, storyData);
    expect(story.id).toBeDefined();
    expect(story.myth_id).toBe('myth-1');
    expect(env.STORYTELLER_DB.prepare).toHaveBeenCalled();
  });

  test('saveStoryToDatabase generates unique IDs', async () => {
    const storyData = {
      myth_id: 'myth-1',
      narrator_id: 'narrator-1',
      personalized_text: 'Test story',
    };

    const story = await saveStoryToDatabase(env, storyData);
    expect(story.id).toBeDefined();
    expect(story.id.length).toBeGreaterThan(0);
  });

  test('saveStoryToDatabase handles database errors', async () => {
    const storyData = {
      myth_id: 'myth-1',
      narrator_id: 'narrator-1',
      personalized_text: 'Test story',
    };

    // Mock a rejected run() call
    const mockStmt = {
      bind: vi.fn().mockReturnThis(),
      run: vi.fn().mockRejectedValue(new Error('Database error')),
      all: vi.fn(),
    };
    env.STORYTELLER_DB.prepare.mockReturnValue(mockStmt);

    await expect(saveStoryToDatabase(env, storyData)).rejects.toThrow();
  });
});

describe('Story Generator - Service Methods', () => {
  let env: any;

  beforeEach(() => {
    env = createMockEnv();
  });

  test('getNarrators service method calls database', async () => {
    // Test that the service properly exposes getNarrators
    // Will fail until implemented in index.ts
    const request = new Request('https://internal/getNarrators');

    // This will be called from api-gateway via env.STORY_GENERATOR.getNarrators()
  });

  test('getMyths service method calls database', async () => {
    // Test that the service properly exposes getMyths
    // Will fail until implemented in index.ts
  });

  test('generateStory service method orchestrates full workflow', async () => {
    // Test the full story generation workflow:
    // 1. Fetch myth from database
    // 2. Fetch narrator from database
    // 3. Personalize story using AI
    // 4. Generate audio using audio-narrator service
    // 5. Save story to database
    // 6. Return complete story

    // Will fail until implemented
  });

  test('generateStory validates myth and narrator exist', async () => {
    // Should return proper error if myth or narrator not found
    // Will fail until implemented
  });

  test('generateStory continues if audio generation fails', async () => {
    // Story should be saved even if audio generation fails
    // Audio URL should be null/undefined in that case
    // Will fail until implemented
  });
});

describe('Story Generator - Error Handling', () => {
  let env: any;

  beforeEach(() => {
    env = createMockEnv();
  });

  test('logs database connection errors', async () => {
    // Mock a rejected all() call
    const mockStmt = {
      bind: vi.fn().mockReturnThis(),
      all: vi.fn().mockRejectedValue(new Error('Connection timeout')),
      run: vi.fn(),
    };
    env.STORYTELLER_DB.prepare.mockReturnValue(mockStmt);

    try {
      await fetchNarratorsFromDatabase(env);
    } catch (e) {
      // Expected to fail
    }

    // Should log error details when implemented
  });

  test('handles concurrent story generation requests', async () => {
    // Test that multiple simultaneous generateStory calls don't interfere
    // Will fail until implemented with proper isolation
  });
});
