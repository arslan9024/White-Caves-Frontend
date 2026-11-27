import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { formatCurrency, formatDate, ROOM_OPTIONS } from './TransactionManager.data';

interface ModalProps {
  logic: any;
}

export const TransactionManagerModal: React.FC<ModalProps> = ({ logic }) => {
  return (
    <AnimatePresence>
      {logic.showModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => logic.setShowModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                {logic.modalMode === 'view' && 'Transaction Details'}
                {logic.modalMode === 'edit' && 'Edit Transaction'}
                {logic.modalMode === 'create' && 'New Transaction'}
              </h3>
              <button
                onClick={() => logic.setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {logic.modalMode === 'view' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <strong>Number:</strong> {logic.selectedTransaction?.transactionNumber}
                </div>
                <div>
                  <strong>Value:</strong> {formatCurrency(logic.selectedTransaction?.transValue)}
                </div>
                <div>
                  <strong>Area:</strong> {logic.selectedTransaction?.area}
                </div>
                <div>
                  <strong>Type:</strong> {logic.selectedTransaction?.propSubType}
                </div>
                <div>
                  <strong>Rooms:</strong> {logic.selectedTransaction?.rooms}
                </div>
                <div>
                  <strong>Date:</strong> {formatDate(logic.selectedTransaction?.instanceDate)}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label>
                  Area:
                  <input
                    type="text"
                    value={logic.editForm.area || ''}
                    onChange={e =>
                      logic.setEditForm((prev: any) => ({ ...prev, area: e.target.value }))
                    }
                    style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  />
                </label>
                <label>
                  Transaction Value (AED):
                  <input
                    type="number"
                    value={logic.editForm.transValue || 0}
                    onChange={e =>
                      logic.setEditForm((prev: any) => ({
                        ...prev,
                        transValue: Number(e.target.value),
                      }))
                    }
                    style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  />
                </label>
                <label>
                  Rooms:
                  <select
                    value={logic.editForm.rooms || '1 B/R'}
                    onChange={e =>
                      logic.setEditForm((prev: any) => ({ ...prev, rooms: e.target.value }))
                    }
                    style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  >
                    {ROOM_OPTIONS.map(r => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <div className="modal-actions">
              <button className="action-btn secondary" onClick={() => logic.setShowModal(false)}>
                Close
              </button>
              {logic.modalMode !== 'view' && (
                <button className="action-btn primary" onClick={logic.handleSave}>
                  {logic.modalMode === 'create' ? 'Create Transaction' : 'Save Changes'}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
