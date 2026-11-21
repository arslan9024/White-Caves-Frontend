// @vitest-environment node
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  BHAKTI_PROTOCOL_ID,
  BHAKTI_TIER_SPECS,
  computeTierCapacity,
  computeFixedOrgMatrix,
  formatBhaktiSeatCode,
  parseBhaktiSeatCode,
  checkTopDownSlotAvailability,
  computeIndividualPerformanceScore,
  classifyPerformanceBand,
  resolveUpwardChain,
  rollUpBottomToTop,
  computeTierRankings,
  evaluatePromotion,
  evaluateDemotion,
  createManualTeamStore,
  createManualTeam,
  updateManualTeam,
  deleteManualTeam,
  assignTeamLeader,
  addEmployeeToTeam,
  removeEmployeeFromTeam,
  listTeamsBySupervisor,
  type BhaktiOrgNode,
} from '../../../Aegis-Sterling/protocols/bhakti/index.ts';
import { auditAtomicBarrelFolder } from '../../../Aegis-Sterling/protocols/wilkes12Way/index.ts';
import CANONICAL_108_DIVISIONS_MATRIX, {
  getDivisionDepartmentByCode,
  validateCanonical108MatrixIntegrity,
} from '../aegis-protocols/CANONICAL_108_DIVISIONS_MATRIX.ts';

describe('Bhakti 1-12-108 Repeating Fractal & Atomic Matrix Decomposition', () => {
  it('computes exact top-to-bottom capacities and stops fractal at Supervisors (13,081 fixed)', () => {
    expect(BHAKTI_PROTOCOL_ID).toBe('BHAKTI_1_12_108_REPEATING_FRACTAL_V2');
    expect(computeTierCapacity('MD')).toBe(1);
    expect(computeTierCapacity('DIRECTOR')).toBe(12);
    expect(computeTierCapacity('MANAGER')).toBe(108);
    expect(computeTierCapacity('ASSISTANT_MANAGER')).toBe(1296);
    expect(computeTierCapacity('SUPERVISOR')).toBe(11664);
    expect(computeTierCapacity('TEAM_LEADER')).toBe('MANUAL_CRUD');
    expect(computeTierCapacity('EMPLOYEE')).toBe('MANUAL_CRUD');

    const matrix = computeFixedOrgMatrix();
    expect(matrix.fixedSeatsTotal).toBe(13081);
    expect(matrix.perManagerSubtree.assistantManagers).toBe(12);
    expect(matrix.perManagerSubtree.supervisorsPerAssistantManager).toBe(9);
    expect(matrix.perManagerSubtree.supervisorsPerManager).toBe(108);
    expect(matrix.perManagerSubtree.teamsMode).toBe('MANUAL_CRUD');
    expect(matrix.perManagerSubtree.employeesMode).toBe('MANUAL_CRUD');
    expect(BHAKTI_TIER_SPECS.SUPERVISOR.mode).toBe('FIXED_FRACTAL_STOP');
  });

  it('formats, parses, and enforces bounds on dot-delimited Bhakti seat codes', () => {
    const code = formatBhaktiSeatCode({
      directorSlot: 1,
      managerSlot: 9,
      assistantManagerSlot: 12,
      supervisorSlot: 9,
    });
    expect(code).toBe('MD-01.DIR-01.MGR-09.AM-12.SUP-09');

    const parsed = parseBhaktiSeatCode(code);
    expect(parsed.tier).toBe('SUPERVISOR');
    expect(parsed.coords).toEqual({
      directorSlot: 1,
      managerSlot: 9,
      assistantManagerSlot: 12,
      supervisorSlot: 9,
    });

    expect(() => formatBhaktiSeatCode({ directorSlot: 13 })).toThrow();
    expect(() => formatBhaktiSeatCode({ directorSlot: 1, managerSlot: 10 })).toThrow();
    expect(() => formatBhaktiSeatCode({ directorSlot: 1, managerSlot: 1, assistantManagerSlot: 13 })).toThrow();
    expect(() =>
      formatBhaktiSeatCode({ directorSlot: 1, managerSlot: 1, assistantManagerSlot: 1, supervisorSlot: 10 })
    ).toThrow();
    expect(() => formatBhaktiSeatCode({ managerSlot: 1 })).toThrow();
    expect(() => parseBhaktiSeatCode('DIR-01')).toThrow();
  });

  it('enforces fixed branching caps and allows manual CRUD under Supervisors', () => {
    expect(checkTopDownSlotAvailability('DIRECTOR', 8)).toMatchObject({
      allowed: true,
      childTier: 'MANAGER',
      capacity: 9,
      remaining: 1,
    });
    expect(checkTopDownSlotAvailability('DIRECTOR', 9)).toMatchObject({
      allowed: false,
      remaining: 0,
    });
    expect(checkTopDownSlotAvailability('MANAGER', 12)).toMatchObject({
      allowed: false,
      childTier: 'ASSISTANT_MANAGER',
      remaining: 0,
    });
    expect(checkTopDownSlotAvailability('ASSISTANT_MANAGER', 9)).toMatchObject({
      allowed: false,
      childTier: 'SUPERVISOR',
      remaining: 0,
    });
    expect(checkTopDownSlotAvailability('SUPERVISOR', 40)).toMatchObject({
      allowed: true,
      childTier: 'TEAM_LEADER',
      capacity: 'UNLIMITED',
      mode: 'MANUAL_CRUD',
    });
    expect(checkTopDownSlotAvailability('SUPERVISOR', 3, 3)).toMatchObject({
      allowed: false,
      capacity: 3,
      remaining: 0,
    });
    expect(checkTopDownSlotAvailability('EMPLOYEE', 0)).toMatchObject({
      allowed: false,
      childTier: null,
      mode: 'LEAF',
    });
  });

  it('walks upward reporting chain, rolls up weighted subtree performance, and ranks peers', () => {
    const md: BhaktiOrgNode = {
      id: 'md-1',
      fullName: 'Arslan Malik',
      tier: 'MD',
      parentId: null,
      seatCode: 'MD-01',
      performance: { slaOnTimeRate: 100, taskCompletionRate: 100, complianceScore: 100, meritXp: 50000, targetXp: 50000 },
    };
    const dir: BhaktiOrgNode = {
      id: 'dir-1',
      fullName: 'Director One',
      tier: 'DIRECTOR',
      parentId: 'md-1',
      seatCode: 'MD-01.DIR-01',
      performance: { slaOnTimeRate: 90, taskCompletionRate: 90, complianceScore: 95, meritXp: 18000, targetXp: 18000 },
    };
    const mgr: BhaktiOrgNode = {
      id: 'mgr-1',
      fullName: 'Manager One',
      tier: 'MANAGER',
      parentId: 'dir-1',
      seatCode: 'MD-01.DIR-01.MGR-01',
      performance: { slaOnTimeRate: 80, taskCompletionRate: 80, complianceScore: 80, meritXp: 8000, targetXp: 10000 },
    };
    const am1: BhaktiOrgNode = {
      id: 'am-1',
      fullName: 'Asst Mgr High',
      tier: 'ASSISTANT_MANAGER',
      parentId: 'mgr-1',
      seatCode: 'MD-01.DIR-01.MGR-01.AM-01',
      performance: { slaOnTimeRate: 100, taskCompletionRate: 100, complianceScore: 100, meritXp: 6000, targetXp: 6000 },
    };
    const am2: BhaktiOrgNode = {
      id: 'am-2',
      fullName: 'Asst Mgr Low',
      tier: 'ASSISTANT_MANAGER',
      parentId: 'mgr-1',
      seatCode: 'MD-01.DIR-01.MGR-01.AM-02',
      performance: { slaOnTimeRate: 40, taskCompletionRate: 40, complianceScore: 40, meritXp: 1000, targetXp: 6000 },
    };
    const sup: BhaktiOrgNode = {
      id: 'sup-1',
      fullName: 'Supervisor Top',
      tier: 'SUPERVISOR',
      parentId: 'am-1',
      seatCode: 'MD-01.DIR-01.MGR-01.AM-01.SUP-01',
      performance: { slaOnTimeRate: 95, taskCompletionRate: 95, complianceScore: 95, meritXp: 5000, targetXp: 5000 },
      consecutiveHighCycles: 2,
    };

    const nodes = [md, dir, mgr, am1, am2, sup];
    const byId = new Map(nodes.map(n => [n.id, n]));
    expect(resolveUpwardChain('sup-1', byId).map(n => n.id)).toEqual(['sup-1', 'am-1', 'mgr-1', 'dir-1', 'md-1']);

    expect(
      computeIndividualPerformanceScore({
        slaOnTimeRate: 100,
        taskCompletionRate: 100,
        complianceScore: 100,
        meritXp: 5000,
        targetXp: 5000,
      })
    ).toBe(100);
    expect(classifyPerformanceBand(95)).toBe('SOVEREIGN_ELITE');
    expect(classifyPerformanceBand(78)).toBe('HIGH_PERFORMER');
    expect(classifyPerformanceBand(62)).toBe('ON_TRACK');
    expect(classifyPerformanceBand(48)).toBe('WATCHLIST');
    expect(classifyPerformanceBand(30)).toBe('DEMOTION_RISK');

    const rollups = rollUpBottomToTop(nodes);
    const mgrMetrics = rollups.get('mgr-1')!;
    expect(mgrMetrics.totalSubtreeHeadcount).toBe(4);
    expect(mgrMetrics.effectiveScore).not.toBe(mgrMetrics.ownScore);
    expect(rollups.get('md-1')?.totalSubtreeHeadcount).toBe(6);

    const ranks = computeTierRankings(nodes, rollups);
    const am1Rank = ranks.find(r => r.nodeId === 'am-1')!;
    const am2Rank = ranks.find(r => r.nodeId === 'am-2')!;
    expect(am1Rank.tierRank).toBe(1);
    expect(am1Rank.percentile).toBe(100);
    expect(am2Rank.tierRank).toBe(2);
    expect(am2Rank.percentile).toBe(0);
  });

  it('evaluates promotions, waitlist caps, demotions, and MD apex protection', () => {
    const md: BhaktiOrgNode = {
      id: 'md-1',
      fullName: 'Arslan Malik',
      tier: 'MD',
      parentId: null,
      seatCode: 'MD-01',
      performance: { slaOnTimeRate: 20, taskCompletionRate: 20, complianceScore: 20, meritXp: 100 },
      consecutiveLowCycles: 5,
    };
    const sup: BhaktiOrgNode = {
      id: 'sup-1',
      fullName: 'Supervisor Ready',
      tier: 'SUPERVISOR',
      parentId: 'am-1',
      seatCode: 'MD-01.DIR-01.MGR-01.AM-01.SUP-01',
      performance: { slaOnTimeRate: 92, taskCompletionRate: 90, complianceScore: 95, meritXp: 6500, targetXp: 6500 },
      consecutiveHighCycles: 2,
    };
    const mgrLow: BhaktiOrgNode = {
      id: 'mgr-low',
      fullName: 'Manager Failing',
      tier: 'MANAGER',
      parentId: 'dir-1',
      seatCode: 'MD-01.DIR-01.MGR-02',
      performance: { slaOnTimeRate: 30, taskCompletionRate: 30, complianceScore: 30, meritXp: 500, targetXp: 10000 },
      consecutiveLowCycles: 2,
    };

    const rollups = rollUpBottomToTop([md, sup, mgrLow]);
    expect(evaluatePromotion(sup, rollups.get('sup-1')!, 11).action).toBe('PROMOTE');
    expect(evaluatePromotion(sup, rollups.get('sup-1')!, 12).action).toBe('WAITLISTED_NO_VACANCY');
    expect(evaluateDemotion(md, rollups.get('md-1')!).action).toBe('PROTECTED_APEX');
    expect(evaluateDemotion(mgrLow, rollups.get('mgr-low')!)).toMatchObject({
      action: 'DEMOTE',
      targetTier: 'ASSISTANT_MANAGER',
    });
  });

  it('supports manual CRUD for teams, leaders, and employees only under Supervisor seats', () => {
    const store = createManualTeamStore();
    expect(() =>
      createManualTeam(store, {
        supervisorSeatCode: 'MD-01.DIR-01.MGR-01.AM-01',
        teamCode: 'TEAM-ALPHA',
        teamName: 'Invalid Parent Team',
      })
    ).toThrow();

    const team = createManualTeam(store, {
      supervisorSeatCode: 'MD-01.DIR-01.MGR-01.AM-01.SUP-01',
      teamCode: 'TEAM-ALPHA',
      teamName: 'Dubai Marina Closers',
      maxMembers: 2,
    });
    expect(team.supervisorSeatCode).toBe('MD-01.DIR-01.MGR-01.AM-01.SUP-01');

    assignTeamLeader(store, 'TEAM-ALPHA', 'emp-leader-1');
    addEmployeeToTeam(store, 'TEAM-ALPHA', 'emp-1');
    addEmployeeToTeam(store, 'TEAM-ALPHA', 'emp-2');
    expect(() => addEmployeeToTeam(store, 'TEAM-ALPHA', 'emp-3')).toThrow();

    removeEmployeeFromTeam(store, 'TEAM-ALPHA', 'emp-1');
    updateManualTeam(store, 'TEAM-ALPHA', { teamName: 'Marina Prime Closers' });
    const listed = listTeamsBySupervisor(store, 'MD-01.DIR-01.MGR-01.AM-01.SUP-01');
    expect(listed).toHaveLength(1);
    expect(listed[0].teamName).toBe('Marina Prime Closers');
    expect(listed[0].teamLeaderId).toBe('emp-leader-1');
    expect(listed[0].employeeIds).toEqual(['emp-2']);

    expect(deleteManualTeam(store, 'TEAM-ALPHA')).toBe(true);
    expect(listTeamsBySupervisor(store, 'MD-01.DIR-01.MGR-01.AM-01.SUP-01')).toHaveLength(0);
  });

  it('verifies atomic decomposition of CANONICAL_108_DIVISIONS_MATRIX (<150 lines/leaf, barrels, config/data separation)', () => {
    const integrity = validateCanonical108MatrixIntegrity(CANONICAL_108_DIVISIONS_MATRIX);
    expect(integrity.valid).toBe(true);
    expect(integrity.errors).toEqual([]);
    expect(integrity.mdCount).toBe(1);
    expect(integrity.departmentCount).toBe(12);
    expect(integrity.subDepartmentCount).toBe(108);
    expect(integrity.divisionManagerCount).toBe(108);
    expect(integrity.assistantManagerCount).toBe(1296);
    expect(integrity.supervisorCount).toBe(11664);
    expect(integrity.fixedSeatsTotal).toBe(13081);

    expect(getDivisionDepartmentByCode('DEPT-04')?.directorAi).toBe('AI Aurora');
    expect(getDivisionDepartmentByCode('DEPT-12')?.divisions).toHaveLength(9);

    const atomicDir = path.resolve(process.cwd(), 'src', 'aegis-protocols', 'canonical-108-divisions-matrix');
    const barrelAudit = auditAtomicBarrelFolder(atomicDir);
    expect(barrelAudit.valid).toBe(true);
    expect(barrelAudit.missingBarrels).toEqual([]);
    expect(barrelAudit.incompleteTierFolders).toEqual([]);
    expect(barrelAudit.oversizedHardLimitFiles).toEqual([]);
    expect(barrelAudit.oversizedLeafTargetFiles).toEqual([]);
    expect(barrelAudit.maxLinesObserved).toBeLessThanOrEqual(150);
  });
});
