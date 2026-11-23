import React from 'react';
import { AIAssistantItem } from './types';
import { AIAssistantCard } from './AIAssistantCard';
import { aiAssistantCardStyles } from './styles';

interface AIAssistantsGridProps {
  assistants: AIAssistantItem[];
  onSelectAssistant: (id: string) => void;
  onChat?: (assistant: AIAssistantItem, e: React.MouseEvent) => void;
  onConfigure?: (assistant: AIAssistantItem, e: React.MouseEvent) => void;
  onToggleStatus?: (assistant: AIAssistantItem, e: React.MouseEvent) => void;
}

export const AIAssistantsGrid: React.FC<AIAssistantsGridProps> = ({
  assistants,
  onSelectAssistant,
  onChat,
  onConfigure,
  onToggleStatus,
}) => {
  return (
    <div style={aiAssistantCardStyles.grid}>
      {assistants.map(assistant => (
        <AIAssistantCard
          key={assistant.id}
          assistant={assistant}
          onSelect={onSelectAssistant}
          onChat={onChat}
          onConfigure={onConfigure}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};
