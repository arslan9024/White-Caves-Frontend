import React, { FC } from 'react';
import { Clock, Zap } from 'lucide-react';
import type { JourneyDefinition } from '../../../types/journey';

interface JourneyCatalogCardProps {
  journey: JourneyDefinition;
  onLaunch: (journey: JourneyDefinition) => void;
}

export const JourneyCatalogCard: FC<JourneyCatalogCardProps> = ({ journey, onLaunch }) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
      transition: 'all 0.2s ease',
    }}
  >
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>{journey.icon}</span>
          <div>
            <h4
              style={{
                margin: 0,
                fontSize: '0.92rem',
                fontWeight: 800,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              {journey.title}
            </h4>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-secondary, #64748B)',
                fontWeight: 600,
              }}
            >
              {journey.family}
            </span>
          </div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#3B82F6',
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '2px 8px',
            borderRadius: '6px',
          }}
        >
          <Clock size={11} />
          <span>{journey.estimatedMinutes}m</span>
        </span>
      </div>

      <p
        style={{
          margin: '8px 0 0 0',
          fontSize: '0.78rem',
          color: 'var(--color-475569, #475569)',
          lineHeight: 1.45,
        }}
      >
        {journey.description}
      </p>

      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '10px' }}>
        {journey.steps.map((step, idx) => (
          <span
            key={step.id}
            style={{
              fontSize: '0.65rem',
              background: '#F1F5F9',
              color: '#475569',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 600,
            }}
          >
            {idx + 1}. {step.shortLabel || step.title}
          </span>
        ))}
      </div>
    </div>

    <button
      type="button"
      onClick={() => onLaunch(journey)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: '100%',
        padding: '8px',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
        color: '#FFFFFF',
        fontSize: '0.8rem',
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(239, 68, 68, 0.25)',
        transition: 'all 0.15s ease',
      }}
    >
      <Zap size={14} />
      <span>Launch Mission</span>
    </button>
  </div>
);
