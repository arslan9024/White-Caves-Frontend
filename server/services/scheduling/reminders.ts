/**
 * Scheduling Service — Viewing Reminder Scheduler
 *
 * @module scheduling/reminders
 */

import { prisma } from '../../database.js';
import logger from '../../utils/logger.js';

/**
 * Process upcoming viewing reminders.
 * Sends reminders for viewings happening in:
 * - 24 hours (first reminder)
 * - 1 hour (final reminder)
 *
 * Called by a cron job or scheduler.
 */
export async function processViewingReminders(): Promise<{
  sent: number;
  errors: number;
}> {
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
  const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Find viewings needing reminders (within 1h or 24h window, not yet reminded)
  const viewingsNeedingReminder = await prisma.viewing.findMany({
    where: {
      status: { in: ['scheduled', 'confirmed'] },
      reminderSent: false,
      scheduledAt: {
        gte: now,
        lte: twentyFourHoursFromNow,
      },
    },
    include: {
      property: { select: { title: true, location: true } },
      user: { select: { name: true, email: true, phone: true } },
      agent: { select: { name: true, email: true, phone: true } },
    },
    take: 50, // Process in batches
  });

  let sent = 0;
  let errors = 0;

  for (const viewing of viewingsNeedingReminder) {
    try {
      const isUrgent = viewing.scheduledAt.getTime() <= oneHourFromNow.getTime();
      const timeLabel = isUrgent ? '1 hour' : '24 hours';

      logger.info('Sending viewing reminder', {
        viewingId: viewing.id,
        timeLabel,
        scheduledAt: viewing.scheduledAt.toISOString(),
        userName: viewing.user?.name,
        propertyTitle: viewing.property?.title,
      });

      // Try to send email notification
      try {
        const { sendEmailTracked, wrapInBrandedTemplate } = await import('../emailService.js');
        const emailBody = wrapInBrandedTemplate(`
          <h2 style="color: #c9a84c;">Viewing Reminder</h2>
          <p>Your property viewing is in <strong>${timeLabel}</strong>.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px; font-weight: bold;">Property:</td><td style="padding: 8px;">${viewing.property?.title || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Location:</td><td style="padding: 8px;">${viewing.location || viewing.property?.location || 'TBD'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Date & Time:</td><td style="padding: 8px;">${viewing.scheduledAt.toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Duration:</td><td style="padding: 8px;">${viewing.duration} minutes</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Type:</td><td style="padding: 8px;">${viewing.type.replace('_', ' ')}</td></tr>
          </table>
          <p style="margin-top: 16px; color: #666;">Please arrive 5 minutes early. Contact your agent if you need to reschedule.</p>
        `);

        if (viewing.user?.email) {
          await sendEmailTracked({
            to: viewing.user.email,
            subject: `Viewing Reminder: ${viewing.property?.title || 'Property Viewing'} in ${timeLabel}`,
            html: emailBody,
            tags: [{ name: 'type', value: 'viewing_reminder' }],
          });
        }
      } catch (emailError) {
        logger.warn('Failed to send viewing email reminder', { viewingId: viewing.id, error: emailError });
      }

      // Mark reminder as sent
      await prisma.viewing.update({
        where: { id: viewing.id },
        data: { reminderSent: true },
      });

      sent++;
    } catch (error) {
      logger.error('Failed to process viewing reminder', { viewingId: viewing.id, error });
      errors++;
    }
  }

  if (sent > 0 || errors > 0) {
    logger.info('Viewing reminders processed', { sent, errors, total: viewingsNeedingReminder.length });
  }

  return { sent, errors };
}

/**
 * Start the viewing reminder scheduler.
 * Checks every 15 minutes for viewings needing reminders.
 */
export function startViewingReminderScheduler(): NodeJS.Timeout {
  logger.info('Starting viewing reminder scheduler (every 15 min)');

  const interval = setInterval(async () => {
    try {
      await processViewingReminders();
    } catch (error) {
      logger.error('Viewing reminder scheduler error', { error });
    }
  }, 15 * 60 * 1000); // 15 minutes

  // Run once on startup (after 30s delay)
  setTimeout(() => {
    processViewingReminders().catch((err) =>
      logger.error('Initial viewing reminder check failed', { error: err }),
    );
  }, 30_000);

  return interval;
}
