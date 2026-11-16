import type { PortalMetric, PortalSectionItem } from '../shared/PortalShell';

export const BUYER_PORTAL_DATA = {
  portalId: 'buyer',
  subdomain: 'buyer.whitecaves.com',
  title: 'Buyer Acquisitions Portal',
  subtitle: 'Shortlisted Properties • Viewing History • RERA Form B • DLD Transfer Tracker',
  metrics: [
    {
      label: 'Shortlisted Units',
      value: '6',
      accent: true,
    },
    {
      label: 'Completed Viewings',
      value: '3',
    },
    {
      label: 'RERA Form B',
      value: 'SIGNED',
    },
    {
      label: 'DLD Transfer',
      value: 'IN_PROGRESS',
    },
  ] as PortalMetric[],
  items: [
    {
      id: 'shortlist',
      title: 'Shortlisted Properties',
      subtitle: 'Curated luxury villas & penthouses',
      status: 'ACTIVE',
    },
    {
      id: 'form-b',
      title: 'RERA Form B & Viewing History',
      subtitle: 'Buyer representation agreement',
      status: 'SIGNED',
    },
    {
      id: 'dld-tracker',
      title: 'DLD Transfer Tracker',
      subtitle: 'Trustee office & NOC milestones',
      status: 'TRACKING',
    },
  ] as PortalSectionItem[],
};

