import React from 'react';
import { Badge } from '../../../../components/ui';
import { colors } from '@/design-tokens';
import type { Property } from '../types';
import { TableContainer, Table, PageButton, LinkButton } from '../TabStylesComponents';
import { getStatusBadgeConfig } from './constants';
import {
  ErrorState,
  PropertyCell,
  PropertyThumb,
  PropertyInfo,
  TypeTag,
  UnassignedText,
  ActionButtonsRow,
  IconBtn,
  TableFooter,
  PaginationButtons,
} from './styles';

interface PropertiesTableProps {
  filteredProperties: Property[];
  paginated: Property[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAdd: () => void;
  onView: (prop: Property) => void;
  onEdit: (prop: Property) => void;
  onDelete: (prop: Property) => void;
}

export const PropertiesTable: React.FC<PropertiesTableProps> = ({
  filteredProperties,
  paginated,
  currentPage,
  totalPages,
  onPageChange,
  onAdd,
  onView,
  onEdit,
  onDelete,
}) => {
  const renderStatusBadge = (status: string) => {
    const cfg = getStatusBadgeConfig(status);
    return (
      <Badge variant={cfg.variant} size="small">
        {cfg.text}
      </Badge>
    );
  };

  return (
    <>
      {filteredProperties.length === 0 && (
        <ErrorState>
          <p>No properties found.</p>
          <LinkButton onClick={onAdd}>Add your first property →</LinkButton>
        </ErrorState>
      )}

      {filteredProperties.length > 0 && (
        <TableContainer>
          <Table aria-label="Properties list">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Location</th>
                <th>Price (AED)</th>
                <th>Status</th>
                <th>Agent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(prop => (
                <tr key={prop.id}>
                  <td>
                    <PropertyCell>
                      <PropertyThumb>🏠</PropertyThumb>
                      <PropertyInfo>
                        <strong>{prop.code}</strong>
                        <small>{prop.title}</small>
                      </PropertyInfo>
                    </PropertyCell>
                  </td>
                  <td>
                    <TypeTag>{prop.type}</TypeTag>
                  </td>
                  <td>{prop.location}</td>
                  <td>
                    <strong style={{ color: colors.success[500] }}>
                      AED {prop.price.toLocaleString()}
                    </strong>
                  </td>
                  <td>{renderStatusBadge(prop.status)}</td>
                  <td>{prop.agent ?? <UnassignedText>Unassigned</UnassignedText>}</td>
                  <td>
                    <ActionButtonsRow>
                      <IconBtn title="View" aria-label="View property" onClick={() => onView(prop)}>
                        👁️
                      </IconBtn>
                      <IconBtn title="Edit" aria-label="Edit property" onClick={() => onEdit(prop)}>
                        ✏️
                      </IconBtn>
                      <IconBtn
                        danger
                        title="Delete"
                        aria-label="Delete property"
                        onClick={() => onDelete(prop)}
                      >
                        🗑️
                      </IconBtn>
                    </ActionButtonsRow>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      <TableFooter>
        <span>
          Showing {paginated.length} of {filteredProperties.length} properties
        </span>
        {totalPages > 1 && (
          <PaginationButtons>
            <PageButton
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
              ←
            </PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PageButton
                key={page}
                $active={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PageButton>
            ))}
            <PageButton
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
              →
            </PageButton>
          </PaginationButtons>
        )}
      </TableFooter>
    </>
  );
};
