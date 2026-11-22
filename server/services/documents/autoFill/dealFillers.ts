/**
 * Deal & Activity Document Auto-Fillers: Commission Invoice, Viewing Report, and Offer Letter
 */

import type { AutoFillContext, AutoFillResult } from './types.js';
import { formatCurrency, formatDate, safe } from './formatters.js';
import { fetchCommission, fetchLead, fetchOffer, fetchProperty, fetchViewing } from './queries.js';

export async function autoFillCommissionInvoice(ctx: AutoFillContext): Promise<AutoFillResult> {
  const vars: Record<string, string> = {};
  const entitiesUsed: string[] = [];
  const missingFields: string[] = [];
  const clauseSelections: Record<string, string> = {};

  if (ctx.commissionId) {
    const comm = await fetchCommission(ctx.commissionId);
    if (comm) {
      entitiesUsed.push('commission');
      vars.commissionAmount = formatCurrency(comm.amount);
      vars.commissionRate = comm.percentage ? `${comm.percentage}%` : '';
      vars.commissionType = safe(comm.type);
      vars.invoiceNumber = `WC-INV-${Date.now().toString(36).toUpperCase()}`;
      vars.invoiceDate = formatDate(new Date());

      // VAT calculation (Phase 3D)
      const vatRate = comm.vatRate || 5;
      const vatAmount = comm.vatAmount || (comm.amount * vatRate / 100);
      vars.subtotal = formatCurrency(comm.amount);
      vars.vatAmount = formatCurrency(vatAmount);
      vars.totalAmount = formatCurrency(comm.amount + vatAmount);

      // Due date = 30 days
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);
      vars.dueDate = formatDate(dueDate);

      // Smart clause: sale vs rental commission percentage
      const commType = (comm.type || '').toLowerCase();
      if (commType.includes('sale') || commType.includes('buy')) {
        clauseSelections.rateType = 'sale';
        vars.commissionRate = vars.commissionRate || '2%';
      } else {
        clauseSelections.rateType = 'rental';
        vars.commissionRate = vars.commissionRate || '5%';
      }

      // Agent/client info
      if (comm.agent) {
        vars.agentName = safe(comm.agent.name);
      }
      if (comm.lead) {
        vars.clientName = safe(comm.lead.name);
        vars.clientCompany = safe(comm.lead.company);
        vars.clientEmail = safe(comm.lead.email);
      }
      if (comm.property) {
        vars.propertyTitle = safe(comm.property.title);
      }

      // TRN (Tax Registration Number) — company-level, agent fills
      vars.trnNumber = '';
      vars.bankName = '';
      vars.iban = '';
      vars.swiftCode = '';
    }
  }
  if (!vars.commissionAmount) missingFields.push('commissionAmount');

  return { variables: vars, context: { type: 'commission_invoice', entitiesUsed, clauseSelections, missingFields } };
}

export async function autoFillViewingReport(ctx: AutoFillContext): Promise<AutoFillResult> {
  const vars: Record<string, string> = {};
  const entitiesUsed: string[] = [];
  const missingFields: string[] = [];
  const clauseSelections: Record<string, string> = {};

  if (ctx.viewingId) {
    const viewing = await fetchViewing(ctx.viewingId);
    if (viewing) {
      entitiesUsed.push('viewing');
      vars.viewingDate = formatDate(viewing.scheduledAt);
      vars.viewingTime = viewing.scheduledAt?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) || '';
      vars.viewingStatus = safe(viewing.status);
      vars.feedback = safe(viewing.feedback || viewing.notes);
      vars.followUpAction = '';
      vars.nextContactDate = '';

      if (viewing.lead) {
        entitiesUsed.push('lead');
        vars.clientName = safe(viewing.lead.name);
        vars.clientPhone = safe(viewing.lead.phone);
        vars.clientBudget = viewing.lead.budget
          ? formatCurrency(viewing.lead.budget, viewing.lead.budgetCurrency || 'AED')
          : '';
        vars.leadScore = safe(viewing.lead.score);
      }
      if (viewing.property) {
        entitiesUsed.push('property');
        vars.propertyTitle = safe(viewing.property.title);
        vars.propertyLocation = safe(viewing.property.location);
        vars.propertyPrice = formatCurrency(viewing.property.price);
        vars.propertyType = safe(viewing.property.type);
        vars.propertyArea = viewing.property.sqft ? `${viewing.property.sqft} sq ft` : (safe(viewing.property.area) || '');
      }

      // Smart clause: interest level based on lead score
      const score = viewing.lead?.score || 0;
      if (score >= 80) {
        clauseSelections.interestLevel = 'very_high';
        vars.interestLevel = 'Very High';
        vars.likelihood = 'Strong likelihood of proceeding';
      } else if (score >= 60) {
        clauseSelections.interestLevel = 'high';
        vars.interestLevel = 'High';
        vars.likelihood = 'Good potential, follow-up recommended';
      } else if (score >= 30) {
        clauseSelections.interestLevel = 'moderate';
        vars.interestLevel = 'Moderate';
        vars.likelihood = 'Requires nurturing';
      } else {
        clauseSelections.interestLevel = 'low';
        vars.interestLevel = 'Low';
        vars.likelihood = 'Unlikely to convert without significant engagement';
      }
    }
  }

  // Fallback: load from separate IDs
  if (!vars.clientName && ctx.leadId) {
    const lead = await fetchLead(ctx.leadId);
    if (lead) {
      entitiesUsed.push('lead');
      vars.clientName = safe(lead.name);
      vars.clientPhone = safe(lead.phone);
      vars.clientBudget = lead.budget ? formatCurrency(lead.budget, lead.budgetCurrency || 'AED') : '';
      vars.leadScore = safe(lead.score);
    }
  }

  if (!vars.propertyTitle && ctx.propertyId) {
    const prop = await fetchProperty(ctx.propertyId);
    if (prop) {
      entitiesUsed.push('property');
      vars.propertyTitle = safe(prop.title);
      vars.propertyLocation = safe(prop.location);
      vars.propertyPrice = formatCurrency(prop.price);
      vars.propertyType = safe(prop.type);
      vars.propertyArea = prop.sqft ? `${prop.sqft} sq ft` : (safe(prop.area) || '');
    }
  }

  if (!vars.clientName) missingFields.push('clientName');
  if (!vars.propertyTitle) missingFields.push('propertyTitle');

  return { variables: vars, context: { type: 'viewing_report', entitiesUsed, clauseSelections, missingFields } };
}

export async function autoFillOfferLetter(ctx: AutoFillContext): Promise<AutoFillResult> {
  const vars: Record<string, string> = {};
  const entitiesUsed: string[] = [];
  const missingFields: string[] = [];
  const clauseSelections: Record<string, string> = {};

  if (ctx.offerId) {
    const offer = await fetchOffer(ctx.offerId);
    if (offer) {
      entitiesUsed.push('offer');
      vars.offeredPrice = formatCurrency(offer.amount);
      vars.earnestDeposit = offer.amount ? formatCurrency(offer.amount * 0.1) : ''; // 10% default
      vars.additionalConditions = safe(offer.terms || offer.notes);

      // Valid for 7 days
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 7);
      vars.validUntil = formatDate(validUntil);

      // Propose closing in 60 days
      const proposedClosing = new Date();
      proposedClosing.setDate(proposedClosing.getDate() + 60);
      vars.proposedClosing = formatDate(proposedClosing);

      if (offer.lead) {
        entitiesUsed.push('lead');
        vars.buyerName = safe(offer.lead.name);
        vars.buyerPhone = safe(offer.lead.phone);
        vars.buyerEmail = safe(offer.lead.email);
      } else if (offer.buyer) {
        entitiesUsed.push('buyer');
        vars.buyerName = safe(offer.buyer.name);
        vars.buyerPhone = safe(offer.buyer.phone);
        vars.buyerEmail = safe(offer.buyer.email);
      }
      if (offer.property) {
        entitiesUsed.push('property');
        vars.propertyTitle = safe(offer.property.title);
        vars.propertyLocation = safe(offer.property.location);
        vars.propertyType = safe(offer.property.type);
        vars.listedPrice = formatCurrency(offer.property.price);
      }

      // Smart clause: payment method
      const notes = ((offer.terms || '') + ' ' + (offer.notes || '')).toLowerCase();
      if (notes.includes('mortgage') || notes.includes('finance')) {
        clauseSelections.paymentMethod = 'mortgage';
        vars.paymentMethod = 'Bank Mortgage / Finance';
      } else {
        clauseSelections.paymentMethod = 'cash';
        vars.paymentMethod = 'Cash';
      }
    }
  }

  // Fallback: separate IDs
  if (!vars.buyerName && ctx.leadId) {
    const lead = await fetchLead(ctx.leadId);
    if (lead) {
      entitiesUsed.push('lead');
      vars.buyerName = safe(lead.name);
      vars.buyerPhone = safe(lead.phone);
      vars.buyerEmail = safe(lead.email);
    }
  }

  if (!vars.propertyTitle && ctx.propertyId) {
    const prop = await fetchProperty(ctx.propertyId);
    if (prop) {
      entitiesUsed.push('property');
      vars.propertyTitle = safe(prop.title);
      vars.propertyLocation = safe(prop.location);
      vars.propertyType = safe(prop.type);
      vars.listedPrice = formatCurrency(prop.price);
    }
  }

  if (!vars.buyerName) missingFields.push('buyerName');
  if (!vars.propertyTitle) missingFields.push('propertyTitle');

  // Seller name — agent fills
  vars.sellerName = '';

  return { variables: vars, context: { type: 'offer_letter', entitiesUsed, clauseSelections, missingFields } };
}
