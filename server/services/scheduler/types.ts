import type { ScheduledTask } from 'node-cron';

export type CronJobId =
  | 'lead-sla-escalation'
  | 'lead-rescore-daily'
  | 'permit-checks-daily'
  | 'rent-generation-monthly'
  | 'rent-reminders-daily'
  | 'lease-expiry-reminders-daily'
  | 'henry-expiry-reminders-daily'
  | 'sitemap-weekly-refresh';

export interface CronJobInfo {
  id: CronJobId;
  name: string;
  cronExpression: string;
  timezone: string;
  task: ScheduledTask | null;
  lastRunAt: string | null;
  lastStatus: 'success' | 'failed' | 'skipped' | null;
  lastError: string | null;
  lastDurationMs: number | null;
  runsCount: number;
}

export type CronJobHandler = () => Promise<Record<string, unknown>>;

export interface CronJobDefinition {
  id: CronJobId;
  name: string;
  runLabel: string;
  cronExpression: string;
  timezone: string;
  handler: CronJobHandler;
}
