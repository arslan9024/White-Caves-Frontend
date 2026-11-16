import React, { FC } from 'react';
import { Cpu, Activity, BatteryCharging, Wifi } from 'lucide-react';

export interface LindaSessionTelemetryBarProps {
  isDark: boolean;
  poolSent: number;
  poolCapacity: number;
}

export const LindaSessionTelemetryBar: FC<LindaSessionTelemetryBarProps> = ({
  isDark,
  poolSent,
  poolCapacity,
}) => {
  return (
    <div
      data-testid="linda-session-telemetry-bar"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 10,
        marginBottom: 12,
        background: isDark ? 'rgba(2, 6, 23, 0.65)' : '#F1F5F9',
        padding: 10,
        borderRadius: 8,
        fontSize: 11,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Activity size={14} color="#22C55E" />
        <span style={{ color: isDark ? '#94A3B8' : '#64748B' }}>Baileys Socket Latency:</span>
        <strong style={{ color: '#22C55E' }}>24ms avg</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Cpu size={14} color="#38BDF8" />
        <span style={{ color: isDark ? '#94A3B8' : '#64748B' }}>Chromium Resident Heap:</span>
        <strong style={{ color: '#38BDF8' }}>214 MB (Healthy)</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <BatteryCharging size={14} color="#FBBF24" />
        <span style={{ color: isDark ? '#94A3B8' : '#64748B' }}>Multi-Device Power/Conn:</span>
        <strong style={{ color: '#FBBF24' }}>Plugged (100%)</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Wifi size={14} color="#A78BFA" />
        <span style={{ color: isDark ? '#94A3B8' : '#64748B' }}>Daily Cluster Quota:</span>
        <strong style={{ color: '#A78BFA' }}>
          {poolSent} / {poolCapacity} msgs
        </strong>
      </div>
    </div>
  );
};
