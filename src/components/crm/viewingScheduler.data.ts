export const RED = '#EF4444';
export const WHITE = '#FFFFFF';
export const SLATE = '#1E293B';
export const BORDER = 'rgba(239, 68, 68, 0.2)';
export const CARD_BG = '#F8FAFC';
export const TEXT_MUTED = '#64748B';
export const GREEN = '#10B981';
export const ORANGE = '#F59E0B';
export const BLUE = '#3B82F6';
export const PURPLE = '#8B5CF6';

export type ViewingStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'No-Show';
export type ViewingType = 'In-Person' | 'Virtual';

export interface Viewing {
  id: string;
  clientName: string;
  clientPhone: string;
  propertyTitle: string;
  propertyId: string;
  agentName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  status: ViewingStatus;
  type: ViewingType;
  notes: string;
}

export const SEED_VIEWINGS: Viewing[] = [
  {
    id: 'VW-001',
    clientName: 'Mark Stevenson',
    clientPhone: '+971501234567',
    propertyTitle: 'Luxury Property 14 — Palm Jumeirah',
    propertyId: 'prop-014',
    agentName: 'Nadia Yusuf',
    date: '2026-07-28',
    timeSlot: '10:00',
    status: 'Confirmed',
    type: 'In-Person',
    notes: 'Buyer interested in 3BR+study layout',
  },
  {
    id: 'VW-002',
    clientName: 'Fatima Al Sayed',
    clientPhone: '+971509876543',
    propertyTitle: 'Luxury Property 7 — DAMAC Hills 2',
    propertyId: 'prop-007',
    agentName: 'Clara Osei',
    date: '2026-07-28',
    timeSlot: '14:00',
    status: 'Confirmed',
    type: 'In-Person',
    notes: 'First viewing — needs Arabic-speaking agent',
  },
  {
    id: 'VW-003',
    clientName: 'Khalid Al Rashidi',
    clientPhone: '+971555000123',
    propertyTitle: 'Luxury Property 33 — Dubai Marina',
    propertyId: 'prop-033',
    agentName: 'Sophia Lin',
    date: '2026-07-28',
    timeSlot: '16:30',
    status: 'Pending',
    type: 'Virtual',
    notes: 'Overseas investor — Zoom call requested',
  },
  {
    id: 'VW-004',
    clientName: "James O'Brien",
    clientPhone: '+971509182736',
    propertyTitle: 'Luxury Property 55 — Business Bay',
    propertyId: 'prop-055',
    agentName: 'Nadia Yusuf',
    date: '2026-07-29',
    timeSlot: '11:00',
    status: 'Confirmed',
    type: 'In-Person',
    notes: '',
  },
  {
    id: 'VW-005',
    clientName: 'Sarah Connor',
    clientPhone: '+971508887766',
    propertyTitle: 'Luxury Property 22 — Downtown Dubai',
    propertyId: 'prop-022',
    agentName: 'Clara Osei',
    date: '2026-07-29',
    timeSlot: '15:00',
    status: 'Confirmed',
    type: 'In-Person',
    notes: 'Bring DLD title deed copy',
  },
  {
    id: 'VW-006',
    clientName: 'Amir Khan',
    clientPhone: '+971507654321',
    propertyTitle: 'Luxury Property 41 — DAMAC Hills 2',
    propertyId: 'prop-041',
    agentName: 'Sophia Lin',
    date: '2026-07-30',
    timeSlot: '09:30',
    status: 'Pending',
    type: 'In-Person',
    notes: 'High-priority VIP client',
  },
  {
    id: 'VW-007',
    clientName: 'Elena Petrova',
    clientPhone: '+971501122334',
    propertyTitle: 'Luxury Property 78 — Palm Jumeirah',
    propertyId: 'prop-078',
    agentName: 'Nadia Yusuf',
    date: '2026-07-30',
    timeSlot: '13:00',
    status: 'Confirmed',
    type: 'Virtual',
    notes: '',
  },
  {
    id: 'VW-008',
    clientName: 'Robert Kim',
    clientPhone: '+971509988776',
    propertyTitle: 'Luxury Property 5 — Dubai Marina',
    propertyId: 'prop-005',
    agentName: 'Clara Osei',
    date: '2026-07-25',
    timeSlot: '11:00',
    status: 'Completed',
    type: 'In-Person',
    notes: 'Client submitted offer after viewing',
  },
  {
    id: 'VW-009',
    clientName: 'Mia Johnson',
    clientPhone: '+971507711223',
    propertyTitle: 'Luxury Property 19 — Business Bay',
    propertyId: 'prop-019',
    agentName: 'Sophia Lin',
    date: '2026-07-24',
    timeSlot: '14:30',
    status: 'No-Show',
    type: 'In-Person',
    notes: 'Client unreachable — reschedule required',
  },
  {
    id: 'VW-010',
    clientName: 'Omar Al Farsi',
    clientPhone: '+971505544332',
    propertyTitle: 'Luxury Property 62 — Downtown Dubai',
    propertyId: 'prop-062',
    agentName: 'Nadia Yusuf',
    date: '2026-07-27',
    timeSlot: '10:00',
    status: 'Completed',
    type: 'In-Person',
    notes: 'Very interested — sent contract for review',
  },
];
