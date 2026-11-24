import {
  Building2,
  DollarSign,
  TrendingUp,
  Megaphone,
  MessageSquare,
  Globe,
  Lock,
  Code,
  Scale,
  Settings,
  Users2,
  BarChart3,
  Home,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PaletteItem } from './types';

export const DEPT_COLORS: Record<string, string> = {
  operations: '#3B82F6',
  finance: '#F59E0B',
  sales: '#10B981',
  marketing: '#EC4899',
  communications: '#8B5CF6',
  executive: '#E31E24',
  compliance: '#059669',
  technology: '#06B6D4',
  legal: '#7C3AED',
};

export const DEPT_ICONS: Record<string, LucideIcon> = {
  operations: Building2,
  finance: DollarSign,
  sales: TrendingUp,
  marketing: Megaphone,
  communications: MessageSquare,
  executive: Globe,
  compliance: Lock,
  technology: Code,
  legal: Scale,
};

export interface BuildItemsOptions {
  navigate: (path: string) => void;
  onSelectDepartment: (deptId: string) => void;
}

export function buildDefaultPaletteItems({
  navigate,
  onSelectDepartment,
}: BuildItemsOptions): PaletteItem[] {
  const list: PaletteItem[] = [
    {
      id: 'nav-dashboard',
      label: 'Dashboard',
      category: 'Navigation',
      icon: Home,
      action: () => navigate('/crm'),
      keywords: ['home', 'overview'],
    },
    {
      id: 'nav-analytics',
      label: 'Analytics',
      category: 'Navigation',
      icon: BarChart3,
      action: () => navigate('/crm'),
      keywords: ['charts', 'reports', 'stats'],
    },
    {
      id: 'nav-clients',
      label: 'Clients',
      category: 'Navigation',
      icon: Users2,
      action: () => navigate('/crm'),
      keywords: ['customers', 'contacts'],
    },
    {
      id: 'nav-settings',
      label: 'Settings',
      category: 'Navigation',
      icon: Settings,
      action: () => navigate('/settings'),
      keywords: ['preferences', 'configuration'],
    },
  ];

  Object.entries(DEPT_ICONS).forEach(([deptId, Icon]) => {
    const label = deptId.charAt(0).toUpperCase() + deptId.slice(1);
    list.push({
      id: `dept-${deptId}`,
      label: `${label} Department`,
      category: 'Departments',
      icon: Icon,
      action: () => onSelectDepartment(deptId),
      keywords: [deptId, 'department'],
    });
  });

  return list;
}
