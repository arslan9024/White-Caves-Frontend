import type { Lead, LeadFormData } from './leadTypes';

/**
 * AI Scoring & Logic Helpers
 */
export const calculateLeadScore = (lead: LeadFormData): number => {
  let score = 20; // Base score
  if (lead.email) score += 20;
  if (lead.phone) score += 20;
  if (lead.company) score += 10;

  const budget = Number(lead.budget);
  if (budget > 10000000)
    score += 30; // 10M+ AED
  else if (budget > 5000000)
    score += 20; // 5M+ AED
  else if (budget > 1000000) score += 10;

  return Math.min(score, 100);
};

export const assignAgentForScore = (score: number): string => {
  if (score >= 80) return 'Ahmed A.';
  if (score >= 50) return 'Sarah M.';
  return 'General Pool';
};

export const checkDuplicateLead = (
  formData: LeadFormData,
  allLeads: Lead[],
  excludeLeadId?: string | number
): boolean => {
  const normEmail = formData.email ? formData.email.trim().toLowerCase() : '';
  const normPhone = formData.phone ? formData.phone.trim() : '';

  return allLeads.some(l => {
    if (excludeLeadId !== undefined && l.id === excludeLeadId) return false;
    const matchEmail = Boolean(normEmail && l.email?.toLowerCase() === normEmail);
    const matchPhone = Boolean(normPhone && l.phone === normPhone);
    return matchEmail || matchPhone;
  });
};
