/**
 * Tenancy Contract Form — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Contract Header, Stepper, Agreements Summary, and Review Step
 * Strictly < 350 lines
 */

import React from 'react';
import type {
  TenancyFormData,
  TenancyAgreementSummary,
  StatusBannerMessage,
} from './TenancyContractForm.types';

export const ContractHeaderPanel: React.FC<{
  contractId: string | null;
  error: string | null;
  statusMessage: StatusBannerMessage | null;
  agreements: TenancyAgreementSummary[];
}> = ({ contractId, error, statusMessage, agreements }) => (
  <>
    <div className="form-header">
      <h1>Tenancy Contract Form</h1>
      {contractId && <div className="contract-id-badge">Contract ID: {contractId}</div>}
    </div>

    {agreements.length > 0 && (
      <div className="review-section" data-testid="tenancy-agreements-list">
        <h3>Recent Agreements</h3>
        <div className="review-grid">
          {agreements.slice(0, 5).map(agreement => (
            <div key={agreement.id}>
              <strong>{agreement.id}</strong>
              <div>
                {agreement.landlordName} → {agreement.tenantName}
              </div>
              <div>Status: {agreement.status}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {error && (
      <div className="error-message">
        <span>⚠️ {error}</span>
      </div>
    )}

    {statusMessage && (
      <div
        className={`status-message ${statusMessage.type === 'error' ? 'error-message' : 'success-message'}`}
        role={statusMessage.type === 'error' ? 'alert' : 'status'}
        data-testid="tenancy-contract-status-banner"
      >
        <span>{statusMessage.text}</span>
      </div>
    )}
  </>
);

export const ContractStepperPanel: React.FC<{
  currentStep: number;
  steps: Array<{ number: number; title: string }>;
  setCurrentStep: (step: number) => void;
}> = ({ currentStep, steps, setCurrentStep }) => (
  <div className="form-stepper">
    {steps.map(step => (
      <div
        key={step.number}
        className={`stepper-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
        onClick={() => setCurrentStep(step.number)}
      >
        <div className="step-number">{step.number}</div>
        <div className="step-title">{step.title}</div>
      </div>
    ))}
  </div>
);

export const ReviewStepPanel: React.FC<{ formData: TenancyFormData }> = ({ formData }) => (
  <div className="review-step">
    <h2>Review Contract Details</h2>

    <div className="review-section">
      <h3>📍 Property Information</h3>
      <div className="review-grid">
        <div>
          <strong>Description:</strong> {formData.propertyInfo.description}
        </div>
        <div>
          <strong>Address:</strong> {formData.propertyInfo.address}
        </div>
        <div>
          <strong>Emirate:</strong> {formData.propertyInfo.emirate}
        </div>
        <div>
          <strong>Type:</strong> {formData.propertyInfo.propertyType}
        </div>
        <div>
          <strong>Unit:</strong> {formData.propertyInfo.unitNumber}
        </div>
        <div>
          <strong>Area:</strong> {formData.propertyInfo.unitArea} sq ft
        </div>
      </div>
    </div>

    <div className="review-section">
      <h3>👤 Landlord Information</h3>
      <div className="review-grid">
        <div>
          <strong>Name:</strong> {formData.landlordInfo.name}
        </div>
        <div>
          <strong>Emirates ID:</strong> {formData.landlordInfo.emiratesId}
        </div>
        <div>
          <strong>Email:</strong> {formData.landlordInfo.email}
        </div>
        <div>
          <strong>Phone:</strong>{' '}
          {formData.landlordInfo.mobileNumber || formData.landlordInfo.phone}
        </div>
      </div>
    </div>

    <div className="review-section">
      <h3>👥 Tenant Information</h3>
      <div className="review-grid">
        <div>
          <strong>Name:</strong> {formData.tenantInfo.name}
        </div>
        <div>
          <strong>Emirates ID:</strong> {formData.tenantInfo.emiratesId}
        </div>
        <div>
          <strong>Email:</strong> {formData.tenantInfo.email}
        </div>
        <div>
          <strong>Phone:</strong> {formData.tenantInfo.mobileNumber || formData.tenantInfo.phone}
        </div>
      </div>
    </div>

    <div className="review-section">
      <h3>📝 Tenancy Terms</h3>
      <div className="review-grid">
        <div>
          <strong>Lease Period:</strong> {formData.tenancyTerms.leaseStartDate} to{' '}
          {formData.tenancyTerms.leaseEndDate}
        </div>
        <div>
          <strong>Annual Rent:</strong> {formData.tenancyTerms.rentAmount}{' '}
          {formData.tenancyTerms.rentCurrency}
        </div>
        <div>
          <strong>Security Deposit:</strong> {formData.tenancyTerms.securityDeposit} AED
        </div>
        <div>
          <strong>Payment Method:</strong> {formData.tenancyTerms.paymentMethod}
        </div>
      </div>
    </div>
  </div>
);

