import React from 'react';
import type { ModuleZone } from './overviewConstants';

export interface OverviewExecutiveSectionProps {
  moduleZones: ModuleZone[];
  assistantPreview: Array<{ id: string; name: string; avatar: string; department: string }>;
  snapshotsExpanded: boolean;
  onToggleSnapshots: () => void;
}

export const OverviewExecutiveSection: React.FC<OverviewExecutiveSectionProps> = ({
  moduleZones,
  assistantPreview,
  snapshotsExpanded,
  onToggleSnapshots,
}) => {
  return (
    <>
      <section className="quick-actions-section">
        <div className="tab-section-heading">
          <div>
            <span className="tab-section-kicker">Department zones</span>
            <h3>Organized command modules</h3>
          </div>
          <p>Structured by hierarchy for executive control and quick switching.</p>
        </div>
        <div className="quick-actions-grid">
          {moduleZones.map(zone => (
            <article key={zone.title} className="quick-action-btn" style={{ cursor: 'default' }}>
              <span className="action-label" style={{ marginBottom: 6, fontWeight: 700 }}>
                {zone.title}
              </span>
              <span style={{ fontSize: 12, color: 'var(--color-94a3b8, #94a3b8)' }}>
                {zone.modules.join(' • ')}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="quick-actions-section">
        <div className="tab-section-heading">
          <div>
            <span className="tab-section-kicker">AI Assistants</span>
            <h3>Live assistant strip</h3>
          </div>
          <p>Status visibility for all assistant teams.</p>
        </div>
        <div className="quick-actions-grid">
          {assistantPreview.map(assistant => (
            <article key={assistant.id} className="quick-action-btn" style={{ cursor: 'default' }}>
              <span className="action-icon">{assistant.avatar}</span>
              <span className="action-label">{assistant.name}</span>
              <span style={{ fontSize: 11, color: 'var(--color-94a3b8, #94a3b8)' }}>
                {assistant.department}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="quick-actions-section">
        <div className="tab-section-heading">
          <div>
            <span className="tab-section-kicker">Performance snapshots</span>
            <h3>Compact executive metrics</h3>
          </div>
          <button type="button" className="quick-action-btn" onClick={onToggleSnapshots}>
            {snapshotsExpanded ? 'Hide snapshots' : 'Show snapshots'}
          </button>
        </div>
        {snapshotsExpanded && (
          <div className="quick-actions-grid">
            <article className="quick-action-btn" style={{ cursor: 'default' }}>
              <span className="action-label">FunnelEconomicsDashboard</span>
              <span style={{ fontSize: 12, color: 'var(--color-94a3b8, #94a3b8)' }}>
                Conversion and revenue funnel
              </span>
            </article>
            <article className="quick-action-btn" style={{ cursor: 'default' }}>
              <span className="action-label">KPIBaselineTracker</span>
              <span style={{ fontSize: 12, color: 'var(--color-94a3b8, #94a3b8)' }}>
                Target vs actual progression
              </span>
            </article>
            <article className="quick-action-btn" style={{ cursor: 'default' }}>
              <span className="action-label">LeadTimeline</span>
              <span style={{ fontSize: 12, color: 'var(--color-94a3b8, #94a3b8)' }}>
                Lead journey timing and actions
              </span>
            </article>
          </div>
        )}
      </section>
    </>
  );
};
