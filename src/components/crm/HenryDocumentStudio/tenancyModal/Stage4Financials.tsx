import React, { FC } from 'react';
import {
  HeaderBtn,
  FormGroup,
  InputField,
  FormGrid,
} from '../styles/HenryTenancyContractModal.style';
import type { DldTenancyContractData, FieldChangeHandler } from './types';

export interface Stage4FinancialsProps {
  contractData: DldTenancyContractData;
  onFieldChange: FieldChangeHandler;
  onSetStandardOneYearDates: () => void;
}

export const Stage4Financials: FC<Stage4FinancialsProps> = ({
  contractData,
  onFieldChange,
  onSetStandardOneYearDates,
}) => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <h4
        style={{
          margin: 0,
          color: 'var(--accent-green, #10B981)',
          fontSize: '0.95rem',
          fontWeight: 800,
        }}
      >
        Stage 4: Contract Period & Financial Schedules (معلومات العقد والمالية)
      </h4>
      <HeaderBtn
        $variant="secondary"
        onClick={onSetStandardOneYearDates}
        style={{ fontSize: '0.75rem' }}
      >
        ⚡ Set 1-Year Standard Lease
      </HeaderBtn>
    </div>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Contract Period From <span className="label-arabic">(فترة العقد من)</span>
        </label>
        <InputField
          type="text"
          value={contractData.contractPeriodFrom}
          placeholder="01-09-2026"
          onChange={e => onFieldChange('contractPeriodFrom', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Contract Period To <span className="label-arabic">(فترة العقد إلى)</span>
        </label>
        <InputField
          type="text"
          value={contractData.contractPeriodTo}
          placeholder="31-08-2027"
          onChange={e => onFieldChange('contractPeriodTo', e.target.value)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={3}>
      <FormGroup>
        <label>
          Annual Rent (AED) <span className="label-arabic">(الايجار السنوي)</span>
        </label>
        <InputField
          type="number"
          value={contractData.annualRent || ''}
          placeholder="95000"
          onChange={e => {
            const val = parseFloat(e.target.value) || 0;
            onFieldChange('annualRent', val);
            onFieldChange('contractValue', val);
            onFieldChange('securityDepositAmount', Math.round(val * 0.05));
          }}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Contract Value (AED) <span className="label-arabic">(قيمة العقد)</span>
        </label>
        <InputField
          type="number"
          value={contractData.contractValue || contractData.annualRent || ''}
          placeholder="95000"
          onChange={e => onFieldChange('contractValue', parseFloat(e.target.value) || 0)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Security Deposit (AED) <span className="label-arabic">(مبلغ التأمين)</span>
        </label>
        <InputField
          type="number"
          value={contractData.securityDepositAmount || ''}
          placeholder="4750"
          onChange={e => onFieldChange('securityDepositAmount', parseFloat(e.target.value) || 0)}
        />
      </FormGroup>
    </FormGrid>

    <FormGrid $cols={2}>
      <FormGroup>
        <label>
          Mode of Payment <span className="label-arabic">(طريقة الدفع)</span>
        </label>
        <InputField
          type="text"
          value={contractData.modeOfPayment}
          placeholder="2 CHEQUES / 4 CHEQUES"
          onChange={e => onFieldChange('modeOfPayment', e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>
          Contract Reference ID <span className="label-arabic">(رقم العقد)</span>
        </label>
        <InputField
          type="text"
          value={contractData.contractId}
          readOnly
          style={{ opacity: 0.8, fontFamily: 'monospace' }}
        />
      </FormGroup>
    </FormGrid>
  </div>
);
