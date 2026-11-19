/**
 * AEGIS V5.0 Titanium Cross-Repo Real-Time Bridge
 * Connects ZoeConsole / RightAISidebar HOT_LEAD escalations -> LindaLiveWhatsAppWeb -> HenryDocumentHub -> TheodoraFinanceCRM_NEW
 */

import { authFetch } from './authFetch';
import { calculateCommissionSplit } from './commissionSplitGuard';

export type StatutoryGateType = 'EMIRATES_ID' | 'PASSPORT' | 'TITLE_DEED' | 'EJARI';
export type ReraFormType = 'FORM_A' | 'FORM_B' | 'MOU';

export interface HotLeadEscalation {
  conversationId: string;
  phone: string;
  clientName?: string;
  role?: 'seller' | 'buyer';
  unit?: string;
  project?: string;
  ocrFields?: Record<string, string>;
}

export interface HenryReraPreFill {
  formType: ReraFormType;
  phone: string;
  clientName: string;
  unit: string;
  project: string;
  ocrFields: Record<string, string>;
}

/**
 * 1. Bidirectional Live WhatsApp Takeover & Reply Loop
 * Dispatches human-in-the-loop reply to /api/linda/send/:conversationId while pausing Vardon bot follow-ups.
 */
export async function dispatchLindaTakeover(
  conversationId: string,
  phone: string,
  message: string
): Promise<{ ok: boolean; status: number }> {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('wc:linda:takeover', {
        detail: { conversationId, phone, pauseVardonBot: true },
      })
    );
  }

  const res = await authFetch(`/api/linda/send/${encodeURIComponent(conversationId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone,
      message,
      pauseVardonBot: true,
      humanTakeover: true,
    }),
  });

  return { ok: res.ok, status: res.status };
}

/**
 * 2. Persistent Prisma Merit Leaderboard Ledger & Theodora Commission Split Sync (AEG-037/038/039)
 * Persists +500 XP statutory gate clearance and computes dynamic 60% -> 70% broker split.
 */
export async function syncHenryMeritAndCommission(
  recordId: string,
  gateType: StatutoryGateType,
  currentXp: number,
  grossCommission = 100000
) {
  const newXp = currentXp + 500;
  // Every 1,000 XP adds +1% split from 60% base up to 70% ceiling
  const dynamicSplitPercent = Math.min(70, 60 + Math.floor(newXp / 1000));
  const commission = calculateCommissionSplit(grossCommission, dynamicSplitPercent);

  const res = await authFetch(`/api/henry/records/${encodeURIComponent(recordId)}/sign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      gateType,
      xpAwarded: 500,
      totalXp: newXp,
      commissionSplitPercent: commission.splitPercent,
    }),
  });

  return {
    ok: res.ok,
    newXp,
    commission,
  };
}

/**
 * 3. Automated DLD Form A / Form B / MOU Pre-Fill from HOT_LEAD + OCR
 */
export function buildHenryReraPreFill(lead: HotLeadEscalation): HenryReraPreFill {
  const formType: ReraFormType = lead.role === 'seller' ? 'FORM_A' : 'FORM_B';
  const payload: HenryReraPreFill = {
    formType,
    phone: lead.phone,
    clientName: lead.clientName ?? 'VIP Client',
    unit: lead.unit ?? '',
    project: lead.project ?? '',
    ocrFields: lead.ocrFields ?? {},
  };

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wc:henry:prefill', { detail: payload }));
  }

  return payload;
}

export interface MaryInventoryPayload {
  unit: string;
  cluster: string;
  landlordPhone: string;
  landlordName: string;
  rentEstimate?: number;
  occupancyStatus: 'vacant' | 'occupied';
  source: string;
}

/**
 * 4. Inter-Agent Bridge: Linda -> Mary Inventory Vault
 * Forwards captured landlord rental inventory to Mary for portfolio & unit onboarding.
 */
export async function bridgeToMaryInventory(lead: HotLeadEscalation & { rentEstimate?: number }) {
  const payload: MaryInventoryPayload = {
    unit: lead.unit || 'Pending Allocation',
    cluster: lead.project || 'Dubai Marina',
    landlordPhone: lead.phone,
    landlordName: lead.clientName || 'Landlord',
    rentEstimate: lead.rentEstimate || 0,
    occupancyStatus: 'vacant',
    source: 'Linda WhatsApp Ingress',
  };

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wc:mary:inventory', { detail: payload }));
  }

  try {
    const res = await authFetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `${payload.cluster} - Unit ${payload.unit}`,
        unitNumber: payload.unit,
        location: payload.cluster,
        price: payload.rentEstimate || 120000,
        type: 'RENT',
        status: 'AVAILABLE',
        landlordPhone: payload.landlordPhone,
        landlordName: payload.landlordName,
      }),
    });
    return { ok: res.ok, status: res.status, payload };
  } catch (error) {
    return { ok: false, error, payload };
  }
}

export interface DaisyLeasingListingPayload {
  unit: string;
  cluster: string;
  annualRent: number;
  listingStatus: 'available' | 'draft';
  landlordPhone: string;
  source: string;
}

/**
 * 5. Inter-Agent Bridge: Linda -> Daisy Leasing Agent
 * Direct hand-off of qualified landlord properties to Daisy to publish onto White-Caves-Web.
 */
export async function bridgeToDaisyLeasing(lead: HotLeadEscalation & { annualRent?: number }) {
  const payload: DaisyLeasingListingPayload = {
    unit: lead.unit || 'Unassigned',
    cluster: lead.project || 'Downtown Dubai',
    annualRent: lead.annualRent || 150000,
    listingStatus: 'available',
    landlordPhone: lead.phone,
    source: 'Linda Outreach Direct',
  };

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wc:daisy:listing', { detail: payload }));
  }

  try {
    const res = await authFetch('/api/properties/sync-leasing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, status: res.status, payload };
  } catch (error) {
    return { ok: false, error, payload };
  }
}
