import type { UsersTabProps } from '../types';

export interface ManagedUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
  properties: number;
  deals: number;
  avatar: string;
}

export interface RoleInfo {
  name: string;
  color: string;
  category: string;
}

export type UsersByCategoryMap = Record<
  string,
  { count: number; roles: Array<Record<string, unknown>> }
>;

export type SortOrder = 'asc' | 'desc';

export type OnUserAction = UsersTabProps['onAction'];
