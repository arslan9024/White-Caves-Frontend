export interface CadenceRuleStep {
  stepNumber: number;
  channel: 'whatsapp' | 'email' | 'call' | 'sms';
  delayMs: number;
  templateName: string;
  description?: string;
}

export interface CadenceRule {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  priority: number;
  leadTiers: string[];
  leadSources: string[];
  dealTypes: string[];
  channelSequence: CadenceRuleStep[];
  quietHoursStart: string | null;
  quietHoursEnd: string | null;
  dailyCapPerLead: number;
  cooldownHours: number;
  createdAt: string;
  updatedAt: string;
}

export type FormMode = 'idle' | 'creating' | 'editing';

export interface RuleFormState {
  name: string;
  description: string;
  isActive: boolean;
  priority: string;
  leadTiers: string;
  leadSources: string;
  dealTypes: string;
  channelSequence: string;
  quietHoursStart: string;
  quietHoursEnd: string;
  dailyCapPerLead: string;
  cooldownHours: string;
}
