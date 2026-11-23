import styled, { keyframes } from 'styled-components';
import { typography } from '../styles/theme/typography';
import { transitions } from '../styles/theme/transitions';
import { radius } from '../styles/theme/radius';

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const VirtualTourGalleryContainer = styled.section`
  padding: 3rem 5%;
  background: linear-gradient(180deg, #ffffff 0%, #fff5f5 100%);
`;

export const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;

  h2 {
    font-family: ${typography.fontFamily.heading};
    font-size: 2rem;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4b5563;
  }
`;

export const ViewControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ViewBtn = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props =>
    props.$active ? 'var(--color-primary, #C9A84C)' : 'var(--bg-primary, #ffffff)'};
  border: 1px solid ${props => (props.$active ? 'var(--color-primary, #C9A84C)' : '#e5e7eb')};
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${transitions.all};
  color: ${props =>
    props.$active ? 'var(--text-on-primary, #ffffff)' : 'var(--text-primary, #1a202c)'};

  &:hover {
    border-color: var(--color-primary, #c9a84c);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #c9a84c);
    outline-offset: 2px;
  }
`;

export const FeaturedToursSection = styled.div`
  margin-bottom: 3rem;

  h3 {
    font-family: ${typography.fontFamily.heading};
    font-size: 1.25rem;
    color: #111827;
    margin-bottom: 1.5rem;
  }
`;

export const AllToursSection = styled.div`
  h3 {
    font-family: ${typography.fontFamily.heading};
    font-size: 1.25rem;
    color: #111827;
    margin-bottom: 1.5rem;
  }
`;

export const FeaturedSlider = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturedTourCard = styled.button`
  background: var(--bg-primary, #ffffff);
  border-radius: 0.75rem;
  border: 1px solid rgba(227, 30, 36, 0.14);
  overflow: hidden;
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
  cursor: pointer;
  transition: ${transitions.all};
  text-align: left;
  padding: 0;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(227, 30, 36, 0.15);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #c9a84c);
    outline-offset: 2px;
  }
`;

export const TourThumbnail = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${FeaturedTourCard}:hover & img {
    transform: scale(1.05);
  }
`;

export const TourOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${FeaturedTourCard}:hover & {
    opacity: 1;
  }
`;

export const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: ${pulse} 2s infinite;

  span {
    font-family: ${typography.fontFamily.heading};
    font-size: 1.25rem;
    font-weight: ${typography.weights.bold};
    color: var(--color-primary, #c9a84c);
  }
`;

export const TourBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Badge = styled.span<{ type?: 'drone' | 'video' }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${radius.full};
  font-size: 0.7rem;
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;
  background: ${props => {
    switch (props.type) {
      case 'drone':
        return 'var(--color-primary, #C9A84C)';
      case 'video':
        return '#111827';
      default:
        return 'rgba(0, 0, 0, 0.6)';
    }
  }};
  color: var(--text-on-primary, #ffffff);
`;

export const TourInfo = styled.div`
  padding: 1.5rem;

  h4 {
    font-family: ${typography.fontFamily.heading};
    font-size: 1.1rem;
    color: #111827;
    margin-bottom: 0.5rem;
  }
`;

export const TourLocation = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    color: #d97706;
  }
`;

export const TourSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SpecItem = styled.span`
  font-size: 0.9rem;
  color: #111827;

  strong {
    color: var(--color-primary, #c9a84c);
  }
`;

export const TourPrice = styled.div`
  font-size: 1.4rem;
  font-weight: ${typography.weights.bold};
  color: var(--color-primary, #c9a84c);
  margin: 1rem 0;
`;
