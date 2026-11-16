// Department registry for White Caves Real Estate LLC
export type DepartmentID = 'sales' | 'operations' | 'communications' | 'finance' | 'marketing' | 'executive' | 'compliance' | 'technology' | 'legal' | 'intelligence' | 'leasing' | 'maintenance';

export type AIAssistantName = 'Clara' | 'Sophia' | 'Nadia' | 'Mary' | 'Nancy' | 'Daisy' | 'Sentinel' | 'Nina' | 'Theodora' | 'Olivia' | 'Zoe' | 'Laila' | 'Aurora' | 'Hazel' | 'Willow' | 'Evangeline';

export interface AIAssistantConfig {
  name: AIAssistantName;
  roleTitle: string;
  primaryFocus: string;
  capabilities: string[];
  isPremiumModel: boolean;
  contextMemoryTokenLimit: number;
}

export interface DepartmentRegistryEntry {
  id: DepartmentID;
  name: string;
  colorHex: string;
  leadAIAssistants: AIAssistantConfig[];
  keyResponsibilities: string[];
  teamSizeHumanAgents: number;
  primaryTools: string[];
  kpis: string[];
  apiIntegrationPoints: string[];
}

