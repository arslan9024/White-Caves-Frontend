import React, { useState, useEffect, useCallback } from 'react';
import type { ContractsTabProps, Contract } from './types';
import {
  TabContainer,
  TabHeader,
  TabTitle,
  HeaderActions,
  PrimaryButton,
  Toast,
  LoadingSpinner,
  LoadingState,
} from './TabStylesComponents';
import {
  EMPTY_FORM,
  ITEMS_PER_PAGE,
  MOCK_CONTRACTS,
  computeContractStats,
  contractToFormState,
  createDefaultContractNumber,
} from './contractsTab/contractsData';
import type { ContractFormState, ModalMode } from './contractsTab/contractsData';
import ContractsStatsAndFilters from './contractsTab/ContractsStatsAndFilters';
import ContractsTable from './contractsTab/ContractsTable';
import ContractModals from './contractsTab/ContractModals';

const ContractsTab: React.FC<ContractsTabProps> = ({ data, loading }) => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [localContracts, setLocalContracts] = useState<Contract[]>(() =>
    data?.contracts && data.contracts.length > 0 ? data.contracts : MOCK_CONTRACTS
  );
  const [modalMode, setModalMode] = useState<ModalMode>('none');
  const [editTarget, setEditTarget] = useState<Contract | null>(null);
  const [form, setForm] = useState<ContractFormState>(EMPTY_FORM);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = useCallback(() => {
    setForm({
      ...EMPTY_FORM,
      contractNumber: createDefaultContractNumber(localContracts.length),
    });
    setEditTarget(null);
    setModalMode('add');
  }, [localContracts.length]);

  const openEdit = useCallback((contract: Contract) => {
    setForm(contractToFormState(contract));
    setEditTarget(contract);
    setModalMode('edit');
  }, []);

  const openDelete = useCallback((contract: Contract) => {
    setEditTarget(contract);
    setModalMode('delete');
  }, []);

  const closeModal = () => {
    setModalMode('none');
    setEditTarget(null);
  };

  const handleSave = () => {
    if (!form.contractNumber.trim() || !form.property.trim() || form.amount <= 0) return;
    if (modalMode === 'add') {
      const nextId = Math.max(0, ...localContracts.map(c => c.id)) + 1;
      setLocalContracts(prev => [...prev, { id: nextId, ...form }]);
      showToast('✅ Contract added successfully');
    } else if (modalMode === 'edit' && editTarget) {
      setLocalContracts(prev => prev.map(c => (c.id === editTarget.id ? { ...c, ...form } : c)));
      showToast('✅ Contract updated');
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!editTarget) return;
    setLocalContracts(prev => prev.filter(c => c.id !== editTarget.id));
    showToast('🗑️ Contract removed');
    closeModal();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, statusFilter]);

  if (loading) {
    return (
      <TabContainer>
        <LoadingState role="status" aria-label="Loading contracts">
          <LoadingSpinner />
          <p>Loading contracts...</p>
        </LoadingState>
      </TabContainer>
    );
  }

  const filteredContracts = localContracts.filter(contract => {
    const matchesType = typeFilter === 'all' || contract.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE);
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const contractStats = computeContractStats(localContracts);

  return (
    <TabContainer>
      {toast && <Toast role="status">{toast}</Toast>}

      <TabHeader>
        <TabTitle>Contract Management</TabTitle>
        <HeaderActions>
          <PrimaryButton onClick={openAdd}>
            <span>📄</span> New Contract
          </PrimaryButton>
        </HeaderActions>
      </TabHeader>

      <ContractsStatsAndFilters
        stats={contractStats}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        onTypeFilterChange={setTypeFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <ContractsTable
        paginatedContracts={paginatedContracts}
        totalFilteredCount={filteredContracts.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <ContractModals
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

export default React.memo(ContractsTab);
