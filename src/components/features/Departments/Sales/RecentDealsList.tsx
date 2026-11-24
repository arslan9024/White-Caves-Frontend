import React from 'react';
import { formatCurrency } from '../../../../utils';
import { Deal } from './types';
import { getStageColor } from './constants';
import {
  SectionCard,
  SectionTitle,
  ListContainer,
  ListItem,
  Badge,
} from './styled';

interface RecentDealsListProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
}

export const RecentDealsList: React.FC<RecentDealsListProps> = ({
  deals,
  onSelectDeal,
}) => {
  return (
    <SectionCard>
      <SectionTitle>🤝 Recent Deals</SectionTitle>
      <ListContainer>
        {deals.slice(0, 5).map(deal => (
          <ListItem
            key={deal.id}
            onClick={() => onSelectDeal(deal)}
            style={{
              borderLeft: `4px solid ${getStageColor(deal.stage)}`,
            }}
          >
            <div>
              <strong>{deal.client}</strong>
              <p
                style={{
                  margin: '4px 0 0 0',
                  color: 'var(--text-secondary, #6B7280)',
                  fontSize: '14px',
                }}
              >
                {deal.property}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                {formatCurrency(deal.value)}
              </div>
              <Badge
                style={{
                  backgroundColor:
                    deal.probability > 80
                      ? '#D1FAE5'
                      : deal.probability > 50
                        ? '#FEF3C7'
                        : '#FEE2E2',
                  color:
                    deal.probability > 80
                      ? '#065F46'
                      : deal.probability > 50
                        ? '#92400E'
                        : '#991B1B',
                }}
              >
                {deal.probability}% chance
              </Badge>
            </div>
          </ListItem>
        ))}
      </ListContainer>
    </SectionCard>
  );
};
