import React from 'react';
import { AnimatedMetric, Sparkline } from './OverviewMetrics';
import type { OverviewStatItem, QuickActionItem } from './overviewConstants';

export interface OverviewKpiGridProps {
  stats: OverviewStatItem[];
}

export const OverviewKpiGrid: React.FC<OverviewKpiGridProps> = ({ stats }) => {
  return (
    <div className="kpi-grid">
      {stats.map(stat => (
        <article
          key={stat.title}
          className="kpi-tile"
          style={{ '--accent-color': stat.color } as React.CSSProperties}
        >
          <div className="kpi-tile__header">
            <span className="kpi-tile__icon">{stat.icon}</span>
            <span
              className={`kpi-tile__change ${stat.change.startsWith('+') ? 'positive' : 'neutral'}`}
            >
              {stat.change}
            </span>
          </div>
          <div className="kpi-tile__value">
            <AnimatedMetric value={stat.value} formatter={stat.formatter} />
          </div>
          <div className="kpi-tile__title">{stat.title}</div>
          <Sparkline values={stat.trend} color={stat.color} />
        </article>
      ))}
    </div>
  );
};

export interface OverviewQuickActionsProps {
  actions: QuickActionItem[];
  onQuickAction?: (action: string) => void;
}

export const OverviewQuickActions: React.FC<OverviewQuickActionsProps> = ({
  actions,
  onQuickAction,
}) => {
  return (
    <div className="quick-actions-section">
      <div className="tab-section-heading">
        <div>
          <span className="tab-section-kicker">Actions</span>
          <h3>Quick Actions</h3>
        </div>
        <p>Shortcuts for the most common portfolio and team operations.</p>
      </div>
      <div className="quick-actions-grid">
        {actions.map(action => (
          <button
            key={action.id}
            className="quick-action-btn"
            style={{ '--action-color': action.color } as React.CSSProperties}
            onClick={() => onQuickAction?.(action.action)}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
