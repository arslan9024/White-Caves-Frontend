import type { Booking, MaintenanceTicket, CommunityNotice } from './types';

export const initialBookings: Booking[] = [
  {
    id: 'BKG-401',
    amenity: 'Rooftop Infinity Pool & Cabana',
    tenant: 'Marcus Vance (Unit 1102)',
    date: '2026-08-25',
    time: '14:00 - 18:00',
    status: 'CONFIRMED',
  },
  {
    id: 'BKG-402',
    amenity: 'Padel Tennis Court 1',
    tenant: 'Elena Rostova (Unit 404)',
    date: '2026-08-26',
    time: '08:00 - 10:00',
    status: 'CONFIRMED',
  },
  {
    id: 'BKG-403',
    amenity: 'Private Residents Cinema',
    tenant: 'Khalid Al Hashemi (Unit 2501)',
    date: '2026-08-27',
    time: '20:00 - 23:00',
    status: 'PENDING_APPROVAL',
  },
];

export const initialTickets: MaintenanceTicket[] = [
  {
    id: 'TKT-881',
    unit: 'Unit 704',
    category: 'Chilled Water AC Issue',
    priority: 'HIGH',
    slaRemaining: '2h 15m',
    status: 'DISPATCHED',
  },
  {
    id: 'TKT-882',
    unit: 'Tower B Lift 3',
    category: 'Elevator Sensor Calibration',
    priority: 'CRITICAL',
    slaRemaining: '45m',
    status: 'TECH_ON_SITE',
  },
  {
    id: 'TKT-883',
    unit: 'Podium Garden',
    category: 'Irrigation Sprinkler Leak',
    priority: 'LOW',
    slaRemaining: '18h',
    status: 'SCHEDULED',
  },
];

export const initialNotices: CommunityNotice[] = [
  {
    id: 1,
    title: 'Annual Water Tank Sanitization & Disinfection',
    date: '2026-08-28',
    impact: 'Low Water Pressure between 01:00 - 05:00',
    author: 'White Caves FM',
  },
  {
    id: 2,
    title: 'Dubai Fire & Civil Defence Annual Evacuation Drill',
    date: '2026-09-02',
    impact: 'Building Alarms Active at 10:30 AM',
    author: 'Security Command',
  },
];

export const TABS_CONFIG = [
  { id: 'booking', label: '3.24.1 Facility Booking Desk' },
  { id: 'maintenance', label: '3.24.2 Maintenance Ticket SLA' },
  { id: 'service', label: '3.24.3 Tenant Service Tracker' },
  { id: 'notices', label: '3.24.4 Community Notice Board' },
] as const;
