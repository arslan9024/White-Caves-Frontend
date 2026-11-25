import React from 'react';
import type { AnalyticsKPIs } from './types';

interface InventoryHeaderProps {
  loadingData: boolean;
  analyticsKPIs: AnalyticsKPIs;
  onOpenAddModal: () => void;
  onOpenSheetsSupervisor?: () => void;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  loadingData,
  analyticsKPIs,
  onOpenAddModal,
  onOpenSheetsSupervisor,
}) => (
  <div
    style={{
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      color: '#FFFFFF',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '1rem',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--accent-red, #EF4444)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Department 07 · Subitem 7.1 Master Inventory Control Center
        </span>
        <h2
          style={{
            margin: '4px 0 0',
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--white, #FFFFFF)',
          }}
        >
          🏠 DAMAC Hills 2 Real Property Inventory Database
        </h2>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {onOpenSheetsSupervisor && (
          <button
            onClick={onOpenSheetsSupervisor}
            style={{
              background: '#10B981',
              color: '#0F172A',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '9px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
            }}
          >
            📊 AI Sarita Sheets
          </button>
        )}
        <button
          onClick={onOpenAddModal}
          style={{
            background: '#EF4444',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.85rem',
            padding: '9px 18px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)',
          }}
        >
          + Add Property Listing
        </button>
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '0.85rem',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span
          style={{ fontSize: '0.72rem', color: 'var(--color-94a3b8, #94A3B8)', display: 'block' }}
        >
          Total Listed Properties
        </span>
        <span
          style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-gold, #F59E0B)' }}
        >
          {loadingData ? 'Loading...' : analyticsKPIs.totalProps.toLocaleString()}
        </span>
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '0.85rem',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span
          style={{ fontSize: '0.72rem', color: 'var(--color-94a3b8, #94A3B8)', display: 'block' }}
        >
          Total Registered Owners
        </span>
        <span
          style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-38bdf8, #38BDF8)' }}
        >
          {loadingData ? 'Loading...' : analyticsKPIs.totalOwners.toLocaleString()}
        </span>
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '0.85rem',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span
          style={{ fontSize: '0.72rem', color: 'var(--color-94a3b8, #94A3B8)', display: 'block' }}
        >
          Multi-Owner (2+ Owners)
        </span>
        <span
          style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-ec4899, #EC4899)' }}
        >
          {loadingData ? 'Loading...' : analyticsKPIs.multiOwnersCount.toLocaleString()}
        </span>
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '0.85rem',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span
          style={{ fontSize: '0.72rem', color: 'var(--color-94a3b8, #94A3B8)', display: 'block' }}
        >
          Multi-Phone Owners
        </span>
        <span
          style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-green, #10B981)' }}
        >
          {loadingData ? 'Loading...' : analyticsKPIs.multiPhoneCount.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
);
