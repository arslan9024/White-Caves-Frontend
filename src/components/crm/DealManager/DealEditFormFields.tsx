import React from 'react';
import { DealType, DealStatus } from './DealManager.types';

interface DealEditFormFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  dealType: DealType;
  setDealType: (val: DealType) => void;
  setClientRole: (val: 'tenant' | 'buyer') => void;
  status: DealStatus;
  setStatus: (val: DealStatus) => void;
  valueAED: number;
  setValueAED: (val: number) => void;
  propertyId: string;
  setPropertyId: (val: string) => void;
  clientRole: 'tenant' | 'buyer';
  clientName: string;
  setClientName: (val: string) => void;
  agentName: string;
  setAgentName: (val: string) => void;
}

export const DealEditFormFields: React.FC<DealEditFormFieldsProps> = ({
  title,
  setTitle,
  dealType,
  setDealType,
  setClientRole,
  status,
  setStatus,
  valueAED,
  setValueAED,
  propertyId,
  setPropertyId,
  clientRole,
  clientName,
  setClientName,
  agentName,
  setAgentName,
}) => {
  return (
    <>
      <div>
        <label
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#94A3B8',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Deal Dossier Title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. DAMAC Hills 2 Prestige Villa Lease"
          data-testid="deal-title-input"
          required
          style={{
            width: '100%',
            padding: '8px 12px',
            background: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontSize: '0.85rem',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#94A3B8',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Deal Type
          </label>
          <select
            value={dealType}
            onChange={e => {
              const val = e.target.value as DealType;
              setDealType(val);
              setClientRole(val === 'SALES' ? 'buyer' : 'tenant');
            }}
            data-testid="deal-type-select"
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
            }}
          >
            <option value="LEASING">LEASING (Rental)</option>
            <option value="SALES">SALES (Acquisition)</option>
          </select>
        </div>

        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#94A3B8',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Initial Status
          </label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as DealStatus)}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
            }}
          >
            <option value="INQUIRY">INQUIRY</option>
            <option value="VIEWING">VIEWING</option>
            <option value="OFFER">OFFER</option>
            <option value="CONTRACT">CONTRACT</option>
            <option value="EJARI_DLD">EJARI / DLD</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#94A3B8',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Value (AED)
          </label>
          <input
            type="number"
            value={valueAED}
            onChange={e => setValueAED(Number(e.target.value))}
            data-testid="deal-value-input"
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
            }}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#94A3B8',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Inventory Unit ID
          </label>
          <input
            type="text"
            value={propertyId}
            onChange={e => setPropertyId(e.target.value)}
            placeholder="REP-001"
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
            }}
          />
        </div>
      </div>

      <div>
        <label
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#94A3B8',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Client Full Name ({clientRole.toUpperCase()})
        </label>
        <input
          type="text"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          placeholder="e.g. Hassan Al-Nuaimi"
          data-testid="deal-client-input"
          required
          style={{
            width: '100%',
            padding: '8px 12px',
            background: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontSize: '0.85rem',
          }}
        />
      </div>

      <div>
        <label
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#94A3B8',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Lead Agent / Executive
        </label>
        <input
          type="text"
          value={agentName}
          onChange={e => setAgentName(e.target.value)}
          placeholder="Arslan Malik"
          data-testid="deal-agent-input"
          required
          style={{
            width: '100%',
            padding: '8px 12px',
            background: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontSize: '0.85rem',
          }}
        />
      </div>
    </>
  );
};
