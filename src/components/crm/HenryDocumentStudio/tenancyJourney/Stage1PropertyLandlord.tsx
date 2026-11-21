import React, { type FC } from 'react';
import { Trash2 } from 'lucide-react';
import type { DldTenancyContractData } from '../../../../services/HenryTenancyContractTemplateService';
import henryTitleDeedScannerService from '../../../../services/HenryTitleDeedScannerService';
import henryPassportScannerService from '../../../../services/HenryPassportScannerService';
import HenrySharedDocumentUploader from '../HenrySharedDocumentUploader';
import {
  BottomActionBar,
  FormCard,
  FormGrid,
  FormGroup,
  PrimaryBtn,
} from './TenancyJourney.styles';

type CachedTitleDeed = ReturnType<typeof henryTitleDeedScannerService.getCachedTitleDeed>;
type CachedPassport = ReturnType<typeof henryPassportScannerService.getCachedPassport>;

interface Stage1PropertyLandlordProps {
  contractData: DldTenancyContractData;
  cachedTitleDeed: CachedTitleDeed;
  cachedPassport: CachedPassport;
  isProcessing: boolean;
  onIngestCachedTitleDeed: () => void;
  onIngestCachedLandlordPassport: () => void;
  onUploadTitleDeed: (file: File) => Promise<void>;
  onUploadLandlordPassport: (file: File) => Promise<void>;
  onSampleTitleDeed: () => void;
  onSampleLandlordPassport: () => void;
  updateField: <K extends keyof DldTenancyContractData>(
    field: K,
    value: DldTenancyContractData[K]
  ) => void;
  onDiscardDraft: () => void;
  onNextStage: () => void;
}

export const Stage1PropertyLandlord: FC<Stage1PropertyLandlordProps> = ({
  contractData,
  cachedTitleDeed,
  cachedPassport,
  isProcessing,
  onIngestCachedTitleDeed,
  onIngestCachedLandlordPassport,
  onUploadTitleDeed,
  onUploadLandlordPassport,
  onSampleTitleDeed,
  onSampleLandlordPassport,
  updateField,
  onDiscardDraft,
  onNextStage,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {cachedTitleDeed && (
      <div
        style={{
          background: 'var(--color-fef2f2, #FEF2F2)',
          border: '1px solid var(--color-fecaca, #FECACA)',
          borderRadius: '8px',
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--color-991b1b, #991B1B)' }}
          >
            ⚡ Active Title Deed In Cache
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-red, #B91C1C)' }}>
            {cachedTitleDeed.buildingNameEn || 'Building'} Unit {cachedTitleDeed.propertyNumber} (
            {cachedTitleDeed.ownerNameEn || 'Owner'})
          </div>
        </div>
        <PrimaryBtn
          $variant="primary"
          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
          onClick={onIngestCachedTitleDeed}
        >
          Ingest Title Deed
        </PrimaryBtn>
      </div>
    )}

    {cachedPassport && (
      <div
        style={{
          background: 'var(--color-eff6ff, #EFF6FF)',
          border: '1px solid var(--color-bfdbfe, #BFDBFE)',
          borderRadius: '8px',
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--color-1e40af, #1E40AF)' }}
          >
            ⚡ Active Passport In Cache
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--accent-blue, #2563EB)' }}>
            {cachedPassport.fullName} ({cachedPassport.passportNumber})
          </div>
        </div>
        <PrimaryBtn
          $variant="primary"
          style={{
            padding: '4px 10px',
            fontSize: '0.72rem',
            background: 'var(--accent-blue, #2563EB)',
          }}
          onClick={onIngestCachedLandlordPassport}
        >
          Ingest as Landlord
        </PrimaryBtn>
      </div>
    )}

    <HenrySharedDocumentUploader
      docType="title_deed"
      title="1. Upload Title Deed for Source Review"
      subtitle="Scans and extracts Building Name, Unit Number, Plot, Makani, DEWA Premise & Area"
      onFileUpload={onUploadTitleDeed}
      onSampleLoad={onSampleTitleDeed}
      isProcessing={isProcessing}
      accentColor="#EF4444"
      extractedSummary={
        contractData.propertyNo
          ? {
              title: 'Extracted Property Specs',
              fields: [
                { label: 'Building', value: contractData.buildingName, isHighlight: true },
                { label: 'Unit No.', value: contractData.propertyNo, isHighlight: true },
                { label: 'Plot No.', value: contractData.plotNo },
                { label: 'DEWA Premise', value: contractData.premisesNoDewa },
                { label: 'Area SqM', value: contractData.propertyAreaSqM },
                { label: 'Owner', value: contractData.ownerName },
              ],
            }
          : null
      }
    />

    <HenrySharedDocumentUploader
      docType="passport"
      title="2. Upload Landlord Passport / Emirates ID"
      subtitle="Scans and extracts Owner/Lessor Legal Name, Identification Number, and Contact details"
      onFileUpload={onUploadLandlordPassport}
      onSampleLoad={onSampleLandlordPassport}
      isProcessing={isProcessing}
      accentColor="#3B82F6"
    />

    <FormCard>
      <h4
        style={{
          margin: 0,
          fontSize: '0.9rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Property & Landlord — User-Reviewed Fields
      </h4>
      <FormGrid $cols={3}>
        <FormGroup>
          <label>
            Building Name <span className="ar">(اسم المبنى)</span>
          </label>
          <input
            type="text"
            value={contractData.buildingName}
            onChange={e => updateField('buildingName', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Unit No. <span className="ar">(رقم العقار)</span>
          </label>
          <input
            type="text"
            value={contractData.propertyNo}
            onChange={e => updateField('propertyNo', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Property Usage <span className="ar">(الاستخدام)</span>
          </label>
          <select
            value={contractData.propertyUsage}
            onChange={e =>
              updateField(
                'propertyUsage',
                e.target.value as DldTenancyContractData['propertyUsage']
              )
            }
          >
            <option value="residential">Residential (سكني)</option>
            <option value="commercial">Commercial (تجاري)</option>
            <option value="industrial">Industrial (صناعي)</option>
          </select>
        </FormGroup>
      </FormGrid>

      <FormGrid $cols={2}>
        <FormGroup>
          <label>
            Owner Name <span className="ar">(اسم المالك)</span>
          </label>
          <input
            type="text"
            value={contractData.ownerName}
            onChange={e => updateField('ownerName', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Lessor Emirates ID / Passport <span className="ar">(الهوية/الجواز)</span>
          </label>
          <input
            type="text"
            value={contractData.lessorEmiratesId}
            onChange={e => updateField('lessorEmiratesId', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <BottomActionBar>
        <PrimaryBtn $variant="danger" onClick={onDiscardDraft}>
          <Trash2 size={13} /> Discard Draft
        </PrimaryBtn>
        <PrimaryBtn $variant="primary" onClick={onNextStage}>
          Next: Tenant KYC →
        </PrimaryBtn>
      </BottomActionBar>
    </FormCard>
  </div>
);
