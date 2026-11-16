import { PropertyOpportunity } from './PropertyOpportunityList.types';

export const INITIAL_OPPORTUNITIES: PropertyOpportunity[] = [
  {
    id: 'opp_1',
    propertyType: 'villa',
    location: 'Arabian Ranches',
    bedrooms: 4,
    price: 8000,
    currency: 'AED',
    availability: 'for_rent',
    ownerName: 'Ahmed Al Mansouri',
    ownerPhone: '+971501234567',
    confidence: 92,
    status: 'initial_detection',
    extractedAt: '2 hours ago',
    completeness: 85,
  },
  {
    id: 'opp_2',
    propertyType: 'apartment',
    location: 'Downtown Dubai',
    bedrooms: 2,
    price: 4500,
    currency: 'AED',
    availability: 'for_rent',
    ownerName: 'Fatima Al Mazrouei',
    ownerPhone: '+971502345678',
    confidence: 78,
    status: 'waiting_for_photos',
    extractedAt: '5 hours ago',
    completeness: 65,
  },
  {
    id: 'opp_3',
    propertyType: 'penthouse',
    location: 'Marina',
    bedrooms: 3,
    price: 25000000,
    currency: 'AED',
    availability: 'for_sale',
    ownerName: 'Sarah Johnson',
    ownerPhone: '+971504567890',
    confidence: 85,
    status: 'partially_verified',
    extractedAt: '1 day ago',
    completeness: 72,
  },
  {
    id: 'opp_4',
    propertyType: 'townhouse',
    location: 'Jumeirah',
    bedrooms: 3,
    price: 6000,
    currency: 'AED',
    availability: 'for_rent',
    ownerName: 'Khalid Rashid',
    ownerPhone: '+971505678901',
    confidence: 88,
    status: 'fully_verified',
    extractedAt: '3 days ago',
    completeness: 100,
  },
  {
    id: 'opp_5',
    propertyType: 'studio',
    location: 'JLT',
    bedrooms: 0,
    price: 2200,
    currency: 'AED',
    availability: 'for_rent',
    ownerName: 'Omar Al Noor',
    ownerPhone: '+971506789012',
    confidence: 65,
    status: 'initial_detection',
    extractedAt: '4 hours ago',
    completeness: 50,
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'initial_detection':
      return { bg: '#fef3c7', text: '#92400e', label: 'Detected' };
    case 'waiting_for_photos':
      return { bg: '#dbeafe', text: '#1e40af', label: 'Awaiting Photos' };
    case 'partially_verified':
      return { bg: '#fce7f3', text: '#831843', label: 'Partially Verified' };
    case 'fully_verified':
      return { bg: '#dcfce7', text: '#166534', label: 'Verified' };
    default:
      return { bg: '#f3f4f6', text: '#374151', label: status };
  }
};

export const getConfidenceColor = (confidence: number) => {
  if (confidence >= 85) return '#10B981';
  if (confidence >= 70) return '#F59E0B';
  return '#EF4444';
};

