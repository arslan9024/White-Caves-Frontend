import cron from 'node-cron';
import logger from '../utils/logger.js';
import { logCronEvent } from './scheduler/cronAudit.js';
import { getCronJobDefinitions } from './scheduler/jobDefinitions.js';
import type { CronJobHandler, CronJobId, CronJobInfo } from './scheduler/types.js';

export type { CronJobId, CronJobInfo };

export class SchedulerService {
  private jobs = new Map<CronJobId, CronJobInfo>();

  private started = false;

  isStarted(): boolean {
    return this.started;
  }

  getJob(id: CronJobId): CronJobInfo | undefined {
    return this.jobs.get(id);
  }

  start(): void {
    if (this.started) {
      logger.warn('[SchedulerService] already started');
      return;
    }

    for (const def of getCronJobDefinitions()) {
      this.scheduleTask(
        def.id,
        def.name,
        def.cronExpression,
        def.timezone,
        def.handler,
        def.runLabel
      );
    }

    this.started = true;
    logger.info(
      `[SchedulerService] started — ${this.jobs.size} jobs registered with node-cron engine`
    );
  }

  stop(): void {
    for (const [id, job] of this.jobs.entries()) {
      if (job.task) {
        try {
          job.task.stop();
          if (typeof job.task.destroy === 'function') {
            job.task.destroy();
          }
        } catch (err) {
          logger.warn(`[SchedulerService] error stopping task ${id}`, {
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }
    this.jobs.clear();
    this.started = false;
    logger.info('[SchedulerService] stopped — all cron jobs canceled');
  }

  getStatus(): Array<Omit<CronJobInfo, 'task'>> {
    return Array.from(this.jobs.values()).map(({ task, ...status }) => status);
  }

  private scheduleTask(
    id: CronJobId,
    name: string,
    cronExpression: string,
    timezone: string,
    handler: CronJobHandler,
    runLabel: string = name
  ): void {
    const task = cron.schedule(
      cronExpression,
      async () => {
        await this.runJob(id, runLabel, handler);
      },
      { timezone }
    );

    this.jobs.set(id, {
      id,
      name,
      cronExpression,
      timezone,
      task,
      lastRunAt: null,
      lastStatus: null,
      lastError: null,
      lastDurationMs: null,
      runsCount: 0,
    });
  }

  private async runJob(jobId: CronJobId, jobName: string, handler: CronJobHandler) {
    const runStartedAt = new Date();
    const job = this.jobs.get(jobId);

    if (!job) {
      logger.error('[SchedulerService] attempted to run unknown job', { jobId });
      return;
    }

    try {
      const summary = await handler();
      job.lastRunAt = runStartedAt.toISOString();
      job.lastStatus = 'success';

      await logCronEvent('cron_job_success', `Cron job "${jobName}" completed`, {
        jobId,
        jobName,
        runStartedAt: runStartedAt.toISOString(),
        summary,
      });
    } catch (error) {
      job.lastRunAt = runStartedAt.toISOString();
      job.lastStatus = 'failed';
      const message = error instanceof Error ? error.message : 'Unknown scheduler error';

      logger.error('[SchedulerService] cron job failed', { jobId, jobName, error: message });
      await logCronEvent('cron_job_failed', `Cron job "${jobName}" failed`, {
        jobId,
        jobName,
        runStartedAt: runStartedAt.toISOString(),
        error: message,
      });
    }
  }
}

export const schedulerService = new SchedulerService();
