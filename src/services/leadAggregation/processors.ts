import type { Lead, DeduplicationRule, ScoringRule, AssignmentRule, Agent } from './types';

export function generateDeduplicationKey(lead: Lead, fields: string[]): string {
  return fields
    .map(field => {
      if (field === 'email_domain') {
        return lead.email?.split('@')[1] || '';
      }
      return lead[field] || '';
    })
    .filter(Boolean)
    .join('|')
    .toLowerCase();
}

export function deduplicateLeadsList(
  leads: Lead[],
  deduplicationRules: DeduplicationRule[]
): Lead[] {
  const deduplicated: Lead[] = [];
  const duplicateMap = new Map<string, Lead>();

  for (const lead of leads) {
    let isDuplicate = false;

    for (const rule of deduplicationRules) {
      const key = generateDeduplicationKey(lead, rule.fields);

      if (duplicateMap.has(key)) {
        isDuplicate = true;
        const existingLead = duplicateMap.get(key)!;

        if (rule.action === 'merge' && rule.merge) {
          const merged = rule.merge(existingLead, lead);
          duplicateMap.set(key, merged);
        }
        break;
      }
    }

    if (!isDuplicate) {
      deduplicated.push(lead);
      const key = generateDeduplicationKey(lead, deduplicationRules[0]?.fields || ['email']);
      duplicateMap.set(key, lead);
    }
  }

  return deduplicated;
}

export function evaluateLeadScore(lead: Lead, scoringRules: ScoringRule[]): number {
  let score = 0;

  for (const rule of scoringRules) {
    if (rule.condition(lead)) {
      score += rule.points;
    }
  }

  return Math.min(100, score); // Cap at 100
}

export function getLeadRatingText(score: number): string {
  if (score >= 80) return '⭐⭐⭐⭐⭐ Excellent';
  if (score >= 60) return '⭐⭐⭐⭐ Very Good';
  if (score >= 40) return '⭐⭐⭐ Good';
  if (score >= 20) return '⭐⭐ Fair';
  return '⭐ Poor';
}

export function scoreLeadsList(leads: Lead[], scoringRules: ScoringRule[]): Lead[] {
  return leads.map(lead => {
    const score = evaluateLeadScore(lead, scoringRules);
    return {
      ...lead,
      score,
      rating: getLeadRatingText(score),
    };
  });
}

export function assignLeadsToAgentsList(
  leads: Lead[],
  assignmentRules: AssignmentRule[],
  agents: Agent[] = []
): Lead[] {
  return leads.map(lead => {
    let assignedAgent: Agent | null = null;
    let assignmentReason = 'no_rule_matched';

    for (const rule of assignmentRules) {
      if (rule.condition(lead)) {
        const agentId = rule.assignTo(lead);
        assignedAgent = agents.find(a => a.id === agentId) || null;
        assignmentReason = rule.name;
        break;
      }
    }

    return {
      ...lead,
      assignedAgent,
      assignmentReason,
      assignedAt: assignedAgent ? new Date().toISOString() : null,
    };
  });
}
