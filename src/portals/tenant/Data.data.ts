import type { PortalMetric, PortalSectionItem } from '../shared/PortalShell';

export const TENANT_PORTAL_DATA = {
  portalId: 'tenant',
  subdomain: 'tenant.whitecaves.com',
  title: 'Tenant Lease Portal',
  subtitle:
    'Active Lease Summary • Upcoming Rent Cheques • Ejari & Contract Downloads • Maintenance',
  metrics: [
    {
      label: 'Lease Status',
      value: 'ACTIVE',
      accent: true,
    },
    {
      label: 'Next Rent Cheque',
      value: 'AED 35,000',
    },
    {
      label: 'Ejari Certificate',
      value: 'VERIFIED',
    },
    {
      label: 'Open Maintenance',
      value: '0',
    },
  ] as PortalMetric[],
  items: [
    {
      id: 'lease-summary',
      title: 'Active Lease Summary',
      subtitle: 'Ejari registered tenancy contract',
      status: 'VERIFIED',
    },
    {
      id: 'cheques',
      title: 'Upcoming Rent Cheques',
      subtitle: '4-cheque annual payment schedule',
      status: 'ON_TIME',
    },
    {
      id: 'maintenance',
      title: 'Maintenance Requests',
      subtitle: '24/7 SLA facility support',
      status: 'READY',
    },
  ] as PortalSectionItem[],
};

