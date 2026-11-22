/**
 * Scheduling Service — Slot Computation & Conflict Detection
 *
 * @module scheduling/slotsAndConflicts
 */

import { prisma } from '../../database.js';
import type { TimeSlot, ViewingConflict } from './types.js';
import { minutesToTime, parseTimeToMinutes, setTimeOnDate } from './timeUtils.js';
import { getAgentAvailability } from './availability.js';

/**
 * Get available viewing slots for a specific agent on a specific date.
 *
 * Algorithm:
 * 1. Get agent's availability for that day of week
 * 2. Generate all possible slots based on schedule
 * 3. Remove slots overlapping with break time
 * 4. Remove slots overlapping with existing bookings
 * 5. Remove slots in the past
 */
export async function getAvailableSlots(
  agentId: string,
  date: Date,
  duration?: number,
): Promise<TimeSlot[]> {
  const dayOfWeek = date.getUTCDay(); // 0=Sunday
  const agentSchedule = await getAgentAvailability(agentId);
  const daySchedule = agentSchedule.find((s) => s.dayOfWeek === dayOfWeek);

  if (!daySchedule || !daySchedule.isActive) {
    return []; // Agent doesn't work this day
  }

  const slotDuration = duration || daySchedule.slotDuration || 30;
  const startMin = parseTimeToMinutes(daySchedule.startTime);
  const endMin = parseTimeToMinutes(daySchedule.endTime);

  // Generate all possible slots
  const allSlots: TimeSlot[] = [];
  for (let min = startMin; min + slotDuration <= endMin; min += slotDuration) {
    const slotStart = setTimeOnDate(date, minutesToTime(min));
    const slotEnd = setTimeOnDate(date, minutesToTime(min + slotDuration));

    allSlots.push({
      start: slotStart.toISOString(),
      end: slotEnd.toISOString(),
      available: true,
    });
  }

  // Mark break slots as unavailable
  if (daySchedule.breakStart && daySchedule.breakEnd) {
    const breakStartMin = parseTimeToMinutes(daySchedule.breakStart);
    const breakEndMin = parseTimeToMinutes(daySchedule.breakEnd);

    for (const slot of allSlots) {
      // Recalculate from GST perspective (+4h)
      const slotStartDate = new Date(slot.start);
      const slotStartGST = slotStartDate.getUTCHours() * 60 + slotStartDate.getUTCMinutes() + 240;
      if (slotStartGST >= breakStartMin && slotStartGST < breakEndMin) {
        slot.available = false;
        slot.reason = 'break';
      }
    }
  }

  // Get existing bookings for this agent on this date
  const dayStart = new Date(date);
  dayStart.setUTCHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setUTCHours(23, 59, 59, 999);

  const existingViewings = await prisma.viewing.findMany({
    where: {
      OR: [
        { agentId },
        { userId: agentId },
      ],
      scheduledAt: { gte: dayStart, lte: dayEnd },
      status: { in: ['scheduled', 'confirmed'] },
    },
    select: { scheduledAt: true, duration: true },
  });

  // Mark booked slots as unavailable
  for (const slot of allSlots) {
    if (!slot.available) continue; // Already marked (break)

    const slotStart = new Date(slot.start).getTime();
    const slotEnd = new Date(slot.end).getTime();

    for (const booking of existingViewings) {
      const bookingStart = booking.scheduledAt.getTime();
      const bookingEnd = bookingStart + booking.duration * 60 * 1000;

      // Check overlap: slots overlap if one starts before the other ends
      if (slotStart < bookingEnd && slotEnd > bookingStart) {
        slot.available = false;
        slot.reason = 'booked';
        break;
      }
    }
  }

  // Mark past slots as unavailable
  const now = Date.now();
  for (const slot of allSlots) {
    if (new Date(slot.start).getTime() <= now) {
      slot.available = false;
      slot.reason = slot.reason || 'past';
    }
  }

  return allSlots;
}

/**
 * Check for scheduling conflicts for a proposed viewing.
 * Checks both agent and client calendars.
 */
export async function detectConflicts(
  agentId: string | null,
  userId: string,
  scheduledAt: Date,
  duration: number = 30,
  excludeViewingId?: string,
): Promise<ViewingConflict> {
  const proposedStart = scheduledAt.getTime();
  const proposedEnd = proposedStart + duration * 60 * 1000;

  // Buffer time: 15 min before and after for travel
  const bufferMs = 15 * 60 * 1000;
  const searchStart = new Date(proposedStart - bufferMs);
  const searchEnd = new Date(proposedEnd + bufferMs);

  const whereConditions: Array<Record<string, unknown>> = [
    { userId },
  ];
  if (agentId) {
    whereConditions.push({ agentId });
  }

  const existingViewings = await prisma.viewing.findMany({
    where: {
      OR: whereConditions,
      scheduledAt: { gte: searchStart, lte: searchEnd },
      status: { in: ['scheduled', 'confirmed'] },
      ...(excludeViewingId ? { NOT: { id: excludeViewingId } } : {}),
    },
    select: {
      id: true,
      scheduledAt: true,
      duration: true,
      propertyId: true,
      status: true,
    },
  });

  // Check actual time overlap (not just buffer overlap)
  const conflicts = existingViewings.filter((v) => {
    const vStart = v.scheduledAt.getTime();
    const vEnd = vStart + v.duration * 60 * 1000;
    return proposedStart < vEnd && proposedEnd > vStart;
  });

  if (conflicts.length > 0) {
    return {
      hasConflict: true,
      conflictingViewings: conflicts,
      message: `Conflict detected: ${conflicts.length} overlapping viewing(s) found. Consider rescheduling.`,
    };
  }

  // Check buffer violations (warn, don't block)
  const bufferViolations = existingViewings.filter((v) => {
    const vStart = v.scheduledAt.getTime();
    const vEnd = vStart + v.duration * 60 * 1000;
    return (
      (proposedStart >= vEnd && proposedStart < vEnd + bufferMs) ||
      (proposedEnd > vStart - bufferMs && proposedEnd <= vStart)
    );
  });

  if (bufferViolations.length > 0) {
    return {
      hasConflict: false,
      conflictingViewings: [],
      message: `Warning: ${bufferViolations.length} viewing(s) within 15-minute buffer. Allow extra travel time.`,
    };
  }

  return { hasConflict: false, conflictingViewings: [] };
}
