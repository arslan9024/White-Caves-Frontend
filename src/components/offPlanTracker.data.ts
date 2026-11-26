export interface OffPlanProject {
  id: number;
  name: string;
  developer: string;
  developerLogo: string;
  location: string;
  type: string;
  segment: string;
  launchDate: Date;
  completionDate: Date;
  priceFrom: number;
  units: number;
  image: string;
  status: string;
  paymentPlan: string;
  features: string[];
}

export const STATIC_OFFPLAN_PROJECTS: OffPlanProject[] = [
  {
    id: 1,
    name: 'Marina Vista',
    developer: 'Emaar Properties',
    developerLogo: '/white-caves-logo.png',
    location: 'Dubai Marina',
    type: 'Apartment',
    segment: 'luxury',
    launchDate: new Date('2025-01-15'),
    completionDate: new Date('2027-06-01'),
    priceFrom: 2500000,
    units: 450,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
    status: 'launching-soon',
    paymentPlan: '60/40',
    features: ['Sea View', 'Private Beach', 'Smart Home'],
  },
  {
    id: 2,
    name: 'Creek Harbour Tower',
    developer: 'Emaar Properties',
    developerLogo: '/white-caves-logo.png',
    location: 'Dubai Creek Harbour',
    type: 'Apartment',
    segment: 'luxury',
    launchDate: new Date('2025-02-01'),
    completionDate: new Date('2028-03-01'),
    priceFrom: 1800000,
    units: 800,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
    status: 'launching-soon',
    paymentPlan: '80/20',
    features: ['Creek View', 'Burj Khalifa View', 'Premium Amenities'],
  },
  {
    id: 3,
    name: 'Palm Residences II',
    developer: 'Nakheel',
    developerLogo: '/white-caves-logo.png',
    location: 'Palm Jumeirah',
    type: 'Villa',
    segment: 'ultra-luxury',
    launchDate: new Date('2025-01-20'),
    completionDate: new Date('2027-12-01'),
    priceFrom: 15000000,
    units: 80,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
    status: 'launching-soon',
    paymentPlan: '50/50',
    features: ['Beach Access', 'Private Pool', 'Garden'],
  },
  {
    id: 4,
    name: 'Business Bay Central',
    developer: 'DAMAC',
    developerLogo: '/white-caves-logo.png',
    location: 'Business Bay',
    type: 'Apartment',
    segment: 'commercial',
    launchDate: new Date('2025-03-10'),
    completionDate: new Date('2027-09-01'),
    priceFrom: 950000,
    units: 1200,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    status: 'pre-registration',
    paymentPlan: '70/30',
    features: ['Office Space', 'Meeting Rooms', 'Parking'],
  },
  {
    id: 5,
    name: 'Dubai Hills Villas',
    developer: 'Meraas',
    developerLogo: '/white-caves-logo.png',
    location: 'Dubai Hills Estate',
    type: 'Villa',
    segment: 'residential',
    launchDate: new Date('2025-02-15'),
    completionDate: new Date('2026-12-01'),
    priceFrom: 5500000,
    units: 150,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    status: 'launching-soon',
    paymentPlan: '60/40',
    features: ['Golf View', 'Private Garden', 'Smart Home'],
  },
];
