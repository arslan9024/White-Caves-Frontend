import { CSSProperties } from 'react';

export const lblStyle: CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 800,
  color: '#94A3B8',
  textTransform: 'uppercase',
};

export const inpStyle: CSSProperties = {
  width: '100%',
  marginTop: '6px',
  padding: '10px 14px',
  background: '#0F172A',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.85rem',
};

export const overlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 1000,
};

export const drawerContainerStyle: CSSProperties = {
  width: '100%',
  maxWidth: '480px',
  height: '100%',
  backgroundColor: '#070D18',
  borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
  overflowY: 'auto',
};

export const drawerHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
};

export const drawerFormStyle: CSSProperties = {
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  flex: 1,
};

export const gridRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
};

