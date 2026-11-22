import { createLogger } from '../../../utils/logger';
import type { ProgressMap } from './types';

const log = createLogger('ArgentinaGoalPage');

export const STORAGE_KEY = 'wc-argentina-goal-progress';

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch (err) {
    log.warn('Failed to load Argentina goal progress', err);
    return {};
  }
}

export function saveProgress(progress: ProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    log.warn('Failed to save Argentina goal progress', err);
  }
}
