import React from 'react';

export interface TenancyContractData {
  contractNumber?: string;
  propertyAddress?: string;
  propertyType?: string;
  landlordName?: string;
  landlordEmail?: string;
  landlordPhone?: string;
  landlordEmirates?: string;
  tenantName?: string;
  tenantEmail?: string;
  tenantPhone?: string;
  tenantEmirates?: string;
  brokerName?: string;
  brokerLicense?: string;
  startDate?: string;
  endDate?: string;
  rentAmount?: number | string;
  securityDeposit?: number | string;
  paymentFrequency?: string;
  numberOfCheques?: number | string;
  createdAt?: string;
  status?: string;
  signatures?: {
    landlord?: any;
    tenant?: any;
    broker?: any;
  };
}

export function formatContractDate(dateString?: string): string {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-AE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatContractCurrency(amount?: number | string): string {
  if (!amount) return '-';
  return `AED ${Number(amount).toLocaleString()}`;
}

export const ContractDetailsSection: React.FC<{
  data: TenancyContractData;
  formatDate: (d?: string) => string;
  formatCurrency: (a?: number | string) => string;
}> = ({ data, formatDate, formatCurrency }) => (
  <>
    <section className="contract-section">
      <h3>Property Details</h3>
      <div className="detail-grid">
        <div className="detail-item">
          <label>Property Address</label>
          <span>{data.propertyAddress || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Property Type</label>
          <span>{data.propertyType}</span>
        </div>
      </div>
    </section>

    <section className="contract-section">
      <h3>Landlord Information</h3>
      <div className="detail-grid">
        <div className="detail-item">
          <label>Full Name</label>
          <span>{data.landlordName || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Emirates ID</label>
          <span>{data.landlordEmirates || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Email</label>
          <span>{data.landlordEmail || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Phone</label>
          <span>{data.landlordPhone || '-'}</span>
        </div>
      </div>
    </section>

    <section className="contract-section">
      <h3>Tenant Information</h3>
      <div className="detail-grid">
        <div className="detail-item">
          <label>Full Name</label>
          <span>{data.tenantName || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Emirates ID</label>
          <span>{data.tenantEmirates || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Email</label>
          <span>{data.tenantEmail || '-'}</span>
        </div>
        <div className="detail-item">
          <label>Phone</label>
          <span>{data.tenantPhone || '-'}</span>
        </div>
      </div>
    </section>

    <section className="contract-section">
      <h3>Lease Terms</h3>
      <div className="detail-grid">
        <div className="detail-item">
          <label>Lease Start Date</label>
          <span>{formatDate(data.startDate)}</span>
        </div>
        <div className="detail-item">
          <label>Lease End Date</label>
          <span>{formatDate(data.endDate)}</span>
        </div>
        <div className="detail-item">
          <label>Annual Rent</label>
          <span>{formatCurrency(data.rentAmount)}</span>
        </div>
        <div className="detail-item">
          <label>Security Deposit</label>
          <span>{formatCurrency(data.securityDeposit)}</span>
        </div>
        <div className="detail-item">
          <label>Payment Frequency</label>
          <span>{data.paymentFrequency}</span>
        </div>
        <div className="detail-item">
          <label>Number of Cheques</label>
          <span>{data.numberOfCheques}</span>
        </div>
      </div>
    </section>
  </>
);

export const ContractTermsAndBrokerSection: React.FC<{ data: TenancyContractData }> = ({
  data,
}) => (
  <>
    <section className="contract-section terms-section">
      <h3>Terms and Conditions</h3>
      <ol className="terms-list">
        <li>The Tenant agrees to pay the rent on time as per the agreed payment schedule.</li>
        <li>
          The Tenant shall maintain the property in good condition throughout the lease period.
        </li>
        <li>
          The Landlord shall ensure the property is habitable and all utilities are functional.
        </li>
        <li>Either party must provide 90 days written notice before terminating the lease.</li>
        <li>
          The security deposit shall be refunded within 30 days of lease termination, subject to
          property inspection.
        </li>
        <li>Subletting is not permitted without written consent from the Landlord.</li>
        <li>Any disputes shall be resolved under UAE law and Dubai courts jurisdiction.</li>
      </ol>
    </section>

    <section className="contract-section broker-section">
      <h3>Brokerage Information</h3>
      <div className="detail-grid">
        <div className="detail-item">
          <label>Broker Name</label>
          <span>{data.brokerName || '-'}</span>
        </div>
        <div className="detail-item">
          <label>License Number</label>
          <span>{data.brokerLicense || '-'}</span>
        </div>
      </div>
    </section>
  </>
);

