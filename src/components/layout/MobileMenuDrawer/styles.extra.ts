import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const { colors, radius, spacing } = theme;

/* ── Sub-item (service under department) ───────────────────── */

export const DrawerSubItems = styled.div<{ $expanded: boolean }>`
  overflow: hidden;
  max-height: ${p => (p.$expanded ? '500px' : '0')};
  opacity: ${p => (p.$expanded ? 1 : 0)};
  transition:
    max-height 0.3s ease,
    opacity 0.2s ease;
  padding-left: ${spacing.xl};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const DrawerSubItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: 10px ${spacing.md};
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: ${p => (p.$active ? 600 : 400)};
  color: ${p => (p.$active ? colors.primary : colors.text.secondary)};
  text-align: left;
  min-height: 44px; /* Touch target */
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s ease;

  &:active {
    color: ${colors.primary};
  }

  @media (prefers-color-scheme: dark) {
    color: ${p => (p.$active ? colors.primaryLight : '#94A3B8')};
  }
`;

export const DrawerSubDot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: ${radius.full};
  background: ${p => p.$color || colors.primary};
  flex-shrink: 0;
`;

/* ── Footer ────────────────────────────────────────────────── */

export const DrawerFooter = styled.div`
  padding: ${spacing.sm} ${spacing.md};
  border-top: 1px solid ${colors.border};
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    border-top-color: #334155;
  }
`;

export const DrawerFooterText = styled.p`
  font-size: 11px;
  color: ${colors.text.tertiary};
  text-align: center;
  margin: 0;
`;

/* ── Search Bar ────────────────────────────────────────────── */

export const DrawerSearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px ${spacing.md};
  border-bottom: 1px solid ${colors.borderLight};
  flex-shrink: 0;
`;

export const DrawerSearchIcon = styled.span`
  position: absolute;
  left: calc(${spacing.md} + 8px);
  display: flex;
  align-items: center;
  color: ${colors.text.tertiary};
  pointer-events: none;
`;

export const DrawerSearchInput = styled.input`
  width: 100%;
  padding: 7px 28px 7px 28px;
  border: 1px solid ${colors.borderLight};
  border-radius: 8px;
  background: ${colors.background.primary};
  color: ${colors.text.primary};
  font-size: 13px;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.text.tertiary};
  }
`;

export const DrawerSearchClear = styled.button`
  position: absolute;
  right: calc(${spacing.md} + 6px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: ${colors.text.tertiary}30;
  border: none;
  border-radius: 50%;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: 0;

  &:hover {
    background: ${colors.text.secondary}40;
  }
`;

