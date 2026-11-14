import React, { useMemo } from 'react';
import { getAssistant } from '../../../config/aiAssistantsRegistry';
import { AIAssistantDashboardProps } from './AIAssistantDashboard.types';
import {
  DashboardContainer,
  CommingSoon,
} from './AIAssistantDashboard.styles';
import {
  AIAssistantHeader,
  AIAssistantInfoGrid,
  AIAssistantAboutSection,
  AIAssistantCapabilitiesSection,
  AIAssistantDepartmentsSection,
  AIAssistantDataFlowsSection,
  AIAssistantActionsSection,
  AIAssistantComingSoon,
} from './AIAssistantDashboard.panels';

export const AIAssistantDashboardView: React.FC<AIAssistantDashboardProps> = ({ assistantId }) => {
  const assistant = useMemo(() => {
    return getAssistant(assistantId);
  }, [assistantId]);

  if (!assistant) {
    return (
      <DashboardContainer>
        <CommingSoon>
          <h2>AI Assistant Not Found</h2>
          <p>The AI assistant &quot;{assistantId}&quot; could not be found.</p>
        </CommingSoon>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <AIAssistantHeader assistant={assistant} />
      <AIAssistantInfoGrid assistant={assistant} />
      <AIAssistantAboutSection assistant={assistant} />
      <AIAssistantCapabilitiesSection assistant={assistant} />
      <AIAssistantDepartmentsSection assistant={assistant} />
      <AIAssistantDataFlowsSection assistant={assistant} />
      <AIAssistantActionsSection />
      <AIAssistantComingSoon />
    </DashboardContainer>
  );
};
