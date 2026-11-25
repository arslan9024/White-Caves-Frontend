export interface ProspectBuyer {
  id: string;
  name: string;
  budget: string;
  pref: string;
  matchScore: number;
  matchedUnit: string;
}

export interface PitchTemplate {
  title: string;
  icon: string;
  subtitle: string;
  hook: string;
  cta: string;
}

export const INITIAL_PROSPECT_BUYERS: ProspectBuyer[] = [
  {
    id: 'HNW-01',
    name: 'Dr. Tariq Al Mansoor',
    budget: 'AED 35M - 45M',
    pref: 'Palm Jumeirah Waterfront Villa',
    matchScore: 98,
    matchedUnit: 'Frond G Signature Villa',
  },
  {
    id: 'HNW-02',
    name: 'Alexander Volkov',
    budget: 'AED 15M - 20M',
    pref: 'Downtown Penthouse Full Burj View',
    matchScore: 94,
    matchedUnit: 'Il Primo High Floor Penthouse',
  },
  {
    id: 'HNW-03',
    name: 'Lady Sophia Sterling',
    budget: 'AED 50M+',
    pref: 'Emirates Hills Lake View Mansion',
    matchScore: 91,
    matchedUnit: 'Sector E Luxury Palace',
  },
];

export const INITIAL_PITCH_TEMPLATES: PitchTemplate[] = [];
