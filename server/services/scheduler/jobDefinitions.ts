import logger from '../../utils/logger.js';
import { batchRescoreLeads } from '../ai/leadScoringEngine.js';
import { runPermitAlertSchedulerTick } from '../compliance/permitAlertScheduler.js';
import { runPropertyPermitEnforcementTick } from '../compliance/propertyPermitEnforcementScheduler.js';
import { runLeadSlaEscalationTick } from '../leadWorkflowService.js';
import { runHenryExpiryReminders } from '../henry/expiryReminders.js';
import { generateMonthlyRentInvoices } from './rentInvoiceJob.js';
import { sendLeaseExpiryReminders, sendRentReminders } from './reminderJobs.js';
import type { CronJobDefinition } from './types.js';

export function getCronJobDefinitions(): CronJobDefinition[] {
  return [
    {
      id: 'lead-sla-escalation',
      name: 'Lead SLA Escalation',
      runLabel: 'Lead SLA Escalation',
      cronExpression: '0 * * * *',
      timezone: 'Asia/Dubai',
      handler: async () => runLeadSlaEscalationTick(),
    },
    {
      id: 'lead-rescore-daily',
      name: 'Daily Lead Re-score',
      runLabel: 'Daily Lead Re-score',
      cronExpression: '15 1 * * *',
      timezone: 'Asia/Dubai',
      handler: async () => {
        const result = await batchRescoreLeads();
        return {
          scored: result.scored,
          total: result.total,
          upgraded: result.upgraded,
          downgraded: result.downgraded,
          durationMs: result.duration,
        };
      },
    },
    {
      id: 'permit-checks-daily',
      name: 'Daily Permit Checks',
      runLabel: 'daily permit checks',
      cronExpression: '0 2 * * *',
      timezone: 'Asia/Dubai',
      handler: async () => {
        const [permitAlerts, permitEnforcement] = await Promise.all([
          runPermitAlertSchedulerTick(30),
          runPropertyPermitEnforcementTick(),
        ]);

        return {
          permitAlertsStatus: permitAlerts.status,
          permitAlertsSummary: permitAlerts.summary ?? null,
          permitEnforcementStatus: permitEnforcement.status,
          permitEnforcementSummary: permitEnforcement.summary ?? null,
        };
      },
    },
    {
      id: 'rent-generation-monthly',
      name: 'Monthly Rent Invoice Generation',
      runLabel: 'monthly rent invoice generation',
      cronExpression: '0 3 1 * *',
      timezone: 'Asia/Dubai',
      handler: () => generateMonthlyRentInvoices(),
    },
    {
      id: 'rent-reminders-daily',
      name: 'Daily Rent Payment Reminders',
      runLabel: 'daily rent payment reminders',
      cronExpression: '0 8 * * *',
      timezone: 'Asia/Dubai',
      handler: () => sendRentReminders(),
    },
    {
      id: 'lease-expiry-reminders-daily',
      name: 'Daily Lease Expiry Reminders',
      runLabel: 'daily lease expiry reminders',
      cronExpression: '0 9 * * *',
      timezone: 'Asia/Dubai',
      handler: () => sendLeaseExpiryReminders(),
    },
    {
      id: 'henry-expiry-reminders-daily',
      name: 'Henry Document Expiry Review',
      runLabel: 'Henry Document Expiry Review',
      cronExpression: '15 9 * * *',
      timezone: 'Asia/Dubai',
      handler: () => runHenryExpiryReminders(),
    },
    {
      id: 'sitemap-weekly-refresh',
      name: 'Weekly Sitemap Refresh',
      runLabel: 'weekly sitemap refresh',
      // Every Sunday at 02:00 Dubai time
      cronExpression: '0 2 * * 0',
      timezone: 'Asia/Dubai',
      handler: async () => {
        // Sitemap is generated dynamically per request; this job logs a refresh
        // audit event so monitoring can confirm the cycle is healthy.
        logger.info('[SchedulerService] sitemap weekly refresh tick — dynamic sitemap is live');
        return { status: 'refreshed', timestamp: new Date().toISOString() };
      },
    },
  ];
}
