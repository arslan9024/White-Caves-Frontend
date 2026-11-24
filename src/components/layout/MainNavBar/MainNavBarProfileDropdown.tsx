import React from 'react';
import { Shield, User, Settings, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  DropdownDivider,
  DropdownItem,
  DropdownFooter,
} from './styles';
import { ProfileAction, UserProp } from './types';

interface MainNavBarProfileDropdownProps {
  user: UserProp | null;
  isSuperUser: boolean;
  onAction: (action: ProfileAction) => void;
}

export const MainNavBarProfileDropdown: React.FC<MainNavBarProfileDropdownProps> = ({
  user,
  isSuperUser,
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
                    <span>{getUserInitials()}</span>
                  )}
                </ProfileAvatar>
                <ProfileInfo>
                  <ProfileName>{user?.displayName || 'Company Owner'}</ProfileName>
                  <ProfileEmail>{user?.email || 'owner@whitecaves.ae'}</ProfileEmail>
                </ProfileInfo>
              </ProfileHeader>
              <DropdownDivider />
              <DropdownContent>
                {effectiveIsSuperUser && (
                  <>
                    <DropdownItem $isAdmin={true} onClick={() => handleProfileAction('admin')}>
                      <Shield size={18} />
                      <span>Admin Dashboard</span>
                    </DropdownItem>
                    <DropdownDivider />
                  </>
                )}
                <DropdownItem onClick={() => handleProfileAction('profile')}>
                  <User size={18} />
                  <span>My Profile</span>
                </DropdownItem>
                <DropdownItem onClick={() => handleProfileAction('settings')}>
                  <Settings size={18} />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem onClick={() => handleProfileAction('billing')}>
                  <CreditCard size={18} />
                  <span>Billing</span>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={() => handleProfileAction('help')}>
                  <HelpCircle size={18} />
                  <span>Help Center</span>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem $isLogout={true} onClick={() => handleProfileAction('logout')}>
                  <LogOut size={18} />
                  <span>Log Out</span>
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          )}
        </DropdownContainer>
      </NavRightSection>
    </NavBarContainer>
  );
  );
};
