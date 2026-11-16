import React from 'react';
import './TenancyAgreementSigning.css';
import { useTenancyAgreementSigning } from './TenancyAgreementSigning.logic';
import { AgreementCard, SignatureModal, RejectModal } from './TenancyAgreementSigning.panels';

export const TenancyAgreementSigningView: React.FC = () => {
  const {
    currentUser,
    agreements,
    selectedAgreement,
    showSignatureModal,
    showRejectModal,
    userRole,
    loading,
    signing,
    rejectionReason,
    setRejectionReason,
    userEmail,
    setUserEmail,
    signatureRef,
    openSignatureModal,
    openRejectModal,
    closeModals,
    handleSign,
    handleReject,
    clearSignature,
    getUserRole,
    canSign,
    canReject,
  } = useTenancyAgreementSigning();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="tenancy-container">
        <div className="no-auth-message">
          <h2>Please log in to view tenancy agreements</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="tenancy-container">
      <div className="tenancy-header">
        <h1>Tenancy Agreements</h1>
        <p>Sign and manage your rental agreements with email validation</p>
      </div>

      {agreements.length === 0 ? (
        <div className="no-agreements">
          <p>No tenancy agreements found</p>
        </div>
      ) : (
        <div className="agreements-list">
          {agreements.map(agreement => {
            const role = getUserRole(agreement);
            return (
              <AgreementCard
                key={agreement._id}
                agreement={agreement}
                role={role}
                canSign={canSign(agreement)}
                canReject={canReject(agreement)}
                onOpenSign={() => openSignatureModal(agreement, role)}
                onOpenReject={() => openRejectModal(agreement, role)}
              />
            );
          })}
        </div>
      )}

      <SignatureModal
        isOpen={showSignatureModal}
        onClose={closeModals}
        selectedAgreement={selectedAgreement}
        userRole={userRole}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        signatureRef={signatureRef}
        clearSignature={clearSignature}
        handleSign={handleSign}
        signing={signing}
      />

      <RejectModal
        isOpen={showRejectModal}
        onClose={closeModals}
        selectedAgreement={selectedAgreement}
        userRole={userRole}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        handleReject={handleReject}
        signing={signing}
      />
    </div>
  );
};

