import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  ShieldCheck,
  ShieldAlert,
  Building2,
  Users,
  Bot,
  CheckSquare,
  Trophy,
  Home,
  Handshake,
  Network,
  Contact,
  Coins,
  BarChart3,
  Eye,
  Activity,
} from 'lucide-react';
import type { ActivityTab } from './ExecutiveVSCodeSidebar.logic';

export interface ActivityItemConfig {
  tab: ActivityTab;
  activeTabs?: ActivityTab[];
  title: string;
  testId: string;
  Icon: LucideIcon;
}

export const DIRECTORATE_ITEMS: ActivityItemConfig[] = [
  {
    tab: 'employees',
    title: 'Employees Directory & Personnel Management',
    testId: 'activity-btn-employees',
    Icon: Users,
  },
  {
    tab: 'aiams',
    activeTabs: ['aiams', 'ai-command'],
    title: 'AI Assistants Management System (AIAMS — 121+ Agents CRUD)',
    testId: 'activity-btn-aiams',
    Icon: Bot,
  },
  {
    tab: 'tasks',
    title: '200+ Core Operational & Statutory Tasks Catalog',
    testId: 'activity-btn-tasks',
    Icon: CheckSquare,
  },
  {
    tab: 'REproperties',
    title: 'Real Estate Inventory & Portfolio (REproperties)',
    testId: 'activity-btn-reproperties',
    Icon: Home,
  },
  {
    tab: 'deals',
    title: 'Deals & Revenue Pipeline (deals)',
    testId: 'activity-btn-deals',
    Icon: Handshake,
  },
  {
    tab: 'customers',
    title: 'Customers & CRM Nervous Hub (customers)',
    testId: 'activity-btn-customers',
    Icon: Contact,
  },
  {
    tab: 'documents',
    title: 'Sovereign Document Vault (documents)',
    testId: 'activity-btn-documents',
    Icon: FileText,
  },
  {
    tab: 'leaderboard',
    title: 'Corporate Merit Leaderboard & Tier Progression (L0–L5)',
    testId: 'activity-btn-leaderboard',
    Icon: Trophy,
  },
  {
    tab: 'relationships',
    activeTabs: ['relationships', 'erms'],
    title: 'ERMS: Entities & Relational Matrix Hub',
    testId: 'activity-btn-relationships',
    Icon: Network,
  },
  {
    tab: 'roles',
    title: 'User Role Management System & RBAC (roles)',
    testId: 'activity-btn-roles',
    Icon: ShieldAlert,
  },
  {
    tab: 'audit',
    title: 'RERA Compliance & Master Audit',
    testId: 'activity-btn-audit',
    Icon: ShieldCheck,
  },
  {
    tab: 'commissions',
    title: 'Commission Ledger & Tracking',
    testId: 'activity-btn-commissions',
    Icon: Coins,
  },
  {
    tab: 'performance',
    title: 'Agent Performance & KPI Tracking',
    testId: 'activity-btn-performance',
    Icon: Activity,
  },
  {
    tab: 'viewings',
    title: 'Property Viewing Appointments',
    testId: 'activity-btn-viewings',
    Icon: Eye,
  },
  {
    tab: 'analytics',
    title: 'Unified Market Analytics Dashboard',
    testId: 'activity-btn-analytics',
    Icon: BarChart3,
  },
];

export const LANDLORD_ITEMS: ActivityItemConfig[] = [
  {
    tab: 'landlord',
    activeTabs: ['departments', 'landlord'],
    title: 'Sovereign Landlord Asset Hub',
    testId: 'activity-btn-landlord',
    Icon: Building2,
  },
  {
    tab: 'documents',
    title: 'Lease Contracts & Vault',
    testId: 'activity-btn-documents',
    Icon: FileText,
  },
];

export const TENANT_ITEMS: ActivityItemConfig[] = [
  {
    tab: 'tenant',
    activeTabs: ['departments', 'tenant'],
    title: 'Sovereign Tenant Portal',
    testId: 'activity-btn-tenant',
    Icon: Home,
  },
  {
    tab: 'documents',
    title: 'My Leases & Ejari',
    testId: 'activity-btn-documents',
    Icon: FileText,
  },
];

export const AGENT_ITEMS: ActivityItemConfig[] = [
  {
    tab: 'broker',
    activeTabs: ['departments', 'broker'],
    title: 'Sovereign Licensed Broker Hub',
    testId: 'activity-btn-broker',
    Icon: Building2,
  },
  {
    tab: 'REproperties',
    title: 'Real Estate Inventory',
    testId: 'activity-btn-reproperties',
    Icon: Home,
  },
  {
    tab: 'deals',
    title: 'Deals Pipeline',
    testId: 'activity-btn-deals',
    Icon: Handshake,
  },
  {
    tab: 'customers',
    title: 'CRM Leads',
    testId: 'activity-btn-customers',
    Icon: Contact,
  },
  {
    tab: 'documents',
    title: 'Document Vault',
    testId: 'activity-btn-documents',
    Icon: FileText,
  },
];

export const GUEST_ITEMS: ActivityItemConfig[] = [
  {
    tab: 'departments',
    title: 'Sovereign Identity Gateway',
    testId: 'activity-btn-departments',
    Icon: ShieldCheck,
  },
  {
    tab: 'landlord',
    title: 'Landlord Asset Hub',
    testId: 'activity-btn-landlord',
    Icon: Building2,
  },
  {
    tab: 'tenant',
    title: 'Tenant Self-Service',
    testId: 'activity-btn-tenant',
    Icon: Home,
  },
  {
    tab: 'broker',
    title: 'Licensed Broker Hub',
    testId: 'activity-btn-broker',
    Icon: Handshake,
  },
];

