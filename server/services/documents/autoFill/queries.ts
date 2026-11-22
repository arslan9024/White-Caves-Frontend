/**
 * Prisma query helpers for Document Auto-Fill
 */

import { prisma } from '../../../database.js';

const db = prisma as any;

export async function fetchLead(leadId: string) {
  return db.lead.findUnique({
    where: { id: leadId },
    include: {
      assignedTo: { select: { id: true, name: true, email: true, phone: true } },
      property: { select: { id: true, title: true, type: true, location: true } },
    },
  });
}

export async function fetchProperty(propertyId: string) {
  return db.property.findUnique({
    where: { id: propertyId },
  });
}

export async function fetchTransaction(transactionId: string) {
  return db.transaction.findUnique({
    where: { id: transactionId },
    include: {
      lead: { select: { name: true, phone: true, email: true } },
      property: { select: { title: true, location: true, type: true } },
    },
  });
}

export async function fetchCommission(commissionId: string) {
  return db.commission.findUnique({
    where: { id: commissionId },
    include: {
      agent: { select: { name: true, email: true } },
      lead: { select: { name: true, company: true, email: true } },
      property: { select: { title: true } },
    },
  });
}

export async function fetchViewing(viewingId: string) {
  return db.viewing.findUnique({
    where: { id: viewingId },
    include: {
      lead: { select: { name: true, phone: true, budget: true, budgetCurrency: true, score: true } },
      property: { select: { title: true, location: true, price: true, type: true, area: true, sqft: true } },
    },
  });
}

export async function fetchLease(leaseId: string) {
  return db.lease.findUnique({
    where: { id: leaseId },
    include: {
      tenant: { select: { id: true, name: true, email: true, phone: true } },
      property: { select: { title: true, location: true, type: true, area: true, sqft: true } },
    },
  });
}

export async function fetchOffer(offerId: string) {
  return db.offer.findUnique({
    where: { id: offerId },
    include: {
      lead: { select: { name: true, phone: true, email: true } },
      buyer: { select: { id: true, name: true, email: true, phone: true } },
      property: { select: { title: true, location: true, type: true, price: true } },
    },
  });
}
