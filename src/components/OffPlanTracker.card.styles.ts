import styled from 'styled-components';
import { typography } from '../styles/theme/typography';
import { transitions } from '../styles/theme/transitions';

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem 1rem;
  background: ${props => (props.$variant === 'secondary' ? 'var(--bg-light, #f7fafc)' : 'var(--primary-color, #1a365d)')};
  color: ${props => (props.$variant === 'secondary' ? 'var(--text-primary)' : 'white')};
  border: ${props => (props.$variant === 'secondary' ? '1px solid var(--border-color, #e2e8f0)' : 'none')};
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    ${props =>
      props.$variant === 'secondary'
        ? 'background: var(--bg-tertiary, #edf2f7); border-color: var(--primary-color, #1a365d);'
        : 'background: var(--primary-dark, #0f2847);'}
  }
`;

export const Countdown = styled.div`
  background: var(--bg-light, #f7fafc);
  padding: 1rem;
  border-radius: var(--radius-md);
  text-align: center;
`;

export const CountdownLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-muted, #718096);
  margin-bottom: 0.5rem;
`;

export const CountdownTimer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
`;

export const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeValue = styled.span`
  font-size: 1.25rem;
  font-weight: ${typography.weights.bold};
  color: var(--secondary-color, #c53030);
`;

export const TimeLabel = styled.span`
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
`;

export const PaymentPlan = styled.div`
  padding: 0.75rem 1rem;
  background: #f0f4ff;
  border-left: 3px solid var(--primary-color, #1a365d);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  color: var(--text-primary);

  strong {
    color: var(--primary-color, #1a365d);
  }
`;

