import React, { FC } from 'react';
import { CheckCircle2, FolderOpen, ScrollText } from 'lucide-react';
import type { JourneySession } from '../../../types/journey';

interface JourneyAuditHistoryPanelProps {
  lifecycleHistory: JourneySession[];
}

export const JourneyAuditHistoryPanel: FC<JourneyAuditHistoryPanelProps> = ({
  lifecycleHistory,
}) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
    }}
  >
    <h3
      style={{
        margin: '0 0 16px 0',
        fontSize: '1rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <ScrollText size={18} color="#EF4444" />
      <span>Completed Journey Execution Audit Vault</span>
    </h3>
    {lifecycleHistory.length === 0 ? (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '8px' }}>
          <FolderOpen size={32} color="#94A3B8" />
        </div>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem' }}>
          No completed journeys in this session yet. Launch any of the 20 missions above to build
          immutable audit history.
        </p>
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {lifecycleHistory.map(entry => (
          <div
            key={entry.sessionId}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: 'var(--color-1e293b, #1E293B)',
                }}
              >
                {entry.result?.title || entry.journeyId}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                Ref: {entry.result?.referenceNumber || entry.sessionId} • Completed on{' '}
                {new Date(entry.updatedAt || entry.createdAt).toLocaleString()}
              </span>
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#16A34A',
                background: 'rgba(22, 163, 74, 0.12)',
                padding: '3px 10px',
                borderRadius: '999px',
              }}
            >
              <CheckCircle2 size={13} />
              <span>100% Ready</span>
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);
