/**
 * Import History Page — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component
 */

import React from 'react';
import { useImportHistoryLogic } from './ImportHistoryPage.logic';
import { ImportHistoryControls, ImportHistoryTable } from './ImportHistoryPage.panels';
import '../ImportHistoryPage.css';

export const ImportHistoryPageView: React.FC = () => {
  const {
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    displayedImports,
    totalPages,
    fetchImports,
    setSelectedImport,
  } = useImportHistoryLogic();

  return (
    <div className="import-history-container" style={{ padding: '1rem', maxWidth: '100%' }}>
      {/* Controls Bar */}
      <ImportHistoryControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onRefresh={fetchImports}
      />

      {/* History Table */}
      <ImportHistoryTable
        imports={displayedImports}
        isLoading={isLoading}
        onSelect={setSelectedImport}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            style={{
              padding: '6px 12px',
              borderRadius: 4,
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              cursor: 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <span
            style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: '#64748B' }}
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            style={{
              padding: '6px 12px',
              borderRadius: 4,
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              cursor: 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportHistoryPageView;
