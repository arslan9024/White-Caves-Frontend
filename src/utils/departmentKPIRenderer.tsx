/**
 * Department KPI Renderer
 * Maps department data to KPI cards
 */

import React from 'react';
import { KPICard } from '../components/cards/KPICard';
import styled from 'styled-components';
import {
  DepartmentKPIConfig,
  toText,
  salesKPIConfigs,
  financeKPIConfigs,
  hrKPIConfigs,
  marketingKPIConfigs,
  operationsKPIConfigs,
  itKPIConfigs,
  clientServicesKPIConfigs,
  propertyKPIConfigs,
} from './departmentKPIConfigs';

export type { DepartmentKPIConfig };
export * from './departmentKPIConfigs';

const KPIGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

/**
 * Generic KPI renderer for any department
 */
export const renderDepartmentKPIs = (
  data: Record<string, unknown>,
  kpiConfigs: DepartmentKPIConfig[]
): React.ReactNode => {
  return (
    <KPIGridContainer>
      {kpiConfigs.map(config => {
        const value = data?.[config.key];
        const displayValue = config.format ? config.format(value) : toText(value);

        return (
          <KPICard
            key={config.key}
            label={config.label}
            value={displayValue}
            icon={config.icon}
            trend={config.trend}
            showProgress={config.showProgress}
            unit={config.unit}
          />
        );
      })}
    </KPIGridContainer>
  );
};

// Sales Department KPIs
export const SalesKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, salesKPIConfigs);

// Finance Department KPIs
export const FinanceKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, financeKPIConfigs);

// HR Department KPIs
export const HRKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, hrKPIConfigs);

// Marketing Department KPIs
export const MarketingKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, marketingKPIConfigs);

// Operations Department KPIs
export const OperationsKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, operationsKPIConfigs);

// IT Department KPIs
export const ITKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, itKPIConfigs);

// Client Services KPIs
export const ClientServicesKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, clientServicesKPIConfigs);

// Property Management KPIs
export const PropertyKPIRenderer = (data: Record<string, unknown>) =>
  renderDepartmentKPIs(data, propertyKPIConfigs);

// Create a mapping of department types to their KPI renderers
export const departmentKPIRenderers: Record<
  string,
  (data: Record<string, unknown>) => React.ReactNode
> = {
  SALES: SalesKPIRenderer,
  FINANCE: FinanceKPIRenderer,
  HR: HRKPIRenderer,
  MARKETING: MarketingKPIRenderer,
  OPERATIONS: OperationsKPIRenderer,
  IT: ITKPIRenderer,
  CLIENT_SERVICES: ClientServicesKPIRenderer,
  PROPERTY: PropertyKPIRenderer,
};

/**
 * Get KPI renderer for a department
 */
export const getKPIRenderer = (departmentCode: string) => {
  // eslint-disable-next-line security/detect-object-injection
  return departmentKPIRenderers[departmentCode] || renderDepartmentKPIs;
};

export default renderDepartmentKPIs;

