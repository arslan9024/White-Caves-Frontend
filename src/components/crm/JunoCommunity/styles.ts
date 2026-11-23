import type { CSSProperties } from 'react';

export const junoCommunityStyles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '100%',
    padding: '0.5rem',
  },
  header: {
    background:
      'linear-gradient(135deg, var(--color-4c1d95, #4C1D95) 0%, var(--color-2e1065, #2E1065) 100%)',
    color: 'var(--white, #FFFFFF)',
    padding: '1.25rem 1.5rem',
    borderRadius: '16px',
    marginBottom: '1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background:
      'linear-gradient(135deg, var(--accent-purple, #8B5CF6) 0%, var(--accent-purple, #7C3AED) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  title: {
    margin: 0,
    fontSize: '1.3rem',
    fontWeight: 800,
  },
  badge: {
    fontSize: '0.7rem',
    background: 'rgba(255, 255, 255, 0.15)',
    padding: '2px 8px',
    borderRadius: '4px',
    color: 'var(--color-ddd6fe, #DDD6FE)',
    fontWeight: 800,
  },
  subtitle: {
    margin: '0.2rem 0 0 0',
    fontSize: '0.82rem',
    color: 'var(--color-ede9fe, #EDE9FE)',
  },
  tabsContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    background: 'var(--white, #FFFFFF)',
    padding: '8px 12px',
    borderRadius: '12px',
    border: '1px solid var(--text-secondary, #E2E8F0)',
    marginBottom: '1.25rem',
  },
  card: {
    background: 'var(--white, #FFFFFF)',
    borderRadius: '12px',
    border: '1px solid var(--text-secondary, #E2E8F0)',
    overflow: 'hidden',
  },
  paddedCard: {
    background: 'var(--white, #FFFFFF)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid var(--text-secondary, #E2E8F0)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.85rem',
  },
  tableHeadRow: {
    background: 'var(--color-f8fafc, #F8FAFC)',
    borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
    color: 'var(--color-475569, #475569)',
    fontWeight: 800,
  },
  th: {
    padding: '10px 14px',
  },
  tr: {
    borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)',
  },
  td: {
    padding: '10px 14px',
  },
  noticeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  noticeCard: {
    padding: '1.25rem',
    background: 'var(--color-f8fafc, #F8FAFC)',
    borderRadius: '8px',
    border: '1px solid var(--text-secondary, #E2E8F0)',
  },
};

export const getTabButtonStyle = (isActive: boolean): CSSProperties => ({
  padding: '6px 12px',
  borderRadius: '6px',
  border: isActive ? '1px solid var(--accent-purple, #7C3AED)' : '1px solid transparent',
  background: isActive ? 'var(--accent-purple, #7C3AED)' : 'var(--color-f8fafc, #F8FAFC)',
  color: isActive ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
  fontWeight: 800,
  fontSize: '0.8rem',
  cursor: 'pointer',
});
