import type { PortalAdapterMap, PortalAdapterInstance } from './types';

export interface SetupAutoAggregationParams {
  getCurrentInterval: () => any;
  setCurrentInterval: (timer: any) => void;
  syncInterval: number;
  aggregateLeads: () => Promise<any>;
  interval?: number;
}

export function startAutoAggregationScheduler(params: SetupAutoAggregationParams): void {
  const { getCurrentInterval, setCurrentInterval, syncInterval, aggregateLeads, interval } = params;
  const current = getCurrentInterval();
  if (current) {
    clearInterval(current);
  }

  const activeInterval = interval || syncInterval;
  const timer = setInterval(() => {
    aggregateLeads().catch(() => {});
  }, activeInterval);

  setCurrentInterval(timer);
  aggregateLeads();
}

export function stopAutoAggregationScheduler(
  getCurrentInterval: () => any,
  setCurrentInterval: (timer: any) => void
): void {
  const current = getCurrentInterval();
  if (current) {
    clearInterval(current);
    setCurrentInterval(null);
  }
}

export async function processWebhookPayload(
  adapters: PortalAdapterMap,
  portalName: string,
  payload: any,
  onLeadReceived: () => Promise<any>
): Promise<any> {
  const adapter = adapters[portalName.toLowerCase()] || null;
  if (!adapter) {
    throw new Error(`Unknown portal: ${portalName}`);
  }

  const result = adapter.handleWebhookPayload ? await adapter.handleWebhookPayload(payload) : null;
  if (result && result.type === 'lead') {
    await onLeadReceived();
  }

  return result;
}
