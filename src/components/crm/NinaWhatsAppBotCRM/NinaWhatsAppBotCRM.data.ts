/**
 * NinaWhatsAppBotCRM — Static Data & Constants
 * Mary Allen Wilkes Protocol Layer: Data
 */

// ─── Default Hardware Binding ─────────────────────────────────────────────────
export const NINA_DEFAULT_PHONE = '+971 50 576 0056';
export const NINA_DEFAULT_PAIRING_CODE = 'WC-5760-056A';
export const NINA_DEFAULT_BATTERY_LEVEL = 88;
export const NINA_DEFAULT_SIGNAL_QUALITY = 98;

// ─── Character Sprite Asset ───────────────────────────────────────────────────
export const NINA_CHARACTER_SPRITE =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&q=80';

// ─── QR Code Generation URL ───────────────────────────────────────────────────
export const NINA_QR_CODE_URL =
  `https://api.qrserver.com/v1/create-qr-code/?size=300x300` +
  `&data=https://wa.me/971505760056?text=WhiteCaves-Nina-AI-Core-Verified-Session`;

// ─── MD Authorization Emails/Roles ───────────────────────────────────────────
export const MD_AUTHORIZED_EMAILS = [
  'arslanmalikgoraha@gmail.com',
  'the.white.caves@gmail.com',
] as const;

export const MD_AUTHORIZED_ROLES = ['md', 'owner', 'superuser'] as const;

// ─── API Pairing Endpoint ─────────────────────────────────────────────────────
export const NINA_PAIR_CODE_ENDPOINT = '/api/whatsapp-engine/nina-md-primary/pair-code';
export const NINA_STATUS_ENDPOINT = '/api/whatsapp-engine/nina-md-primary/status';

// ─── Stage 2 Feature Tab Definitions ─────────────────────────────────────────
export const STAGE2_FEATURE_TABS = [
  { key: 'autoreply', label: 'Live Interception Feed', icon: 'MessageSquare' },
  { key: 'native', label: 'VIP Intelligence', icon: 'Terminal' },
  { key: 'analytics', label: 'Daily MD Briefing', icon: 'ShieldCheck' },
  { key: 'settings', label: 'Executive Settings', icon: 'Sliders' },
] as const;

// ─── RUP Stage Labels ─────────────────────────────────────────────────────────
export const RUP_STAGE_LABELS = {
  1: 'Stage 1: Device Auth & Inception',
  2: 'Stage 2: Feature Matrix & Config',
  3: 'Stage 3: Live Conversations & Results',
} as const;

// ─── Nina Speech Intro Texts ──────────────────────────────────────────────────
export const NINA_SPEECH = {
  BOOT: 'WELCOME TO NINA AI ASSISTANT! STAGE 1 INCEPTION: PLEASE CONFIRM HARDWARE CONNECTION ON +971 50 576 0056!',
  STAGE1_LOCKED: 'SWITCHING TO STAGE 1: HARDWARE CONNECTION PORTAL',
  STAGE2_LOCKED: 'STAGE 2 LOCKED! PLEASE CONFIRM HARDWARE CONNECTION IN STAGE 1 FIRST!',
  STAGE2_ACTIVE: 'SWITCHING TO STAGE 2: FEATURE MATRIX & ELABORATION',
  STAGE3_LOCKED: 'STAGE 3 LOCKED! PLEASE CONFIRM HARDWARE CONNECTION IN STAGE 1 FIRST!',
  STAGE3_ACTIVE: 'SWITCHING TO STAGE 3: LIVE CONVERSATIONS & RESULTS',
  GATEWAY_SECURED: 'GATEWAY CONNECTION FULLY SECURED! UNLOCKING STAGE 2 FEATURE MATRIX!',
  AUTH_WAIT: 'AUTHENTICATION REQUEST VALIDATED! WAITING FOR HARDWARE LINK...',
  AUDIO_ACTIVE: 'NINA VOICE SYNTHESIZER AUDIO ACTIVE!',
  STAGE3_LAUNCH: 'FEATURE SELECTION CONFIRMED! LAUNCHING STAGE 3 CONVERSATIONS INBOX!',
} as const;

// ─── Polling Interval (ms) ────────────────────────────────────────────────────
export const STATUS_POLL_INTERVAL_MS = 3000;

// ─── Max handshake log entries to keep in memory ─────────────────────────────
export const MAX_HANDSHAKE_LOG_ENTRIES = 9;

