/**
 * CRM Transaction Management Page
 * Full transaction management with pipeline visualization and CRUD.
 * Route: /owner/crm/transactions
 */

import React, { FC } from 'react';
import { Badge, Pagination } from '../../components/ui';
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
  DangerButton,
  Table,
  Th,
  Td,
  Tr,
  EmptyState,
  PaginationWrapper,
  LoadingBanner,
  ErrorBanner,
} from './styles/CrmPageStyles';
import {
  useTransactionManagement,
  STATUS_CONFIG,
  TYPE_LABELS,
  PIPELINE_STAGES,
} from './hooks/useTransactionManagement';
import type { Transaction } from './hooks/useTransactionManagement';
import {
  StatsRow,
  StatCard,
  StatValue,
  StatLabel,
  PipelineBar,
  PipelineStage,
  PipelineCount,
  PipelineArrow,
  TransactionModals,
} from './components/TransactionModals';

const TransactionManagementPage: FC = () => {
  useDocumentTitle('Transaction Management');
  const {
    filteredTransactions,
    paginatedTransactions,
    summaryStats,
    pipelineCounts,
    loading,
    error,
    search,
    statusFilter,
    typeFilter,
    currentPage,
    showCreateModal,
    showEditModal,
    showDeleteConfirm,
    selectedTransaction,
    formData,
    setFormData,
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
    getStatusBadgeVariant,
    formatCurrency,
    formatDate,
  } = useTransactionManagement();

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <BackLink onClick={goBack}>← Back to CRM Hub</BackLink>
          <PageTitle>📋 Transaction Management</PageTitle>
        </div>
        <PrimaryButton onClick={openCreateModal}>➕ New Transaction</PrimaryButton>
      </PageHeader>

      {loading && <LoadingBanner>⏳ Loading transactions from server...</LoadingBanner>}
      {error && (
        <ErrorBanner>
          <span>⚠️ {error} — showing cached data</span>
          <SecondaryButton onClick={retryFetch}>Retry</SecondaryButton>
        </ErrorBanner>
      )}

      <StatsRow>
        <StatCard $color="#3B82F6">
          <StatValue>{summaryStats.total}</StatValue>
          <StatLabel>Total Transactions</StatLabel>
        </StatCard>
        <StatCard $color="#F59E0B">
          <StatValue>{summaryStats.pending}</StatValue>
          <StatLabel>Pending</StatLabel>
        </StatCard>
        <StatCard $color="#10B981">
          <StatValue>{summaryStats.completed}</StatValue>
          <StatLabel>Completed</StatLabel>
        </StatCard>
        <StatCard $color="#8B5CF6">
          <StatValue>{formatCurrency(summaryStats.totalValue)}</StatValue>
          <StatLabel>Total Value</StatLabel>
        </StatCard>
      </StatsRow>

      <PipelineBar>
        {PIPELINE_STAGES.map((stage, idx) => (
          <React.Fragment key={stage}>
            {idx > 0 && <PipelineArrow>→</PipelineArrow>}
            <PipelineStage
              $active={statusFilter === stage}
              $color={STATUS_CONFIG[stage]?.color || '#6B7280'}
              onClick={() => handleStatusFilterChange(statusFilter === stage ? 'all' : stage)}
            >
              <PipelineCount>{pipelineCounts[stage] || 0}</PipelineCount>
              {STATUS_CONFIG[stage]?.label || stage}
            </PipelineStage>
          </React.Fragment>
        ))}
      </PipelineBar>

      <ActionBar>
        <SearchInput
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
        />
        <FilterSelect value={statusFilter} onChange={e => handleStatusFilterChange(e.target.value)}>
          <option value="all">All Status</option>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>
              {cfg.label}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect value={typeFilter} onChange={e => handleTypeFilterChange(e.target.value)}>
          <option value="all">All Types</option>
          {Object.entries(TYPE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </FilterSelect>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
          {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}{' '}
          found
        </span>
      </ActionBar>

      <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
        <Table aria-label="Transactions list">
          <thead>
            <tr>
              <Th>Type</Th>
              <Th>Property</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Client</Th>
              <Th>Agent</Th>
              <Th>Closing Date</Th>
              <Th>Commission</Th>
              <Th>KYC / RERA</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction: Transaction) => (
                <Tr key={transaction.id} onClick={() => handleEdit(transaction)}>
                  <Td>{TYPE_LABELS[transaction.type || ''] || transaction.type || '—'}</Td>
                  <Td style={{ fontWeight: 500 }}>{transaction.property_title || '—'}</Td>
                  <Td>{formatCurrency(transaction.amount)}</Td>
                  <Td>
                    <Badge variant={getStatusBadgeVariant(transaction.status || '')} size="small">
                      {STATUS_CONFIG[transaction.status || '']?.label || transaction.status || '—'}
                    </Badge>
                  </Td>
                  <Td>{transaction.client_name || '—'}</Td>
                  <Td>{transaction.agent_name || '—'}</Td>
                  <Td>{formatDate(transaction.closing_date)}</Td>
                  <Td>{transaction.commission ? formatCurrency(transaction.commission) : '—'}</Td>
                  <Td>
                    <Badge
                      variant={transaction.rera_status === 'Forms Cleared' ? 'success' : 'warning'}
                      size="small"
                    >
                      {transaction.rera_status || 'Forms Pending'}
                    </Badge>
                  </Td>
                  <Td onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <SecondaryButton onClick={() => handleEdit(transaction)}>
                        Edit
                      </SecondaryButton>
                      <DangerButton onClick={() => confirmDelete(transaction)}>Delete</DangerButton>
                    </div>
                  </Td>
                </Tr>
              ))
            ) : (
              <tr>
                <Td colSpan={10}>
                  <EmptyState>
                    {search || statusFilter !== 'all' || typeFilter !== 'all'
                      ? 'No transactions match your filters'
                      : 'No transactions yet — create your first one!'}
                  </EmptyState>
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {filteredTransactions.length > ITEMS_PER_PAGE && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredTransactions.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </PaginationWrapper>
      )}

      <TransactionModals
        showCreateModal={showCreateModal}
        showEditModal={showEditModal}
        showDeleteConfirm={showDeleteConfirm}
        selectedTransaction={selectedTransaction}
        formData={formData}
        setFormData={setFormData}
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

export default TransactionManagementPage;
