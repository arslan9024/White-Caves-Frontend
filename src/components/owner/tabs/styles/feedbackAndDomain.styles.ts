import styled from 'styled-components';
import { colors, spacing, typography, borderRadius, shadows, media } from '@/design-tokens';

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${colors.border.default};
  border-top-color: ${colors.primary[600]};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[8]};
  gap: ${spacing[3]};
  ${typography.presets.body};
  color: ${colors.text.secondary};
`;

export const ErrorIcon = styled.div`
  font-size: 48px;
  color: ${colors.error[600]};
`;

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[8]};
  gap: ${spacing[3]};
  background: ${colors.error[50]};
  border: 1px solid ${colors.error[200]};
  border-radius: ${borderRadius.lg};

  h3 {
    ${typography.presets.heading3};
    color: ${colors.error[600]};
    margin: 0;
  }

  p {
    ${typography.presets.body};
    color: ${colors.error[700]};
    margin: 0;
  }
`;

export const Toast = styled.div<{ $type?: 'success' | 'error' | 'info' }>`
  display: flex;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: ${borderRadius.md};
  ${typography.presets.body};
  box-shadow: ${shadows.md};

  ${props => {
    switch (props.$type) {
      case 'success':
        return `background: ${colors.success[100]}; color: ${colors.success[700]}; border-left: 4px solid ${colors.success[600]};`;
      case 'error':
        return `background: ${colors.error[100]}; color: ${colors.error[700]}; border-left: 4px solid ${colors.error[600]};`;
      case 'info':
        return `background: ${colors.primary[100]}; color: ${colors.primary[700]}; border-left: 4px solid ${colors.primary[600]};`;
      default:
        return '';
    }
  }}
`;

export const EmptyStateText = styled.p`
  ${typography.presets.body};
  color: ${colors.text.secondary};
  margin: 0;
`;

export const WarningText = styled.p`
  ${typography.presets.bodySmall};
  color: ${colors.warning[700]};
  margin: 0;
`;

export const StatValue = styled.span`
  ${typography.presets.heading3};
  color: ${colors.text.primary};
  font-weight: 600;
`;

export const StatLabel = styled.span`
  ${typography.presets.bodySmall};
  color: ${colors.text.secondary};
`;

export const StatNumber = styled.div`
  ${typography.presets.heading3};
  color: ${colors.text.primary};
  font-weight: 600;
`;

export const StatLabelText = styled.div`
  ${typography.presets.bodySmall};
  color: ${colors.text.secondary};
`;

export const ContractStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const ContractStat = styled.div<{ variant?: string }>`
  background: ${colors.background.surface};
  padding: ${spacing[4]};
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.border.default};
`;

export const PartiesCell = styled.td`
  max-width: 200px;
`;

export const DateCell = styled.td`
  white-space: nowrap;
`;

export const PriceCell = styled.td`
  text-align: right;
  font-weight: 500;
`;

export const LeadStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const LeadStat = styled.div`
  background: ${colors.background.surface};
  padding: ${spacing[4]};
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.border.default};
`;

export const LeadCell = styled.td`
  max-width: 250px;
`;

export const ContactCell = styled.td`
  max-width: 200px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing[2]};
  align-items: center;
`;

export const StatusSelect = styled.select`
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.border.default};
  border-radius: ${borderRadius.md};
  ${typography.presets.body};
  color: ${colors.text.primary};
  background: ${colors.background.default};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.primary[600]};
    box-shadow: 0 0 0 3px ${colors.primary[100]};
  }
`;
