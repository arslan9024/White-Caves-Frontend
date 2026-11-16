import React, { FC } from 'react';
import { RefreshCw, KeyRound, QrCode } from 'lucide-react';
import type { LindaSessionItem } from './LindaWhatsAppCRM.data';

export interface LindaSessionRowProps {
  session: LindaSessionItem;
  isDark: boolean;
  maskPhone: boolean;
  pingStatus?: string;
  onPing: (id: string) => void;
  onPairDeviceCode: (session: LindaSessionItem) => void;
  onScanDeviceQr: (session: LindaSessionItem) => void;
}

export const LindaSessionRow: FC<LindaSessionRowProps> = ({
  session,
  isDark,
  maskPhone,
  pingStatus,
  onPing,
  onPairDeviceCode,
  onScanDeviceQr,
}) => {
  const isReady = session.status === 'connected';
  const formatPhone = (phone: string) => {
    if (!maskPhone) return phone;
    const parts = phone.split(' ');
    if (parts.length < 2) return phone;
    return `${parts[0]} *** *** ${parts[parts.length - 1].slice(-3)}`;
  };

  return (
    <tr
      style={{
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #F1F5F9',
      }}
    >
      <td style={{ padding: '10px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 8px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            background: isReady
              ? isDark
                ? 'rgba(34, 197, 94, 0.2)'
                : '#DCFCE7'
              : isDark
                ? 'rgba(239, 68, 68, 0.2)'
                : '#FEE2E2',
            color: isReady ? (isDark ? '#86EFAC' : '#166534') : isDark ? '#FCA5A5' : '#991B1B',
          }}
        >
          {isReady ? '🟢' : '🔴'} {session.status.toUpperCase()}
        </span>
      </td>
      <td style={{ padding: '10px', fontWeight: 600, color: isDark ? '#F8FAFC' : '#0F172A' }}>
        {session.name}
      </td>
      <td
        style={{ padding: '10px', fontFamily: 'monospace', color: isDark ? '#CBD5E1' : '#334155' }}
      >
        {formatPhone(session.phone)}
      </td>
      <td style={{ padding: '10px' }}>
        <span
          style={{
            padding: '2px 6px',
            borderRadius: 4,
            fontSize: 10,
            fontFamily: 'monospace',
            background: isDark ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF',
            color: isDark ? '#93C5FD' : '#1D4ED8',
          }}
        >
          {session.role}
        </span>
      </td>
      <td
        style={{ padding: '10px', fontFamily: 'monospace', color: isDark ? '#86EFAC' : '#15803D' }}
      >
        ↑{session.messagesSent} / ↓{session.messagesReceived}
      </td>
      <td style={{ padding: '10px', color: isDark ? '#CBD5E1' : '#475569' }}>
        {session.uptime} ·{' '}
        <span style={{ color: isDark ? '#94A3B8' : '#64748B' }}>{session.lastActivity}</span>
      </td>
      <td style={{ padding: '10px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => onPing(session.id)}
            style={{
              background: isDark ? 'rgba(34, 197, 94, 0.18)' : '#DCFCE7',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              color: isDark ? '#DCFCE7' : '#166534',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 11,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <RefreshCw size={11} /> {pingStatus || 'Ping'}
          </button>
          <button
            type="button"
            onClick={() => onPairDeviceCode(session)}
            style={{
              background: isDark ? 'rgba(234, 179, 8, 0.18)' : '#FEF9C3',
              border: '1px solid rgba(234, 179, 8, 0.45)',
              color: isDark ? '#FEF08A' : '#854D0E',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 11,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <KeyRound size={11} /> Code (2.1)
          </button>
          <button
            type="button"
            onClick={() => onScanDeviceQr(session)}
            style={{
              background: isDark ? 'rgba(59, 130, 246, 0.18)' : '#DBEAFE',
              border: '1px solid rgba(59, 130, 246, 0.45)',
              color: isDark ? '#BFDBFE' : '#1E40AF',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 11,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <QrCode size={11} /> QR (2.2)
          </button>
        </div>
      </td>
    </tr>
  );
};
