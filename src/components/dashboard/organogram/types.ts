/**
 * types.ts
 *
 * Type definitions for AIOrganogramTree & Bhakti Organogram Hierarchy.
 */

import { SupervisorDef } from '../../../data/assistants108Registry.data';

export interface DepartmentRegistryItem {
  id: string;
  name: string;
  code: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
  manager: string;
  aiLead: string;
  supervisors: SupervisorDef[];
}

export interface AIOrganogramTreeProps {
  onSelectAssistant?: (assistant: SupervisorDef) => void;
}
