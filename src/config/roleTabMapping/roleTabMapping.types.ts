// Role Tab Mapping Types
export type RoleKey =
  | 'lion'
  | 'owner'
  | 'buyer'
  | 'seller'
  | 'landlord'
  | 'leasing-agent'
  | 'secondary-sales-agent'
  | 'tenant'
  | 'managing_director'
  | 'super_admin'
  | 'branch_manager'
  | 'sales_manager'
  | 'leasing_manager'
  | 'sales_agent'
  | 'leasing_agent'
  | 'property_manager'
  | 'property_consultant'
  | 'mortgage_consultant'
  | 'valuation_expert'
  | 'trustee_officer'
  | 'legal_officer'
  | 'finance_officer'
  | 'marketing_manager'
  | 'document_controller'
  | 'developer'
  | 'investor'
  | 'affiliated_agent'
  | 'real_estate_company'
  | 'property_mgmt_company';

export interface RoleTab {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

export interface RoleConfig {
  label: string;
  tabs: RoleTab[];
  description: string;
}

export interface RoleInfo {
  label: string;
  description: string;
  isSuperUser: boolean;
}

export type RoleTabMapping = Record<RoleKey, RoleConfig>;


