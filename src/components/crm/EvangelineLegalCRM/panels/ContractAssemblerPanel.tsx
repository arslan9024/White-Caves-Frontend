import React from 'react';
import type { DldFormType } from '../EvangelineLegalCRM.types';
import { ContractParametersForm } from './ContractParametersForm';
import { ContractPreview } from './ContractPreview';

export interface ContractAssemblerPanelProps {
  selectedForm: DldFormType;
  setSelectedForm: (form: DldFormType) => void;
  partyA: string;
  setPartyA: (val: string) => void;
  partyB: string;
  setPartyB: (val: string) => void;
  propertyRef: string;
  setPropertyRef: (val: string) => void;
  includeMortgageClause: boolean;
  setIncludeMortgageClause: (val: boolean) => void;
  includeDldFeeClause: boolean;
  setIncludeDldFeeClause: (val: boolean) => void;
  copiedContract: boolean;
  compiledContractText: string;
  onCopyContract: () => void;
}

export const ContractAssemblerPanel: React.FC<ContractAssemblerPanelProps> = ({
  selectedForm,
  setSelectedForm,
  partyA,
  setPartyA,
  partyB,
  setPartyB,
  propertyRef,
  setPropertyRef,
  includeMortgageClause,
  setIncludeMortgageClause,
  includeDldFeeClause,
  setIncludeDldFeeClause,
  copiedContract,
  compiledContractText,
  onCopyContract,
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.25rem' }}>
    <ContractParametersForm
      selectedForm={selectedForm}
      setSelectedForm={setSelectedForm}
      partyA={partyA}
      setPartyA={setPartyA}
      partyB={partyB}
      setPartyB={setPartyB}
      propertyRef={propertyRef}
      setPropertyRef={setPropertyRef}
      includeMortgageClause={includeMortgageClause}
      setIncludeMortgageClause={setIncludeMortgageClause}
      includeDldFeeClause={includeDldFeeClause}
      setIncludeDldFeeClause={setIncludeDldFeeClause}
    />
    <ContractPreview
      copiedContract={copiedContract}
      compiledContractText={compiledContractText}
      onCopyContract={onCopyContract}
    />
  </div>
);
