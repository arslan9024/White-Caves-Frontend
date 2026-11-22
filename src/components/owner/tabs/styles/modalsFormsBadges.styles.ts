import styled from 'styled-components';
import { colors, spacing, typography, borderRadius, shadows, media } from '@/design-tokens';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: ${colors.background.default};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.lg};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
`;

export const ModalSmall = styled(Modal)`
  max-width: 400px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.border.default};

  h2 {
    ${typography.presets.heading2};
    color: ${colors.text.primary};
    margin: 0;
  }
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  font-size: 24px;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${colors.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: ${spacing[4]};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  border-top: 1px solid ${colors.border.default};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};

  label {
    ${typography.presets.bodySmall};
    font-weight: 600;
    color: ${colors.text.primary};
  }

  input,
  select,
  textarea {
    padding: ${spacing[2]} ${spacing[3]};
    border: 1px solid ${colors.border.default};
    border-radius: ${borderRadius.md};
    ${typography.presets.body};
    color: ${colors.text.primary};

    &:focus {
      outline: none;
      border-color: ${colors.primary[600]};
      box-shadow: 0 0 0 3px ${colors.primary[100]};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

export const StatusBadge = styled.span<{ $status?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.sm};
  ${typography.presets.bodySmall};
  font-weight: 500;

  ${props => {
    switch (props.$status) {
      case 'qualified':
        return `background: ${colors.success[100]}; color: ${colors.success[700]};`;
      case 'lost':
        return `background: ${colors.error[100]}; color: ${colors.error[700]};`;
      case 'contacted':
        return `background: ${colors.warning[100]}; color: ${colors.warning[700]};`;
      default:
        return `background: ${colors.primary[100]}; color: ${colors.primary[700]};`;
    }
  }}
`;

export const PriorityBadge = styled.span<{ $priority?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.sm};
  ${typography.presets.bodySmall};
  font-weight: 500;

  ${props => {
    switch (props.$priority) {
      case 'high':
        return `background: ${colors.error[100]}; color: ${colors.error[700]};`;
      case 'medium':
        return `background: ${colors.warning[100]}; color: ${colors.warning[700]};`;
      case 'low':
        return `background: ${colors.success[100]}; color: ${colors.success[700]};`;
      default:
        return `background: ${colors.neutral[100]}; color: ${colors.neutral[700]};`;
    }
  }}
`;

export const SourceBadge = styled.span<{ $source?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.sm};
  ${typography.presets.bodySmall};
  font-weight: 500;

  ${props => {
    switch (props.$source) {
      case 'whatsapp':
        return `background: ${colors.success[100]}; color: ${colors.success[700]};`;
      case 'website':
        return `background: ${colors.primary[100]}; color: ${colors.primary[700]};`;
      case 'chatbot':
        return `background: ${colors.warning[100]}; color: ${colors.warning[700]};`;
      case 'referral':
        return `background: ${colors.success[50]}; color: ${colors.success[600]};`;
      default:
        return `background: ${colors.neutral[100]}; color: ${colors.neutral[700]};`;
    }
  }}
`;

export const TypeBadge = styled.span<{ $type?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.sm};
  ${typography.presets.bodySmall};
  font-weight: 500;

  ${props => {
    switch (props.$type) {
      case 'tenancy':
        return `background: ${colors.success[100]}; color: ${colors.success[700]};`;
      case 'sales':
        return `background: ${colors.primary[100]}; color: ${colors.primary[700]};`;
      case 'lease':
        return `background: ${colors.warning[100]}; color: ${colors.warning[700]};`;
      default:
        return `background: ${colors.neutral[100]}; color: ${colors.neutral[700]};`;
    }
  }}
`;

export const UnassignedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.sm};
  ${typography.presets.bodySmall};
  font-weight: 500;
  background: ${colors.warning[100]};
  color: ${colors.warning[700]};
`;
