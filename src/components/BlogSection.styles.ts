import styled from 'styled-components';
import { theme } from '../styles/theme';

const { shadows, transitions, colors, radius, typography, spacing } = theme;

export const BlogSectionContainer = styled.section`
  padding: 80px 0;
  background: var(--bg-primary, #ffffff);

  @media (prefers-color-scheme: dark) {
    background: #0f0f1a;
  }
`;

export const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;

  h2 {
    font-size: 2.5rem;
    font-weight: ${typography.weights.bold};
    color: var(--text-primary, #1a1a2e);
    margin: 0 0 16px 0;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  p {
    font-size: 1.1rem;
    color: var(--text-secondary, #6b7280);
    max-width: 600px;
    margin: 0 auto;

    @media (prefers-color-scheme: dark) {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const FeaturedPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 48px;
  gap: ${spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturedPost = styled.article`
  display: flex;
  background: var(--surface, #ffffff);
  overflow: hidden;
  border-radius: ${radius.xl};
  box-shadow: ${shadows.card};
  transition: all ${transitions.durations.standard} ${transitions.easing.easeOut};

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: ${shadows.lg};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.luxuryHover};

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FeaturedImage = styled.div<{ $bgImage?: string }>`
  width: 45%;
  min-height: 280px;
  background-image: ${props => (props.$bgImage ? `url(${props.$bgImage})` : 'none')};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

export const PostCategory = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--primary, ${colors.primary});
  color: #111827;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FeaturedContent = styled.div`
  flex: 1;
  padding: 28px;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.4rem;
    font-weight: ${typography.weights.bold};
    color: var(--text-primary, #1a1a2e);
    margin: 0 0 12px 0;
    line-height: 1.4;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  p {
    color: var(--text-secondary, #6b7280);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 auto 0;

    @media (prefers-color-scheme: dark) {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const PostMeta = styled.div`
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #4b5563;
`;

export const PostAuthor = styled.span`
  font-weight: ${typography.weights.medium};
  color: #735f24;

  @media (prefers-color-scheme: dark) {
    color: #f2d675;
  }
`;

export const ReadMoreBtn = styled.button`
  align-self: flex-start;
  margin-top: 16px;
  padding: 10px 20px;
  background: var(--primary, #c9a962);
  color: #111827;
  border: none;
  border-radius: ${radius.lg};
  font-size: 0.9rem;
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    background: ${colors.primaryDark};
    color: white;
    transform: translateX(4px);
  }
`;

export const BlogFilters = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

export const FilterBtn = styled.button<{ $isActive?: boolean }>`
  padding: 10px 24px;
  background: ${props =>
    props.$isActive ? 'var(--primary, #c9a962)' : 'var(--surface-alt, #f5f5f7)'};
  border: none;
  border-radius: 25px;
  color: ${props => (props.$isActive ? '#111827' : '#4b5563')};
  font-size: 0.9rem;
  font-weight: ${typography.weights.medium};
  cursor: pointer;
  transition: ${transitions.hover};

  @media (prefers-color-scheme: dark) {
    background: ${props =>
      props.$isActive ? 'var(--primary, #c9a962)' : 'rgba(255, 255, 255, 0.05)'};
    color: ${props => (props.$isActive ? 'black' : 'rgba(255, 255, 255, 0.7)')};
  }

  &:hover {
    background: ${props =>
      props.$isActive ? colors.primaryDark : 'var(--surface-hover, #e5e5e7)'};
    color: ${props => (props.$isActive ? 'white' : '#374151')};

    @media (prefers-color-scheme: dark) {
      background: ${props => (props.$isActive ? colors.primaryDark : 'rgba(255, 255, 255, 0.1)')};
    }
  }
`;

// Re-export card & footer styled primitives
export * from './BlogSection.cardStyles';

