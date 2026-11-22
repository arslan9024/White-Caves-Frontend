import React, { FC } from 'react';
import type { DldTitleDeedExtractedData } from '../../../../services/HenryTitleDeedScannerService';
import { FormCard, FormGrid, FormGroup } from './TitleDeedScanner.styles';

interface TitleDeedExtractedFormProps {
  extractedData: DldTitleDeedExtractedData;
  onUpdateField: (
    field: keyof DldTitleDeedExtractedData,
    val: DldTitleDeedExtractedData[keyof DldTitleDeedExtractedData]
  ) => void;
}

export const TitleDeedExtractedForm: FC<TitleDeedExtractedFormProps> = ({
  extractedData,
  onUpdateField,
}) => {
  return (
    <FormCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4
          style={{
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: 800,
            color: 'var(--color-0f172a, #0F172A)',
          }}
        >
          Extracted Title Deed Variables Form
        </h4>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--accent-green, #059669)',
            fontWeight: 800,
          }}
        >
          Unverified extraction — source review required
        </span>
      </div>

      <FormGrid $cols={3}>
        <FormGroup>
          <label>
            Building Name <span className="ar">اسم المبنى</span>
          </label>
          <input
            type="text"
            value={extractedData.buildingNameEn}
            onChange={e => onUpdateField('buildingNameEn', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Unit No. <span className="ar">رقم العقار</span>
          </label>
          <input
            type="text"
            value={extractedData.propertyNumber}
            style={{ fontWeight: 800, color: 'var(--accent-red, #EF4444)' }}
            onChange={e => onUpdateField('propertyNumber', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Plot No. <span className="ar">رقم الأرض</span>
          </label>
          <input
            type="text"
            value={extractedData.plotNumber}
            onChange={e => onUpdateField('plotNumber', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <FormGrid $cols={3}>
        <FormGroup>
          <label>
            Total Area (Sq.M) <span className="ar">المساحة متر مربع</span>
          </label>
          <input
            type="number"
            value={extractedData.totalAreaSqM}
            onChange={e => {
              const val = parseFloat(e.target.value) || 0;
              onUpdateField('totalAreaSqM', val);
              onUpdateField('totalAreaSqFt', parseFloat((val * 10.7639).toFixed(2)));
            }}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Area (Sq.Ft) <span className="ar">المساحة قدم</span>
          </label>
          <input
            type="number"
            value={extractedData.totalAreaSqFt}
            onChange={e => onUpdateField('totalAreaSqFt', parseFloat(e.target.value) || 0)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Floor No. <span className="ar">الطابق</span>
          </label>
          <input
            type="text"
            value={extractedData.floorNumber}
            onChange={e => onUpdateField('floorNumber', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <FormGrid $cols={2}>
        <FormGroup>
          <label>
            Owner Name (EN) <span className="ar">اسم المالك</span>
          </label>
          <input
            type="text"
            value={extractedData.ownerNameEn}
            style={{ fontWeight: 700 }}
            onChange={e => onUpdateField('ownerNameEn', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Owner Name (AR) <span className="ar">اسم المالك بالعربية</span>
          </label>
          <input
            type="text"
            value={extractedData.ownerNameAr || ''}
            onChange={e => onUpdateField('ownerNameAr', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <FormGrid $cols={2}>
        <FormGroup>
          <label>
            Certificate No. <span className="ar">رقم السند</span>
          </label>
          <input
            type="text"
            value={extractedData.certificateNumber}
            style={{ fontFamily: 'monospace' }}
            onChange={e => onUpdateField('certificateNumber', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Location / Community <span className="ar">الموقع</span>
          </label>
          <input
            type="text"
            value={extractedData.communityEn}
            onChange={e => onUpdateField('communityEn', e.target.value)}
          />
        </FormGroup>
      </FormGrid>
    </FormCard>
  );
};
