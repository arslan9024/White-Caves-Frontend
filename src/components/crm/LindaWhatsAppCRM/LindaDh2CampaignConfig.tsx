import React, { FC } from 'react';
import { Radio, Clock } from 'lucide-react';

export interface WarmContactRow {
  id: string;
  name: string;
  e164: string;
  role: 'LANDLORD' | 'TENANT';
  category: 'LANDLORD_RETENTION_RENEWAL' | 'TENANT_FOLLOWUP';
  urgency: string;
  cluster: string;
  bedrooms: string;
  leaseEndDate: string | null;
  daysUntilExpiry: number | null;
  source: string;
  dncSuppressed: boolean;
}

export interface WarmSummary {
  total: number;
  landlordRetentionCount: number;
  tenantFollowUpCount: number;
  expiringWithin90DaysCount: number;
  dncSuppressedCount: number;
  contacts: WarmContactRow[];
}

export interface TestDispatchReport {
  verified: boolean;
  outboundPayload?: {
    to: string;
    assignedSim: string;
    message: string;
    privacyAuditPassed: boolean;
    spamRiskScore: number;
    status: string;
  } | null;
  inboundTriage?: {
    simulatedMessage: string;
    result?: { syncedToMaryVault?: boolean; routed?: boolean; reason?: string };
  };
}

export const DH2_38_CLUSTERS = [
  'All 38 Clusters',
  'Pacifica',
  'Camelia',
  'Albizia',
  'Basswood',
  'Clivia',
  'Amargo',
  'Zinnia',
  'Mimosa',
  'Vardon',
  'Juniper',
  'Sycamore',
  'Coursetia',
  'Centauri',
  'Sanctuary',
  'Mulberry',
  'Acuna',
  'Aknan',
  'Aster',
  'Avencia',
  'Centaury',
  'Dahlia',
  'Elo',
  'Fiora',
  'Flamingo',
  'Hawthorn',
  'Janusia',
  'Just Cavalli',
  'Navitas',
  'Odora',
  'Paloverde',
  'Park Greens',
  'Primrose',
  'Trixis',
  'Verona',
  'Virdis',
  'Violet',
  'Water Town',
  'Victoria',
];

export const CAMPAIGN_TEMPLATES = [
  {
    id: 'tpl-1',
    sequenceKey: 'LANDLORD_RETENTION_RENEWAL' as const,
    label: 'Landlord Retention & RERA 90-Day Renewal (Privacy-Safe)',
    text: 'Hello {{ownerName}}, this is Linda from White Caves Real Estate LLC (RERA Licensed — DAMAC Hills 2 Leasing Desk). Ahead of your upcoming {{bedrooms}}BR {{cluster}}, DAMAC Hills 2 lease milestone, Arslan Malik (MD) would be glad to share the latest RERA rental benchmark, manage your renewal notice, or coordinate verified re-leasing. Visit https://whitecaves.ae or reply to schedule a call with Arslan Malik. Reply STOP to opt out.',
  },
  {
    id: 'tpl-2',
    sequenceKey: 'TENANT_FOLLOWUP' as const,
    label: 'Tenant Follow-Up: Renewal or DH2 Alternatives (Privacy-Safe)',
    text: 'Hi {{ownerName}}, White Caves Real Estate LLC (DAMAC Hills 2 Specialists) here. As your {{cluster}} tenancy nears renewal, would you like help renewing Ejari smoothly or exploring verified {{bedrooms}}BR homes in DAMAC Hills 2? Browse live listings at https://whitecaves.ae and reply to schedule a private viewing with Arslan Malik. Reply STOP to opt out.',
  },
  {
    id: 'tpl-3',
    sequenceKey: 'DH2_LANDLORD_DISCOVERY' as const,
    label: 'Hunter Discovery: Verified Corporate Tenants (Privacy-Safe)',
    text: 'Greetings {{ownerName}}! Linda from White Caves Real Estate (DAMAC Hills 2 Leasing Desk). We have pre-qualified corporate tenants searching for {{bedrooms}}BR homes in {{cluster}}. Would you like Arslan Malik to list your residence on https://whitecaves.ae at zero landlord commission? Reply STOP to opt out.',
  },
];

export const LindaDh2FleetBanner: FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
      padding: '14px 18px',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: '#EF4444',
          color: '#FFFFFF',
          fontSize: '0.75rem',
          fontWeight: 900,
          letterSpacing: '0.04em',
        }}
      >
        <Radio size={14} />
        <span>PRIMARY MASTER CLOSER: +971 50 576 0056</span>
      </div>

      <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
        ● 9 Hunter SIMs Rotated (18/hr Cap · 35–65s Jitter)
      </span>
    </div>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.75rem',
        color: '#94A3B8',
      }}
    >
      <Clock size={14} className="text-amber-400" />
      <span>
        Friday Prayer Guard: <strong>12:00 – 14:30 GST</strong>
      </span>
    </div>
  </div>
);
