export interface ProspectBuyer {
  id: string;
  name: string;
  budget: string;
  targetLocations: string[];
  propertyType: string;
  timeline: string;
  score: number;
}

export interface PitchTemplate {
  title: string;
  icon: string;
  subtitle: string;
  hook: string;
  cta: string;
}

export const INITIAL_PROSPECT_BUYERS = {
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
  ]);

  // Feature 4: Pitch Generator
  const [selectedBuyer, setSelectedBuyer] = useState(buyers[0]);
  const [pitchText, setPitchText] = useState(
    `Dear ${selectedBuyer.name},\n\nWe have secured an exclusive, off-market opportunity matching your exact criteria: ${selectedBuyer.matchedUnit}.\n\n• Asking Price: ${selectedBuyer.budget}\n• Confidential viewing slots available this Thursday.\n\nBest regards,\nWhite Caves Private Client Group`
  );
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendPitch = () => {

export const INITIAL_PITCH_TEMPLATES = };

  return (
    <div className="crm-container" style={{ maxWidth: '100%', padding: '0.5rem' }}>
      {/* Header */}
      <div
        style={{
          background:
            'linear-gradient(135deg, var(--color-065f46, #065F46) 0%, var(--color-064e3b, #064E3B) 100%)',
          color: 'var(--white, #FFFFFF)',
          padding: '1.25rem 1.5rem',
          borderRadius: '16px',
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background:
