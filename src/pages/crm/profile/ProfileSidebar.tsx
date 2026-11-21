import React, { FC } from 'react';
import { ROLE_LABELS, type UserRole } from '../../../context/UserRoleContext';
import {
  RoleBadgeTag,
  SidebarContainer,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarUserInfo,
  type ProfileTabId,
} from './ProfilePage.styles';

interface ProfileSidebarProps {
  avatarSrc: string;
  displayName: string;
  email?: string;
  accessLevel: number;
  isFounder: boolean;
  currentRole: UserRole;
  activeTab: ProfileTabId;
  onSelectTab: (tab: ProfileTabId) => void;
  onNavigateDashboard: () => void;
}

export const ProfileSidebar: FC<ProfileSidebarProps> = ({
  avatarSrc,
  displayName,
  email,
  accessLevel,
  isFounder,
  currentRole,
  activeTab,
  onSelectTab,
  onNavigateDashboard,
}) => (
  <SidebarContainer>
    <SidebarHeader>
      <img src={avatarSrc} alt="Executive Avatar" />
      <SidebarUserInfo>
        <h3>{displayName}</h3>
        <p>{email}</p>
        <RoleBadgeTag $level={accessLevel}>
          {isFounder
            ? '👑 Founder (L5)'
            : `L${accessLevel} · ${ROLE_LABELS[currentRole] || currentRole}`}
        </RoleBadgeTag>
      </SidebarUserInfo>
    </SidebarHeader>

    <SidebarNav>
      <SidebarItem $active={activeTab === 'profile'} onClick={() => onSelectTab('profile')}>
        <span>👤</span> Profile Info
      </SidebarItem>
      <SidebarItem $active={activeTab === 'preferences'} onClick={() => onSelectTab('preferences')}>
        <span>⚙️</span> System Preferences
      </SidebarItem>
      <SidebarItem $active={activeTab === 'rera'} onClick={() => onSelectTab('rera')}>
        <span>📜</span> RERA Accreditation
      </SidebarItem>
      <SidebarItem $active={activeTab === 'goals'} onClick={() => onSelectTab('goals')}>
        <span>🎯</span> Executive Goals
      </SidebarItem>
      <SidebarItem $active={false} onClick={onNavigateDashboard}>
        <span>📊</span> Executive Dashboard
      </SidebarItem>
      <SidebarItem $active={activeTab === 'security'} onClick={() => onSelectTab('security')}>
        <span>🔐</span> Biometric Security
      </SidebarItem>
      <SidebarItem $active={activeTab === 'sessions'} onClick={() => onSelectTab('sessions')}>
        <span>💻</span> Active Sessions
      </SidebarItem>
    </SidebarNav>
  </SidebarContainer>
);
