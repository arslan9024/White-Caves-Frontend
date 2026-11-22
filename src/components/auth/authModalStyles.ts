import type { CSSProperties } from 'react';

export const authModalStyles = {
  errorAlert: {
    background: 'rgba(239,68,68,0.1)',
    color: '#ef4444',
    padding: '12px',
    borderRadius: '12px',
    fontSize: '13px',
    marginBottom: '24px',
    border: '1px solid rgba(239,68,68,0.2)',
  } satisfies CSSProperties,

  socialRecoveryBox: {
    background: 'rgba(245,158,11,0.1)',
    color: '#f59e0b',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '13px',
    marginBottom: '24px',
    border: '1px solid rgba(245,158,11,0.2)',
  } satisfies CSSProperties,

  socialRetryButton: {
    background: 'var(--amber-500-10)',
    color: 'var(--amber-400)',
    border: 'none',
  } satisfies CSSProperties,

  socialDismissButton: {
    marginTop: '12px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
  } satisfies CSSProperties,

  contentContainer: {
    marginTop: '20px',
  } satisfies CSSProperties,

  forgotPasswordLink: {
    textAlign: 'center',
    marginTop: '12px',
  } satisfies CSSProperties,

  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '24px',
  } satisfies CSSProperties,

  categoryCard: (isSelected: boolean): CSSProperties => ({
    background: isSelected ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
    border: `1px solid ${isSelected ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '12px',
    padding: '16px',
    color: '#fff',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),

  categoryIcon: {
    fontSize: '24px',
    display: 'block',
    marginBottom: '8px',
  } satisfies CSSProperties,

  categoryLabel: {
    display: 'block',
    fontSize: '15px',
  } satisfies CSSProperties,

  categoryDesc: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  } satisfies CSSProperties,

  roleListGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',
    marginBottom: '24px',
    maxHeight: '40vh',
    overflowY: 'auto',
    paddingRight: '8px',
  } satisfies CSSProperties,

  roleCard: (isSelected: boolean): CSSProperties => ({
    background: isSelected ? 'rgba(59,130,246,0.1)' : 'rgba(0,0,0,0.2)',
    border: `1px solid ${isSelected ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s',
  }),

  roleIcon: {
    fontSize: '20px',
  } satisfies CSSProperties,

  roleLabel: {
    display: 'block',
    fontSize: '14px',
  } satisfies CSSProperties,

  roleDesc: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  } satisfies CSSProperties,

  stepBackButton: {
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
  } satisfies CSSProperties,

  footerText: {
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '32px',
  } satisfies CSSProperties,

  footerLinkTerms: {
    color: 'var(--text-muted)',
  } satisfies CSSProperties,

  footerLinkPrivacy: {
    color: 'var(--text-muted, #94a3b8)',
  } satisfies CSSProperties,
};
