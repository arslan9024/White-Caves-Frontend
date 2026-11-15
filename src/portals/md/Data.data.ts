import type { PortalMetric, PortalSectionItem } from '../shared/PortalShell';

export const MD_PORTAL_DATA = {
  portalId: 'md',
  subdomain: 'md.whitecaves.com',
  title: 'Managing Director Command Center',
  subtitle: '1-12-108 Bhakti Floor Hierarchy • Revenue & Commission Analytics • AEgis Controls',
  metrics: [
    { label: 'Active Department Floors', value: '12 Floors', accent: true },
    { label: 'AIAMS Workforce', value: '108 + 120' },
    { label: 'Pending Final Approvals', value: '0' },
    { label: 'VAT / Corp Tax Reserve', value: '5% / 9%' },
  ] as PortalMetric[],
  items: [
    {
      id: 'bhakti-hierarchy',
      title: '1-12-108 Bhakti Floor Hierarchy',
      subtitle: 'Executive oversight across all 12 brokerage & engineering floors',
      status: 'ACTIVE',
    },
    {
      id: 'revenue-analytics',
      title: 'Revenue & Commission Analytics',
      subtitle: '60%–70% dynamic splits & escrow settlement ledger',
      status: 'SYNCED',
    },
    {
      id: 'aegis-controls',
      title: 'AEgis Sovereign Controls',
      subtitle: 'TURING-LAW-000 & AEG-001–042 compliance gates',
      status: 'ENFORCED',
    },
  ] as PortalSectionItem[],
};
