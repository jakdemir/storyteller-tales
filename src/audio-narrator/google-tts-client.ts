// Google Cloud Text-to-Speech API Client

export interface VoiceSettings {
    languageCode?: string;
    pitch?: number;
    speakingRate?: number;
}

// Default API configuration
const DEFAULT_BASE_URL = 'https://texttospeech.googleapis.com/v1';
const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
    languageCode: 'en-US',
    pitch: 0,
    speakingRate: 1.0,
};

// API constraints
const MAX_TEXT_LENGTH = 5000;

/**
 * Google Cloud Text-to-Speech API Client
 * Uses service account credentials for authentication
 */
export class GoogleTTSClient {
    private readonly credentials: any;
    private readonly baseUrl: string;
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;

    constructor(credentialsJson: string, baseUrl = DEFAULT_BASE_URL) {
        try {
            this.credentials = JSON.parse(credentialsJson);
            this.baseUrl = baseUrl;
        } catch (error) {
            throw new Error('Invalid service account credentials JSON');
        }
    }

    /**
     * Get OAuth2 access token using service account credentials
     * Implements JWT signing with RS256 and token exchange
     */
    private async getAccessToken(): Promise<string> {
        // Return cached token if still valid (with 5 min buffer)
        if (this.accessToken && Date.now() < this.tokenExpiry - 300000) {
            return this.accessToken;
        }

        try {
            // Create JWT header and payload
            const now = Math.floor(Date.now() / 1000);
            const header = {
                alg: 'RS256',
                typ: 'JWT',
            };

            const payload = {
                iss: this.credentials.client_email,
                scope: 'https://www.googleapis.com/auth/cloud-platform',
                aud: 'https://oauth2.googleapis.com/token',
                exp: now + 3600,
                iat: now,
            };

            // Base64URL encode header and payload
            const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
            const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
            const unsignedToken = `${encodedHeader}.${encodedPayload}`;

            // Sign the JWT with the service account private key
            const signature = await this.signJWT(unsignedToken, this.credentials.private_key);
            const jwt = `${unsignedToken}.${signature}`;

            // Exchange JWT for access token
            const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    assertion: jwt,
                }),
            });

            if (!tokenResponse.ok) {
                const errorText = await tokenResponse.text();
                throw new Error(`OAuth2 token exchange failed: ${tokenResponse.status} - ${errorText}`);
            }

            const tokenData = await tokenResponse.json() as { access_token: string; expires_in: number };

            this.accessToken = tokenData.access_token;
            this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000);

            console.log('🔍 DEBUG: OAuth2 token obtained', {
                expires_in: tokenData.expires_in,
                token_preview: this.accessToken.substring(0, 20) + '...',
            });

            return this.accessToken;
        } catch (error) {
            console.error('🚨 Failed to get OAuth2 access token:', error);
            throw new Error(`Failed to obtain access token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Base64URL encode a string
     */
    private base64UrlEncode(str: string): string {
        const base64 = btoa(str);
        return base64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    /**
     * Sign JWT using RSA-SHA256 with the service account private key
     */
    private async signJWT(data: string, privateKeyPem: string): Promise<string> {
        // Extract the key content from PEM format
        const pemHeader = '-----BEGIN PRIVATE KEY-----';
        const pemFooter = '-----END PRIVATE KEY-----';
        const pemContents = privateKeyPem
            .replace(pemHeader, '')
            .replace(pemFooter, '')
            .replace(/\s/g, '');

        // Decode base64 to binary
        const binaryDer = atob(pemContents);
        const binaryDerArray = new Uint8Array(binaryDer.length);
        for (let i = 0; i < binaryDer.length; i++) {
            binaryDerArray[i] = binaryDer.charCodeAt(i);
        }

        // Import the private key
        const key = await crypto.subtle.importKey(
            'pkcs8',
            binaryDerArray,
            {
                name: 'RSASSA-PKCS1-v1_5',
                hash: 'SHA-256',
            },
            false,
            ['sign']
        );

        // Sign the data
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const signatureBuffer = await crypto.subtle.sign(
            'RSASSA-PKCS1-v1_5',
            key,
            dataBuffer
        );

        // Convert signature to base64url
        const signatureArray = new Uint8Array(signatureBuffer);
        let binary = '';
        for (let i = 0; i < signatureArray.length; i++) {
            binary += String.fromCharCode(signatureArray[i]!); // Non-null assertion: i is within bounds
        }
        const base64 = btoa(binary);
        return base64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    /**
     * Convert text to speech using Google Cloud TTS API
     * @throws {Error} if request fails or validation fails
     */
    async textToSpeech(
        text: string,
        voiceId: string,
        settings?: VoiceSettings
    ): Promise<ArrayBuffer> {
        this.validateTextInput(text);

        const accessToken = await this.getAccessToken();
        const url = `${this.baseUrl}/text:synthesize`;
        const voiceSettings = { ...DEFAULT_VOICE_SETTINGS, ...settings };

        const requestBody = {
            input: {
                text: text,
            },
            voice: {
                languageCode: voiceSettings.languageCode,
                name: voiceId,
            },
            audioConfig: {
                audioEncoding: 'MP3',
                pitch: voiceSettings.pitch,
                speakingRate: voiceSettings.speakingRate,
            },
        };

        console.log('🔍 DEBUG: Google TTS request', {
            url,
            voice_id: voiceId,
            text_length: text.length,
            has_token: !!accessToken,
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log('🔍 DEBUG: Google TTS response', {
                status: response.status,
                ok: response.ok,
                content_type: response.headers.get('content-type'),
            });

            this.handleResponseErrors(response);

            const jsonResponse = await response.json() as { audioContent?: string };

            console.log('🔍 DEBUG: Google TTS JSON received', {
                has_audio_content: !!jsonResponse.audioContent,
                audio_content_length: jsonResponse.audioContent?.length || 0,
            });

            if (!jsonResponse.audioContent) {
                throw new Error('No audio content in response');
            }

            // Decode base64 audio content to ArrayBuffer
            const audioBase64 = jsonResponse.audioContent;
            const binaryString = atob(audioBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const arrayBuffer = bytes.buffer;

            console.log('🔍 DEBUG: Audio data decoded', {
                size: arrayBuffer.byteLength,
            });

            if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                throw new Error('Invalid audio response from API');
            }

            return arrayBuffer;
        } catch (error) {
            console.error('🚨 Google TTS API error:', error);
            if (error instanceof TypeError) {
                throw new Error('Network error: Unable to reach Google Cloud TTS API');
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
     * Handle HTTP response errors from Google Cloud TTS API
     * @throws {Error} if response indicates an error
     */
    private handleResponseErrors(response: Response): void {
        if (response.ok) {
            return;
        }

        const errorMap: Record<number, string> = {
            400: 'Bad Request: Invalid parameters',
            401: 'Unauthorized: Invalid API key',
            403: 'Forbidden: API not enabled or quota exceeded',
            404: 'Not Found: Invalid voice or endpoint',
            429: 'Rate limit exceeded',
        };

        const errorMessage = errorMap[response.status] ?? `Google Cloud TTS API error: ${response.status}`;
        throw new Error(errorMessage);
    }
}
