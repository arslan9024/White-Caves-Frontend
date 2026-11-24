/**
 * Operations & Advisory AI Assistants Registry (3.16 Aurora through 3.30 Mira).
 * Aggregates systems & operations with advisory & client services assistants.
 */

import type { AIAssistantOption } from '../CRMHubPage.config';
import { OPERATIONS_SYSTEMS_ASSISTANTS } from './aiAssistantsOperationsSystems';
import { ADVISORY_CLIENT_ASSISTANTS } from './aiAssistantsAdvisoryClient';

export { OPERATIONS_SYSTEMS_ASSISTANTS } from './aiAssistantsOperationsSystems';
export { ADVISORY_CLIENT_ASSISTANTS } from './aiAssistantsAdvisoryClient';

export const OPERATIONS_AI_ASSISTANTS: AIAssistantOption[] = [
  ...OPERATIONS_SYSTEMS_ASSISTANTS,
  ...ADVISORY_CLIENT_ASSISTANTS,
];
