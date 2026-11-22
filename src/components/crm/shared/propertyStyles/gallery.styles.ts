import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { colors, transitions, radius, typography } = theme;

// ============================================================================
// Gallery Styles
// ============================================================================

export const PropertyGallery = styled.div<{ $isEmpty?: boolean }>`
  border-radius: ${radius.xl};
  overflow: hidden;
  background: rgba(15, 23, 42, 0.6);

  ${props =>
    props.$isEmpty &&
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #64748b;
    gap: 0.5rem;
  `}

  @media (max-width: 768px) {
    border-radius: ${radius.lg};
  }
`;

export const GalleryMain = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  background: #1e293b;
  overflow: hidden;

  @media (max-width: 768px) {
    aspect-ratio: 4/3;
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  display: block;
`;

export const GalleryNav = styled.button<{ $position?: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.hover};
  z-index: 10;

  ${props => (props.$position === 'prev' ? `left: 1rem;` : `right: 1rem;`)}

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const FullscreenBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: ${radius.lg};
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.hover};
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0.375rem 0.75rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${radius.md};
  color: #fff;
  font-size: 0.75rem;
  font-weight: ${typography.weights.medium};
  z-index: 10;
`;

export const GalleryThumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  overflow-x: auto;
  background: rgba(15, 23, 42, 0.4);

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.375rem;
  }
`;

export const Thumbnail = styled.button<{ $active?: boolean; $isMore?: boolean }>`
  flex-shrink: 0;
  width: 64px;
  height: 48px;
  border-radius: ${radius.md};
  overflow: hidden;
  border: 2px solid ${props => (props.$active ? colors.primary : 'transparent')};
  cursor: pointer;
  background: #1e293b;
  padding: 0;
  transition: ${transitions.hover};

  ${props =>
    props.$isMore &&
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    gap: 0.125rem;
    font-size: 0.625rem;
  `}

  &:hover {
    border-color: ${colors.primary};
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 42px;
  }
`;
