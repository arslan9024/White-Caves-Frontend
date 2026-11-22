import React, { FC } from 'react';
import type { InternationalPassportExtractedData } from '../../../../services/HenryPassportScannerService';
import { assessScanReadiness, scanExpiry } from '../../../../services/henryScanReview';
import { HenryExtractionEvidence } from '../HenryExtractionEvidence';
import { FormCard, FormGrid, FormGroup, MrzBox } from './styles';

interface PassportVariablesFormProps {
  extractedData: InternationalPassportExtractedData;
  onUpdateField: (
    field: keyof InternationalPassportExtractedData,
    val: InternationalPassportExtractedData[keyof InternationalPassportExtractedData]
  ) => void;
  onToggleExpiryAck: (checked: boolean) => void;
  onToggleReviewConfirmed: (checked: boolean) => void;
}

const ADDITIONAL_FIELDS = [
  'surname',
  'givenNames',
  'issuingCountry',
  'nationalityCode',
  'dateOfIssue',
  'passportType',
  'placeOfBirth',
  'fatherName',
  'bookletNumber',
  'trackingNumber',
] as const;

export const PassportVariablesForm: FC<PassportVariablesFormProps> = ({
  extractedData,
  onUpdateField,
  onToggleExpiryAck,
  onToggleReviewConfirmed,
}) => (
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
        Extracted Passport Variables Form
      </h4>
      <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue, #2563EB)', fontWeight: 800 }}>
        Source review required — not authenticity verification
      </span>
    </div>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Full Legal Name <span className="ar">الاسم بالكامل</span>
        </label>
        <input
          type="text"
          value={extractedData.fullName}
          onChange={e => onUpdateField('fullName', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Passport Number <span className="ar">رقم الجواز</span>
        </label>
        <input
          type="text"
          value={extractedData.passportNumber}
          style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--accent-blue, #2563EB)' }}
          onChange={e => onUpdateField('passportNumber', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={3}>
      <FormGroup>
        <label>
          Country Code <span className="ar">رمز الدولة</span>
        </label>
        <input
          type="text"
          value={extractedData.issuingCountryCode}
          onChange={e => onUpdateField('issuingCountryCode', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Nationality <span className="ar">الجنسية</span>
        </label>
        <input
          type="text"
          value={extractedData.nationality}
          onChange={e => onUpdateField('nationality', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Gender <span className="ar">الجنس</span>
        </label>
        <select
          value={extractedData.gender}
          onChange={e =>
            onUpdateField('gender', e.target.value as InternationalPassportExtractedData['gender'])
          }
        >
          <option value="">Unknown / not visible</option>
          <option value="M">Male (ذكر)</option>
          <option value="F">Female (أنثى)</option>
        </select>
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Date of Birth <span className="ar">تاريخ الميلاد</span>
        </label>
        <input
          type="text"
          value={extractedData.dateOfBirth}
          onChange={e => onUpdateField('dateOfBirth', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Date of Expiry <span className="ar">تاريخ الانتهاء</span>
        </label>
        <input
          type="text"
          value={extractedData.dateOfExpiry}
          onChange={e => onUpdateField('dateOfExpiry', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Issuing Authority <span className="ar">جهة الإصدار</span>
        </label>
        <input
          type="text"
          value={extractedData.issuingAuthority}
          onChange={e => onUpdateField('issuingAuthority', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          National ID No. <span className="ar">الرقم القومي</span>
        </label>
        <input
          type="text"
          value={extractedData.nationalIdentityNumber}
          onChange={e => onUpdateField('nationalIdentityNumber', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <details>
      <summary>Additional source corrections</summary>
      {ADDITIONAL_FIELDS.map(key => (
        <label key={key} style={{ display: 'block' }}>
          {key}
          <input
            aria-label={key}
            value={extractedData[key]}
            onChange={e => onUpdateField(key, e.target.value)}
          />
        </label>
      ))}
    </details>
    <HenryExtractionEvidence diagnostics={extractedData.diagnostics} />
    {extractedData.demoOnly ? (
      <p role="alert">Demo only — cannot save or autofill.</p>
    ) : (
      <>
        <p role="status">{assessScanReadiness(extractedData).reasons.join(' ')}</p>
        {scanExpiry(extractedData.dateOfExpiry).isExpired && (
          <label>
            <input
              type="checkbox"
              checked={extractedData.expiryAcknowledgedFor === extractedData.dateOfExpiry}
              onChange={e => onToggleExpiryAck(e.target.checked)}
            />
            I acknowledge this passport is expired and is not current identification.
          </label>
        )}
        <label>
          <input
            type="checkbox"
            checked={extractedData.reviewConfirmed === true}
            onChange={e => onToggleReviewConfirmed(e.target.checked)}
          />
          I reviewed all extracted values against the original passport.
        </label>
      </>
    )}
    {extractedData.mrz && (
      <div>
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--text-secondary, #64748B)',
            marginBottom: '4px',
          }}
        >
          RAW MACHINE READABLE ZONE (MRZ TD3 - 2 LINES):
        </div>
        <MrzBox>{`${extractedData.mrz.line1}\n${extractedData.mrz.line2}`}</MrzBox>
      </div>
    )}
  </FormCard>
);
