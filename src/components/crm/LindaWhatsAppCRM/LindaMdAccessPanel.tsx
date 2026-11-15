// FILE: src/components/crm/LindaWhatsAppCRM/LindaMdAccessPanel.tsx
import React, { memo, useState } from 'react';

interface AccessRequest {
  id: string;
  userName: string;
  role: string;
  status: 'APPROVED' | 'PENDING' | 'REVOKED';
}

const INITIAL_REQUESTS: AccessRequest[] = [
  { id: 'usr-1', userName: 'Arslan Malik (MD)', role: 'Managing Director', status: 'APPROVED' },
  { id: 'usr-2', userName: 'Sara Al-Mansoor', role: 'Senior Leasing Broker', status: 'APPROVED' },
  { id: 'usr-3', userName: 'Omar Khalid', role: 'Offplan Specialist', status: 'PENDING' },
];

interface LindaMdAccessPanelProps {
  isDark: boolean;
  mdApproved: boolean;
  onActionComplete: (message: string) => void;
}

export const LindaMdAccessPanel = memo(
  ({ isDark, mdApproved, onActionComplete }: LindaMdAccessPanelProps) => {
    const [requests, setRequests] = useState<AccessRequest[]>(INITIAL_REQUESTS);
    const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)';
    const bg = isDark ? 'rgba(15,23,42,0.65)' : '#ffffff';

    const handleUpdateStatus = (id: string, status: AccessRequest['status'], userName: string) => {
      if (!mdApproved) {
        onActionComplete('MD Approval required before modifying access.');
        return;
      }
      setRequests(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
      onActionComplete(`${userName} access ${status.toLowerCase()}.`);
    };

    return (
      <section
        data-testid="linda-md-access-panel"
        style={{
          border: `1px solid ${border}`,
          background: bg,
          borderRadius: 10,
          padding: 14,
          display: 'grid',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
            MD Access &amp; Governance Approvals
          </h3>
          <span
            style={{ fontSize: 11, color: mdApproved ? '#10b981' : '#f59e0b', fontWeight: 600 }}
          >
            {mdApproved ? 'MD Session Active' : 'MD Approval Locked'}
          </span>
        </div>

        <div style={{ display: 'grid', gap: 6 }}>
          {requests.map(req => (
            <div
              key={req.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 8,
                border: `1px solid ${border}`,
                fontSize: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{req.userName}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{req.role}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background:
                      req.status === 'APPROVED'
                        ? 'rgba(16,185,129,0.15)'
                        : req.status === 'PENDING'
                          ? 'rgba(245,158,11,0.15)'
                          : 'rgba(239,68,68,0.15)',
                    color:
                      req.status === 'APPROVED'
                        ? '#10b981'
                        : req.status === 'PENDING'
                          ? '#f59e0b'
                          : '#EF4444',
                  }}
                >
                  {req.status}
                </span>
                {req.status !== 'APPROVED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(req.id, 'APPROVED', req.userName)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      border: '1px solid #10b981',
                      background: 'transparent',
                      color: '#10b981',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    Approve
                  </button>
                )}
                {req.status === 'APPROVED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(req.id, 'REVOKED', req.userName)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      border: '1px solid #EF4444',
                      background: 'transparent',
                      color: '#EF4444',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);

LindaMdAccessPanel.displayName = 'LindaMdAccessPanel';
