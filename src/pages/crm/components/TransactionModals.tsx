import React, { FC } from 'react';
import styled from 'styled-components';
import { Modal } from '../../../shared/components/ui/Modal';
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormRow,
  ModalFooter,
} from '../styles/CrmPageStyles';
import {
  STATUS_CONFIG,
  TYPE_LABELS,
  type Transaction,
  type TransactionFormData,
} from '../hooks/useTransactionManagement';

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div<{ $color: string }>`
  background: #0f0f0f;
  border: 1px solid #2c2c2c;
  border-radius: 12px;
  padding: 1.25rem;
  border-left: 4px solid ${props => props.$color};
`;

export const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
`;

export const PipelineBar = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 0.5rem;
  border: 1px solid #2c2c2c;
`;

export const PipelineStage = styled.button<{ $active: boolean; $color: string }>`
  flex: 1;
  background: ${props => (props.$active ? props.$color : 'transparent')};
  color: ${props => (props.$active ? '#0f0f0f' : 'rgba(255, 255, 255, 0.7)')};
  border: none;
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  &:hover {
    background: ${props => (props.$active ? props.$color : '#2c2c2c')};
  }
`;

export const PipelineCount = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
`;

export const PipelineArrow = styled.span`
  color: #ccc;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

interface TransactionFormFieldsProps {
  formData: TransactionFormData;
  setFormData: React.Dispatch<React.SetStateAction<TransactionFormData>>;
}

export const TransactionFormFields: FC<TransactionFormFieldsProps> = ({ formData, setFormData }) => (
  <>
    <FormRow>
      <FormGroup>
        <FormLabel>Type *</FormLabel>
        <FormSelect
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
        >
          {Object.entries(TYPE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel>Status</FormLabel>
        <FormSelect
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
        >
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>
              {cfg.label}
            </option>
          ))}
        </FormSelect>
      </FormGroup>
    </FormRow>
    <FormRow>
      <FormGroup>
        <FormLabel>Amount (AED) *</FormLabel>
        <FormInput
          type="number"
          value={formData.amount}
          onChange={e => setFormData({ ...formData, amount: e.target.value })}
          placeholder="e.g. 5000000"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Closing Date</FormLabel>
        <FormInput
          type="date"
          value={formData.closing_date}
          onChange={e => setFormData({ ...formData, closing_date: e.target.value })}
        />
      </FormGroup>
    </FormRow>
    <FormRow>
      <FormGroup>
        <FormLabel>Property</FormLabel>
        <FormInput
          type="text"
          value={formData.property_title}
          onChange={e => setFormData({ ...formData, property_title: e.target.value })}
          placeholder="e.g. Palm Jumeirah Villa"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Client</FormLabel>
        <FormInput
          type="text"
          value={formData.client_name}
          onChange={e => setFormData({ ...formData, client_name: e.target.value })}
          placeholder="e.g. Ahmed Al Rashid"
        />
      </FormGroup>
    </FormRow>
    <FormGroup>
      <FormLabel>Agent</FormLabel>
      <FormInput
        type="text"
        value={formData.agent_name}
        onChange={e => setFormData({ ...formData, agent_name: e.target.value })}
        placeholder="e.g. Sarah Johnson"
      />
    </FormGroup>
    <FormGroup>
      <FormLabel>Notes</FormLabel>
      <FormTextarea
        value={formData.notes}
        onChange={e => setFormData({ ...formData, notes: e.target.value })}
        placeholder="Additional notes about this transaction..."
      />
    </FormGroup>
  </>
);

interface TransactionModalsProps {
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteConfirm: boolean;
  selectedTransaction: Transaction | null;
  formData: TransactionFormData;
  setFormData: React.Dispatch<React.SetStateAction<TransactionFormData>>;
  loading: boolean;
  closeCreateModal: () => void;
  closeEditModal: () => void;
  closeDeleteModal: () => void;
  handleCreate: () => void;
  handleSaveEdit: () => void;
  handleDelete: () => void;
}

export const TransactionModals: FC<TransactionModalsProps> = ({
  showCreateModal,
  showEditModal,
  showDeleteConfirm,
  selectedTransaction,
  formData,
  setFormData,
  loading,
  closeCreateModal,
  closeEditModal,
  closeDeleteModal,
  handleCreate,
  handleSaveEdit,
  handleDelete,
}) => (
  <>
    {showCreateModal && (
      <Modal
        title="Create New Transaction"
        isOpen={showCreateModal}
        onClose={closeCreateModal}
        size="large"
      >
        <TransactionFormFields formData={formData} setFormData={setFormData} />
        <ModalFooter>
          <SecondaryButton onClick={closeCreateModal}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleCreate} disabled={!formData.amount || loading}>
            {loading ? '⏳ Creating...' : 'Create Transaction'}
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )}

    {showEditModal && selectedTransaction && (
      <Modal
        title="Edit Transaction"
        isOpen={showEditModal}
        onClose={closeEditModal}
        size="large"
      >
        <TransactionFormFields formData={formData} setFormData={setFormData} />
        <ModalFooter>
          <SecondaryButton onClick={closeEditModal}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSaveEdit} disabled={!formData.amount || loading}>
            {loading ? '⏳ Saving...' : 'Save Changes'}
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )}

    {showDeleteConfirm && selectedTransaction && (
      <Modal
        title="Delete Transaction"
        isOpen={showDeleteConfirm}
        onClose={closeDeleteModal}
        size="small"
      >
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
          Are you sure you want to delete this transaction? This action cannot be undone.
        </p>
        <ModalFooter>
          <SecondaryButton onClick={closeDeleteModal}>Cancel</SecondaryButton>
          <DangerButton onClick={handleDelete} disabled={loading}>
            {loading ? '⏳ Deleting...' : 'Delete Transaction'}
          </DangerButton>
        </ModalFooter>
      </Modal>
    )}
  </>
);
