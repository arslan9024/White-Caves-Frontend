import React from 'react';
import type { InventoryProperty, OwnerRecord } from './types';

interface AssetProfileDrawerProps {
  selectedProperty: InventoryProperty | null;
  selectedOwner: OwnerRecord | null;
  onEditProfile: () => void;
  onEditOwner: () => void;
}

export const AssetProfileDrawer: React.FC<AssetProfileDrawerProps> = ({
  selectedProperty,
  selectedOwner,
  onEditProfile,
  onEditOwner,
}) => (
  <div
    style={{
      background: selectedProperty ? '#FFFFFF' : '#F8FAFC',
      border: selectedProperty ? '2px solid #8B5CF6' : '1px dashed #CBD5E1',
      borderRadius: '14px',
      padding: '1.25rem',
      boxShadow: selectedProperty ? '0 8px 24px rgba(139, 92, 246, 0.12)' : 'none',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        paddingBottom: '0.75rem',
        marginBottom: '1rem',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--accent-purple, #8B5CF6)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Stage 3: Comprehensive Profile Drawer
        </span>
        <h4
          style={{
            margin: '2px 0 0',
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--color-1e293b, #1E293B)',
          }}
        >
          {selectedProperty ? `📋 Asset Profile — ${selectedProperty.id}` : 'Asset Profile Drawer'}
        </h4>
      </div>
      {selectedProperty && (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={onEditProfile}
            style={{
              background: 'var(--accent-purple, #8B5CF6)',
              color: 'var(--white, #FFFFFF)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 9px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={onEditOwner}
            style={{
              background: 'var(--accent-blue, #3B82F6)',
              color: 'var(--white, #FFFFFF)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 9px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            👤 Edit Owner
          </button>
        </div>
      )}
    </div>

    {selectedProperty && selectedOwner ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div
          style={{
            background: 'var(--color-f8fafc, #F8FAFC)',
            border: '1px solid var(--text-secondary, #E2E8F0)',
            borderRadius: '12px',
            padding: '1rem',
          }}
        >
          <h5
            style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.88rem',
              fontWeight: 800,
              color: 'var(--accent-purple, #8B5CF6)',
            }}
          >
            🏛️ Section 1: Property Operational Status & Profile Details
          </h5>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.85rem' }}>
            <span
              style={{
                background: 'rgba(139, 92, 246, 0.12)',
                color: 'var(--accent-purple, #8B5CF6)',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              Furnishing: {selectedProperty.furnishing}
            </span>
            <span
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--accent-green, #10B981)',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              Occupancy: {selectedProperty.occupancy}
            </span>
            <span
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                color: 'var(--accent-red, #EF4444)',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              Terms: {selectedProperty.paymentTerms}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              fontSize: '0.8rem',
            }}
          >
            <div>
              <span
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  fontSize: '0.72rem',
                }}
              >
                Asking Price / Rent (AED)
              </span>
              <strong style={{ color: 'var(--accent-green, #10B981)', fontSize: '0.9rem' }}>
                {selectedProperty.askingPrice}
              </strong>
            </div>
            <div>
              <span
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  fontSize: '0.72rem',
                }}
              >
                Ejari Registration Number
              </span>
              <strong style={{ color: 'var(--color-1e293b, #1E293B)' }}>
                {selectedProperty.ejariNumber}
              </strong>
            </div>
            <div>
              <span
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  fontSize: '0.72rem',
                }}
              >
                Current Annual Rent (AED)
              </span>
              <strong style={{ color: 'var(--color-475569, #475569)' }}>
                {selectedProperty.rentAED}
              </strong>
            </div>
            <div>
              <span
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  fontSize: '0.72rem',
                }}
              >
                12-Month DLD Notice Status
              </span>
              <strong
                style={{
                  color: selectedProperty.noticeServed.includes('Yes')
                    ? 'var(--accent-red, #EF4444)'
                    : 'var(--accent-green, #10B981)',
                }}
              >
                {selectedProperty.noticeServed}
              </strong>
            </div>
          </div>
        </div>

        <div
          style={{
            background:
              'linear-gradient(135deg, var(--color-fdf4ff, #FDF4FF) 0%, var(--color-eff6ff, #EFF6FF) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
          }}
        >
          <h5
            style={{
              margin: '0 0 0.75rem 0',
              fontSize: '0.88rem',
              fontWeight: 800,
              color: 'var(--accent-blue, #3B82F6)',
            }}
          >
            🔒 Section 2: Protected Property Owner Information
          </h5>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              fontSize: '0.82rem',
            }}
          >
            <div
              style={{
                background: 'var(--white, #FFFFFF)',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <span
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  fontSize: '0.72rem',
                }}
              >
                Landlord Full Legal Name (Title Deed Match)
              </span>
              <strong style={{ color: 'var(--color-1e293b, #1E293B)', fontSize: '0.92rem' }}>
                {selectedOwner.landlordName}
              </strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div
                style={{
                  background: 'var(--white, #FFFFFF)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                <span
                  style={{
                    color: 'var(--text-secondary, #64748B)',
                    display: 'block',
                    fontSize: '0.72rem',
                  }}
                >
                  Primary Contact Phone
                </span>
                <strong style={{ color: 'var(--accent-blue, #3B82F6)' }}>
                  {selectedOwner.primaryPhone}
                </strong>
              </div>
              <div
                style={{
                  background: 'var(--white, #FFFFFF)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                <span
                  style={{
                    color: 'var(--text-secondary, #64748B)',
                    display: 'block',
                    fontSize: '0.72rem',
                  }}
                >
                  Verification Status
                </span>
                <strong
                  style={{
                    color: selectedOwner.verificationStatus.includes('Verified')
                      ? 'var(--accent-green, #10B981)'
                      : 'var(--accent-gold, #F59E0B)',
                  }}
                >
                  {selectedOwner.verificationStatus}
                </strong>
              </div>
            </div>
            <div
              style={{
                background: 'var(--white, #FFFFFF)',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <span
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  fontSize: '0.72rem',
                }}
              >
                DLD Title Deed Reference Number
              </span>
              <strong style={{ color: 'var(--color-1e293b, #1E293B)' }}>
                {selectedOwner.titleDeedRef}
              </strong>
            </div>
            <div
              style={{
                background: 'var(--white, #FFFFFF)',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <span
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  display: 'block',
                  fontSize: '0.72rem',
                }}
              >
                Exclusive Retainer Mandate
              </span>
              <strong style={{ color: 'var(--accent-green, #10B981)' }}>
                {selectedOwner.mandate}
              </strong>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        style={{
          padding: '3rem 1rem',
          textAlign: 'center',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>👈</span>
        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>
          Select any property card from the left matrix to render the Stage 3 Comprehensive Asset
          Profile Drawer.
        </p>
      </div>
    )}
  </div>
);
