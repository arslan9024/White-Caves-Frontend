import { ReactNode } from 'react';

export interface AssistantFeatureItem {
  name: string;
  category: string;
  status: 'active' | 'beta' | 'planned';
  description: string;
  sourceFiles?: string[];
  capabilities?: string[];
  icon?: ReactNode;
  nextMilestone?: string;
}
