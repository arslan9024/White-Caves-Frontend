export type { AIAssistant } from './aiAssistantsRegistry/aiAssistantsRegistry.types';
export { AI_ASSISTANTS } from './aiAssistantsRegistry/aiAssistantsRegistry.data';
export {
  getAllAssistants,
  getAssistant,
  getAssistantsByDepartment,
  getAssistantsByCategory,
  getActiveAssistants,
  getAssistantsByRole,
  getAssistantsByAccessLevel,
} from './aiAssistantsRegistry/aiAssistantsRegistry.helpers';

import { AI_ASSISTANTS } from './aiAssistantsRegistry/aiAssistantsRegistry.data';
export default AI_ASSISTANTS;

