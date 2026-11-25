import React from 'react';
import { Modal } from '../../../shared/components/ui/Modal';
import { ModalFooter, PrimaryButton, SecondaryButton, DangerButton } from '../styles/CrmPageStyles';
import type { Client, ClientFormData } from '../hooks/useClientManagement';

interface ClientModalsProps {
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteConfirm: boolean;
  selectedClient: Client | null;
  formData: ClientFormData;
  loading: boolean;
  renderForm: () => React.ReactNode;
  closeCreateModal: () => void;
  closeEditModal: () => void;
  closeDeleteModal: () => void;
  handleCreate: () => void;
  handleSaveEdit: () => void;
  handleDelete: () => void;
}

export const ClientModals: React.FC<ClientModalsProps> = ({
  showCreateModal,
  showEditModal,
  showDeleteConfirm,
  selectedClient,
  formData,
  loading,
  renderForm,
  closeCreateModal,
  closeEditModal,
  closeDeleteModal,
  handleCreate,
  handleSaveEdit,
  handleDelete,
}) => {
  return (
    <>
      {showCreateModal && (
        <Modal
          title="Add New Client"
          isOpen={showCreateModal}
          onClose={closeCreateModal}
          size="large"
        >
          {renderForm()}
          <ModalFooter>
            <SecondaryButton onClick={closeCreateModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleCreate} disabled={!formData.name.trim() || loading}>
              {loading ? '⏳ Creating...' : 'Add Client'}
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
        <Modal
          title={`Edit Client: ${selectedClient.name}`}
          isOpen={showEditModal}
          onClose={closeEditModal}
          size="large"
        >
          {renderForm()}
          <ModalFooter>
            <SecondaryButton onClick={closeEditModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSaveEdit} disabled={!formData.name.trim() || loading}>
              {loading ? '⏳ Saving...' : 'Save Changes'}
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedClient && (
        <Modal
          title="Delete Client"
          isOpen={showDeleteConfirm}
          onClose={closeDeleteModal}
          size="small"
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            Are you sure you want to delete <strong>{selectedClient.name}</strong>? This action
            cannot be undone.
          </p>
          <ModalFooter>
            <SecondaryButton onClick={closeDeleteModal}>Cancel</SecondaryButton>
            <DangerButton onClick={handleDelete} disabled={loading}>
              {loading ? '⏳ Deleting...' : 'Delete Client'}
            </DangerButton>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
