import React, { FC } from 'react';
import { Home, Building, UserCheck, CreditCard, FileText, ShieldCheck } from 'lucide-react';
import { StepperHeader, StepTabBtn } from '../styles/HenryTenancyContractModal.style';
import type { DldTenancyContractData } from './types';

export interface TenancyStepperHeaderProps {
  activeStep: number;
  contractData: DldTenancyContractData;
  onSelectStep: (step: number) => void;
}

export const TenancyStepperHeader: FC<TenancyStepperHeaderProps> = ({
  activeStep,
  contractData,
  onSelectStep,
}) => (
  <StepperHeader>
    <StepTabBtn
      $active={activeStep === 1}
      $completed={Boolean(contractData.buildingName && contractData.propertyNo)}
      onClick={() => onSelectStep(1)}
    >
      <Home size={14} /> 1. Title Deed & Unit
    </StepTabBtn>
    <StepTabBtn
      $active={activeStep === 2}
      $completed={Boolean(contractData.ownerName)}
      onClick={() => onSelectStep(2)}
    >
      <Building size={14} /> 2. Landlord KYC
    </StepTabBtn>
    <StepTabBtn
      $active={activeStep === 3}
      $completed={Boolean(contractData.tenantName)}
      onClick={() => onSelectStep(3)}
    >
      <UserCheck size={14} /> 3. Tenant Docs
    </StepTabBtn>
    <StepTabBtn
      $active={activeStep === 4}
      $completed={Boolean(contractData.annualRent > 0)}
      onClick={() => onSelectStep(4)}
    >
      <CreditCard size={14} /> 4. Financials
    </StepTabBtn>
    <StepTabBtn
      $active={activeStep === 5}
      $completed={Boolean(contractData.additionalTerms?.length > 0)}
      onClick={() => onSelectStep(5)}
    >
      <FileText size={14} /> 5. Special Terms
    </StepTabBtn>
    <StepTabBtn
      $active={activeStep === 6}
      $completed={contractData.status === 'ready_for_signature'}
      onClick={() => onSelectStep(6)}
    >
      <ShieldCheck size={14} /> 6. Review & Export
    </StepTabBtn>
  </StepperHeader>
);
