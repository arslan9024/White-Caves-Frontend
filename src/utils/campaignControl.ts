// Simple in‑memory flag for campaign state (production should use DB)
let campaignActive = true;

export function isCampaignActive(): boolean {
  return campaignActive;
}

export function setCampaignActive(active: boolean): void {
  campaignActive = active;
}
