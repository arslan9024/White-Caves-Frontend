import React from 'react';
import { ChevronDown, User, Settings, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  ActionAnchor,
  UserButton,
  UserAvatar,
  UserName,
  DropdownOverlay,
  DropdownMenu,
  DropdownHeader,
  DropdownHeaderName,
  DropdownHeaderEmail,
  DropdownHeaderRole,
  DropdownDivider,
  DropdownItem,
} from './styles';

interface UserMenuProps {
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  user: { name?: string; email?: string; role?: string } | null;
  onToggle: () => void;
  onClose: () => void;
  onLogout?: () => void;
}

export const TopBarUserMenu: React.FC<UserMenuProps> = React.memo(function TopBarUserMenu({
  isOpen,
  anchorRef,
  user,
  onToggle,
  onClose,
  onLogout,
}) {
  const navigate = useNavigate();
  const userRole = (user?.role || 'user').toLowerCase();
  const isSuperUser = ['lion', 'owner', 'admin', 'managing_director'].includes(userRole);

  const getInitials = (name?: string): string => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ActionAnchor>
      <UserButton onClick={onToggle} aria-label="User menu">
        <UserAvatar>{getInitials(user?.name || user?.email)}</UserAvatar>
        <UserName>{user?.name || user?.email || 'User'}</UserName>
        <ChevronDown size={14} style={{ color: 'var(--text-secondary, #9CA3AF)' }} />
      </UserButton>
      {isOpen && (
        <>
          <DropdownOverlay onClick={onClose} />
          <DropdownMenu $align="right" ref={anchorRef}>
            <DropdownHeader>
              <DropdownHeaderName>{user?.name || 'User'}</DropdownHeaderName>
              <DropdownHeaderEmail>{user?.email || ''}</DropdownHeaderEmail>
              {userRole && <DropdownHeaderRole>{userRole}</DropdownHeaderRole>}
            </DropdownHeader>
            <DropdownDivider />
            <DropdownItem
              onClick={() => {
                navigate('/profile');
                onClose();
              }}
            >
              <User size={16} /> Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                navigate('/settings');
                onClose();
              }}
            >
              <Settings size={16} /> Settings
            </DropdownItem>
            {isSuperUser && (
              <DropdownItem
                onClick={() => {
                  navigate('/crm?tab=overview&cockpit=md');
                  onClose();
                }}
              >
                <Shield size={16} /> Operations Cockpit
              </DropdownItem>
            )}
            {isSuperUser && (
              <DropdownItem
                onClick={() => {
                  navigate('/crm?tab=admin&cockpit=md');
                  onClose();
                }}
              >
                <Shield size={16} /> Admin Dashboard
              </DropdownItem>
            )}
            <DropdownDivider />
            <DropdownItem
              $danger
              onClick={() => {
                onLogout?.();
                onClose();
              }}
            >
              <LogOut size={16} /> Sign out
            </DropdownItem>
          </DropdownMenu>
        </>
      )}
    </ActionAnchor>
  );
});
