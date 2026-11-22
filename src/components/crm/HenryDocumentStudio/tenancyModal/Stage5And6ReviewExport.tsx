import React, { FC } from 'react';
import { Printer, Save, Share2 } from 'lucide-react';
import {
  HeaderBtn,
  FormGroup,
  InputField,
  FormGrid,
} from '../styles/HenryTenancyContractModal.style';
import type { DldTenancyContractData, FieldChangeHandler } from './types';

export interface Stage5SpecialTermsProps {
  contractData: DldTenancyContractData;
  onUpdateAdditionalTerm: (index: number, value: string) => void;
}

export const Stage5SpecialTerms: FC<Stage5SpecialTermsProps> = ({
  contractData,
  onUpdateAdditionalTerm,
}) => (
  <div>
    <h4
      style={{
        margin: '0 0 1rem 0',
        color: 'var(--accent-gold, #F59E0B)',
        fontSize: '0.95rem',
        fontWeight: 800,
      }}
    >
      Stage 5: Additional Terms & Special Addenda (شروط إضافية — الصفحة 3)
    </h4>
    <p style={{ fontSize: '0.8rem', color: 'var(--color-94a3b8, #94A3B8)', margin: '0 0 12px 0' }}>
      Add up to 5 custom statutory or property-specific special conditions to appear on Page 3 of
      the official DLD agreement:
    </p>

    {[0, 1, 2, 3, 4].map(index => (
      <FormGroup key={index} style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>
          Clause {index + 1} <span className="label-arabic">(الشرط {index + 1})</span>
        </label>
        <InputField
          type="text"
          value={(contractData.additionalTerms && contractData.additionalTerms[index]) || ''}
          placeholder={`Enter custom clause ${index + 1}...`}
          onChange={e => onUpdateAdditionalTerm(index, e.target.value)}
        />
      </FormGroup>
    ))}
  </div>
);

export interface Stage6ReviewExportProps {
  contractData: DldTenancyContractData;
  onFieldChange: FieldChangeHandler;
  onGenerateEsignLink: () => void;
  onPrint: () => void;
  onSaveAndArchive: () => void;
}

export const Stage6ReviewExport: FC<Stage6ReviewExportProps> = ({
  contractData,
  onFieldChange,
  onGenerateEsignLink,
  onPrint,
  onSaveAndArchive,
}) => (
  <div>
    <h4
      style={{
        margin: '0 0 1rem 0',
        color: 'var(--color-38bdf8, #38BDF8)',
        fontSize: '0.95rem',
        fontWeight: 800,
      }}
    >
      Stage 6: Final Review & Document Export (مراجعة واعتماد العقد)
    </h4>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Tenant Endorsement Signature <span className="label-arabic">(توقيع المستأجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.tenantSignature || ''}
          placeholder="Enter Tenant Name for Digital Signature"
          onChange={e => {
            onFieldChange('tenantSignature', e.target.value);
            onFieldChange('tenantSignatureDate', new Date().toLocaleDateString('en-GB'));
          }}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Lessor Endorsement Signature <span className="label-arabic">(توقيع المؤجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.lessorSignature || ''}
          placeholder="Enter Lessor Name for Digital Signature"
          onChange={e => {
            onFieldChange('lessorSignature', e.target.value);
            onFieldChange('lessorSignatureDate', new Date().toLocaleDateString('en-GB'));
          }}
        />
      </FormGroup>
    </FormGrid>

    <div
      style={{
        background: 'rgba(56, 189, 248, 0.08)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '10px',
        padding: '16px',
        marginTop: '1.25rem',
      }}
    >
      <div
        style={{
          fontWeight: 800,
          color: 'var(--color-38bdf8, #38BDF8)',
          fontSize: '0.9rem',
          marginBottom: '6px',
        }}
      >
        E-signature dispatch — unavailable
      </div>
      <p
        style={{ fontSize: '0.8rem', color: 'var(--color-94a3b8, #94A3B8)', margin: '0 0 12px 0' }}
      >
        No signing provider is connected here. Preparing or printing a contract does not send it or
        verify signatures.
      </p>
      <HeaderBtn $variant="primary" onClick={onGenerateEsignLink}>
        <Share2 size={14} /> E-signature availability
      </HeaderBtn>
    </div>

    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
      <HeaderBtn $variant="secondary" onClick={onPrint} style={{ flex: 1 }}>
        <Printer size={14} /> Print / Save Full 3-Page Contract PDF
      </HeaderBtn>
      <HeaderBtn $variant="primary" onClick={onSaveAndArchive} style={{ flex: 1 }}>
        <Save size={14} /> Save to Henry Vault
      </HeaderBtn>
    </div>
  </div>
);
