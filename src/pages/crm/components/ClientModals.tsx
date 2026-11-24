import React from 'react';
import { Modal, ModalFooter } from '../../shared/components/ui/Modal';
import { PrimaryButton, SecondaryButton, DangerButton } from '../../shared/components/ui/Button';
import { FormField } from '../../shared/components/ui/FormField';
import { ClientFormValues } from './hooks/useClientManagement';

interface ClientModalsProps {
  isCreateModalOpen: boolean;
  closeCreateModal: () => void;
  formValues: ClientFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<ClientFormValues>>;
  formErrors: Record<string, string>;
  handleCreateClient: () => void;
  isEditModalOpen: boolean;
  closeEditModal: () => void;
  handleUpdateClient: () => void;
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  handleDeleteClient: () => void;
}

export const ClientModals: React.FC<ClientModalsProps> = ({
  isCreateModalOpen,
  closeCreateModal,
  formValues,
  setFormValues,
  formErrors,
  handleCreateClient,
  isEditModalOpen,
  closeEditModal,
  handleUpdateClient,
  isDeleteModalOpen,
  closeDeleteModal,
  handleDeleteClient,
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
    </PageContainer>
    </>
  );
};
