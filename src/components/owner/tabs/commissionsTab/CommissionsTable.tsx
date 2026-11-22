import React from 'react';
import { PermissionGuard } from '../../../guards/PermissionGuard';
import type { Commission } from './types';
import { formatAED, formatDate } from './data';
import { EmptyState, LoadingRow } from './styles';
import { TableWrapper, Table, Thead, Th, Tr, Td, Badge, ActionBtn } from './tableStyles';

interface CommissionsTableProps {
  loading: boolean;
  commissions: Commission[];
  onAction: (action: string, id: string) => void;
}

export const CommissionsTable: React.FC<CommissionsTableProps> = ({
  loading,
  commissions,
  onAction,
}) => (
  <TableWrapper>
    {loading ? (
      <div style={{ padding: '1.5rem' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingRow key={i} />
        ))}
      </div>
    ) : commissions.length === 0 ? (
      <EmptyState>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{'\u{1F48E}'}</div>
        No commissions match your filters
      </EmptyState>
    ) : (
      <Table aria-label="Commission records table">
        <Thead>
          <tr>
            <Th>Property</Th>
            <Th>Agent</Th>
            <Th>Client</Th>
            <Th>Trans. Value</Th>
            <Th>Rate</Th>
            <Th>Commission</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </tr>
        </Thead>
        <tbody>
          {commissions.map(commission => (
            <Tr key={commission._id}>
              <Td>
                <div style={{ fontWeight: 600, color: 'var(--color-fafafa, #fafafa)' }}>
                  {commission.propertyTitle}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(250,250,250,0.45)', marginTop: 2 }}>
                  {commission.propertyType}
                </div>
              </Td>
              <Td>{commission.agentName}</Td>
              <Td>{commission.clientName}</Td>
              <Td style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                {formatAED(commission.transactionValue)}
              </Td>
              <Td>{commission.commissionRate}%</Td>
              <Td
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: '#c41e3a',
                }}
              >
                {formatAED(commission.commissionAmount)}
              </Td>
              <Td>
                <Badge $status={commission.status}>{commission.status}</Badge>
              </Td>
              <Td style={{ fontSize: '0.78rem', color: 'rgba(250,250,250,0.5)' }}>
                {formatDate(commission.createdAt)}
                {commission.paidAt && (
                  <div style={{ color: 'var(--color-4ade80, #4ade80)', fontSize: '0.72rem' }}>
                    Paid {formatDate(commission.paidAt)}
                  </div>
                )}
              </Td>
              <Td>
                <PermissionGuard require="approve_commissions">
                  {commission.status === 'pending' && (
                    <ActionBtn
                      onClick={() => onAction('approve', commission._id)}
                      aria-label={`Approve commission for ${commission.propertyTitle}`}
                    >
                      {'\u2713'} Approve
                    </ActionBtn>
                  )}
                  {commission.status === 'approved' && (
                    <ActionBtn
                      $variant="pay"
                      onClick={() => onAction('pay', commission._id)}
                      aria-label={`Mark commission paid for ${commission.propertyTitle}`}
                    >
                      {'\u{1F4B8}'} Pay
                    </ActionBtn>
                  )}
                </PermissionGuard>
                <PermissionGuard require="manage_leads">
                  {(commission.status === 'pending' || commission.status === 'approved') && (
                    <ActionBtn
                      $variant="dispute"
                      onClick={() => onAction('dispute', commission._id)}
                      aria-label={`Dispute commission for ${commission.propertyTitle}`}
                    >
                      {'\u26A0'} Dispute
                    </ActionBtn>
                  )}
                </PermissionGuard>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    )}
  </TableWrapper>
);
