import React from 'react';
import { ArrowLeft, ClipboardList, Pencil, User } from 'lucide-react';
import type { InventoryProperty, OwnerRecord } from './types';
import { AssetProfilePropertySection } from './assetProfile/AssetProfilePropertySection';
import { AssetProfileOwnerSection } from './assetProfile/AssetProfileOwnerSection';

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
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {selectedProperty && <ClipboardList size={16} color="#8B5CF6" />}
          <span>
            {selectedProperty ? `Asset Profile — ${selectedProperty.id}` : 'Asset Profile Drawer'}
          </span>
        </h4>
      </div>
      {selectedProperty && (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={onEditProfile}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
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
            <Pencil size={12} />
            <span>Edit Profile</span>
          </button>
          <button
            type="button"
            onClick={onEditOwner}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
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
            <User size={12} />
            <span>Edit Owner</span>
          </button>
        </div>
      )}
    </div>

    {selectedProperty && selectedOwner ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <AssetProfilePropertySection property={selectedProperty} />
        <AssetProfileOwnerSection owner={selectedOwner} />
      </div>
    ) : (
      <div
        style={{
          padding: '3rem 1rem',
          textAlign: 'center',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <ArrowLeft size={28} color="#94A3B8" />
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>
          Select any property card from the left matrix to render the Stage 3 Comprehensive Asset
          Profile Drawer.
        </p>
      </div>
    )}
  </div>
);
