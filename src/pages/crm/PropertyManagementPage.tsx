/**
 * CRM Property Management Page (Decomposed & Refactored)
 * Internal property portfolio with listings, status tracking, and management.
 * Business logic extracted to usePropertyManagement hook.
 * Shared styles imported from CrmPageStyles.
 * Decomposed companion components and styles in ./propertyManagement.
 * Route: /owner/crm/properties
 */

import React, { FC } from 'react';
import { Pagination } from '../../components/ui';
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
  LoadingBanner,
  ErrorBanner,
} from './styles/CrmPageStyles';
import { usePropertyManagement, STATUS_MAP, TYPE_MAP } from './hooks/usePropertyManagement';
import {
  PropertyStatsRow,
  PropertyCardGrid,
  PropertyModals,
  ViewToggle,
  ToggleButton,
} from './propertyManagement';

// Re-export decomposed modules and companion members for full backwards compatibility
export * from './propertyManagement';
export type { Property, BadgeVariant, PropertyFormData } from './hooks/usePropertyManagement';
export { STATUS_MAP, TYPE_MAP, usePropertyManagement } from './hooks/usePropertyManagement';

const PropertyManagementPage: FC = () => {
  useDocumentTitle('Property Management');
  const {
    filteredProperties,
    paginatedProperties,
    stats,
    loading,
    error,
    search,
    statusFilter,
    typeFilter,
    viewMode,
    currentPage,
    showCreateModal,
    showEditModal,
    showDeleteConfirm,
    selectedProperty,
    formData,
    setFormData,
    setViewMode,
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
    handleTypeFilterChange,
    setCurrentPage,
    retryFetch,
    goBack,
    formatCurrency,
  } = usePropertyManagement();

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader>
        <div>
          <BackLink onClick={goBack}>← Back to CRM Hub</BackLink>
          <PageTitle>🏠 Property Portfolio</PageTitle>
        </div>
        <PrimaryButton onClick={openCreateModal}>➕ Add Property</PrimaryButton>
      </PageHeader>

      {/* Loading & Error States */}
      {loading && <LoadingBanner>⏳ Loading properties from server...</LoadingBanner>}
      {error && (
        <ErrorBanner>
          <span>⚠️ {error} — showing fallback data</span>
          <SecondaryButton onClick={retryFetch}>Retry</SecondaryButton>
        </ErrorBanner>
      )}

      {/* Stats */}
      <PropertyStatsRow stats={stats} formatCurrency={formatCurrency} />

      {/* Filters */}
      <ActionBar>
        <SearchInput
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
        />
        <FilterSelect value={statusFilter} onChange={e => handleStatusFilterChange(e.target.value)}>
          <option value="all">All Status</option>
          {Object.entries(STATUS_MAP).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect value={typeFilter} onChange={e => handleTypeFilterChange(e.target.value)}>
          <option value="all">All Types</option>
          {Object.entries(TYPE_MAP).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </FilterSelect>
        <ViewToggle>
          <ToggleButton $active={viewMode === 'grid'} onClick={() => setViewMode('grid')}>
            Grid
          </ToggleButton>
          <ToggleButton $active={viewMode === 'list'} onClick={() => setViewMode('list')}>
            List
          </ToggleButton>
        </ViewToggle>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-888, #888)', marginLeft: 'auto' }}>
          {filteredProperties.length} propert{filteredProperties.length !== 1 ? 'ies' : 'y'}
        </span>
      </ActionBar>

      {/* Property Grid */}
      <PropertyCardGrid
        properties={paginatedProperties}
        search={search}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        formatCurrency={formatCurrency}
        onEdit={handleEdit}
        onDelete={confirmDelete}
      />

      {/* Pagination */}
      {filteredProperties.length > ITEMS_PER_PAGE && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredProperties.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </PaginationWrapper>
      )}

      {/* Modals: Create, Edit, Delete */}
      <PropertyModals
        showCreateModal={showCreateModal}
        showEditModal={showEditModal}
        showDeleteConfirm={showDeleteConfirm}
        selectedProperty={selectedProperty}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onCloseCreateModal={closeCreateModal}
        onCloseEditModal={closeEditModal}
        onCloseDeleteModal={closeDeleteModal}
        onCreate={handleCreate}
        onSaveEdit={handleSaveEdit}
        onDelete={handleDelete}
      />
    </PageContainer>
  );
};

export default PropertyManagementPage;
