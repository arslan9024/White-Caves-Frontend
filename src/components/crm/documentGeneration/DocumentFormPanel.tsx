import React, { FC } from 'react';
import { DocTemplate, GenerationStatus } from './types';
import { RED, WHITE, SLATE, TEXT_MUTED } from './constants';
import { formContainerStyle, formInputStyle } from './styles';
import { mockProperties, mockLeasingTransactions } from '../../../mocks/dubaiRealEstateMocks';

interface DocumentFormPanelProps {
  template: DocTemplate;
  formValues: Record<string, string>;
  genStatus: GenerationStatus;
  onChangeFieldValue: (key: string, value: string) => void;
  onQuickFill: (values: Record<string, string>) => void;
  onGenerate: () => void;
  onOpenLibrary: () => void;
}

export const DocumentFormPanel: FC<DocumentFormPanelProps> = ({
  template,
  formValues,
  genStatus,
  onChangeFieldValue,
  onQuickFill,
  onGenerate,
  onOpenLibrary,
}) => {
  const isFinancial = template.type === 'COMMISSION_STATEMENT' || template.type === 'MOU_SALE';
  const val = Number(formValues.transactionValue || formValues.salePrice || 0);

  return (
    <div style={formContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontSize: '2rem' }}>{template.icon}</span>
        <div>
          <h3 style={{ margin: 0, color: SLATE, fontSize: '1.1rem' }}>{template.title}</h3>
          <span style={{ fontSize: '0.75rem', color: TEXT_MUTED }}>Fill in the fields below to generate</span>
        </div>
      </div>

      <div
        style={{
          background: 'var(--color-eff6ff, #EFF6FF)',
          border: '1px solid var(--color-bfdbfe, #BFDBFE)',
          padding: '10px 14px',
          borderRadius: '8px',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '0.78rem', color: 'var(--accent-blue, #1D4ED8)', fontWeight: 600 }}>
          ⚡ Quick-fill from Active Transactions
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
          {mockLeasingTransactions.slice(0, 3).map(tx => (
            <button
              key={tx.id}
              onClick={() => {
                const prop = mockProperties.find(p => p.id === tx.propertyId);
                onQuickFill({
                  tenantName: tx.tenantName,
                  landlordName: tx.landlordName,
                  agentName: tx.agentAssigned,
                  propertyAddress: prop?.title || tx.propertyId,
                  monthlyRent: '',
                });
              }}
              style={{
                background: WHITE,
                border: '1px solid #BFDBFE',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                color: '#1D4ED8',
                fontWeight: 600,
              }}
            >
              {tx.tenantName}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {template.fields.map(field => (
          <div key={field.key}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: SLATE, display: 'block', marginBottom: '4px' }}>
              {field.label}
            </label>
            <input
              type="text"
              value={formValues[field.key] || ''}
              onChange={e => onChangeFieldValue(field.key, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
              style={formInputStyle}
            />
          </div>
        ))}
      </div>

      {isFinancial && (
        <div
          style={{
            background: 'var(--color-fffbeb, #FFFBEB)',
            border: '1px solid var(--color-fcd34d, #FCD34D)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-92400e, #92400E)' }}>
            🧮 VAT 5% Preview (Auto-calculated)
          </div>
          {formValues.transactionValue || formValues.salePrice ? (
            <div style={{ marginTop: '6px', fontSize: '0.8rem', color: 'var(--color-78350f, #78350F)' }}>
              Subtotal: AED {val.toLocaleString()}
              <br />
              VAT (5%): AED {(val * 0.05).toLocaleString()}
              <br />
              <strong>Total: AED {(val * 1.05).toLocaleString()}</strong>
            </div>
          ) : (
            <div style={{ fontSize: '0.78rem', color: TEXT_MUTED, marginTop: '4px' }}>
              Enter transaction value to see VAT breakdown
            </div>
          )}
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={genStatus === 'generating'}
        style={{
          width: '100%',
          padding: '12px',
          background: genStatus === 'generating' ? TEXT_MUTED : RED,
          color: WHITE,
          border: 'none',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: genStatus === 'generating' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {genStatus === 'generating' ? (
          <>⏳ Generating PDF...</>
        ) : genStatus === 'done' ? (
          <>✅ Document Ready — Generate Another</>
        ) : (
          <>📥 Generate Document PDF</>
        )}
      </button>

      {genStatus === 'done' && (
        <div
          style={{
            background: 'var(--color-def7ec, #DEF7EC)',
            border: '1px solid var(--color-6ee7b7, #6EE7B7)',
            padding: '12px',
            borderRadius: '8px',
            marginTop: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--color-065f46, #065F46)', fontSize: '0.875rem' }}>
            ✅ Document generated successfully! View it in Document Library.
          </div>
          <button
            onClick={onOpenLibrary}
            style={{
              marginTop: '8px',
              background: '#065F46',
              color: WHITE,
              border: 'none',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            Open Library →
          </button>
        </div>
      )}
    </div>
  );
};
