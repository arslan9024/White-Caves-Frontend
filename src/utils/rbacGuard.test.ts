import { describe, it, expect } from 'vitest';
import { hasRequiredRbacLevel } from './rbacGuard';

describe('rbacGuard (AEG-003)', () => {
  it('enforces Level 5 RBAC hierarchy', () => {
    expect(hasRequiredRbacLevel(5, 5)).toBe(true);
    expect(hasRequiredRbacLevel(4, 5)).toBe(false);
    expect(hasRequiredRbacLevel(3, 2)).toBe(true);
    expect(hasRequiredRbacLevel(null, 1)).toBe(false);
    expect(hasRequiredRbacLevel(undefined, 1)).toBe(false);
  });
});

