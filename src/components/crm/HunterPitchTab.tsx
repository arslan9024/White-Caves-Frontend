import React from 'react';
import { Send } from 'lucide-react';
import type { ProspectBuyer } from './hunterProspecting.data';

interface PitchTabProps {
  selectedBuyer: ProspectBuyer;
  pitchText: string;
  setPitchText: (text: string) => void;
  sentSuccess: boolean;
  handleSendPitch: () => void;
}

export const HunterPitchTab: React.FC<PitchTabProps> = ({
  selectedBuyer,
  pitchText,
  setPitchText,
  sentSuccess,
  handleSendPitch,
}) => {
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
            VIP WhatsApp Pitch Studio for {selectedBuyer.name}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <textarea
              rows={8}
              value={pitchText}
              onChange={e => setPitchText(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--text-secondary, #CBD5E1)',
                fontSize: '0.85rem',
                fontFamily: 'sans-serif',
              }}
            />
            {sentSuccess && (
              <div
                style={{
                  background: 'var(--color-ecfdf5, #ECFDF5)',
                  border: '1px solid var(--color-a7f3d0, #A7F3D0)',
                  padding: '10px',
                  borderRadius: '6px',
                  color: 'var(--color-065f46, #065F46)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                ✓ Pitch successfully dispatched to {selectedBuyer.name}'s verified WhatsApp session.
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleSendPitch}
                style={{
                  background: 'var(--accent-green, #059669)',
                  color: 'var(--white, #FFF)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Send size={16} /> Send via Nadia WhatsApp Gateway
              </button>
            </div>
          </div>
        </div>
  );
};
