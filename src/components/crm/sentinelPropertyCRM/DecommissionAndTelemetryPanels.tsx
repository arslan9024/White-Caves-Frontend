import React from 'react';
import { Activity } from 'lucide-react';

export const DecommissionTabPanel: React.FC = () => {
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
        Asset Decommissioning & Statutory Archive Protocol
      </h4>
      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.8rem',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        Locks completed deals into permanent read-only archive vault complying with UAE PDPL
        5-year data retention law.
      </p>
    </div>
  );
};

export const TelemetryTabPanel: React.FC = () => {
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
        IoT Smart Property Sensors & Access Telemetry
      </h4>
      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.8rem',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        Real-time telemetry from smart lockboxes, DEWA smart meters, and AC temperature sensors
        in managed luxury properties.
      </p>
      <div
        style={{
          background: 'var(--color-eff6ff, #EFF6FF)',
          border: '1px solid var(--color-bfdbfe, #BFDBFE)',
          padding: '1rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--accent-blue, #1D4ED8)',
          fontWeight: 800,
        }}
      >
        <Activity size={18} />
        <span>Telemetry Pulse: 14 Smart Lockboxes Online | 0 Security Breaches</span>
      </div>
    </div>
  );
};
