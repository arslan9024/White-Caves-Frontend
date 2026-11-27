// FILE: src/components/crm/LindaWhatsAppCRM/LindaPoolTelemetryWidget.tsx
/**
 * Linda Pool Telemetry Widget
 * Fetches /api/linda/pool/telemetry and renders live WhatsApp pool metrics.
 * Auto-refreshes every 20 seconds.
 * Upgrade #4 — white-caves-frontend
 */
import React, { memo, useState, useEffect, useCallback } from 'react';

interface PoolTelemetry {
  activeAccounts?: number;
  totalCapacity?: number;
  sentToday?: number;
  queueDepth?: number;
  successRate?: string;
}

export const LindaPoolTelemetryWidget = memo(() => {
  const [data, setData] = useState<PoolTelemetry | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchTelemetry = useCallback(async () => {
    try {
      const res = await fetch('/api/linda/pool/telemetry');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json?.data ?? json ?? {});
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      setData({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();
    const id = setInterval(fetchTelemetry, 20_000);
    return () => clearInterval(id);
  }, [fetchTelemetry]);

  const metrics: { label: string; value: string; color: string }[] = [
    { label: 'Active Accounts', value: String(data?.activeAccounts ?? 5), color: '#25D366' },
    { label: 'Total Capacity', value: String(data?.totalCapacity ?? '5×45'), color: '#00B0FF' },
    { label: 'Sent Today', value: String(data?.sentToday ?? '—'), color: '#FFA500' },
    { label: 'Queue Depth', value: String(data?.queueDepth ?? 0), color: '#E040FB' },
    { label: 'Success Rate', value: data?.successRate ?? '—', color: '#69F0AE' },
  ];

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(37,211,102,0.2)',
        borderRadius: '12px',
        padding: '14px 18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <span style={{ color: '#25D366', fontWeight: 700, fontSize: '13px' }}>
          📡 Pool Telemetry
        </span>
        {loading && (
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Loading…</span>
        )}
        {lastUpdated && !loading && (
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>↻ {lastUpdated}</span>
        )}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '10px',
        }}
      >
        {metrics.map(m => (
          <div
            key={m.label}
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '8px',
              padding: '8px 10px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: m.color, fontSize: '18px', fontWeight: 800 }}>{m.value}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginTop: 2 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

LindaPoolTelemetryWidget.displayName = 'LindaPoolTelemetryWidget';
export default LindaPoolTelemetryWidget;
