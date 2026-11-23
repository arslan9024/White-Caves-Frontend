import React, { FC } from 'react';
import { Modal } from '../../../shared/components/ui/Modal';
import { PrimaryButton, SecondaryButton, DangerButton, ModalFooter } from '../styles/CrmPageStyles';
import { LeadForm } from './LeadForm';
import type { Lead, LeadFormData } from '../hooks/useLeadManagement';

export interface LeadModalsProps {
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteConfirm: boolean;
  selectedLead: Lead | null;
  formData: LeadFormData;
  setFormData: React.Dispatch<React.SetStateAction<LeadFormData>>;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  loading: boolean;
  closeCreateModal: () => void;
  closeEditModal: () => void;
  closeDeleteModal: () => void;
  handleCreate: () => void;
  handleSaveEdit: () => void;
  handleDelete: () => void;
}

export const LeadModals: FC<LeadModalsProps> = ({
  showCreateModal,
  showEditModal,
  showDeleteConfirm,
  selectedLead,
  formData,
  setFormData,
  errorMessage,
  setErrorMessage,
  loading,
  closeCreateModal,
  closeEditModal,
  closeDeleteModal,
  handleCreate,
  handleSaveEdit,
  handleDelete,
}) => {
  return (
    <>
      {/* Create Lead Modal */}
      {showCreateModal && (
        <Modal
          title="Create New Lead"
          isOpen={showCreateModal}
          onClose={closeCreateModal}
          size="large"
        >
          <LeadForm
            formData={formData}
            setFormData={setFormData}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <ModalFooter>
            <SecondaryButton onClick={closeCreateModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleCreate} disabled={!formData.name.trim() || loading}>
              {loading ? '⏳ Creating...' : 'Create Lead'}
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      )}

      {/* Edit Lead Modal */}
      {showEditModal && selectedLead && (
        <Modal
          title={`Edit Lead: ${selectedLead.name}`}
          isOpen={showEditModal}
          onClose={closeEditModal}
          size="large"
        >
          <LeadForm
            formData={formData}
            setFormData={setFormData}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <ModalFooter>
            <SecondaryButton onClick={closeEditModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSaveEdit} disabled={!formData.name.trim() || loading}>
              {loading ? '⏳ Saving...' : 'Save Changes'}
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedLead && (
        <Modal
          title="Delete Lead"
          isOpen={showDeleteConfirm}
          onClose={closeDeleteModal}
          size="small"
        >
          <p style={{ color: 'var(--color-555, #555)', fontSize: '0.9rem' }}>
            Are you sure you want to delete <strong>{selectedLead.name}</strong>? This action cannot
            be undone.
          </p>
          <ModalFooter>
            <SecondaryButton onClick={closeDeleteModal}>Cancel</SecondaryButton>
            <DangerButton onClick={handleDelete} disabled={loading}>
              {loading ? '⏳ Deleting...' : 'Delete Lead'}
            </DangerButton>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
