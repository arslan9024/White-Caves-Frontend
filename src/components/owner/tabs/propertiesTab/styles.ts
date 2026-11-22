import styled from 'styled-components';
import { colors, spacing, typography } from '@/design-tokens';

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: ${spacing[3]};
  color: ${colors.text.secondary};
  ${typography.presets.body};
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: ${colors.primary[500]};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[6]};
  text-align: center;
  color: ${colors.error[500]};

  p {
    ${typography.presets.body};
    margin: 0;
  }
`;

export const ErrorIcon = styled.span`
  font-size: 2rem;
  opacity: 0.8;
`;

export const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

export const SearchInputIcon = styled.span`
  position: absolute;
  left: ${spacing[2]};
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.text.secondary};
  pointer-events: none;
`;

export const SearchInputField = styled.input`
  width: 100%;
  padding: ${spacing[2]} ${spacing[3]} ${spacing[2]} ${spacing[5]};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  color: ${colors.text.inverse};
  ${typography.presets.body};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
  }

  &::placeholder {
    color: ${colors.text.secondary};
  }
`;

export const PropertyCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

export const PropertyThumb = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(196, 30, 58, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

export const PropertyInfo = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: ${colors.text.inverse};
    ${typography.presets.label};
    margin: 0;
  }

  small {
    color: ${colors.text.secondary};
    ${typography.presets.caption};
    margin: 0;
  }
`;

export const TypeTag = styled.span`
  display: inline-block;
  padding: ${spacing[1]} ${spacing[2]};
  background: rgba(196, 30, 58, 0.1);
  color: ${colors.primary[500]};
  border-radius: 8px;
  ${typography.presets.caption};
  font-weight: 600;
`;

export const UnassignedText = styled.span`
  color: ${colors.text.secondary};
  font-style: italic;
`;

export const ActionButtonsRow = styled.div`
  display: flex;
  gap: ${spacing[1]};
`;

export const IconBtn = styled.button<{ danger?: boolean }>`
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(196, 30, 58, 0.1);
    ${props => props.danger && `color: ${colors.error[500]};`}
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
  }
`;

export const CrudToast = styled.div`
  position: fixed;
  bottom: ${spacing[4]};
  right: ${spacing[4]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.success[500]};
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  ${typography.presets.body};
  z-index: 2000;
  animation: slideInUp 0.3s ease-out;

  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div<{ small?: boolean }>`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: ${props => (props.small ? '400px' : '600px')};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[5]};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    margin: 0;
    ${typography.presets.heading3};
    color: ${colors.text.inverse};
  }
`;

export const ModalCloseButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.text.inverse};
  }
`;

export const ModalBody = styled.div`
  padding: ${spacing[5]};
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: ${spacing[3]};
  justify-content: flex-end;
  padding: ${spacing[5]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const WarningText = styled.p`
  color: ${colors.error[500]};
  ${typography.presets.caption};
  margin: ${spacing[2]} 0 0;
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]} ${spacing[5]};
  flex-wrap: wrap;
  gap: ${spacing[3]};
  ${typography.presets.body};
  color: ${colors.text.secondary};
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: ${spacing[1]};
  align-items: center;
`;
