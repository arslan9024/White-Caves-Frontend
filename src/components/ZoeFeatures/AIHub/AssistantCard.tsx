import React from 'react';
import { Star, ChevronRight, Users } from 'lucide-react';
import type { AIAssistant } from '../../../store/slices/aiAssistant/types';
import { ASSISTANT_ICONS } from './aiHubData';

interface AssistantCardProps {
  assistant: AIAssistant;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: (assistantId: string) => void;
}

export const AssistantCard: React.FC<AssistantCardProps> = ({
  assistant,
  isSelected,
  isFavorite,
  onSelect,
}) => {
  const Icon = ASSISTANT_ICONS[assistant.id] || Users;

  return (
    <div
      className={`assistant-card ${isSelected ? 'active' : ''}`}
      style={{ '--assistant-color': assistant.colorScheme } as React.CSSProperties}
      onClick={() => onSelect(assistant.id)}
    >
      <div className="assistant-header">
        <div className="assistant-avatar" style={{ background: assistant.colorScheme }}>
          <Icon size={24} />
        </div>
        <div className="assistant-info">
          <div className="name-row">
            <h3>{assistant.name}</h3>
            {isFavorite && (
              <Star size={14} className="favorite-icon" fill="#F59E0B" color="#F59E0B" />
            )}
          </div>
          <span className="assistant-role">{assistant.title}</span>
          <span className="assistant-department">{assistant.department}</span>
        </div>
        <div className="card-status">
          <span
            className={`status-dot ${assistant.metrics.systemHealth}`}
            title={String(assistant.metrics.systemHealth)}
          />
        </div>
      </div>

      <p className="assistant-description">{assistant.description}</p>

      <div className="assistant-stats">
        {assistant.quickStats && (
          <div className="stat-item highlight">
            <span className="stat-value">
              {String((assistant.quickStats as unknown as Record<string, unknown>)?.value ?? '')}
            </span>
            <span className="stat-label">
              {String((assistant.quickStats as unknown as Record<string, unknown>)?.label ?? '')}
            </span>
          </div>
        )}
        <div className="stat-item">
          <span className="stat-value">{assistant.metrics.tasksCompleted}</span>
          <span className="stat-label">Tasks</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{assistant.metrics.activeUsers}</span>
          <span className="stat-label">Users</span>
        </div>
      </div>

      <div className="assistant-capabilities">
        {assistant.capabilities.slice(0, 3).map((cap: string) => (
          <span key={cap} className="capability-tag">
            {cap.replace(/_/g, ' ')}
          </span>
        ))}
        {assistant.capabilities.length > 3 && (
          <span className="capability-tag more">+{assistant.capabilities.length - 3}</span>
        )}
      </div>

      <div className="card-footer">
        <button className="open-btn">
          Open Dashboard
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
