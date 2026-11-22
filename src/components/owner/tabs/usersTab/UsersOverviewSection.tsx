import React from 'react';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { REAL_ESTATE_ROLES } from '../../../../config/roles';
import {
  UsersHeader,
  HeaderLeft,
  HeaderActions,
  UsersStats,
  UserStatCard,
  StatValue,
  StatLabel,
  CategoryOverview,
  CategoryGrid,
  CategoryCard,
  CategoryName,
  CategoryCount,
  UsersToolbar,
  SearchBox,
  ToolbarFilters,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  StatsGrid,
  SecondaryButton as CancelButton,
} from '../TabStylesComponents';
import { ROLE_CATEGORIES } from './usersData';
import type { ManagedUser, OnUserAction, UsersByCategoryMap } from './types';

export interface UsersOverviewSectionProps {
  users: ManagedUser[];
  usersByCategory: UsersByCategoryMap;
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  selectedCategory: string;
  selectedUsers: number[];
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryToggle: (category: string) => void;
  onClearSelection: () => void;
  onAction?: OnUserAction;
}

export const UsersOverviewSection: React.FC<UsersOverviewSectionProps> = ({
  users,
  usersByCategory,
  searchQuery,
  selectedRole,
  selectedStatus,
  selectedCategory,
  selectedUsers,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onCategoryToggle,
  onClearSelection,
  onAction,
}) => (
  <>
    <UsersHeader>
      <HeaderLeft>
        <h2>User Management</h2>
        <p>Manage all users across {REAL_ESTATE_ROLES.length} different roles</p>
      </HeaderLeft>
      <HeaderActions>
        <SecondaryButton disabled title="Export coming soon">
          <Download size={16} /> Export
        </SecondaryButton>
        <SecondaryButton disabled title="Import coming soon">
          <Upload size={16} /> Import
        </SecondaryButton>
        <PrimaryButton onClick={() => onAction?.('addUser')}>
          <Plus size={16} /> Add User
        </PrimaryButton>
      </HeaderActions>
    </UsersHeader>

    <UsersStats>
      <UserStatCard>
        <StatValue>{users.length}</StatValue>
        <StatLabel>Total Users</StatLabel>
      </UserStatCard>
      <UserStatCard>
        <StatValue>{users.filter(u => u.status === 'active').length}</StatValue>
        <StatLabel>Active</StatLabel>
      </UserStatCard>
      <UserStatCard>
        <StatValue>{users.filter(u => u.status === 'pending').length}</StatValue>
        <StatLabel>Pending</StatLabel>
      </UserStatCard>
      <UserStatCard>
        <StatValue>{REAL_ESTATE_ROLES.length}</StatValue>
        <StatLabel>Role Types</StatLabel>
      </UserStatCard>
    </UsersStats>

    <CategoryOverview>
      <h3>Users by Category</h3>
      <CategoryGrid>
        {Object.entries(ROLE_CATEGORIES).map(([key, label]) => (
          <CategoryCard
            key={key}
            className="category-card"
            $isActive={selectedCategory === key}
            onClick={() => onCategoryToggle(key)}
          >
            <CategoryName>{label}</CategoryName>
            <CategoryCount>{usersByCategory[key]?.count || 0}</CategoryCount>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </CategoryOverview>

    <UsersToolbar>
      <SearchBox>
        <Search size={18} />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </SearchBox>

      <ToolbarFilters>
        <select value={selectedRole} onChange={e => onRoleChange(e.target.value)}>
          <option value="all">All Roles</option>
          {REAL_ESTATE_ROLES.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        <select value={selectedStatus} onChange={e => onStatusChange(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </ToolbarFilters>
    </UsersToolbar>

    {selectedUsers.length > 0 && (
      <StatsGrid
        style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}
      >
        <span style={{ fontWeight: 600 }}>{selectedUsers.length} users selected</span>
        <SecondaryButton onClick={() => onAction?.('bulkActivate', { userIds: selectedUsers })}>
          Activate
        </SecondaryButton>
        <SecondaryButton onClick={() => onAction?.('bulkDeactivate', { userIds: selectedUsers })}>
          Deactivate
        </SecondaryButton>
        <DangerButton
          onClick={() => {
            if (
              window.confirm(
                `Delete ${selectedUsers.length} selected user(s)? This cannot be undone.`
              )
            )
              onAction?.('bulkDelete', { userIds: selectedUsers });
          }}
        >
          Delete
        </DangerButton>
        <CancelButton onClick={onClearSelection}>Clear</CancelButton>
      </StatsGrid>
    )}
  </>
);
