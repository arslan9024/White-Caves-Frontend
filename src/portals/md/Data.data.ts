import type { PortalMetric, PortalSectionItem } from '../shared/PortalShell';

export const MD_PORTAL_DATA = {
  portalId: 'md',
  subdomain: 'md.whitecaves.com',
  title: 'Managing Director Command Center',
  subtitle:
    'Arslan Malik (MD) → AI Zoe (COO) → 1-12-108 Bhakti Hierarchy · DAMAC Hills 2 Residential Leasing',
  metrics: [
    { label: 'Active Department Floors', value: '12 Floors', accent: true },
    { label: 'Bhakti Fractal Cap', value: '13,081 Seats' },
    { label: 'Operational AI Supervisors', value: '5 / 5 Live' },
    { label: 'VAT / Corp Tax Reserve', value: '5% / 9%' },
  ] as PortalMetric[],
  items: [
    {
      id: 'bhakti-hierarchy',
      title: 'AICC-Sanctum 1-12-108 Bhakti Hierarchy (/aicc-sanctum)',
      subtitle: '1 MD → AI Zoe → 12 Directors → 108 Managers → 1,296 AMs → 11,664 Supervisors',
      status: 'ACTIVE',
    },
    {
      id: 'dh2-supervisors',
      title: 'DAMAC Hills 2 Leasing Squad (Mary · Linda · Diana · Daisy · Henry)',
      subtitle:
        'SUP-06-1-01-1 Inventory · SUP-08-1-01-1 WhatsApp · SUP-02-6-01-1 Email · SUP-05-2-01-1 Leasing · SUP-11-1-01-1 Vault',
      status: 'READY',
    },
    {
      id: 'revenue-analytics',
      title: 'MD Daily Leasing Cockpit & 12-Stage Deals (/dashboard/leasing-cockpit)',
      subtitle: 'Sequential cheques → tenant-first sign → clearance → landlord sign → Ejari + DEWA',
      status: 'SYNCED',
    },
    {
      id: 'aegis-controls',
      title: 'UAE Statutory & AEGIS V5.1 Compliance',
      subtitle: 'DLD/Ejari idempotency · 5% UAE VAT receipts · 90-day RERA renewal radar',
      status: 'ENFORCED',
    },
  ] as PortalSectionItem[],
};
