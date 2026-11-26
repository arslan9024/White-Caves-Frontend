/**
 * DmsOpenHumanLeasingPositionsDeck.tsx — 8-Tier Open Human Leasing Positions in DMS
 * Extracted from SelectedDepartmentSquadsDeck under AEGIS V5.1 AEG-042 (< 350 lines).
 */

import React, { FC } from 'react';
import { Briefcase, GitBranch } from 'lucide-react';
import { DMS_OPEN_HUMAN_LEASING_POSITIONS } from '../../../portals/md/aicc/daisyDivision.data';

export const DmsOpenHumanLeasingPositionsDeck: FC = () => (
  <div
    data-testid="dms-open-human-leasing-positions-deck"
    style={{
      background: 'rgba(16, 185, 129, 0.06)',
      border: '1px solid rgba(16, 185, 129, 0.28)',
      borderRadius: '10px',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '6px',
      }}
    >
      <span
        style={{
          fontSize: '0.73rem',
          fontWeight: 800,
          color: '#34D399',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <GitBranch size={13} /> 8-TIER LEASING AUTHORITY &amp; OPEN HUMAN POSITIONS (DEPT-05 •
        DRAGGABLE IN DMS)
      </span>
      <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace' }}>
        MD Arslan Malik → Zoe → Dir Clara (DIR-05) → Mgr Layla (MGR-05-2) → AM Amina → Sup Daisy
        (SUP-05-2-01-1) → 1 TL → 10 Agents
      </span>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(235px, 1fr))',
        gap: '8px',
      }}
    >
      {DMS_OPEN_HUMAN_LEASING_POSITIONS.map(pos => (
        <div
          key={pos.positionCode}
          draggable
          onDragStart={e => e.dataTransfer.setData('text/plain', pos.positionCode)}
          data-testid={`dms-open-position-${pos.positionCode}`}
          style={{
            background: '#0F172A',
            border: '1px dashed rgba(245, 158, 11, 0.45)',
            borderRadius: '8px',
            padding: '8px 10px',
            cursor: 'grab',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.62rem',
            }}
          >
            <span
              style={{
                color: '#FBBF24',
                fontWeight: 800,
                fontFamily: 'monospace',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Briefcase size={11} /> {pos.role}
            </span>
            <span
              style={{
                background: 'rgba(245,158,11,0.18)',
                color: '#FDE68A',
                padding: '1px 6px',
                borderRadius: '4px',
                fontWeight: 700,
              }}
            >
              {pos.openCount} Open
            </span>
          </div>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#F8FAFC', marginTop: '3px' }}>
            {pos.jobTitle}
          </div>
          <div style={{ fontSize: '0.64rem', color: '#94A3B8', marginTop: '2px' }}>
            Reports to: {pos.reportsToTitle}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DmsOpenHumanLeasingPositionsDeck;
