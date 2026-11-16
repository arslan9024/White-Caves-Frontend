/**
 * CRM Shell — Types Layer (Mary Allen Wilkes Architecture)
 * Strict TypeScript types and navigation mapping for CRM Shell
 * Strictly < 350 lines
 */

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Crown,
  LayoutDashboard,
  TrendingUp,
  Megaphone,
  Building,
  Settings2,
  Building2,
  Users,
  Network,
  Calendar,
  UserPlus,
  Target,
  UserSearch,
  Handshake,
  Route,
  FileSignature,
  MessageSquare,
  Home,
  Grid3x3,
  ListPlus,
  PlusCircle,
  Workflow,
  Image,
  Video,
  Briefcase,
  Book,
  ClipboardCheck,
  Wrench,
  Truck,
  Key,
  FileCheck,
  RefreshCw,
  CalendarClock,
  Users2,
  Rocket,
  MessageCircle,
  CalendarDays,
  Globe,
  Mail,
  Wallet,
  CreditCard,
  Receipt,
  Percent,
  PieChart,
  Shield,
  CheckCircle,
  Lock,
  UserCheck,
  History,
  BarChart3,
  FileBarChart,
  LineChart,
  Award,
  Settings,
  Plug,
  BookOpen,
  Activity,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Crown,
  LayoutDashboard,
  TrendingUp,
  Megaphone,
  Building,
  Settings2,
  Building2,
  Users,
  Network,
  Calendar,
  UserPlus,
  Target,
  UserSearch,
  Handshake,
  Route,
  FileSignature,
  MessageSquare,
  Home,
  Grid3x3,
  ListPlus,
  PlusCircle,
  Workflow,
  Image,
  Video,
  Briefcase,
  Book,
  ClipboardCheck,
  Wrench,
  Truck,
  Key,
  FileCheck,
  RefreshCw,
  CalendarClock,
  Users2,
  Rocket,
  MessageCircle,
  CalendarDays,
  Globe,
  Mail,
  Wallet,
  CreditCard,
  Receipt,
  Percent,
  PieChart,
  Shield,
  CheckCircle,
  Lock,
  UserCheck,
  History,
  BarChart3,
  FileBarChart,
  LineChart,
  Award,
  Settings,
  Plug,
  BookOpen,
  Activity,
};

export const DEPARTMENT_LABELS: Record<string, string> = {
  executive: 'Executive',
  operations: 'Operations',
  sales: 'Sales',
  communications: 'Communications',
  technology: 'Technology',
  finance: 'Finance',
  legal: 'Legal',
  compliance: 'Compliance',
  intelligence: 'Intelligence',
  hr: 'Human Resources',
  marketing: 'Marketing',
};

export interface CRMBreadcrumb {
  id: string;
  label: string;
}

export interface CRMNavSubItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | number;
}

export interface CRMNavGroup {
  id: string;
  label: string;
  icon: string;
  badge?: string | number;
  items: CRMNavSubItem[];
}

export interface CRMAssistant {
  id: string;
  name: string;
  dept: string;
  role: string;
  color?: string;
  status: 'online' | 'busy' | 'offline' | string;
  reportsTo?: string;
  isTeamLead?: boolean;
  teamName?: string;
  specialty?: string;
}

export interface CRMShellProps {
  children?: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

