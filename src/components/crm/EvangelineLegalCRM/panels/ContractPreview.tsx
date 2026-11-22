import React from 'react';
import { Check, Copy } from 'lucide-react';
import { cardStyle } from '../EvangelineLegalCRM.styles';

export interface ContractPreviewProps {
  copiedContract: boolean;
  compiledContractText: string;
  onCopyContract: () => void;
}

export const ContractPreview: React.FC<ContractPreviewProps> = ({
  copiedContract,
  compiledContractText,
  onCopyContract,
}) => (
  <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
      }}
    >
      <span
        style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-1e293b, #1E293B)' }}
      >
        Live Official DLD Contract Preview
      </span>
      <button
        onClick={onCopyContract}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'var(--color-f1f5f9, #F1F5F9)',
          border: '1px solid var(--text-secondary, #CBD5E1)',
          borderRadius: '6px',
          padding: '4px 10px',
          fontSize: '0.75rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {copiedContract ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
        <span>{copiedContract ? 'Copied!' : 'Copy Legal Text'}</span>
      </button>
    </div>
    <pre
      style={{
        flex: 1,
        background: 'var(--color-f8fafc, #F8FAFC)',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid var(--text-secondary, #E2E8F0)',
        fontSize: '0.75rem',
        color: 'var(--color-1e293b, #1E293B)',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        overflowY: 'auto',
        maxHeight: '360px',
        margin: 0,
      }}
    >
      {compiledContractText}
    </pre>
  </div>
);
