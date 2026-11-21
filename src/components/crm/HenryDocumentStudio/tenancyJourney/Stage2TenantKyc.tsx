import React, { type FC } from 'react';
import type { DldTenancyContractData } from '../../../../services/HenryTenancyContractTemplateService';
import henryEmiratesIdScannerService from '../../../../services/HenryEmiratesIdScannerService';
import henryPassportScannerService from '../../../../services/HenryPassportScannerService';
import HenrySharedDocumentUploader from '../HenrySharedDocumentUploader';
import {
  BottomActionBar,
  FormCard,
  FormGrid,
  FormGroup,
  PrimaryBtn,
} from './TenancyJourney.styles';

type CachedTenantEid = ReturnType<typeof henryEmiratesIdScannerService.getCachedEmiratesId>;
type CachedPassport = ReturnType<typeof henryPassportScannerService.getCachedPassport>;

interface Stage2TenantKycProps {
  contractData: DldTenancyContractData;
  cachedTenantEid: CachedTenantEid;
  cachedPassport: CachedPassport;
  isProcessing: boolean;
  onIngestCachedTenantEid: () => void;
  onIngestCachedTenantPassport: () => void;
  onUploadTenantEid: (file: File) => Promise<void>;
  onUploadTenantPassport: (file: File) => Promise<void>;
  onSampleTenantEid: () => void;
  onSampleTenantPassport: () => void;
  updateField: <K extends keyof DldTenancyContractData>(
    field: K,
    value: DldTenancyContractData[K]
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

export const Stage2TenantKyc: FC<Stage2TenantKycProps> = ({
  contractData,
  cachedTenantEid,
  cachedPassport,
  isProcessing,
  onIngestCachedTenantEid,
  onIngestCachedTenantPassport,
  onUploadTenantEid,
  onUploadTenantPassport,
  onSampleTenantEid,
  onSampleTenantPassport,
  updateField,
  onBack,
  onNext,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {cachedTenantEid && (
      <div
        style={{
          background: 'var(--color-ecfdf5, #ECFDF5)',
          border: '1px solid var(--color-a7f3d0, #A7F3D0)',
          borderRadius: '8px',
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--color-065f46, #065F46)' }}
          >
            ⚡ Active Emirates ID In Cache
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-047857, #047857)' }}>
            {cachedTenantEid.fullNameEn} ({cachedTenantEid.idNumber})
          </div>
        </div>
        <PrimaryBtn
          $variant="primary"
          style={{
            padding: '4px 10px',
            fontSize: '0.72rem',
            background: 'var(--accent-green, #059669)',
          }}
          onClick={onIngestCachedTenantEid}
        >
          Ingest as Tenant
        </PrimaryBtn>
      </div>
    )}

    {cachedPassport && (
      <div
        style={{
          background: 'var(--color-f5f3ff, #F5F3FF)',
          border: '1px solid var(--color-ddd6fe, #DDD6FE)',
          borderRadius: '8px',
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--color-5b21b6, #5B21B6)' }}
          >
            ⚡ Active Passport In Cache
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-purple, #6D28D9)' }}>
            {cachedPassport.fullName} ({cachedPassport.passportNumber})
          </div>
        </div>
        <PrimaryBtn
          $variant="primary"
          style={{
            padding: '4px 10px',
            fontSize: '0.72rem',
            background: 'var(--accent-purple, #7C3AED)',
          }}
          onClick={onIngestCachedTenantPassport}
        >
          Ingest as Tenant
        </PrimaryBtn>
      </div>
    )}

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      <HenrySharedDocumentUploader
        docType="emirates_id"
        title="Tenant Emirates ID"
        subtitle="Extracts 15-digit ID & Name"
        onFileUpload={onUploadTenantEid}
        onSampleLoad={onSampleTenantEid}
        isProcessing={isProcessing}
        accentColor="#10B981"
      />

      <HenrySharedDocumentUploader
        docType="passport"
        title="Tenant Passport"
        subtitle="Extracts MRZ & Passport No"
        onFileUpload={onUploadTenantPassport}
        onSampleLoad={onSampleTenantPassport}
        isProcessing={isProcessing}
        accentColor="#8B5CF6"
      />
    </div>

    <FormCard>
      <h4
        style={{
          margin: 0,
          fontSize: '0.9rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Tenant Contact & Legal Identity
      </h4>
      <FormGrid $cols={2}>
        <FormGroup>
          <label>
            Tenant Full Name <span className="ar">(اسم المستأجر)</span>
          </label>
          <input
            type="text"
            value={contractData.tenantName}
            onChange={e => updateField('tenantName', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Tenant Emirates ID / Passport <span className="ar">(الهوية/الجواز)</span>
          </label>
          <input
            type="text"
            value={contractData.tenantEmiratesId}
            onChange={e => updateField('tenantEmiratesId', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <FormGrid $cols={2}>
        <FormGroup>
          <label>
            Tenant Email <span className="ar">(البريد الإلكتروني)</span>
          </label>
          <input
            type="email"
            value={contractData.tenantEmail}
            onChange={e => updateField('tenantEmail', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Tenant Phone <span className="ar">(رقم الهاتف)</span>
          </label>
          <input
            type="text"
            value={contractData.tenantPhone}
            onChange={e => updateField('tenantPhone', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <BottomActionBar>
        <PrimaryBtn $variant="secondary" onClick={onBack}>
          ← Back to Property
        </PrimaryBtn>
        <PrimaryBtn $variant="primary" onClick={onNext}>
          Next: Contract Terms →
        </PrimaryBtn>
      </BottomActionBar>
    </FormCard>
  </div>
);
