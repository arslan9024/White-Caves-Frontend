import React from 'react';
import { PHASE_COLORS } from './roadmapData';
import type { Phase, PhaseStats, ProgressMap, Step } from './types';
import { ProgressBar } from './ProgressBar';

export interface PhaseStepListProps {
  phase: Phase;
  stats: PhaseStats;
  steps: Step[];
  completed: ProgressMap;
  onToggleStep: (id: number) => void;
  onSelectPhaseAll: (phaseId: number, complete: boolean) => void;
}

export const PhaseStepList: React.FC<PhaseStepListProps> = ({
  phase,
  stats,
  steps,
  completed,
  onToggleStep,
  onSelectPhaseAll,
}) => {
  const color = PHASE_COLORS[phase.id] ?? '#6B7280';
  const allComplete = stats.completed === stats.total;

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}
    >
      {/* Phase header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #F3F4F6',
          background: '#FAFAFA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>{phase.emoji}</span>
            <h2
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--color-0f172a, #0F172A)',
              }}
            >
              Phase {phase.id}: {phase.title}
            </h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-secondary, #6B7280)' }}>
            Steps {(phase.id - 1) * 20 + 1}–{phase.id * 20} ·{' '}
            <span style={{ color, fontWeight: 600 }}>
              {stats.completed}/{stats.total} complete ({stats.percent}%)
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => onSelectPhaseAll(phase.id, true)}
            disabled={allComplete}
            style={{
              background: color,
              border: 'none',
              borderRadius: 7,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              cursor: allComplete ? 'not-allowed' : 'pointer',
              opacity: allComplete ? 0.5 : 1,
              fontFamily: 'inherit',
            }}
          >
            ✓ All done
          </button>
          <button
            type="button"
            onClick={() => onSelectPhaseAll(phase.id, false)}
            disabled={stats.completed === 0}
            style={{
              background: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: 7,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: '#6B7280',
              cursor: stats.completed === 0 ? 'not-allowed' : 'pointer',
              opacity: stats.completed === 0 ? 0.5 : 1,
              fontFamily: 'inherit',
            }}
          >
            Clear phase
          </button>
        </div>
      </div>

      {/* Phase progress bar */}
      <div style={{ padding: '12px 24px 0' }}>
        <ProgressBar percent={stats.percent} color={color} height={6} />
      </div>

      {/* Steps list */}
      <ul
        style={{ listStyle: 'none', margin: 0, padding: '8px 0 16px' }}
        aria-label={`Phase ${phase.id} steps`}
      >
        {steps.map((step, idx) => {
          const isDone = !!completed[step.id];
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onToggleStep(step.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  width: '100%',
                  padding: '10px 24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderBottom: idx < steps.length - 1 ? '1px solid #F9FAFB' : 'none',
                  transition: 'background 0.1s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#F9FAFB';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'none';
                }}
                aria-label={`Step ${step.id}: ${isDone ? 'completed' : 'not completed'} — ${step.text}`}
                aria-pressed={isDone}
              >
                {/* Checkbox indicator */}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: isDone ? `2px solid ${color}` : '2px solid #D1D5DB',
                    background: isDone ? color : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                    transition: 'all 0.15s',
                  }}
                  aria-hidden="true"
                >
                  {isDone && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path
                        d="M1 5l3.5 3.5L11 1"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Step number */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isDone ? color : '#9CA3AF',
                    minWidth: 26,
                    marginTop: 2,
                    transition: 'color 0.15s',
                  }}
                >
                  {step.id}
                </span>

                {/* Step text */}
                <span
                  style={{
                    fontSize: 13,
                    color: isDone ? '#9CA3AF' : '#374151',
                    lineHeight: 1.6,
                    textDecoration: isDone ? 'line-through' : 'none',
                    transition: 'all 0.15s',
                    flex: 1,
                  }}
                >
                  {step.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
