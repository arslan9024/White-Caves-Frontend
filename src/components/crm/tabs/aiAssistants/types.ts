export interface AIAssistantItem {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: 'active' | 'inactive';
  tasks: number;
  accuracy: number;
  color: string;
  description: string;
}

export interface AIAssistantStats {
  totalAssistants: number;
  activeCount: number;
  tasksToday: string;
  avgAccuracy: string;
}
