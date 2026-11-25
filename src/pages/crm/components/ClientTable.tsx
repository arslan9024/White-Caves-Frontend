import React from 'react';
import styled from 'styled-components';
import { Badge } from '../../../components/ui';
import {
  Table,
  Th,
  Td,
  Tr,
  EmptyState,
  SecondaryButton,
  DangerButton,
} from '../styles/CrmPageStyles';
import { TYPE_CONFIG, STATUS_CONFIG, type Client } from '../hooks/useClientManagement';

const VipBadge = styled.span`
  background: #c9a84c;
  color: #0f0f0f;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.4rem;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #1f1f1f;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
`;

interface ClientTableProps {
  paginatedClients: Client[];
  search: string;
  typeFilter: string;
  statusFilter: string;
  handleEdit: (client: Client) => void;
  confirmDelete: (client: Client) => void;
  getTypeBadgeVariant: (type: string) => any;
  getStatusBadgeVariant: (status: string) => any;
}

export const ClientTable: React.FC<ClientTableProps> = ({
  paginatedClients,
  search,
  typeFilter,
  statusFilter,
  handleEdit,
  confirmDelete,
  getTypeBadgeVariant,
  getStatusBadgeVariant,
}) => {
  return (
    <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
      <Table aria-label="Clients list">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Type</Th>
            <Th>Company</Th>
            <Th>Status</Th>
            <Th>Tags</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.length > 0 ? (
            paginatedClients.map((client: Client) => (
              <Tr key={client.id} onClick={() => handleEdit(client)}>
                <Td style={{ fontWeight: 500 }}>
                  {client.name || '—'}
                  {client.status === 'vip' && <VipBadge>⭐ VIP</VipBadge>}
                </Td>
                <Td>{client.email || '—'}</Td>
                <Td>{client.phone || '—'}</Td>
                <Td>
                  <Badge variant={getTypeBadgeVariant(client.type || '')} size="small">
                    {TYPE_CONFIG[client.type || '']?.icon}{' '}
                    {TYPE_CONFIG[client.type || '']?.label || client.type || '—'}
                  </Badge>
                </Td>
                <Td>{client.company || '—'}</Td>
                <Td>
                  <Badge variant={getStatusBadgeVariant(client.status || '')} size="small">
                    {STATUS_CONFIG[client.status || '']?.label || client.status || '—'}
                  </Badge>
                </Td>
                <Td>
                  {client.tags && client.tags.length > 0 ? (
                    <TagList>
                      {client.tags.map((tag, idx) => (
                        <Tag key={idx}>{tag}</Tag>
                      ))}
                    </TagList>
                  ) : (
                    '—'
                  )}
                </Td>
                <Td onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <SecondaryButton onClick={() => handleEdit(client)}>Edit</SecondaryButton>
                    <DangerButton onClick={() => confirmDelete(client)}>Delete</DangerButton>
                  </div>
                </Td>
              </Tr>
            ))
          ) : (
            <tr>
              <Td colSpan={8}>
                <EmptyState>
                  {search || typeFilter !== 'all' || statusFilter !== 'all'
                    ? 'No clients match your filters'
                    : 'No clients yet — add your first one!'}
                </EmptyState>
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
