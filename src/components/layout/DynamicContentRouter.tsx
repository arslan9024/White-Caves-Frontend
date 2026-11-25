import React from 'react';
import type { ComponentType } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedDepartment,
  selectSelectedService,
  selectSelectedSubitem,
  selectMainContentLoading,
  selectMainContentError,
  setMainContentError,
} from '../../redux/slices/relationalSidebarSlice';
import {
  getDepartmentById,
  getServiceById,
  getSubitemsByService,
} from '../../config/departmentContentMap';

import {
  ExecutiveView,
  SalesView,
  OperationsView,
  PropertyManagementView,
  FinanceView,
  ComplianceView,
  AnalyticsView,
  TechnologyView,
  MarketingView,
  HRView,
} from '../departmentViews';

/**
 * DynamicContentRouter.tsx
 * Routes (department + service + subitem) to appropriate view component
 * Handles loading states, error boundaries, and permission checks
 */

import {
  RouterContainer,
  LoadingContainer,
  Spinner,
  ErrorContainer,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateMessage,
  AccessDeniedContainer,
  LockIcon,
  AccessDeniedTitle,
  AccessDeniedMessage,
  ContentWrapper,
} from './DynamicContentRouter.styles';

const viewComponentRegistry = {
  EXECUTIVE: {
    'strategic-overview': ExecutiveView,
  },
  SALES: {
    'lead-pipeline': SalesView,
  },
  OPERATIONS: {
    'daily-operations': OperationsView,
  },
  PROPERTY_MANAGEMENT: {
    'property-portfolio': PropertyManagementView,
  },
  FINANCE: {
    'financial-reports': FinanceView,
  },
  COMPLIANCE: {
    'compliance-dashboard': ComplianceView,
  },
  ANALYTICS: {
    'business-intelligence': AnalyticsView,
  },
  TECHNOLOGY: {
    'infrastructure-status': TechnologyView,
  },
  MARKETING: {
    'campaign-management': MarketingView,
  },
  HR: {
    'employee-management': HRView,
  },
};

/**
 * DynamicContentRouter Component
 */
const DynamicContentRouter = ({ userPermissions = [] }) => {
  const dispatch = useDispatch();

  // Redux state
  const selectedDept = useSelector(selectSelectedDepartment) as string | null;
  const selectedService = useSelector(selectSelectedService) as string | null;
  const selectedSubitem = useSelector(selectSelectedSubitem) as string | null;
  const loading = useSelector(selectMainContentLoading) as boolean;
  const error = useSelector(selectMainContentError) as string | null;

  // Get metadata
  const deptInfo = selectedDept ? getDepartmentById(selectedDept) : null;
  const serviceInfo =
    selectedDept && selectedService ? getServiceById(selectedDept, selectedService) : null;
  const subitems =
    selectedDept && selectedService ? getSubitemsByService(selectedDept, selectedService) : [];
  const selectedSubitemInfo = selectedSubitem
    ? subitems.find((s: { id: string; permissions: string[] }) => s.id === selectedSubitem)
    : null;

  // Determine which component to render
  const getComponentToRender = () => {
    if (!selectedDept) {
      return {
        type: 'empty',
        message: 'Select a department from the left sidebar to begin',
      };
    }

    if (!selectedService) {
      return {
        type: 'empty',
        message: 'Select a service to view its content',
      };
    }

    if (!selectedSubitem) {
      return {
        type: 'empty',
        message: 'Select a sub-item or feature to continue',
      };
    }

    // Check permissions
    if (
      !serviceInfo?.permissions.some((perm: string) => (userPermissions as string[]).includes(perm))
    ) {
      return {
        type: 'access-denied',
        message: 'You do not have permission to access this service',
      };
    }

    if (
      selectedSubitemInfo &&
      !selectedSubitemInfo.permissions.some((perm: string) =>
        (userPermissions as string[]).includes(perm)
      )
    ) {
      return {
        type: 'access-denied',
        message: 'You do not have permission to access this view',
      };
    }

    // Return component info
    // eslint-disable-next-line security/detect-object-injection
    const componentClass = (viewComponentRegistry as Record<string, Record<string, unknown>>)[
      selectedDept
    ]?.[selectedService] as ComponentType<{
      serviceName: string | null;
      subitemId: string | null;
    }> | null;

    return {
      type: 'view',
      componentClass,
      deptInfo,
      serviceInfo,
      selectedSubitemInfo,
    };
  };

  const componentInfo = getComponentToRender();

  const handleRetry = () => {
    dispatch(setMainContentError(null));
  };

  return (
    <RouterContainer>
      {loading && (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      )}

      {error && (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Error Loading Content</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={handleRetry}>Try Again</RetryButton>
        </ErrorContainer>
      )}

      {!loading && !error && (
        <ContentWrapper>
          {componentInfo.type === 'empty' && (
            <EmptyState>
              <EmptyStateIcon>📋</EmptyStateIcon>
              <EmptyStateTitle>Select a Service</EmptyStateTitle>
              <EmptyStateMessage>{componentInfo.message}</EmptyStateMessage>
            </EmptyState>
          )}

          {componentInfo.type === 'access-denied' && (
            <AccessDeniedContainer>
              <LockIcon>🔒</LockIcon>
              <AccessDeniedTitle>Access Denied</AccessDeniedTitle>
              <AccessDeniedMessage>{componentInfo.message}</AccessDeniedMessage>
            </AccessDeniedContainer>
          )}

          {componentInfo.type === 'view' && (
            <>
              {componentInfo.componentClass &&
                React.createElement(componentInfo.componentClass as ComponentType<any>, {
                  serviceName: selectedService,
                  subitemId: selectedSubitem,
                })}
            </>
          )}
        </ContentWrapper>
      )}
    </RouterContainer>
  );
};

export default DynamicContentRouter;

