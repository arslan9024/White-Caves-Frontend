/**
 * Zoe Console — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

import type { LucideIcon } from 'lucide-react';
import { Calendar, BarChart3, Users, Phone, List, Workflow } from 'lucide-react';

export interface ConsoleMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date | string | number;
  confidence?: number;
  intent?: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  icon: LucideIcon;
  query: string;
}

export interface HistoryItem {
  query: string;
  intent: string;
  timestamp?: string;
}

export const QUICK_ACTIONS: QuickActionItem[] = [
  { id: 'briefing', label: 'Daily Briefing', icon: Calendar, query: "Give me today's briefing" },
  { id: 'metrics', label: 'View Metrics', icon: BarChart3, query: 'Show me current statistics' },
  { id: 'leads', label: 'Lead Status', icon: Users, query: 'How many leads do we have?' },
  {
    id: 'contacts',
    label: 'Find Contact',
    icon: Phone,
    query: 'Who should I contact about commercial leasing?',
  },
  { id: 'services', label: 'Our Services', icon: List, query: 'List all services we offer' },
  {
    id: 'process',
    label: 'Sales Process',
    icon: Workflow,
    query: 'Walk me through the sales journey',
  },
];

export interface ZoeConsoleProps {
  initialQuery?: string;
  onQueryComplete?: (response: string) => void;
}

