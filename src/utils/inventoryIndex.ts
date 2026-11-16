/**
 * AEGIS V5.0 O(1) Inventory & Property Index
 * Replaces repeated O(n) Array.prototype.find / filter scans with O(1) Map lookups.
 */

export interface InventoryIndex<T> {
  byId: Map<string, T>;
  byGroup: Map<string, T[]>;
}

/**
 * Builds an O(1) Map index for items by primary key and optional secondary group key.
 */
export function buildInventoryIndex<T>(
  items: readonly T[],
  getId: (item: T) => string | number | undefined | null,
  getGroupKey?: (item: T) => string | number | undefined | null
): InventoryIndex<T> {
  const byId = new Map<string, T>();
  const byGroup = new Map<string, T[]>();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const rawId = getId(item);
    if (rawId !== undefined && rawId !== null && rawId !== '') {
      byId.set(String(rawId), item);
    }
    if (getGroupKey) {
      const rawGroup = getGroupKey(item);
      if (rawGroup !== undefined && rawGroup !== null && rawGroup !== '') {
        const groupKey = String(rawGroup);
        const bucket = byGroup.get(groupKey);
        if (bucket) {
          bucket.push(item);
        } else {
          byGroup.set(groupKey, [item]);
        }
      }
    }
  }

  return { byId, byGroup };
}

/**
 * O(1) lookup by primary key.
 */
export function getIndexedItem<T>(
  index: InventoryIndex<T>,
  id: string | number | undefined | null
): T | undefined {
  if (id === undefined || id === null || id === '') return undefined;
  return index.byId.get(String(id));
}

/**
 * O(1) lookup by group key (e.g., ownerId, projectId, area).
 */
export function getIndexedGroup<T>(
  index: InventoryIndex<T>,
  groupKey: string | number | undefined | null
): readonly T[] {
  if (groupKey === undefined || groupKey === null || groupKey === '') return [];
  return index.byGroup.get(String(groupKey)) ?? [];
}

