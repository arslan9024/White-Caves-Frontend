import React from 'react';
import { Copy, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ninaStyles } from './NinaWhatsAppBotCRM.styles';

export interface NinaStage1PairingCardProps {
  phoneNumber: string;
  pairingCode: string;
  copiedCode: boolean;
  isGenerating: boolean;
  handleCopyPairingCode: () => void;
  handleRegeneratePairingCode: () => void;
  initiateDeviceLinkSequence: () => void;
}

export const NinaStage1PairingCard: React.FC<NinaStage1PairingCardProps> = ({
  phoneNumber,
  pairingCode,
  copiedCode,
  isGenerating,
  handleCopyPairingCode,
  handleRegeneratePairingCode,
  initiateDeviceLinkSequence,
}) => {
  return (
    <motion.div
      key="stage-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={ninaStyles.pairingCard}
    >
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: '#FFFFFF',
        }}
      >
        Hardware Link Pairing
      </h2>
      <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
        Verify link for WhatsApp line:{' '}
        <strong style={{ color: '#06B6D4' }}>{phoneNumber}</strong>
      </p>

      <div style={ninaStyles.codeDisplay}>{pairingCode}</div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <button
          type="button"
          onClick={handleCopyPairingCode}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#06B6D4',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Copy size={14} /> {copiedCode ? 'Copied!' : 'Copy Code'}
        </button>
        <button
          type="button"
          onClick={handleRegeneratePairingCode}
          disabled={isGenerating}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#0B132B',
            color: '#CBD5E1',
            borderRadius: '8px',
            border: '1px solid #3A506B',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} /> Regenerate
        </button>
      </div>

      <button
        type="button"
        onClick={initiateDeviceLinkSequence}
        style={{
          width: '100%',
          padding: '12px',
          background: '#10B981',
          color: '#FFFFFF',
          borderRadius: '10px',
          border: 'none',
          fontWeight: 800,
          fontSize: '0.95rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        Confirm Connection & Advance to Stage 2 <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};

