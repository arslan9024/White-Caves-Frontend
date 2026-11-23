import React from 'react';
import { MessageSquare, Settings, Play, Pause, ChevronRight } from 'lucide-react';
import { AIAssistantItem } from './types';
import { aiAssistantCardStyles } from './styles';

interface AIAssistantCardProps {
  assistant: AIAssistantItem;
  onSelect?: (id: string) => void;
  onChat?: (assistant: AIAssistantItem, e: React.MouseEvent) => void;
  onConfigure?: (assistant: AIAssistantItem, e: React.MouseEvent) => void;
  onToggleStatus?: (assistant: AIAssistantItem, e: React.MouseEvent) => void;
}

export const AIAssistantCard: React.FC<AIAssistantCardProps> = ({
  assistant,
  onSelect,
  onChat,
  onConfigure,
  onToggleStatus,
}) => {
  return (
    <div
      className="crm-card"
      onClick={() => onSelect?.(assistant.id)}
      style={aiAssistantCardStyles.card}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={aiAssistantCardStyles.avatar(assistant.color)}>{assistant.name.charAt(0)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3 style={aiAssistantCardStyles.title}>{assistant.name}</h3>
            <span style={aiAssistantCardStyles.statusDot(assistant.status)} />
          </div>
          <div style={aiAssistantCardStyles.role(assistant.color)}>{assistant.role}</div>
          <div style={aiAssistantCardStyles.dept}>{assistant.dept} Department</div>
        </div>
        <ChevronRight size={20} style={aiAssistantCardStyles.chevron} />
      </div>

      <p style={aiAssistantCardStyles.description}>{assistant.description}</p>

      <div style={aiAssistantCardStyles.statsRow}>
        <div style={aiAssistantCardStyles.statBox}>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {assistant.tasks}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tasks</div>
        </div>
        <div style={aiAssistantCardStyles.statBox}>
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'var(--accent-green, #10B981)',
            }}
          >
            {assistant.accuracy}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Accuracy</div>
        </div>
      </div>

      <div style={aiAssistantCardStyles.actionsRow}>
        <button
          className="crm-btn crm-btn-secondary"
          style={aiAssistantCardStyles.actionBtn}
          onClick={e => {
            e.stopPropagation();
            onChat?.(assistant, e);
          }}
        >
          <MessageSquare size={14} /> Chat
        </button>
        <button
          className="crm-btn crm-btn-secondary"
          style={aiAssistantCardStyles.actionBtn}
          onClick={e => {
            e.stopPropagation();
            onConfigure?.(assistant, e);
          }}
        >
          <Settings size={14} /> Configure
        </button>
        <button
          className="crm-btn"
          style={aiAssistantCardStyles.statusToggleBtn(assistant.status)}
          onClick={e => {
            e.stopPropagation();
            onToggleStatus?.(assistant, e);
          }}
        >
          {assistant.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </div>
  );
};
