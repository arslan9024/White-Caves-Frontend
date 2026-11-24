import styled from 'styled-components';
import { spacing } from '../../styles/theme/spacing';
import type { DashboardView } from './types';

export interface LocalDashboardConfig {
  id: DashboardView;
  label: string;
  icon: string;
  description: string;
  roles: string[];
  metrics: string[];
  features: string[];
}

export const LOCAL_DASHBOARD_CONFIGS: Record<DashboardView, LocalDashboardConfig> = {
  company: {
    id: 'company',
    label: 'Company Overview',
    icon: '🏢',
    description: 'Company-wide metrics and KPIs',
    roles: ['admin', 'ceo', 'coo'],
    metrics: ['total_revenue', 'total_agents', 'total_clients', 'market_position'],
    features: ['company_metrics', 'team_overview', 'financial_summary'],
  },
  department: {
    id: 'department',
    label: 'Department',
    icon: '📊',
    description: 'Department-specific performance',
    roles: ['manager', 'admin'],
    metrics: ['dept_revenue', 'dept_agents', 'dept_performance', 'dept_kpis'],
    features: ['dept_analytics', 'team_metrics', 'agent_rankings'],
  },
  sales: {
    id: 'sales',
    label: 'Sales Pipeline',
    icon: '📈',
    description: 'Sales opportunities and pipeline',
    roles: ['agent', 'manager', 'admin'],
    metrics: ['pipeline_value', 'deals_in_progress', 'conversion_rate', 'avg_deal_size'],
    features: ['pipeline_view', 'deal_tracker', 'sales_forecast'],
  },
  property: {
    id: 'property',
    label: 'Property Inventory',
    icon: '🏠',
    description: 'Property listings and inventory',
    roles: ['agent', 'manager', 'admin', 'operations'],
    metrics: ['total_properties', 'available', 'leased', 'sold'],
    features: ['property_list', 'availability_tracking', 'listing_status'],
  },
  commission: {
    id: 'commission',
    label: 'Commission Tracking',
    icon: '💰',
    description: 'Commission calculations and history',
    roles: ['agent', 'manager', 'finance', 'admin'],
    metrics: ['total_commission', 'pending', 'approved', 'paid_amount'],
    features: ['commission_summary', 'payment_tracking', 'dispute_management'],
  },
  leads: {
    id: 'leads',
    label: 'Leads Management',
    icon: '👥',
    description: 'Lead tracking and qualification',
    roles: ['agent', 'manager', 'admin'],
    metrics: ['total_leads', 'qualified', 'conversion_rate', 'lead_quality'],
    features: ['lead_pipeline', 'scoring', 'qualification_tracking'],
  },
  office: {
    id: 'office',
    label: 'Office Management',
    icon: '🏛️',
    description: 'Office operations and administration',
    roles: ['manager', 'operations', 'admin'],
    metrics: ['office_efficiency', 'operations_cost', 'staff_count', 'utilization'],
    features: ['operations_dashboard', 'resource_planning', 'schedule_management'],
  },
  agent: {
    id: 'agent',
    label: 'Agent Performance',
    icon: '⭐',
    description: 'Individual agent metrics and performance',
    roles: ['agent', 'manager', 'admin'],
    metrics: ['deals_closed', 'total_commission', 'client_count', 'satisfaction'],
    features: ['personal_kpis', 'performance_chart', 'goals_tracking'],
  },
  financial: {
    id: 'financial',
    label: 'Financial Dashboard',
    icon: '💵',
    description: 'Financial metrics and reporting',
    roles: ['finance', 'manager', 'admin'],
    metrics: ['total_revenue', 'operating_costs', 'net_profit', 'cash_flow'],
    features: ['revenue_tracking', 'expense_analysis', 'profit_projection'],
  },
  performance: {
    id: 'performance',
    label: 'Performance KPIs',
    icon: '📉',
    description: 'Key performance indicators and trends',
    roles: ['manager', 'admin', 'agent'],
    metrics: ['kpi_summary', 'trend_analysis', 'benchmarking', 'goals_progress'],
    features: ['kpi_dashboard', 'trend_charts', 'goal_tracking'],
  },
  inventory: {
    id: 'inventory',
    label: 'Inventory Management',
    icon: '📦',
    description: 'Property and resource inventory',
    roles: ['operations', 'manager', 'admin'],
    metrics: ['total_items', 'in_stock', 'reserved', 'low_stock'],
    features: ['inventory_list', 'stock_tracking', 'alerts'],
  },
  client: {
    id: 'client',
    label: 'Client Profiles',
    icon: '👤',
    description: 'Client information and relationship management',
    roles: ['agent', 'manager', 'admin'],
    metrics: ['total_clients', 'active_clients', 'lifetime_value', 'satisfaction'],
    features: ['client_list', 'interaction_history', 'preferences'],
  },
};

// Compact style components
export const StyledContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: ${spacing.lg};
`;
export const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${spacing.lg};
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.lg};
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const HeaderContent = styled.div`
  flex: 1;
`;
export const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`;
export const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  display: flex;
  gap: ${spacing.md};
  flex-wrap: wrap;
  span {
    display: flex;
    align-items: center;
    gap: 6px;
    strong {
      font-weight: 600;
      color: #1976d2;
    }
  }
`;
export const ViewSelectorContainer = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  max-width: 100%;
  overflow-x: auto;
  @media (max-width: 1024px) {
    width: 100%;
    justify-content: flex-start;
  }
`;
export const ViewButton = styled.button<{ $isActive: boolean; $isDisabled: boolean }>`
  padding: 10px 14px;
  border: 2px solid ${props => (props.$isActive ? '#1976d2' : '#ddd')};
  background: ${props => (props.$isActive ? '#1976d2' : 'white')};
  color: ${props => (props.$isActive ? 'white' : '#333')};
  border-radius: 6px;
  cursor: ${props => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  font-size: 13px;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => (props.$isDisabled ? 0.5 : 1)};
  &:hover:not(:disabled) {
    border-color: #1976d2;
    background: ${props => (props.$isActive ? '#1565c0' : '#f0f8ff')};
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
export const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.lg};
`;
export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${spacing.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`;
export const MetricCard = styled(Card)`
  text-align: center;
  .metric-value {
    font-size: 28px;
    font-weight: 700;
    color: #1976d2;
    margin: 12px 0;
  }
  .metric-label {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
`;
export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${spacing.md} 0 0 0;
  li {
    padding: 8px 0;
    font-size: 14px;
    color: #555;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: ${spacing.sm};
    &:last-child {
      border-bottom: none;
    }
    &:before {
      content: '✓';
      color: #4caf50;
      font-weight: bold;
    }
  }
`;
export const RoleIndicator = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  margin-top: 12px;
  .role-badge {
    background: #f0f0f0;
    color: #666;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }
`;
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 16px;
  color: #666;
  &:after {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid #f0f0f0;
    border-top: 4px solid #1976d2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
