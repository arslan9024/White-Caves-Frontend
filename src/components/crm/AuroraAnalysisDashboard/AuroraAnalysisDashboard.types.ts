/**
 * Aurora Analysis Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

import type { LucideIcon } from 'lucide-react';
import { Activity, Shield, FileText, FolderOpen, Layers, PlayCircle } from 'lucide-react';

export type AuroraTabId = 'overview' | 'audit' | 'srs' | 'documents' | 'components' | 'actions';

export interface AuroraTabDef {
  id: AuroraTabId;
  label: string;
  icon: LucideIcon;
}

export const AURORA_TABS: AuroraTabDef[] = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'audit', label: 'System Audit', icon: Shield },
  { id: 'srs', label: 'SRS Generator', icon: FileText },
  { id: 'documents', label: 'Documents', icon: FolderOpen },
  { id: 'components', label: 'Component Tracker', icon: Layers },
  { id: 'actions', label: 'Actions Demo', icon: PlayCircle },
];

