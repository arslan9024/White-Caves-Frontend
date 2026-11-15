import type { PortalMetric, PortalSectionItem } from '../shared/PortalShell';

export const SELLER_PORTAL_DATA = {
  portalId: 'seller',
  subdomain: 'seller.whitecaves.com',
  title: 'Seller Listings Portal',
  subtitle: 'Listing Status • Viewing Feedback • RERA Form A • Offer Negotiation Tracker',
  metrics: [
    {
      label: 'Active Listings',
      value: '2',
      accent: true,
    },
    {
      label: 'Total Viewings',
      value: '11',
    },
    {
      label: 'RERA Form A',
      value: 'VERIFIED',
    },
    {
      label: 'Active Offers',
      value: '2',
    },
  ] as PortalMetric[],
  items: [
    {
      id: 'listing-status',
      title: 'Listing Status & Trakheesi Permit',
      subtitle: 'Bayut, Property Finder & Dubizzle sync',
      status: 'LIVE',
    },
    {
      id: 'form-a',
      title: 'RERA Form A & Viewing Feedback',
      subtitle: 'Verified broker feedback log',
      status: 'VERIFIED',
    },
    {
      id: 'offers',
      title: 'Offer Negotiation Tracker',
      subtitle: 'Formal MOU & deposit milestones',
      status: 'ACTIVE',
    },
  ] as PortalSectionItem[],
};
