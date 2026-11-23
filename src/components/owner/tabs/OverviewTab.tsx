import React, { useMemo, useState } from 'react';
import { ReactReduxContext, useSelector } from 'react-redux';
import { selectSearchLeadCount } from '../../../store/slices/searchLeadsSlice';
import type { OverviewTabProps } from './types';
import './TabStyles.css';
import type { RootState } from '../../../store/store';
import { SkeletonKPI } from '../../ui/Skeleton';
import { isCreatorSuperUserEmail } from '../../../utils/superUserAccess';
import { AI_ASSISTANTS_REGISTRY } from '../../../store/slices/aiAssistant/registry';
import {
  getOverviewStats,
  QUICK_ACTIONS_CONFIG,
  MODULE_ZONES_CONFIG,
  OverviewKpiGrid,
  OverviewQuickActions,
  OverviewCharts,
  OverviewTimeline,
} from './overview';

export * from './overview';

const OverviewTab: React.FC<OverviewTabProps> = ({ data, loading, onQuickAction }) => {
  const [snapshotsExpanded, setSnapshotsExpanded] = useState(true);
  const reduxContext = React.useContext(ReactReduxContext);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const homepageSearchLeads = reduxContext?.store
    ? selectSearchLeadCount(reduxContext.store.getState() as RootState)
    : 0;
  const isManagingDirector = isCreatorSuperUserEmail(currentUser?.email);

  const stats = useMemo(
    () => getOverviewStats(data, homepageSearchLeads),
    [data, homepageSearchLeads]
  );

  const assistantPreview = useMemo(() => Object.values(AI_ASSISTANTS_REGISTRY).slice(0, 12), []);

  if (loading) {
    return (
      <div className="overview-tab">
        <div className="kpi-grid" role="status" aria-label="Loading dashboard overview">
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonKPI key={i} height={100} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overview-tab">
      {isManagingDirector && (
        <section className="overview-hero" style={{ marginBottom: 16 }}>
          <div>
            <span className="tab-section-kicker">Managing Director cockpit</span>
            <h2>Company Pulse</h2>
            <p>
              Monitor every core operation, live activity, AI assistant status, and team outputs.
            </p>
          </div>
          <div className="overview-hero__meta">
            <span>Hierarchy enabled</span>
            <strong>All departments organized</strong>
          </div>
        </section>
      )}

      <section className="overview-hero">
        <div>
          <span className="tab-section-kicker">Executive snapshot</span>
          <h2>Performance at a glance</h2>
          <p>
            Track live portfolio health, team activity, and the channels driving pipeline quality.
          </p>
        </div>
        <div className="overview-hero__meta">
          <span>Live view</span>
          <strong>Updated from CRM data</strong>
        </div>
      </section>

      <OverviewKpiGrid stats={stats} />

      <OverviewQuickActions actions={QUICK_ACTIONS_CONFIG} onQuickAction={onQuickAction} />

      <OverviewCharts
        isManagingDirector={isManagingDirector}
        moduleZones={MODULE_ZONES_CONFIG}
        assistantPreview={assistantPreview}
        snapshotsExpanded={snapshotsExpanded}
        onToggleSnapshots={() => setSnapshotsExpanded(current => !current)}
      />

      <OverviewTimeline recentActivities={data?.recentActivities || []} />
    </div>
  );
};

export default React.memo(OverviewTab);
