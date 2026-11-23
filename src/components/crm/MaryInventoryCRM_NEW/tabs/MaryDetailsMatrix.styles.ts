import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { spacing, radius, shadows, transitions, colors, typography } = theme;

export const MatrixSection = styled.div`
  [data-theme='dark'] & {
  }
`;

export const MatrixInfo = styled.div`
  padding: ${spacing.md};
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: ${radius.lg};
  margin-bottom: 20px;

  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: ${typography.sizes.base};

    [data-theme='dark'] & {
      color: var(--text-secondary, #a0a0a0);
    }
  }

  [data-theme='dark'] & {
    background: var(--bg-secondary, #2a2a3e);
    border-color: var(--border-color, #3a3a5a);
  }
`;

export const ClustersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};

  [data-theme='dark'] & {
  }
`;

export const ClusterBlock = styled.div`
  [data-theme='dark'] & {
  }
`;

export const ClusterTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 15px;
  font-weight: ${typography.weights.semibold};
  color: var(--text-primary);

  [data-theme='dark'] & {
    color: white;
  }
`;

export const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;

  [data-theme='dark'] & {
  }
`;

export const PropertyCard = styled.div<{ $isSelected: boolean }>`
  padding: 12px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: ${radius.lg};
  cursor: pointer;
  transition: ${transitions.hover};

  ${props =>
    props.$isSelected &&
    `
    border-color: var(--primary);
    background: rgba(227, 30, 36, 0.05);
  `}

  &:hover {
    border-color: var(--primary);
    box-shadow: ${shadows.sm};
  }

  [data-theme='dark'] & {
    background: var(--bg-secondary, #2a2a3e);
    border-color: var(--border-color, #3a3a5a);

    &:hover {
      border-color: var(--primary, ${colors.primary});
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    ${props =>
      props.$isSelected &&
      `
      border-color: var(--primary, ${colors.primary});
      background: rgba(227, 30, 36, 0.08);
    `}
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: ${spacing.sm};

  [data-theme='dark'] & {
  }
`;

export const PNumber = styled.span`
  font-weight: ${typography.weights.semibold};
  font-size: ${typography.sizes.base};
  color: var(--text-primary);

  [data-theme='dark'] & {
    color: white;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  margin-bottom: 8px;

  p {
    margin: 0;
    font-size: ${typography.sizes.xs};
    color: var(--text-secondary);

    &.card-project {
      font-weight: ${typography.weights.medium};
      color: var(--text-primary);

      [data-theme='dark'] & {
        color: white;
      }
    }

    [data-theme='dark'] & {
      color: var(--text-secondary, #a0a0a0);
    }
  }

  [data-theme='dark'] & {
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid var(--border-color);
  font-size: ${typography.sizes.xs};
  color: var(--text-muted);

  [data-theme='dark'] & {
    color: var(--text-muted, #808080);
    border-color: var(--border-color, #3a3a5a);
  }
`;

export const EmptyMatrix = styled.div`
  padding: 40px;
  text-align: center;
  color: var(--text-muted);

  p {
    margin: 0;
    font-size: ${typography.sizes.base};

    [data-theme='dark'] & {
      color: var(--text-muted, #808080);
    }
  }

  [data-theme='dark'] & {
  }
`;
