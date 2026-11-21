import React, { memo, useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template?: string;
  campaignName?: string;
  cluster?: string;
}

export const LindaSpintaxPreviewModal: React.FC<Props> = memo(({ isOpen, onClose, template, campaignName, cluster }) => {
  const [variations, setVariations] = useState<string[]>([]);
  const activeTemplate = template || `{Hi|Hello|Good afternoon}, regarding your property in ${cluster || 'DAMAC Hills 2'} (${campaignName || 'Leasing Campaign'}): {is it currently available for rent?|are you open to a new tenant this month?}`;

  const generateVariations = () => {
    const regex = /\{([^{}]+)\}/g;
    const items: string[] = [];
    for (let i = 0; i < 3; i++) {
      const rendered = activeTemplate.replace(regex, (_, choices) => {
        const parts = choices.split('|');
        return parts[Math.floor(Math.random() * parts.length)];
      });
      items.push(rendered);
    }
    setVariations(items);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#1e1e2d',
          width: '450px',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(37,211,102,0.3)',
          color: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={16} color="#25D366" /> Spintax Variation Simulator
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        <button
          onClick={generateVariations}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#25D366',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            fontSize: '12px',
            cursor: 'pointer',
            marginBottom: '12px',
          }}
        >
          <RefreshCw size={12} /> Generate 3 Samples
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {variations.map((v, i) => (
            <div
              key={i}
              style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '6px',
                fontSize: '12px',
                borderLeft: '3px solid #25D366',
              }}
            >
              {v || '(Click generate to preview)'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default LindaSpintaxPreviewModal;
