import React from 'react';

export const cardStyle: React.CSSProperties = {
  background: 'var(--color-surface, #fff)',
  border: '1px solid var(--color-border, #e5e7eb)',
  borderRadius: '12px',
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

export const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.2rem 0.6rem',
  borderRadius: '999px',
  fontSize: '0.8rem',
  fontWeight: 500,
};

export const btnPrimary: React.CSSProperties = {
  padding: '0.5rem 1.25rem',
  borderRadius: '8px',
  border: 'none',
  background: 'var(--color-primary, #EF4444)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '0.9rem',
};

export const btnSecondary: React.CSSProperties = {
  padding: '0.4rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--color-border, #e5e7eb)',
  background: 'var(--color-surface, #fff)',
  cursor: 'pointer',
  fontSize: '0.85rem',
};

export const btnDanger: React.CSSProperties = {
  ...btnSecondary,
  color: '#EF4444',
  borderColor: '#fecaca',
};

export const inputStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid var(--color-border, #e5e7eb)',
  fontSize: '0.9rem',
  width: '100%',
  boxSizing: 'border-box',
};
