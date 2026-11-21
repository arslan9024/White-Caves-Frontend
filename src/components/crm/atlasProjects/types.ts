export type AtlasTabId = 'tracker' | 'escrow' | 'delay' | 'payment-plans' | 'roi';

export interface AtlasProject {
  id: number;
  name: string;
  developer: string;
  area: string;
  units: number;
  completion: string;
  progressPct: number;
  escrowBalance: string;
  status: string;
  expectedYield: string;
}

export const INITIAL_ATLAS_PROJECTS: AtlasProject[] = [
  {
    id: 1,
    name: 'Marina Vista Tower',
    developer: 'Emaar',
    area: 'Dubai Marina',
    units: 450,
    completion: 'Q4 2026',
    progressPct: 78,
    escrowBalance: 'AED 380M',
    status: 'ON_TRACK',
    expectedYield: '8.5%',
  },
  {
    id: 2,
    name: 'Business Bay Heights',
    developer: 'DAMAC',
    area: 'Business Bay',
    units: 320,
    completion: 'Q2 2027',
    progressPct: 45,
    escrowBalance: 'AED 210M',
    status: 'ON_TRACK',
    expectedYield: '9.2%',
  },
  {
    id: 3,
    name: 'Creek Harbour Residences',
    developer: 'Emaar',
    area: 'Dubai Creek',
    units: 680,
    completion: 'Q1 2028',
    progressPct: 22,
    escrowBalance: 'AED 540M',
    status: 'ON_TRACK',
    expectedYield: '7.8%',
  },
  {
    id: 4,
    name: 'Palm Gateway Penthouse',
    developer: 'Nakheel',
    area: 'Palm Jumeirah',
    units: 120,
    completion: 'Q4 2026',
    progressPct: 88,
    escrowBalance: 'AED 890M',
    status: 'AHEAD_OF_SCHEDULE',
    expectedYield: '11.4%',
  },
];
