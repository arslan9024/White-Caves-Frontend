export type KairosTabId = 'golden-visa' | 'crypto' | 'chauffeur' | 'family-office';

export type CryptoAsset = 'BTC' | 'ETH' | 'USDT';

export interface KairosLuxuryCRMProps {
  moduleId?: string;
  role?: string;
  user?: Record<string, unknown>;
}

export interface VipGuest {
  id: string;
  client: string;
  service: string;
  date: string;
  itinerary: string;
  status: string;
}

export interface KairosTabOption {
  id: KairosTabId;
  label: string;
}
