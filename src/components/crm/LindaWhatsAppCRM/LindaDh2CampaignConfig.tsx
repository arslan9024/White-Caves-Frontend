import React, { FC } from 'react';
import { Radio, Clock } from 'lucide-react';

export const DH2_38_CLUSTERS = [
  'All 38 Clusters',
  'Pacifica',
  'Camelia',
  'Albizia',
  'Basswood',
  'Clivia',
  'Amargo',
  'Zinnia',
  'Mimosa',
  'Vardon',
  'Juniper',
  'Sycamore',
  'Coursetia',
  'Centauri',
  'Sanctuary',
  'Mulberry',
  'Acuna',
  'Aknan',
  'Aster',
  'Avencia',
  'Centaury',
  'Dahlia',
  'Elo',
  'Fiora',
  'Flamingo',
  'Hawthorn',
  'Janusia',
  'Just Cavalli',
  'Navitas',
  'Odora',
  'Paloverde',
  'Park Greens',
  'Primrose',
  'Trixis',
  'Verona',
  'Virdis',
  'Violet',
  'Water Town',
  'Victoria',
];

export const CAMPAIGN_TEMPLATES = [
  {
    id: 'tpl-1',
    label: 'Standard In-Market Outreach',
    text: 'Hello {{ownerName}}, this is Linda from White Caves Real Estate LLC (DAMAC Hills 2 Leasing Desk). We have pre-qualified tenants looking for {{bedrooms}}BR units in {{cluster}}, DAMAC Hills 2. Is your unit {{unitRef}} available for rent soon?',
  },
  {
    id: 'tpl-2',
    label: 'High Demand Direct Inquiry',
    text: 'Hi {{ownerName}}, White Caves Real Estate LLC here. Demand for {{cluster}} in DAMAC Hills 2 is very strong this week — are you considering leasing unit {{unitRef}}? We handle verified viewings and Ejari directly.',
  },
  {
    id: 'tpl-3',
    label: 'Zero Commission Corporate Placement',
    text: 'Greetings {{ownerName}}! Linda from White Caves Real Estate (DAMAC Hills 2 Specialists). We currently have active corporate tenants searching in {{cluster}}. Would you like us to list {{unitRef}} on whitecaves.com at zero landlord commission?',
  },
];

export const LindaDh2FleetBanner: FC = () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 18px',
          background:
            'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 900,
              letterSpacing: '0.04em',
            }}
          >
            <Radio size={14} />
            <span>PRIMARY MASTER CLOSER: +971 50 576 0056</span>
          </div>

          <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
            ● 9 Hunter SIMs Rotated (18/hr Cap · 35–65s Jitter)
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            color: '#94A3B8',
          }}
        >
          <Clock size={14} className="text-amber-400" />
          <span>
            Friday Prayer Guard: <strong>12:00 – 14:30 GST</strong>
          </span>
        </div>
      </div>
);
