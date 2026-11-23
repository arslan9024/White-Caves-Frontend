import { Waves, Dumbbell, Car, Shield, Trees, Wifi, Snowflake, Building } from 'lucide-react';
import type { TimeSlot, TabItem, AmenityIconMap } from './PropertyDetailModal.types';

export const AMENITY_ICONS: AmenityIconMap = {
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  Security: Shield,
  Garden: Trees,
  WiFi: Wifi,
  AC: Snowflake,
  Concierge: Building,
  'Beach Access': Waves,
  Cinema: Building,
};

// Time slots: value is 24-hour HH:MM for ISO construction, label is display text
export const TIME_SLOTS: readonly TimeSlot[] = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
] as const;

export const PROPERTY_DETAIL_TABS: readonly TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Location' },
  { id: 'floorplan', label: 'Floor Plan' },
];
