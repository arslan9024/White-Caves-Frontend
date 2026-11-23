import type { PortalAdapterMap } from './types';

export async function initializeAdapters(
  adapters: PortalAdapterMap,
  credentials: Record<string, any> = {}
): Promise<Record<string, { success: boolean; message: string }>> {
  const results: Record<string, { success: boolean; message: string }> = {};

  for (const [portalName, adapter] of Object.entries(adapters)) {
    try {
      if (credentials[portalName]) {
        await adapter.connect(credentials[portalName]);
        results[portalName] = { success: true, message: 'Connected' };
      } else {
        results[portalName] = { success: false, message: 'No credentials provided' };
      }
    } catch (error: any) {
      results[portalName] = { success: false, message: error?.message || 'Connection failed' };
    }
  }

  return results;
}

export async function fetchAllLeadsFromAdapters(
  adapters: PortalAdapterMap,
  filters: Record<string, any> = {}
): Promise<Record<string, any[]>> {
  const leadsByPortal: Record<string, any[]> = {};

  await Promise.allSettled(
    Object.entries(adapters).map(async ([portalName, adapter]) => {
      if (!adapter.isConnected) {
        return null;
      }

      try {
        const leads = adapter.getLeads ? await adapter.getLeads(filters) : [];
        leadsByPortal[portalName] = leads;
        return { portal: portalName, count: leads.length };
      } catch {
        return null;
      }
    })
  );

  return leadsByPortal;
}

export async function setupWebhooksForAdapters(
  adapters: PortalAdapterMap,
  webhookUrl: string
): Promise<Record<string, { success: boolean; webhookId?: string; error?: string }>> {
  const results: Record<string, { success: boolean; webhookId?: string; error?: string }> = {};

  for (const [portalName, adapter] of Object.entries(adapters)) {
    if (!adapter.isConnected) continue;

    try {
      const result = adapter.setupWebhook
        ? await adapter.setupWebhook(webhookUrl, [
            'property.created',
            'property.updated',
            'lead.created',
          ])
        : null;

      results[portalName] = { success: true, webhookId: result?.id };
    } catch (error: any) {
      results[portalName] = { success: false, error: error?.message || 'Webhook setup failed' };
    }
  }

  return results;
}
