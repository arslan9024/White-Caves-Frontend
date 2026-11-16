import React, { useState } from 'react';
import { RenewalRecord } from '../data/leasing';
import { RenewalCardItem } from './RenewalCardItem';

interface RenewalsTabProps {
  renewals: RenewalRecord[];
  onSendNotice?: (id: number) => void;
  onMarkAccepted?: (id: number) => void;
  onMarkRejected?: (id: number) => void;
}

const RenewalsTab: React.FC<RenewalsTabProps> = ({
  renewals,
  onSendNotice,
  onMarkAccepted,
  onMarkRejected,
}) => {
  const [localRenewals, setLocalRenewals] = useState<RenewalRecord[]>(renewals);

  const dueThisMonth = localRenewals.filter(r => r.daysUntilExpiry <= 30).length;
  const noticeSent = localRenewals.filter(r => r.noticeSent).length;
  const confirmed = localRenewals.filter(r => r.tenantResponse === 'accepted').length;
  const rejected = localRenewals.filter(r => r.tenantResponse === 'rejected').length;
  const negotiating = localRenewals.filter(r => r.tenantResponse === 'negotiating').length;

  const handleSendNotice = (id: number) => {
    setLocalRenewals(prev => prev.map(r => (r.id === id ? { ...r, noticeSent: true } : r)));
    onSendNotice?.(id);
  };
  const handleAccept = (id: number) => {
    setLocalRenewals(prev =>
      prev.map(r => (r.id === id ? { ...r, tenantResponse: 'accepted' } : r))
    );
    onMarkAccepted?.(id);
  };
  const handleReject = (id: number) => {
    setLocalRenewals(prev =>
      prev.map(r => (r.id === id ? { ...r, tenantResponse: 'rejected' } : r))
    );
    onMarkRejected?.(id);
  };

  return (
    <div className="renewals-view">
      <div className="view-header">
        <div>
          <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Lease Renewals</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Manage upcoming lease renewals and tenant responses
          </p>
        </div>
      </div>

      <div className="renewal-summary" style={{ marginBottom: '24px' }}>
        <div className="renewal-stat">
          <span className="value" style={{ color: 'var(--accent-red, #EF4444)' }}>
            {dueThisMonth}
          </span>
          <span className="label">Due in 30 Days</span>
        </div>
        <div className="renewal-stat">
          <span className="value" style={{ color: 'var(--accent-teal, #14B8A6)' }}>
            {noticeSent}
          </span>
          <span className="label">Notices Sent</span>
        </div>
        <div className="renewal-stat">
          <span className="value" style={{ color: 'var(--accent-green, #10B981)' }}>
            {confirmed}
          </span>
          <span className="label">Accepted</span>
        </div>
        <div className="renewal-stat">
          <span className="value" style={{ color: 'var(--accent-blue, #60A5FA)' }}>
            {negotiating}
          </span>
          <span className="label">Negotiating</span>
        </div>
        <div className="renewal-stat">
          <span className="value" style={{ color: 'var(--accent-red, #EF4444)' }}>
            {rejected}
          </span>
          <span className="label">Rejected</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {localRenewals.map(renewal => (
          <RenewalCardItem
            key={renewal.id}
            renewal={renewal}
            onSendNotice={handleSendNotice}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '14px 18px',
          background: 'rgba(20,184,166,0.08)',
          border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: '10px',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
        }}
      >
        📊 <strong style={{ color: 'var(--accent-teal, #14B8A6)' }}>Occupancy Forecast:</strong>{' '}
        {localRenewals.filter(r => r.tenantResponse === 'accepted').length} renewals confirmed ·{' '}
        {localRenewals.filter(r => r.tenantResponse === 'rejected').length} units may become vacant
        · Monitor market rates for competitive pricing.
      </div>
    </div>
  );
};

export default RenewalsTab;

