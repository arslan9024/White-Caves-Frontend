import styled from 'styled-components';

export const DashboardContainer = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${props => props.theme?.colors?.border || '#e5e7eb'};
`;

export const AIIcon = styled.div`
  font-size: 48px;
  line-height: 1;
`;

export const HeaderText = styled.div`
  flex: 1;
`;

export const AIName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  margin-bottom: 4px;
`;

export const AITitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
`;

export const StatusBadge = styled.span<{ status: 'active' | 'inactive' | 'training' | 'error' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'active':
        return '#d1fae5';
      case 'training':
        return '#fef3c7';
      case 'error':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active':
        return '#065f46';
      case 'training':
        return '#92400e';
      case 'error':
        return '#7f1d1d';
      default:
        return '#374151';
    }
  }};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: ${props => (props.status === 'active' ? 'pulse 2s infinite' : 'none')};
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

export const InfoCard = styled.div`
  background: ${props => props.theme?.colors?.cardBg || '#ffffff'};
  border: 1px solid ${props => props.theme?.colors?.border || '#e5e7eb'};
  border-radius: 8px;
  padding: 16px;
`;

export const InfoLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  display: block;
  margin-bottom: 8px;
`;

export const InfoValue = styled.p`
  font-size: 14px;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  margin: 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  margin: 0;
`;

export const CapabilityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CapabilityTag = styled.li`
  background: ${props => props.theme?.colors?.active || '#eef2ff'};
  color: ${props => props.theme?.colors?.info || '#EF4444'};
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme?.colors?.border || '#e5e7eb'};
  background: ${props => props.theme?.colors?.background || '#ffffff'};
  color: ${props => props.theme?.colors?.info || '#EF4444'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme?.colors?.active || '#eef2ff'};
    border-color: ${props => props.theme?.colors?.info || '#EF4444'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CommingSoon = styled.div`
  background: ${props => props.theme?.colors?.active || '#eef2ff'};
  border: 1px dashed ${props => props.theme?.colors?.info || '#EF4444'};
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  color: ${props => props.theme?.colors?.info || '#EF4444'};
`;

