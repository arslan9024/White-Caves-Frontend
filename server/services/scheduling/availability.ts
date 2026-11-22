/**
 * Scheduling Service — Agent Availability CRUD
 *
 * @module scheduling/availability
 */

import { prisma } from '../../database.js';
import { DEFAULT_SCHEDULE, type AgentSchedule } from './types.js';
import { parseTimeToMinutes } from './timeUtils.js';

/**
 * Get agent's weekly availability schedule.
 * Returns stored schedule or default Dubai-business-hours schedule.
 */
export async function getAgentAvailability(agentId: string): Promise<AgentSchedule[]> {
  const stored = await prisma.agentAvailability.findMany({
    where: { agentId },
    orderBy: { dayOfWeek: 'asc' },
  });

  if (stored.length === 0) {
    return DEFAULT_SCHEDULE;
  }

  return stored.map((s) => ({
    dayOfWeek: s.dayOfWeek,
    startTime: s.startTime,
    endTime: s.endTime,
    isActive: s.isActive,
    slotDuration: s.slotDuration,
    breakStart: s.breakStart ?? undefined,
    breakEnd: s.breakEnd ?? undefined,
  }));
}

/**
 * Set agent's availability for a specific day of the week.
 * Upserts: creates if not exists, updates if it does.
 */
export async function setAgentAvailability(
  agentId: string,
  schedule: AgentSchedule,
): Promise<AgentSchedule> {
  // Validate
  if (schedule.dayOfWeek < 0 || schedule.dayOfWeek > 6) {
    throw new Error('dayOfWeek must be 0-6 (Sunday-Saturday)');
  }
  const startMin = parseTimeToMinutes(schedule.startTime);
  const endMin = parseTimeToMinutes(schedule.endTime);
  if (startMin >= endMin) {
    throw new Error('startTime must be before endTime');
  }
  if (schedule.breakStart && schedule.breakEnd) {
    const breakStartMin = parseTimeToMinutes(schedule.breakStart);
    const breakEndMin = parseTimeToMinutes(schedule.breakEnd);
    if (breakStartMin >= breakEndMin) {
      throw new Error('breakStart must be before breakEnd');
    }
    if (breakStartMin < startMin || breakEndMin > endMin) {
      throw new Error('break must be within working hours');
    }
  }

  const result = await prisma.agentAvailability.upsert({
    where: { agentId_dayOfWeek: { agentId, dayOfWeek: schedule.dayOfWeek } },
    create: {
      agentId,
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isActive: schedule.isActive,
      slotDuration: schedule.slotDuration || 30,
      breakStart: schedule.breakStart || null,
      breakEnd: schedule.breakEnd || null,
    },
    update: {
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isActive: schedule.isActive,
      slotDuration: schedule.slotDuration || 30,
      breakStart: schedule.breakStart || null,
      breakEnd: schedule.breakEnd || null,
    },
  });

  return {
    dayOfWeek: result.dayOfWeek,
    startTime: result.startTime,
    endTime: result.endTime,
    isActive: result.isActive,
    slotDuration: result.slotDuration,
    breakStart: result.breakStart ?? undefined,
    breakEnd: result.breakEnd ?? undefined,
  };
}

/**
 * Set agent's full weekly availability (bulk upsert all 7 days).
 */
export async function setAgentWeeklyAvailability(
  agentId: string,
  schedules: AgentSchedule[],
): Promise<AgentSchedule[]> {
  const results: AgentSchedule[] = [];
  for (const schedule of schedules) {
    results.push(await setAgentAvailability(agentId, schedule));
  }
  return results;
}
