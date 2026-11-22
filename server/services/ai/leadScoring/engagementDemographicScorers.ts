/**
 * Lead Scoring Engine — Engagement (40%) & Demographic (30%) Category Scorers
 */

import { prisma } from '../../../database.js';
import {
  convertToAED,
  isSupportedCurrency,
  type SupportedCurrency,
} from '../../currencyService.js';
import type { CategoryScoreResult, ScoreFactor } from './types.js';

/**
 * ENGAGEMENT (40% weight) — How actively is the lead interacting?
 * Factors: activity count, recency of contact, viewing count, offer count, communication frequency
 */
export async function scoreEngagement(leadId: string): Promise<CategoryScoreResult> {
  const factors: ScoreFactor[] = [];
  let score = 0;

  // 1. Activity count (max 12 points)
  const activityCount = await prisma.activity.count({ where: { leadId } });
  let activityPoints = 0;
  if (activityCount >= 20) activityPoints = 12;
  else if (activityCount >= 10) activityPoints = 9;
  else if (activityCount >= 5) activityPoints = 6;
  else if (activityCount >= 2) activityPoints = 3;
  else if (activityCount >= 1) activityPoints = 1;
  score += activityPoints;
  factors.push({
    category: 'engagement',
    factor: 'activity_count',
    points: activityPoints,
    maxPoints: 12,
    description: `${activityCount} activities logged`,
  });

  // 2. Viewing count (max 10 points)
  const viewingCount = await prisma.viewing.count({ where: { leadId } });
  let viewingPoints = 0;
  if (viewingCount >= 5) viewingPoints = 10;
  else if (viewingCount >= 3) viewingPoints = 8;
  else if (viewingCount >= 2) viewingPoints = 5;
  else if (viewingCount >= 1) viewingPoints = 3;
  score += viewingPoints;
  factors.push({
    category: 'engagement',
    factor: 'viewing_count',
    points: viewingPoints,
    maxPoints: 10,
    description: `${viewingCount} property viewings`,
  });

  // 3. Offer count (max 10 points)
  const offerCount = await prisma.offer.count({ where: { leadId } });
  let offerPoints = 0;
  if (offerCount >= 3) offerPoints = 10;
  else if (offerCount >= 2) offerPoints = 8;
  else if (offerCount >= 1) offerPoints = 5;
  score += offerPoints;
  factors.push({
    category: 'engagement',
    factor: 'offer_count',
    points: offerPoints,
    maxPoints: 10,
    description: `${offerCount} offers submitted`,
  });

  // 4. Last contact recency (max 8 points)
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { lastContact: true, createdAt: true },
  });
  const lastContactDate = lead?.lastContact || lead?.createdAt;
  let recencyPoints = 0;
  if (lastContactDate) {
    const daysSinceContact = (Date.now() - lastContactDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceContact <= 1) recencyPoints = 8;
    else if (daysSinceContact <= 3) recencyPoints = 6;
    else if (daysSinceContact <= 7) recencyPoints = 4;
    else if (daysSinceContact <= 14) recencyPoints = 2;
    else if (daysSinceContact <= 30) recencyPoints = 1;
  }
  score += recencyPoints;
  factors.push({
    category: 'engagement',
    factor: 'contact_recency',
    points: recencyPoints,
    maxPoints: 8,
    description: lastContactDate
      ? `Last contact ${Math.round((Date.now() - lastContactDate.getTime()) / (1000 * 60 * 60 * 24))} days ago`
      : 'No contact recorded',
  });

  return { score: Math.min(40, score), factors };
}

/**
 * DEMOGRAPHIC (30% weight) — How qualified is this lead?
 * Factors: budget, email, phone, company, property interest
 */
export async function scoreDemographic(leadId: string): Promise<CategoryScoreResult> {
  const factors: ScoreFactor[] = [];
  let score = 0;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: {
      budget: true,
      budgetCurrency: true,
      email: true,
      phone: true,
      company: true,
      propertyId: true,
      tags: true,
    },
  });
  if (!lead) return { score: 0, factors };

  // 1. Budget specified (max 10 points — higher budget = more qualified, converted to AED)
  let budgetPoints = 0;
  let budgetInAED = 0;
  const currencyCode: SupportedCurrency =
    lead.budgetCurrency && isSupportedCurrency(lead.budgetCurrency)
      ? (lead.budgetCurrency as SupportedCurrency)
      : 'AED';

  if (lead.budget) {
    budgetInAED = convertToAED(lead.budget, currencyCode);

    if (budgetInAED >= 5_000_000)
      budgetPoints = 10; // AED 5M+ luxury
    else if (budgetInAED >= 2_000_000)
      budgetPoints = 8; // AED 2M+ premium
    else if (budgetInAED >= 1_000_000)
      budgetPoints = 6; // AED 1M+ standard
    else if (budgetInAED >= 500_000)
      budgetPoints = 4; // AED 500K+
    else if (budgetInAED > 0) budgetPoints = 2; // Has budget
  }
  score += budgetPoints;
  factors.push({
    category: 'demographic',
    factor: 'budget',
    points: budgetPoints,
    maxPoints: 10,
    description: lead.budget
      ? currencyCode === 'AED'
        ? `Budget: AED ${lead.budget.toLocaleString()}`
        : `Budget: ${currencyCode} ${lead.budget.toLocaleString()} (≈ AED ${Math.round(budgetInAED).toLocaleString()})`
      : 'No budget specified',
  });

  // 2. Contact completeness (max 8 points)
  let contactPoints = 0;
  if (lead.email && lead.phone) contactPoints = 8;
  else if (lead.phone) contactPoints = 5;
  else if (lead.email) contactPoints = 3;
  score += contactPoints;
  factors.push({
    category: 'demographic',
    factor: 'contact_info',
    points: contactPoints,
    maxPoints: 8,
    description: `${lead.email ? '✓ Email' : '✗ Email'} ${lead.phone ? '✓ Phone' : '✗ Phone'}`,
  });

  // 3. Company affiliation (max 4 points)
  const companyPoints = lead.company ? 4 : 0;
  score += companyPoints;
  factors.push({
    category: 'demographic',
    factor: 'company',
    points: companyPoints,
    maxPoints: 4,
    description: lead.company ? `Company: ${lead.company}` : 'No company',
  });

  // 4. Property interest (max 5 points)
  const propertyPoints = lead.propertyId ? 5 : 0;
  score += propertyPoints;
  factors.push({
    category: 'demographic',
    factor: 'property_interest',
    points: propertyPoints,
    maxPoints: 5,
    description: lead.propertyId ? 'Linked to specific property' : 'No property linked',
  });

  // 5. Tags richness (max 3 points)
  const tagCount = lead.tags?.length || 0;
  let tagPoints = 0;
  if (tagCount >= 3) tagPoints = 3;
  else if (tagCount >= 1) tagPoints = 1;
  score += tagPoints;
  factors.push({
    category: 'demographic',
    factor: 'tags',
    points: tagPoints,
    maxPoints: 3,
    description: `${tagCount} tags assigned`,
  });

  return { score: Math.min(30, score), factors };
}
