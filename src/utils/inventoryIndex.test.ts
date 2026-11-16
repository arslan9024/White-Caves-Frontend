import { describe, it, expect } from 'vitest';
import { buildInventoryIndex, getIndexedItem, getIndexedGroup } from './inventoryIndex';

interface MockUnit {
  id: string;
  ownerId: number;
  project: string;
}

describe('inventoryIndex (O(1) Map lookups)', () => {
  const units: MockUnit[] = [
    { id: 'U-101', ownerId: 1, project: 'Marina Gate' },
    { id: 'U-102', ownerId: 1, project: 'Marina Gate' },
    { id: 'U-201', ownerId: 2, project: 'Palm Jumeirah' },
  ];

  it('indexes and retrieves items by ID in O(1)', () => {
    const index = buildInventoryIndex(
      units,
      u => u.id,
      u => u.ownerId
    );
    expect(getIndexedItem(index, 'U-101')?.project).toBe('Marina Gate');
    expect(getIndexedItem(index, 'MISSING')).toBeUndefined();
    expect(getIndexedItem(index, null)).toBeUndefined();
  });

  it('indexes and retrieves grouped items by ownerId in O(1)', () => {
    const index = buildInventoryIndex(
      units,
      u => u.id,
      u => u.ownerId
    );
    expect(getIndexedGroup(index, 1)).toHaveLength(2);
    expect(getIndexedGroup(index, 2)).toHaveLength(1);
    expect(getIndexedGroup(index, 999)).toEqual([]);
  });
});

