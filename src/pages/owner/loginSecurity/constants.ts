import type { AttemptStatus } from './types';

export const STATUS_OPTIONS: { value: AttemptStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'failed', label: 'Failed logins' },
  { value: 'success', label: 'Successful logins' },
  { value: 'password', label: 'Password changes' },
];

export const SINCE_OPTIONS: { value: number; label: string }[] = [
  { value: 60, label: 'Last hour' },
  { value: 6 * 60, label: 'Last 6 hours' },
  { value: 24 * 60, label: 'Last 24 hours' },
  { value: 7 * 24 * 60, label: 'Last 7 days' },
];
