import React, { useState, useCallback, useEffect } from 'react';
import type { PropertiesTabProps, Property } from './types';
import {
  TabContainer,
  TabHeader,
  TabTitle,
  HeaderActions,
  PrimaryButton,
  SecondaryButton,
  FilterRow,
  FilterSelect,
} from './TabStylesComponents';
import {
  EMPTY_FORM,
  ITEMS_PER_PAGE,
  MOCK_PROPERTIES,
  type ModalMode,
  type PropertyFormState,
} from './propertiesTab/constants';
import {
  LoadingState,
  LoadingSpinner,
  ErrorState,
  ErrorIcon,
  SearchInputContainer,
  SearchInputIcon,
  SearchInputField,
  CrudToast,
} from './propertiesTab/styles';
import { PropertiesTable } from './propertiesTab/PropertiesTable';
import { PropertyModals } from './propertiesTab/PropertyModals';

const PropertiesTab: React.FC<PropertiesTabProps> = ({ data, loading, error, onAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [localProperties, setLocalProperties] = useState<Property[]>(
    () => data?.properties ?? MOCK_PROPERTIES
  );
  const [modalMode, setModalMode] = useState<ModalMode>('none');
  const [editTarget, setEditTarget] = useState<Property | null>(null);
  const [form, setForm] = useState<PropertyFormState>(EMPTY_FORM);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = useCallback(() => {
    onAction?.('addProperty');
    setForm(EMPTY_FORM);
    setEditTarget(null);
    setModalMode('add');
  }, [onAction]);

  const openEdit = useCallback(
    (prop: Property) => {
      onAction?.('editProperty', prop.id);
      const { id: _id, code: _code, ...rest } = prop;
      setForm(rest);
      setEditTarget(prop);
      setModalMode('edit');
    },
    [onAction]
  );

  const openDelete = useCallback(
    (prop: Property) => {
      onAction?.('deleteProperty', prop.id);
      setEditTarget(prop);
      setModalMode('delete');
    },
    [onAction]
  );

  const handleView = useCallback(
    (prop: Property) => {
      onAction?.('viewProperty', prop.id);
    },
    [onAction]
  );

  const closeModal = () => {
    setModalMode('none');
    setEditTarget(null);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.location.trim() || form.price <= 0) return;
    if (modalMode === 'add') {
      const nextId = Math.max(0, ...localProperties.map(p => p.id)) + 1;
      const code = `WC-NEW-${String(nextId).padStart(3, '0')}`;
      setLocalProperties(prev => [...prev, { id: nextId, code, ...form }]);
      showToast('✅ Property added successfully');
    } else if (modalMode === 'edit' && editTarget) {
      setLocalProperties(prev => prev.map(p => (p.id === editTarget.id ? { ...p, ...form } : p)));
      showToast('✅ Property updated successfully');
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!editTarget) return;
    setLocalProperties(prev => prev.filter(p => p.id !== editTarget.id));
    showToast('🗑️ Property deleted');
    closeModal();
  };

  if (loading) {
    return (
      <TabContainer>
        <LoadingState role="status" aria-label="Loading properties">
          <LoadingSpinner />
          <p>Loading properties...</p>
        </LoadingState>
      </TabContainer>
    );
  }

  if (error) {
    return (
      <TabContainer>
        <ErrorState role="alert">
          <ErrorIcon>⚠️</ErrorIcon>
          <p>Failed to load properties: {error}</p>
          <SecondaryButton onClick={() => onAction?.('retryFetch')}>Retry</SecondaryButton>
        </ErrorState>
      </TabContainer>
    );
  }

  const filteredProperties = localProperties.filter(prop => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      prop.title.toLowerCase().includes(q) ||
      prop.code.toLowerCase().includes(q) ||
      prop.location.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || prop.status === statusFilter;
    const matchesType = typeFilter === 'all' || prop.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredProperties.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const isFormValid = form.title.trim() !== '' && form.location.trim() !== '' && form.price > 0;

  return (
    <TabContainer>
      {toast && <CrudToast role="status">{toast}</CrudToast>}

      <TabHeader>
        <TabTitle>Property Management</TabTitle>
        <HeaderActions>
          <PrimaryButton onClick={openAdd}>
            <span>➕</span> Add Property
          </PrimaryButton>
        </HeaderActions>
      </TabHeader>

      <FilterRow>
        <SearchInputContainer>
          <SearchInputIcon>🔍</SearchInputIcon>
          <SearchInputField
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </SearchInputContainer>
        <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="under_contract">Under Contract</option>
          <option value="sold">Sold</option>
          <option value="off_market">Off Market</option>
        </FilterSelect>
        <FilterSelect value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </FilterSelect>
      </FilterRow>

      <PropertiesTable
        filteredProperties={filteredProperties}
        paginated={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onAdd={openAdd}
        onView={handleView}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <PropertyModals
        modalMode={modalMode}
        editTarget={editTarget}
        form={form}
        isFormValid={isFormValid}
        onFormChange={setForm}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </TabContainer>
  );
};

export default React.memo(PropertiesTab);
