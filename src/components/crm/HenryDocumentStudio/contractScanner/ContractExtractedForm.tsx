import React, { FC } from 'react';
import { FormCard, FormGrid, FormGroup } from './ContractScanner.styles';
import { DldScannedContractResult } from '../../../../services/HenryTenancyContractScannerService';
import { DldTenancyContractData } from '../../../../services/HenryTenancyContractTemplateService';
import { assessScanReadiness, canUseScan } from '../../../../services/henryScanReview';
import henryTenancyContractScannerService from '../../../../services/HenryTenancyContractScannerService';
import { HenryExtractionEvidence } from '../HenryExtractionEvidence';

export interface ContractExtractedFormProps {
  contractData: DldTenancyContractData;
  scannedResult: DldScannedContractResult | null;
  onUpdateField: (field: keyof DldTenancyContractData, val: string | number) => void;
  onCorrection: (path: string, value: string | number) => void;
  onScannedResultChange: (updated: DldScannedContractResult) => void;
}

export const ContractExtractedForm: FC<ContractExtractedFormProps> = ({
  contractData,
  scannedResult,
  onUpdateField,
  onCorrection,
  onScannedResultChange,
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
          Extracted Agreement Variables Form
        </h4>
        <span
          style={{ fontSize: '0.75rem', color: 'var(--accent-green, #059669)', fontWeight: 800 }}
        >
          Source review required — not authenticity verification
        </span>
      </div>

      <h5
        style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.8rem',
          fontWeight: 800,
          color: 'var(--accent-red, #EF4444)',
        }}
      >
        1. Property Specifications
      </h5>
      <FormGrid $cols={3}>
        <FormGroup>
          <label>
            Building <span className="ar">المبنى</span>
          </label>
          <input
            type="text"
            value={contractData.buildingName}
            onChange={e => onUpdateField('buildingName', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Unit No. <span className="ar">رقم العقار</span>
          </label>
          <input
            type="text"
            value={contractData.propertyNo}
            style={{ fontWeight: 800, color: 'var(--accent-red, #EF4444)' }}
            onChange={e => onUpdateField('propertyNo', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Plot No. <span className="ar">رقم الأرض</span>
          </label>
          <input
            type="text"
            value={contractData.plotNo}
            onChange={e => onUpdateField('plotNo', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <h5
        style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.8rem',
          fontWeight: 800,
          color: 'var(--accent-blue, #3B82F6)',
        }}
      >
        2. Landlord & Tenant Parties
      </h5>
      <FormGrid $cols={2}>
        <FormGroup>
          <label>
            Owner / Lessor <span className="ar">اسم المؤجر</span>
          </label>
          <input
            type="text"
            value={contractData.ownerName}
            onChange={e => onUpdateField('ownerName', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Tenant Name <span className="ar">اسم المستأجر</span>
          </label>
          <input
            type="text"
            value={contractData.tenantName}
            style={{ fontWeight: 700 }}
            onChange={e => onUpdateField('tenantName', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      <h5
        style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.8rem',
          fontWeight: 800,
          color: 'var(--accent-green, #10B981)',
        }}
      >
        3. Financial Schedules & Dates
      </h5>
      <FormGrid $cols={3}>
        <FormGroup>
          <label>
            Annual Rent (AED) <span className="ar">الإيجار</span>
          </label>
          <input
            type="number"
            value={contractData.annualRent || ''}
            style={{ fontWeight: 800, color: 'var(--accent-green, #059669)' }}
            onChange={e => onUpdateField('annualRent', parseFloat(e.target.value) || 0)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Period From <span className="ar">من</span>
          </label>
          <input
            type="text"
            value={contractData.contractPeriodFrom}
            onChange={e => onUpdateField('contractPeriodFrom', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            Period To <span className="ar">إلى</span>
          </label>
          <input
            type="text"
            value={contractData.contractPeriodTo}
            onChange={e => onUpdateField('contractPeriodTo', e.target.value)}
          />
        </FormGroup>
      </FormGrid>

      {scannedResult && (
        <>
          <label>
            Source contract reference
            <input
              aria-label="Source contract reference"
              value={scannedResult.contractReference || ''}
              onChange={e => onCorrection('contractReference', e.target.value)}
            />
          </label>
          <p>
            Use the reference printed on the agreement. If none is present, leave blank: archival
            requires a source reference; no reference is invented.
          </p>
          <details>
            <summary>Additional source corrections</summary>
            {Object.entries(scannedResult.diagnostics?.fields || {})
              .filter(
                ([key]) =>
                  ![
                    'landlord.name',
                    'tenant.name',
                    'property.buildingName',
                    'property.propertyNumber',
                    'property.plotNumber',
                    'financials.periodFrom',
                    'financials.periodTo',
                    'financials.annualRentAed',
                    'contractReference',
                  ].includes(key)
              )
              .map(([path, evidence]) => {
                const [group, key] = path.split('.');
                const fields =
                  group === 'landlord' ||
                  group === 'tenant' ||
                  group === 'property' ||
                  group === 'financials'
                    ? scannedResult[group]
                    : null;
                const value =
                  fields && key
                    ? (fields as unknown as Record<string, unknown>)[key]
                    : path === 'contractDate'
                      ? scannedResult.contractDate
                      : path === 'additionalTerms'
                        ? scannedResult.additionalTerms.join('; ')
                        : evidence.values[0] || '';
                return (
                  <label key={path} style={{ display: 'block' }}>
                    {path}
                    <input
                      aria-label={path}
                      value={String(value ?? '')}
                      onChange={e =>
                        onCorrection(
                          path,
                          typeof value === 'number' ? Number(e.target.value) : e.target.value
                        )
                      }
                    />
                  </label>
                );
              })}
          </details>

          <HenryExtractionEvidence diagnostics={scannedResult.diagnostics} />

          {scannedResult.demoOnly ? (
            <p role="alert">Demo only — cannot save or autofill.</p>
          ) : (
            <>
              <p role="status">{assessScanReadiness(scannedResult).reasons.join(' ')}</p>
              <label>
                <input
                  type="checkbox"
                  checked={scannedResult.reviewConfirmed === true}
                  onChange={e => {
                    const reviewed = { ...scannedResult, reviewConfirmed: e.target.checked };
                    onScannedResultChange(reviewed);
                    henryTenancyContractScannerService.clearCachedContract();
                    if (canUseScan(reviewed)) {
                      henryTenancyContractScannerService.setCachedContract(reviewed);
                    }
                  }}
                />
                I reviewed all extracted values against the original agreement.
              </label>
            </>
          )}
        </>
      )}
    </FormCard>
  );
};
