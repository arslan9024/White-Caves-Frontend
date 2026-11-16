import { describe, it, expect } from 'vitest';
import { parseCsvInWorker } from './runCsvWorker';

describe('parseCsvInWorker (Web Worker CSV offloading)', () => {
  it('parses CSV headers and rows accurately', async () => {
    const csv = 'unit,project,price\nU-101,Marina Gate,2500000\nU-102,Palm Jumeirah,4200000';
    const result = await parseCsvInWorker(csv);
    expect(result.headers).toEqual(['unit', 'project', 'price']);
    expect(result.rows).toHaveLength(2);
    expect(result.rows[0]).toEqual({
      unit: 'U-101',
      project: 'Marina Gate',
      price: '2500000',
    });
  });

  it('handles empty CSV input gracefully', async () => {
    const result = await parseCsvInWorker('');
    expect(result).toEqual({ headers: [], rows: [] });
  });
});

