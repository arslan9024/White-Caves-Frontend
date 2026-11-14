import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

export const FloatingPillWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 2000;
  display: flex;
  align-items: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  transform: translate3d(0, 0, 0);
  will-change: transform;
`;

export const FloatingPillButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #ffffff;
  color: #1e293b;
  border: 1px solid #ef4444;
  border-radius: 9999px;
  box-shadow: 0 8px 30px rgba(239, 68, 68, 0.15), 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 36px rgba(239, 68, 68, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
    background: #fff5f5;
  }

  &:focus-visible {
    outline: none;
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3), 0 8px 30px rgba(239, 68, 68, 0.15);
  }

  .pill-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #ef4444;
    color: #ffffff;
    animation: ${pulseGlow} 2.5s infinite;
  }

  .pill-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .pill-title {
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.2;
  }

  .pill-subtitle {
    font-size: 11px;
    color: #64748b;
    line-height: 1.2;
  }
`;

export const ModalBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  z-index: 2100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  pointer-events: ${props => (props.$isOpen ? 'all' : 'none')};
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ModalContainer = styled.div<{ $isOpen?: boolean }>`
  background: #ffffff;
  width: 100%;
  max-width: 900px;
  height: 85vh;
  max-height: 750px;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(239, 68, 68, 0.2);
  transform: ${props => (props.$isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)')};
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ModalCard = ModalContainer;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #e2e8f0;
  background: #0f172a;
  color: #ffffff;

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: #ef4444;
      border-radius: 10px;
      color: #ffffff;
    }

    h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
      color: #ffffff;
    }

    p {
      font-size: 12px;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }
  }

  .close-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: all 0.15s ease;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const SearchBarSection = styled.div`
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 16px;
    color: #ef4444;
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    font-size: 15px;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #1e293b;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

export const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`;

export const SelectControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  select {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #1e293b;
    font-size: 13px;
    outline: none;

    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.15);
    }
  }
`;

// Re-export result primitives
export * from './CavesFloatingSearch.resultsStyle';
