export interface AssistantConfig {
  name: string;
  description: string;
  color: string;
  departments: string[];
  services: string[];
  contexts: string[];
  icon: string;
}

export type AssistantId = string;
export type DepartmentId = string;

export interface SelectionHistoryItem {
  type: 'assistant' | 'department' | 'service';
  id: string;
}

export interface RelationshipMap {
  departmentAssistants: Record<string, string[]>;
  assistantDepartments: Record<string, string[]>;
  assistantServices: Record<string, string[]>;
  serviceAssistants: Record<string, string[]>;
}

export interface SidebarRenderConfig {
  showLeftSidebar: boolean;
  showRightSidebar: boolean;
  showFeatureSidebar: boolean;
  featureSidebarType?: string;
  breadcrumb?: {
    department?: string;
    service?: string | null;
    assistant?: string;
    context?: string;
  };
}

