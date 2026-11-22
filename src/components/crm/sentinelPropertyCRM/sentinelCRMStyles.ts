import type { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  maxWidth: '100%',
  padding: '0.5rem',
};

export const headerBannerStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, var(--color-1e3a8a, #1E3A8A) 0%, var(--color-172554, #172554) 100%)',
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

export const headerIconContainerStyle: CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background:
    'linear-gradient(135deg, var(--accent-blue, #3B82F6) 0%, var(--accent-blue, #2563EB) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
};

export const headerBadgeStyle: CSSProperties = {
  fontSize: '0.7rem',
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '2px 8px',
  borderRadius: '4px',
  color: 'var(--color-bfdbfe, #BFDBFE)',
  fontWeight: 800,
};

export const tabsContainerStyle: CSSProperties = {
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
  border: isActive ? '1px solid var(--accent-blue, #2563EB)' : '1px solid transparent',
  background: isActive ? 'var(--accent-blue, #2563EB)' : 'var(--color-f8fafc, #F8FAFC)',
  color: isActive ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
  fontWeight: 800,
  fontSize: '0.8rem',
  cursor: 'pointer',
});
