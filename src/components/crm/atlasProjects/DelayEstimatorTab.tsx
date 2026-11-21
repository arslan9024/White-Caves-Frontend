import React, { useState, type FC } from 'react';
import type { AtlasProject } from './types';

interface DelayEstimatorTabProps {
  projects: AtlasProject[];
}

export const DelayEstimatorTab: FC<DelayEstimatorTabProps> = ({ projects }) => {
  const [delayProject, setDelayProject] = useState('Business Bay Heights');
  const [scheduledHandover, setScheduledHandover] = useState('2027-06-30');
  const [currentDldProgress, setCurrentDldProgress] = useState(45);

  const requiredProgress = 60;
  const progressGap = Math.max(0, requiredProgress - currentDldProgress);
  const estimatedDelayMonths = Math.round(progressGap * 0.4);
  const revisedDate = new Date(scheduledHandover);
  revisedDate.setMonth(revisedDate.getMonth() + estimatedDelayMonths);
  const revisedHandover = revisedDate.toISOString().split('T')[0];
  const riskTier =
    estimatedDelayMonths > 4
      ? 'HIGH_VARIANCE'
      : estimatedDelayMonths > 0
        ? 'MODERATE'
        : 'ON_SCHEDULE';

  return (
    <div
      style={{
        background: 'var(--white, #FFFFFF)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--text-secondary, #E2E8F0)',
      }}
    >
      <h4
        style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Construction Delay & Handover Variance Estimator
      </h4>
      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.8rem',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        Compares live DLD audit progress against schedule milestones to project handover delays and
        escrow liquidity risks.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Select Project
          </label>
          <select
            value={delayProject}
            onChange={e => setDelayProject(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            {projects.map(p => (
              <option key={p.id} value={p.name}>
                {p.name} ({p.developer})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            DLD Verified Progress ({currentDldProgress}%)
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={currentDldProgress}
            onChange={e => setCurrentDldProgress(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Scheduled Handover
          </label>
          <input
            type="date"
            value={scheduledHandover}
            onChange={e => setScheduledHandover(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.8rem',
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: 'var(--color-fff7ed, #FFF7ED)',
          border: '1px solid var(--color-ffedd5, #FFEDD5)',
          padding: '1.25rem',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
        }}
      >
        <div>
          <div
            style={{ fontSize: '0.75rem', color: 'var(--color-9a3412, #9A3412)', fontWeight: 800 }}
          >
            ESTIMATED DELAY
          </div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--color-c2410c, #C2410C)',
              marginTop: '4px',
            }}
          >
            {estimatedDelayMonths} Months
          </div>
        </div>
        <div>
          <div
            style={{ fontSize: '0.75rem', color: 'var(--color-9a3412, #9A3412)', fontWeight: 800 }}
          >
            REVISED HANDOVER DATE
          </div>
          <div
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--color-9a3412, #9A3412)',
              marginTop: '4px',
            }}
          >
            {revisedHandover}
          </div>
        </div>
        <div>
          <div
            style={{ fontSize: '0.75rem', color: 'var(--color-9a3412, #9A3412)', fontWeight: 800 }}
          >
            RISK CLASSIFICATION
          </div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color:
                riskTier === 'HIGH_VARIANCE'
                  ? 'var(--accent-red, #DC2626)'
                  : 'var(--accent-gold, #D97706)',
              marginTop: '4px',
            }}
          >
            {riskTier}
          </div>
        </div>
      </div>
    </div>
  );
};
