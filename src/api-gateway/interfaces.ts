// API Gateway Interfaces

export interface Narrator {
  id: string;
  name: string;
  voice_id: string;
  style_description: string;
}

export interface Myth {
  id: string;
  title: string;
  culture: string;
  canonical_text: string;
}

export interface Story {
  id: string;
  myth_id: string;
  narrator_id: string;
  personalized_text: string;
  audio_url?: string;
  created_at: string;
}

export interface GenerateStoryRequest {
  myth_id: string;
  narrator_id: string;
}

export interface GenerateStoryResponse {
  story: Story;
}
