import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { transitions } = theme;

// ============================================================================
// Fullscreen Modal Styles
// ============================================================================

export const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: var(--z-overlay, 600);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }
`;

export const CloseFullscreenBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.hover};
  z-index: var(--z-overlay, 600);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const FullscreenNav = styled.button<{ $position?: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.hover};
  z-index: var(--z-overlay, 600);

  ${props => (props.$position === 'prev' ? `left: 2rem;` : `right: 2rem;`)}

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;

    svg {
      width: 22px;
      height: 22px;
    }

    ${props => (props.$position === 'prev' ? `left: 1rem;` : `right: 1rem;`)}
  }
`;
