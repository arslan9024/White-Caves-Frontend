import React from 'react';
import { SoloLeasingDeal } from './types';
import { Card, StatusPill, ActionBtn } from './styles';

interface SignaturePortalTabProps {
  deals: SoloLeasingDeal[];
  onSignContract: (dealId: string, role: 'TENANT' | 'LANDLORD') => void;
  onSendWhatsApp: (deal: SoloLeasingDeal) => void;
}

export const SignaturePortalTab: React.FC<SignaturePortalTabProps> = ({
  deals,
  onSignContract,
  onSendWhatsApp,
}) => {
  return (
    <Card>
      <h3>Digital Signature & UAE Pass Verification Desk</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
        Verify identity via UAE Pass and capture digital sign on mobile/desktop.
      </p>
      {deals.map(deal => (
        <div
          key={deal.id}
          style={{
            border: '1px solid #334155',
            padding: '16px',
            borderRadius: '6px',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <strong>
              {deal.propertyTitle} — {deal.unitNumber}
            </strong>
            <StatusPill $status={deal.signatureStatus}>{deal.signatureStatus}</StatusPill>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            UAE Pass Authentication:{' '}
            {deal.uaePassVerified ? (
              <span style={{ color: '#10b981' }}>✅ Authenticated</span>
            ) : (
              <span style={{ color: '#f59e0b' }}>⚠️ Pending Approval</span>
            )}
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <ActionBtn $primary onClick={() => onSignContract(deal.id, 'TENANT')}>
              ✍️ Tenant Sign
            </ActionBtn>
            <ActionBtn onClick={() => onSignContract(deal.id, 'LANDLORD')}>
              ✍️ Landlord Sign
            </ActionBtn>
            <ActionBtn onClick={() => onSendWhatsApp(deal)}>📱 WhatsApp Link</ActionBtn>
          </div>
        </div>
      ))}
    </Card>
  );
};
