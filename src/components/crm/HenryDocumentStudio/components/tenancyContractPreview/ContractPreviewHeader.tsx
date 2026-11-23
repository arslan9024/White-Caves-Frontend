import React, { FC, CSSProperties } from 'react';
import { Copy, RefreshCw, Scan, Sparkles } from 'lucide-react';
import { ActionButton } from '../../styles/HenryDocumentStudio.style';
import { ContractScanTemplateType, ScannedContractData } from './types';

export interface ContractPreviewHeaderProps {
  scannedContractData: ScannedContractData;
  isScanning: boolean;
  handleScanTenancyContract: (template?: ContractScanTemplateType) => void | Promise<void>;
  handleCopyContractJsonVariables: () => void;
}

const headerContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #EF4444',
  paddingBottom: '14px',
  marginBottom: '18px',
};

const tagContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const demoBadgeStyle: CSSProperties = {
  background: '#EF4444',
  color: 'white',
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 800,
};

const titleStyle: CSSProperties = {
  margin: '6px 0 2px',
  color: 'var(--color-1e293b, #1E293B)',
  fontSize: '18px',
};

const subtitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--text-secondary, #64748B)',
  fontSize: '12px',
};

const buttonGroupStyle: CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const svetlanaButtonStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, var(--accent-blue, #0284C7) 0%, var(--color-0369a1, #0369A1) 100%)',
  borderColor: 'var(--accent-blue, #0284C7)',
};

export const ContractPreviewHeader: FC<ContractPreviewHeaderProps> = ({
  scannedContractData,
  isScanning,
  handleScanTenancyContract,
  handleCopyContractJsonVariables,
}) => {
  const isFilled = scannedContractData.isFilled;

  return (
    <div style={headerContainerStyle}>
      <div>
        <div style={tagContainerStyle}>
          <span style={demoBadgeStyle}>TENANCY CONTRACT DEMO PREVIEW</span>
          <span
            style={{
              fontSize: '11px',
              background: isFilled ? 'rgba(22, 163, 74, 0.15)' : 'rgba(234, 179, 8, 0.15)',
              color: isFilled ? '#16A34A' : '#CA8A04',
              padding: '3px 8px',
              borderRadius: '4px',
              fontWeight: 800,
            }}
          >
            {isFilled
              ? `Demo field coverage (${scannedContractData.fillScorePercent}% Score)`
              : '⚠️ BLANK REUSABLE TEMPLATE (0% Score)'}
          </span>
        </div>
        <h3 style={titleStyle}>Tenancy Contract Scanner — Demo Preview</h3>
        <p style={subtitleStyle}>
          Demo field coverage ({scannedContractData.filledFieldsCount}/
          {scannedContractData.totalFieldsCount} Fields), not accuracy or signature verification. No
          autonomous learning.
        </p>
      </div>

      <div style={buttonGroupStyle}>
        <ActionButton
          $primary
          onClick={() => handleScanTenancyContract('sample_sanit')}
          disabled={isScanning}
          title="Scan & Extract Camelia 608 (Sanit Singh & Keshivani)"
        >
          <Scan size={14} /> Scan Camelia 608 (Sanit Singh)
        </ActionButton>
        <ActionButton
          $primary
          onClick={() => handleScanTenancyContract('sample_svetlana')}
          disabled={isScanning}
          title="Scan & Extract Janusia XH2858B (Svetlana & William Abernethy)"
          style={svetlanaButtonStyle}
        >
          <Sparkles size={14} /> Scan Janusia XH2858B (Svetlana)
        </ActionButton>
        <ActionButton
          onClick={() => handleScanTenancyContract('blank')}
          disabled={isScanning}
          title="Scan Blank Unfilled Contract Template"
        >
          <RefreshCw size={14} /> Scan Blank Template
        </ActionButton>
        <ActionButton onClick={handleCopyContractJsonVariables} title="Copy All Variables as JSON">
          <Copy size={14} /> Export Variables (JSON)
        </ActionButton>
      </div>
    </div>
  );
};
