/**
 * Scheduling Service — .ics (iCalendar) Generation
 *
 * @module scheduling/icsCalendar
 */

import { prisma } from '../../database.js';
import type { ICSEvent } from './types.js';

/**
 * Escape special characters for ICS text fields.
 */
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generate an .ics (iCalendar) file content for a viewing.
 * RFC 5545 compliant.
 */
export function generateICSContent(event: ICSEvent): string {
  const formatDate = (d: Date): string =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//White Caves//Viewing Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.startTime)}`,
    `DTEND:${formatDate(event.endTime)}`,
    `SUMMARY:${escapeICSText(event.title)}`,
    `DESCRIPTION:${escapeICSText(event.description)}`,
    `LOCATION:${escapeICSText(event.location)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
  ];

  if (event.organizer) {
    lines.push(
      `ORGANIZER;CN=${escapeICSText(event.organizer.name)}:mailto:${event.organizer.email}`,
    );
  }

  if (event.attendees) {
    for (const attendee of event.attendees) {
      lines.push(
        `ATTENDEE;ROLE=REQ-PARTICIPANT;CN=${escapeICSText(attendee.name)}:mailto:${attendee.email}`,
      );
    }
  }

  if (event.url) {
    lines.push(`URL:${event.url}`);
  }

  // Add reminders: 1 hour and 15 minutes before
  lines.push(
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Viewing reminder - 1 hour',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Viewing reminder - 15 minutes',
    'END:VALARM',
  );

  lines.push('END:VEVENT', 'END:VCALENDAR');

  return lines.join('\r\n');
}

/**
 * Generate ICS content for a viewing record from the database.
 */
export async function generateViewingICS(viewingId: string): Promise<string> {
  const viewing = await prisma.viewing.findUnique({
    where: { id: viewingId },
    include: {
      property: { select: { id: true, title: true, location: true, type: true } },
      user: { select: { name: true, email: true } },
      agent: { select: { name: true, email: true } },
    },
  });

  if (!viewing) {
    throw new Error('Viewing not found');
  }

  const endTime = new Date(
    viewing.scheduledAt.getTime() + viewing.duration * 60 * 1000,
  );

  const attendees: Array<{ name: string; email: string }> = [];
  if (viewing.user) {
    attendees.push({
      name: viewing.user.name || 'Client',
      email: viewing.user.email,
    });
  }
  if (viewing.agent) {
    attendees.push({
      name: viewing.agent.name || 'Agent',
      email: viewing.agent.email,
    });
  }

  const event: ICSEvent = {
    title: `Property Viewing: ${viewing.property?.title || 'Unknown Property'}`,
    description: [
      `Property: ${viewing.property?.title || 'N/A'}`,
      `Type: ${viewing.type}`,
      `Duration: ${viewing.duration} minutes`,
      viewing.notes ? `Notes: ${viewing.notes}` : '',
      '',
      'Powered by White Caves Real Estate CRM',
    ]
      .filter(Boolean)
      .join('\\n'),
    location: viewing.location || viewing.property?.location || 'TBD',
    startTime: viewing.scheduledAt,
    endTime,
    uid: `viewing-${viewing.id}@whitecaves.ae`,
    attendees,
  };

  if (attendees.length > 0) {
    event.organizer = attendees[attendees.length - 1]; // Agent or last attendee
  }

  return generateICSContent(event);
}
