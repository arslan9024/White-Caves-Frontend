import React, { FC, CSSProperties } from 'react';

export interface AdditionalTermsPanelProps {
  additionalTerms: string[];
}

const containerStyle: CSSProperties = {
  background: 'var(--color-f8fafc, #F8FAFC)',
  border: '1px solid var(--text-secondary, #E2E8F0)',
  borderRadius: '10px',
  padding: '14px',
  marginBottom: '18px',
};

const headerTitleStyle: CSSProperties = {
  margin: '0 0 8px 0',
  fontSize: '13px',
  fontWeight: 800,
  color: 'var(--color-475569, #475569)',
};

const termsListStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '11px',
};

const termItemStyle: CSSProperties = {
  display: 'flex',
  gap: '6px',
  color: 'var(--color-1e293b, #1E293B)',
};

const checkmarkStyle: CSSProperties = {
  color: 'var(--accent-green, #16A34A)',
  fontWeight: 800,
};

export const AdditionalTermsPanel: FC<AdditionalTermsPanelProps> = ({ additionalTerms }) => {
  return (
    <div style={containerStyle}>
      <h4 style={headerTitleStyle}>
        📜 Additional Special Terms & Addenda (شروط إضافية ملحقة بالعقد)
      </h4>
      <div style={termsListStyle}>
        {additionalTerms && additionalTerms.length > 0 ? (
          additionalTerms.map((term: string, i: number) => (
            <div key={i} style={termItemStyle}>
              <span style={checkmarkStyle}>✓</span>
              <span>{term}</span>
            </div>
          ))
        ) : (
          <div style={termItemStyle}>
            <span style={{ color: 'var(--text-secondary, #64748B)' }}>
              No additional terms recorded.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
