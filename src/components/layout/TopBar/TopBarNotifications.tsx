import React from 'react';
import { Bell } from 'lucide-react';
import {
  ActionAnchor,
  IconButton,
  NotifBadge,
  DropdownOverlay,
  DropdownMenu,
  DropdownHeader,
  DropdownHeaderName,
  DropdownDivider,
  DropdownItem,
} from './styles';

interface NotificationsMenuProps {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  notifications: Array<{ id: string; read: boolean }>;
  onToggle: () => void;
  onClose: () => void;
}

export const TopBarNotifications: React.FC<NotificationsMenuProps> = React.memo(
  function TopBarNotifications({ isOpen, anchorRef, notifications, onToggle, onClose }) {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
      <ActionAnchor>
        <IconButton
          onClick={onToggle}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        >
          <Bell size={18} />
          {unreadCount > 0 && <NotifBadge>{unreadCount > 9 ? '9+' : unreadCount}</NotifBadge>}
        </IconButton>
        {isOpen && (
          <>
            <DropdownOverlay onClick={onClose} />
            <DropdownMenu $align="right" ref={anchorRef}>
              <DropdownHeader>
                <DropdownHeaderName>Notifications</DropdownHeaderName>
              </DropdownHeader>
              <DropdownDivider />
              {notifications.length === 0 ? (
                <DropdownItem
                  disabled
                  style={{ color: 'var(--text-secondary, #9CA3AF)', cursor: 'default' }}
                >
                  No new notifications
                </DropdownItem>
              ) : (
                notifications.slice(0, 5).map(n => (
                  <DropdownItem key={n.id}>
                    <Bell size={14} />
                    Notification {n.id}
                  </DropdownItem>
                ))
              )}
            </DropdownMenu>
          </>
        )}
      </ActionAnchor>
    );
  }
);
