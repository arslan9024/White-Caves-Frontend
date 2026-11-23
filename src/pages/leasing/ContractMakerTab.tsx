import React from 'react';
import { SoloLeasingDeal } from './types';
import { Card, ActionBtn } from './styles';

interface ContractMakerTabProps {
  deals: SoloLeasingDeal[];
  onOpenContract: (deal: SoloLeasingDeal) => void;
}

export const ContractMakerTab: React.FC<ContractMakerTabProps> = ({ deals, onOpenContract }) => {
  return (
    <Card>
      <h3>Unified DLD Standard Tenancy Contract Generator</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
        Powered by Henry Document Studio & RERA Unified Tenancy Template.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        {deals.map(deal => (
          <ActionBtn key={deal.id} $primary onClick={() => onOpenContract(deal)}>
            Generate Contract for {deal.unitNumber}
          </ActionBtn>
        ))}
      </div>
    </Card>
  );
};
