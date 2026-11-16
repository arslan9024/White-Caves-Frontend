import { describe, it, expect } from 'vitest';
import { formatBreadcrumbPath, returnToParentPath } from './navBreadcrumb';

describe('navBreadcrumb (TURING-NAV-TREE-009)', () => {
  it('formats root-to-leaf breadcrumb lineage cleanly', () => {
    expect(
      formatBreadcrumbPath(['Floor 3', ' WC-SALES ', '', 'Offplan', 'Unit 402', 'NOC Request'])
    ).toBe('Floor 3 > WC-SALES > Offplan > Unit 402 > NOC Request');
  });

  it('returns to immediate parent on leaf completion', () => {
    expect(returnToParentPath(['Floor 3', 'WC-SALES', 'NOC Request'])).toEqual([
      'Floor 3',
      'WC-SALES',
    ]);
    expect(returnToParentPath(['Floor 3'])).toEqual(['Floor 3']);
  });
});

