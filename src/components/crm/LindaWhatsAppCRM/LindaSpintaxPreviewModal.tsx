import React, { FC } from 'react';
import { Eye, EyeOff, Sparkles, MessageSquare } from 'lucide-react';

export interface LindaSpintaxPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
  cluster: string;
}

const SPINTAX_TEMPLATES = [
  '{Hi|Hello|Dear} {Owner|Valued Investor}, {regarding|about} your {unit|property} in {Cluster}: {we have qualified buyers|an exclusive cash buyer is interested}. {Can we connect?|Are you open to discussing an offer?}',
  '{Good day|Greetings}, White Caves Sovereign Desk has {reviewed|analyzed} the latest DLD transactions for {Cluster}. We have {verified cash offers|instant buyer matches} ready.',
];

/**
 * Spintax Preview Modal — Humanized multi-variation messaging simulator
 */
export const LindaSpintaxPreviewModal: FC<LindaSpintaxPreviewModalProps> = ({
  isOpen,
  onClose,
  campaignName,
  cluster,
}) => {
  const [selectedVariation, setSelectedVariation] = React.useState<number>(0);

  if (!isOpen) return null;

  const resolvedVariations = [
    `Hello Tariq, regarding your property in ${cluster}: an exclusive cash buyer is interested. Are you open to discussing an offer?`,
    `Hi Nadia, about your unit in ${cluster}: we have qualified buyers. Can we connect?`,
    `Greetings, White Caves Sovereign Desk has analyzed the latest DLD transactions for ${cluster}. We have verified cash offers ready.`,
  ];

  return (
    <div
      role="dialog"
      aria-label="Spintax Preview Modal"
      data-testid="spintax-preview-modal"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
        padding: 16,
      }}
    >
      <div
        style={{
          background: '#0F172A',
          border: '1px solid rgba(245, 158, 11, 0.45)',
          borderRadius: 14,
          padding: 18,
          maxWidth: 480,
          width: '100%',
          color: '#F8FAFC',
          boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} color="#F59E0B" />
            <h4 style={{ margin: 0, fontSize: 14, color: '#FEF3C7' }}>Spintax Jitter Variations</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 12 }}>
          Campaign: <strong style={{ color: '#F8FAFC' }}>{campaignName}</strong>
        </div>

        <div style={{ background: '#020617', padding: 10, borderRadius: 8, marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: '#64748B', fontFamily: 'monospace', marginBottom: 4 }}>
            RAW SPINTAX TEMPLATE
          </div>
          <div style={{ fontSize: 11, color: '#FDE68A', fontFamily: 'monospace' }}>
            {SPINTAX_TEMPLATES[0]}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>
            Generated Variations (Anti-Pattern Mutation):
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {resolvedVariations.map((v, i) => (
              <div
                key={i}
                onClick={() => setSelectedVariation(i)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 6,
                  border:
                    selectedVariation === i
                      ? '1px solid #F59E0B'
                      : '1px solid rgba(255,255,255,0.06)',
                  background:
                    selectedVariation === i ? 'rgba(245, 158, 11, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                  fontSize: 11,
                  cursor: 'pointer',
                  lineHeight: '16px',
                }}
              >
                <div style={{ color: '#F59E0B', fontSize: 10, fontWeight: 700, marginBottom: 2 }}>
                  Variation #{i + 1}
                </div>
                {v}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              background: '#F59E0B',
              border: 'none',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
