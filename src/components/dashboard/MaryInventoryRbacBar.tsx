import React, { memo, useEffect, useState } from 'react';
import { Calendar, CheckCircle2, FolderTree, ShieldCheck, Smartphone } from 'lucide-react';
import { apiClient } from '../../utils/apiClient';

interface ScopedSummary {
  actorRole: string;
  scope: 'ALL_COMPANY_INVENTORY' | 'AGENT_DISCOVERED_ONLY';
  total: number;
}

interface CalendarStatus {
  accessible: boolean;
  calendarId?: string;
  serviceAccountEmail?: string;
  actionRequired?: string;
}

const TENANCY_CLOSING_STAGES = [
  '1. Hunter SIMs Outreach (9 SIMs)',
  '2. Mary Vault + Drive Formula',
  '3. MD Primary Master Call/Meet',
  '4. Live Price & Status Update',
  '5. Tenant Viewing (MD Calendar)',
  '6. Offer & Landlord Approval',
  '7. Cheques & Fees FIRST',
  '8. Tenant Signs FIRST',
  '9. Payment Clearance Gate',
  '10. Landlord Countersigns',
  '11. Ejari + DEWA PDF (Self/VIP)',
  '12. Active + 90d RERA Renewal',
];

export const MaryInventoryRbacBar = memo(() => {
  const [scoped, setScoped] = useState<ScopedSummary | null>(null);
  const [calStatus, setCalStatus] = useState<CalendarStatus | null>(null);
  const [showStages, setShowStages] = useState(false);

  useEffect(() => {
    void apiClient
      .get('/leasing-formula/inventory/scoped')
      .then((res: unknown) => {
        const d = (res as { data?: ScopedSummary })?.data;
        if (d) setScoped(d);
      })
      .catch(() => {});
  }, []);

  const checkCalendar = async () => {
    try {
      const res = (await apiClient.get('/leasing-formula/calendar/status')) as {
        data?: CalendarStatus;
      };
      if (res?.data) setCalStatus(res.data);
    } catch {
      setCalStatus({ accessible: false, actionRequired: 'Verify server :5001 is running.' });
    }
  };

  const isAllScope = !scoped || scoped.scope === 'ALL_COMPANY_INVENTORY';

  return (
    <section
      style={{
        background: '#0F172A',
        color: '#F8FAFC',
        border: '1px solid #1E293B',
        borderRadius: '12px',
        padding: '14px 18px',
        marginBottom: '16px',
      }}
      data-testid="mary-inventory-rbac-bar"
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: isAllScope ? 'rgba(239,68,68,0.16)' : 'rgba(56,189,248,0.16)',
              border: `1px solid ${isAllScope ? '#EF4444' : '#38BDF8'}`,
              color: isAllScope ? '#FCA5A5' : '#7DD3FC',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            <ShieldCheck size={13} />
            {isAllScope
              ? `MD / Manager Scope: ALL Company Inventory (${scoped?.total ?? 'Live'})`
              : `Agent Scope: My Discovered Inventory (${scoped?.total ?? 0})`}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              color: '#94A3B8',
            }}
          >
            <Smartphone size={12} color="#25D366" />
            10-SIM Policy: 9 Hunters (Discovery) → Primary Master (+971505760056) Follow-Up •
            8-Tier: MD Arslan Malik → Zoe → Dir Clara → Mgr Daisy → 12 AMs → 108 Sups → 1 TL → 10
            Agents
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => void checkCalendar()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: '#1E293B',
              border: '1px solid #334155',
              color: '#E2E8F0',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Calendar size={12} /> MD Calendar Check
          </button>
          <button
            type="button"
            onClick={() => setShowStages(v => !v)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: '#EF4444',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <FolderTree size={12} />{' '}
            {showStages ? 'Hide 12-Stage Formula' : '12-Stage Leasing Formula'}
          </button>
        </div>
      </div>

      {calStatus && (
        <div
          style={{
            marginTop: '10px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: calStatus.accessible ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
            border: `1px solid ${calStatus.accessible ? '#10B981' : '#F59E0B'}`,
            fontSize: '11px',
          }}
        >
          {calStatus.accessible
            ? `✓ MD Google Calendar Connected (${calStatus.calendarId}) via ${calStatus.serviceAccountEmail}`
            : `Calendar Share Needed: ${calStatus.actionRequired}`}
        </div>
      )}

      {showStages && (
        <div
          style={{
            marginTop: '12px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '6px',
          }}
        >
          {TENANCY_CLOSING_STAGES.map(stage => (
            <div
              key={stage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#1E293B',
                padding: '6px 9px',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#E2E8F0',
              }}
            >
              <CheckCircle2 size={12} color="#10B981" />
              <span>{stage}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

MaryInventoryRbacBar.displayName = 'MaryInventoryRbacBar';
export default MaryInventoryRbacBar;
