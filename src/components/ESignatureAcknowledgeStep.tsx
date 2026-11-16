import React from 'react';

interface TermsSummaryProps {
  contract: any;
  agreementConfirmed: boolean;
  onAgreementChange: (val: boolean) => void;
  onBack: () => void;
  onProceed: () => void;
  loading?: boolean;
}

export const ESignatureAcknowledgeStep: React.FC<TermsSummaryProps> = ({
  contract,
  agreementConfirmed,
  onAgreementChange,
  onBack,
  onProceed,
  loading = false,
}) => {
  return (
    <div className="step-container">
      <div className="acknowledge-section">
        <h2>Acknowledge & Agree</h2>
        <p className="section-subtitle">Please read and acknowledge the contract terms</p>

        <div className="terms-review">
          <h3>Contract Terms Summary</h3>
          <div className="terms-box">
            <div className="term-item">
              <span className="term-icon">📄</span>
              <div>
                <strong>Document Type:</strong>
                <p>{contract?.templateType} Contract</p>
              </div>
            </div>

            <div className="term-item">
              <span className="term-icon">🏠</span>
              <div>
                <strong>Property:</strong>
                <p>
                  {contract?.propertyTitle} - {contract?.propertyLocation}
                </p>
              </div>
            </div>

            {contract?.totalPrice && (
              <div className="term-item">
                <span className="term-icon">💰</span>
                <div>
                  <strong>Amount:</strong>
                  <p>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'AED',
                    }).format(contract.totalPrice)}
                  </p>
                </div>
              </div>
            )}

            {contract?.startDate && (
              <div className="term-item">
                <span className="term-icon">📅</span>
                <div>
                  <strong>Effective Date:</strong>
                  <p>{new Date(contract.startDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="acknowledgment-box">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreementConfirmed}
              onChange={e => onAgreementChange(e.target.checked)}
            />
            <span>
              I have read and understood the contract terms and conditions. I agree to enter into
              this contract.
            </span>
          </label>
        </div>

        <div className="flow-actions">
          <button onClick={onBack} className="btn-secondary" disabled={loading}>
            Back to Review
          </button>
          <button
            onClick={onProceed}
            className="btn-primary"
            disabled={!agreementConfirmed || loading}
          >
            Continue to Sign
          </button>
        </div>
      </div>
    </div>
  );
};

