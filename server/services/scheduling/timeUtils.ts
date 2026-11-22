/**
 * Scheduling Service — Time & Token Helpers
 *
 * @module scheduling/timeUtils
 */

import crypto from 'crypto';

/**
 * Parse "HH:mm" string to minutes since midnight.
 */
export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Format minutes since midnight to "HH:mm" string.
 */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Set time on a date using "HH:mm" string (in UTC+4 / Gulf Standard Time).
 * Returns a UTC Date object with the correct GST time.
 */
export function setTimeOnDate(date: Date, timeStr: string): Date {
  const result = new Date(date);
  const [h, m] = timeStr.split(':').map(Number);
  result.setUTCHours(h - 4, m, 0, 0); // GST = UTC+4
  return result;
}

/**
 * Generate a unique ICS token for calendar download authentication.
 */
export function generateIcsToken(): string {
  return crypto.randomBytes(24).toString('hex');
}
