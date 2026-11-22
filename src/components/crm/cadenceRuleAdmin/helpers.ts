import type { CadenceRule, CadenceRuleStep, RuleFormState } from './types';

export const DEFAULT_FORM: RuleFormState = {
  name: '',
  description: '',
  isActive: true,
  priority: '0',
  leadTiers: '',
  leadSources: '',
  dealTypes: '',
  channelSequence: JSON.stringify(
    [
      {
        stepNumber: 1,
        channel: 'whatsapp',
        delayMs: 300000,
        templateName: 'initial_contact',
        description: 'First touch',
      },
    ],
    null,
    2
  ),
  quietHoursStart: '',
  quietHoursEnd: '',
  dailyCapPerLead: '3',
  cooldownHours: '24',
};

export function csvToArray(csv: string): string[] {
  return csv
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

export function ruleToForm(rule: CadenceRule): RuleFormState {
  return {
    name: rule.name,
    description: rule.description ?? '',
    isActive: rule.isActive,
    priority: String(rule.priority),
    leadTiers: rule.leadTiers.join(', '),
    leadSources: rule.leadSources.join(', '),
    dealTypes: rule.dealTypes.join(', '),
    channelSequence: JSON.stringify(rule.channelSequence, null, 2),
    quietHoursStart: rule.quietHoursStart ?? '',
    quietHoursEnd: rule.quietHoursEnd ?? '',
    dailyCapPerLead: String(rule.dailyCapPerLead),
    cooldownHours: String(rule.cooldownHours),
  };
}

export function formToPayload(form: RuleFormState): Record<string, unknown> {
  return {
    name: form.name.trim(),
    description: form.description.trim() || null,
    isActive: form.isActive,
    priority: Math.max(0, parseInt(form.priority) || 0),
    leadTiers: csvToArray(form.leadTiers),
    leadSources: csvToArray(form.leadSources),
    dealTypes: csvToArray(form.dealTypes),
    channelSequence: JSON.parse(form.channelSequence) as CadenceRuleStep[],
    quietHoursStart: form.quietHoursStart.trim() || null,
    quietHoursEnd: form.quietHoursEnd.trim() || null,
    dailyCapPerLead: Math.max(1, parseInt(form.dailyCapPerLead) || 3),
    cooldownHours: Math.max(0, parseInt(form.cooldownHours) || 24),
  };
}
