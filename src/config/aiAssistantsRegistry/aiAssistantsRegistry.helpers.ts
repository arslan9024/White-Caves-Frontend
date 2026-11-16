import { AIAssistant } from './aiAssistantsRegistry.types';
import { AI_ASSISTANTS } from './aiAssistantsRegistry.data';

export const getAllAssistants = (): AIAssistant[] => {
  return Object.values(AI_ASSISTANTS);
};

/**
 * Get AI assistant by ID
 */
export const getAssistant = (id: string): AIAssistant | undefined => {
  return AI_ASSISTANTS[id];
};

/**
 * Get assistants by department
 */
export const getAssistantsByDepartment = (departmentId: string): AIAssistant[] => {
  return Object.values(AI_ASSISTANTS).filter(a => a.department === departmentId);
};

/**
 * Get assistants by category
 */
export const getAssistantsByCategory = (
  category: 'communication' | 'inventory' | 'analytics' | 'operations' | 'support'
): AIAssistant[] => {
  return Object.values(AI_ASSISTANTS).filter(a => a.category === category);
};

/**
 * Get active assistants
 */
export const getActiveAssistants = (): AIAssistant[] => {
  return Object.values(AI_ASSISTANTS).filter(a => a.status === 'active');
};

/**
 * Get assistants by role
 */
export const getAssistantsByRole = (role: string): AIAssistant[] => {
  return Object.values(AI_ASSISTANTS).filter(a => a.role === role);
};

/**
 * Get assistants by access level
 */
export const getAssistantsByAccessLevel = (level: string): AIAssistant[] => {
  return Object.values(AI_ASSISTANTS).filter(a => a.accessLevel === level);
};


