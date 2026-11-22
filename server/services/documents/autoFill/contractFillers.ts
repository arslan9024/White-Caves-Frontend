/**
 * Contract Document Auto-Fillers: MoU, Form F (Tenancy Contract), and NOC
 */

import type { AutoFillContext, AutoFillResult } from './types.js';
import { formatCurrency, formatDate, safe } from './formatters.js';
import { fetchLead, fetchLease, fetchProperty, fetchTransaction } from './queries.js';

export async function autoFillMoU(ctx: AutoFillContext): Promise<AutoFillResult> {
  const vars: Record<string, string> = {};
  const entitiesUsed: string[] = [];
  const missingFields: string[] = [];
  const clauseSelections: Record<string, string> = {};

  // Lead = buyer data
  if (ctx.leadId) {
    const lead = await fetchLead(ctx.leadId);
    if (lead) {
      entitiesUsed.push('lead');
      vars.buyerName = safe(lead.name);
      vars.buyerPhone = safe(lead.phone);
      vars.buyerEmail = safe(lead.email);
      vars.buyerEmiratesId = ''; // Not stored in Lead model — agent fills manually
    }
  }
  if (!vars.buyerName) missingFields.push('buyerName');

  // Property
  if (ctx.propertyId) {
    const prop = await fetchProperty(ctx.propertyId);
    if (prop) {
      entitiesUsed.push('property');
      vars.propertyTitle = safe(prop.title);
      vars.propertyLocation = safe(prop.location);
      vars.propertyType = safe(prop.type);
      vars.propertyArea = prop.sqft ? `${prop.sqft} sq ft` : (safe(prop.area) || '');
      vars.propertyDistrict = safe(prop.area);
      vars.sellerName = ''; // Property doesn't store owner — agent fills
      vars.sellerPhone = '';

      // Smart clause: sale vs rental
      const isSale = ['sale', 'buy'].includes((prop.type || '').toLowerCase());
      clauseSelections.transactionType = isSale ? 'sale' : 'rental';
      vars.transactionType = isSale ? 'Sale' : 'Rental';
    }
  }
  if (!vars.propertyTitle) missingFields.push('propertyTitle');

  // Transaction
  if (ctx.transactionId) {
    const tx = await fetchTransaction(ctx.transactionId);
    if (tx) {
      entitiesUsed.push('transaction');
      vars.agreedPrice = formatCurrency(tx.amount);
      vars.depositAmount = tx.amount ? formatCurrency(tx.amount * 0.1) : ''; // 10% deposit default
      vars.closingDate = formatDate(tx.closingDate || null);
      vars.paymentPlan = safe(tx.notes); // Transaction.notes used for payment plan details

      // Smart clause: payment method
      const terms = (tx.notes || '').toLowerCase();
      if (terms.includes('mortgage')) {
        clauseSelections.paymentMethod = 'mortgage';
        vars.paymentPlan = vars.paymentPlan || 'Subject to mortgage approval';
      } else {
        clauseSelections.paymentMethod = 'cash';
      }
    }
  }

  return { variables: vars, context: { type: 'mou', entitiesUsed, clauseSelections, missingFields } };
}

export async function autoFillFormF(ctx: AutoFillContext): Promise<AutoFillResult> {
  const vars: Record<string, string> = {};
  const entitiesUsed: string[] = [];
  const missingFields: string[] = [];
  const clauseSelections: Record<string, string> = {};

  // Lead = tenant data
  if (ctx.leadId) {
    const lead = await fetchLead(ctx.leadId);
    if (lead) {
      entitiesUsed.push('lead');
      vars.tenantName = safe(lead.name);
      vars.tenantPhone = safe(lead.phone);
      vars.tenantNationality = '';
      vars.tenantEmiratesId = '';
    }
  }
  if (!vars.tenantName) missingFields.push('tenantName');

  // Lease data
  if (ctx.leaseId) {
    const lease = await fetchLease(ctx.leaseId);
    if (lease) {
      entitiesUsed.push('lease');
      vars.leaseStart = formatDate(lease.startDate);
      vars.leaseEnd = formatDate(lease.endDate);
      vars.annualRent = formatCurrency(lease.monthlyRent * 12); // Convert monthly to annual
      vars.monthlyRent = formatCurrency(lease.monthlyRent);
      vars.securityDeposit = lease.depositAmount ? formatCurrency(lease.depositAmount) : '';
      vars.ejariNumber = safe(lease.ejariNumber);
      vars.paymentFrequency = 'Monthly';

      // Smart clause: Ejari
      clauseSelections.ejariRegistered = lease.ejariNumber ? 'yes' : 'no';

      // Smart clause: furnished (from lease terms)
      const furnished = (lease.terms || '').toLowerCase();
      if (furnished.includes('furnished')) {
        clauseSelections.furnished = 'yes';
      } else {
        clauseSelections.furnished = 'no';
      }

      // Tenant info from lease
      if (lease.tenant) {
        vars.tenantName = vars.tenantName || safe(lease.tenant.name);
        vars.tenantPhone = vars.tenantPhone || safe(lease.tenant.phone);
      }

      // Property from lease
      if (lease.property) {
        entitiesUsed.push('property');
        vars.propertyTitle = safe(lease.property.title);
        vars.propertyLocation = safe(lease.property.location);
        vars.propertyType = safe(lease.property.type);
        vars.propertyArea = lease.property.sqft ? `${lease.property.sqft} sq ft` : (safe(lease.property.area) || '');
      }
    }
  }

  // Property fallback
  if (!vars.propertyTitle && ctx.propertyId) {
    const prop = await fetchProperty(ctx.propertyId);
    if (prop) {
      entitiesUsed.push('property');
      vars.propertyTitle = safe(prop.title);
      vars.propertyLocation = safe(prop.location);
      vars.propertyType = safe(prop.type);
      vars.propertyArea = prop.sqft ? `${prop.sqft} sq ft` : (safe(prop.area) || '');
    }
  }

  if (!vars.annualRent) missingFields.push('annualRent');

  // Landlord info — not stored, agent provides
  vars.landlordName = '';
  vars.landlordNationality = '';
  vars.landlordEmiratesId = '';
  vars.landlordPhone = '';

  return { variables: vars, context: { type: 'form_f', entitiesUsed, clauseSelections, missingFields } };
}

export async function autoFillNOC(ctx: AutoFillContext): Promise<AutoFillResult> {
  const vars: Record<string, string> = {};
  const entitiesUsed: string[] = [];
  const missingFields: string[] = [];
  const clauseSelections: Record<string, string> = {};

  // Property
  if (ctx.propertyId) {
    const prop = await fetchProperty(ctx.propertyId);
    if (prop) {
      entitiesUsed.push('property');
      vars.propertyTitle = safe(prop.title);
      vars.propertyLocation = safe(prop.location);
      vars.propertyType = safe(prop.type);
      vars.propertyArea = prop.sqft ? `${prop.sqft} sq ft` : (safe(prop.area) || '');
      vars.titleDeedNumber = '';
      vars.currentOwner = '';
      vars.outstandingDues = 'None';
      vars.serviceChargesStatus = 'Paid';
      vars.utilityStatus = 'Clear';
      vars.mortgageStatus = 'No outstanding mortgage';

      // Smart clause: freehold vs leasehold
      const type = (prop.type || '').toLowerCase();
      if (type.includes('freehold') || type.includes('villa')) {
        clauseSelections.ownership = 'freehold';
      } else {
        clauseSelections.ownership = 'leasehold';
      }
    }
  }
  if (!vars.propertyTitle) missingFields.push('propertyTitle');

  // New buyer
  if (ctx.leadId) {
    const lead = await fetchLead(ctx.leadId);
    if (lead) {
      entitiesUsed.push('lead');
      vars.newOwner = safe(lead.name);
    }
  }

  // Transaction
  if (ctx.transactionId) {
    const tx = await fetchTransaction(ctx.transactionId);
    if (tx) {
      entitiesUsed.push('transaction');
      vars.transferAmount = formatCurrency(tx.amount);
    }
  }

  // Valid for 30 days by default
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);
  vars.validUntil = formatDate(validUntil);

  return { variables: vars, context: { type: 'noc', entitiesUsed, clauseSelections, missingFields } };
}
