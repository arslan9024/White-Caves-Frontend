import React, { FC } from 'react';
import { Badge, EmptyState } from '../../../components/ui';
import { Table, Th, Td, Tr, SecondaryButton, DangerButton } from '../styles/CrmPageStyles';
import { STATUS_CONFIG, SOURCE_LABELS } from '../hooks/useLeadManagement';
import type { Lead } from '../hooks/useLeadManagement';

export interface LeadDesktopTableProps {
  leads: Lead[];
  search: string;
  statusFilter: string;
  sourceFilter: string;
  onEdit: (lead: Lead) => void;
  onDeleteConfirm: (lead: Lead) => void;
  getStatusBadgeVariant: (status: string) => any;
  formatCurrency: (amount?: number) => string;
  formatDate: (dateStr?: string) => string;
}

export const LeadDesktopTable: FC<LeadDesktopTableProps> = ({
  leads,
  search,
  statusFilter,
  sourceFilter,
  onEdit,
  onDeleteConfirm,
  getStatusBadgeVariant,
  formatCurrency,
  formatDate,
}) => {
  const hasFilterActive = Boolean(search || statusFilter !== 'all' || sourceFilter !== 'all');

  return (
    <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
      <Table aria-label="Leads list">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Score</Th>
            <Th>Company</Th>
            <Th>Status</Th>
            <Th>Source</Th>
            <Th>Budget</Th>
            <Th>Contact</Th>
            <Th>Created</Th>
            <Th>Assigned</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {leads.length > 0 ? (
            leads.map((lead: Lead) => {
              const score = lead.score ?? undefined;
              const scoreVariant =
                score === undefined
                  ? undefined
                  : score >= 80
                    ? 'error'
                    : score >= 50
                      ? 'warning'
                      : 'secondary';
              const scoreEmoji =
                score === undefined ? '' : score >= 80 ? '🔥' : score >= 50 ? '⚡' : '❄️';
              return (
                <Tr key={lead.id} onClick={() => onEdit(lead)}>
                  <Td style={{ fontWeight: 500 }}>{lead.name || '—'}</Td>
                  <Td>
                    {score !== undefined ? (
                      <Badge variant={scoreVariant} size="small">
                        {scoreEmoji} {score}
                      </Badge>
                    ) : (
                      '—'
                    )}
                  </Td>
                  <Td>{lead.company || '—'}</Td>
                  <Td>
                    <Badge variant={getStatusBadgeVariant(lead.status || '')} size="small">
                      {STATUS_CONFIG[lead.status || '']?.label || lead.status || '—'}
                    </Badge>
                  </Td>
                  <Td>{SOURCE_LABELS[lead.source || ''] || lead.source || '—'}</Td>
                  <Td>{formatCurrency(lead.budget || lead.value)}</Td>
                  <Td>
                    <div style={{ fontSize: '0.8rem' }}>
                      {lead.email && <div>{lead.email}</div>}
                      {lead.phone && (
                        <div style={{ color: 'var(--color-888, #888)' }}>{lead.phone}</div>
                      )}
                    </div>
                  </Td>
                  <Td>{formatDate(lead.created_at)}</Td>
                  <Td>
                    <Badge variant="info" size="small">
                      {lead.assigned_to || 'General Pool'}
                    </Badge>
                  </Td>
                  <Td onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <SecondaryButton onClick={() => onEdit(lead)}>Edit</SecondaryButton>
                      <DangerButton onClick={() => onDeleteConfirm(lead)}>Delete</DangerButton>
                    </div>
                  </Td>
                </Tr>
              );
            })
          ) : (
            <tr>
              <Td colSpan={10}>
                <EmptyState
                  icon={hasFilterActive ? '🔎' : '🧭'}
                  title={hasFilterActive ? 'No leads match your filters' : 'No leads yet'}
                  description={
                    hasFilterActive
                      ? 'Try changing search text or resetting filters.'
                      : 'Create your first lead to start filling your pipeline.'
                  }
                />
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
