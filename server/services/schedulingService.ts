/**
 * Scheduling Service — Phase 3C
 * ──────────────────────────────
 * Agent availability management, viewing slot computation,
 * conflict detection, .ics calendar file generation, and
 * viewing reminder scheduling.
 *
 * Features:
 * - Agent availability CRUD (weekly schedule with breaks)
 * - Available slot computation (respects bookings + breaks)
 * - Double-booking conflict detection
 * - .ics (iCalendar) file generation for viewing events
 * - Automated reminder scheduling (24h + 1h before)
 *
 * @module schedulingService
 */

export type {
  TimeSlot,
  AgentSchedule,
  ViewingConflict,
  ICSEvent,
} from './scheduling/types.js';

export { generateIcsToken } from './scheduling/timeUtils.js';

export {
  getAgentAvailability,
  setAgentAvailability,
  setAgentWeeklyAvailability,
} from './scheduling/availability.js';

export {
  getAvailableSlots,
  detectConflicts,
} from './scheduling/slotsAndConflicts.js';

export {
  generateICSContent,
  generateViewingICS,
} from './scheduling/icsCalendar.js';

export {
  processViewingReminders,
  startViewingReminderScheduler,
} from './scheduling/reminders.js';
