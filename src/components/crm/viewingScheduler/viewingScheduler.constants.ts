import { GREEN, ORANGE, BLUE, RED, type Viewing } from '../viewingScheduler.data';

export const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
];

export const AGENTS = ['Nadia Yusuf', 'Clara Osei', 'Sophia Lin', 'Mark Johnson', 'Laila Hassan'];

export const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const SLOT_SUBSET = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
export const TODAY_STR = '2026-07-28';

export const STATUS_CONFIG: Record<
  Viewing['status'],
  { bg: string; color: string; shortCode: string }
> = {
  Confirmed: { bg: '#DEF7EC', color: GREEN, shortCode: 'CONF' },
  Pending: { bg: '#FFFBEB', color: ORANGE, shortCode: 'PEND' },
  Completed: { bg: '#EFF6FF', color: BLUE, shortCode: 'DONE' },
  Cancelled: { bg: '#FEF2F2', color: RED, shortCode: 'CANC' },
  'No-Show': { bg: '#FEF2F2', color: RED, shortCode: 'NOSH' },
};

export interface ViewingToast {
  id: number;
  message: string;
  color: string;
}

export const getDaysInWeek = (baseDate: Date): Date[] => {
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - baseDate.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

export const formatIsoDate = (d: Date): string => d.toISOString().slice(0, 10);
