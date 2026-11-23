import type { Lead, AggregationStatistics } from './types';

export function filterLeadsByScoreRange(leads: Lead[], minScore: number, maxScore: number): Lead[] {
  return leads.filter(lead => (lead.score ?? 0) >= minScore && (lead.score ?? 0) <= maxScore);
}

export function filterHotLeads(leads: Lead[], threshold = 70): Lead[] {
  return leads
    .filter(lead => (lead.score ?? 0) >= threshold)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

export function filterLeadsByPortal(leads: Lead[], portalId: string): Lead[] {
  return leads.filter(lead => lead.portalId === portalId);
}

export function filterUnassignedLeads(leads: Lead[]): Lead[] {
  return leads.filter(lead => !lead.assignedAgent);
}

export function calculateLeadStatistics(leads: Lead[]): AggregationStatistics {
  const scores = leads.map(l => l.score ?? 0);
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  return {
    totalLeads: leads.length,
    averageScore: Math.round(avgScore),
    highestScore: scores.length > 0 ? Math.max(...scores) : 0,
    lowestScore: scores.length > 0 ? Math.min(...scores) : 0,
    scoreDistribution: {
      excellent: filterLeadsByScoreRange(leads, 80, 100).length,
      veryGood: filterLeadsByScoreRange(leads, 60, 79).length,
      good: filterLeadsByScoreRange(leads, 40, 59).length,
      fair: filterLeadsByScoreRange(leads, 20, 39).length,
      poor: filterLeadsByScoreRange(leads, 0, 19).length,
    },
  };
}
