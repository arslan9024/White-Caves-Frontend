import React from 'react';
import { PHASES, PHASE_COLORS } from './roadmapData';
import type { PhaseStats } from './types';
import { ProgressBar } from './ProgressBar';

export interface PhaseOverviewGridProps {
  activePhase: number;
  phaseStats: Record<number, PhaseStats>;
  onSelectPhase: (phaseId: number) => void;
}

export const PhaseOverviewGrid: React.FC<PhaseOverviewGridProps> = ({
  activePhase,
  phaseStats,
  onSelectPhase,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: 12,
      marginBottom: 28,
    }}
  >
    {PHASES.map(phase => {
      const stats = phaseStats[phase.id] ?? { total: 20, completed: 0, percent: 0 };
      const color = PHASE_COLORS[phase.id] ?? '#6B7280';
      const isActive = activePhase === phase.id;
      return (
        <button
          key={phase.id}
          type="button"
          onClick={() => onSelectPhase(phase.id)}
          style={{
            background: isActive ? '#0F172A' : '#fff',
            border: isActive ? `2px solid ${color}` : '1px solid #E5E7EB',
            borderRadius: 10,
            padding: '14px 16px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s',
            boxShadow: isActive ? `0 0 0 2px ${color}30` : '0 1px 3px rgba(0,0,0,0.05)',
            fontFamily: 'inherit',
          }}
          aria-pressed={isActive}
          aria-label={`Phase ${phase.id}: ${phase.title}`}
        >
          <div style={{ fontSize: 20, marginBottom: 6 }}>{phase.emoji}</div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: isActive ? '#fff' : '#374151',
              lineHeight: 1.4,
              marginBottom: 8,
            }}
          >
            Phase {phase.id}
          </div>
          <ProgressBar percent={stats.percent} color={color} height={5} />
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              color: isActive ? '#94A3B8' : '#9CA3AF',
            }}
          >
            {stats.completed}/{stats.total}
          </div>
        </button>
      );
    })}
  </div>
);
