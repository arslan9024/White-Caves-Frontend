import React, { FC } from 'react';
import { Monitor, Home } from 'lucide-react';
import {
  RED,
  WHITE,
  SLATE,
  BORDER,
  CARD_BG,
  TEXT_MUTED,
  type Viewing,
} from '../viewingScheduler.data';
import {
  DAY_LABELS,
  SLOT_SUBSET,
  STATUS_CONFIG,
  TODAY_STR,
  formatIsoDate,
} from './viewingScheduler.constants';

interface ViewingWeekCalendarProps {
  currentWeek: Date;
  weekDays: Date[];
  selectedViewing: Viewing | null;
  getViewingsForCell: (date: string, slot: string) => Viewing[];
  onChangeWeek: (nextDate: Date) => void;
  onSelectViewing: (viewing: Viewing | null) => void;
}

export const ViewingWeekCalendar: FC<ViewingWeekCalendarProps> = ({
  currentWeek,
  weekDays,
  selectedViewing,
  getViewingsForCell,
  onChangeWeek,
  onSelectViewing,
}) => (
  <div>
    {/* Week Navigation */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <button
        type="button"
        onClick={() => {
          const d = new Date(currentWeek);
          d.setDate(d.getDate() - 7);
          onChangeWeek(d);
        }}
        style={{
          padding: '6px 12px',
          border: `1px solid ${BORDER}`,
          borderRadius: '6px',
          background: WHITE,
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        ‹ Prev
      </button>
      <span style={{ fontWeight: 700, color: SLATE, fontSize: '0.95rem' }}>
        {weekDays[0].toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} —{' '}
        {weekDays[6].toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </span>
      <button
        type="button"
        onClick={() => {
          const d = new Date(currentWeek);
          d.setDate(d.getDate() + 7);
          onChangeWeek(d);
        }}
        style={{
          padding: '6px 12px',
          border: `1px solid ${BORDER}`,
          borderRadius: '6px',
          background: WHITE,
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        Next ›
      </button>
      <button
        type="button"
        onClick={() => onChangeWeek(new Date(TODAY_STR))}
        style={{
          padding: '6px 12px',
          border: `1px solid ${RED}`,
          borderRadius: '6px',
          background: '#FEF2F2',
          color: RED,
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.8rem',
        }}
      >
        Today
      </button>
    </div>

    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
        <thead>
          <tr style={{ background: SLATE }}>
            <th
              style={{
                padding: '10px',
                color: WHITE,
                textAlign: 'left',
                fontSize: '0.8rem',
                width: '60px',
              }}
            >
              TIME
            </th>
            {weekDays.map((d, i) => {
              const isToday = formatIsoDate(d) === TODAY_STR;
              return (
                <th
                  key={i}
                  style={{
                    padding: '10px',
                    color: isToday ? '#FCA5A5' : WHITE,
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    background: isToday ? '#7F1D1D' : SLATE,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{DAY_LABELS[i]}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {SLOT_SUBSET.map(slot => (
            <tr key={slot} style={{ borderBottom: '1px solid var(--text-secondary, #E2E8F0)' }}>
              <td
                style={{
                  padding: '8px 10px',
                  fontSize: '0.75rem',
                  color: TEXT_MUTED,
                  fontWeight: 700,
                  background: CARD_BG,
                  borderRight: '1px solid var(--text-secondary, #E2E8F0)',
                }}
              >
                {slot}
              </td>
              {weekDays.map((d, i) => {
                const dayStr = formatIsoDate(d);
                const cells = getViewingsForCell(dayStr, slot);
                const isToday = dayStr === TODAY_STR;
                return (
                  <td
                    key={i}
                    style={{
                      padding: '4px',
                      verticalAlign: 'top',
                      minHeight: '50px',
                      background: isToday ? '#FFFBEB' : WHITE,
                      borderRight: '1px solid #E2E8F0',
                    }}
                  >
                    {cells.map(v => {
                      const sc = STATUS_CONFIG[v.status];
                      return (
                        <div
                          key={v.id}
                          onClick={() => onSelectViewing(v === selectedViewing ? null : v)}
                          style={{
                            background: sc.bg,
                            border: `1px solid ${sc.color}40`,
                            borderLeft: `3px solid ${sc.color}`,
                            padding: '4px 7px',
                            borderRadius: '6px',
                            fontSize: '0.68rem',
                            marginBottom: '3px',
                            cursor: 'pointer',
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 700,
                              color: SLATE,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {v.clientName}
                          </div>
                          <div
                            style={{
                              color: sc.color,
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            {v.type === 'Virtual' ? <Monitor size={10} /> : <Home size={10} />}
                            <span>{v.agentName.split(' ')[0]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
