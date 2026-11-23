import styled from 'styled-components';
import { typography } from '../styles/theme/typography';
import { transitions } from '../styles/theme/transitions';
import { radius } from '../styles/theme/radius';
import { TourThumbnail, TourOverlay } from './VirtualTourGallery.cards.styles';

export const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ToursList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const TourCard = styled.button`
  background: var(--bg-primary, #ffffff);
  border-radius: 0.75rem;
  border: 1px solid rgba(227, 30, 36, 0.12);
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

  ${TourThumbnail} img {
    transition: transform 0.3s ease;
  }

  &:hover ${TourThumbnail} img {
    transform: scale(1.05);
  }

  &:hover ${TourOverlay} {
    opacity: 1;
  }
`;

export const TourContent = styled.div`
  padding: 1.5rem;

  h4 {
    font-family: ${typography.fontFamily.heading};
    color: #111827;
    margin-bottom: 0.5rem;
  }
`;

export const TourMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`;

export const TourViews = styled.span`
  color: #6b7280;
  font-size: 0.85rem;
`;

export const TourType = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: rgba(17, 24, 39, 0.85);
  color: #fff;
  font-size: 0.75rem;
  border-radius: ${radius.full};
`;

export const LoadMoreBtn = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.75rem 2rem;
  background: var(--primary-color, #1a365d);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: ${transitions.all};

  &:hover {
    background: #0d1b2a;
    transform: translateY(-2px);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-muted, #718096);

  p {
    font-size: 1.1rem;
  }
`;
