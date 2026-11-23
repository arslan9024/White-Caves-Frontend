/**
 * White Caves Real Estate LLC - Deal Detail Modal / Inline View Component
 * Standard: AEGIS Canonical 7-Category Architecture Standard (Modal / In-Page View)
 * Single Purpose File Law: < 350 lines
 */

import React, { FC, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { DealItem, DealStatus } from './DealManager.types';
import { DealPdcScheduleSection } from './DealPdcScheduleSection';
import { DealStatutoryDocsSection } from './DealStatutoryDocsSection';
import { DealPrimaryPartiesGrid } from './DealPrimaryPartiesGrid';
import { DealDetailHeader } from './DealDetailHeader';
import { TenancyDealCockpit } from './TenancyDealCockpit';

export interface DealDetailModalProps {
  deal: DealItem;
  onClose: () => void;
  onAdvanceStatus: (dealId: string, status: DealStatus) => void;
  onNavigateToDoc?: (docId: string) => void;
  isInline?: boolean;
}

export const DealDetailModal: FC<DealDetailModalProps> = ({
  deal,
  onClose,
  onAdvanceStatus,
  onNavigateToDoc,
  isInline = false,
}) => {
  const isLeasing = deal.dealType === 'LEASING';
  const [activeTab, setActiveTab] = useState<'cockpit' | 'dossier'>(
    isLeasing ? 'cockpit' : 'dossier'
  );

  const allStatuses: DealStatus[] = [
    'INQUIRY',
    'VIEWING',
    'OFFER',
    'CONTRACT',
    'EJARI_DLD',
    'COMPLETED',
    'CANCELLED',
  ];

  const mapStatusToStageOrder = (status: DealStatus): number => {
    switch (status) {
      case 'INQUIRY':
        return 1;
      case 'VIEWING':
        return 5;
      case 'OFFER':
        return 6;
      case 'CONTRACT':
        return 8;
      case 'EJARI_DLD':
        return 11;
      case 'COMPLETED':
        return 12;
      default:
        return 7;
    }
  };

  const mapStageOrderToStatus = (stage: number): DealStatus => {
    if (stage >= 12) return 'COMPLETED';
    if (stage >= 11) return 'EJARI_DLD';
    if (stage >= 8) return 'CONTRACT';
    if (stage >= 6) return 'OFFER';
    if (stage >= 5) return 'VIEWING';
    return 'INQUIRY';
  };

  const handleAdvanceCockpitStage = async (targetStage: number) => {
    const nextStatus = mapStageOrderToStatus(targetStage);
    onAdvanceStatus(deal.id, nextStatus);

    try {
      await fetch(`/api/leasing-formula/tenancy-deals/${deal.id}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nextStage: `STAGE_${String(targetStage).padStart(2, '0')}`,
          actorUserId: 'md-arslan-malik',
        }),
      });
    } catch {
      // Graceful fallback for offline / mock testing
    }
  };

  const cardContent = (
    <>
      <DealDetailHeader
        deal={deal}
        isInline={isInline}
        onClose={onClose}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {isLeasing && activeTab === 'cockpit' ? (
        <div style={{ padding: '8px 0 24px 0' }}>
          <TenancyDealCockpit
            dealId={deal.id}
            contractMode={deal.title.toLowerCase().includes('renewal') ? 'RENEWAL_TENANCY' : 'NEW_TENANCY'}
            area={deal.propertyCommunity || 'DAMAC Hills 2'}
            project={deal.propertyTitle || 'Camellia'}
            unitNumber="TH-C-104"
            landlordName={deal.ownerName || 'Mohammed Al Mansoori'}
            tenantName={deal.clientName || 'Sarah Jenkins'}
            annualRentAed={deal.valueAED}
            chequesCount={deal.pdcSchedule?.length || 4}
            currentStageOrder={mapStatusToStageOrder(deal.status)}
            onAdvanceStage={handleAdvanceCockpitStage}
          />
        </div>
      ) : (
        /* Modal / Inline Dossier Body */
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status & Financials Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 18px',
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                Current Deal Stage
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <select
                  value={deal.status}
                  onChange={e => onAdvanceStatus(deal.id, e.target.value as DealStatus)}
                  data-testid="deal-status-select"
                  style={{
                    background: '#0B132B',
                    border: '1px solid #38BDF8',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {allStatuses.map(s => (
                    <option key={s} value={s}>
                      {s.replace('_', ' ')}
                    </option>
                  ))}
                </select>
                {deal.status === 'COMPLETED' && (
                  <span
                    style={{
                      color: '#34D399',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle size={14} /> Revenue Booked
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Transaction Value</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                  AED {deal.valueAED.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                  Gross Commission ({deal.commissionRate}%)
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34D399' }}>
                  AED {deal.commissionAED.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Primary Parties Grid */}
          <DealPrimaryPartiesGrid deal={deal} />

          {/* Sequential PDC Cheques Ledger Table */}
          <DealPdcScheduleSection pdcSchedule={deal.pdcSchedule} />

          {/* Linked Statutory Documents */}
          <DealStatutoryDocsSection documents={deal.documents} onNavigateToDoc={onNavigateToDoc} />
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          {isInline ? 'Close Dossier & Return' : 'Close Dossier'}
        </button>
      </div>
    </>
  );

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: isInline ? '100%' : '840px',
    maxHeight: isInline ? 'none' : '90vh',
    backgroundColor: '#070D18',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '16px',
    overflowY: isInline ? 'visible' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: isInline ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
  };

  if (isInline) {
    return (
      <div data-testid="deal-detail-main-view" style={{ width: '100%', padding: '0 0 24px 0' }}>
        <div data-testid="deal-detail-modal" style={cardStyle}>
          {cardContent}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      data-testid="deal-detail-modal"
    >
      <div data-testid="deal-detail-card" style={cardStyle}>
        {cardContent}
      </div>
    </div>
  );
};
