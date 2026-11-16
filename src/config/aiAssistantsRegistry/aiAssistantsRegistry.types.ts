export interface AIAssistant {
  id: string;
  name: string;
  title: string;
  avatar: string;
  icon: string;
  color: string;
  status: 'active' | 'inactive' | 'error';
  role?: string; // New: Assistant role for sidebar grouping
  assignedTo?: string[]; // New: Departments assigned to
  department: string; // Department ID
  category: 'communication' | 'inventory' | 'analytics' | 'operations' | 'support';
  description: string;
  capabilities: string[];
  reportsTo: string;
  dashboardPath: string;
  accessLevel: string;
  features: number; // Count of features
  dataFlows: {
    inputs: string[]; // Data sources
    outputs: string[]; // Data consumers
  };
}

