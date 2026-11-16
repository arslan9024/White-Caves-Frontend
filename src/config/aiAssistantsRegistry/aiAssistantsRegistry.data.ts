import { AIAssistant } from './aiAssistantsRegistry.types';
import { assistantsBatch1 } from './assistantsBatch1.data';
import { assistantsBatch2 } from './assistantsBatch2.data';

export const AI_ASSISTANTS: Record<string, AIAssistant> = {
  ...assistantsBatch1,
  ...assistantsBatch2,
};

