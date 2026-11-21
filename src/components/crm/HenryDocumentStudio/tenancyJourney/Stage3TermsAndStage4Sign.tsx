import React, { type FC } from 'react';
import { Printer, Save, Trash2 } from 'lucide-react';
import type { DldTenancyContractData } from '../../../../services/HenryTenancyContractTemplateService';
import {
  BottomActionBar,
  FormCard,
  FormGrid,
  FormGroup,
  PrimaryBtn,
} from './TenancyJourney.styles';

const CHEQUE_OPTIONS = [
  { count: 1, label: '1 Cheque (Annual)' },
  { count: 2, label: '2 Cheques (Semi-Annual)' },
  { count: 4, label: '4 Cheques (Quarterly)' },
  { count: 6, label: '6 Cheques (Bi-Monthly)' },
];

interface Stage3TermsProps {
  contractData: DldTenancyContractData;
  updateField: <K extends keyof DldTenancyContractData>(
    field: K,
    value: DldTenancyContractData[K]
  ) => void;
  onUpdateAdditionalTerm: (index: number, val: string) => void;
  onStatusMessage: (msg: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const Stage3TermsForm: FC<Stage3TermsProps> = ({
  contractData,
  updateField,
  onUpdateAdditionalTerm,
  onStatusMessage,
  onBack,
  onNext,
}) => (
  <FormCard>
    <h4
      style={{
        margin: 0,
        fontSize: '0.95rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Stage 3: Lease Financials & Contract Period
    </h4>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Contract Period From <span className="ar">(من)</span>
        </label>
        <input
          type="text"
          value={contractData.contractPeriodFrom}
          onChange={e => updateField('contractPeriodFrom', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Contract Period To <span className="ar">(إلى)</span>
        </label>
        <input
          type="text"
          value={contractData.contractPeriodTo}
          onChange={e => updateField('contractPeriodTo', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={3}>
      <FormGroup>
        <label>
          Annual Rent (AED) <span className="ar">(الإيجار السنوي)</span>
        </label>
        <input
          type="number"
          value={contractData.annualRent || ''}
          onChange={e => {
            const val = parseFloat(e.target.value) || 0;
            updateField('annualRent', val);
            updateField('contractValue', val);
            updateField('securityDepositAmount', Math.round(val * 0.05));
          }}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Contract Value (AED) <span className="ar">(قيمة العقد)</span>
        </label>
        <input
          type="number"
          value={contractData.contractValue || contractData.annualRent || ''}
          onChange={e => updateField('contractValue', parseFloat(e.target.value) || 0)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Security Deposit (AED) <span className="ar">(التأمين)</span>
        </label>
        <input
          type="number"
          value={contractData.securityDepositAmount || ''}
          onChange={e => updateField('securityDepositAmount', parseFloat(e.target.value) || 0)}
        />
      </FormGroup>
    </FormGrid>

    <FormGroup>
      <label>
        Mode of Payment <span className="ar">(طريقة الدفع)</span>
      </label>
      <input
        type="text"
        value={contractData.modeOfPayment}
        placeholder="e.g. 4 CHEQUES (PDC)"
        onChange={e => updateField('modeOfPayment', e.target.value)}
      />
      <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
        {CHEQUE_OPTIONS.map(option => (
          <button
            key={option.count}
            type="button"
            onClick={() => {
              const rent = contractData.annualRent || 0;
              const perCheque = option.count > 0 ? Math.round(rent / option.count) : rent;
              updateField(
                'modeOfPayment',
                `${option.count} CHEQUES (AED ${perCheque.toLocaleString()} each)`
              );
              onStatusMessage(
                `✓ Calculated payment mode: ${option.count} cheques of AED ${perCheque.toLocaleString()}`
              );
            }}
            style={{
              background: contractData.modeOfPayment?.includes(`${option.count} CHEQUE`)
                ? '#EF4444'
                : '#F1F5F9',
              color: contractData.modeOfPayment?.includes(`${option.count} CHEQUE`)
                ? '#FFFFFF'
                : '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '4px',
              padding: '3px 8px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </FormGroup>

    <h5
      style={{
        margin: '1rem 0 0.5rem 0',
        fontSize: '0.85rem',
        fontWeight: 800,
        color: 'var(--color-475569, #475569)',
      }}
    >
      Page 3: Additional Terms (شروط إضافية)
    </h5>
    {[0, 1, 2, 3, 4].map(idx => (
      <FormGroup key={idx}>
        <label style={{ fontSize: '0.72rem' }}>Clause {idx + 1}</label>
        <input
          type="text"
          value={contractData.additionalTerms?.[idx] || ''}
          placeholder={`Special condition ${idx + 1}...`}
          onChange={e => onUpdateAdditionalTerm(idx, e.target.value)}
        />
      </FormGroup>
    ))}

    <BottomActionBar>
      <PrimaryBtn $variant="secondary" onClick={onBack}>
        ← Back to Tenant
      </PrimaryBtn>
      <PrimaryBtn $variant="primary" onClick={onNext}>
        Next: Signatures & Export →
      </PrimaryBtn>
    </BottomActionBar>
  </FormCard>
);

interface Stage4SignaturesProps {
  contractData: DldTenancyContractData;
  updateField: <K extends keyof DldTenancyContractData>(
    field: K,
    value: DldTenancyContractData[K]
  ) => void;
  onPrintPdf: () => void;
  onSaveForSession: () => void;
  onDiscardDraft: () => void;
  onBack: () => void;
}

export const Stage4SignaturesForm: FC<Stage4SignaturesProps> = ({
  contractData,
  updateField,
  onPrintPdf,
  onSaveForSession,
  onDiscardDraft,
  onBack,
}) => (
  <FormCard>
    <h4
      style={{
        margin: 0,
        fontSize: '0.95rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Stage 4: Endorsement Signatures & Session Draft
    </h4>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Tenant Signature Name <span className="ar">(توقيع المستأجر)</span>
        </label>
        <input
          type="text"
          value={contractData.tenantSignature || ''}
          placeholder="Type name for digital signature"
          onChange={e => {
            updateField('tenantSignature', e.target.value);
            updateField('tenantSignatureDate', new Date().toLocaleDateString('en-GB'));
          }}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Lessor Signature Name <span className="ar">(توقيع المؤجر)</span>
        </label>
        <input
          type="text"
          value={contractData.lessorSignature || ''}
          placeholder="Type name for digital signature"
          onChange={e => {
            updateField('lessorSignature', e.target.value);
            updateField('lessorSignatureDate', new Date().toLocaleDateString('en-GB'));
          }}
        />
      </FormGroup>
    </FormGrid>

    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
      <PrimaryBtn $variant="secondary" onClick={onPrintPdf} style={{ flex: 1 }}>
        <Printer size={14} /> Print / Save PDF
      </PrimaryBtn>
      <PrimaryBtn $variant="primary" onClick={onSaveForSession} style={{ flex: 1 }}>
        <Save size={14} /> Keep for this session only
      </PrimaryBtn>
    </div>

    <BottomActionBar>
      <PrimaryBtn $variant="danger" onClick={onDiscardDraft}>
        <Trash2 size={13} /> Discard & Reset
      </PrimaryBtn>
      <PrimaryBtn $variant="secondary" onClick={onBack}>
        ← Back to Terms
      </PrimaryBtn>
    </BottomActionBar>
  </FormCard>
);
