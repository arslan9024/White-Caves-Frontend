import React from 'react';
import {
  Edit2,
  Trash2,
  Eye,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserX,
} from 'lucide-react';
import { Badge, type BadgeVariant } from '../../../../components/ui';
import {
  UserCell,
  UserAvatar,
  UserInfo,
  UserName,
  UserEmail,
  RoleBadge,
  ContactCell,
  DateCell,
  DealsCell,
  ActionButton,
  Table,
  TableContainer,
  TableRow,
  TableHeader,
  TableCell,
  PageButton,
  PaginationContainer,
  PaginationInfo,
} from '../TabStylesComponents';
import { getRoleInfo } from './usersHelpers';
import type { ManagedUser, OnUserAction, SortOrder } from './types';

export interface UsersTableSectionProps {
  paginatedUsers: ManagedUser[];
  filteredCount: number;
  selectedUsers: number[];
  sortBy: string;
  sortOrder: SortOrder;
  currentPage: number;
  totalPages: number;
  onSort: (field: string) => void;
  onSelectAll: () => void;
  onSelectUser: (userId: number) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  onAction?: OnUserAction;
}

const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  active: 'success',
  pending: 'warning',
  inactive: 'error',
};

function renderStatusBadge(status: string) {
  return (
    <Badge variant={STATUS_VARIANTS[status] || 'secondary'} size="small">
      {status === 'active' && <UserCheck size={12} />}
      {status === 'inactive' && <UserX size={12} />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export const UsersTableSection: React.FC<UsersTableSectionProps> = ({
  paginatedUsers,
  filteredCount,
  selectedUsers,
  sortBy,
  sortOrder,
  currentPage,
  totalPages,
  onSort,
  onSelectAll,
  onSelectUser,
  onPageChange,
  onClearFilters,
  onAction,
}) => {
  const renderSortIcon = (field: string) =>
    sortBy === field && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />);

  return (
    <TableContainer>
      <Table aria-label="Team members and users">
        <thead>
          <TableRow>
            <TableHeader>
              <input
                type="checkbox"
                checked={
                  selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0
                }
                onChange={onSelectAll}
              />
            </TableHeader>
            <TableHeader
              className="sortable"
              style={{ cursor: 'pointer' }}
              onClick={() => onSort('name')}
            >
              User
              {renderSortIcon('name')}
            </TableHeader>
            <TableHeader
              className="sortable"
              style={{ cursor: 'pointer' }}
              onClick={() => onSort('role')}
            >
              Role
              {renderSortIcon('role')}
            </TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader
              className="sortable"
              style={{ cursor: 'pointer' }}
              onClick={() => onSort('joinDate')}
            >
              Joined
              {renderSortIcon('joinDate')}
            </TableHeader>
            <TableHeader
              className="sortable"
              style={{ cursor: 'pointer' }}
              onClick={() => onSort('deals')}
            >
              Deals
              {renderSortIcon('deals')}
            </TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {paginatedUsers.map(user => {
            const roleInfo = getRoleInfo(user.role);
            return (
              <TableRow
                key={user.id}
                style={{
                  background: selectedUsers.includes(user.id)
                    ? 'rgba(201, 168, 76, 0.05)'
                    : undefined,
                }}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onSelectUser(user.id)}
                  />
                </TableCell>
                <UserCell>
                  <UserAvatar
                    src={user.avatar}
                    alt={user.name}
                    loading="lazy"
                    width={40}
                    height={40}
                  />
                  <UserInfo>
                    <UserName>{user.name}</UserName>
                    <UserEmail>{user.email}</UserEmail>
                  </UserInfo>
                </UserCell>
                <TableCell>
                  <RoleBadge
                    className="role-badge"
                    style={{
                      backgroundColor: `${roleInfo.color}20`,
                      color: roleInfo.color,
                      borderColor: roleInfo.color,
                    }}
                  >
                    {roleInfo.name}
                  </RoleBadge>
                </TableCell>
                <ContactCell>
                  <a
                    href={`mailto:${user.email}`}
                    aria-label={`Email ${user.email}`}
                    title={`Email ${user.email}`}
                  >
                    <Mail size={14} />
                  </a>
                  <a
                    href={`tel:${user.phone}`}
                    aria-label={`Call ${user.phone}`}
                    title={`Call ${user.phone}`}
                  >
                    <Phone size={14} />
                  </a>
                </ContactCell>
                <TableCell>{renderStatusBadge(user.status)}</TableCell>
                <DateCell>
                  {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
                </DateCell>
                <DealsCell>{user.deals}</DealsCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <ActionButton
                      title="View"
                      onClick={() => onAction?.('viewUser', { id: user.id })}
                    >
                      <Eye size={14} />
                    </ActionButton>
                    <ActionButton
                      title="Edit"
                      onClick={() => onAction?.('editUser', { id: user.id })}
                    >
                      <Edit2 size={14} />
                    </ActionButton>
                    <ActionButton
                      title="Delete"
                      onClick={() => onAction?.('deleteUser', { id: user.id })}
                      style={{ color: 'var(--accent-red, #EF4444)' }}
                    >
                      <Trash2 size={14} />
                    </ActionButton>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      {paginatedUsers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
          <p>No users found matching your filters.</p>
          <button onClick={onClearFilters} style={{ marginTop: 8, cursor: 'pointer' }}>
            Clear filters
          </button>
        </div>
      )}

      {paginatedUsers.length > 0 && (
        <PaginationContainer>
          <PaginationInfo>
            Showing {paginatedUsers.length} of {filteredCount} users
          </PaginationInfo>
          <div style={{ display: 'flex', gap: '8px' }}>
            <PageButton
              disabled={currentPage === 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
              Previous
            </PageButton>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <PageButton
                  key={page}
                  $active={currentPage === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PageButton>
              );
            })}
            <PageButton
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
              Next
            </PageButton>
          </div>
        </PaginationContainer>
      )}
    </TableContainer>
  );
};
