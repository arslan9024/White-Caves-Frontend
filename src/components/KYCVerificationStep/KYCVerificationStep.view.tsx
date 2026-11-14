/**
 * KYC Verification Step — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating step modal, header, panels, and actions
 * Strictly < 350 lines
 */

import React from 'react';
import { ChevronRight, X, Loader2, AlertTriangle } from 'lucide-react';
import { useKycVerificationStepLogic } from './KYCVerificationStep.logic';
import {
  KycIntroPanel,
  KycPersonalPanel,
  KycDocumentsPanel,
  KycSuccessPanel,
} from './KYCVerificationStep.panels';
import { ROLES_REQUIRING_KYC } from './KYCVerificationStep.types';
import type { KYCVerificationStepProps } from './KYCVerificationStep.types';
import '../KYCVerificationStep.css';

export const KYCVerificationStep: React.FC<KYCVerificationStepProps> = ({
  user,
  token,
  role,
  onComplete,
  onSkip,
}) => {
  const {
    step,
    setStep,
    loading,
    documents,
    errors,
    formData,
    handleInputChange,
    handleFileChange,
    removeDocument,
    handleNext,
  } = useKycVerificationStepLogic({ user, token, role, onComplete });

  if (!ROLES_REQUIRING_KYC.includes(role?.toLowerCase() || '')) {
    return null;
  }

  return (
    <div className="kyc-verification-overlay">
      <div className="kyc-verification-modal">
        {step !== 'success' && (
          <div className="kyc-header">
            <div className="step-indicator">
              <div
                className={`step ${(step as string) === 'intro' ? 'active' : (step as string) !== 'intro' ? 'completed' : ''}`}
              >
                <span>1</span>
              </div>
              <div className="step-line" />
              <div
                className={`step ${(step as string) === 'personal' ? 'active' : (step as string) === 'documents' || (step as string) === 'success' ? 'completed' : ''}`}
              >
                <span>2</span>
              </div>
              <div className="step-line" />
              <div
                className={`step ${(step as string) === 'documents' ? 'active' : (step as string) === 'success' ? 'completed' : ''}`}
              >
                <span>3</span>
              </div>
            </div>
            <button className="close-btn" onClick={onSkip} title="Skip for now">
              <X size={20} />
            </button>
          </div>
        )}

        {errors.submit && (
          <div className="submit-error">
            <AlertTriangle size={16} />
            <span>{errors.submit}</span>
          </div>
        )}

        {step === 'intro' && <KycIntroPanel role={role} />}
        {step === 'personal' && (
          <KycPersonalPanel
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 'documents' && (
          <KycDocumentsPanel
            documents={documents}
            errors={errors}
            handleFileChange={handleFileChange}
            removeDocument={removeDocument}
          />
        )}
        {step === 'success' && <KycSuccessPanel onComplete={onComplete} />}

        {step !== 'success' && (
          <div className="kyc-actions">
            {step !== 'intro' && (
              <button
                className="btn-secondary"
                onClick={() => setStep(step === 'documents' ? 'personal' : 'intro')}
                disabled={loading}
              >
                Back
              </button>
            )}
            <button className="btn-primary" onClick={handleNext} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={16} className="spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  {step === 'documents' ? 'Submit for Verification' : 'Continue'}
                  <ChevronRight size={16} />
                </>
              )}
            </button>
            {step === 'intro' && (
              <button className="btn-skip" onClick={onSkip}>
                Skip for now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerificationStep;
