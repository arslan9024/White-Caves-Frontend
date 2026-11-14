import React, { FC } from 'react';

export const PropertyLocationBox: FC<{ titleDeedData: any }> = ({ titleDeedData }) => (
  <div
    style={{
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '16px',
      background: '#FFFFFF',
    }}
  >
    <div
      style={{
        color: '#EF4444',
        fontWeight: 800,
        fontSize: '12px',
        borderBottom: '1px solid #F1F5F9',
        paddingBottom: '6px',
        marginBottom: '10px',
      }}
    >
      1. PROPERTY & LOCATION SPECIFICATIONS
    </div>
    <div style={{ fontSize: '12px', lineHeight: 1.8 }}>
      <div>
        <strong>Property Type:</strong> {titleDeedData.propertyTypeEn} (
        {titleDeedData.propertyTypeAr})
      </div>
      <div>
        <strong>Community:</strong> {titleDeedData.communityEn} ({titleDeedData.communityAr})
      </div>
      <div>
        <strong>Building:</strong>{' '}
        <span style={{ fontWeight: 'bold', color: 'var(--accent-red, #EF4444)' }}>
          {titleDeedData.buildingNameEn}
        </span>{' '}
        ({titleDeedData.buildingNameAr}), Bldg #{titleDeedData.buildingNumber}
      </div>
      <div>
        <strong>Unit / Property No:</strong>{' '}
        <code
          style={{
            background: 'var(--color-fef2f2, #FEF2F2)',
            color: 'var(--color-991b1b, #991B1B)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Unit {titleDeedData.propertyNumber}
        </code>{' '}
        (Floor {titleDeedData.floorNumber})
      </div>
      <div>
        <strong>Plot No:</strong> {titleDeedData.plotNumber} | <strong>Municipality:</strong>{' '}
        {titleDeedData.municipalityNumber}
      </div>
      <div>
        <strong>Parking Bay:</strong> {titleDeedData.parkingNumber} |{' '}
        <strong>Mortgage:</strong> {titleDeedData.mortgageStatusEn}
      </div>
    </div>
  </div>
);

export const AreaMeasurementsBox: FC<{ titleDeedData: any }> = ({ titleDeedData }) => (
  <div
    style={{
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '16px',
      background: '#FFFFFF',
    }}
  >
    <div
      style={{
        color: '#2563EB',
        fontWeight: 800,
        fontSize: '12px',
        borderBottom: '1px solid #F1F5F9',
        paddingBottom: '6px',
        marginBottom: '10px',
      }}
    >
      2. PRECISION AREA MEASUREMENTS
    </div>
    <div style={{ fontSize: '12px', lineHeight: 1.8 }}>
      <div>
        <strong>Suite Area (Internal):</strong> {titleDeedData.suiteAreaSqM} m² (المساحة
        الداخلية)
      </div>
      <div>
        <strong>Balcony Area:</strong> {titleDeedData.balconyAreaSqM} m² (مساحة البلكونة)
      </div>
      <div>
        <strong>Total Area (Sq Meters):</strong>{' '}
        <span style={{ fontWeight: 'bold', color: 'var(--accent-blue, #2563EB)' }}>
          {titleDeedData.totalAreaSqM} m²
        </span>
      </div>
      <div>
        <strong>Total Area (Sq Feet):</strong>{' '}
        <span style={{ fontWeight: 'bold', color: 'var(--color-1e293b, #1E293B)' }}>
          {titleDeedData.totalAreaSqFt} sq.ft
        </span>
      </div>
      <div>
        <strong>Common Area:</strong> {titleDeedData.commonAreaSqM} m²
      </div>
    </div>
  </div>
);

export const RegisteredOwnershipBox: FC<{ titleDeedData: any }> = ({ titleDeedData }) => (
  <div
    style={{
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '16px',
      background: '#FFFFFF',
    }}
  >
    <div
      style={{
        color: '#16A34A',
        fontWeight: 800,
        fontSize: '12px',
        borderBottom: '1px solid #F1F5F9',
        paddingBottom: '6px',
        marginBottom: '10px',
      }}
    >
      3. REGISTERED OWNERSHIP (DLD)
    </div>
    <div style={{ fontSize: '12px', lineHeight: 1.8 }}>
      <div>
        <strong>Owner DLD No:</strong>{' '}
        <code
          style={{
            background: 'var(--color-f0fdf4, #F0FDF4)',
            color: 'var(--color-166534, #166534)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          {titleDeedData.ownerDldNumber}
        </code>
      </div>
      <div>
        <strong>Owner Name (EN):</strong> {titleDeedData.ownerNameEn}
      </div>
      <div>
        <strong>Owner Name (AR):</strong>{' '}
        <span style={{ fontWeight: 'bold', color: 'var(--color-1e293b, #1E293B)' }}>
          {titleDeedData.ownerNameAr}
        </span>
      </div>
      <div>
        <strong>Ownership Share:</strong> {titleDeedData.ownerSharePercent}% (
        {titleDeedData.ownedAreaSqM} m²)
      </div>
      <div>
        <strong>DLD Certificate No:</strong> {titleDeedData.certificateNumber} (Issued:{' '}
        {titleDeedData.issueDate})
      </div>
    </div>
  </div>
);

export const ConveyancingHistoryBox: FC<{ titleDeedData: any }> = ({ titleDeedData }) => (
  <div
    style={{
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '16px',
      background: '#1E293B',
      color: '#F8FAFC',
    }}
  >
    <div
      style={{
        color: '#FACC15',
        fontWeight: 800,
        fontSize: '12px',
        borderBottom: '1px solid #334155',
        paddingBottom: '6px',
        marginBottom: '10px',
      }}
    >
      4. CONVEYANCING & PURCHASE CONTRACT
    </div>
    <div
      style={{ fontSize: '12px', lineHeight: 1.8, color: 'var(--text-secondary, #E2E8F0)' }}
    >
      <div>
        <strong>Purchased From:</strong> {titleDeedData.purchasedFromEn}
      </div>
      <div>
        <strong>Arabic Entity:</strong> {titleDeedData.purchasedFromAr}
      </div>
      <div>
        <strong>Land Registration No:</strong> {titleDeedData.registrationContractNumber} (
        {titleDeedData.registrationDate})
      </div>
      <div>
        <strong>Purchase Price:</strong>{' '}
        <span
          style={{
            color: 'var(--color-facc15, #FACC15)',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          AED {titleDeedData.purchasePriceAed.toLocaleString()}
        </span>
      </div>
      <div
        style={{ fontSize: '11px', color: 'var(--color-94a3b8, #94A3B8)', marginTop: '4px' }}
      >
        <em>"{titleDeedData.purchasePriceWordsEn}"</em>
      </div>
    </div>
  </div>
);
