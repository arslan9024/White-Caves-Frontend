import React, { memo } from 'react';
import { DollarSign } from 'lucide-react';

export const LindaPriceOfferActionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOffer: (amount: number) => void;
}> = memo(({ isOpen, onClose, onOffer }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#1c1c28',
          width: '320px',
          padding: '16px',
          borderRadius: '10px',
          color: '#fff',
        }}
      >
        <h4
          style={{
            margin: '0 0 10px 0',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <DollarSign size={14} color="#25D366" /> Register Direct Offer
        </h4>
        <input
          type="number"
          placeholder="Offer in AED (e.g. 1,600,000)"
          style={{
            width: '100%',
            padding: '6px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '12px',
            marginBottom: '10px',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #555',
              color: '#aaa',
              borderRadius: '4px',
              padding: '4px 10px',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onOffer(1600000);
              onClose();
            }}
            style={{
              background: '#25D366',
              border: 'none',
              color: '#fff',
              borderRadius: '4px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
});
export default LindaPriceOfferActionModal;
