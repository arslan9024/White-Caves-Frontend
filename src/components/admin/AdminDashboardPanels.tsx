import React, { FormEvent } from 'react';
import { Alert, Pagination } from '../../components/ui';
import {
  Users,
  Settings,
  Activity,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Clock,
  CheckCircle,
  Download,
} from 'lucide-react';
import { createLogger } from '../../utils/logger';
import * as S from './AdminDashboard.styles';
import type {
  DashboardActivity,
  DashboardUser,
  SystemMetrics,
  AdminTabId,
} from './hooks/useAdminDashboardData';

const logger = createLogger('AdminDashboardPanels');

interface OverviewPanelProps {
  panelId: string;
  tabId: string;
  systemMetrics: SystemMetrics;
  alerts: Array<{
    id: number;
    severity: 'warning' | 'info' | 'error';
    message: string;
    status: 'active';
  }>;
  paginatedActivities: DashboardActivity[];
  currentActivityPage: number;
  activitiesTotalPages: number;
  totalActivities: number;
  setCurrentActivityPage: (page: number) => void;
}

export const AdminOverviewPanel = ({
  panelId,
  tabId,
  systemMetrics,
  alerts,
  paginatedActivities,
  currentActivityPage,
  activitiesTotalPages,
  totalActivities,
  setCurrentActivityPage,
}: OverviewPanelProps) => (
  <S.AdminOverview id={panelId} role="tabpanel" aria-labelledby={tabId}>
    <S.MetricsGrid>
      <S.MetricCard>
        <S.MetricHeader>
          <Users size={24} />
          <S.MetricTitle>Total Users</S.MetricTitle>
        </S.MetricHeader>
        <S.MetricValue>{systemMetrics.totalUsers}</S.MetricValue>
        <S.MetricSubtext>{systemMetrics.activeUsers} active</S.MetricSubtext>
      </S.MetricCard>

      <S.MetricCard>
        <S.MetricHeader>
          <TrendingUp size={24} />
          <S.MetricTitle>Total Properties</S.MetricTitle>
        </S.MetricHeader>
        <S.MetricValue>{systemMetrics.totalProperties}</S.MetricValue>
        <S.MetricSubtext>{systemMetrics.activeListings} active</S.MetricSubtext>
      </S.MetricCard>

      <S.MetricCard>
        <S.MetricHeader>
          <CheckCircle size={24} />
          <S.MetricTitle>Transactions</S.MetricTitle>
        </S.MetricHeader>
        <S.MetricValue>{systemMetrics.totalTransactions}</S.MetricValue>
        <S.MetricSubtext>{systemMetrics.completedTransactions} completed</S.MetricSubtext>
      </S.MetricCard>

      <S.MetricCard>
        <S.MetricHeader>
          <Activity size={24} />
          <S.MetricTitle>System Health</S.MetricTitle>
        </S.MetricHeader>
        <S.MetricValue>{systemMetrics.uptime}%</S.MetricValue>
        <S.MetricSubtext>{systemMetrics.systemHealth} condition</S.MetricSubtext>
      </S.MetricCard>
    </S.MetricsGrid>

    <S.StatusSection>
      <S.SectionHeader>
        <Activity size={20} />
        <h3>System Status</h3>
      </S.SectionHeader>

      <S.StatusGrid>
        <S.StatusItem>
          <S.StatusLabel>Response Time</S.StatusLabel>
          <S.StatusValue>{systemMetrics.responseTime}ms</S.StatusValue>
        </S.StatusItem>
        <S.StatusItem>
          <S.StatusLabel>Error Rate</S.StatusLabel>
          <S.StatusValue>{systemMetrics.errorRate}%</S.StatusValue>
        </S.StatusItem>
        <S.StatusItem>
          <S.StatusLabel>Uptime</S.StatusLabel>
          <S.StatusValue>{systemMetrics.uptime}%</S.StatusValue>
        </S.StatusItem>
        <S.StatusItem>
          <S.StatusLabel>Database Status</S.StatusLabel>
          <S.StatusValueSuccess>Connected</S.StatusValueSuccess>
        </S.StatusItem>
      </S.StatusGrid>
    </S.StatusSection>

    {alerts.length > 0 && (
      <S.AlertsSection>
        <S.SectionHeader>
          <AlertCircle size={20} />
          <h3>System Alerts</h3>
        </S.SectionHeader>

        <S.AlertsList>
          {alerts.map(alert => (
            <Alert
              key={alert.id}
              type={
                alert.severity === 'warning'
                  ? 'warning'
                  : alert.severity === 'error'
                    ? 'error'
                    : 'info'
              }
              message={alert.message}
              closable
              onClose={() => {}}
            />
          ))}
        </S.AlertsList>
      </S.AlertsSection>
    )}

    <S.ActivitySection>
      <S.SectionHeader>
        <Clock size={20} />
        <h3>Recent Activity</h3>
      </S.SectionHeader>

      <S.ActivitiesList>
        {paginatedActivities.map(activity => (
          <S.ActivityItem key={activity.id}>
            <S.ActivityIcon>
              {activity.type === 'create' && <CheckCircle size={16} />}
              {activity.type === 'update' && <TrendingUp size={16} />}
              {activity.type === 'download' && <Download size={16} />}
              {activity.type === 'system' && <Activity size={16} />}
            </S.ActivityIcon>
            <S.ActivityContent>
              <S.ActivityUser>{activity.user}</S.ActivityUser>
              <S.ActivityAction>{activity.action}</S.ActivityAction>
            </S.ActivityContent>
            <S.ActivityTime>{activity.time}</S.ActivityTime>
          </S.ActivityItem>
        ))}
      </S.ActivitiesList>

      {activitiesTotalPages > 1 && (
        <S.PaginationContainer>
          <Pagination
            currentPage={currentActivityPage}
            totalItems={totalActivities}
            itemsPerPage={5}
            onPageChange={setCurrentActivityPage}
          />
        </S.PaginationContainer>
      )}
    </S.ActivitySection>
  </S.AdminOverview>
);

interface UsersPanelProps {
  panelId: string;
  tabId: string;
  paginatedUsers: DashboardUser[];
  currentUsersPage: number;
  usersTotalPages: number;
  totalUsers: number;
  setCurrentUsersPage: (page: number) => void;
}

export const AdminUsersPanel = ({
  panelId,
  tabId,
  paginatedUsers,
  currentUsersPage,
  usersTotalPages,
  totalUsers,
  setCurrentUsersPage,
}: UsersPanelProps) => (
  <S.AdminUsers id={panelId} role="tabpanel" aria-labelledby={tabId}>
    <S.SectionHeader>
      <Users size={20} />
      <h3>User Management</h3>
    </S.SectionHeader>

    <S.UsersTable>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <S.RoleBadge $role={user.role}>{user.role}</S.RoleBadge>
              </td>
              <td>
                <S.StatusBadge $status={user.status}>{user.status}</S.StatusBadge>
              </td>
              <td>{user.lastActive}</td>
              <td>
                <S.ActionBtn>Edit</S.ActionBtn>
                {user.status === 'active' && <S.ActionBtn $danger>Suspend</S.ActionBtn>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.UsersTable>

    {usersTotalPages > 1 && (
      <S.PaginationContainer>
        <Pagination
          currentPage={currentUsersPage}
          totalItems={totalUsers}
          itemsPerPage={10}
          onPageChange={setCurrentUsersPage}
        />
      </S.PaginationContainer>
    )}
  </S.AdminUsers>
);

interface AnalyticsPanelProps {
  panelId: string;
  tabId: string;
  filterPeriod: string;
  setFilterPeriod: (value: string) => void;
}

export const AdminAnalyticsPanel = ({
  panelId,
  tabId,
  filterPeriod,
  setFilterPeriod,
}: AnalyticsPanelProps) => (
  <S.AdminAnalytics id={panelId} role="tabpanel" aria-labelledby={tabId}>
    <S.SectionHeader>
      <BarChart3 size={20} />
      <h3>Analytics & Reports</h3>
      <S.FilterSelect
        value={filterPeriod}
        onChange={e => setFilterPeriod(e.target.value)}
        aria-label="Filter analytics by time period"
      >
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="90d">Last 90 Days</option>
        <option value="1y">Last Year</option>
      </S.FilterSelect>
    </S.SectionHeader>

    <S.AnalyticsCharts>
      <S.ChartContainer>
        <h4>User Growth Trend</h4>
        <S.ChartPlaceholder>
          <S.ChartBar $height="60%" />
          <S.ChartBar $height="75%" />
          <S.ChartBar $height="85%" />
          <S.ChartBar $height="95%" />
          <S.ChartBar $height="100%" />
        </S.ChartPlaceholder>
      </S.ChartContainer>

      <S.ChartContainer>
        <h4>Transaction Volume</h4>
        <S.ChartPlaceholder>
          <S.ChartBar $height="70%" />
          <S.ChartBar $height="80%" />
          <S.ChartBar $height="65%" />
          <S.ChartBar $height="85%" />
          <S.ChartBar $height="90%" />
        </S.ChartPlaceholder>
      </S.ChartContainer>
    </S.AnalyticsCharts>

    <S.ReportActions>
      <S.BtnSecondary>
        <Download size={18} />
        Export Report
      </S.BtnSecondary>
      <S.BtnSecondary>
        <BarChart3 size={18} />
        Full Analytics
      </S.BtnSecondary>
    </S.ReportActions>
  </S.AdminAnalytics>
);

export { AdminSettingsPanel } from './AdminSettingsPanel';
export type { SettingsPanelProps } from './AdminSettingsPanel';
