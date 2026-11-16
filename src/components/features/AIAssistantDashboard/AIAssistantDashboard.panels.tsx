import React from 'react';
import {
  Header,
  AIIcon,
  HeaderText,
  AIName,
  AITitle,
  StatusBadge,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  Section,
  SectionTitle,
  CapabilityList,
  CapabilityTag,
  ActionButtons,
  ActionButton,
  CommingSoon,
} from './AIAssistantDashboard.styles';

export const AIAssistantHeader: React.FC<{ assistant: any }> = ({ assistant }) => (
  <Header>
    <AIIcon>{assistant.avatar}</AIIcon>
    <HeaderText>
      <AIName>{assistant.name}</AIName>
      <AITitle>{assistant.title}</AITitle>
    </HeaderText>
    <StatusBadge status={assistant.status || 'active'}>
      {assistant.status === 'active'
        ? 'Active'
        : assistant.status === 'error'
          ? 'Error'
          : 'Inactive'}
    </StatusBadge>
  </Header>
);

export const AIAssistantInfoGrid: React.FC<{ assistant: any }> = ({ assistant }) => (
  <InfoGrid>
    <InfoCard>
      <InfoLabel>Functional Role</InfoLabel>
      <InfoValue>{assistant.role || 'Not Set'}</InfoValue>
      <InfoLabel style={{ marginTop: '8px' }}>Category</InfoLabel>
      <InfoValue>{assistant.category}</InfoValue>
    </InfoCard>

    <InfoCard>
      <InfoLabel>Access Level</InfoLabel>
      <InfoValue>{assistant.accessLevel}</InfoValue>
      <InfoLabel style={{ marginTop: '8px' }}>Features</InfoLabel>
      <InfoValue>{assistant.features} total</InfoValue>
    </InfoCard>

    <InfoCard>
      <InfoLabel>Reports To</InfoLabel>
      <InfoValue>{assistant.reportsTo}</InfoValue>
      <InfoLabel style={{ marginTop: '8px' }}>Dashboard</InfoLabel>
      <InfoValue style={{ fontFamily: 'monospace', fontSize: '12px' }}>
        {assistant.dashboardPath}
      </InfoValue>
    </InfoCard>
  </InfoGrid>
);

export const AIAssistantAboutSection: React.FC<{ assistant: any }> = ({ assistant }) => (
  <Section>
    <SectionTitle>📝 About This Assistant</SectionTitle>
    <InfoCard>
      <InfoValue>{assistant.description}</InfoValue>
    </InfoCard>
  </Section>
);

export const AIAssistantCapabilitiesSection: React.FC<{ assistant: any }> = ({ assistant }) => {
  if (!assistant.capabilities || assistant.capabilities.length === 0) return null;
  return (
    <Section>
      <SectionTitle>✨ Capabilities</SectionTitle>
      <CapabilityList>
        {assistant.capabilities.map((capability: string) => (
          <CapabilityTag key={capability}>{capability}</CapabilityTag>
        ))}
      </CapabilityList>
    </Section>
  );
};

export const AIAssistantDepartmentsSection: React.FC<{ assistant: any }> = ({ assistant }) => {
  if (!assistant.assignedTo || assistant.assignedTo.length === 0) return null;
  return (
    <Section>
      <SectionTitle>🏢 Assigned To Departments</SectionTitle>
      <CapabilityList>
        {assistant.assignedTo.map((dept: string) => (
          <CapabilityTag key={dept}>{dept}</CapabilityTag>
        ))}
      </CapabilityList>
    </Section>
  );
};

export const AIAssistantDataFlowsSection: React.FC<{ assistant: any }> = ({ assistant }) => {
  if (!assistant.dataFlows) return null;
  return (
    <Section>
      <SectionTitle>🔄 Data Flows</SectionTitle>
      <InfoGrid>
        <InfoCard>
          <InfoLabel>Data Inputs</InfoLabel>
          <CapabilityList>
            {assistant.dataFlows.inputs.map((input: string) => (
              <CapabilityTag key={input}>{input}</CapabilityTag>
            ))}
          </CapabilityList>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Data Outputs</InfoLabel>
          <CapabilityList>
            {assistant.dataFlows.outputs.map((output: string) => (
              <CapabilityTag key={output}>{output}</CapabilityTag>
            ))}
          </CapabilityList>
        </InfoCard>
      </InfoGrid>
    </Section>
  );
};

export const AIAssistantActionsSection: React.FC = () => (
  <Section>
    <SectionTitle>🎮 Quick Actions</SectionTitle>
    <ActionButtons>
      <ActionButton>📊 View Dashboard</ActionButton>
      <ActionButton>⚙️ Configure Settings</ActionButton>
      <ActionButton>📈 View Analytics</ActionButton>
      <ActionButton>🔧 Advanced Options</ActionButton>
    </ActionButtons>
  </Section>
);

export const AIAssistantComingSoon: React.FC = () => (
  <CommingSoon>
    <h3>🚀 More Features</h3>
    <p>Performance metrics, conversation history, and advanced controls coming soon!</p>
  </CommingSoon>
);

