import React, { useState } from 'react';
import { Network, ArrowRight, Users } from 'lucide-react';
import type { AIAssistant } from '../../../store/slices/aiAssistant/types';
import { FEATURE_FLOWS, ASSISTANT_ICONS } from './aiHubData';

interface FeatureMapViewProps {
  assistants: AIAssistant[];
}

export const FeatureMapView: React.FC<FeatureMapViewProps> = ({ assistants }) => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  return (
    <div className="feature-map-view">
      <div className="map-header">
        <Network size={20} />
        <h3>AI Feature Integration Map</h3>
        <span className="flow-count">{FEATURE_FLOWS.length} Active Flows</span>
      </div>

      <div className="flows-grid">
        {FEATURE_FLOWS.map(flow => {
          const SourceIcon = ASSISTANT_ICONS[flow.source] || Users;
          const TargetIcon = ASSISTANT_ICONS[flow.target] || Users;
          const sourceAssistant = assistants.find(a => a.id === flow.source);
          const targetAssistant = assistants.find(a => a.id === flow.target);

          return (
            <div
              key={flow.id}
              className={`flow-card ${selectedFlow === flow.id ? 'selected' : ''}`}
              onClick={() => setSelectedFlow(selectedFlow === flow.id ? null : flow.id)}
            >
              <div className="flow-header">
                <h4>{flow.name}</h4>
                <span className={`automation-badge ${flow.automationLevel}`}>
                  {flow.automationLevel === 'full' ? 'Automated' : 'Semi-Auto'}
                </span>
              </div>

              <div className="flow-visual">
                <div
                  className="flow-node source"
                  style={{ background: sourceAssistant?.colorScheme }}
                >
                  <SourceIcon size={18} />
                  <span>{flow.source}</span>
                </div>
                <div className="flow-arrow">
                  <ArrowRight size={20} />
                </div>
                <div
                  className="flow-node target"
                  style={{ background: targetAssistant?.colorScheme }}
                >
                  <TargetIcon size={18} />
                  <span>{flow.target}</span>
                </div>
              </div>

              {selectedFlow === flow.id && <p className="flow-description">{flow.description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
