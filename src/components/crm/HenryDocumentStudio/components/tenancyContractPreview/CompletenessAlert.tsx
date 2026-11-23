import React, { FC, CSSProperties } from 'react';
import { ScannedContractData } from './types';

export interface CompletenessAlertProps {
  scannedContractData: ScannedContractData;
}

const dateLabelStyle: CSSProperties = {
  fontSize: '11px',
  color: 'var(--text-secondary, #64748B)',
  fontWeight: 700,
};

const dateBadgeStyle: CSSProperties = {
  background: 'var(--color-f1f5f9, #F1F5F9)',
  color: 'var(--color-0f172a, #0F172A)',
  padding: '3px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '11px',
};

export const CompletenessAlert: FC<CompletenessAlertProps> = ({ scannedContractData }) => {
  const isFilled = scannedContractData.isFilled;

  return (
    <div
      style={{
        background: isFilled ? 'rgba(22, 163, 74, 0.08)' : 'rgba(234, 179, 8, 0.08)',
        border: `1px solid ${isFilled ? 'rgba(22, 163, 74, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
        borderRadius: '10px',
        padding: '12px 16px',
        marginBottom: '18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 800,
            color: isFilled ? 'var(--color-15803d, #15803D)' : 'var(--color-a16207, #A16207)',
          }}
        >
          {isFilled
            ? `Contract Completeness: ${scannedContractData.fillScorePercent}% (${scannedContractData.filledFieldsCount} of ${scannedContractData.totalFieldsCount} fields populated)`
            : 'Unfilled DLD Base Contract: 0% Populated (Ready for Auto-Fill Template)'}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--text-secondary, #64748B)',
            marginTop: '2px',
          }}
        >
          {scannedContractData.missingFields && scannedContractData.missingFields.length > 0
            ? `Missing / Optional Fields: ${scannedContractData.missingFields.join(', ')}`
            : 'Demo fields populated; completeness, accuracy and legal validity are not verified.'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={dateLabelStyle}>Contract Date:</span>
        <code style={dateBadgeStyle}>{scannedContractData.contractDate || 'Unspecified'}</code>
      </div>
    </div>
  );
};
