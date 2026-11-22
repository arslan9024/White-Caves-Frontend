/**
 * Follow-Up Engine — Dynamic Cadence Rule Resolution
 */

import { prisma } from '../../../database.js';
import type { CadenceTemplate, CadenceStep } from '../cadenceTemplates.js';
import type { DynamicCadenceStep, CadenceRuleRecord } from './types.js';

const cadenceRuleModel = prisma as typeof prisma & {
  cadenceRule: {
    findMany: (args: {
      where: { isActive: boolean };
      orderBy: Array<{ priority: 'desc' } | { createdAt: 'desc' }>;
      take: number;
    }) => Promise<CadenceRuleRecord[]>;
  };
};

export function normalizeDynamicCadenceSteps(value: unknown): CadenceStep[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((raw, index) => {
      const step = raw as DynamicCadenceStep;
      const channel = step.channel;
      if (
        channel !== 'whatsapp' &&
        channel !== 'email' &&
        channel !== 'call' &&
        channel !== 'sms'
      ) {
        return null;
      }

      return {
        stepNumber: index + 1,
        channel,
        delayMs:
          typeof step.delayMs === 'number' && Number.isFinite(step.delayMs) && step.delayMs >= 0
            ? step.delayMs
            : index === 0
              ? 5 * 60 * 1000
              : 24 * 60 * 60 * 1000,
        templateName:
          typeof step.templateName === 'string' && step.templateName.trim().length > 0
            ? step.templateName.trim()
            : `dynamic_${channel}_${index + 1}`,
        description:
          typeof step.description === 'string' && step.description.trim().length > 0
            ? step.description.trim()
            : `Dynamic cadence ${channel} step ${index + 1}`,
      } satisfies CadenceStep;
    })
    .filter((step): step is CadenceStep => Boolean(step));
}

export async function resolveCadenceFromDynamicRules(lead: {
  id: string;
  scoreTier: string | null;
  source: string | null;
  dealType: string | null;
}): Promise<CadenceTemplate | null> {
  const rules = await cadenceRuleModel.cadenceRule.findMany({
    where: { isActive: true },
    orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    take: 50,
  });

  for (const rule of rules) {
    const tierMatch =
      rule.leadTiers.length === 0 ||
      (lead.scoreTier ? rule.leadTiers.includes(lead.scoreTier) : false);
    const sourceMatch =
      rule.leadSources.length === 0 ||
      (lead.source ? rule.leadSources.includes(lead.source) : false);
    const dealTypeMatch =
      rule.dealTypes.length === 0 ||
      (lead.dealType ? rule.dealTypes.includes(lead.dealType) : false);

    if (!tierMatch || !sourceMatch || !dealTypeMatch) {
      continue;
    }

    const steps = normalizeDynamicCadenceSteps(rule.channelSequence);
    if (steps.length === 0) {
      continue;
    }

    return {
      cadenceType: `rule:${rule.id}`,
      name: rule.name,
      description: rule.description || `Dynamic cadence rule ${rule.name}`,
      totalSteps: steps.length,
      steps,
      maxDurationDays: 30,
    };
  }

  return null;
}
