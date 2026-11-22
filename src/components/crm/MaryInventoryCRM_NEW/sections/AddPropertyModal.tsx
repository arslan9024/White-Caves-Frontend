import React from 'react';
import type { ClusterEntry, NewPropertyFormState } from './types';

interface AddPropertyModalProps {
  form: NewPropertyFormState;
  clusterList: ClusterEntry[];
  onChange: (next: NewPropertyFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px',
  borderRadius: '6px',
  border: '1px solid var(--text-secondary, #CBD5E1)',
};

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  form,
  clusterList,
  onChange,
  onSubmit,
  onClose,
}) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        background: 'var(--white, #FFFFFF)',
        borderRadius: '16px',
        padding: '1.5rem',
        width: '90%',
        maxWidth: '520px',
        maxHeight: '85vh',
        overflowY: 'auto',
      }}
    >
      <h3
        style={{
          margin: '0 0 1rem 0',
          fontSize: '1.15rem',
          fontWeight: 800,
          color: 'var(--accent-red, #EF4444)',
        }}
      >
        + Add New Property Listing
      </h3>
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}
      >
        <label>
          Asset Reference ID:
          <input
            type="text"
            value={form.id}
            onChange={e => onChange({ ...form, id: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <label>
          P-Number:
          <input
            type="text"
            value={form.pNumber}
            onChange={e => onChange({ ...form, pNumber: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Cluster / Sector Name:
          <select
            value={form.sector}
            onChange={e => onChange({ ...form, sector: e.target.value })}
            style={inputStyle}
          >
            {clusterList
              .filter(c => c.name !== 'ALL')
              .map(c => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          Asking Price / Rent (AED):
          <input
            type="text"
            value={form.askingPrice}
            onChange={e => onChange({ ...form, askingPrice: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Landlord Legal Name:
          <input
            type="text"
            value={form.landlordName}
            onChange={e => onChange({ ...form, landlordName: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Landlord Phone Number:
          <input
            type="text"
            value={form.primaryPhone}
            onChange={e => onChange({ ...form, primaryPhone: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Title Deed Reference Number:
          <input
            type="text"
            value={form.titleDeedRef}
            onChange={e => onChange({ ...form, titleDeedRef: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
            marginTop: '0.5rem',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              background: 'var(--white, #FFFFFF)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--accent-red, #EF4444)',
              color: 'var(--white, #FFFFFF)',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Save Listing
          </button>
        </div>
      </form>
    </div>
  </div>
);
