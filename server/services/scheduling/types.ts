/**
 * Scheduling Service — Shared Types & Default Schedule
 *
 * @module scheduling/types
 */

export interface TimeSlot {
  start: string;   // ISO 8601 datetime
  end: string;     // ISO 8601 datetime
  available: boolean;
  reason?: string; // Why unavailable (e.g., "booked", "break", "outside_hours")
}

export interface AgentSchedule {
  dayOfWeek: number;     // 0-6
  startTime: string;     // HH:mm
  endTime: string;       // HH:mm
  isActive: boolean;
  slotDuration: number;  // minutes
  breakStart?: string;   // HH:mm
  breakEnd?: string;     // HH:mm
}

export interface ViewingConflict {
  hasConflict: boolean;
  conflictingViewings: Array<{
    id: string;
    scheduledAt: Date;
    duration: number;
    propertyId: string;
    status: string;
  }>;
  message?: string;
}

export interface ICSEvent {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  organizer?: { name: string; email: string };
  attendees?: Array<{ name: string; email: string }>;
  uid: string;
  url?: string;
}

// Default Agent Schedule (Sun-Thu, Dubai business hours)
export const DEFAULT_SCHEDULE: AgentSchedule[] = [
  { dayOfWeek: 0, startTime: '09:00', endTime: '18:00', isActive: true, slotDuration: 30, breakStart: '12:30', breakEnd: '13:30' },  // Sunday
  { dayOfWeek: 1, startTime: '09:00', endTime: '18:00', isActive: true, slotDuration: 30, breakStart: '12:30', breakEnd: '13:30' },  // Monday
  { dayOfWeek: 2, startTime: '09:00', endTime: '18:00', isActive: true, slotDuration: 30, breakStart: '12:30', breakEnd: '13:30' },  // Tuesday
  { dayOfWeek: 3, startTime: '09:00', endTime: '18:00', isActive: true, slotDuration: 30, breakStart: '12:30', breakEnd: '13:30' },  // Wednesday
  { dayOfWeek: 4, startTime: '09:00', endTime: '18:00', isActive: true, slotDuration: 30, breakStart: '12:30', breakEnd: '13:30' },  // Thursday
  { dayOfWeek: 5, startTime: '10:00', endTime: '14:00', isActive: false, slotDuration: 30 },  // Friday (UAE weekend)
  { dayOfWeek: 6, startTime: '10:00', endTime: '16:00', isActive: false, slotDuration: 30 },  // Saturday (UAE weekend)
];
