/**
 * canonical-108-divisions-matrix/index.ts
 * Root Barrel for the Atomic 1-12-108 Bhakti & Wilkes Organizational Matrix
 */
import type { Canonical108DivisionsMatrix } from './types.ts';
import { EXECUTIVE_CONFIG, EXECUTIVE_DATA, EXECUTIVE_TIER } from './executive/index.ts';
import { CANONICAL_12_DEPARTMENTS } from './departments/index.ts';
import { validateCanonical108MatrixIntegrity } from './validators/index.ts';

export * from './types.ts';
export * from './executive/index.ts';
export * from './departments/index.ts';
export * from './validators/index.ts';

export const CANONICAL_108_DIVISIONS_MATRIX: Canonical108DivisionsMatrix = {
  protocol: EXECUTIVE_CONFIG.protocol,
  version: EXECUTIVE_CONFIG.version,
  authority: EXECUTIVE_DATA.authority,
  executivePartner: EXECUTIVE_DATA.executivePartner,
  formula: EXECUTIVE_CONFIG.formula,
  bhaktiFractal: EXECUTIVE_CONFIG.bhaktiFractal,
  rules: EXECUTIVE_CONFIG.rules,
  executive: EXECUTIVE_TIER,
  departments: CANONICAL_12_DEPARTMENTS,
};

export const getDivisionDepartmentByCode = (code: string) =>
  CANONICAL_108_DIVISIONS_MATRIX.departments?.find(
    d => d.code === code || d.deptCode === code
  );

export {
  BHAKTI_PROTOCOL_FORMULA,
  BHAKTI_TIER_SPECS,
  computeFixedOrgMatrix,
  computeTierCapacity,
  rollUpBottomToTop,
  computeTierRankings,
  evaluatePromotion,
  evaluateDemotion,
} from '../../../../Aegis-Sterling/protocols/bhakti/index.ts';

export { validateCanonical108MatrixIntegrity };
export default CANONICAL_108_DIVISIONS_MATRIX;
