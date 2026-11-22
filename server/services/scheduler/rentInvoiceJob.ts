import { prisma } from '../../database.js';
import { logCronEvent } from './cronAudit.js';

export function buildInvoiceNumber(leaseNumber: string | null, dueDate: Date): string {
  const ym = `${dueDate.getUTCFullYear()}${String(dueDate.getUTCMonth() + 1).padStart(2, '0')}`;
  const leaseRef = (leaseNumber || 'LEASE')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 8)
    .toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INV-RENT-${leaseRef}-${ym}-${random}`;
}

export async function generateMonthlyRentInvoices(): Promise<Record<string, unknown>> {
  const now = new Date();
  const periodTag = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;

  const dueLeases = await prisma.lease.findMany({
    where: {
      status: { in: ['active', 'renewed'] },
      nextPaymentDue: { lte: now },
    },
    select: {
      id: true,
      leaseNumber: true,
      monthlyRent: true,
      currency: true,
      nextPaymentDue: true,
      endDate: true,
      tenant: { select: { name: true } },
      landlordId: true,
    },
    take: 1000,
  });

  let generated = 0;
  let skipped = 0;

  for (const lease of dueLeases) {
    const dueDate = lease.nextPaymentDue ?? now;
    const monthlyRent = Number(lease.monthlyRent || 0);
    if (monthlyRent <= 0) {
      skipped += 1;
      continue;
    }

    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        property: lease.id,
        notes: { contains: `PERIOD:${periodTag}` },
      },
      select: { id: true },
    });

    if (existingInvoice) {
      skipped += 1;
      continue;
    }

    const invoiceNumber = buildInvoiceNumber(lease.leaseNumber, dueDate);

    await prisma.invoice.create({
      data: {
        invoiceNumber,
        client: lease.tenant?.name || `Tenant ${lease.id}`,
        property: lease.id,
        amount: monthlyRent,
        vatAmount: 0,
        totalAmount: monthlyRent,
        currency: lease.currency || 'AED',
        dueDate,
        notes: `TYPE:rent | PERIOD:${periodTag} | AUTO:monthly-cron`,
        createdById: lease.landlordId || null,
      },
    });

    const nextDueDate = new Date(dueDate);
    nextDueDate.setUTCMonth(nextDueDate.getUTCMonth() + 1);
    if (nextDueDate <= lease.endDate) {
      await prisma.lease.update({
        where: { id: lease.id },
        data: { nextPaymentDue: nextDueDate },
      });
    }

    generated += 1;
  }

  const summary = {
    scanned: dueLeases.length,
    generated,
    skipped,
    periodTag,
  };

  await logCronEvent(
    'cron_rent_generation_snapshot',
    `Monthly rent generation completed: generated=${generated}, skipped=${skipped}`,
    summary
  );

  return summary;
}
