/**
 * Henry Document Hub — Styles Layer (Mary Allen Wilkes Architecture)
 * Centralized inline style presets & token mappings
 */

import type { CSSProperties } from 'react';

export const hubContainerStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  fontFamily: 'system-ui, sans-serif',
};

export const sidebarStyle: CSSProperties = {
  width: 220,
  borderRight: '1px solid #2a2a2a',
  overflowY: 'auto',
  background: '#111',
  padding: '12px 0',
};

export const sidebarHeaderStyle: CSSProperties = {
  padding: '8px 16px 16px',
  color: '#C9A84C',
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: 1,
};

export const mainContentStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  background: 'var(--color-0f0f0f, #0f0f0f)',
  padding: 24,
};

export const errorAlertStyle: CSSProperties = {
  background: 'rgba(239, 68, 68, 0.08)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: 6,
  padding: '10px 14px',
  marginBottom: 16,
  color: '#ef4444',
  fontSize: 13,
};

export const successAlertStyle: CSSProperties = {
  background: '#1a3a1a',
  border: '1px solid #2e7d32',
  borderRadius: 6,
  padding: '10px 14px',
  marginBottom: 16,
  color: '#8f8',
  fontSize: 13,
};

export const formInputStyle: CSSProperties = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: 4,
  color: '#fff',
  padding: '8px 10px',
  fontSize: 13,
  boxSizing: 'border-box',
};

export const formTextareaStyle: CSSProperties = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: 4,
  color: '#fff',
  padding: '8px 10px',
  fontSize: 13,
  resize: 'vertical',
  boxSizing: 'border-box',
};

export const severityColorMap = {
  error: '#ef4444',
  warning: '#C9A84C',
  info: '#C9A84C',
} as const;

export const severityIconMap = {
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
} as const;

