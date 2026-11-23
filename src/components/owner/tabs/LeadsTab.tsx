import React from 'react';
import type { LeadsTabProps } from './types';
import {
  TabContainer,
  Toast,
  LoadingSpinner,
  LoadingState,
  ErrorState,
  ErrorIcon,
  EmptyStateText,
  LinkButton,
} from './TabStylesComponents';
import './TabStyles.css';

import { useLeadsManagement } from './leadsTab/useLeadsManagement';
import { LeadsHeaderAndFilters } from './leadsTab/LeadsHeaderAndFilters';
import { LeadsTable } from './leadsTab/LeadsTable';
import { LeadsPagination } from './leadsTab/LeadsPagination';
import { LeadModals } from './leadsTab/LeadModals';

// Re-export constants, styles, helpers, hooks, and components for full backwards compatibility
export * from './leadsTab';

export const LeadsTab: React.FC<LeadsTabProps> = ({ data, loading, error }) => {
  const {
    sourceFilter,
    setSourceFilter,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    currentPage,
    setCurrentPage,
    modalMode,
    editTarget,
    form,
    setForm,
    toast,
    showToast,
    openAdd,
    openEdit,
    openDelete,
    closeModal,
    handleSave,
    handleDelete,
    handleStatusChange,
    filteredLeads,
    paginatedLeads,
    totalPages,
    leadStats,
  } = useLeadsManagement(data?.leads);

  if (loading) {
    return (
      <TabContainer>
        <LoadingState role="status" aria-label="Loading leads">
          <LoadingSpinner />
          <p>Loading leads...</p>
        </LoadingState>
      </TabContainer>
    );
  }

  if (error) {
    return (
      <TabContainer>
        <ErrorState role="alert">
          <ErrorIcon>⚠️</ErrorIcon>
          <p>Failed to load leads: {error}</p>
        </ErrorState>
      </TabContainer>
    );
  }

  return (
    <TabContainer>
      {toast && <Toast role="status">{toast}</Toast>}

      <LeadsHeaderAndFilters
        stats={leadStats}
        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onOpenAdd={openAdd}
      />

      {filteredLeads.length === 0 && (
        <EmptyStateText style={{ padding: '2rem', textAlign: 'center' }}>
          No leads found. <LinkButton onClick={openAdd}>Add your first lead →</LinkButton>
        </EmptyStateText>
      )}

      {filteredLeads.length > 0 && (
        <LeadsTable
          leads={paginatedLeads}
          onOpenEdit={openEdit}
          onOpenDelete={openDelete}
          onStatusChange={handleStatusChange}
          onSnooze={() => {
            showToast('✅ Lead snoozed for 7 days.');
          }}
        />
      )}

      <LeadsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentCount={paginatedLeads.length}
        totalCount={filteredLeads.length}
        onPageChange={setCurrentPage}
      />

      <LeadModals
        modalMode={modalMode}
        editTarget={editTarget}
        form={form}
        setForm={setForm}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </TabContainer>
  );
};

export default React.memo(LeadsTab);
