import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../shared/components/ui/Table';
import { Badge } from '../../shared/components/ui/Badge';
import { IconButton } from '../../shared/components/ui/Button';
import { Client } from './hooks/useClientManagement';

interface ClientTableProps {
  clients: Client[];
  openEditModal: (client: Client) => void;
  openDeleteModal: (client: Client) => void;
  getStatusBadgeVariant: (status: Client['status']) => 'success' | 'warning' | 'danger' | 'info';
  formatDate: (date: string) => string;
}

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  openEditModal,
  openDeleteModal,
  getStatusBadgeVariant,
  formatDate,
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
  );
};
