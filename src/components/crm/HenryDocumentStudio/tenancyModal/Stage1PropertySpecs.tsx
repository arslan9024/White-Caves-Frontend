import React, { FC } from 'react';
import { Sparkles, UploadCloud } from 'lucide-react';
import {
  HeaderBtn,
  FormGroup,
  InputField,
  SelectField,
  FormGrid,
  OcrDropzone,
} from '../styles/HenryTenancyContractModal.style';
import type { DldTenancyContractData, FieldChangeHandler } from './types';

export interface Stage1PropertySpecsProps {
  contractData: DldTenancyContractData;
  isProcessingOcr: boolean;
  onFieldChange: FieldChangeHandler;
  onTriggerDeedUpload: () => void;
  onScanTitleDeed: () => void;
}

export const Stage1PropertySpecs: FC<Stage1PropertySpecsProps> = ({
  contractData,
  isProcessingOcr,
  onFieldChange,
  onTriggerDeedUpload,
  onScanTitleDeed,
}) => (
  <div>
    <OcrDropzone onClick={onTriggerDeedUpload}>
      <UploadCloud
        size={28}
        color="var(--accent-red, #EF4444)"
        style={{ margin: '0 auto 8px auto' }}
      />
      <div className="dropzone-title">Upload & Review Title Deed</div>
      <div className="dropzone-desc">
        Review labelled property, area and owner candidates in the title deed scanner first. Missing
        fields remain blank. Makani and DEWA require manual entry; Oqood registration is not
        supported.
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
        <HeaderBtn
          $variant="primary"
          onClick={e => {
            e.stopPropagation();
            onTriggerDeedUpload();
          }}
          disabled={isProcessingOcr}
        >
          <UploadCloud size={14} /> Browse Title Deed File
        </HeaderBtn>
        <HeaderBtn
          $variant="secondary"
          onClick={e => {
            e.stopPropagation();
            onScanTitleDeed();
          }}
          disabled={isProcessingOcr}
        >
          <Sparkles size={14} /> 1-Click Sample Ingestion
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
      Stage 1: Property Specifications (معلومات العقار)
    </h4>

    <FormGrid $cols={3}>
      <FormGroup>
        <label>
          Building / Tower Name <span className="label-arabic">(اسم المبنى)</span>
        </label>
        <InputField
          type="text"
          value={contractData.buildingName}
          placeholder="e.g. CAMELIA / Janusia"
          onChange={e => onFieldChange('buildingName', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Unit / Property No. <span className="label-arabic">(رقم العقار)</span>
        </label>
        <InputField
          type="text"
          value={contractData.propertyNo}
          placeholder="e.g. 608 / XH2858B"
          onChange={e => onFieldChange('propertyNo', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Plot Number <span className="label-arabic">(رقم الأرض)</span>
        </label>
        <InputField
          type="text"
          value={contractData.plotNo}
          placeholder="e.g. 176 / 6340"
          onChange={e => onFieldChange('plotNo', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={3}>
      <FormGroup>
        <label>
          Property Usage <span className="label-arabic">(استخدام العقار)</span>
        </label>
        <SelectField
          value={contractData.propertyUsage}
          onChange={e =>
            onFieldChange(
              'propertyUsage',
              e.target.value as DldTenancyContractData['propertyUsage']
            )
          }
        >
          <option value="residential">Residential (سكني)</option>
          <option value="commercial">Commercial (تجاري)</option>
          <option value="industrial">Industrial (صناعي)</option>
        </SelectField>
      </FormGroup>
      <FormGroup>
        <label>
          Property Type <span className="label-arabic">(نوع الوحدة)</span>
        </label>
        <InputField
          type="text"
          value={contractData.propertyType}
          placeholder="e.g. 3 Bedroom Townhouse"
          onChange={e => onFieldChange('propertyType', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Area Sq.M <span className="label-arabic">(مساحة العقار متر مربع)</span>
        </label>
        <InputField
          type="number"
          value={contractData.propertyAreaSqM || ''}
          placeholder="e.g. 198.50"
          onChange={e => onFieldChange('propertyAreaSqM', parseFloat(e.target.value) || 0)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={3}>
      <FormGroup>
        <label>
          Makani Number <span className="label-arabic">(رقم مكاني)</span>
        </label>
        <InputField
          type="text"
          value={contractData.makaniNo}
          placeholder="e.g. 257"
          onChange={e => onFieldChange('makaniNo', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Premises No. DEWA <span className="label-arabic">(رقم المبنى ديوا)</span>
        </label>
        <InputField
          type="text"
          value={contractData.premisesNoDewa}
          placeholder="e.g. 918014964"
          onChange={e => onFieldChange('premisesNoDewa', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Location / Community <span className="label-arabic">(الموقع)</span>
        </label>
        <InputField
          type="text"
          value={contractData.location}
          placeholder="e.g. DAMAC Hills 2, Dubai"
          onChange={e => onFieldChange('location', e.target.value)}
        />
      </FormGroup>
    </FormGrid>
  </div>
);
