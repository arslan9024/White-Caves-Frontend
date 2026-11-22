import type { CryptoAsset, KairosTabId, KairosTabOption, VipGuest } from './types';

export const GOLDEN_VISA_MIN_EQUITY_AED = 2000000;

export const CRYPTO_RATES_AED: Record<CryptoAsset, number> = {
  BTC: 245000,
  ETH: 12500,
  USDT: 3.6725,
};

export const KAIROS_TABS: KairosTabOption[] = [
  { id: 'golden-visa', label: '3.25.1 UAE Golden Visa Eligibility Tool' },
  { id: 'crypto', label: '3.25.2 Real Estate Crypto FX Simulator' },
  { id: 'chauffeur', label: '3.25.3 Private Jet & Chauffeur Desk' },
  { id: 'family-office', label: '3.25.4 Family Office Strategy Deck' },
];

export const INITIAL_VIP_GUESTS: VipGuest[] = [
  {
    id: 'VIP-01',
    client: 'Sheikh Mansoor Family Office',
    service: 'Rolls Royce Phantom Chauffeur',
    date: '2026-08-26',
    itinerary: 'Emirates Hills Mansions',
    status: 'CONFIRMED',
  },
  {
    id: 'VIP-02',
    client: 'Lord Sterling Holdings',
    service: 'Helicopter Viewing Tour (DWC)',
    date: '2026-08-28',
    itinerary: 'Palm Jumeirah & World Islands',
    status: 'PILOT_RESERVED',
  },
];

export function resolveTabFromModuleId(moduleId?: string): KairosTabId | null {
  if (!moduleId) return null;
  if (moduleId.includes('golden') || moduleId.includes('visa')) return 'golden-visa';
  if (moduleId.includes('crypto')) return 'crypto';
  if (moduleId.includes('chauffeur') || moduleId.includes('jet')) return 'chauffeur';
  if (moduleId.includes('family')) return 'family-office';
  return null;
}

export function calculateCryptoRequired(
  propertyPriceAed: number,
  selectedCrypto: CryptoAsset
): string {
  const rate = CRYPTO_RATES_AED[selectedCrypto];
  const decimals = selectedCrypto === 'BTC' ? 4 : 2;
  return (propertyPriceAed / rate).toFixed(decimals);
}
