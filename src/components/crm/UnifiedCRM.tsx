import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { spacing } from '../../styles/theme/spacing';
import styled from 'styled-components';
import type { DashboardView, UnifiedCRMProps } from './types';

import {
  type LocalDashboardConfig,
  LOCAL_DASHBOARD_CONFIGS,
  StyledContainer, Header, HeaderContent, Title, Subtitle,
  ViewSelectorContainer, ViewButton, ContentArea, Card,
  MetricCard, FeatureList, RoleIndicator, LoadingSpinner,
} from './UnifiedCRM.config';
export {
  type LocalDashboardConfig,
  LOCAL_DASHBOARD_CONFIGS,
  StyledContainer, Header, HeaderContent, Title, Subtitle,
  ViewSelectorContainer, ViewButton, ContentArea, Card,
  MetricCard, FeatureList, RoleIndicator, LoadingSpinner,
};

const UnifiedCRM: React.FC<UnifiedCRMProps> = ({
  defaultView = 'company',
  onViewChange,
  refreshInterval: _refreshInterval,
  enableExport: _enableExport,
  enableCustomization: _enableCustomization,
  onMetricsUpdate: _onMetricsUpdate,
}) => {
  const [currentView, setCurrentView] = useState<DashboardView>(defaultView);
  const [loading, setLoading] = useState(false);

  const userRole = useSelector((state: RootState) => state.auth?.user?.role || 'agent');

  const availableDashboards = useMemo(() => {
    return Object.values(LOCAL_DASHBOARD_CONFIGS).filter(config => config.roles.includes(userRole));
  }, [userRole]);

  const currentConfig = useMemo(() => {
    return LOCAL_DASHBOARD_CONFIGS[currentView];
  }, [currentView]);

  const viewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (viewTimerRef.current) clearTimeout(viewTimerRef.current);
    };
  }, []);

  const handleViewChange = useCallback(
    (view: DashboardView) => {
      setLoading(true);
      setCurrentView(view);
      onViewChange?.(view);

      if (viewTimerRef.current) clearTimeout(viewTimerRef.current);
      viewTimerRef.current = setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    [onViewChange]
  );

  const hasAccess = useMemo(() => {
    return currentConfig.roles.includes(userRole);
  }, [currentConfig, userRole]);

  if (!hasAccess && !loading) {
    return (
      <StyledContainer>
        <Header>
          <HeaderContent>
            <Title>Access Denied</Title>
            <Subtitle>
              <span>
                You don't have permission to access this dashboard. Contact your administrator.
              </span>
            </Subtitle>
          </HeaderContent>
        </Header>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Header>
        <HeaderContent>
          <Title>
            {currentConfig.icon} {currentConfig.label}
          </Title>
          <Subtitle>
            <span>{currentConfig.description}</span>
            <span>
              <strong>Role:</strong> {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          </Subtitle>
        </HeaderContent>
        <ViewSelectorContainer>
          {availableDashboards.map(config => (
            <ViewButton
              key={config.id}
              $isActive={currentView === config.id}
              $isDisabled={loading}
              onClick={() => handleViewChange(config.id)}
              title={config.description}
            >
              {config.icon} {config.label}
            </ViewButton>
          ))}
        </ViewSelectorContainer>
      </Header>

      {loading ? (
        <LoadingSpinner data-testid="unified-crm-loading-skeleton" />
      ) : (
        <ContentArea>
          {currentConfig.metrics.map(metric => (
            <MetricCard key={metric}>
              <div className="metric-label">{metric.replace(/_/g, ' ').toUpperCase()}</div>
              <div className="metric-value">
                {metric.includes('revenue') || metric.includes('commission') ? '$' : ''}
                {(metric.includes('revenue')
                  ? 250000
                  : metric.includes('commission')
                    ? 45000
                    : 1250
                ).toLocaleString()}
              </div>
            </MetricCard>
          ))}

          <Card>
            <h3 style={{ marginTop: 0, marginBottom: 12, color: 'var(--color-333, #333)' }}>
              Available Features
            </h3>
            <FeatureList>
              {currentConfig.features.map(feature => (
                <li key={feature}>{feature.replace(/_/g, ' ').toUpperCase()}</li>
              ))}
            </FeatureList>
            <RoleIndicator>
              <strong style={{ marginRight: 'auto' }}>Accessible by:</strong>
              {currentConfig.roles.map(role => (
                <div key={role} className="role-badge">
                  {role.toUpperCase()}
                </div>
              ))}
            </RoleIndicator>
          </Card>
        </ContentArea>
      )}
    </StyledContainer>
  );
};

export default UnifiedCRM;
