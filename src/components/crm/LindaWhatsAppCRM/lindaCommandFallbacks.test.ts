import { describe, it, expect, beforeEach } from 'vitest';
import { getFallbackCommandOutput } from './lindaCommandFallbacks';
import { isCampaignActive, setCampaignActive } from '../../../utils/campaignControl';

describe('Linda WhatsApp CRM Command Fallbacks & Campaign Controls', () => {
  beforeEach(() => {
    setCampaignActive(true);
  });

  it('toggles campaign state via linda campaign pause and linda campaign active', () => {
    const pauseOut = getFallbackCommandOutput('linda campaign pause', 'Pause Campaign');
    expect(isCampaignActive()).toBe(false);
    expect(pauseOut).toContain('CAMPAIGN PAUSED (SAFE HOLD)');

    const activeOut = getFallbackCommandOutput('linda campaign active', 'Activate Campaign');
    expect(isCampaignActive()).toBe(true);
    expect(activeOut).toContain('CAMPAIGN ACTIVE (LIVE OUTREACH RESUMED)');
  });

  it('handles linda campaign dispatch-now [cluster] when active and blocks when paused', () => {
    const activeDispatch = getFallbackCommandOutput(
      'linda campaign dispatch-now vardon',
      'Dispatch Vardon'
    );
    expect(activeDispatch).toContain('DAMAC HILLS 2 LIVE DISPATCH SUMMARY [VARDON]');
    expect(activeDispatch).toContain('15s–45s Gaussian jitter');

    setCampaignActive(false);
    const blockedDispatch = getFallbackCommandOutput(
      'linda campaign dispatch-now amazon',
      'Dispatch Amazon'
    );
    expect(blockedDispatch).toContain('DISPATCH BLOCKED — CAMPAIGN PAUSED');
    expect(blockedDispatch).toContain('AMAZON');
  });
});

