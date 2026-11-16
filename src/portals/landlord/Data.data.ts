import type { PortalMetric, PortalSectionItem } from '../shared/PortalShell';

export const LANDLORD_PORTAL_DATA = {
  portalId: 'landlord',
  subdomain: 'landlord.whitecaves.com',
  title: 'Landlord Portfolio Portal',
  subtitle:
    'Rented Property ROI • Active Leases • Cheque Schedule • Renewal Alerts • Henry Title Deed Vault',
  metrics: [
    {
      label: 'Portfolio Yield (ROI)',
      value: '7.8%',
      accent: true,
    },
    {
      label: 'Active Leases',
      value: '4',
    },
    {
      label: 'Upcoming Cheques',
      value: '2',
    },
    {
      label: 'Renewal Alerts (90d)',
      value: '1',
    },
  ] as PortalMetric[],
  items: [
    {
      id: 'leases',
      title: 'Active Leases & Cheque Schedule',
      subtitle: 'PDC tracking & Ejari status',
      status: 'ACTIVE',
    },
    {
      id: 'renewals',
      title: '90/60/30-Day Renewal Alerts',
      subtitle: 'RERA Rent Index compliance',
      status: 'MONITORING',
    },
    {
      id: 'henry-vault',
      title: 'Title Deed & NOC Vault (Henry)',
      subtitle: 'Google Drive encrypted document vault',
      status: 'SYNCED',
    },
  ] as PortalSectionItem[],
};

