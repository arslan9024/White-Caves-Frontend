import type { PortalMetric, PortalSectionItem } from '../shared/PortalShell';

export const EMPLOYEE_PORTAL_DATA = {
  portalId: 'employee',
  subdomain: 'employee.whitecaves.com',
  title: 'Employee & Broker Workspace',
  subtitle:
    'My Listings • Available Inventory • Personal KPIs • Lead Pipeline • WhatsApp/Drive OCR Queue',
  metrics: [
    {
      label: 'Active Listings',
      value: '24',
      accent: true,
    },
    {
      label: 'Pending Viewings',
      value: '8',
    },
    {
      label: 'OCR Queue (Browser)',
      value: '0',
    },
    {
      label: 'Monthly Commission',
      value: 'AED 42,500',
    },
  ] as PortalMetric[],
  items: [
    {
      id: 'listings',
      title: 'My Listings & Available Inventory',
      subtitle: 'Dubai Marina, Palm Jumeirah & Downtown units',
      status: 'ACTIVE',
    },
    {
      id: 'pipeline',
      title: 'Lead Pipeline & Viewing Scheduler',
      subtitle: 'RERA-verified buyer & tenant inquiries',
      status: 'LIVE',
    },
    {
      id: 'ocr-queue',
      title: 'WhatsApp / Drive OCR Queue',
      subtitle: 'Zero-server-RAM Tesseract.js Web Worker',
      status: 'READY',
    },
  ] as PortalSectionItem[],
};

