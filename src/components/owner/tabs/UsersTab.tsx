import React, { useState } from 'react';
import type { UsersTabProps } from './types';
import { UsersContainer } from './TabStylesComponents';
import { DUMMY_USERS } from './usersTab/usersData';
import { filterAndSortUsers, groupUsersByCategory } from './usersTab/usersHelpers';
import { UsersOverviewSection } from './usersTab/UsersOverviewSection';
import { UsersTableSection } from './usersTab/UsersTableSection';
import type { ManagedUser, SortOrder } from './usersTab/types';

function UsersTab({ onAction }: UsersTabProps) {
  const [users] = useState<ManagedUser[]>(() => (import.meta.env.DEV ? DUMMY_USERS : []));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredUsers = filterAndSortUsers(users, {
    searchQuery,
    selectedRole,
    selectedStatus,
    selectedCategory,
    sortBy,
    sortOrder,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedStatus, selectedCategory]);

  const usersByCategory = groupUsersByCategory(users);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    }
  };

  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCategoryToggle = (key: string) => {
    setSelectedCategory(selectedCategory === key ? 'all' : key);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setSelectedCategory('all');
  };

  return (
    <UsersContainer>
      <UsersOverviewSection
        users={users}
        usersByCategory={usersByCategory}
        searchQuery={searchQuery}
        selectedRole={selectedRole}
        selectedStatus={selectedStatus}
        selectedCategory={selectedCategory}
        selectedUsers={selectedUsers}
        onSearchChange={setSearchQuery}
        onRoleChange={setSelectedRole}
        onStatusChange={setSelectedStatus}
        onCategoryToggle={handleCategoryToggle}
        onClearSelection={() => setSelectedUsers([])}
        onAction={onAction}
      />

      <UsersTableSection
        paginatedUsers={paginatedUsers}
        filteredCount={filteredUsers.length}
        selectedUsers={selectedUsers}
        sortBy={sortBy}
        sortOrder={sortOrder}
        currentPage={currentPage}
        totalPages={totalPages}
        onSort={handleSort}
        onSelectAll={handleSelectAll}
        onSelectUser={handleSelectUser}
        onPageChange={setCurrentPage}
        onClearFilters={handleClearFilters}
        onAction={onAction}
      />
    </UsersContainer>
  );
}

export default React.memo(UsersTab);
