import type { Development, DevelopmentStatus, NovaTab, PipelineItem } from './NovaCRM.types';

export const DEVELOPMENTS: Development[] = [
  {
    id: 1,
    name: 'Emaar Harbour Views III',
    developer: 'Emaar',
    location: 'Dubai Creek Harbour',
    launchDate: '2024-Q2',
    handover: '2027-Q4',
    units: 420,
    startPrice: 'AED 1.2M',
    soldPct: 72,
    status: 'selling',
  },
  {
    id: 2,
    name: 'Damac Islands',
    developer: 'Damac',
    location: 'Dubailand',
    launchDate: '2024-Q1',
    handover: '2028-Q2',
    units: 800,
    startPrice: 'AED 1.8M',
    soldPct: 45,
    status: 'selling',
  },
  {
    id: 3,
    name: 'Sobha Hartland II Phase 3',
    developer: 'Sobha',
    location: 'MBR City',
    launchDate: '2024-Q3',
    handover: '2027-Q3',
    units: 280,
    startPrice: 'AED 2.4M',
    soldPct: 0,
    status: 'upcoming',
  },
  {
    id: 4,
    name: 'Meraas Haven Views',
    developer: 'Meraas',
    location: 'City Walk',
    launchDate: '2024-Q2',
    handover: '2026-Q4',
    units: 180,
    startPrice: 'AED 3.5M',
    soldPct: 88,
    status: 'almost_sold',
  },
];

export const PIPELINE: PipelineItem[] = [
  { name: 'Aldar Yas Beach Phase 2', est: 'Q3 2024', units: 350, developer: 'Aldar' },
  { name: 'Nakheel Palm Jebel Ali Villas', est: 'Q4 2024', units: 120, developer: 'Nakheel' },
  { name: 'Emaar Hills Park', est: 'Q1 2025', units: 600, developer: 'Emaar' },
];

export const STATUS_COLORS: Record<DevelopmentStatus, string> = {
  selling: '#22C55E',
  upcoming: '#3B82F6',
  almost_sold: '#E31E24',
};

export const NOVA_TABS: NovaTab[] = [
  { id: 'developments', label: '🏗️ Active Launches' },
  { id: 'pipeline', label: '🚀 Coming Soon' },
  { id: 'tracker', label: '📊 Sales Tracker' },
  { id: 'docs', label: '📚 Docs' },
  { id: 'lifecycle', label: '🔄 Lifecycle' },
];

