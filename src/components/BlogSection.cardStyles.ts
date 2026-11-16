import styled from 'styled-components';
import { theme } from '../styles/theme';

const { shadows, transitions, colors, radius, typography } = theme;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BlogCard = styled.div`
  background: var(--surface, #ffffff);
  border-radius: ${radius.xl};
  overflow: hidden;
  box-shadow: ${shadows.card};
  transition: all ${transitions.durations.standard} ${transitions.easing.easeOut};

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: ${shadows.lg};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.luxuryHover};

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const BlogCardImage = styled.div<{ $bgImage?: string }>`
  width: 100%;
  height: 200px;
  background-image: ${props => (props.$bgImage ? `url(${props.$bgImage})` : 'none')};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`;

export const BlogCardContent = styled.div`
  padding: 20px;
`;

export const BlogCardCategory = styled.span`
  display: inline-block;
  background: var(--primary, ${colors.primary});
  color: #111827;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;
  margin-bottom: 12px;
`;

export const BlogCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: ${typography.weights.semibold};
  color: var(--text-primary, #1a1a2e);
  margin: 0 0 8px 0;
  line-height: 1.4;

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

export const BlogCardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #4b5563;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  @media (prefers-color-scheme: dark) {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
`;

export const LoadMoreBtn = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 12px 32px;
  background: var(--primary, #c9a962);
  color: #111827;
  border: none;
  border-radius: ${radius.lg};
  font-size: 0.95rem;
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: ${transitions.all};

  &:hover {
    background: ${colors.primaryDark};
    color: white;
    transform: translateY(-2px);
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const ReadMoreLink = styled.a`
  color: #735f24;
  text-decoration: none;
  font-weight: ${typography.weights.medium};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (prefers-color-scheme: dark) {
    color: #f2d675;
  }
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

