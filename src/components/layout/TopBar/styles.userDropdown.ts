import styled, { keyframes } from 'styled-components';
import { colors } from '../../../styles/theme/colors';
import { spacing } from '../../../styles/theme/spacing';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── User avatar & trigger ─────────────────────────────────── */

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: 4px 8px 4px 4px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f3f4f6;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: #334155;
    }
  }
`;

export const UserAvatar = styled.div<{ $src?: string }>`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: ${p =>
    p.$src ? `url(${p.$src}) center/cover` : `linear-gradient(135deg, #C9A84C 0%, #a8883a 100%)`};
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
  }
`;

/* ── Dropdown ──────────────────────────────────────────────── */

export const DropdownOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 599;
`;

export const DropdownMenu = styled.div<{ $align?: 'left' | 'right' }>`
  position: absolute;
  top: calc(100% + 8px);
  ${p => (p.$align === 'left' ? 'left: 0;' : 'right: 0;')}
  min-width: 220px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(227, 30, 36, 0.06);
  padding: 6px;
  z-index: 600;
  animation: ${fadeIn} 0.15s ease;

  @media (prefers-color-scheme: dark) {
    background: #1e293b;
    border-color: #334155;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.4),
      0 2px 8px rgba(227, 30, 36, 0.04);
  }
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: ${p => (p.$danger ? '#EF4444' : '#374151')};
  transition: all 0.15s ease;
  text-align: left;

  &:hover {
    background: ${p => (p.$danger ? '#FEE2E2' : '#F3F4F6')};
  }

  @media (prefers-color-scheme: dark) {
    color: ${p => (p.$danger ? '#FCA5A5' : '#E2E8F0')};
    &:hover {
      background: ${p => (p.$danger ? 'rgba(239,68,68,0.15)' : '#334155')};
    }
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: ${spacing.xs} 0;

  @media (prefers-color-scheme: dark) {
    background: #334155;
  }
`;

export const DropdownHeader = styled.div`
  padding: 10px 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DropdownHeaderName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const DropdownHeaderEmail = styled.span`
  font-size: 12px;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

export const DropdownHeaderRole = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
