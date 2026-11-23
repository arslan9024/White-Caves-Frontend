import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const TourModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
`;

export const ModalOverlay = styled.button`
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(2px);
  cursor: pointer;
`;

export const ModalContent = styled.div`
  position: relative;
  width: min(980px, 94vw);
  max-height: 92vh;
  overflow: auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.32);
  padding: 1.25rem;
  z-index: 1;
  animation: ${slideUp} 0.24s ease;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 999px;
  background: #f3f4f6;
  color: #111827;
  font-size: 1.15rem;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #c9a84c);
    outline-offset: 2px;
  }
`;

export const ModalHeader = styled.div`
  padding-right: 2.75rem;

  h3 {
    font-size: 1.4rem;
    margin: 0 0 0.25rem;
    color: #111827;
  }

  p {
    margin: 0;
    color: #6b7280;
  }
`;

export const TourViewer = styled.div`
  margin-top: 1rem;
`;

export const ViewerPlaceholder = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.85rem;
  background: #111827;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 58vh;
    object-fit: cover;
    opacity: 0.82;
  }
`;

export const ViewerControls = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #fff;

  p {
    margin: 0;
    font-weight: 600;
  }
`;

export const ControlIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-primary, #c9a84c);
  font-weight: 800;
`;

export const StartTourButton = styled.a`
  display: inline-block;
  padding: 0.65rem 1.1rem;
  border-radius: 0.6rem;
  background: var(--color-primary, #c9a84c);
  color: #fff;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    background: #b71c1c;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

export const ModalInfo = styled.div`
  margin-top: 1rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const InfoItem = styled.div`
  background: #fff7f7;
  border: 1px solid rgba(227, 30, 36, 0.14);
  border-radius: 0.7rem;
  padding: 0.75rem;
`;

export const InfoLabel = styled.span`
  display: block;
  font-size: 0.74rem;
  color: #6b7280;
  margin-bottom: 0.2rem;
`;

export const InfoValue = styled.span<{ $price?: boolean }>`
  font-weight: 700;
  color: ${props => (props.$price ? 'var(--color-primary, #C9A84C)' : '#111827')};
`;

export const ModalActions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline' }>`
  border-radius: 0.6rem;
  border: 1px solid transparent;
  padding: 0.6rem 0.95rem;
  cursor: pointer;
  font-weight: 600;

  background: ${props => {
    if (props.$variant === 'secondary') return '#111827';
    if (props.$variant === 'outline') return 'transparent';
    return 'var(--color-primary, #C9A84C)';
  }};

  color: ${props => (props.$variant === 'outline' ? '#111827' : '#fff')};
  border-color: ${props => (props.$variant === 'outline' ? '#d1d5db' : 'transparent')};

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #c9a84c);
    outline-offset: 2px;
  }
`;
