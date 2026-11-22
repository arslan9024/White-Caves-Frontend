// ─────────────────────────────────────────────────────────────
// DASHBOARD MODALS, FORMS, BUTTONS & FEEDBACK STYLES
// ─────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { colors, spacing, typography, media, shadows, borderRadius } from '@/design-tokens';

// ── MODALS ──
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing[4]};
`;

export const ModalContent = styled.div<{ small?: boolean }>`
  background: ${colors.background.surface};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.lg};
  max-width: ${props => (props.small ? '400px' : '600px')};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[5]} ${spacing[5]};
  border-bottom: 1px solid ${colors.border};

  h3 {
    margin: 0;
    ${typography.presets.heading3};
    color: ${colors.text.primary};
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
    color: ${colors.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: ${spacing[5]};
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: ${spacing[3]};
  justify-content: flex-end;
  padding: ${spacing[5]} ${spacing[5]};
  border-top: 1px solid ${colors.border};

  ${media.sm} {
    flex-direction: column-reverse;
  }
`;

// ── FORM ELEMENTS ──
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
    ${typography.presets.label};
    color: ${colors.text.primary};
    font-weight: 600;
  }

  input,
  select,
  textarea {
    padding: ${spacing[2]} ${spacing[3]};
    border: 1px solid ${colors.border};
    border-radius: ${borderRadius.default};
    background: #0f1115;
    color: ${colors.text.primary};
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

    &:disabled {
      background: ${colors.background.hover};
      color: ${colors.text.secondary};
      cursor: not-allowed;
    }
  }
`;

// ── BUTTONS ──
export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[5]};
  border: none;
  border-radius: ${borderRadius.md};
  background: linear-gradient(135deg, #d4af37, #aa8529);
  color: ${colors.text.inverse};
  ${typography.presets.label};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  color: ${colors.text.primary};
  border: 1px solid ${colors.border};

  &:hover:not(:disabled) {
    background: ${colors.background.hover};
    box-shadow: none;
  }
`;

export const DangerButton = styled(PrimaryButton)`
  background: ${colors.error[500]};

  &:hover:not(:disabled) {
    background: ${colors.error[600]};
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
`;

// ── TOAST ──
export const Toast = styled.div`
  position: fixed;
  bottom: ${spacing[4]};
  right: ${spacing[4]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.success[500]};
  color: white;
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.lg};
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

// ── EMPTY STATE ──
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[12]} ${spacing[6]};
  text-align: center;
  background: ${colors.background.surface};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  color: ${colors.text.secondary};

  ${typography.presets.body};

  a {
    color: ${colors.primary[500]};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// ── WARNING TEXT ──
export const WarningText = styled.p`
  color: ${colors.error[500]};
  ${typography.presets.caption};
  margin: ${spacing[2]} 0 0;
`;
