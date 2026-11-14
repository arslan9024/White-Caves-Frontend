import { describe, it, expect } from 'vitest';
import * as hooks from './useOptimizedAPI';

describe('useOptimizedAPI exports', () => {
  it('exports all hook functions cleanly', () => {
    expect(hooks.useDepartmentsOptimized).toBeDefined();
    expect(hooks.useDepartmentDataOptimized).toBeDefined();
    expect(hooks.useDepartmentKPIsOptimized).toBeDefined();
    expect(hooks.useDepartmentTrendsOptimized).toBeDefined();
    expect(hooks.useDepartmentSummaryOptimized).toBeDefined();
    expect(hooks.usePerformanceStats).toBeDefined();
    expect(hooks.useCacheManagement).toBeDefined();
    expect(hooks.useBatchFetchDepartments).toBeDefined();
  });
});
