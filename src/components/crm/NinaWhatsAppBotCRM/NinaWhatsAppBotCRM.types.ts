/**
 * NinaWhatsAppBotCRM — Type Definitions
 * Mary Allen Wilkes Protocol Layer: Types
 */

// ─── RUP 3-Stage Phase Gate ───────────────────────────────────────────────────
export type RUPStage = 1 | 2 | 3;

// ─── WhatsApp Gateway Connection Status ──────────────────────────────────────
export type GatewayStatus = 'UNLINKED_ERROR' | 'ESTABLISHING_LINK_STREAM' | 'LIVE_CONNECTED_STREAM';

// ─── Pairing Authentication Method ───────────────────────────────────────────
export type PairingMethod = 'pairingCode' | 'qr';

// ─── Feature Tab Keys (Stage 2) ──────────────────────────────────────────────
export type FeatureTabKey =
  | 'autoreply'
  | 'engine'
  | 'sessions'
  | 'bots'
  | 'code'
  | 'analytics'
  | 'settings'
  | 'features'
  | 'lifecycle';

// ─── Nina Logic State Shape ───────────────────────────────────────────────────
export interface NinaLogicState {
  currentStage: RUPStage;
  isConnected: boolean;
  selectedFeatureTab: FeatureTabKey;
  phoneNumber: string;
  pairingCode: string;
  copiedCode: boolean;
  pairingMethod: PairingMethod;
  isGenerating: boolean;
  gatewayStatus: GatewayStatus;
  isAudioMuted: boolean;
  subtitleText: string | null;
  batteryLevel: number;
  signalQuality: number;
  handshakeLogs: string[];
  characterSprite: string;
  isMDAuthorized: boolean;
}

// ─── Nina Logic Actions ───────────────────────────────────────────────────────
export interface NinaLogicActions {
  setCurrentStage: (stage: RUPStage) => void;
  setSelectedFeatureTab: (tab: FeatureTabKey) => void;
  setPairingMethod: (method: PairingMethod) => void;
  toggleAudioMute: () => void;
  handleCopyPairingCode: () => void;
  handleRegeneratePairingCode: () => Promise<void>;
  initiateDeviceLinkSequence: () => void;
  addHandshakeLog: (msg: string) => void;
}
