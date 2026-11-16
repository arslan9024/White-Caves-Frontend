import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import SignaturePad from './SignaturePad';
import {
  TenancyContractData,
  formatContractDate,
  formatContractCurrency,
  ContractDetailsSection,
  ContractTermsAndBrokerSection,
} from './TenancyContractSections';
import './TenancyContract.css';

interface TenancyContractProps {
  contractData?: TenancyContractData;
  onSave?: (data: any) => Promise<void> | void;
  onUploadToDrive?: (data: any) => Promise<void> | void;
  mode?: 'view' | 'edit';
}

export default function TenancyContract({
  contractData,
  onSave,
  onUploadToDrive,
  mode = 'view',
}: TenancyContractProps) {
  const user = useSelector((state: any) => state?.user?.currentUser);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [currentSigner, setCurrentSigner] = useState<string | null>(null);
  const [signatures, setSignatures] = useState({
    landlord: contractData?.signatures?.landlord || null,
    tenant: contractData?.signatures?.tenant || null,
    broker: contractData?.signatures?.broker || null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const contractRef = useRef<HTMLDivElement>(null);

  const defaultContractData: TenancyContractData = {
    contractNumber: contractData?.contractNumber || `TC-${Date.now()}`,
    propertyAddress: contractData?.propertyAddress || '',
    propertyType: contractData?.propertyType || 'Apartment',
    landlordName: contractData?.landlordName || '',
    landlordEmail: contractData?.landlordEmail || '',
    landlordPhone: contractData?.landlordPhone || '',
    landlordEmirates: contractData?.landlordEmirates || '',
    tenantName: contractData?.tenantName || '',
    tenantEmail: contractData?.tenantEmail || '',
    tenantPhone: contractData?.tenantPhone || '',
    tenantEmirates: contractData?.tenantEmirates || '',
    brokerName: contractData?.brokerName || '',
    brokerLicense: contractData?.brokerLicense || '',
    startDate: contractData?.startDate || '',
    endDate: contractData?.endDate || '',
    rentAmount: contractData?.rentAmount || '',
    securityDeposit: contractData?.securityDeposit || '',
    paymentFrequency: contractData?.paymentFrequency || 'Annual',
    numberOfCheques: contractData?.numberOfCheques || 1,
    createdAt: contractData?.createdAt || new Date().toISOString(),
    status: contractData?.status || 'draft',
  };

  const data = { ...defaultContractData, ...contractData };

  const handleSign = (role: string) => {
    setCurrentSigner(role);
    setShowSignaturePad(true);
  };

  const handleSignatureSave = (signatureData: any) => {
    if (!currentSigner) return;
    setSignatures(prev => ({
      ...prev,
      [currentSigner]: signatureData,
    }));
    setShowSignaturePad(false);
    setCurrentSigner(null);
  };

  const getContractStatus = () => {
    if (signatures.landlord && signatures.tenant && signatures.broker) {
      return 'fully_signed';
    }
    if (signatures.landlord || signatures.tenant || signatures.broker) {
      return 'partially_signed';
    }
    return 'draft';
  };

  const handleSaveContract = async () => {
    setIsSaving(true);
    try {
      await onSave?.({
        ...data,
        signatures,
        status: getContractStatus(),
      });
    } catch (error) {}
    setIsSaving(false);
  };

  const handleUploadToDrive = async () => {
    setIsUploading(true);
    try {
      await onUploadToDrive?.({
        ...data,
        signatures,
        status: getContractStatus(),
      });
    } catch (error) {}
    setIsUploading(false);
  };

  const canSign = (role: 'landlord' | 'tenant' | 'broker') => {
    if (mode === 'view') return false;
    return !signatures[role];
  };

  if (showSignaturePad) {
    return (
      <SignaturePad
        signerName={
          currentSigner === 'landlord'
            ? data.landlordName
            : currentSigner === 'tenant'
              ? data.tenantName
              : data.brokerName
        }
        signerRole={
          currentSigner ? currentSigner.charAt(0).toUpperCase() + currentSigner.slice(1) : 'Party'
        }
        onSave={handleSignatureSave}
        onCancel={() => {
          setShowSignaturePad(false);
          setCurrentSigner(null);
        }}
      />
    );
  }

  return (
    <div className="tenancy-contract" ref={contractRef}>
      <div className="contract-header">
        <div className="contract-logo">
          <img src="/company-logo.jpg" alt="White Caves" />
          <div className="company-info">
            <h2>White Caves Real Estate LLC</h2>
            <p>Licensed Real Estate Brokerage</p>
          </div>
        </div>
        <div className="contract-meta">
          <span className="contract-number">Contract #{data.contractNumber}</span>
          <span className={`contract-status status-${getContractStatus()}`}>
            {getContractStatus().replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <h1 className="contract-title">TENANCY CONTRACT</h1>
      <p className="contract-subtitle">Residential Property Lease Agreement</p>

      <ContractDetailsSection
        data={data}
        formatDate={formatContractDate}
        formatCurrency={formatContractCurrency}
      />

      <ContractTermsAndBrokerSection data={data} />

      <section className="contract-section signatures-section">
        <h3>Signatures</h3>
        <div className="signatures-grid">
          <div className="signature-box">
            <h4>Landlord</h4>
            {signatures.landlord ? (
              <div className="signature-display">
                <img src={signatures.landlord.signature} alt="Landlord Signature" />
                <p className="signer-name">{signatures.landlord.signerName}</p>
                <p className="sign-date">{formatContractDate(signatures.landlord.timestamp)}</p>
              </div>
            ) : (
              <div className="signature-placeholder">
                {canSign('landlord') ? (
                  <button className="btn btn-sign" onClick={() => handleSign('landlord')}>
                    Sign as Landlord
                  </button>
                ) : (
                  <span>Pending Signature</span>
                )}
              </div>
            )}
          </div>

          <div className="signature-box">
            <h4>Tenant</h4>
            {signatures.tenant ? (
              <div className="signature-display">
                <img src={signatures.tenant.signature} alt="Tenant Signature" />
                <p className="signer-name">{signatures.tenant.signerName}</p>
                <p className="sign-date">{formatContractDate(signatures.tenant.timestamp)}</p>
              </div>
            ) : (
              <div className="signature-placeholder">
                {canSign('tenant') ? (
                  <button className="btn btn-sign" onClick={() => handleSign('tenant')}>
                    Sign as Tenant
                  </button>
                ) : (
                  <span>Pending Signature</span>
                )}
              </div>
            )}
          </div>

          <div className="signature-box broker">
            <h4>Broker/Agent</h4>
            {signatures.broker ? (
              <div className="signature-display">
                <img src={signatures.broker.signature} alt="Broker Signature" />
                <p className="signer-name">{signatures.broker.signerName}</p>
                <p className="sign-date">{formatContractDate(signatures.broker.timestamp)}</p>
              </div>
            ) : (
              <div className="signature-placeholder">
                {canSign('broker') ? (
                  <button className="btn btn-sign" onClick={() => handleSign('broker')}>
                    Sign as Broker
                  </button>
                ) : (
                  <span>Pending Signature</span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {mode !== 'view' && (
        <div className="contract-actions">
          <button className="btn btn-secondary" onClick={handleSaveContract} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Contract'}
          </button>

          {getContractStatus() === 'fully_signed' && (
            <button
              className="btn btn-primary"
              onClick={handleUploadToDrive}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : '📁 Save to Google Drive'}
            </button>
          )}
        </div>
      )}

      <div className="contract-footer">
        <p>This contract is prepared by White Caves Real Estate LLC</p>
        <p>admin@whitecaves.com | Dubai, UAE</p>
      </div>
    </div>
  );
}

