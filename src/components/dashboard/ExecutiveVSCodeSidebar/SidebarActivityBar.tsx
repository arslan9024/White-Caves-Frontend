// FILE: src/components/dashboard/ExecutiveVSCodeSidebar/SidebarActivityBar.tsx
/**
 * White Caves Real Estate LLC - Executive VSCode Sidebar Activity Bar
 * Standard: AEGIS Canonical 12-Way Architecture Standard & Single Purpose File Law
 * Single Purpose File Law: < 350 lines
 * Protocol: Turing Protocol Law T11 (Level 5 RBAC Boundary & Sovereign Privacy Vault)
 */

import React, { FC } from 'react';
import { Building2, UserCircle, Settings, ChevronRight } from 'lucide-react';
import { ActivityBar, ActivityGroup, ActivityIconBtn } from './ExecutiveVSCodeSidebar.styles';
import type { ActivityTab } from './ExecutiveVSCodeSidebar.logic';
import type { UserRole } from '../../../context/UserRoleContext';
import {
  type ActivityItemConfig,
  AGENT_ITEMS,
  DIRECTORATE_ITEMS,
  GUEST_ITEMS,
  LANDLORD_ITEMS,
  TENANT_ITEMS,
} from './SidebarActivityBar.config';

export interface SidebarActivityBarProps {
  activeTab: ActivityTab;
  onSelectTab: (tab: ActivityTab) => void;
  onToggleDrawerForTab?: (tab: ActivityTab) => void;
  role: UserRole;
  isDirectorate: boolean;
}

const getRoleItems = (role: UserRole, isDirectorate: boolean): ActivityItemConfig[] => {
  if (isDirectorate) return DIRECTORATE_ITEMS;
  if (role === 'landlord') return LANDLORD_ITEMS;
  if (role === 'tenant') return TENANT_ITEMS;
  if (role === 'agent') return AGENT_ITEMS;
  return GUEST_ITEMS;
};

export const SidebarActivityBar: FC<SidebarActivityBarProps> = ({
  activeTab,
  onSelectTab,
  onToggleDrawerForTab,
  role,
  isDirectorate,
}) => {
  const items = getRoleItems(role, isDirectorate);

  return (
    <ActivityBar>
      <ActivityGroup>
        {isDirectorate && (
          <div style={{ position: 'relative', width: '36px', height: '36px' }}>
            <ActivityIconBtn
              $isActive={activeTab === 'departments'}
              onClick={() => onSelectTab('departments')}
              title="DMS: Corporate Department Management System (/dashboard/dms)"
              data-testid="activity-btn-departments"
              style={{ width: '100%', height: '100%' }}
            >
              <Building2 size={18} />
            </ActivityIconBtn>
            {onToggleDrawerForTab && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onToggleDrawerForTab('departments');
                }}
                title="Toggle Departments Drawer"
                data-testid="activity-caret-departments"
                style={{
                  position: 'absolute',
                  right: '-4px',
                  bottom: '-2px',
                  width: '14px',
                  height: '14px',
                  background: '#1E293B',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '50%',
                  color: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  zIndex: 2,
                }}
              >
                <ChevronRight size={10} />
              </button>
            )}
          </div>
        )}

        {items.map(({ tab, activeTabs, title, testId, Icon }) => (
          <ActivityIconBtn
            key={tab}
            $isActive={activeTabs ? activeTabs.includes(activeTab) : activeTab === tab}
            onClick={() => onSelectTab(tab)}
            title={title}
            data-testid={testId}
          >
            <Icon size={18} />
          </ActivityIconBtn>
        ))}
      </ActivityGroup>

      <ActivityGroup>
        <ActivityIconBtn
          $isActive={activeTab === 'profile'}
          onClick={() => onSelectTab('profile')}
          title="Sovereign Executive Profile & Preferences"
          data-testid="activity-btn-profile"
        >
          <UserCircle size={18} />
        </ActivityIconBtn>

        <ActivityIconBtn
          $isActive={activeTab === 'settings'}
          onClick={() => onSelectTab('settings')}
          title="Sovereign Settings"
        >
          <Settings size={18} />
        </ActivityIconBtn>
      </ActivityGroup>
    </ActivityBar>
  );
};
