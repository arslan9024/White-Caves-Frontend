import React from 'react';
import { HERO_BADGES } from './roadmapData';
import { ProgressBar } from './ProgressBar';

export interface GoalHeroSectionProps {
  totalCompleted: number;
  progressPercentage: number;
  onBack: () => void;
  onReset: () => void;
}

export const GoalHeroSection: React.FC<GoalHeroSectionProps> = ({
  totalCompleted,
  progressPercentage,
  onBack,
  onReset,
}) => (
  <>
    <button
      type="button"
      onClick={onBack}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6B7280',
        fontSize: 13,
        padding: '0 0 16px',
        fontFamily: 'inherit',
      }}
      aria-label="Back to dashboard"
    >
      ← Back to dashboard
    </button>

    {/* Hero banner */}
    <div
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1B4332 100%)',
        borderRadius: 16,
        padding: '28px 32px',
        marginBottom: 24,
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 32 }}>🇦🇷</span>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px' }}>
            Argentina Master Immigration Blueprint
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--color-94a3b8, #94A3B8)' }}>
            Track your 100 action items across document processing, university enrollment, visa
            protocols, and the 2-year federal court naturalization suit in Córdoba.
          </p>
        </div>
      </div>

      {/* Attestation badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
        {HERO_BADGES.map(badge => (
          <span
            key={badge}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
              color: '#E2E8F0',
            }}
          >
            {badge}
          </span>
        ))}
      </div>
    </div>

    {/* Overall progress */}
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 24,
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: 'var(--text-secondary, #6B7280)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              fontWeight: 600,
            }}
          >
            Overall Completion
          </p>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--color-0f172a, #0F172A)',
            }}
          >
            {progressPercentage}%{' '}
            <span
              style={{ fontSize: 14, color: 'var(--text-secondary, #6B7280)', fontWeight: 400 }}
            >
              ({totalCompleted} / 100 Milestones)
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          style={{
            background: 'none',
            border: '1px solid #E5E7EB',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            cursor: 'pointer',
            color: '#EF4444',
            fontFamily: 'inherit',
          }}
          aria-label="Reset all progress"
        >
          ↺ Reset progress
        </button>
      </div>
      <ProgressBar percent={progressPercentage} color="#C9A84C" height={10} />
    </div>
  </>
);
