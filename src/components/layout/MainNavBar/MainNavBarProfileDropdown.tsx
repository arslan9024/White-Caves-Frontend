import React from 'react';
import { Shield, User, Settings, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownContent,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  DropdownDivider,
  DropdownItem,
} from './styles';
import { ProfileAction, UserProp } from './types';

interface MainNavBarProfileDropdownProps {
  user: UserProp | null;
  isSuperUser: boolean;
  userInitials: string;
  onAction: (action: ProfileAction) => void;
}

export const MainNavBarProfileDropdown: React.FC<MainNavBarProfileDropdownProps> = ({
  user,
  isSuperUser,
  userInitials,
  onAction,
}) => {
  return (
    <DropdownMenu>
      <ProfileHeader>
        <ProfileAvatar>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              loading="lazy"
              width={48}
              height={48}
            />
          ) : (
            <span>{userInitials}</span>
          )}
        </ProfileAvatar>
        <ProfileInfo>
          <ProfileName>{user?.displayName || 'Company Owner'}</ProfileName>
          <ProfileEmail>{user?.email || 'owner@whitecaves.ae'}</ProfileEmail>
        </ProfileInfo>
      </ProfileHeader>
      <DropdownDivider />
      <DropdownContent>
        {isSuperUser && (
          <>
            <DropdownItem $isAdmin={true} onClick={() => onAction('admin')}>
              <Shield size={18} />
              <span>Admin Dashboard</span>
            </DropdownItem>
            <DropdownDivider />
          </>
        )}
        <DropdownItem onClick={() => onAction('profile')}>
          <User size={18} />
          <span>My Profile</span>
        </DropdownItem>
        <DropdownItem onClick={() => onAction('settings')}>
          <Settings size={18} />
          <span>Settings</span>
        </DropdownItem>
        <DropdownItem onClick={() => onAction('billing')}>
          <CreditCard size={18} />
          <span>Billing</span>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => onAction('help')}>
          <HelpCircle size={18} />
          <span>Help Center</span>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem $isLogout={true} onClick={() => onAction('logout')}>
          <LogOut size={18} />
          <span>Log Out</span>
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
};
