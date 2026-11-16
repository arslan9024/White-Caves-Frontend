import React from 'react';
import { MaintenanceRequest, MaintenanceStatus } from '../data/leasing';
import { PRIORITY_COLORS, STATUS_COLORS, CATEGORY_COLORS } from './MaintenanceTab.data';

interface MaintenanceCardProps {
  req: MaintenanceRequest;
  onUpdateStatus?: (id: number, status: MaintenanceStatus) => void;
}

export const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ req, onUpdateStatus }) => {
  const pCol = PRIORITY_COLORS[req.priority];
  const sCol = STATUS_COLORS[req.status];
  const catCol = CATEGORY_COLORS[req.category] ?? '#64748B';

  return (
    <div
      className={`maintenance-card ${req.priority}`}
      style={{
        flexDirection: 'column',
        alignItems: 'stretch',
        borderLeft: `3px solid ${pCol.text}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '2px',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--color-text-primary)',
              }}
            >
              {req.unit}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
              — {req.building}
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {req.tenant}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: `${catCol}22`,
              color: catCol,
              border: `1px solid ${catCol}44`,
            }}
          >
            {req.category}
          </span>
          <span
            className={`priority-badge ${req.priority}`}
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: pCol.bg,
              color: pCol.text,
            }}
          >
            {req.priority}
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: sCol.bg,
              color: sCol.text,
            }}
          >
            {req.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <p
        className="issue"
        style={{
          margin: '0 0 10px',
          fontSize: '13px',
          color: 'var(--color-text-primary)',
          lineHeight: 1.5,
        }}
      >
        {req.issue}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px',
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          marginBottom: '10px',
        }}
      >
        <span>📅 Created: {req.created}</span>
        {req.scheduledDate && <span>🗓 Scheduled: {req.scheduledDate}</span>}
        {req.completedDate && <span>✅ Completed: {req.completedDate}</span>}
        {req.estimatedCost !== null && (
          <span>💰 Est: AED {req.estimatedCost.toLocaleString()}</span>
        )}
        {req.actualCost !== null && <span>💳 Actual: AED {req.actualCost.toLocaleString()}</span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '12px',
            color: req.assignedTo ? 'var(--accent-teal, #14B8A6)' : 'var(--accent-gold, #F59E0B)',
          }}
        >
          {req.assignedTo ? `👷 ${req.assignedTo}` : '⚠️ Unassigned'}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {req.status === 'pending' && (
            <>
              <button
                onClick={() => onUpdateStatus?.(req.id, 'in_progress')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid #3B82F6',
                  background: 'rgba(59,130,246,0.1)',
                  color: '#60A5FA',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Mark In Progress
              </button>
              <button
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid #14B8A6',
                  background: 'rgba(20,184,166,0.1)',
                  color: '#14B8A6',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Assign
              </button>
            </>
          )}
          {req.status === 'in_progress' && (
            <button
              onClick={() => onUpdateStatus?.(req.id, 'completed')}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #10B981',
                background: 'rgba(16,185,129,0.1)',
                color: '#10B981',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Mark Complete
            </button>
          )}
          {req.status === 'scheduled' && (
            <button
              onClick={() => onUpdateStatus?.(req.id, 'in_progress')}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #3B82F6',
                background: 'rgba(59,130,246,0.1)',
                color: '#60A5FA',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Start Work
            </button>
          )}
          {req.status !== 'completed' && req.status !== 'cancelled' && (
            <button
              onClick={() => onUpdateStatus?.(req.id, 'cancelled')}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #EF4444',
                background: 'rgba(239,68,68,0.1)',
                color: '#EF4444',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

