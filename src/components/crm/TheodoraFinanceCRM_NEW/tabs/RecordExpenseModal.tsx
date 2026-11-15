import React from 'react';
import { X } from 'lucide-react';
import { ExpenseCatalogItem } from './ExpensesTab.types';

export interface RecordExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  newExpense: {
    expense_id: string;
    amount: string;
    payment_source: string;
    notes: string;
    vendor: string;
    date: string;
  };
  setNewExpense: (expense: any) => void;
  allCatalogItems: (ExpenseCatalogItem & { category_name: string; category_id: string })[];
}

export const RecordExpenseModal: React.FC<RecordExpenseModalProps> = ({
  isOpen,
  onClose,
  newExpense,
  setNewExpense,
  allCatalogItems,
}) => {
  if (!isOpen) return null;

  const selectedCatalogItem = allCatalogItems.find(i => i.expense_id === newExpense.expense_id);
  const vatRate = selectedCatalogItem ? selectedCatalogItem.uae_vat_rate : 5.0;
  const numAmount = parseFloat(newExpense.amount) || 0;
  const computedVat = (numAmount * (vatRate / 100)).toFixed(2);
  const computedGross = (numAmount + parseFloat(computedVat)).toFixed(2);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ background: 'var(--white, #FFFFFF)', padding: '2rem', borderRadius: '16px', width: '520px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-1e293b, #1E293B)' }}>
            Record Operating Outlay / Advance
          </h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-475569, #475569)', display: 'block', marginBottom: '4px' }}>
              Select Master Expense Classification (42 Catalog)
            </label>
            <select
              value={newExpense.expense_id}
              onChange={(e) => setNewExpense({ ...newExpense, expense_id: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--text-secondary, #CBD5E1)', fontSize: '0.85rem', fontWeight: 700 }}
            >
              {allCatalogItems.map(i => (
                <option key={i.expense_id} value={i.expense_id}>
                  [{i.expense_id}] {i.name} ({i.uae_vat_rate}% VAT)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-475569, #475569)', display: 'block', marginBottom: '4px' }}>
              Payment Source / Funding Account
            </label>
            <select
              value={newExpense.payment_source}
              onChange={(e) => setNewExpense({ ...newExpense, payment_source: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--text-secondary, #CBD5E1)', fontSize: '0.85rem', fontWeight: 700 }}
            >
              <option value="DIRECTORS_LOAN_ACCOUNT_OWNERS_EQUITY">
                💳 Director's Loan Account (Personal Card Advance)
              </option>
              <option value="CORPORATE_BANK_ACCOUNT_WIO">
                🏦 Wio Business Corporate Account (AED Main)
              </option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-475569, #475569)', display: 'block', marginBottom: '4px' }}>
                Net Amount (AED)
              </label>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--text-secondary, #CBD5E1)', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-475569, #475569)', display: 'block', marginBottom: '4px' }}>
                Transaction Date
              </label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--text-secondary, #CBD5E1)', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div style={{ background: 'var(--color-f8fafc, #F8FAFC)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--text-secondary, #E2E8F0)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary, #64748B)' }}>
              <span>Input VAT ({vatRate}%):</span>
              <strong>AED {computedVat}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-1e293b, #1E293B)', marginTop: '4px' }}>
              <span>Total Gross Outlay:</span>
              <strong>AED {computedGross}</strong>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-475569, #475569)', display: 'block', marginBottom: '4px' }}>
              Vendor & Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Property Finder LLC - August 2026 Credits"
              value={newExpense.notes}
              onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--text-secondary, #CBD5E1)', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={onClose}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--text-secondary, #CBD5E1)', background: 'var(--white, #FFFFFF)', color: 'var(--color-475569, #475569)', fontWeight: 700, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: 'var(--accent-purple, #8B5CF6)', color: 'var(--white, #FFFFFF)', fontWeight: 800, cursor: 'pointer' }}
            >
              Confirm & Post to Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
