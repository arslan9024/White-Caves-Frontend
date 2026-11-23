import React from 'react';
import { TableFooter, PaginationContainer, PageButton } from '../TabStylesComponents';

interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  currentCount: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const LeadsPagination: React.FC<LeadsPaginationProps> = ({
  currentPage,
  totalPages,
  currentCount,
  totalCount,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav role="navigation" aria-label="Pagination">
      <TableFooter>
        <span>
          Showing {currentCount} of {totalCount} leads
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
    </nav>
  );
};
