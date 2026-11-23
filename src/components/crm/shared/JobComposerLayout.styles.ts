import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const { colors, transitions, radius, typography } = theme;

/* ============================================================================
 * Job Composer Layout & Base Form Styled Components
 * ============================================================================ */

export const JobPostComposer = styled.div`
  background: ${colors.background.overlay};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${radius.xl};
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    border-radius: ${radius.lg};
  }
`;

export const NotificationToast = styled.div<{ $type?: 'success' | 'error' }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${radius.lg};
  font-size: 0.875rem;
  font-weight: ${typography.weights.medium};
  z-index: var(--z-notification, 800);
  animation: slideIn 0.3s ease;

  background: ${props => {
    if (props.$type === 'success') {
      return 'rgba(16, 185, 129, 0.9)';
    }
    if (props.$type === 'error') {
      return 'rgba(239, 68, 68, 0.9)';
    }
    return 'rgba(59, 130, 246, 0.9)';
  }};
  color: #fff;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const FormFieldError = styled.div`
  &.has-error input,
  &.has-error textarea,
  &.has-error select {
    border-color: #ef4444;
  }
`;

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
`;

export const PlatformError = styled.div`
  color: #ef4444;
  font-size: 0.8125rem;
  text-align: center;
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: ${radius.md};
  margin: 0 1.5rem;
`;

export const ComposerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.75rem;
  }
`;

export const HeaderIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${radius.xl};
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const HeaderInfo = styled.div`
  flex: 1;

  h3 {
    color: #fff;
    font-size: 1.125rem;
    font-weight: ${typography.weights.semibold};
    margin: 0;
  }

  p {
    color: #64748b;
    font-size: 0.8125rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
  }
`;

export const PlatformSelection = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  h4 {
    color: #94a3b8;
    font-size: 0.8125rem;
    font-weight: ${typography.weights.semibold};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const PlatformsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const PlatformChip = styled.button<{ $selected?: boolean; $color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props =>
    props.$selected
      ? `color-mix(in srgb, ${props.$color || '#f59e0b'} 15%, transparent)`
      : 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid
    ${props => (props.$selected ? props.$color || '#f59e0b' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: ${radius.full};
  color: ${props => (props.$selected ? props.$color || '#f59e0b' : '#94a3b8')};
  font-size: 0.8125rem;
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;
