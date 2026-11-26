import React, { FC } from 'react';
import { Calendar } from 'lucide-react';
import { RED, WHITE, SLATE, CARD_BG, TEXT_MUTED, GREEN, ORANGE } from '../viewingScheduler.data';
import type { ViewingToast } from './viewingScheduler.constants';

interface ViewingSchedulerHeaderStatsProps {
  todayCount: number;
  upcomingConfirmedCount: number;
  pendingCount: number;
  noShowCount: number;
  onBookNew: () => void;
}

export const ViewingSchedulerHeaderStats: FC<ViewingSchedulerHeaderStatsProps> = ({
  todayCount,
  upcomingConfirmedCount,
  pendingCount,
  noShowCount,
  onBookNew,
}) => (
  <>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: '1.6rem',
            fontWeight: 800,
            color: SLATE,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Calendar size={22} color={RED} />
          <span>Viewing Scheduler</span>
        </h2>
        <p style={{ margin: '6px 0 0 0', color: TEXT_MUTED, fontSize: '0.875rem' }}>
          Calendar-based property viewing management · Auto WhatsApp reminders · Agent assignment
        </p>
      </div>
      <button
        type="button"
        onClick={onBookNew}
        style={{
          background: RED,
          color: WHITE,
          border: 'none',
          padding: '10px 18px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.875rem',
        }}
      >
        + Book Viewing
      </button>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}
    >
      {[
        { label: "Today's Viewings", value: todayCount, color: RED },
        { label: 'Upcoming Confirmed', value: upcomingConfirmedCount, color: GREEN },
        { label: 'Pending Approval', value: pendingCount, color: ORANGE },
        { label: 'No-Shows (tracked)', value: noShowCount, color: TEXT_MUTED },
      ].map(s => (
        <div
          key={s.label}
          style={{
            background: CARD_BG,
            padding: '14px',
            borderRadius: '8px',
            borderLeft: `4px solid ${s.color}`,
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              color: TEXT_MUTED,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            {s.label}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color, marginTop: '4px' }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  </>
);

export const ViewingSchedulerToastStack: FC<{ toasts: ViewingToast[] }> = ({ toasts }) => {
  if (toasts.length === 0) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          style={{
            background: t.color,
            color: WHITE,
            padding: '12px 18px',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.85rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
            maxWidth: '360px',
            animation: 'slideInRight 0.3s ease-out',
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};
