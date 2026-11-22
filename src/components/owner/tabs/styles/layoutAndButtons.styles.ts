import styled from 'styled-components';
import { colors, spacing, typography, borderRadius, media } from '@/design-tokens';

export const TabContainer = styled.div`
  background: ${colors.background.default};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[6]};
  gap: ${spacing[4]};
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};

  ${media.sm} {
    flex-direction: column;
  }
`;

export const TabTitle = styled.h3`
  ${typography.presets.heading3};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing[2]} 0;
`;

export const HeaderLeft = styled.div`
  h2 {
    ${typography.presets.heading2};
    color: ${colors.text.primary};
    margin: 0 0 ${spacing[1]} 0;
  }

  p {
    ${typography.presets.bodySmall};
    color: ${colors.text.secondary};
    margin: 0;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${spacing[2]};
  flex-wrap: wrap;
  justify-content: flex-end;

  ${media.sm} {
    justify-content: flex-start;
    width: 100%;
  }
`;

export const PrimaryButton = styled.button`
  background: ${colors.primary[600]};
  color: ${colors.text.inverse};
  border: none;
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${borderRadius.md};
  ${typography.presets.body};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${colors.primary[700]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: ${colors.border.default};
  color: ${colors.text.primary};

  &:hover:not(:disabled) {
    background: ${colors.neutral[300]};
  }
`;

export const DangerButton = styled(PrimaryButton)`
  background: ${colors.error[600]};

  &:hover:not(:disabled) {
    background: ${colors.error[700]};
  }
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary[600]};
  cursor: pointer;
  padding: 0;
  ${typography.presets.body};
  text-decoration: underline;
  transition: all 0.2s;

  &:hover {
    color: ${colors.primary[700]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button<{ danger?: boolean }>`
  background: none;
  border: 1px solid ${colors.border.default};
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: ${spacing[2]};
  border-radius: ${borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  min-height: 44px;
  min-width: 44px;

  &:hover {
    border-color: ${colors.primary[500]};
    color: ${colors.primary[600]};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.border.default};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${typography.presets.body};

  thead tr {
    background: ${colors.background.surface};
    border-bottom: 2px solid ${colors.border.default};
  }

  thead th {
    padding: ${spacing[3]} ${spacing[4]};
    text-align: left;
    color: ${colors.text.secondary};
    ${typography.presets.bodySmall};
    font-weight: 600;
  }

  tbody tr {
    border-bottom: 1px solid ${colors.border.default};
    transition: background 0.2s;

    &:hover {
      background: ${colors.background.hover};
    }

    &:last-child {
      border-bottom: none;
    }
  }

  tbody td {
    padding: ${spacing[3]} ${spacing[4]};
    color: ${colors.text.primary};
  }
`;

export const TableRow = styled.tr``;
export const TableHeader = styled.th``;
export const TableCell = styled.td``;

export const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]};
  border-top: 1px solid ${colors.border.default};
  background: ${colors.background.surface};
`;

export const FilterRow = styled.div`
  display: flex;
  gap: ${spacing[3]};
  flex-wrap: wrap;
  margin-bottom: ${spacing[4]};
  align-items: center;

  ${media.sm} {
    flex-direction: column;
  }
`;

export const FilterSelect = styled.select`
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.border.default};
  border-radius: ${borderRadius.md};
  ${typography.presets.body};
  color: ${colors.text.primary};
  background: ${colors.background.default};
  cursor: pointer;
  min-height: 44px;

  &:hover {
    border-color: ${colors.primary[500]};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary[600]};
    box-shadow: 0 0 0 3px ${colors.primary[100]};
  }
`;

export const PaginationContainer = styled.nav`
  display: flex;
  gap: ${spacing[2]};
  justify-content: center;
  align-items: center;
  padding: ${spacing[3]};
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? colors.primary[600] : 'none')};
  color: ${({ $active }) => ($active ? colors.text.inverse : colors.text.primary)};
  border: 1px solid ${({ $active }) => ($active ? colors.primary[600] : colors.border.default)};
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all 0.2s;
  ${typography.presets.bodySmall};
  min-height: 44px;
  min-width: 44px;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? colors.primary[700] : colors.background.hover)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
