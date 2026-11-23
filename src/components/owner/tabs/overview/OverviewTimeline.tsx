import React from 'react';
import type { OverviewActivity } from '../types';

export interface OverviewTimelineProps {
  recentActivities: OverviewActivity[];
}

export const OverviewTimeline: React.FC<OverviewTimelineProps> = ({ recentActivities }) => {
  return (
    <div className="activity-section">
      <div className="tab-section-heading">
        <div>
          <span className="tab-section-kicker">Timeline</span>
          <h3>Recent Activity</h3>
        </div>
        <p>Latest operational signals across properties, leads, and contracts.</p>
      </div>
      <div className="activity-timeline">
        {recentActivities.map((activity, index) => (
          <div
            key={`activity-${index}-${activity.timestamp}`}
            className={`activity-item ${activity.type}`}
          >
            <div className="activity-dot"></div>
            <div className="activity-content">
              <strong>{activity.title}</strong>
              <p>{activity.description}</p>
              <small>
                {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : ''}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
