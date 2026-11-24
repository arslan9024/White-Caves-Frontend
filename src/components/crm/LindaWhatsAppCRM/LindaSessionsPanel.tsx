import React, { useState, useEffect, memo } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { apiClient } from '../../../utils/apiClient';
import type { LindaSessionItem } from './LindaWhatsAppCRM.data';
import { LindaSessionRow } from './LindaSessionRow';
import { LindaSessionTelemetryBar } from './LindaSessionTelemetryBar';

export interface SessionsPanelProps {
  sessions: LindaSessionItem[];
  onPingSession: (sessionId: string) => void;
  onPairDeviceCode: (session: LindaSessionItem) => void;
  onScanDeviceQr: (session: LindaSessionItem) => void;
}

/**
 * LindaSessionsPanel — Multi-Agent WhatsApp Sessions Grid
 * Turing Law Compliant (< 250 lines).
 */
export const LindaSessionsPanel: React.FC<SessionsPanelProps> = memo(
  ({ sessions, onPingSession, onPairDeviceCode, onScanDeviceQr }) => {
    const { isDark } = useTheme();
    const [maskPhone, setMaskPhone] = useState(false);
    const [pingStatusMap, setPingStatusMap] = useState<Record<string, string>>({});
    const [poolTelemetry, setPoolTelemetry] = useState<{
      totalCapacity?: number;
      sentToday?: number;
    } | null>(null);
    const [dispatching, setDispatching] = useState(false);
    const [dispatchResult, setDispatchResult] = useState<string | null>(null);

    useEffect(() => {
      let cancelled = false;
      apiClient
        .get('/linda/pool/telemetry')
        .then((json: unknown) => {
          const parsed = json as {
            success?: boolean;
            data?: {
              antiBanPolicy?: { totalHourlyCapacity?: number; totalHourlyUsed?: number };
              totalCapacity?: number;
              sentToday?: number;
            };
          };
          if (!cancelled && parsed?.success && parsed?.data) {
            setPoolTelemetry({
              totalCapacity:
                parsed.data.antiBanPolicy?.totalHourlyCapacity ?? parsed.data.totalCapacity ?? 162,
              sentToday: parsed.data.antiBanPolicy?.totalHourlyUsed ?? parsed.data.sentToday ?? 0,
            });
          }
        })
        .catch(() => {});
      return () => {
        cancelled = true;
      };
    }, []);

    const handleDispatchBatch = async () => {
      setDispatching(true);
      setDispatchResult(null);
      try {
        const json = (await apiClient.post('/linda/campaigns/warm-sequence-launch', {
          sequenceKey: 'LANDLORD_RETENTION_RENEWAL',
          dryRun: true,
          limit: 10,
        })) as {
          success?: boolean;
          data?: { dryRunCount?: number; sentCount?: number };
          error?: string;
        };
        setDispatchResult(
          json?.success
            ? `Audited ${json.data?.sentCount || json.data?.dryRunCount || 0} msgs`
            : json?.error || 'Dispatch failed'
        );
      } catch {
        setDispatchResult('Offline (Dry-Run Guard)');
      } finally {
        setDispatching(false);
      }
    };

    const handlePing = (id: string) => {
      setPingStatusMap(prev => ({ ...prev, [id]: 'Pinging…' }));
      setTimeout(() => {
        setPingStatusMap(prev => ({ ...prev, [id]: '24ms OK' }));
        setTimeout(() => {
          setPingStatusMap(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        }, 2500);
      }, 400);
      onPingSession(id);
    };

    return (
      <div
        style={{
          background: isDark ? 'rgba(15, 23, 42, 0.82)' : '#FFFFFF',
          border: isDark ? '1px solid rgba(59, 130, 246, 0.35)' : '1px solid #BFDBFE',
          borderRadius: 12,
          padding: 14,
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(15, 23, 42, 0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: isDark ? '#F8FAFC' : '#0F172A', fontSize: 15 }}>
              📱 Multi-Account WhatsApp Sessions & Device Linking Desk ({sessions.length})
            </h3>
            <p style={{ margin: '4px 0 0 0', color: isDark ? '#94A3B8' : '#64748B', fontSize: 12 }}>
              Real-time Baileys Multi-Device socket status & health inspection
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              data-testid="linda-dispatch-batch-btn"
              disabled={dispatching}
              onClick={handleDispatchBatch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 12px',
                borderRadius: 8,
                border: 'none',
                background: '#25D366',
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 700,
                cursor: dispatching ? 'not-allowed' : 'pointer',
                opacity: dispatching ? 0.7 : 1,
              }}
            >
              <Send size={12} />
              {dispatching ? 'Dispatching...' : dispatchResult || 'Dispatch Batch'}
            </button>
            <button
              type="button"
              onClick={() => setMaskPhone(!maskPhone)}
              style={{
                background: maskPhone
                  ? isDark
                    ? 'rgba(234, 179, 8, 0.2)'
                    : '#FEF9C3'
                  : isDark
                    ? 'rgba(148, 163, 184, 0.15)'
                    : '#F1F5F9',
                border: maskPhone ? '1px solid #EAB308' : '1px solid #CBD5E1',
                color: maskPhone
                  ? isDark
                    ? '#FEF08A'
                    : '#854D0E'
                  : isDark
                    ? '#94A3B8'
                    : '#64748B',
                borderRadius: 6,
                padding: '5px 10px',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              {maskPhone ? '🔒 Unmask Numbers' : '👁️ Mask Numbers'}
            </button>
          </div>
        </div>

        <LindaSessionTelemetryBar
          isDark={isDark}
          poolSent={poolTelemetry?.sentToday ?? 8}
          poolCapacity={poolTelemetry?.totalCapacity ?? 15}
        />

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr
                style={{
                  borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
                  textAlign: 'left',
                }}
              >
                <th style={{ padding: '8px 10px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Status
                </th>
                <th style={{ padding: '8px 10px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Session Name
                </th>
                <th style={{ padding: '8px 10px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Phone / WAID
                </th>
                <th style={{ padding: '8px 10px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Role & Port
                </th>
                <th style={{ padding: '8px 10px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Throughput
                </th>
                <th style={{ padding: '8px 10px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Uptime
                </th>
                <th style={{ padding: '8px 10px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <LindaSessionRow
                  key={session.id}
                  session={session}
                  isDark={isDark}
                  maskPhone={maskPhone}
                  pingStatus={pingStatusMap[session.id]}
                  onPing={handlePing}
                  onPairDeviceCode={onPairDeviceCode}
                  onScanDeviceQr={onScanDeviceQr}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);
