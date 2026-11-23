import React from 'react';
import type { AIAssistant } from '../../../store/slices/aiAssistant/types';
import { ASSISTANT_SEQUENCE_PLAN } from '../../../config/assistantImplementationProgress';

interface ImplementationSequenceProps {
  assistants: AIAssistant[];
}

export const ImplementationSequence: React.FC<ImplementationSequenceProps> = ({ assistants }) => {
  return (
    <div className="department-section">
      <div className="department-header">
        <h2>Implementation Sequence</h2>
        <span className="assistant-count">{ASSISTANT_SEQUENCE_PLAN.length} pending</span>
      </div>
      <div className="assistants-grid">
        {ASSISTANT_SEQUENCE_PLAN.map((assistantId: string, index: number) => {
          const assistant = assistants.find(item => item.id === assistantId);
          return (
            <div key={assistantId} className="assistant-card">
              <div className="assistant-header">
                <div
                  className="assistant-avatar"
                  style={{ background: assistant?.colorScheme || 'var(--primary-color, #E31E24)' }}
                >
                  {index + 1}
                </div>
                <div className="assistant-info">
                  <div className="name-row">
                    <h3>{assistant?.name || assistantId}</h3>
                  </div>
                  <span className="assistant-role">
                    {assistant?.title || 'Assistant upgrade pending'}
                  </span>
                  <span className="assistant-department">{assistant?.department || 'unknown'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
