import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

/* ===============================================
   NAV ICON BUTTON & SIDEBAR TOGGLE
   =============================================== */

export const NavIconButton = styled.button<{ $hasUnread?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${theme.colors.background.tertiary};
    color: ${theme.colors.text.primary};

    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  ${props =>
    props.$hasUnread &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: ${theme.colors.primary};
      border-radius: 50%;
      border: 2px solid ${theme.colors.background.secondary};
    }
  `}
`;

export const SidebarToggleButton = styled(NavIconButton)`
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: ${theme.colors.primary};
  color: white;
  font-size: 10px;
  font-weight: 600;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.colors.background.secondary};
`;

/* ===============================================
   DROPDOWN CONTAINER & MENUS
   =============================================== */

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  min-width: 280px;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease;
  z-index: ${theme.zIndex.fixed + 10};

  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-color-scheme: dark) {
    background: #2a2a3e;
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

/* ===============================================
   DROPDOWN HEADER & CONTENT
   =============================================== */

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};

  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.text.primary};
  }
`;

export const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: ${theme.colors.primary};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const DropdownContent = styled.div`
  max-height: 320px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.secondary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  color: ${theme.colors.text.tertiary};
  gap: ${theme.spacing.md};

  p {
    margin: 0;
    font-size: 13px;
  }
`;

export const NotificationItem = styled.div<{ $unread?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: background 0.15s ease;
  background: ${props => (props.$unread ? 'rgba(227, 30, 36, 0.08)' : 'transparent')};

  &:hover {
    background: ${props =>
      props.$unread ? 'rgba(227, 30, 36, 0.14)' : theme.colors.background.tertiary};
  }

  @media (prefers-color-scheme: dark) {
    background: ${props => (props.$unread ? 'rgba(227, 30, 36, 0.10)' : 'transparent')};

    &:hover {
      background: ${props =>
        props.$unread ? 'rgba(227, 30, 36, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
    }
  }
`;

export const NotifIcon = styled.div<{ $color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  background: ${props => props.$color || theme.colors.primary};
`;

export const NotifContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NotifTitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${theme.colors.text.primary};
  line-height: 1.4;
`;

export const NotifTime = styled.span`
  font-size: 11px;
  color: ${theme.colors.text.tertiary};
`;
