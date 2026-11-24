import type { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

export const headerBannerStyle: CSSProperties = {
  background: 'linear-gradient(135deg, #0F172A 0%, #164E63 100%)',
  color: '#FFFFFF',
  borderRadius: '16px',
  padding: '1.5rem',
  boxShadow: '0 8px 24px rgba(6, 182, 212, 0.15)',
  border: '1px solid rgba(6, 182, 212, 0.4)',
};

export const headerTopRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.85rem',
};

export const badgeStyle: CSSProperties = {
  background: 'var(--color-06b6d4, #06B6D4)',
  color: 'var(--white, #FFFFFF)',
  fontWeight: 800,
  fontSize: '0.8rem',
  padding: '6px 14px',
  borderRadius: '8px',
};

export const bannerDescriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: '0.88rem',
  color: 'var(--text-secondary, #CBD5E1)',
  lineHeight: 1.5,
};

export const filterBarContainerStyle: CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
};

export const featureGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '1rem',
};

export const featureCardStyle: CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '14px',
  padding: '1.25rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const featureCardHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem',
};

export const simulatorContainerStyle: CSSProperties = {
  background: 'var(--color-f8fafc, #F8FAFC)',
  border: '1.5px solid var(--color-06b6d4, #06B6D4)',
  borderRadius: '16px',
  padding: '1.5rem',
};

export const simulatorHeadingStyle: CSSProperties = {
  margin: '0 0 0.85rem 0',
  fontSize: '1.1rem',
  fontWeight: 800,
  color: 'var(--color-1e293b, #1E293B)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

export const simulatorInputStyle: CSSProperties = {
  flex: 1,
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid #CBD5E1',
  fontSize: '0.88rem',
  fontWeight: 600,
  outline: 'none',
};

export const simulatorSubmitButtonStyle: CSSProperties = {
  background: '#06B6D4',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '10px',
  padding: '10px 20px',
  fontSize: '0.88rem',
  fontWeight: 800,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};
