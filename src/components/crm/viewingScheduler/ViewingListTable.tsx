import React, { FC } from 'react';
import { Home, Monitor } from 'lucide-react';
import { WHITE, SLATE, BORDER, CARD_BG, TEXT_MUTED, type Viewing } from '../viewingScheduler.data';
import { STATUS_CONFIG } from './viewingScheduler.constants';

interface ViewingListTableProps {
  viewings: Viewing[];
  onInspectViewing: (viewing: Viewing) => void;
}

export const ViewingListTable: FC<ViewingListTableProps> = ({ viewings, onInspectViewing }) => {
  const sorted = [...viewings].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div
      style={{
        background: WHITE,
        borderRadius: '10px',
        border: `1px solid ${BORDER}`,
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ background: SLATE, color: WHITE }}>
            <th style={{ padding: '10px 14px', textAlign: 'left' }}>CLIENT</th>
            <th style={{ padding: '10px 14px', textAlign: 'left' }}>PROPERTY</th>
            <th style={{ padding: '10px 14px', textAlign: 'left' }}>AGENT</th>
            <th style={{ padding: '10px 14px', textAlign: 'left' }}>DATE &amp; TIME</th>
            <th style={{ padding: '10px 14px', textAlign: 'left' }}>TYPE</th>
            <th style={{ padding: '10px 14px', textAlign: 'left' }}>STATUS</th>
            <th style={{ padding: '10px 14px', textAlign: 'center' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((v, idx) => {
            const sc = STATUS_CONFIG[v.status];
            return (
              <tr
                key={v.id}
                style={{
                  borderBottom: '1px solid #E2E8F0',
                  background: idx % 2 === 0 ? WHITE : CARD_BG,
                }}
              >
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ fontWeight: 700 }}>{v.clientName}</div>
                  <div style={{ fontSize: '0.72rem', color: TEXT_MUTED }}>{v.clientPhone}</div>
                </td>
                <td
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {v.propertyTitle}
                </td>
                <td style={{ padding: '10px 14px', color: TEXT_MUTED }}>{v.agentName}</td>
                <td
                  style={{
                    padding: '10px 14px',
                    fontFamily: 'monospace',
                    fontSize: '0.78rem',
                  }}
                >
                  {v.date} {v.timeSlot}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {v.type === 'Virtual' ? <Monitor size={12} /> : <Home size={12} />}
                    <span>{v.type}</span>
                  </span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span
                    style={{
                      background: sc.bg,
                      color: sc.color,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                    }}
                  >
                    {v.status}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => onInspectViewing(v)}
                    style={{
                      background: 'var(--color-e2e8f0, #E2E8F0)',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
