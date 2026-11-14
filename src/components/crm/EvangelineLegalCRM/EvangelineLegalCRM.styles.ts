/**
 * Evangeline Legal CRM — Styles Layer (Mary Allen Wilkes Architecture)
 * Unified inline style presets & responsive CSS properties
 */

import type { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  maxWidth: '100%',
  padding: '0.5rem',
};

export const headerBannerStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, var(--color-312e81, #312E81) 0%, var(--color-1e1b4b, #1E1B4B) 100%)',
  color: 'var(--white, #FFFFFF)',
  padding: '1.25rem 1.5rem',
  borderRadius: '16px',
  marginBottom: '1.25rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
};

export const tabBarStyle: CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  background: 'var(--white, #FFFFFF)',
  padding: '8px 12px',
  borderRadius: '12px',
  border: '1px solid var(--text-secondary, #E2E8F0)',
  marginBottom: '1.25rem',
};

export const cardStyle: CSSProperties = {
  background: 'var(--white, #FFFFFF)',
  padding: '1.25rem',
  borderRadius: '12px',
  border: '1px solid var(--text-secondary, #E2E8F0)',
};

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid var(--text-secondary, #CBD5E1)',
  fontSize: '0.8rem',
  boxSizing: 'border-box',
};

export const primaryBtnStyle: CSSProperties = {
  background: 'var(--accent-purple, #7C3AED)',
  color: 'var(--white, #FFF)',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 18px',
  fontSize: '0.85rem',
  fontWeight: 800,
  cursor: 'pointer',
};
