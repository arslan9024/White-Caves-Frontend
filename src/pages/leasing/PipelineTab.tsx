import React from 'react';
import { SoloLeasingDeal, LeasingHubTab } from './types';
import { Badge, StatusPill, DealTitle, MetaRow, ActionBtn, Grid, Card } from './styles';

interface PipelineTabProps {
  deals: SoloLeasingDeal[];
  onOpenContract: (deal: SoloLeasingDeal) => void;
  onNavigateTab: (tab: LeasingHubTab) => void;
}

export const PipelineTab: React.FC<PipelineTabProps> = ({
  deals,
  onOpenContract,
  onNavigateTab,
}) => {
  return (
    <Grid>
      {deals.map(deal => (
        <Card key={deal.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge $bg="#334155">{deal.id}</Badge>
            <StatusPill $status={deal.signatureStatus}>{deal.signatureStatus}</StatusPill>
          </div>
          <DealTitle>{deal.propertyTitle}</DealTitle>
          <MetaRow>
            <span>Unit:</span>
            <strong>{deal.unitNumber}</strong>
          </MetaRow>
          <MetaRow>
            <span>Landlord:</span>
            <span>
              {deal.landlordName} ({deal.landlordPhone})
            </span>
          </MetaRow>
          <MetaRow>
            <span>Tenant:</span>
            <span>{deal.tenantName || 'Pending Booking'}</span>
          </MetaRow>
          <MetaRow>
            <span>Annual Rent:</span>
            <strong>AED {deal.annualRent.toLocaleString()}</strong>
          </MetaRow>
          <MetaRow>
            <span>Cheques:</span>
            <span>{deal.chequeCount} PDCs</span>
          </MetaRow>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <ActionBtn $primary onClick={() => onOpenContract(deal)}>
              📄 Open Contract
            </ActionBtn>
            <ActionBtn onClick={() => onNavigateTab('signature_portal')}>✍️ E-Sign</ActionBtn>
            <ActionBtn onClick={() => onNavigateTab('invoicing')}>💰 Invoice</ActionBtn>
          </div>
        </Card>
      ))}
    </Grid>
  );
};
