import React from 'react';

export const aiAssistantCardStyles: {
  grid: React.CSSProperties;
  card: React.CSSProperties;
  avatar: (color: string) => React.CSSProperties;
  title: React.CSSProperties;
  statusDot: (status: 'active' | 'inactive') => React.CSSProperties;
  role: (color: string) => React.CSSProperties;
  dept: React.CSSProperties;
  chevron: React.CSSProperties;
  description: React.CSSProperties;
  statsRow: React.CSSProperties;
  statBox: React.CSSProperties;
  actionsRow: React.CSSProperties;
  actionBtn: React.CSSProperties;
  statusToggleBtn: (status: 'active' | 'inactive') => React.CSSProperties;
} = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  card: {
    cursor: 'pointer',
  },
  avatar: (color: string) => ({
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.5rem',
  }),
  title: {
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  statusDot: (status: 'active' | 'inactive') => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: status === 'active' ? '#10B981' : '#EF4444',
  }),
  role: (color: string) => ({
    fontSize: '0.875rem',
    color,
    fontWeight: '500',
    marginBottom: '4px',
  }),
  dept: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  chevron: {
    color: 'var(--text-muted)',
  },
  description: {
    margin: '16px 0 12px',
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
  },
  statsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  },
  statBox: {
    flex: 1,
    background: 'var(--surface-secondary)',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  actionsRow: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    padding: '8px',
  },
  statusToggleBtn: (status: 'active' | 'inactive') => ({
    padding: '8px 12px',
    background: status === 'active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
    color: status === 'active' ? '#EF4444' : '#10B981',
  }),
};
