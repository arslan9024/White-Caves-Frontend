/**
 * Aṣṭottaraśata Siddhānta 4-Stage Execution Protocol (Point 87 / SIDDHĀNTA-003).
 */
export const SIDDHANTA_STAGES = [
  'Ajna-Grahana',
  'Adhikara-Pariksha',
  'Krama-Palana',
  'Nivedana',
] as const;

export function isValidSiddhantaStage(stage: string): boolean {
  return (SIDDHANTA_STAGES as readonly string[]).includes(stage);
}
