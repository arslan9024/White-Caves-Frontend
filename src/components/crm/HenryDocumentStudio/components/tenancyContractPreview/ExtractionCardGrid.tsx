import React, { FC, CSSProperties } from 'react';
import { Building, FileText, Home, UserCheck } from 'lucide-react';
import { ScannedContractData } from './types';

export interface ExtractionCardGridProps {
  scannedContractData: ScannedContractData;
}

const cardStyle: CSSProperties = {
  background: 'var(--color-f8fafc, #F8FAFC)',
  border: '1px solid var(--text-secondary, #E2E8F0)',
  borderRadius: '10px',
  padding: '14px',
};

const labelStyle: CSSProperties = {
  color: 'var(--text-secondary, #64748B)',
  display: 'block',
};

const grid2Col: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  fontSize: '11px',
};

export const ExtractionCardGrid: FC<ExtractionCardGridProps> = ({ scannedContractData }) => {
  const { landlord, tenant, property, financials } = scannedContractData;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '18px',
      }}
    >
      {/* Group 1: Landlord */}
      <div style={cardStyle}>
        <h4
          style={{
            margin: '0 0 10px 0',
            fontSize: '13px',
            fontWeight: 800,
            color: 'var(--accent-red, #EF4444)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Building size={15} /> 1. Landlord / Lessor (معلومات المالك)
        </h4>
        <div style={grid2Col}>
          <div>
            <span style={labelStyle}>Owner / Lessor Name</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)', fontSize: '12px' }}>
              {landlord?.name || '—'}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Emirates ID</span>
            <strong style={{ color: 'var(--accent-red, #EF4444)', fontFamily: 'monospace' }}>
              {landlord?.emiratesId || '—'}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Phone Number</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>
              {landlord?.phone || '—'}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Email Address</span>
            <strong style={{ color: 'var(--accent-blue, #2563EB)' }}>
              {landlord?.email || '—'}
            </strong>
          </div>
        </div>
      </div>

      {/* Group 2: Tenant */}
      <div style={cardStyle}>
        <h4
          style={{
            margin: '0 0 10px 0',
            fontSize: '13px',
            fontWeight: 800,
            color: 'var(--accent-blue, #2563EB)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <UserCheck size={15} /> 2. Tenant Information (معلومات المستأجر)
        </h4>
        <div style={grid2Col}>
          <div>
            <span style={labelStyle}>Tenant Name</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)', fontSize: '12px' }}>
              {tenant?.name || '—'}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Emirates ID</span>
            <strong style={{ color: 'var(--accent-blue, #2563EB)', fontFamily: 'monospace' }}>
              {tenant?.emiratesId || '—'}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Phone Number</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>
              {tenant?.phone || '—'}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Email Address</span>
            <strong style={{ color: 'var(--accent-blue, #2563EB)' }}>{tenant?.email || '—'}</strong>
          </div>
        </div>
      </div>

      {/* Group 3: Property Specifications */}
      <div style={cardStyle}>
        <h4
          style={{
            margin: '0 0 10px 0',
            fontSize: '13px',
            fontWeight: 800,
            color: 'var(--accent-gold, #D97706)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Home size={15} /> 3. Property Specifications (معلومات العقار)
        </h4>
        <div style={grid2Col}>
          <div>
            <span style={labelStyle}>Building & Unit</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>
              {property?.buildingName} Unit {property?.propertyNumber}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Plot Number</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>
              Plot {property?.plotNumber}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Property Type & Usage</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>
              {property?.propertyType} ({property?.usage})
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Area (Sq.M / Sq.Ft)</span>
            <strong style={{ color: 'var(--accent-green, #16A34A)' }}>
              {property?.areaSqM ?? 'Not visible'} m² ({property?.areaSqFt ?? 'Not visible'} sq.ft)
            </strong>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={labelStyle}>Location / Community</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>{property?.location}</strong>
          </div>
        </div>
      </div>

      {/* Group 4: Lease Financials */}
      <div style={cardStyle}>
        <h4
          style={{
            margin: '0 0 10px 0',
            fontSize: '13px',
            fontWeight: 800,
            color: 'var(--accent-green, #16A34A)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <FileText size={15} /> 4. Lease & Financials (معلومات العقد والمالية)
        </h4>
        <div style={grid2Col}>
          <div>
            <span style={labelStyle}>Lease Period</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>
              {financials?.periodFrom} ➔ {financials?.periodTo}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Annual Rent</span>
            <strong style={{ color: 'var(--accent-green, #16A34A)', fontSize: '13px' }}>
              AED {financials?.annualRentAed?.toLocaleString()}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Security Deposit</span>
            <strong style={{ color: 'var(--accent-gold, #D97706)' }}>
              {financials?.securityDepositAed === undefined
                ? 'Not visible'
                : `AED ${financials.securityDepositAed.toLocaleString()}`}
            </strong>
          </div>
          <div>
            <span style={labelStyle}>Mode of Payment</span>
            <strong style={{ color: 'var(--color-0f172a, #0F172A)' }}>
              {financials?.modeOfPayment}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
