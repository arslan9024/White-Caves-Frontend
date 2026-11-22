import React, { CSSProperties } from 'react';
import { RED, WHITE, SLATE, BORDER, CARD_BG, TEXT_MUTED } from './constants';

export const containerStyle: CSSProperties = {
  background: WHITE,
  color: SLATE,
  minHeight: '80vh',
  padding: '24px',
};

export const headerTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: '1.6rem',
  fontWeight: 800,
  color: SLATE,
};

export const headerSubtitleStyle: CSSProperties = {
  margin: '6px 0 0 0',
  color: TEXT_MUTED,
  fontSize: '0.875rem',
};

export const tabSwitcherStyle: CSSProperties = {
  display: 'flex',
  gap: '0',
  borderBottom: `2px solid ${BORDER}`,
  marginBottom: '24px',
};

export const getTabButtonStyle = (isActive: boolean): CSSProperties => ({
  background: 'none',
  border: 'none',
  borderBottom: isActive ? `3px solid ${RED}` : '3px solid transparent',
  padding: '10px 20px',
  cursor: 'pointer',
  fontWeight: isActive ? 700 : 500,
  color: isActive ? RED : TEXT_MUTED,
  fontSize: '0.9rem',
  textTransform: 'capitalize',
  marginBottom: '-2px',
});

export const formContainerStyle: CSSProperties = {
  background: CARD_BG,
  padding: '24px',
  borderRadius: '12px',
  border: `1px solid ${BORDER}`,
};

export const formInputStyle: CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: `1px solid ${BORDER}`,
  borderRadius: '6px',
  fontSize: '0.875rem',
  boxSizing: 'border-box',
  outline: 'none',
};

export const modalOverlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(15, 23, 42, 0.75)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

export const modalBoxStyle: CSSProperties = {
  background: WHITE,
  width: '90%',
  maxWidth: '750px',
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius: '16px',
  border: `2px solid ${RED}`,
  padding: '28px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};
