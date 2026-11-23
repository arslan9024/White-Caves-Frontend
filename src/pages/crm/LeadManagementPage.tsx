/**
 * CRM Lead Management Page (Refactored & Decomposed)
 * Full CRUD lead management with filtering, search, and status pipeline.
 * Subcomponents, modals, tables, and mobile views decomposed to ./leadManagement.
 * Route: /owner/crm/leads
 */
import React, { FC } from 'react';
import { Pagination } from '../../components/ui';
import { SkeletonTable } from '../../components/shared';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  BackLink,
  ActionBar,
  SearchInput,
  FilterSelect,
  PrimaryButton,
  SecondaryButton,
  PaginationWrapper,
  ErrorBanner,
} from './styles/CrmPageStyles';
import { useLeadManagement, SOURCE_LABELS } from './hooks/useLeadManagement';
import { useIsTablet } from '../../hooks/useMediaQuery';
import FloatingActionButton from '../../components/mobile/FloatingActionButton';
import {
  PipelineBar,
  PipelineStage,
  LeadPipelineBar,
  LeadModals,
  LeadDesktopTable,
  LeadMobileList,
  useLeadSnooze,
} from './leadManagement';

// Re-export decomposed modules & companion members for full backwards compatibility
export * from './leadManagement';

const LeadManagementPage: FC = () => {
  useDocumentTitle('Lead Management');
  const {
    filteredLeads,
    statusCounts,
    loading,
    error,
    search,
    statusFilter,
    sourceFilter,
    currentPage,
    showCreateModal,
    showEditModal,
    showDeleteConfirm,
    selectedLead,
    formData,
    setFormData,
    errorMessage,
    setErrorMessage,
    ITEMS_PER_PAGE,
    openCreateModal,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    handleCreate,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    confirmDelete,
    handleSearchChange,
    handleStatusFilterChange,
    handleSourceFilterChange,
    setCurrentPage,
    retryFetch,
    goBack,
    getStatusBadgeVariant,
    formatCurrency,
    formatDate,
  } = useLeadManagement();

  const isTablet = useIsTablet();
  const { handleSnooze, activeFilteredLeads, activePaginatedLeads } = useLeadSnooze(
    filteredLeads,
    currentPage,
    ITEMS_PER_PAGE
  );

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader>
        <div>
          <BackLink onClick={goBack}>← Back to CRM Hub</BackLink>
          <PageTitle>🎯 Lead Management</PageTitle>
        </div>
        <PrimaryButton onClick={openCreateModal}>➕ New Lead</PrimaryButton>
      </PageHeader>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ marginTop: '1rem' }}>
          <SkeletonTable rows={5} />
        </div>
      )}
      {error && (
        <ErrorBanner>
          <span>⚠️ {error} — showing cached data</span>
          <SecondaryButton onClick={retryFetch}>Retry</SecondaryButton>
        </ErrorBanner>
      )}

      {!error && errorMessage && (
        <ErrorBanner role="alert" aria-live="polite">
          <span>⚠️ {errorMessage}</span>
          <SecondaryButton onClick={() => setErrorMessage(null)}>Dismiss</SecondaryButton>
        </ErrorBanner>
      )}

      {/* Pipeline Status Bar */}
      <LeadPipelineBar
        statusFilter={statusFilter}
        statusCounts={statusCounts}
        onStatusFilterChange={handleStatusFilterChange}
      />

      {/* Search & Filters */}
      <ActionBar>
        <SearchInput
          type="text"
          placeholder="Search leads by name, company, email..."
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
        />
        <FilterSelect value={sourceFilter} onChange={e => handleSourceFilterChange(e.target.value)}>
          <option value="all">All Sources</option>
          {Object.entries(SOURCE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </FilterSelect>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-888, #888)' }}>
          {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''} found
        </span>
      </ActionBar>

      {/* Leads List / Table */}
      {!loading &&
        (isTablet ? (
          <LeadMobileList
            leads={activePaginatedLeads}
            search={search}
            statusFilter={statusFilter}
            sourceFilter={sourceFilter}
            onRefresh={retryFetch}
            onEdit={handleEdit}
            onSnooze={handleSnooze}
            formatCurrency={formatCurrency}
          />
        ) : (
          <LeadDesktopTable
            leads={activePaginatedLeads}
            search={search}
            statusFilter={statusFilter}
            sourceFilter={sourceFilter}
            onEdit={handleEdit}
            onDeleteConfirm={confirmDelete}
            getStatusBadgeVariant={getStatusBadgeVariant}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        ))}

      {/* Pagination */}
      {activeFilteredLeads.length > ITEMS_PER_PAGE && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalItems={activeFilteredLeads.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </PaginationWrapper>
      )}

      {/* Context-aware Floating Action Button */}
      {isTablet && <FloatingActionButton context="leads" onAddLead={openCreateModal} />}

      {/* Modals */}
      <LeadModals
        showCreateModal={showCreateModal}
        showEditModal={showEditModal}
        showDeleteConfirm={showDeleteConfirm}
        selectedLead={selectedLead}
        formData={formData}
        setFormData={setFormData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        loading={loading}
        closeCreateModal={closeCreateModal}
        closeEditModal={closeEditModal}
        closeDeleteModal={closeDeleteModal}
        handleCreate={handleCreate}
        handleSaveEdit={handleSaveEdit}
        handleDelete={handleDelete}
      />
    </PageContainer>
  );
};

export default LeadManagementPage;
