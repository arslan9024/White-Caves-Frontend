export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface DemoLogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'system' | 'stage' | 'action' | 'success';
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'sales', label: 'Property Sales', icon: '🏠', color: '#8B5CF6' },
  { id: 'leasing', label: 'Leasing', icon: '🔑', color: '#14B8A6' },
  { id: 'financial', label: 'Financial', icon: '💰', color: '#F59E0B' },
  { id: 'legal', label: 'Legal & Compliance', icon: '⚖️', color: '#6366F1' },
  { id: 'operations', label: 'Operations', icon: '⚙️', color: '#10B981' },
  { id: 'marketing', label: 'Marketing', icon: '📣', color: '#EC4899' },
  { id: 'technology', label: 'Technology', icon: '💻', color: '#06B6D4' },
];
