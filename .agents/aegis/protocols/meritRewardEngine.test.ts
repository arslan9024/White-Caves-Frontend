import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { awardStatutoryGateXp, STATUTORY_GATE_XP } from './meritRewardEngine.ts';

describe('meritRewardEngine', () => {
  it('awards +500 XP for statutory gate completion', () => {
    const award = awardStatutoryGateXp(
      'agent-007',
      'EJARI_REGISTERED',
      new Date('2026-11-15T00:00:00Z')
    );
    assert.equal(award.xpAwarded, STATUTORY_GATE_XP);
    assert.equal(award.xpAwarded, 500);
    assert.equal(award.gate, 'EJARI_REGISTERED');
    assert.equal(award.awardedAtIso, '2026-11-15T00:00:00.000Z');
  });

  it('rejects empty staffId', () => {
    assert.throws(() => awardStatutoryGateXp('   ', 'DLD_DEED_VERIFIED'));
  });
});
