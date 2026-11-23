import React, { FC, useState, useEffect } from 'react';
import type { TenantData, DetailTab, ApiPdc, ApiMaintenance } from './types';
import { authFetch } from '../../../../utils/authFetch';

export interface TenantDetailModalProps {
  tenant: TenantData;
  onClose: () => void;
}

export const TenantDetailModal: FC<TenantDetailModalProps> = ({ tenant, onClose }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('info');
  const [pdcList, setPdcList] = useState<ApiPdc[]>([]);
  const [pdcLoading, setPdcLoading] = useState(false);
  const [maintenance, setMaintenance] = useState<ApiMaintenance[]>([]);
  const [maintLoading, setMaintLoading] = useState(false);

  // Fetch PDC schedule when payments tab is opened
  useEffect(() => {
    if (activeTab !== 'payments') return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPdcLoading(true);
    authFetch(`/api/leases/${tenant.leaseId}/pdc`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setPdcList(data.data ?? []);
          setPdcLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setPdcLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, tenant.leaseId]);

  // Fetch maintenance for the property when that tab is opened
  useEffect(() => {
    if (activeTab !== 'maintenance') return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMaintLoading(true);
    authFetch(`/api/maintenance?propertyId=${tenant.propertyId}&pageSize=20`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setMaintenance(data.data ?? []);
          setMaintLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setMaintLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, tenant.propertyId]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      data-testid="tenant-detail-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${tenant.name}`}
    >
      <div className="modal-content modal-content--wide" onClick={e => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close tenant details"
          type="button"
        >
          &times;
        </button>

        <h2 className="modal-title">{tenant.name}</h2>
        <p className="modal-subtitle">
          {tenant.property} &middot; {tenant.status === 'active' ? '🟢 Active' : '⚫ Expired'}
        </p>

        {/* Detail tabs */}
        <div
          className="portal-tab-navigation modal-tabs"
          role="tablist"
          aria-label="Tenant detail sections"
          style={{ marginTop: '1rem' }}
        >
          {(['info', 'payments', 'maintenance'] as DetailTab[]).map(tab => (
            <button
              key={tab}
              role="tab"
              type="button"
              aria-selected={activeTab === tab}
              className={`portal-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
              data-testid={`tenant-detail-tab-${tab}`}
            >
              {tab === 'info'
                ? 'Contact Info'
                : tab === 'payments'
                  ? 'PDC / Payments'
                  : 'Maintenance'}
            </button>
          ))}
        </div>

        {/* Info tab */}
        {activeTab === 'info' && (
          <div className="detail-section" data-testid="tenant-detail-info">
            <div className="detail-grid">
              <div>
                <strong>Email</strong>
                <p>{tenant.email || '—'}</p>
              </div>
              <div>
                <strong>Phone</strong>
                <p>{tenant.phone || '—'}</p>
              </div>
              <div>
                <strong>Lease Start</strong>
                <p>{tenant.leaseStart}</p>
              </div>
              <div>
                <strong>Lease End</strong>
                <p>{tenant.leaseEnd}</p>
              </div>
              {tenant.unitNumber && (
                <div>
                  <strong>Unit Number</strong>
                  <p>{tenant.unitNumber}</p>
                </div>
              )}
              <div>
                <strong>Monthly Rent</strong>
                <p>AED {tenant.rentAmount.toLocaleString()}</p>
              </div>
              <div>
                <strong>Status</strong>
                <p>
                  <span className={`status-badge status-${tenant.status}`}>{tenant.status}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payments / PDC tab */}
        {activeTab === 'payments' && (
          <div className="detail-section" data-testid="tenant-detail-payments">
            {pdcLoading ? (
              <p className="empty-state-text">⏳ Loading payment schedule…</p>
            ) : pdcList.length === 0 ? (
              <p className="empty-state-text">No PDC cheques recorded for this lease.</p>
            ) : (
              <div className="payments-list">
                {pdcList.map(p => (
                  <div key={p.id} className="payment-row" data-testid={`modal-payment-${p.id}`}>
                    <div>
                      <strong>
                        {new Date(p.dueDate).toLocaleDateString('en-AE', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </strong>
                      {p.chequeNumber && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Cheque #{p.chequeNumber}
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
        )}

        {/* Maintenance tab */}
        {activeTab === 'maintenance' && (
          <div className="detail-section" data-testid="tenant-detail-maintenance">
            {maintLoading ? (
              <p className="empty-state-text">⏳ Loading maintenance requests…</p>
            ) : maintenance.length === 0 ? (
              <p className="empty-state-text">No maintenance requests for this property.</p>
            ) : (
              <div className="maintenance-list">
                {maintenance.map(m => (
                  <div key={m.id} className="maintenance-row" data-testid={`modal-maint-${m.id}`}>
                    <div>
                      <strong>{m.title}</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Submitted: {new Date(m.createdAt).toLocaleDateString('en-AE')}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className={`priority-badge priority-${m.priority}`}>{m.priority}</span>
                      <span className={`status-badge status-${m.status}`}>{m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
