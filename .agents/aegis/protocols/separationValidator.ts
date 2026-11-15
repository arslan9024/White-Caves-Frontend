/**
 * TURING-SEPARATION-010 validator: Actors (ERMS), Actions (TMS), Structure (DMS) (Point 95).
 */
export type DomainLayer = 'DMS' | 'ERMS' | 'TMS';

export function validateLayerSeparation(
  layer: DomainLayer,
  kind: 'department' | 'entity' | 'action'
): boolean {
  if (layer === 'DMS') return kind === 'department';
  if (layer === 'ERMS') return kind === 'entity';
  return kind === 'action';
}
