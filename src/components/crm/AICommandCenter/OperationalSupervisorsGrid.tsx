import React, { FC } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { SupervisorDef } from '../../../data/assistants108Registry.data';
import {
  AssistantsGrid,
  AssistantCard,
  AssistantHeader,
  TagList,
  CapabilityTag,
  MetricsRow,
  LaunchBtn,
} from './styles/AICommandCenter.style';

export interface OperationalSupervisorsGridProps {
  filteredAssistants: SupervisorDef[];
  selectedAssistantId: string | null;
  onSelectAssistant: (agentId: string) => void;
  onLaunchAgent?: (agentId: string) => void;
}

export const OperationalSupervisorsGrid: FC<OperationalSupervisorsGridProps> = ({
  filteredAssistants,
  selectedAssistantId,
  onSelectAssistant,
  onLaunchAgent,
}) => {
  return (
    <AssistantsGrid data-testid="assistants-grid" aria-live="polite">
      {filteredAssistants.map((agent: SupervisorDef) => {
        const isSelected = selectedAssistantId === agent.id;
        return (
          <AssistantCard
            key={agent.id}
            $active={isSelected}
            role="region"
            aria-label={`${agent.name} — ${agent.title}`}
            data-testid={`agent-card-${agent.id}`}
          >
            <AssistantHeader>
              <img src={agent.avatar} alt={agent.name} loading="lazy" />
              <div className="meta">
                <h3>
                  <span>{agent.name}</span>
                  <span className="code">{agent.code}</span>
                </h3>
                <p className="title">{agent.title}</p>
              </div>
            </AssistantHeader>

            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#EF4444',
                margin: '0 0 6px',
              }}
            >
              📋 Specialty: {agent.specialty}
            </div>

            <div
              style={{
                margin: '0 0 8px',
                fontSize: '0.75rem',
                color: '#334155',
                lineHeight: 1.4,
              }}
            >
              <strong style={{ display: 'block', color: '#0F172A', marginBottom: '2px' }}>
                Assigned Tasks:
              </strong>
              {agent.assignedTasks.map((t, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }} aria-hidden="true">
                    •
                  </span>{' '}
                  {t}
                </div>
              ))}
            </div>

            <TagList>
              {agent.capabilities.slice(0, 3).map((cap: string, i: number) => (
                <CapabilityTag key={i}>{cap}</CapabilityTag>
              ))}
            </TagList>

            <MetricsRow>
              <div className="metric-item">
                <span className="label">Accuracy</span>
                <strong className="val">{agent.metrics.accuracyRate}%</strong>
              </div>
              <div className="metric-item">
                <span className="label">SLA Speed</span>
                <strong className="val">{agent.slaResponseTime}</strong>
              </div>
            </MetricsRow>

            <LaunchBtn
              type="button"
              aria-label={`Launch ${agent.name} (${agent.title})`}
              title={`Launch ${agent.name} in Main Workspace`}
              onClick={() => {
                onSelectAssistant(agent.id);
                onLaunchAgent?.(agent.id);
              }}
              data-testid={`btn-launch-${agent.id}`}
            >
              <span>Launch {agent.name}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </LaunchBtn>
          </AssistantCard>
        );
      })}
    </AssistantsGrid>
  );
};

export default OperationalSupervisorsGrid;
