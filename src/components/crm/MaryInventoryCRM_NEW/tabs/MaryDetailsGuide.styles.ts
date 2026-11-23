import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { spacing, radius, colors, typography } = theme;

export const GuideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};

  [data-theme='dark'] & {
  }
`;

export const InfoCard = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: ${radius.lg};
  border-left: 4px solid ${colors.info};

  h4 {
    margin: 0 0 ${spacing.sm} 0;
    color: var(--text-primary);
    font-size: 15px;
    font-weight: ${typography.weights.semibold};

    [data-theme='dark'] & {
      color: white;
    }
  }

  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: ${typography.sizes.base};
    line-height: 1.5;

    [data-theme='dark'] & {
      color: var(--text-secondary, #a0a0a0);
    }
  }

  svg {
    flex-shrink: 0;
    color: ${colors.info};
    margin-top: 2px;
  }

  [data-theme='dark'] & {
    background: var(--bg-secondary, #2a2a3e);
    border-color: var(--border-color, #3a3a5a);
  }
`;

export const GuideContent = styled.div`
  h4 {
    margin: 0 0 12px 0;
    color: var(--text-primary);
    font-size: 15px;
    font-weight: ${typography.weights.semibold};

    &.mt-6 {
      margin-top: 24px;
    }

    [data-theme='dark'] & {
      color: white;
    }
  }
`;

export const GuideList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    color: var(--text-secondary);
    font-size: ${typography.sizes.base};
    line-height: 1.5;
    padding-left: 24px;
    position: relative;

    &::before {
      content: '•';
      position: absolute;
      left: 8px;
      color: var(--primary);
      font-weight: bold;
    }

    strong {
      color: var(--text-primary);
      font-weight: ${typography.weights.semibold};

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

export const SelectedPropertySection = styled.div`
  [data-theme='dark'] & {
  }
`;

export const PropertyDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing.md};

  [data-theme='dark'] & {
  }
`;

export const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: ${radius.md};

  label {
    font-size: ${typography.sizes.xs};
    font-weight: ${typography.weights.semibold};
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;

    [data-theme='dark'] & {
      color: var(--text-muted, #808080);
    }
  }

  > div,
  > p {
    font-size: ${typography.sizes.base};
    font-weight: ${typography.weights.medium};
    color: var(--text-primary);

    [data-theme='dark'] & {
      color: white;
    }
  }

  [data-theme='dark'] & {
    background: var(--bg-secondary, #2a2a3e);
    border-color: var(--border-color, #3a3a5a);
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: ${spacing.xs} ${radius.xl};
  background: rgba(56, 142, 60, 0.1);
  color: ${colors.success};
  border-radius: ${radius.md};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;

  [data-theme='dark'] & {
    background: rgba(56, 142, 60, 0.2);
  }
`;

export const OwnersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};

  li {
    color: var(--text-secondary);
    font-size: ${typography.sizes.base};
    padding-left: 16px;
    position: relative;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--primary);
    }

    [data-theme='dark'] & {
      color: var(--text-secondary, #a0a0a0);
    }
  }

  [data-theme='dark'] & {
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;

  svg {
    color: var(--text-muted);
    margin-bottom: 16px;
    width: 48px;
    height: 48px;
  }

  h4 {
    margin: 0 0 8px 0;
    color: var(--text-primary);
    font-size: ${typography.sizes.md};
    font-weight: ${typography.weights.semibold};

    [data-theme='dark'] & {
      color: white;
    }
  }

  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: ${typography.sizes.base};
    line-height: 1.5;
    max-width: 400px;

    [data-theme='dark'] & {
      color: var(--text-secondary, #a0a0a0);
    }
  }

  [data-theme='dark'] & {
  }
`;
