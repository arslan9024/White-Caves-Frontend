import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { spacing, radius, transitions, colors, typography } = theme;

export const MaryDetailsTabContainer = styled.div`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  [data-theme='dark'] & {
  }
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  background: var(--bg-secondary, #f9fafb);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  [data-theme='dark'] & {
    background: var(--bg-secondary, #2a2a3e);
    border-color: var(--border-color, #3a3a5a);
  }
`;

export const HeaderContent = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    font-size: ${typography.sizes.lg};
    font-weight: ${typography.weights.bold};
    color: var(--text-primary, #1f2937);

    [data-theme='dark'] & {
      color: white;
    }
  }
`;

export const HeaderSubtitle = styled.p`
  margin: ${spacing.xs} 0 0 0;
  font-size: ${typography.sizes.sm};
  color: var(--text-secondary, #6b7280);

  [data-theme='dark'] & {
    color: var(--text-secondary, #a0a0a0);
  }
`;

export const DetailsViewTabs = styled.div`
  display: flex;
  gap: ${spacing.sm};
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
  overflow-x: auto;

  [data-theme='dark'] & {
    background: var(--bg-primary, #1a1a2e);
    border-color: var(--border-color, #3a3a5a);
  }
`;

export const ViewTab = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${radius.md};
  font-size: ${typography.sizes.base};
  font-weight: ${typography.weights.medium};
  cursor: pointer;
  transition: ${transitions.hover};
  white-space: nowrap;
  color: var(--text-secondary);

  &:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  ${props =>
    props.$isActive &&
    `
    background: var(--bg-secondary);
    color: var(--text-primary);
    border-color: var(--primary);
  `}

  [data-theme='dark'] & {
    color: var(--text-secondary, #a0a0a0);

    &:hover {
      background: var(--bg-secondary, #2a2a3e);
      color: white;
    }

    ${props =>
      props.$isActive &&
      `
      background: var(--bg-secondary, #2a2a3e);
      color: white;
      border-color: var(--primary, ${colors.primary});
    `}
  }
`;

export const DetailsViewContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;

    &:hover {
      background: var(--text-muted);
    }
  }

  [data-theme='dark'] & {
  }
`;
