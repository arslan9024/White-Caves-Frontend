import React from 'react';
import type { CSSProperties } from 'react';

export const panelCardStyle: CSSProperties = {
  background: 'var(--white, #FFFFFF)',
  padding: '1.25rem',
  borderRadius: '12px',
  border: '1px solid var(--text-secondary, #E2E8F0)',
};

export const panelHeaderStyle: CSSProperties = {
  margin: '0 0 1rem 0',
  fontSize: '0.95rem',
  fontWeight: 800,
  color: 'var(--color-1e293b, #1E293B)',
};

export const labelStyle: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 800,
  color: 'var(--text-secondary, #64748B)',
};

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid var(--text-secondary, #CBD5E1)',
  fontSize: '0.85rem',
  boxSizing: 'border-box',
};

export const metricSubCardStyle: CSSProperties = {
  padding: '0.75rem',
  background: 'var(--color-f8fafc, #F8FAFC)',
  borderRadius: '6px',
  border: '1px solid var(--text-secondary, #E2E8F0)',
};

export const tableHeaderCellStyle: CSSProperties = {
  padding: '10px 14px',
};
