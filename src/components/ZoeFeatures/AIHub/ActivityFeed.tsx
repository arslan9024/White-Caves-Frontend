import React from 'react';
import { Activity as ActivityIcon, Zap } from 'lucide-react';
import type { AIAssistant } from '../../../store/slices/aiAssistant/types';
import type { Activity } from '../../../store/slices/aiAssistantDashboardSlice';
import { ASSISTANT_ICONS } from './aiHubData';
import { formatTime, getStatusColor } from './aiHubHelpers';

interface ActivityFeedProps {
  activities: Activity[];
  assistants: AIAssistant[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, assistants }) => {
  return (
    <div className="activity-feed">
      <div className="feed-header">
        <ActivityIcon size={18} />
        <h3>Live Activity Feed</h3>
        <span className="activity-count">{activities.length} recent</span>
      </div>

      <div className="activity-list">
        {activities.slice(0, 10).map((activity: Activity) => {
          const Icon = ASSISTANT_ICONS[activity.assistantId] || Zap;
          const assistant = assistants.find(a => a.id === activity.assistantId);

          return (
            <div key={activity.id} className="activity-item">
              <div
                className="activity-icon"
                style={{ background: assistant?.colorScheme || 'var(--text-secondary)' }}
              >
                <Icon size={14} />
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="assistant-name">{assistant?.name || activity.assistantId}</span>
                  <span className="activity-time">{formatTime(activity.timestamp)}</span>
                </div>
                <div className="activity-action">{activity.action}</div>
                <div className="activity-target">{activity.target}</div>
              </div>
              <div
                className="activity-status"
                style={{ background: getStatusColor(activity.type) }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
