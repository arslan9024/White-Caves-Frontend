import styled, { keyframes } from 'styled-components';
import { spacing } from '../../../styles/theme/spacing';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 700;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  animation: ${fadeIn} 0.15s ease;
`;

export const PaletteContainer = styled.div`
  width: 560px;
  max-width: 90vw;
  max-height: 70vh;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 0.2s ease;

  @media (prefers-color-scheme: dark) {
    background: #1e293b;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
  }
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #334155;
  }
`;

export const SearchIcon = styled.div`
  color: #9ca3af;
  flex-shrink: 0;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #111827;
  background: transparent;
  font-family: inherit;

  &::placeholder {
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
    &::placeholder {
      color: #64748b;
    }
  }
`;

export const CloseHint = styled.kbd`
  font-size: 11px;
  padding: 3px 7px;
  border-radius: 4px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #9ca3af;
  font-family: inherit;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    background: #334155;
    border-color: #475569;
    color: #64748b;
  }
`;

export const ResultsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.sm};
`;

export const CategoryLabel = styled.div`
  padding: 8px 12px 4px;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (prefers-color-scheme: dark) {
    color: #64748b;
  }
`;

export const ResultItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: ${p => (p.$active ? '#F3F4F6' : 'transparent')};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: all 0.1s ease;
  text-align: left;

  &:hover {
    background: #f3f4f6;
  }

  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
    background: ${p => (p.$active ? '#334155' : 'transparent')};
    &:hover {
      background: #334155;
    }
  }
`;

export const ResultIcon = styled.div<{ $color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${p => (p.$color ? `${p.$color}15` : '#F3F4F6')};
  color: ${p => p.$color || '#6B7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ResultLabel = styled.span`
  flex: 1;
  font-weight: 500;
`;

export const ResultArrow = styled.div`
  color: #d1d5db;
  flex-shrink: 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  color: #9ca3af;
  gap: ${spacing.md};

  @media (prefers-color-scheme: dark) {
    border-top-color: #334155;
    color: #64748b;
  }
`;

export const FooterHint = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};

  kbd {
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 3px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    font-family: inherit;

    @media (prefers-color-scheme: dark) {
      background: #334155;
      border-color: #475569;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #9ca3af;
  font-size: 14px;
`;
