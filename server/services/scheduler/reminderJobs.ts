import { prisma } from '../../database.js';
import logger from '../../utils/logger.js';
import { logCronEvent } from './cronAudit.js';

export async function sendRentReminders(): Promise<Record<string, unknown>> {
  const { sendEmailTracked, EMAIL_TEMPLATES } = await import('../emailService.js');

  const now = new Date();
  // Window: invoices 5–35 days overdue that are still pending
  const overdueFrom = new Date(now);
  overdueFrom.setDate(overdueFrom.getDate() - 35);
  const overdueTo = new Date(now);
  overdueTo.setDate(overdueTo.getDate() - 5);

  const overdueInvoices = await prisma.invoice.findMany({
    where: {
      status: { in: ['pending', 'unpaid'] },
      dueDate: { gte: overdueFrom, lte: overdueTo },
    },
    select: {
      id: true,
      client: true,
      amount: true,
      currency: true,
      dueDate: true,
      property: true,
    },
    take: 500,
  });

  let sent = 0;
  let skipped = 0;

  for (const invoice of overdueInvoices) {
    // Look up tenant email via lease (property field stores leaseId in rent invoices)
    const lease = invoice.property
      ? await prisma.lease.findUnique({
          where: { id: invoice.property },
          select: { tenant: { select: { email: true, name: true } } },
        })
      : null;

    const tenantEmail = lease?.tenant?.email;
    const tenantName = lease?.tenant?.name || invoice.client || 'Valued Tenant';

    if (!tenantEmail) {
      skipped += 1;
      continue;
    }

    const amountStr = `${invoice.currency || 'AED'} ${(invoice.amount || 0).toFixed(2)}`;
    const dueDateStr = invoice.dueDate
      ? invoice.dueDate.toLocaleDateString('en-AE', { timeZone: 'Asia/Dubai' })
      : 'overdue';
    const template = EMAIL_TEMPLATES.paymentReminder(
      tenantName,
      amountStr,
      'monthly rent',
      dueDateStr
    );

    await sendEmailTracked({
      to: tenantEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
      tags: [{ name: 'type', value: 'rent_reminder' }],
    }).catch(err =>
      logger.warn('[SchedulerService] rent reminder send failed', { err, invoiceId: invoice.id })
    );

    sent += 1;
  }

  const summary = { scanned: overdueInvoices.length, sent, skipped };
  await logCronEvent(
    'cron_rent_reminders_snapshot',
    `Rent reminders: sent=${sent}, skipped=${skipped}`,
    summary
  );
  return summary;
}

export async function sendLeaseExpiryReminders(): Promise<Record<string, unknown>> {
  const { sendEmailTracked, EMAIL_TEMPLATES } = await import('../emailService.js');

  const now = new Date();
  // Check for leases expiring in ~90, 60, or 30 days (±2-day window each)
  const reminderWindows = [90, 60, 30] as const;
  let sent = 0;
  let skipped = 0;

  for (const days of reminderWindows) {
    const windowStart = new Date(now);
    windowStart.setDate(windowStart.getDate() + days - 2);
    const windowEnd = new Date(now);
    windowEnd.setDate(windowEnd.getDate() + days + 2);

    const expiringLeases = await prisma.lease.findMany({
      where: {
        status: { in: ['active', 'renewed'] },
        endDate: { gte: windowStart, lte: windowEnd },
      },
      select: {
        id: true,
        leaseNumber: true,
        monthlyRent: true,
        currency: true,
        endDate: true,
        tenantId: true,
        landlordId: true,
        property: { select: { title: true } },
        tenant: { select: { email: true, name: true } },
      },
      take: 500,
    });

    for (const lease of expiringLeases) {
      const tenantEmail = lease.tenant?.email;
      const tenantName = lease.tenant?.name || 'Valued Tenant';

      const expiryDateStr = lease.endDate
        ? lease.endDate.toLocaleDateString('en-AE', { timeZone: 'Asia/Dubai' })
        : 'upcoming';
      const rentStr = `${lease.currency || 'AED'} ${(Number(lease.monthlyRent) || 0).toFixed(2)}/month`;

      // Dispatch in-app notifications for both tenant and landlord
      const propTitle = lease.property?.title || 'leased unit';
      const notifTitle = `Ejari Renewal: ${days} Days Remaining`;
      const notifMsg = `Lease for "${propTitle}" expires on ${expiryDateStr}. Notice required under Dubai Tenancy Law No. 26/2007.`;

      await Promise.allSettled([
        prisma.notification.create({
          data: {
            userId: lease.tenantId,
            type: 'warning',
            channel: 'in_app',
            title: notifTitle,
            message: notifMsg,
            metadata: { leaseId: lease.id, daysRemaining: days, role: 'tenant' },
          },
        }),
        prisma.notification.create({
          data: {
            userId: lease.landlordId,
            type: 'warning',
            channel: 'in_app',
            title: notifTitle,
            message: notifMsg,
            metadata: { leaseId: lease.id, daysRemaining: days, role: 'landlord' },
          },
        }),
      ]).catch(() => {});

      if (!tenantEmail) {
        skipped += 1;
        continue;
      }

      const template = EMAIL_TEMPLATES.paymentReminder(
        tenantName,
        rentStr,
        `lease renewal (${days} days remaining, expires ${expiryDateStr})`,
        expiryDateStr
      );

      await sendEmailTracked({
        to: tenantEmail,
        subject: `Your Lease Expires in ${days} Days — Action Required`,
        html: template.html,
        text: template.text,
        tags: [{ name: 'type', value: `lease_expiry_${days}d` }],
      }).catch(err =>
        logger.warn('[SchedulerService] lease expiry reminder send failed', {
          err,
          leaseId: lease.id,
        })
      );

      sent += 1;
    }
  }

  const summary = { sent, skipped };
  await logCronEvent(
    'cron_lease_expiry_reminders_snapshot',
    `Lease expiry reminders: sent=${sent}, skipped=${skipped}`,
    summary
  );
  return summary;
}
