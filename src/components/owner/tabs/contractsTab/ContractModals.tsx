import React from 'react';
import type { Contract } from '../types';
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  ModalOverlay,
  Modal,
  ModalSmall,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  WarningText,
  FormGrid,
  FormGroup,
} from '../TabStylesComponents';
import type { ContractFormState, ModalMode } from './contractsData';

interface ContractModalsProps {
  modalMode: ModalMode;
  editTarget: Contract | null;
  form: ContractFormState;
  setForm: React.Dispatch<React.SetStateAction<ContractFormState>>;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const ContractModals: React.FC<ContractModalsProps> = ({
  modalMode,
  editTarget,
  form,
  setForm,
  onClose,
  onSave,
  onDelete,
}) => {
  const isSaveDisabled = !form.contractNumber.trim() || !form.property.trim() || form.amount <= 0;

  return (
    <>
      {(modalMode === 'add' || modalMode === 'edit') && (
        <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="contract-modal-title">
          <Modal>
            <ModalHeader>
              <h3 id="contract-modal-title">
                {modalMode === 'add' ? 'New Contract' : 'Edit Contract'}
              </h3>
              <ModalCloseButton onClick={onClose} aria-label="Close">
                ✕
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup>
                  <label>Contract No.</label>
                  <input
                    type="text"
                    value={form.contractNumber}
                    onChange={e => setForm(f => ({ ...f, contractNumber: e.target.value }))}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Type</label>
                  <select
                    value={form.type}
                    onChange={e =>
                      setForm(f => ({ ...f, type: e.target.value as 'tenancy' | 'sale' }))
                    }
                  >
                    <option value="tenancy">Tenancy</option>
                    <option value="sale">Sale</option>
                  </select>
                </FormGroup>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <label>Property *</label>
                  <input
                    type="text"
                    value={form.property}
                    onChange={e => setForm(f => ({ ...f, property: e.target.value }))}
                    placeholder="Building, Unit..."
                  />
                </FormGroup>
                {form.type === 'tenancy' ? (
                  <>
                    <FormGroup>
                      <label>Tenant</label>
                      <input
                        type="text"
                        value={form.tenant ?? ''}
                        onChange={e => setForm(f => ({ ...f, tenant: e.target.value }))}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Landlord</label>
                      <input
                        type="text"
                        value={form.landlord ?? ''}
                        onChange={e => setForm(f => ({ ...f, landlord: e.target.value }))}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Start Date</label>
                      <input
                        type="date"
                        value={form.startDate ?? ''}
                        onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>End Date</label>
                      <input
                        type="date"
                        value={form.endDate ?? ''}
                        onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                      />
                    </FormGroup>
                  </>
                ) : (
                  <>
                    <FormGroup>
                      <label>Buyer</label>
                      <input
                        type="text"
                        value={form.buyer ?? ''}
                        onChange={e => setForm(f => ({ ...f, buyer: e.target.value }))}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Seller</label>
                      <input
                        type="text"
                        value={form.seller ?? ''}
                        onChange={e => setForm(f => ({ ...f, seller: e.target.value }))}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Completion Date</label>
                      <input
                        type="date"
                        value={form.completionDate ?? ''}
                        onChange={e => setForm(f => ({ ...f, completionDate: e.target.value }))}
                      />
                    </FormGroup>
                  </>
                )}
                <FormGroup>
                  <label>Amount (AED) *</label>
                  <input
                    type="number"
                    value={form.amount || ''}
                    min={0}
                    onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </FormGroup>
                {form.type === 'tenancy' && (
                  <FormGroup>
                    <label>Ejari Status</label>
                    <select
                      value={form.ejariStatus}
                      onChange={e => setForm(f => ({ ...f, ejariStatus: e.target.value }))}
                    >
                      <option value="pending">Pending</option>
                      <option value="registered">Registered</option>
                    </select>
                  </FormGroup>
                )}
              </FormGrid>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
              <PrimaryButton onClick={onSave} disabled={isSaveDisabled}>
                {modalMode === 'add' ? 'Add Contract' : 'Save Changes'}
              </PrimaryButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}

      {modalMode === 'delete' && editTarget && (
        <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="contract-del-title">
          <ModalSmall>
            <ModalHeader>
              <h3 id="contract-del-title">Remove Contract</h3>
              <ModalCloseButton onClick={onClose} aria-label="Close">
                ✕
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <p>
                Remove <strong>{editTarget.contractNumber}</strong>?
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

export default ContractModals;
