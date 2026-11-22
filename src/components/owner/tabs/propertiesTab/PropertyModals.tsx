import React from 'react';
import type { Property } from '../types';
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  ModalOverlay,
  FormGrid,
  FormGroup,
} from '../TabStylesComponents';
import type { ModalMode, PropertyFormState } from './constants';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  WarningText,
} from './styles';

interface PropertyModalsProps {
  modalMode: ModalMode;
  editTarget: Property | null;
  form: PropertyFormState;
  isFormValid: boolean;
  onFormChange: React.Dispatch<React.SetStateAction<PropertyFormState>>;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export const PropertyModals: React.FC<PropertyModalsProps> = ({
  modalMode,
  editTarget,
  form,
  isFormValid,
  onFormChange,
  onClose,
  onSave,
  onDelete,
}) => (
  <>
    {(modalMode === 'add' || modalMode === 'edit') && (
      <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="prop-modal-title">
        <ModalContent>
          <ModalHeader>
            <h3 id="prop-modal-title">
              {modalMode === 'add' ? 'Add New Property' : 'Edit Property'}
            </h3>
            <ModalCloseButton onClick={onClose} aria-label="Close">
              ✕
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <FormGrid>
              <FormGroup>
                <label>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => onFormChange(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Marina View Apartment"
                />
              </FormGroup>
              <FormGroup>
                <label>Type</label>
                <select
                  value={form.type}
                  onChange={e => onFormChange(f => ({ ...f, type: e.target.value }))}
                >
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Townhouse</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => onFormChange(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Dubai Marina"
                />
              </FormGroup>
              <FormGroup>
                <label>Price (AED) *</label>
                <input
                  type="number"
                  min="0"
                  value={form.price || ''}
                  onChange={e => onFormChange(f => ({ ...f, price: Number(e.target.value) }))}
                  placeholder="e.g. 3200000"
                />
              </FormGroup>
              <FormGroup>
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={e => onFormChange(f => ({ ...f, status: e.target.value }))}
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="under_contract">Under Contract</option>
                  <option value="sold">Sold</option>
                  <option value="off_market">Off Market</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Agent</label>
                <input
                  type="text"
                  value={form.agent ?? ''}
                  onChange={e => onFormChange(f => ({ ...f, agent: e.target.value || null }))}
                  placeholder="Agent name (optional)"
                />
              </FormGroup>
              <FormGroup>
                <label>Bedrooms</label>
                <input
                  type="number"
                  min="0"
                  value={form.bedrooms ?? ''}
                  onChange={e => onFormChange(f => ({ ...f, bedrooms: Number(e.target.value) }))}
                />
              </FormGroup>
              <FormGroup>
                <label>Bathrooms</label>
                <input
                  type="number"
                  min="0"
                  value={form.bathrooms ?? ''}
                  onChange={e => onFormChange(f => ({ ...f, bathrooms: Number(e.target.value) }))}
                />
              </FormGroup>
              <FormGroup>
                <label>Area (sqft)</label>
                <input
                  type="number"
                  min="0"
                  value={form.area ?? ''}
                  onChange={e => onFormChange(f => ({ ...f, area: Number(e.target.value) }))}
                />
              </FormGroup>
            </FormGrid>
          </ModalBody>
          <ModalFooter>
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={onSave} disabled={!isFormValid}>
              {modalMode === 'add' ? 'Add Property' : 'Save Changes'}
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    )}

    {modalMode === 'delete' && editTarget && (
      <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="del-modal-title">
        <ModalContent small>
          <ModalHeader>
            <h3 id="del-modal-title">Delete Property</h3>
            <ModalCloseButton onClick={onClose} aria-label="Close">
              ✕
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete <strong>{editTarget.title}</strong>?
            </p>
            <WarningText>This action cannot be undone.</WarningText>
          </ModalBody>
          <ModalFooter>
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <DangerButton onClick={onDelete}>Delete</DangerButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    )}
  </>
);
