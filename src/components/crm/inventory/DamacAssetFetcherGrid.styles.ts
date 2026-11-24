import styled from 'styled-components';
import { typography } from '../../../styles/theme/typography';
import { theme } from '../../../styles/theme';

const { colors, transitions, radius, spacing } = theme;

export const ResultsSummary = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-bottom: 20px;
  padding: 12px;
  background: var(--bg-tertiary);
  border-radius: ${radius.lg};
  flex-wrap: wrap;

  @media (prefers-color-scheme: dark) {
    background: #333333;
  }
`;

export const SummaryItem = styled.div<{ $variant?: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: ${typography.weights.medium};
  color: ${props =>
    props.$variant === 'success'
      ? colors.success
      : props.$variant === 'error'
        ? colors.error
        : 'var(--text-primary)'};
`;

export const AssetsGrid = styled.div<{ $viewMode?: 'grid' | 'list' }>`
  display: ${props => (props.$viewMode === 'list' ? 'flex' : 'grid')};
  ${props =>
    props.$viewMode === 'list'
      ? 'flex-direction: column;'
      : 'grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));'}
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

export const AssetCard = styled.div<{ $selected?: boolean }>`
  position: relative;
  border-radius: ${radius.lg};
  overflow: hidden;
  border: 2px solid ${props => (props.$selected ? colors.primary : 'var(--border-color)')};
  cursor: pointer;
  transition: ${transitions.hover};
  background: var(--bg-secondary);

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 12px rgba(227, 30, 36, 0.2);
  }

  @media (prefers-color-scheme: dark) {
    background: #1e1e2e;
    border-color: ${props => (props.$selected ? colors.primary : '#333333')};
  }
`;

export const AssetImage = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  background: var(--bg-primary);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SelectionBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(227, 30, 36, 0.9);
  border-radius: 50%;
  padding: ${spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const AssetInfo = styled.div`
  padding: ${spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  font-size: 0.75rem;
`;

export const AssetSD = styled.span`
  font-weight: ${typography.weights.semibold};
  color: var(--text-primary);

  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
  }
`;

export const AssetRegistration = styled.span`
  color: var(--text-secondary);
  font-size: 0.7rem;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

export const AssetType = styled.span<{ $type?: string }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: ${radius.sm};
  background: ${props =>
    props.$type === 'primary' ? 'rgba(227, 30, 36, 0.2)' : 'rgba(156, 163, 175, 0.2)'};
  color: ${props => (props.$type === 'primary' ? colors.primary : '#6b7280')};
  text-transform: capitalize;
  font-weight: ${typography.weights.medium};
`;

export const OpenLink = styled.a`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(227, 30, 36, 0.2);
  color: ${colors.primary};
  width: 24px;
  height: 24px;
  border-radius: ${radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${transitions.hover};
  cursor: pointer;

  &:hover {
    background: rgba(227, 30, 36, 0.4);
  }

  ${AssetCard}:hover & {
    opacity: 1;
  }
`;

export const NotFoundSection = styled.div`
  margin-top: 20px;
  padding: ${spacing.md};
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${radius.lg};

  h4 {
    margin: 0 0 12px 0;
    color: #ef4444;
    font-size: ${typography.sizes.base};
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);

    h4 {
      color: #fca5a5;
    }
  }
`;

export const NotFoundList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

export const NotFoundItem = styled.span`
  padding: 4px 8px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: ${radius.sm};
  font-size: 0.85rem;
  color: #ef4444;

  @media (prefers-color-scheme: dark) {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }
`;
