/**
 * Types for CRM Agent Performance Dashboard
 */

export interface Agent {
  id: string | number;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
  status?: string;
  performance?: number;
  avatar?: string;
  deals_closed?: number;
  revenue_generated?: number;
  leads_assigned?: number;
  conversion_rate?: number;
  [key: string]: unknown;
}
