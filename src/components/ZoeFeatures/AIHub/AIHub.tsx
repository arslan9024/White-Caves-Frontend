import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Activity, Network, Layers } from 'lucide-react';
import type { AIAssistant } from '../../../store/slices/aiAssistant/types';
import {
  selectAllAssistantsArray,
  selectUI,
  selectFavorites,
  selectRecentActivity,
  selectPerformance,
  selectAssistant,
  addActivity,
} from '../../../store/slices/aiAssistantDashboardSlice';
import { QuickStatsBar } from './QuickStatsBar';
import { AssistantCard } from './AssistantCard';
import { FeatureMapView } from './FeatureMapView';
import { ActivityFeed } from './ActivityFeed';
import { ImplementationSequence } from './ImplementationSequence';
import './AIAssistantHub.css';

// Re-export subcomponents, helpers, and data for clean backwards compatibility
export { AssistantCard } from './AssistantCard';
export { QuickStatsBar } from './QuickStatsBar';
export { FeatureMapView } from './FeatureMapView';
export { ActivityFeed } from './ActivityFeed';
export { ImplementationSequence } from './ImplementationSequence';
export { ASSISTANT_ICONS, FEATURE_FLOWS } from './aiHubData';
export type { FeatureFlow } from './aiHubData';
export { formatTime, getStatusColor } from './aiHubHelpers';

export interface AIAssistantHubProps {
  onSelectAssistant?: (assistantId: string) => void;
}

export const AIAssistantHub: React.FC<AIAssistantHubProps> = ({ onSelectAssistant }) => {
  const dispatch = useDispatch();
  const assistants = useSelector(selectAllAssistantsArray);
  const ui = useSelector(selectUI);
  const favorites = useSelector(selectFavorites);
  const activities = useSelector(selectRecentActivity);
  const performance = useSelector(selectPerformance);
  const [activeView, setActiveView] = useState<'overview' | 'features' | 'activity'>('overview');

  const handleAssistantClick = useCallback(
    (assistantId: string): void => {
      dispatch(selectAssistant(assistantId));
      dispatch(
        addActivity({
          assistantId: assistantId,
          action: 'Dashboard accessed',
          target: assistantId.charAt(0).toUpperCase() + assistantId.slice(1) + ' CRM',
          type: 'info',
        })
      );
      if (onSelectAssistant) {
        onSelectAssistant(assistantId);
      }
    },
    [dispatch, onSelectAssistant]
  );

  const groupedAssistants = useMemo(() => {
    return assistants.reduce<Record<string, AIAssistant[]>>((acc, assistant) => {
      const dept = assistant.department;
      // eslint-disable-next-line security/detect-object-injection
      if (!acc[dept]) acc[dept] = [];
      // eslint-disable-next-line security/detect-object-injection
      acc[dept].push(assistant);
      return acc;
    }, {});
  }, [assistants]);

  return (
    <div className="ai-assistant-hub">
      <div className="hub-header">
        <div className="header-left">
          <h1>AI Command Center</h1>
          <p>Unified dashboard for all AI assistants</p>
        </div>
      </div>

      <QuickStatsBar
        totalAssistants={assistants.length}
        activeTasks={performance?.activeTasks || 0}
        criticalAlertsCount={performance?.criticalAlerts?.length || 0}
      />

      <div className="hub-nav">
        <button
          className={`nav-btn ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          <Layers size={16} />
          Overview
        </button>
        <button
          className={`nav-btn ${activeView === 'features' ? 'active' : ''}`}
          onClick={() => setActiveView('features')}
        >
          <Network size={16} />
          Feature Map
        </button>
        <button
          className={`nav-btn ${activeView === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveView('activity')}
        >
          <Activity size={16} />
          Activity
        </button>
      </div>

      <div className="hub-content">
        {activeView === 'overview' && (
          <div className="overview-view">
            <ImplementationSequence assistants={assistants} />
            {Object.entries(groupedAssistants).map(([department, deptAssistants]) => (
              <div key={department} className="department-section">
                <div className="department-header">
                  <h2>{department.charAt(0).toUpperCase() + department.slice(1)}</h2>
                  <span className="assistant-count">{deptAssistants.length} assistants</span>
                </div>
                <div className="assistants-grid">
                  {deptAssistants.map(assistant => (
                    <AssistantCard
                      key={assistant.id}
                      assistant={assistant}
                      isSelected={ui?.selectedAssistant === assistant.id}
                      isFavorite={favorites.includes(assistant.id)}
                      onSelect={handleAssistantClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'features' && <FeatureMapView assistants={assistants} />}

        {activeView === 'activity' && (
          <ActivityFeed activities={activities} assistants={assistants} />
        )}
      </div>
    </div>
  );
};

export default AIAssistantHub;
