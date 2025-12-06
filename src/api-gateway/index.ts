import { Service } from '@liquidmetal-ai/raindrop-framework';
import { Hono, type ExecutionContext } from 'hono';
import { Env } from './raindrop.gen';
import { GenerateStoryRequest } from './interfaces';
import { extractErrorMessage, isNotFoundError, isServiceUnavailableError } from './utils';

// CORS configuration
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
} as const;

// Create Hono app with middleware
const app = new Hono<{ Bindings: Env }>();

/**
 * CORS middleware - adds CORS headers to all responses
 */
app.use('*', async (c, next) => {
  await next();
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    c.header(key, value);
  });
});

/**
 * Handle OPTIONS preflight requests for CORS
 */
app.options('*', (c) => c.json({}, 200));

/**
 * Request logging middleware - logs all requests with duration
 */
app.use('*', async (c, next) => {
  const start = Date.now();
  const { url, method } = c.req;

  await next();

  c.env?.logger?.info(`${method} ${url}`, {
    status: c.res.status,
    duration: `${Date.now() - start}ms`,
  });
});

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * GET /api/narrators - Retrieve list of available narrators
 */
app.get('/api/narrators', async (c) => {
  try {
    c.env?.logger?.info('Fetching narrators');
    const narrators = await c.env.STORY_GENERATOR.getNarrators();
    return c.json({ narrators });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    c.env?.logger?.error('Failed to fetch narrators', { error: errorMessage });
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * GET /api/myths - Retrieve list of available myths
 */
app.get('/api/myths', async (c) => {
  try {
    c.env?.logger?.info('Fetching myths');
    const myths = await c.env.STORY_GENERATOR.getMyths();
    return c.json({ myths });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    c.env?.logger?.error('Failed to fetch myths', { error: errorMessage });
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * POST /api/stories/generate - Generate a new personalized story
 */
app.post('/api/stories/generate', async (c) => {
  try {
    const body = await c.req.json();

    // Validate required fields
    if (!body.myth_id || !body.narrator_id) {
      return c.json({ error: 'Missing required fields: myth_id and narrator_id' }, 400);
    }

    const request: GenerateStoryRequest = {
      myth_id: body.myth_id,
      narrator_id: body.narrator_id,
    };

    c.env?.logger?.info('Generating story', { myth_id: request.myth_id, narrator_id: request.narrator_id });

    const story = await c.env.STORY_GENERATOR.generateStory(request);

    return c.json({ story }, 201);
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    c.env?.logger?.error('Failed to generate story', { error: errorMessage });

    // Map error types to appropriate HTTP status codes
    if (isNotFoundError(errorMessage)) {
      return c.json({ error: errorMessage }, 404);
    }

    if (isServiceUnavailableError(errorMessage)) {
      return c.json({ error: 'AI service unavailable' }, 503);
    }

    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * GET /api/stories/:id - Retrieve a specific story by ID
 */
app.get('/api/stories/:id', async (c) => {
  const storyId = c.req.param('id');

  try {
    c.env?.logger?.info('Fetching story', { story_id: storyId });

    const result = await c.env.STORYTELLER_DB.prepare(
      `SELECT id, narrator_id, myth_id, generated_story as personalized_text, audio_url, created_at
       FROM stories WHERE id = ? LIMIT 1`
    ).bind(storyId).all<{
      id: string;
      narrator_id: string;
      myth_id: string;
      personalized_text: string;
      audio_url: string | null;
      created_at: number;
    }>();

    const row = result.results[0];
    if (!row) {
      return c.json({ error: 'Story not found' }, 404);
    }

    const story = {
      id: row.id,
      myth_id: row.myth_id,
      narrator_id: row.narrator_id,
      personalized_text: row.personalized_text,
      audio_url: row.audio_url ?? undefined,
      created_at: new Date(row.created_at).toISOString(),
    };

    return c.json({ story });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    c.env?.logger?.error('Failed to fetch story', {
      story_id: storyId,
      error: errorMessage,
    });
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Serve audio files from bucket
app.get('/api/audio/:key{.+}', async (c) => {
  const key = c.req.param('key');

  c.env?.logger?.info('Serving audio file', { key });

  try {
    // Get audio file from bucket
    const audioFile = await c.env.AUDIO_STORAGE.get(key);

    if (!audioFile) {
      c.env?.logger?.warn('Audio file not found', { key });
      return c.json({ error: 'Audio file not found' }, 404);
    }

    // Return audio file with proper headers
    return new Response(audioFile.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000',
        ...CORS_HEADERS,
      },
    });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    c.env?.logger?.error('Failed to serve audio file', {
      key,
      error: errorMessage,
    });

    return c.json({ error: 'Failed to serve audio file' }, 500);
  }
});


/**
 * POST /admin/seed-myths - Seed database with curated myths (ADMIN ONLY)
 * This endpoint clears existing myths and loads the 10 curated myths
 */
app.post('/admin/seed-myths', async (c) => {
  try {
    const { CURATED_MYTHS } = await import('./seed-data');

    c.env?.logger?.info('Starting database seed with curated myths');

    // First, add language columns if they don't exist
    try {
      await c.env.STORYTELLER_DB.prepare(
        'ALTER TABLE myths ADD COLUMN language TEXT NOT NULL DEFAULT \'en\''
      ).run();
      c.env?.logger?.info('Added language column to myths table');
    } catch (e) {
      // Column might already exist, ignore error
      c.env?.logger?.info('Language column already exists or error adding it');
    }

    try {
      await c.env.STORYTELLER_DB.prepare(
        'ALTER TABLE myths ADD COLUMN summary TEXT'
      ).run();
      c.env?.logger?.info('Added summary column to myths table');
    } catch (e) {
      // Column might already exist, ignore error
      c.env?.logger?.info('Summary column already exists or error adding it');
    }

    try {
      await c.env.STORYTELLER_DB.prepare(
        'ALTER TABLE myths ADD COLUMN tags TEXT'
      ).run();
      c.env?.logger?.info('Added tags column to myths table');
    } catch (e) {
      // Column might already exist, ignore error
      c.env?.logger?.info('Tags column already exists or error adding it');
    }

    // Clear existing myths (delete stories first due to foreign key constraint)
    await c.env.STORYTELLER_DB.prepare('DELETE FROM stories').run();
    c.env?.logger?.info('Cleared existing stories');

    await c.env.STORYTELLER_DB.prepare('DELETE FROM myths').run();
    c.env?.logger?.info('Cleared existing myths');

    // Insert curated myths
    let inserted = 0;
    for (const myth of CURATED_MYTHS) {
      await c.env.STORYTELLER_DB.prepare(
        `INSERT INTO myths (id, name, cultural_origin, official_text, language, summary, tags)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        myth.id,
        myth.name,
        myth.cultural_origin,
        myth.official_text,
        myth.language,
        myth.summary,
        myth.tags
      ).run();
      inserted++;
    }

    c.env?.logger?.info('Database seeded successfully', { myths_inserted: inserted });

    return c.json({
      success: true,
      message: `Successfully seeded ${inserted} curated myths`,
      myths: CURATED_MYTHS.map(m => ({ id: m.id, name: m.name, language: m.language }))
    });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    c.env?.logger?.error('Failed to seed database', { error: errorMessage });
    return c.json({ error: 'Failed to seed database', details: errorMessage }, 500);
  }
});

// === Service Handler ===

export default class extends Service<Env> {
  async fetch(request: Request): Promise<Response> {
    // Pass this.env (from Service class) and this.ctx to Hono
    return app.fetch(request, this.env, this.ctx as ExecutionContext);
  }
}