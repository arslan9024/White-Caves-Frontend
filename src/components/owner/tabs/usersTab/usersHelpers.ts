import { REAL_ESTATE_ROLES } from '../../../../config/roles';
import type { ManagedUser, RoleInfo, SortOrder, UsersByCategoryMap } from './types';

export interface UserFilterOptions {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  selectedCategory: string;
  sortBy: string;
  sortOrder: SortOrder;
}

export function getRoleInfo(roleId: string): RoleInfo {
  return (
    REAL_ESTATE_ROLES.find(r => r.id === roleId) || {
      name: roleId,
      color: '#666',
      category: 'support' as const,
    }
  );
}

export function filterAndSortUsers(
  users: ManagedUser[],
  options: UserFilterOptions
): ManagedUser[] {
  const { searchQuery, selectedRole, selectedStatus, selectedCategory, sortBy, sortOrder } =
    options;
  const normalizedQuery = searchQuery.toLowerCase();

  return users
    .filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery);
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      const roleInfo = getRoleInfo(user.role);
      const matchesCategory = selectedCategory === 'all' || roleInfo.category === selectedCategory;
      return matchesSearch && matchesRole && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'role':
          comparison = a.role.localeCompare(b.role);
          break;
        case 'joinDate':
          comparison = new Date(a.joinDate || 0).getTime() - new Date(b.joinDate || 0).getTime();
          break;
        case 'deals':
          comparison = a.deals - b.deals;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
}

export function groupUsersByCategory(users: ManagedUser[]): UsersByCategoryMap {
  return REAL_ESTATE_ROLES.reduce<UsersByCategoryMap>((acc, role) => {
    const cat = role.category || 'other';
    if (!acc[cat]) acc[cat] = { count: 0, roles: [] };
    const roleUsers = users.filter(u => u.role === role.id);
    acc[cat].count += roleUsers.length;
    if (roleUsers.length > 0) {
      acc[cat].roles.push({ ...role, userCount: roleUsers.length });
    }
    return acc;
  }, {});
}
