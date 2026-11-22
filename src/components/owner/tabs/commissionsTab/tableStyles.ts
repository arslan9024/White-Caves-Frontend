import styled from 'styled-components';
import type { CommissionStatus } from './types';

export const TableWrapper = styled.div`
  background: rgba(10, 10, 10, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(196, 30, 58, 0.2);
  border-radius: 12px;
  overflow: hidden;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

export const Thead = styled.thead`
  background: rgba(196, 30, 58, 0.08);
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  color: rgba(250, 250, 250, 0.65);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid rgba(196, 30, 58, 0.2);
  white-space: nowrap;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.15s ease;

  &:hover {
    background: rgba(196, 30, 58, 0.04);
  }
`;

export const Td = styled.td`
  padding: 0.85rem 1rem;
  color: rgba(250, 250, 250, 0.88);
  vertical-align: middle;
`;

export const Badge = styled.span<{ $status: CommissionStatus }>`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${({ $status }) => {
    switch ($status) {
      case 'paid':
        return 'rgba(34, 197, 94, 0.15)';
      case 'approved':
        return 'rgba(59, 130, 246, 0.15)';
      case 'pending':
        return 'rgba(250, 204, 21, 0.15)';
      case 'disputed':
        return 'rgba(239, 68, 68, 0.15)';
      case 'cancelled':
        return 'rgba(107, 114, 128, 0.15)';
      default:
        return 'rgba(107, 114, 128, 0.15)';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'paid':
        return '#4ade80';
      case 'approved':
        return '#60a5fa';
      case 'pending':
        return '#fde047';
      case 'disputed':
        return '#f87171';
      case 'cancelled':
        return '#9ca3af';
      default:
        return '#9ca3af';
    }
  }};
  border: 1px solid currentColor;
`;

export const ActionBtn = styled.button<{ $variant?: 'approve' | 'pay' | 'dispute' }>`
  background: none;
  border: 1px solid rgba(196, 30, 58, 0.35);
  border-radius: 6px;
  color: #c41e3a;
  padding: 0.3rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.4rem;

  &:hover {
    background: rgba(196, 30, 58, 0.12);
    border-color: #c41e3a;
  }

  ${({ $variant }) =>
    $variant === 'pay' &&
    `
    border-color: rgba(34, 197, 94, 0.4);
    color: #4ade80;
    &:hover { background: rgba(34, 197, 94, 0.1); border-color: #4ade80; }
  `}
  ${({ $variant }) =>
    $variant === 'dispute' &&
    `
    border-color: rgba(239, 68, 68, 0.4);
    color: #f87171;
    &:hover { background: rgba(239, 68, 68, 0.1); border-color: #f87171; }
  `}
`;
