/**
 * UnifiedWorkspaceLayout.constants.ts — Categories & Static Text
 */

import type { WorkspaceCategory } from './UnifiedWorkspaceLayout.types';

export const WORKSPACE_CATEGORIES: WorkspaceCategory[] = [
  { id: 'md_hub', label: '👑 Managing Director Hub (Level 5)', icon: 'Crown', isMdHub: true, badge: 'Sovereign' },
  { id: 'progress', label: '🌟 Project Progress & Telemetry', icon: 'Sparkles', badge: 'Live 100%' },
  { id: 'luxury_sales', label: '1. Luxury Sales & Brokerage', icon: 'TrendingUp', badge: 'Floor 05' },
  { id: 'off_plan', label: '2. Strategic Off-Plan Developments', icon: 'Building', badge: 'Floor 05' },
  { id: 'commercial', label: '3. Commercial & Investment', icon: 'Briefcase', badge: 'Floor 05' },
  { id: 'leasing', label: '4. Residential Leasing & Ejari', icon: 'Key', badge: 'Floor 04' },
  { id: 'asset_dh2', label: '5. Asset Management & DH2 Hub', icon: 'Wrench', badge: 'Floor 04' },
  { id: 'revenue', label: '6. Revenue, Finance & Treasury', icon: 'DollarSign', badge: 'Floor 08' },
  { id: 'marketing', label: '7. Performance Marketing', icon: 'Megaphone', badge: 'Floor 07' },
  { id: 'comms', label: '8. Communications & WhatsApp', icon: 'MessageSquare', badge: 'Floor 06' },
  { id: 'executive', label: '9. Corporate Governance', icon: 'Shield', badge: 'Floor 13' },
  { id: 'compliance', label: '10. Regulatory & RERA Compliance', icon: 'FileCheck', badge: 'Floor 09' },
  { id: 'conveyancing', label: '11. Conveyancing & Transfers', icon: 'Stamp', badge: 'Floor 02' },
  { id: 'intelligence', label: '12. Market Intelligence & IoT', icon: 'BarChart3', badge: 'Floor 03' },
  { id: 'software_docs', label: '13. Software Docs (SRS & SDD)', icon: 'Code', badge: 'Floor 10' },
];

export const WORKSPACE_LAYOUT_TEXT = {
  sidebarTitle: 'White Caves ERP',
  sidebarSubtitle: 'AEGIS 3.0 Command Grid',
  mdHubHeading: 'Executive MD Cockpit',
  searchPlaceholder: 'Quick filter department views...',
  founderBadge: 'Managing Director Level 5',
  liveStatus: 'Neural Grid Active (44 Assistants · 68 Waves)',
};

