import React from 'react';
import '../ContractBuilder.css';
import { ContractBuilderProps } from './ContractBuilder.types';
import { useContractBuilder } from './ContractBuilder.logic';
import {
  TemplateSelectPanel,
  ContractFormPanel,
  ContractReviewPanel,
} from './ContractBuilder.panels';

export const ContractBuilderView: React.FC<ContractBuilderProps> = ({
  onContractCreated,
  partyData,
}) => {
  const {
    templates,
    selectedTemplate,
    formData,
    preview,
    loading,
    error,
    step,
    setStep,
    handleSelectTemplate,
    handleInputChange,
    handlePreview,
    handleCreateContract,
  } = useContractBuilder(onContractCreated, partyData);

  return (
    <div className="contract-builder">
      <div className="builder-container">
        <h2>Create Contract from Template</h2>

        {error && <div className="alert alert-error">{error}</div>}

        {step === 'select' && (
          <TemplateSelectPanel templates={templates} onSelect={handleSelectTemplate} />
        )}

        {step === 'fill' && selectedTemplate && (
          <ContractFormPanel
            template={selectedTemplate}
            formData={formData}
            onChange={handleInputChange}
            onBack={() => setStep('select')}
            onPreview={handlePreview}
            loading={loading}
          />
        )}

        {step === 'review' && preview && (
          <ContractReviewPanel
            preview={preview}
            onBack={() => setStep('fill')}
            onCreate={handleCreateContract}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

