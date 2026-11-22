// ─────────────────────────────────────────────────────────────
// DASHBOARD CONTROLS, TABLES & PAGINATION STYLES
// ─────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { colors, spacing, typography, media, shadows, borderRadius } from '@/design-tokens';

// ── FILTERS BAR ──
export const FiltersBar = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[4]};
  flex-wrap: wrap;

  ${media.sm} {
    gap: ${spacing[2]};
  }
`;

export const SearchField = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;

  ${media.sm} {
    min-width: 100%;
  }
`;

export const SearchFieldInput = styled.input`
  width: 100%;
  padding: ${spacing[2]} ${spacing[3]} ${spacing[2]} ${spacing[5]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.default};
  background: ${colors.background.surface};
  color: ${colors.text.primary};
  ${typography.presets.body};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
  }

  &::placeholder {
    color: ${colors.text.secondary};
  }
`;

export const SearchFieldIcon = styled.span`
  position: absolute;
  left: ${spacing[2]};
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.text.secondary};
  pointer-events: none;
`;

export const FilterSelect = styled.select`
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.default};
  background: ${colors.background.surface};
  color: ${colors.text.primary};
  ${typography.presets.body};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary[300]};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
  }
`;

// ── DATA TABLE ──
export const DataTable = styled.div`
  background: ${colors.background.surface};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${spacing[6]};
  box-shadow: ${shadows.sm};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: ${colors.background.hover};
    border-bottom: 1px solid ${colors.border};
  }

  th {
    ${typography.presets.label};
    padding: ${spacing[3]} ${spacing[4]};
    text-align: left;
    color: ${colors.text.secondary};
    font-weight: 600;
  }

  td {
    ${typography.presets.body};
    padding: ${spacing[3]} ${spacing[4]};
    border-bottom: 1px solid ${colors.border};
    color: ${colors.text.primary};
  }

  tbody tr:hover {
    background: ${colors.background.hover};
  }
`;

// ── ACTION BUTTONS ──
export const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing[1]};
  align-items: center;
`;

export const IconButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: ${borderRadius.default};
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${colors.background.hover};
  }

  &.danger {
    color: ${colors.error[500]};

    &:hover {
      background: ${colors.error[50]};
    }
  }
`;

// ── PAGINATION ──
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spacing[6]};
  padding: ${spacing[4]} ${spacing[5]};
  background: ${colors.background.surface};
  border-top: 1px solid ${colors.border};
  flex-wrap: wrap;
  gap: ${spacing[3]};
`;

export const PaginationInfo = styled.span`
  ${typography.presets.body};
  color: ${colors.text.secondary};
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: ${spacing[1]};
  align-items: center;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  min-width: 44px;
  height: 44px;
  padding: ${spacing[1]} ${spacing[2]};
  border: 1px solid ${props => (props.active ? colors.primary[500] : colors.border)};
  border-radius: ${borderRadius.default};
  background: ${props => (props.active ? colors.primary[500] : colors.background.default)};
  color: ${props => (props.active ? colors.text.inverse : colors.text.primary)};
  ${typography.presets.label};
  cursor: ${props => (props.active || props.disabled ? 'default' : 'pointer')};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${colors.primary[500]};
    ${props =>
      !props.active &&
      `
    background: ${colors.background.hover};
  `}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
