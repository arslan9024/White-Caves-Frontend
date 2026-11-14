import { describe, it, expect } from 'vitest';
import {
  renderDepartmentKPIs,
  SalesKPIRenderer,
  FinanceKPIRenderer,
  HRKPIRenderer,
  departmentKPIRenderers,
  getKPIRenderer,
} from './departmentKPIRenderer';

describe('departmentKPIRenderer', () => {
  it('exports all KPI renderers cleanly', () => {
    expect(renderDepartmentKPIs).toBeDefined();
    expect(SalesKPIRenderer).toBeDefined();
    expect(FinanceKPIRenderer).toBeDefined();
    expect(HRKPIRenderer).toBeDefined();
    expect(departmentKPIRenderers.SALES).toBe(SalesKPIRenderer);
  });

  it('resolves correct department renderer via getKPIRenderer', () => {
    expect(getKPIRenderer('SALES')).toBe(SalesKPIRenderer);
    expect(getKPIRenderer('UNKNOWN')).toBe(renderDepartmentKPIs);
  });
});
