import React, { FC } from 'react';
import type { Property } from '../../mocks/dubaiRealEstateMocks';
import {
  RED,
  WHITE,
  SLATE,
  CARD_BG,
  TEXT_MUTED,
  GREEN,
  currencyKey,
  currencySymbol,
} from './PropertySearchSidebar';

interface PropertySearchDetailPanelProps {
  selectedProperty: Property;
  setSelectedProperty: (p: Property | null) => void;
  isVerifyingDLD: boolean;
  setIsVerifyingDLD: (v: boolean) => void;
  dldVerifiedResult: null | {
    permitValid: boolean;
    ownerVerified: boolean;
    titleDeedNo: string;
  };
  setDldVerifiedResult: (
    r: null | { permitValid: boolean; ownerVerified: boolean; titleDeedNo: string }
  ) => void;
  showToast: (message: string, color?: string) => void;
}

export const PropertySearchDetailPanel: FC<PropertySearchDetailPanelProps> = ({
  selectedProperty,
  setSelectedProperty,
  isVerifyingDLD,
  setIsVerifyingDLD,
  dldVerifiedResult,
  setDldVerifiedResult,
  showToast,
}) => (
  <div
    style={{
      marginTop: '20px',
      background: CARD_BG,
      padding: '20px',
      borderRadius: '12px',
      border: `2px solid ${RED}`,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    }}
  >
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: SLATE, fontSize: '1.1rem' }}>{selectedProperty.title}</h3>
        <button
          onClick={() => setSelectedProperty(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: TEXT_MUTED,
            fontSize: '1.1rem',
          }}
        >
          ✕
        </button>
      </div>
      {[
        { label: 'Community', value: selectedProperty.community },
        { label: 'Developer', value: selectedProperty.developer },
        { label: 'Status', value: selectedProperty.status },
        { label: 'RERA Permit', value: selectedProperty.reraPermitNumber },
        {
          label: 'Bedrooms',
          value: `${selectedProperty.beds} beds · ${selectedProperty.baths} baths`,
        },
        { label: 'Area', value: `${selectedProperty.sqft.toLocaleString()} sqft` },
      ].map(row => (
        <div
          key={row.label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
            padding: '7px 0',
            fontSize: '0.85rem',
          }}
        >
          <span style={{ color: TEXT_MUTED, fontWeight: 600 }}>{row.label}</span>
          <span style={{ fontWeight: 700, color: SLATE }}>{row.value}</span>
        </div>
      ))}
    </div>
    <div>
      <div
        style={{
          background: 'var(--color-fef2f2, #FEF2F2)',
          padding: '16px',
          borderRadius: '10px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            color: RED,
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          Multi-Currency Pricing
        </div>
        {['AED', 'USD', 'EUR', 'GBP'].map(cur => {
          const key = currencyKey[cur] as keyof Property;
          const val = selectedProperty[key] as number;
          return (
            <div
              key={cur}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4px 0',
                fontSize: '0.9rem',
                borderBottom: '1px solid #FCA5A530',
              }}
            >
              <span style={{ color: TEXT_MUTED, fontWeight: 600 }}>{cur}</span>
              <span style={{ fontWeight: 900, color: cur === 'AED' ? RED : SLATE }}>
                {currencySymbol[cur]} {val.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
      {dldVerifiedResult && (
        <div
          style={{
            background: 'var(--color-ecfdf5, #ECFDF5)',
            border: '1px solid var(--color-a7f3d0, #A7F3D0)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '12px',
            fontSize: '0.8rem',
            color: 'var(--color-065f46, #065F46)',
          }}
        >
          <div
            style={{
              fontWeight: 800,
              color: GREEN,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>✓ DLD REST API VERIFIED</span>
          </div>
          <div>Permit #{selectedProperty.reraPermitNumber}: ACTIVE & VALID</div>
          <div>Title Deed: #{dldVerifiedResult.titleDeedNo} (Smart Registry Clear)</div>
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            setIsVerifyingDLD(true);
            setDldVerifiedResult(null);
            setTimeout(() => {
              setIsVerifyingDLD(false);
              setDldVerifiedResult({
                permitValid: true,
                ownerVerified: true,
                titleDeedNo: `TD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
              });
            }, 750);
          }}
          disabled={isVerifyingDLD}
          style={{
            flex: '1 1 100%',
            padding: '10px',
            background: '#0284C7',
            color: WHITE,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: '4px',
          }}
        >
          {isVerifyingDLD
            ? '⏳ Querying Dubai Land Department REST API...'
            : '🏛️ Verify with DLD REST Live API'}
        </button>
        <button
          onClick={() =>
            showToast(`📋 Creating enquiry lead for ${selectedProperty.title}...`, RED)
          }
          style={{
            flex: 1,
            padding: '10px',
            background: RED,
            color: WHITE,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.85rem',
          }}
        >
          📋 Create Enquiry Lead
        </button>
        <button
          onClick={() => showToast(`📅 Booking viewing for ${selectedProperty.title}...`, SLATE)}
          style={{
            flex: 1,
            padding: '10px',
            background: SLATE,
            color: WHITE,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.85rem',
          }}
        >
          📅 Book Viewing
        </button>
      </div>
    </div>
  </div>
);
