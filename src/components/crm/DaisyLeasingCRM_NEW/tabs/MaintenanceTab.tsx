import React, { useState } from 'react';
import { MaintenanceRequest } from '../data/leasing';
import {
  MaintenanceTabProps,
  PRIORITY_ORDER,
  FilterPriority,
  FilterStatus,
} from './MaintenanceTab.data';
import { MaintenanceCard } from './MaintenanceCard';

const MaintenanceTab: React.FC<MaintenanceTabProps> = ({ requests, onUpdateStatus }) => {
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  const filtered = requests
    .filter(r => filterPriority === 'all' || r.priority === filterPriority)
    .filter(r => filterStatus === 'all' || r.status === filterStatus)
    .sort((a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority));

  return (
    <div className="maintenance-view">
      <div className="view-header">
        <div>
          <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Maintenance Requests</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {stats.total} total · {stats.pending} pending · {stats.in_progress} in progress ·{' '}
            {stats.completed} completed
          </p>
        </div>
        <button
          className="add-btn"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-teal, #14B8A6) 0%, var(--accent-green, #10B981) 100%)',
          }}
        >
          + New Request
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div>
          <span
            style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginRight: '8px' }}
          >
            Priority:
          </span>
          <div className="filter-buttons" style={{ display: 'inline-flex', gap: '6px' }}>
            {(['all', ...PRIORITY_ORDER] as FilterPriority[]).map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: filterPriority === p ? '1px solid #14B8A6' : '1px solid #334155',
                  background: filterPriority === p ? '#14B8A6' : 'transparent',
                  color: filterPriority === p ? '#fff' : 'var(--color-text-secondary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span
            style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginRight: '8px' }}
          >
            Status:
          </span>
          <div className="filter-buttons" style={{ display: 'inline-flex', gap: '6px' }}>
            {(
              [
                'all',
                'pending',
                'in_progress',
                'scheduled',
                'completed',
                'cancelled',
              ] as FilterStatus[]
            ).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: filterStatus === s ? '1px solid #14B8A6' : '1px solid #334155',
                  background: filterStatus === s ? '#14B8A6' : 'transparent',
                  color: filterStatus === s ? '#fff' : 'var(--color-text-secondary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="maintenance-list"
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {filtered.length === 0 && (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              background: '#1e293b',
              borderRadius: '8px',
            }}
          >
            No maintenance requests match the current filters.
          </div>
        )}
        {filtered.map((req: MaintenanceRequest) => (
          <MaintenanceCard key={req.id} req={req} onUpdateStatus={onUpdateStatus} />
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTab;
