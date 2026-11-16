/**
 * Data Import Wizard — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

export interface WizardStepInfo {
  number: number;
  label: string;
  icon: string;
}

export const WIZARD_STEPS: WizardStepInfo[] = [
  { number: 1, label: 'Upload', icon: '📤' },
  { number: 2, label: 'Preview', icon: '👀' },
  { number: 3, label: 'Mapping', icon: '🔗' },
  { number: 4, label: 'Validation', icon: '✅' },
  { number: 5, label: 'Review', icon: '📋' },
  { number: 6, label: 'Execute', icon: '▶️' },
];

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface DuplicateRecord {
  id?: string;
  row?: number;
  reason?: string;
}

export type ImportStrategy = 'strict' | 'balanced' | 'lenient';
export type DeduplicationStrategy = 'keep' | 'overwrite' | 'merge';

