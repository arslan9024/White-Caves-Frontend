import React, { FC } from 'react';
import { EmptyState } from '../../../components/ui';
import SwipeableLeadCard from '../../../components/mobile/SwipeableLeadCard';
import PullToRefresh from '../../../components/mobile/PullToRefresh';
import type { Lead } from '../hooks/useLeadManagement';

export interface LeadMobileListProps {
  leads: Lead[];
  search: string;
  statusFilter: string;
  sourceFilter: string;
  onRefresh: () => void;
  onEdit: (lead: Lead) => void;
  onSnooze: (lead: Lead) => void;
  formatCurrency: (amount?: number) => string;
}

export const LeadMobileList: FC<LeadMobileListProps> = ({
  leads,
  search,
  statusFilter,
  sourceFilter,
  onRefresh,
  onEdit,
  onSnooze,
  formatCurrency,
}) => {
  const hasFilterActive = Boolean(search || statusFilter !== 'all' || sourceFilter !== 'all');

  return (
    <PullToRefresh
      onRefresh={async () => {
        onRefresh();
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginTop: '1rem',
          paddingBottom: '2rem',
        }}
      >
        {leads.length > 0 ? (
          leads.map((lead: Lead) => (
            <SwipeableLeadCard
              key={lead.id}
              lead={{
                id: String(lead.id),
                name: lead.name || '',
                phone: lead.phone,
                email: lead.email,
                area: typeof lead.area === 'string' ? lead.area : '',
                budget: lead.budget ? formatCurrency(lead.budget) : undefined,
                status: lead.status || 'new',
                source: lead.source || 'direct',
                createdAt: lead.created_at,
              }}
              onCall={() => {}}
              onSnooze={() => onSnooze(lead)}
              onClick={() => onEdit(lead)}
            />
          ))
        ) : (
          <EmptyState
            icon={hasFilterActive ? '🔎' : '🧭'}
            title={hasFilterActive ? 'No leads match your filters' : 'No leads yet'}
            description={
              hasFilterActive
                ? 'Try changing search text or resetting filters.'
                : 'Create your first lead to start filling your pipeline.'
            }
          />
        )}
      </div>
    </PullToRefresh>
  );
};
