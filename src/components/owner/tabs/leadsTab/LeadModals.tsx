import React from 'react';
import type { Lead } from '../types';
import type { ModalMode } from './constants';
import {
  ModalOverlay,
  Modal,
  ModalSmall,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormGrid,
  FormGroup,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  WarningText,
} from '../TabStylesComponents';

interface LeadModalsProps {
  modalMode: ModalMode;
  editTarget: Lead | null;
  form: Omit<Lead, 'id' | 'createdAt'>;
  setForm: React.Dispatch<React.SetStateAction<Omit<Lead, 'id' | 'createdAt'>>>;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export const LeadModals: React.FC<LeadModalsProps> = ({
  modalMode,
  editTarget,
  form,
  setForm,
  onClose,
  onSave,
  onDelete,
}) => {
  if (modalMode === 'none') return null;

  return (
    <>
      {(modalMode === 'add' || modalMode === 'edit') && (
        <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
          <Modal>
            <ModalHeader>
              <h3 id="lead-modal-title">{modalMode === 'add' ? 'Add New Lead' : 'Edit Lead'}</h3>
              <ModalCloseButton onClick={onClose} aria-label="Close">
                ✕
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Khalid Al Maktoum"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+971 50 000 0000"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Source</label>
                  <select
                    value={form.source}
                    onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                  >
                    <option value="website">Website</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="chatbot">Chatbot</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Interest / Property Type</label>
                  <input
                    type="text"
                    value={form.interest}
                    onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                    placeholder="e.g. 3BR Villa in Palm Jumeirah"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Priority</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="lost">Lost</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Assigned Agent</label>
                  <input
                    type="text"
                    value={form.agent}
                    onChange={e => setForm(f => ({ ...f, agent: e.target.value }))}
                    placeholder="Agent name (optional)"
                  />
                </FormGroup>
              </FormGrid>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
              <PrimaryButton onClick={onSave} disabled={!form.name.trim()}>
                {modalMode === 'add' ? 'Add Lead' : 'Save Changes'}
              </PrimaryButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}

      {modalMode === 'delete' && editTarget && (
        <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="del-lead-title">
          <ModalSmall>
            <ModalHeader>
              <h3 id="del-lead-title">Remove Lead</h3>
              <ModalCloseButton onClick={onClose} aria-label="Close">
                ✕
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <p>
                Remove <strong>{editTarget.name}</strong> from your leads?
              </p>
              <WarningText>This action cannot be undone.</WarningText>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
              <DangerButton onClick={onDelete}>Remove</DangerButton>
            </ModalFooter>
          </ModalSmall>
        </ModalOverlay>
      )}
    </>
  );
};
