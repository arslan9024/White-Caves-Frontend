import type { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  maxWidth: '100%',
  padding: '0.5rem',
};

export const headerContainerStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, var(--color-14532d, #14532D) 0%, var(--color-052e16, #052E16) 100%)',
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

export const headerIconWrapperStyle: CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background:
    'linear-gradient(135deg, var(--accent-green, #22C55E) 0%, var(--accent-green, #16A34A) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
};

export const tabsNavStyle: CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  background: 'var(--white, #FFFFFF)',
  padding: '8px 12px',
  borderRadius: '12px',
  border: '1px solid var(--text-secondary, #E2E8F0)',
  marginBottom: '1.25rem',
};

export const getTabButtonStyle = (isActive: boolean): CSSProperties => ({
  padding: '6px 12px',
  borderRadius: '6px',
  border: isActive ? '1px solid var(--accent-green, #16A34A)' : '1px solid transparent',
  background: isActive ? 'var(--accent-green, #16A34A)' : 'var(--color-f8fafc, #F8FAFC)',
  color: isActive ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
  fontWeight: 800,
  fontSize: '0.8rem',
  cursor: 'pointer',
});
