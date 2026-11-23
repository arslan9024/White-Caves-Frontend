import React, { FC, useState, useEffect } from 'react';
import { authFetch } from '../../../../utils/authFetch';
import type { ApiPdc, PdcModalProps } from './types';
import { FALLBACK_PDC_BY_LEASE_ID } from './constants';

export const PdcModal: FC<PdcModalProps> = ({
  leaseId,
  paymentId,
  amount,
  property,
  tenant,
  onClose,
}) => {
  const [pdcList, setPdcList] = useState<ApiPdc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    authFetch(`/api/leases/${leaseId}/pdc`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setPdcList(data.data?.length ? data.data : (FALLBACK_PDC_BY_LEASE_ID[leaseId] ?? []));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPdcList(FALLBACK_PDC_BY_LEASE_ID[leaseId] ?? []);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [leaseId]);

  return (
    <div
      className="modal-overlay"
      data-testid="payment-detail-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close payment details"
        >
          ×
        </button>
        <h4>Payment Details</h4>
        <p>
          <strong>Payment ID:</strong> {paymentId}
        </p>
        <p>
          <strong>Property:</strong> {property}
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Tenant: {tenant}</p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Amount: AED {amount.toLocaleString()}
        </p>

        {loading ? (
          <p>⏳ Loading cheque schedule…</p>
        ) : pdcList.length === 0 ? (
          <p>No PDC cheques recorded for this lease.</p>
        ) : (
          <div className="payments-list">
            {pdcList.map(p => (
              <div key={p.id} className="payment-row" data-testid={`pdc-row-${p.id}`}>
                <div>
                  <strong>
                    {new Date(p.dueDate).toLocaleDateString('en-AE', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </strong>
                  {p.chequeNumber && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      #{p.chequeNumber}
                    </p>
                  )}
                </div>
                <p>AED {p.amount.toLocaleString()}</p>
                <span className={`status-badge status-${p.status}`}>{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
