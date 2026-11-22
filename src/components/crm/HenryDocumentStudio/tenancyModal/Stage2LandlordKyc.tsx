import React, { FC } from 'react';
import { UploadCloud } from 'lucide-react';
import {
  HeaderBtn,
  FormGroup,
  InputField,
  FormGrid,
  OcrDropzone,
} from '../styles/HenryTenancyContractModal.style';
import type { DldTenancyContractData, FieldChangeHandler } from './types';

export interface Stage2LandlordKycProps {
  contractData: DldTenancyContractData;
  isProcessingOcr: boolean;
  onFieldChange: FieldChangeHandler;
  onTriggerLandlordUpload: () => void;
}

export const Stage2LandlordKyc: FC<Stage2LandlordKycProps> = ({
  contractData,
  isProcessingOcr,
  onFieldChange,
  onTriggerLandlordUpload,
}) => (
  <div>
    <OcrDropzone onClick={onTriggerLandlordUpload} style={{ marginBottom: '1.25rem' }}>
      <UploadCloud
        size={24}
        color="var(--accent-red, #EF4444)"
        style={{ margin: '0 auto 6px auto' }}
      />
      <div className="dropzone-title">Upload Landlord Emirates ID / Passport / Agreement</div>
      <div className="dropzone-desc">
        Upload landlord identity document to extract Owner Name, Emirates ID, Mobile, and Email
        automatically.
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
        <HeaderBtn
          $variant="primary"
          onClick={e => {
            e.stopPropagation();
            onTriggerLandlordUpload();
          }}
          disabled={isProcessingOcr}
        >
          <UploadCloud size={14} /> Browse Landlord Document
        </HeaderBtn>
      </div>
    </OcrDropzone>

    <h4
      style={{
        margin: '0 0 1rem 0',
        color: 'var(--accent-red, #EF4444)',
        fontSize: '0.95rem',
        fontWeight: 800,
      }}
    >
      Stage 2: Owner & Lessor Information (معلومات المالك / المؤجر)
    </h4>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Owner's Full Name <span className="label-arabic">(اسم المالك)</span>
        </label>
        <InputField
          type="text"
          value={contractData.ownerName}
          placeholder="e.g. Arslan Malik / SANIT SINGH NAGPAL"
          onChange={e => onFieldChange('ownerName', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Lessor's Name <span className="label-arabic">(اسم المؤجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.lessorName}
          placeholder="e.g. Arslan Malik / SANIT SINGH NAGPAL"
          onChange={e => onFieldChange('lessorName', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Lessor's Emirates ID / Passport{' '}
          <span className="label-arabic">(الهوية الإماراتية للمؤجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.lessorEmiratesId}
          placeholder="784-1988-1234567-1"
          onChange={e => onFieldChange('lessorEmiratesId', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Lessor's Phone Number <span className="label-arabic">(رقم هاتف المؤجر)</span>
        </label>
        <InputField
          type="text"
          value={contractData.lessorPhone}
          placeholder="+971 50 123 4567"
          onChange={e => onFieldChange('lessorPhone', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Lessor's Email Address <span className="label-arabic">(البريد الإلكتروني للمؤجر)</span>
        </label>
        <InputField
          type="email"
          value={contractData.lessorEmail}
          placeholder="arslan.malik@whitecaves.ae"
          onChange={e => onFieldChange('lessorEmail', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          License No. <span className="label-arabic">(رقم الرخصة في حال كانت شركة)</span>
        </label>
        <InputField
          type="text"
          value={contractData.lessorLicenseNo}
          placeholder="Optional (e.g. 1388443)"
          onChange={e => onFieldChange('lessorLicenseNo', e.target.value)}
        />
      </FormGroup>
    </FormGrid>
  </div>
);
