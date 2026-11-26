/**
 * MdDailySummaryLiveStrip.tsx — Managing Director Live Daily Summary Strip
 * Connects directly to GET /api/leasing-formula/cockpit/daily-summary with resilient fallback
 * and 1-click expansion into the interactive 12-Stage Tenancy Deal Cockpit.
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC, useEffect, useState } from 'react';
import {
  Radio,
  Building2,
  CalendarClock,
  FileSignature,
  FileDown,
  RefreshCw,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { TenancyDealCockpit } from '../../crm/DealManager/TenancyDealCockpit';
import { safeStorage } from '../../../utils/safeStorage';

export interface MdDailySummaryLiveStripProps {
  onNavigate?: (route: string) => void;
}

export interface DailySummaryDealItem {
  id: string;
  contractNumber: string;
  status: string;
  annualRentAed: number;
  stage: string;
  project: string;
  unitNumber: string;
}

export interface DailySummaryPayload {
  generatedAt: string;
  primaryMasterPhone: string;
  simFleet: {
    poolSize: number;
    hunterPoolSize: number;
    connectedCount: number;
    connectedHunterCount: number;
  };
  verifiedActiveListingsCount: number;
  upcomingViewingsCount: number;
  activeDealsCount: number;
  activeDeals: DailySummaryDealItem[];
  chequeAndRenewalAlertsCount: number;
}

function parseStageOrder(stage: string): number {
  const match = stage.match(/STAGE_(\d{2})/i);
  return match ? Math.min(12, Math.max(1, Number(match[1]))) : 7;
}

export const MdDailySummaryLiveStrip: FC<MdDailySummaryLiveStripProps> = ({ onNavigate }) => {
  const [summary, setSummary] = useState<DailySummaryPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<DailySummaryDealItem | null>(null);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const token = safeStorage.get('token');
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch('/api/leasing-formula/cockpit/daily-summary', {
        headers,
        credentials: 'include',
      });
      if (res.ok) {
        const json = (await res.json()) as { success?: boolean; data?: DailySummaryPayload };
        if (json?.success && json.data) {
          setSummary(json.data);
        }
      }
    } catch {
      // Offline / unit-test graceful fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSummary();
  }, []);

  const cards = [
    {
      label: '10-SIM Fleet Live',
      value: summary ? `${summary.simFleet.connectedCount}/${summary.simFleet.poolSize}` : '10/10',
      sub: summary
        ? `${summary.simFleet.connectedHunterCount}/9 Hunters Online`
        : 'Primary +971505760056',
      icon: <Radio size={16} color="#EF4444" />,
    },
    {
      label: 'DH2 Active Listings',
      value: summary ? String(summary.verifiedActiveListingsCount) : 'Live Vault',
      sub: 'Bayut / PF XML & Web Sync',
      icon: <Building2 size={16} color="#38BDF8" />,
    },
    {
      label: 'Upcoming Viewings',
      value: summary ? String(summary.upcomingViewingsCount) : '0',
      sub: 'MD Calendar + T-2h Alerts',
      icon: <CalendarClock size={16} color="#F59E0B" />,
    },
    {
      label: '12-Stage Deals',
      value: summary ? String(summary.activeDealsCount) : '0',
      sub: summary
        ? `${summary.chequeAndRenewalAlertsCount} PDC / 90d RERA Alerts`
        : 'Sequential Gates Active',
      icon: <FileSignature size={16} color="#10B981" />,
    },
  ];

  return (
    <section
      data-testid="md-daily-summary-strip"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#1E293B',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '18px',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 800,
              color: '#EF4444',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <ShieldCheck size={14} /> Live Daily Leasing Summary · SUP-05-2-01-1
          </div>
          <h3 style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
            Managing Director Sovereign Leasing Feed (
            {summary?.primaryMasterPhone ?? '+971505760056'})
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {onNavigate && (
            <button
              type="button"
              data-testid="md-open-full-leasing-cockpit"
              onClick={() => onNavigate('/dashboard/leasing-cockpit')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 11px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.16)',
                border: '1px solid rgba(239, 68, 68, 0.45)',
                color: '#FCA5A5',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <ExternalLink size={12} color="#EF4444" /> Full Leasing Cockpit
            </button>
          )}
          <a
            href="/api/leasing-formula/feeds/bayut-pf.xml"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 11px',
              borderRadius: '8px',
              background: '#0F172A',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={12} color="#EF4444" /> Portal XML
          </a>
          <button
            type="button"
            onClick={() => void fetchSummary()}
            disabled={loading}
            data-testid="md-refresh-daily-summary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#EF4444',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Sync Live
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '10px',
        }}
      >
        {cards.map(card => (
          <div
            key={card.label}
            style={{
              background: '#0F172A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '12px 14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                color: '#94A3B8',
                fontWeight: 700,
              }}
            >
              <span>{card.label}</span>
              {card.icon}
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
              {card.value}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {summary && summary.activeDeals.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#CBD5E1',
              textTransform: 'uppercase',
            }}
          >
            Active 12-Stage Deals (1-Click Cockpit &amp; 5% VAT Receipt)
          </div>
          {summary.activeDeals.slice(0, 4).map(deal => (
            <div
              key={deal.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '10px',
                background: '#0F172A',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                  {deal.project} Unit {deal.unitNumber} · {deal.contractNumber}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                  {deal.stage} · AED {Number(deal.annualRentAed || 0).toLocaleString()}/yr
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedDeal(prev => (prev?.id === deal.id ? null : deal))}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    background: 'rgba(239,68,68,0.16)',
                    border: '1px solid rgba(239,68,68,0.45)',
                    color: '#FCA5A5',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {selectedDeal?.id === deal.id ? 'Hide 12-Stage Cockpit' : 'Open 12-Stage Cockpit'}
                </button>
                <a
                  href={`/api/leasing-formula/tenancy-deals/${deal.id}/receipt-pdf`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    background: '#1E293B',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <FileDown size={12} /> Receipt PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDeal && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
          <TenancyDealCockpit
            dealId={selectedDeal.id}
            project={selectedDeal.project}
            unitNumber={selectedDeal.unitNumber}
            annualRentAed={selectedDeal.annualRentAed}
            currentStageOrder={parseStageOrder(selectedDeal.stage)}
          />
        </div>
      )}
    </section>
  );
};

export default MdDailySummaryLiveStrip;
