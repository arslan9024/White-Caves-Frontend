import React, { FC } from 'react';
import type { CSSProperties } from 'react';

export interface PortalMetric {
  label: string;
  value: string;
  accent?: boolean;
}

export interface PortalSectionItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
}

interface PortalShellProps {
  portalId: string;
  subdomain: string;
  title: string;
  subtitle: string;
  metrics: PortalMetric[];
  items: PortalSectionItem[];
  onRefresh?: () => void;
}

const shellStyles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    color: '#FFFFFF',
    padding: '2rem clamp(1rem, 4vw, 3rem)',
  },
  header: {
    maxWidth: '1280px',
    margin: '0 auto 2rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    paddingBottom: '1.25rem',
    borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
  },
  badge: {
    display: 'inline-block',
    padding: '0.2rem 0.6rem',
    borderRadius: '9999px',
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
    color: '#EF4444',
    fontSize: '0.75rem',
    fontWeight: 700,
    marginBottom: '0.4rem',
  },
  title: { margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#FFFFFF' },
  subtitle: { margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#94A3B8' },
  refreshBtn: {
    padding: '0.55rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(239, 68, 68, 0.45)',
    backgroundColor: 'rgba(239, 68, 68, 0.14)',
    color: '#FFFFFF',
    fontWeight: 600,
    cursor: 'pointer',
  },
  metricsGrid: {
    maxWidth: '1280px',
    margin: '0 auto 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  metricCard: {
    padding: '1.25rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(30, 41, 59, 0.75)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
  },
  metricLabel: { fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.35rem' },
  metricValue: { fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' },
  itemsGrid: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  itemCard: {
    padding: '1.25rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  itemTitle: { fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' },
  itemSub: { fontSize: '0.85rem', color: '#94A3B8' },
  itemStatus: { fontSize: '0.75rem', fontWeight: 700, color: '#EF4444', marginTop: '0.25rem' },
};

export const PortalShell: FC<PortalShellProps> = ({
  portalId,
  subdomain,
  title,
  subtitle,
  metrics,
  items,
  onRefresh,
}) => (
  <main style={shellStyles.container} data-testid={`portal-${portalId}`}>
    <header style={shellStyles.header}>
      <div>
        <span style={shellStyles.badge}>{subdomain}</span>
        <h1 style={shellStyles.title}>{title}</h1>
        <p style={shellStyles.subtitle}>{subtitle}</p>
      </div>
      {onRefresh && (
        <button type="button" style={shellStyles.refreshBtn} onClick={onRefresh}>
          Sync Portal Data
        </button>
      )}
    </header>

    <section style={shellStyles.metricsGrid}>
      {metrics.map(m => (
        <div key={m.label} style={shellStyles.metricCard}>
          <div style={shellStyles.metricLabel}>{m.label}</div>
          <div style={{ ...shellStyles.metricValue, ...(m.accent ? { color: '#EF4444' } : {}) }}>
            {m.value}
          </div>
        </div>
      ))}
    </section>

    <section style={shellStyles.itemsGrid}>
      {items.map(item => (
        <article key={item.id} style={shellStyles.itemCard}>
          <div style={shellStyles.itemTitle}>{item.title}</div>
          <div style={shellStyles.itemSub}>{item.subtitle}</div>
          <div style={shellStyles.itemStatus}>{item.status}</div>
        </article>
      ))}
    </section>
  </main>
);

