// FILE: src/components/crm/LindaWhatsAppCRM/LindaLinkAccountModal.style.ts
import type { CSSProperties } from 'react';

export const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  background: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
};

export const modalBoxStyle: CSSProperties = {
  width: '100%',
  maxWidth: 440,
  background: '#0B141A',
  border: '1px solid rgba(37, 211, 102, 0.35)',
  borderRadius: 14,
  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
  overflow: 'hidden',
  color: '#E9EDEF',
};

export const modalHeaderStyle: CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#111B21',
};

export const modalTabBarStyle: CSSProperties = {
  display: 'flex',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
};

export const inputFieldStyle: CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid rgba(255,255,255,0.15)',
  background: '#111B21',
  color: '#E9EDEF',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
};

export const primaryActionBtnStyle: CSSProperties = {
  padding: '9px 14px',
  background: '#25D366',
  border: 'none',
  borderRadius: 6,
  color: '#0B141A',
  fontWeight: 700,
  fontSize: 12,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
};
