/**
 * CRMHubPage.registries.ts
 * Master AI assistant registry, MD Suite, 12 corporate departments, and AI team squads.
 * Restored from canonical September ERP specifications.
 */

import type { SubGroup, BuildingTier, AIAssistantOption, AITeamSquad } from './CRMHubPage.config';
import { CORE_AI_ASSISTANTS } from './crmHubRegistries/aiAssistantsCore';
import { OPERATIONS_AI_ASSISTANTS } from './crmHubRegistries/aiAssistantsOperations';
import { INTELLIGENCE_AI_ASSISTANTS } from './crmHubRegistries/aiAssistantsIntelligence';

export type { SubGroup, BuildingTier, AIAssistantOption, AITeamSquad };

export const ALL_AI_ASSISTANTS: AIAssistantOption[] = [
  ...CORE_AI_ASSISTANTS,
  ...OPERATIONS_AI_ASSISTANTS,
  ...INTELLIGENCE_AI_ASSISTANTS,
];

export { AI_TEAMS_STRUCTURE } from './crmHubRegistries/aiTeamsStructure';
export {
  MD_SUITE_DEPT,
  TWELVE_CORPORATE_DEPARTMENTS,
} from './crmHubRegistries/corporateDepartments';
