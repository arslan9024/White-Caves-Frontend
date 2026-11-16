import { describe, it, expect } from 'vitest';
import AIIntelligencePage, {
  PageWrap,
  KpiCard,
  InsightTile,
} from './AIIntelligencePage';

describe('AIIntelligencePage exports', () => {
  it('exports component and styled primitives cleanly', () => {
    expect(AIIntelligencePage).toBeDefined();
    expect(PageWrap).toBeDefined();
    expect(KpiCard).toBeDefined();
    expect(InsightTile).toBeDefined();
  });
});

