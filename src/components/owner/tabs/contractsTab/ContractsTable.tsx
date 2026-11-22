import React from 'react';
import type { Contract } from '../types';
import SigningStatusBadge from '../SigningStatusBadge';
import {
  TableContainer,
  Table,
  PaginationContainer,
  PageButton,
  ErrorState,
  ErrorIcon,
  IconButton,
  ActionButtons,
  TableFooter,
  TypeBadge,
  PartiesCell,
  DateCell,
  PriceCell,
  StatusBadge,
} from '../TabStylesComponents';

interface ContractsTableProps {
  paginatedContracts: Contract[];
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (contract: Contract) => void;
  onDelete: (contract: Contract) => void;
}

const renderEjariBadge = (status: string) => {
  if (!status) return null;
  const isRegistered = status === 'registered';
  return (
    <span
      style={{
        color: isRegistered ? 'var(--accent-green, #22C55E)' : 'var(--accent-gold, #F59E0B)',
      }}
    >
      {isRegistered ? '✓ Registered' : '⏳ Pending'}
    </span>
  );
};

const ContractsTable: React.FC<ContractsTableProps> = ({
  paginatedContracts,
  totalFilteredCount,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}) => (
  <>
    {totalFilteredCount === 0 ? (
      <ErrorState>
        <ErrorIcon>📋</ErrorIcon>
        <p>No contracts found</p>
      </ErrorState>
    ) : (
      <TableContainer>
        <Table aria-label="Contracts data">
          <thead>
            <tr>
              <th>Contract No.</th>
              <th>Type</th>
              <th>Parties</th>
              <th>Property</th>
              <th>Duration/Date</th>
              <th>Amount (AED)</th>
              <th>Status</th>
              <th>Ejari</th>
              <th>E-Sign</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContracts.map(contract => (
              <tr key={contract.id}>
                <td>
                  <strong>{contract.contractNumber}</strong>
                </td>
                <td>
                  <TypeBadge $type={contract.type}>
                    {contract.type === 'tenancy' ? '🏠 Tenancy' : '💰 Sale'}
                  </TypeBadge>
                </td>
                <td>
                  <PartiesCell>
                    {contract.type === 'tenancy' ? (
                      <>
                        <small>Tenant: {contract.tenant}</small>
                        <small>Landlord: {contract.landlord}</small>
                      </>
                    ) : (
                      <>
                        <small>Buyer: {contract.buyer}</small>
                        <small>Seller: {contract.seller}</small>
                      </>
                    )}
                  </PartiesCell>
                </td>
                <td>{contract.property}</td>
                <td>
                  <DateCell>
                    {contract.type === 'tenancy' ? (
                      <>
                        <small>{contract.startDate}</small>
                        <small>to {contract.endDate}</small>
                      </>
                    ) : (
                      <small>Completion: {contract.completionDate}</small>
                    )}
                  </DateCell>
                </td>
                <PriceCell>AED {contract.amount.toLocaleString()}</PriceCell>
                <td>
                  <StatusBadge className="status-badge" $status={contract.status}>
                    {contract.status}
                  </StatusBadge>
                </td>
                <td>{renderEjariBadge(contract.ejariStatus)}</td>
                <td>
                  <SigningStatusBadge status={contract.signatureStatus} />
                </td>
                <td>
                  <ActionButtons>
                    <IconButton
                      title="Edit"
                      aria-label="Edit contract"
                      onClick={() => onEdit(contract)}
                    >
                      ✏️
                    </IconButton>
                    <IconButton
                      danger
                      title="Delete"
                      aria-label="Delete contract"
                      onClick={() => onDelete(contract)}
                    >
                      🗑️
                    </IconButton>
                  </ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    )}

    <nav role="navigation" aria-label="Pagination">
      {totalPages > 1 && (
        <TableFooter>
          <span>
            Showing {paginatedContracts.length} of {totalFilteredCount} contracts
          </span>
          <PaginationContainer>
            <PageButton
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
              ←
            </PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <PageButton key={p} $active={p === currentPage} onClick={() => onPageChange(p)}>
                {p}
              </PageButton>
            ))}
            <PageButton
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
              →
            </PageButton>
          </PaginationContainer>
        </TableFooter>
      )}
    </nav>
  </>
);

export default ContractsTable;
