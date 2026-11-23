import { AIAssistantItem } from './types';
import { AI_ASSISTANTS_DATA_PART1 } from './assistantsDataPart1';
import { AI_ASSISTANTS_DATA_PART2 } from './assistantsDataPart2';

export const AI_ASSISTANTS: AIAssistantItem[] = [
  ...AI_ASSISTANTS_DATA_PART1,
  ...AI_ASSISTANTS_DATA_PART2,
];

export const DEPARTMENTS: string[] = [
  'All',
  'Executive',
  'Operations',
  'Sales',
  'Leasing',
  'Communications',
  'Marketing',
  'Finance',
  'Legal',
  'Compliance',
  'Technology',
  'HR',
];
