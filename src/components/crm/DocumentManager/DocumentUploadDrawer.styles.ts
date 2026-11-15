import type { CSSProperties } from 'react';

export const DRAWER_OVERLAY_STYLE: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(4px)',
  zIndex: 1100,
  display: 'flex',
  justifyContent: 'flex-end',
};

export const DRAWER_PANEL_STYLE: CSSProperties = {
  width: '100%',
  maxWidth: '460px',
  height: '100%',
  backgroundColor: '#070D18',
  borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
};

export const DRAWER_HEADER_STYLE: CSSProperties = {
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const DRAWER_BODY_STYLE: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

export const FIELD_LABEL_STYLE: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#94A3B8',
  display: 'block',
  marginBottom: '6px',
};

export const FIELD_INPUT_STYLE: CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  background: '#0F172A',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '6px',
  color: '#FFFFFF',
  fontSize: '0.85rem',
};
