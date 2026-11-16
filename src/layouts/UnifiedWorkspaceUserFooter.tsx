/**
 * UnifiedWorkspaceUserFooter.tsx — User Profile Footer with Role Badge
 */

import React from 'react';
import { ROLE_LABELS } from '../context/UserRoleContext';

interface UserProfileLike {
  name: string;
  role: string;
  accessLevel: number;
}

interface UnifiedWorkspaceUserFooterProps {
  isSidebarCollapsed: boolean;
  isLevel5: boolean;
  userProfile: UserProfileLike;
}

export const UnifiedWorkspaceUserFooter: React.FC<UnifiedWorkspaceUserFooterProps> = ({
  isSidebarCollapsed,
  isLevel5,
  userProfile,
}) => {
  return (
    <div
      style={{
        padding: isSidebarCollapsed ? '12px 6px' : '14px 18px',
        backgroundColor: 'var(--bg-darker, #0B0F19)',
        borderTop: '1px solid var(--card-dark, #1E293B)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: isLevel5
            ? 'var(--primary-red, #EF4444)'
            : 'var(--border-color, #334155)',
          color: 'var(--white, #FFFFFF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: '14px',
          flexShrink: 0,
          boxShadow: isLevel5 ? '0 0 12px rgba(239, 68, 68, 0.5)' : 'none',
        }}
      >
        {userProfile.name.charAt(0)}
      </div>
      {!isSidebarCollapsed && (
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 800,
              color: 'var(--white, #FFFFFF)',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {userProfile.name}
          </div>
          <div
            style={{
              fontSize: '10px',
              color: isLevel5 ? 'var(--primary-red, #EF4444)' : 'var(--text-muted, #94A3B8)',
              fontWeight: 700,
            }}
          >
            {isLevel5
              ? '👑 Managing Director (L5)'
              : `L${userProfile.accessLevel} · ${ROLE_LABELS[userProfile.role as keyof typeof ROLE_LABELS] || userProfile.role}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedWorkspaceUserFooter;

