/**
 * Core AI Assistants Registry (3.1 Nadia through 3.15 Laila).
 * Backwards-compatible barrel re-export aggregating decomposed chunks.
 */

import type { AIAssistantOption } from '../CRMHubPage.config';
import { CORE_AI_ASSISTANTS_PART1 } from './aiAssistantsPart1';
import { CORE_AI_ASSISTANTS_PART2 } from './aiAssistantsPart2';
import { CORE_AI_ASSISTANTS_PART3 } from './aiAssistantsPart3';

export { CORE_AI_ASSISTANTS_PART1 } from './aiAssistantsPart1';
export { CORE_AI_ASSISTANTS_PART2 } from './aiAssistantsPart2';
export { CORE_AI_ASSISTANTS_PART3 } from './aiAssistantsPart3';

export const CORE_AI_ASSISTANTS: AIAssistantOption[] = [
  ...CORE_AI_ASSISTANTS_PART1,
  ...CORE_AI_ASSISTANTS_PART2,
  ...CORE_AI_ASSISTANTS_PART3,
];
