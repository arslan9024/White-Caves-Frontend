import styled from 'styled-components';

export const HubContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #0f172a;
  min-height: 100vh;
  color: #f8fafc;
  font-family: inherit;
`;

export const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 24px;
`;

export const TitleBlock = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
  }
  p {
    font-size: 0.875rem;
    color: #94a3b8;
    margin: 4px 0 0;
  }
`;

export const Badge = styled.span<{ $bg?: string }>`
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${({ $bg }) => $bg || '#ef4444'};
  color: #fff;
  font-weight: 600;
`;

export const TabNavigation = styled.nav`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 12px;
  overflow-x: auto;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#ef4444' : '#1e293b')};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ $active }) => ($active ? '#dc2626' : '#334155')};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background: #1e293b;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DealTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #f1f5f9;
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #94a3b8;
`;

export const ActionBtn = styled.button<{ $primary?: boolean }>`
  background: ${({ $primary }) => ($primary ? '#ef4444' : '#334155')};
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $primary }) => ($primary ? '#dc2626' : '#475569')};
  }
`;

export const StatusPill = styled.span<{ $status: string }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $status }) =>
    $status === 'FULLY_SIGNED' || $status === 'TENANT_SIGNED' ? '#059669' : '#d97706'};
  color: #fff;
`;

export const NotificationBanner = styled.div`
  background: #065f46;
  color: #a7f3d0;
  padding: 10px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 0.85rem;
  border: 1px solid #059669;
`;
