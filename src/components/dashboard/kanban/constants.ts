/**
 * constants.ts
 *
 * Initial tasks, departments, and stage definitions for Department Task Kanban Board.
 */

import { KanbanTask, KanbanStageConfig } from './types';

export const INITIAL_TASKS: KanbanTask[] = [
  {
    id: 'TSK-101',
    title: 'DAMAC Hills 2 Amazonia Villa Tenancy Renewal',
    department: 'Tenancy & Ejari',
    assignee: 'AI Victoria (Lead)',
    priority: 'HIGH',
    stage: 'approved',
    slaMinutes: 5,
  },
  {
    id: 'TSK-102',
    title: 'CBUAE goAML Screening on AED 3.2M Deal',
    department: 'Legal & AML',
    assignee: 'AI Sofia (Lead)',
    priority: 'CRITICAL',
    stage: 'approved',
    slaMinutes: 2,
  },
  {
    id: 'TSK-103',
    title: 'Q2 FTA Form 201 VAT Reconciliation Output',
    department: 'Finance & VAT',
    assignee: 'AI Theodora',
    priority: 'HIGH',
    stage: 'review',
    slaMinutes: 12,
  },
  {
    id: 'TSK-104',
    title: 'Palm Jumeirah Penthouse 3D VR Matterport Sync',
    department: 'Technology',
    assignee: 'AI Aurora (CTO)',
    priority: 'MEDIUM',
    stage: 'in_progress',
    slaMinutes: 8,
  },
  {
    id: 'TSK-105',
    title: 'VIP Maybach Chauffeur Booking for European Family Office',
    department: 'Concierge',
    assignee: 'AI Corinne',
    priority: 'HIGH',
    stage: 'in_progress',
    slaMinutes: 4,
  },
  {
    id: 'TSK-106',
    title: 'Off-Plan DAMAC Victoria Inventory Audit (148 Units)',
    department: 'Off-Plan Sales',
    assignee: 'AI Clara',
    priority: 'MEDIUM',
    stage: 'backlog',
    slaMinutes: 15,
  },
];

export const ALL_DEPARTMENTS: readonly string[] = [
  'all',
  'Tenancy & Ejari',
  'Legal & AML',
  'Finance & VAT',
  'Technology',
  'Concierge',
  'Off-Plan Sales',
  'Secondary Resales',
  'Property Management',
  'Marketing & PR',
  'HR & Talent',
  'Investments & Family Office',
  'Executive Strategy',
];

export const KANBAN_STAGES: readonly KanbanStageConfig[] = [
  { id: 'backlog', title: 'Task Backlog', color: '#64748B', icon: '📥' },
  { id: 'in_progress', title: 'In Progress (AI Supervisor)', color: '#3B82F6', icon: '⚡' },
  { id: 'review', title: 'Manager / Legal Review', color: '#F59E0B', icon: '🔍' },
  { id: 'approved', title: 'Founder Approved 👑', color: '#10B981', icon: '✅' },
];
