import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { TenancyAgreement, UserTenancyRole } from './TenancyAgreementSigning.types';
import { getStatusBadge, getSignatureStatus } from './TenancyAgreementSigning.data';

interface AgreementCardProps {
  agreement: TenancyAgreement;
  role: UserTenancyRole;
  canSign: boolean;
  canReject: boolean;
  onOpenSign: () => void;
  onOpenReject: () => void;
}

export const AgreementCard: React.FC<AgreementCardProps> = ({
  agreement,
  role,
  canSign,
  canReject,
  onOpenSign,
  onOpenReject,
}) => {
  const landlordData =
    typeof agreement.landlordId === 'object' && agreement.landlordId?.name
      ? agreement.landlordId
      : { name: 'Landlord' };
  const tenantData =
    typeof agreement.tenantId === 'object' && agreement.tenantId?.name
      ? agreement.tenantId
      : { name: 'Tenant' };

  return (
    <div className={`agreement-card ${agreement.status.toLowerCase()}`}>
      <div className="agreement-header">
        <h3>{agreement.agreementDetails?.propertyAddress}</h3>
        {getStatusBadge(agreement)}
      </div>

      <div className="agreement-details">
        <div className="detail-row">
          <span className="label">Monthly Rent:</span>
          <span className="value">
            ${agreement.agreementDetails?.monthlyRent?.toLocaleString()}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Security Deposit:</span>
          <span className="value">
            ${agreement.agreementDetails?.securityDeposit?.toLocaleString()}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Lease Period:</span>
          <span className="value">
            {new Date(agreement.agreementDetails?.leaseStartDate).toLocaleDateString()} -{' '}
            {new Date(agreement.agreementDetails?.leaseEndDate).toLocaleDateString()}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Your Role:</span>
          <span className="value role-badge">{role?.toUpperCase()}</span>
        </div>
      </div>

      <div className="signatures-status">
        <div className="signature-item">
          <div className="sig-header">
            <span className="signature-label">Landlord ({landlordData.name})</span>
            {getSignatureStatus(agreement.signatures?.landlord)}
          </div>
          <div className="sig-email">Email: {agreement.landlordEmail}</div>
          {agreement.signatures?.landlord?.signed && (
            <div className="sig-date">
              Signed: {new Date(agreement.signatures.landlord.signedAt || '').toLocaleDateString()}
            </div>
          )}
          {agreement.signatures?.landlord?.status === 'REJECTED' &&
            agreement.signatures?.landlord?.rejectionReason && (
              <div className="sig-rejection">
                Reason: {agreement.signatures.landlord.rejectionReason}
              </div>
            )}
        </div>
        <div className="signature-item">
          <div className="sig-header">
            <span className="signature-label">Tenant ({tenantData.name})</span>
            {getSignatureStatus(agreement.signatures?.tenant)}
          </div>
          <div className="sig-email">Email: {agreement.tenantEmail}</div>
          {agreement.signatures?.tenant?.signed && (
            <div className="sig-date">
              Signed: {new Date(agreement.signatures.tenant.signedAt || '').toLocaleDateString()}
            </div>
          )}
          {agreement.signatures?.tenant?.status === 'REJECTED' &&
            agreement.signatures?.tenant?.rejectionReason && (
              <div className="sig-rejection">
                Reason: {agreement.signatures.tenant.rejectionReason}
              </div>
            )}
        </div>
      </div>

      <div className="action-buttons">
        {canSign && (
          <button className="sign-button" onClick={onOpenSign}>
            Sign Agreement
          </button>
        )}
        {canReject && (
          <button className="reject-button" onClick={onOpenReject}>
            Reject Agreement
          </button>
        )}
      </div>
    </div>
  );
};

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgreement: TenancyAgreement | null;
  userRole: UserTenancyRole;
  userEmail: string;
  setUserEmail: (email: string) => void;
  signatureRef: React.RefObject<any>;
  clearSignature: () => void;
  handleSign: () => void;
  signing: boolean;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  selectedAgreement,
  userRole,
  userEmail,
  setUserEmail,
  signatureRef,
  clearSignature,
  handleSign,
  signing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="signature-modal">
        <div className="modal-header">
          <h2>Sign Tenancy Agreement</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="agreement-summary">
            <p>
              <strong>Property:</strong> {selectedAgreement?.agreementDetails?.propertyAddress}
            </p>
            <p>
              <strong>Signing as:</strong> {userRole?.toUpperCase()}
            </p>
            <p className="email-requirement">
              <strong>Required Email:</strong>{' '}
              {userRole === 'landlord'
                ? selectedAgreement?.landlordEmail
                : selectedAgreement?.tenantEmail}
            </p>
          </div>

          <div className="email-input-section">
            <label>Confirm Your Email:</label>
            <input
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="email-input"
            />
            <p className="validation-note">Email must match the registered {userRole} email</p>
          </div>

          <div className="signature-section">
            <label>Your Signature:</label>
            <div className="signature-pad-container">
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  className: 'signature-pad',
                  width: 500,
                  height: 200,
                }}
              />
            </div>
            <button className="clear-btn" onClick={clearSignature}>
              Clear
            </button>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="submit-btn" onClick={handleSign} disabled={signing}>
              {signing ? 'Signing...' : 'Submit Signature'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgreement: TenancyAgreement | null;
  userRole: UserTenancyRole;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  handleReject: () => void;
  signing: boolean;
}

export const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  selectedAgreement,
  userRole,
  rejectionReason,
  setRejectionReason,
  handleReject,
  signing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="signature-modal reject-modal">
        <div className="modal-header">
          <h2>Reject Tenancy Agreement</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="agreement-summary">
            <p>
              <strong>Property:</strong> {selectedAgreement?.agreementDetails?.propertyAddress}
            </p>
            <p>
              <strong>Rejecting as:</strong> {userRole?.toUpperCase()}
            </p>
          </div>

          <div className="rejection-section">
            <label>Reason for Rejection:</label>
            <textarea
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejecting this agreement..."
              className="rejection-textarea"
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="submit-reject-btn" onClick={handleReject} disabled={signing}>
              {signing ? 'Rejecting...' : 'Confirm Rejection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
