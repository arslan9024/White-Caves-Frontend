/**
 * White Caves CRM - Authentication & User Types
 */

export enum UserRole {
  ADMIN = 'admin',
  EXECUTIVE = 'executive',
  MANAGER = 'manager',
  AGENT = 'agent',
  VIEWER = 'viewer',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  department: string;
  profileImage?: string;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TwoFactorVerification {
  email: string;
  code: string;
}

