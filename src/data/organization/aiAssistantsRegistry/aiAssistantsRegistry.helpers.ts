// @ts-nocheck
import { assistantsPart1 } from './assistantsPart1.data';
import { assistantsPart2 } from './assistantsPart2.data';

export const AI_ASSISTANTS_REGISTRY = [
  ...assistantsPart1,
  ...assistantsPart2,
];


export const getAssistantById = (id) => AI_ASSISTANTS_REGISTRY.find(a => a.id === id);

export const getAssistantsByDepartment = (departmentId) => 
  AI_ASSISTANTS_REGISTRY.filter(a => a.departmentId === departmentId);

export const getActiveAssistants = () => 
  AI_ASSISTANTS_REGISTRY.filter(a => a.status === 'active');

export const getDepartmentGroups = () => {
  const groups = {};
  AI_ASSISTANTS_REGISTRY.forEach(assistant => {
    if (!groups[assistant.department]) {
      groups[assistant.department] = [];
    }
    groups[assistant.department].push(assistant);
  });
  return groups;
};

export const searchAssistants = (query) => {
  const q = query.toLowerCase();
  return AI_ASSISTANTS_REGISTRY.filter(a => 
    a.name.toLowerCase().includes(q) ||
    a.role.toLowerCase().includes(q) ||
    a.department.toLowerCase().includes(q) ||
    a.capabilities.some(c => c.toLowerCase().includes(q))
  );
};

export default AI_ASSISTANTS_REGISTRY;

