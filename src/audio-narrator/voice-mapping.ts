// Voice mapping from narrator IDs to Google Cloud TTS Turkish voices

/**
 * Map narrator IDs to Google Cloud TTS Turkish voice names
 * Using Turkish Wavenet voices for authentic narration
 */
export const VOICE_MAPPING: Record<string, string> = {
    // Elder Sage - Male, authoritative, deep voice
    'narrator-1': 'tr-TR-Wavenet-B',

    // Village Grandmother - Male, warm voice (closest to grandmother storytelling)
    'narrator-2': 'tr-TR-Wavenet-E',

    // Mystical Oracle - Female, mysterious voice
    'narrator-3': 'tr-TR-Wavenet-D',
};

/**
 * Get Google Cloud TTS Turkish voice name for a given narrator ID
 * Falls back to default Turkish voice if mapping not found
 */
export function getGoogleVoice(narratorId: string): string {
    return VOICE_MAPPING[narratorId] || 'tr-TR-Wavenet-B'; // Default to Elder Sage voice
}

/**
 * Available Google Cloud TTS Turkish voices for reference
 */
export const AVAILABLE_TURKISH_VOICES = {
    // Male voices
    'tr-TR-Wavenet-B': 'Male voice (deep, authoritative)',
    'tr-TR-Wavenet-E': 'Male voice (warm, storytelling)',

    // Female voices
    'tr-TR-Wavenet-A': 'Female voice 1',
    'tr-TR-Wavenet-C': 'Female voice 2',
    'tr-TR-Wavenet-D': 'Female voice (soft, mysterious)',
};
