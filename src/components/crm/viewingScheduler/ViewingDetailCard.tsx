import React, { FC } from 'react';
import { ClipboardList, FileText, MessageCircle, X } from 'lucide-react';
import {
  WHITE,
  SLATE,
  CARD_BG,
  TEXT_MUTED,
  GREEN,
  BLUE,
  type Viewing,
} from '../viewingScheduler.data';
import { STATUS_CONFIG } from './viewingScheduler.constants';

interface ViewingDetailCardProps {
  viewing: Viewing;
  onClose: () => void;
  onStatusChange: (id: string, status: Viewing['status']) => void;
  onNotify: (message: string, color?: string) => void;
}

export const ViewingDetailCard: FC<ViewingDetailCardProps> = ({
  viewing,
  onClose,
  onStatusChange,
  onNotify,
}) => (
  <div
    style={{
      marginTop: '20px',
      background: CARD_BG,
      padding: '20px',
      borderRadius: '12px',
      border: `2px solid ${STATUS_CONFIG[viewing.status].color}`,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    }}
  >
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: SLATE, fontSize: '1rem' }}>Viewing Detail — {viewing.id}</h3>
        <button
          type="button"
          aria-label="Close viewing detail"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: TEXT_MUTED,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <X size={16} />
        </button>
      </div>
      {[
        { label: 'Client', value: viewing.clientName },
        { label: 'Phone', value: viewing.clientPhone },
        { label: 'Property', value: viewing.propertyTitle },
        { label: 'Agent', value: viewing.agentName },
        { label: 'Date & Time', value: `${viewing.date} at ${viewing.timeSlot}` },
        { label: 'Type', value: viewing.type },
        { label: 'Status', value: viewing.status },
      ].map(row => (
        <div
          key={row.label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
            padding: '7px 0',
            fontSize: '0.82rem',
          }}
        >
          <span style={{ color: TEXT_MUTED, fontWeight: 600 }}>{row.label}</span>
          <span style={{ fontWeight: 700, color: SLATE }}>{row.value}</span>
        </div>
      ))}
      {viewing.notes && (
        <div
          style={{
            marginTop: '10px',
            background: WHITE,
            padding: '10px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            border: '1px solid #E2E8F0',
          }}
        >
          <strong>Notes:</strong> {viewing.notes}
        </div>
      )}
    </div>

    <div>
      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: SLATE, marginBottom: '10px' }}>
        Update Status
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        {(Object.keys(STATUS_CONFIG) as Viewing['status'][]).map(s => (
          <button
            key={s}
            type="button"
            onClick={() => onStatusChange(viewing.id, s)}
            style={{
              padding: '8px',
              background: viewing.status === s ? STATUS_CONFIG[s].color : WHITE,
              color: viewing.status === s ? WHITE : SLATE,
              border: `1px solid ${STATUS_CONFIG[s].color}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          onClick={() => onNotify(`WhatsApp reminder sent to ${viewing.clientPhone}`, GREEN)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '9px',
            background: GREEN,
            color: WHITE,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.8rem',
          }}
        >
          <MessageCircle size={14} />
          <span>Send WhatsApp Reminder</span>
        </button>
        <button
          type="button"
          onClick={() => onNotify(`Lead conversion initiated for viewing ${viewing.id}`, BLUE)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '9px',
            background: BLUE,
            color: WHITE,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.8rem',
          }}
        >
          <ClipboardList size={14} />
          <span>Convert to Offer / Lead</span>
        </button>
        <button
          type="button"
          onClick={() =>
            onNotify(`Generating PDF confirmation for ${viewing.clientName}...`, SLATE)
          }
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '9px',
            background: SLATE,
            color: WHITE,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.8rem',
          }}
        >
          <FileText size={14} />
          <span>Export Viewing Confirmation</span>
        </button>
      </div>
    </div>
  </div>
);
