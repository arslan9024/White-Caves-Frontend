import React from 'react';
import { RED, WHITE, SLATE, BORDER, CARD_BG, BLUE, TEXT_MUTED } from './viewingScheduler.data';

interface BookingFormProps {
  newViewing: any;
  setNewViewing: React.Dispatch<React.SetStateAction<any>>;
  setActiveView: (view: any) => void;
  handleAddViewing: () => void;
  AGENTS: string[];
  TIME_SLOTS: string[];
}

export const ViewingSchedulerBookingForm: React.FC<BookingFormProps> = ({
  newViewing,
  setNewViewing,
  setActiveView,
  handleAddViewing,
  AGENTS,
  TIME_SLOTS,
}) => {
  return (
    <div
      style={{
        background: CARD_BG,
        padding: '24px',
        borderRadius: '12px',
        border: `1px solid ${BORDER}`,
        maxWidth: '600px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ margin: 0, color: SLATE }}>📅 Book New Property Viewing</h3>
        <button
          onClick={() => setActiveView('week')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: TEXT_MUTED,
            fontSize: '1.1rem',
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px',
          marginBottom: '14px',
        }}
      >
        {[
          {
            label: 'Client Name *',
            key: 'clientName',
            type: 'text',
            placeholder: 'e.g. Mark Stevenson',
          },
          {
            label: 'Client Phone',
            key: 'clientPhone',
            type: 'tel',
            placeholder: '+971 50 XXX XXXX',
          },
          {
            label: 'Property Title *',
            key: 'propertyTitle',
            type: 'text',
            placeholder: 'e.g. Villa 14 — DAMAC Hills 2',
          },
        ].map(f => (
          <div key={f.key} style={{ gridColumn: f.key === 'propertyTitle' ? 'span 2' : 'span 1' }}>
            <label
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: SLATE,
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {f.label}
            </label>
            <input
              type={f.type}
              value={(newViewing as any)[f.key]}
              placeholder={f.placeholder}
              onChange={e => setNewViewing((prev: any) => ({ ...prev, [f.key]: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${BORDER}`,
                borderRadius: '6px',
                fontSize: '0.875rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '14px',
          marginBottom: '14px',
        }}
      >
        <div>
          <label
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: SLATE,
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Date
          </label>
          <input
            type="date"
            value={newViewing.date}
            onChange={e => setNewViewing((prev: any) => ({ ...prev, date: e.target.value }))}
            style={{
              width: '100%',
              padding: '8px 10px',
              border: `1px solid ${BORDER}`,
              borderRadius: '6px',
              fontSize: '0.875rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: SLATE,
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Time Slot
          </label>
          <select
            value={newViewing.timeSlot}
            onChange={e => setNewViewing((prev: any) => ({ ...prev, timeSlot: e.target.value }))}
            style={{
              width: '100%',
              padding: '8px 10px',
              border: `1px solid ${BORDER}`,
              borderRadius: '6px',
              fontSize: '0.875rem',
              boxSizing: 'border-box',
            }}
          >
            {TIME_SLOTS.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: SLATE,
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Type
          </label>
          <select
            value={newViewing.type}
            onChange={e =>
              setNewViewing((prev: any) => ({
                ...prev,
                type: e.target.value as 'In-Person' | 'Virtual',
              }))
            }
            style={{
              width: '100%',
              padding: '8px 10px',
              border: `1px solid ${BORDER}`,
              borderRadius: '6px',
              fontSize: '0.875rem',
              boxSizing: 'border-box',
            }}
          >
            <option>In-Person</option>
            <option>Virtual</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <label
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: SLATE,
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Assign Agent
        </label>
        <select
          value={newViewing.agentName}
          onChange={e => setNewViewing((prev: any) => ({ ...prev, agentName: e.target.value }))}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: `1px solid ${BORDER}`,
            borderRadius: '6px',
            fontSize: '0.875rem',
          }}
        >
          {AGENTS.map(a => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: SLATE,
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Notes
        </label>
        <textarea
          value={newViewing.notes}
          onChange={e => setNewViewing((prev: any) => ({ ...prev, notes: e.target.value }))}
          placeholder="Any special instructions, language preferences, or property access notes..."
          style={{
            width: '100%',
            height: '70px',
            padding: '8px 12px',
            border: `1px solid ${BORDER}`,
            borderRadius: '6px',
            fontSize: '0.875rem',
            boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />
      </div>
      <div
        style={{
          background: 'var(--color-eff6ff, #EFF6FF)',
          padding: '10px 14px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '0.8rem',
          color: BLUE,
        }}
      >
        💬 <strong>Auto-notification:</strong> WhatsApp confirmation + calendar invite will be sent
        to client and agent upon booking.
      </div>
      <button
        onClick={handleAddViewing}
        style={{
          width: '100%',
          padding: '12px',
          background: RED,
          color: WHITE,
          border: 'none',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: 'pointer',
        }}
      >
        ✅ Confirm Viewing Booking
      </button>
    </div>
  );
};
