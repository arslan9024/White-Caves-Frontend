/**
 * styles.ts
 *
 * Dedicated styling objects for Department Task Kanban components.
 */

import { CSSProperties } from 'react';

export const kanbanStyles = {
  container: {
    background: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    padding: '1.5rem',
    color: '#0F172A',
    fontFamily: 'inherit',
  } as CSSProperties,

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '10px',
  } as CSSProperties,

  title: {
    margin: 0,
    fontSize: '1.15rem',
    fontWeight: 800,
  } as CSSProperties,

  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '0.8rem',
    color: '#64748B',
  } as CSSProperties,

  createButton: {
    background: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '0.8rem',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
  } as CSSProperties,

  filtersScroll: {
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
    paddingBottom: '8px',
    marginBottom: '1.25rem',
  } as CSSProperties,

  filterPill: (isSelected: boolean): CSSProperties => ({
    padding: '4px 10px',
    borderRadius: '20px',
    border: isSelected ? '1px solid #EF4444' : '1px solid #E2E8F0',
    background: isSelected ? '#EF4444' : '#F8FAFC',
    color: isSelected ? '#FFFFFF' : '#475569',
    fontSize: '0.72rem',
    fontWeight: isSelected ? 800 : 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }),

  columnsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
    alignItems: 'flex-start',
  } as CSSProperties,

  column: {
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '1rem',
    minHeight: '260px',
  } as CSSProperties,

  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '2px solid #E2E8F0',
  } as CSSProperties,

  columnBadge: (color: string): CSSProperties => ({
    background: color,
    color: '#FFFFFF',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 800,
  }),

  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as CSSProperties,

  card: {
    background: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    padding: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  } as CSSProperties,

  priorityBadge: (isCritical: boolean): CSSProperties => ({
    background: isCritical ? '#FEE2E2' : '#EFF6FF',
    color: isCritical ? '#991B1B' : '#1E40AF',
    fontSize: '0.62rem',
    fontWeight: 900,
    padding: '1px 5px',
    borderRadius: '4px',
  }),

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  } as CSSProperties,

  modalContent: {
    background: '#FFFFFF',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '520px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  } as CSSProperties,

  modalHeader: {
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    padding: '1.25rem 1.5rem',
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as CSSProperties,

  formInput: {
    width: '100%',
    padding: '9px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    fontSize: '0.82rem',
    outline: 'none',
    boxSizing: 'border-box',
  } as CSSProperties,

  submitButton: {
    marginTop: '8px',
    background: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontWeight: 800,
    fontSize: '0.88rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
  } as CSSProperties,
};
