import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'alert' | 'success';
  read: boolean;
}

export interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Hot Lead Assigned',
    message: 'High-net-worth investor inquired on Downtown Dubai Penthouse.',
    timestamp: '10m ago',
    type: 'success',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Linda Daemon Operational',
    message: 'WhatsApp automated drip campaign active for 42 owners.',
    timestamp: '1h ago',
    type: 'info',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Ejari Renewal Pending',
    message: 'Tenant lease renewal due in 14 days for Marina View 2BR.',
    timestamp: '3h ago',
    type: 'alert',
    read: true,
  },
];

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="wc-notifications-popover"
      data-testid="wc-notifications-popover"
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        right: 0,
        width: '340px',
        background: '#0F172A',
        border: '1px solid rgba(239, 68, 68, 0.35)',
        borderRadius: '14px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
        zIndex: 2100,
        overflow: 'hidden',
        color: '#F8FAFC',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
          background: 'rgba(2, 6, 23, 0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} color="#EF4444" />
          <strong style={{ fontSize: '0.85rem' }}>Notifications & Alerts</strong>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notifications"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '2px',
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '8px 0' }}>
        {SAMPLE_NOTIFICATIONS.map(n => (
          <div
            key={n.id}
            data-testid={`notif-item-${n.id}`}
            style={{
              display: 'flex',
              gap: '10px',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
              background: n.read ? 'transparent' : 'rgba(239, 68, 68, 0.06)',
            }}
          >
            <div style={{ marginTop: '2px' }}>
              {n.type === 'success' && <CheckCircle2 size={16} color="#22C55E" />}
              {n.type === 'alert' && <AlertTriangle size={16} color="#F59E0B" />}
              {n.type === 'info' && <Info size={16} color="#38BDF8" />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#F8FAFC',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {n.title}
                </div>
                <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{n.timestamp}</span>
              </div>
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '0.74rem',
                  color: '#94A3B8',
                  lineHeight: 1.4,
                }}
              >
                {n.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
