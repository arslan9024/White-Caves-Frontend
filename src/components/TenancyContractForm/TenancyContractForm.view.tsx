/**
 * Tenancy Contract Form — View Layer (Mary Allen Wilkes Architecture)
 * Unified Step Orchestrator for Property, Landlord, Tenant, Terms, and PDF Generator
 * Strictly < 350 lines
 */

import React from 'react';
import PropertyInfoForm from '../TenancyForms/PropertyInfoForm';
import LandlordForm from '../TenancyForms/LandlordForm';
import TenantForm from '../TenancyForms/TenantForm';
import ContactDetailsForm from '../TenancyForms/ContactDetailsForm';
import TenancyTermsForm from '../TenancyForms/TenancyTermsForm';
import type { TenancyContractFormProps } from './TenancyContractForm.types';
import { useTenancyContractFormLogic } from './TenancyContractForm.logic';
import {
  ContractHeaderPanel,
  ContractStepperPanel,
  ReviewStepPanel,
} from './TenancyContractForm.panels';
import '../TenancyContractForm.css';

const STEPS = [
  { number: 1, title: 'Property Information' },
  { number: 2, title: 'Landlord Information' },
  { number: 3, title: 'Tenant Information' },
  { number: 4, title: 'Contact Details' },
  { number: 5, title: 'Tenancy Terms' },
  { number: 6, title: 'Review & Generate' },
];

export const TenancyContractForm: React.FC<TenancyContractFormProps> = props => {
  const {
    currentStep,
    setCurrentStep,
    loading,
    error,
    statusMessage,
    contractId,
    agreements,
    formData,
    updateFormSection,
    handleNext,
    handlePrevious,
    handleSaveDraft,
    handleGeneratePDF,
  } = useTenancyContractFormLogic(props);

  return (
    <div className="tenancy-form-container">
      <ContractHeaderPanel
        contractId={contractId}
        error={error}
        statusMessage={statusMessage}
        agreements={agreements}
      />

      <ContractStepperPanel
        currentStep={currentStep}
        steps={STEPS}
        setCurrentStep={setCurrentStep}
      />

      <div className="form-content">
        {currentStep === 1 && (
          <PropertyInfoForm
            data={formData.propertyInfo}
            onChange={data => updateFormSection('propertyInfo', data)}
          />
        )}

        {currentStep === 2 && (
          <LandlordForm
            data={formData.landlordInfo}
            onChange={data => updateFormSection('landlordInfo', data)}
          />
        )}

        {currentStep === 3 && (
          <TenantForm
            data={formData.tenantInfo}
            onChange={data => updateFormSection('tenantInfo', data)}
          />
        )}

        {currentStep === 4 && (
          <ContactDetailsForm
            data={formData.contactDetails}
            onChange={data => updateFormSection('contactDetails', data)}
          />
        )}

        {currentStep === 5 && (
          <TenancyTermsForm
            data={formData.tenancyTerms}
            onChange={data => updateFormSection('tenancyTerms', data)}
          />
        )}

        {currentStep === 6 && <ReviewStepPanel formData={formData} />}
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentStep === 1}>
          ← Previous
        </button>

        <button className="btn btn-primary" onClick={handleSaveDraft} disabled={loading}>
          {loading ? 'Saving...' : 'Save Draft'}
        </button>

        {currentStep < 6 ? (
          <button className="btn btn-primary" onClick={handleNext} disabled={loading}>
            Next →
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={handleGeneratePDF}
            disabled={loading || !contractId}
          >
            {loading ? 'Generating...' : '📄 Generate PDF'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TenancyContractForm;
