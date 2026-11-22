import React, { FC } from 'react';
import { Sparkles, UploadCloud } from 'lucide-react';
import {
  HeaderBtn,
  FormGroup,
  InputField,
  FormGrid,
  OcrDropzone,
} from '../styles/HenryTenancyContractModal.style';
import type { DldTenancyContractData, FieldChangeHandler } from './types';

export interface Stage3TenantKycProps {
  contractData: DldTenancyContractData;
  isProcessingOcr: boolean;
  onFieldChange: FieldChangeHandler;
  onTriggerTenantEidUpload: () => void;
  onTriggerTenantPassportUpload: () => void;
  onScanTenantEmiratesId: () => void;
  onScanTenantPassport: () => void;
}

export const Stage3TenantKyc: FC<Stage3TenantKycProps> = ({
  contractData,
  isProcessingOcr,
  onFieldChange,
  onTriggerTenantEidUpload,
  onTriggerTenantPassportUpload,
  onScanTenantEmiratesId,
  onScanTenantPassport,
}) => (
  <div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '1.25rem',
      }}
    >
      <OcrDropzone onClick={onTriggerTenantEidUpload}>
        <UploadCloud
          size={24}
          color="var(--accent-blue, #38BDF8)"
          style={{ margin: '0 auto 6px auto' }}
        />
        <div className="dropzone-title" style={{ fontSize: '0.85rem' }}>
          Upload Tenant Emirates ID
        </div>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '6px' }}>
          <HeaderBtn
            $variant="secondary"
            onClick={e => {
              e.stopPropagation();
              onTriggerTenantEidUpload();
            }}
            disabled={isProcessingOcr}
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <UploadCloud size={12} /> Browse EID
          </HeaderBtn>
          <HeaderBtn
            $variant="secondary"
            onClick={e => {
              e.stopPropagation();
              onScanTenantEmiratesId();
            }}
            disabled={isProcessingOcr}
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <Sparkles size={12} /> Sample EID
          </HeaderBtn>
        </div>
      </OcrDropzone>

      <OcrDropzone onClick={onTriggerTenantPassportUpload}>
        <UploadCloud
          size={24}
          color="var(--accent-green, #10B981)"
          style={{ margin: '0 auto 6px auto' }}
        />
        <div className="dropzone-title" style={{ fontSize: '0.85rem' }}>
          Upload Tenant Passport
        </div>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '6px' }}>
          <HeaderBtn
            $variant="secondary"
            onClick={e => {
              e.stopPropagation();
              onTriggerTenantPassportUpload();
            }}
            disabled={isProcessingOcr}
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <UploadCloud size={12} /> Browse Passport
          </HeaderBtn>
          <HeaderBtn
            $variant="secondary"
            onClick={e => {
              e.stopPropagation();
              onScanTenantPassport();
            }}
            disabled={isProcessingOcr}
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <Sparkles size={12} /> Sample Passport
          </HeaderBtn>
        </div>
      </OcrDropzone>
    </div>

    <h4
      style={{
        margin: '0 0 1rem 0',
        color: 'var(--color-38bdf8, #38BDF8)',
        fontSize: '0.95rem',
        fontWeight: 800,
      }}
    >
      Stage 3: Tenant Information & KYC (معلومات المستأجر)
    </h4>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Tenant's Full Name <span className="label-arabic">(اسم المستأجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.tenantName}
          placeholder="e.g. Sarah Jenkins / KESHIVANI MAYADEVAN"
          onChange={e => onFieldChange('tenantName', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Tenant's Emirates ID / Passport{' '}
          <span className="label-arabic">(الهوية الإماراتية للمستأجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.tenantEmiratesId}
          placeholder="784-1992-7654321-2"
          onChange={e => onFieldChange('tenantEmiratesId', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Tenant's Phone Number <span className="label-arabic">(رقم هاتف المستأجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.tenantPhone}
          placeholder="+971 52 987 6543"
          onChange={e => onFieldChange('tenantPhone', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Tenant's Email Address <span className="label-arabic">(البريد الإلكتروني للمستأجر)</span>
        </label>
        <InputField
          type="email"
          value={contractData.tenantEmail}
          placeholder="sarah.jenkins@example.com"
          onChange={e => onFieldChange('tenantEmail', e.target.value)}
        />
      </FormGroup>
    </FormGrid>
  </div>
);
