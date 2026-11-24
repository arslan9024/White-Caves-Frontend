import React, { FC } from 'react';
import { Modal } from '../../../shared/components/ui/Modal';
import { PrimaryButton, SecondaryButton, DangerButton, ModalFooter } from '../styles/CrmPageStyles';
import type { Property, PropertyFormData } from '../hooks/usePropertyManagement';
import { PropertyFormFields } from './PropertyFormFields';

export interface PropertyModalsProps {
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteConfirm: boolean;
  selectedProperty: Property | null;
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  loading: boolean;
  onCloseCreateModal: () => void;
  onCloseEditModal: () => void;
  onCloseDeleteModal: () => void;
  onCreate: () => void;
  onSaveEdit: () => void;
  onDelete: () => void;
}

export const PropertyModals: FC<PropertyModalsProps> = ({
  showCreateModal,
  showEditModal,
  showDeleteConfirm,
  selectedProperty,
  formData,
  setFormData,
  loading,
  onCloseCreateModal,
  onCloseEditModal,
  onCloseDeleteModal,
  onCreate,
  onSaveEdit,
  onDelete,
}) => {
  return (
    <>
      {/* Create Property Modal */}
      {showCreateModal && (
        <Modal
          title="Add New Property"
          isOpen={showCreateModal}
          onClose={onCloseCreateModal}
          size="large"
        >
          <PropertyFormFields formData={formData} setFormData={setFormData} />
          <ModalFooter>
            <SecondaryButton onClick={onCloseCreateModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={onCreate} disabled={!formData.title.trim() || loading}>
              {loading ? '⏳ Adding...' : 'Add Property'}
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      )}

      {/* Edit Property Modal */}
      {showEditModal && selectedProperty && (
        <Modal
          title={`Edit: ${selectedProperty.title}`}
          isOpen={showEditModal}
          onClose={onCloseEditModal}
          size="large"
        >
          <PropertyFormFields formData={formData} setFormData={setFormData} />
          <ModalFooter>
            <SecondaryButton onClick={onCloseEditModal}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={onSaveEdit}
              disabled={!formData.title.trim() || !formData.location.trim() || loading}
            >
              {loading ? '⏳ Saving...' : 'Save Changes'}
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && selectedProperty && (
        <Modal
          title="Delete Property"
          isOpen={showDeleteConfirm}
          onClose={onCloseDeleteModal}
          size="small"
        >
          <p style={{ color: 'var(--color-555, #555)', fontSize: '0.9rem' }}>
            Are you sure you want to delete <strong>{selectedProperty.title}</strong>? This action
            cannot be undone.
          </p>
          <ModalFooter>
            <SecondaryButton onClick={onCloseDeleteModal}>Cancel</SecondaryButton>
            <DangerButton onClick={onDelete} disabled={loading}>
              {loading ? '⏳ Deleting...' : 'Delete Property'}
            </DangerButton>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
