// Audio Narrator Interfaces

export interface GenerateAudioRequest {
  text: string;
  voice_id: string;
  story_id: string;
}

export interface GenerateAudioResponse {
  audio_url: string;
  duration_seconds?: number;
}

export interface ElevenLabsConfig {
  api_key: string;
  api_base_url: string;
}

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
}
