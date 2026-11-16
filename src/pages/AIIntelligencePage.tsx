/**
 * AI Intelligence Hub — Phase 7
 * ────────────────────────────────
 * Connects to Redux analyticsSlice and dashboardSlice to display live
 * performance metrics, traffic stats, and Dubai market KPIs.
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchAnalytics } from '../store/analyticsSlice';
import { PermissionGuard } from '../components/guards/PermissionGuard';
import {
  PageWrap,
  Inner,
  PageHeader,
  PageTitle,
  PageSubtitle,
  SectionTitle,
  KpiGrid,
  KpiCard,
  KpiLabel,
  KpiValue,
  KpiChange,
  InsightGrid,
  InsightTile,
  TileIcon,
  TileTitle,
  TileBody,
  Badge,
  PerfBar,
  AccessDeniedBanner,
} from './AIIntelligencePage.styles';

export * from './AIIntelligencePage.styles';

// ─── Static Dubai market KPIs ─────────────────────────────────────────────────
const DUBAI_KPIS = [
  { label: 'Q1 2026 Transaction Volume', value: 'AED 252B', change: '+31%', up: true },
  { label: 'Avg. Villa Price/sqft', value: 'AED 2,140', change: '+14%', up: true },
  { label: 'Avg. Apartment Price/sqft', value: 'AED 1,820', change: '+8%', up: true },
  { label: 'Off-Plan Share', value: '62%', change: '+5pp', up: true },
  { label: 'Rental Yield (Dubai avg.)', value: '6.8%', change: '+0.4pp', up: true },
  { label: 'Active Listings', value: '87,400', change: '-3%', up: false },
];

export const AIIntelligencePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux analytics state
  const { traffic, performance, loading } = useSelector((s: RootState) => s.analytics);

  // Fetch analytics on mount (fire-and-forget — error handled inside slice)
  useEffect(() => {
    void dispatch(fetchAnalytics());
  }, [dispatch]);

  const perfScore = performance.score ?? 0;

  return (
    <PageWrap aria-labelledby="ai-hub-title">
      <Inner>
        <PageHeader>
          <PageTitle id="ai-hub-title">
            AI <span>Intelligence</span> Hub
          </PageTitle>
          <PageSubtitle>
            Live market analytics, performance telemetry, and Dubai real estate KPIs — all in one
            view.
          </PageSubtitle>
        </PageHeader>

        {/* ── Dubai Market KPIs ─────────────────────────────────────── */}
        <SectionTitle>Dubai Market Pulse — Q1 2026</SectionTitle>
        <KpiGrid>
          {DUBAI_KPIS.map(kpi => (
            <KpiCard key={kpi.label} aria-label={kpi.label}>
              <KpiLabel>{kpi.label}</KpiLabel>
              <KpiValue data-numeric="true">{kpi.value}</KpiValue>
              <KpiChange $up={kpi.up}>
                {kpi.up ? '▲' : '▼'} {kpi.change} YoY
              </KpiChange>
            </KpiCard>
          ))}
        </KpiGrid>

        {/* ── Platform Traffic (live from Redux) ───────────────────── */}
        <SectionTitle>Platform Performance — Live</SectionTitle>
        <KpiGrid>
          <KpiCard aria-label="Page views">
            <KpiLabel>Page Views</KpiLabel>
            <KpiValue data-numeric="true">
              {loading ? '—' : traffic.pageViews.toLocaleString()}
            </KpiValue>
          </KpiCard>
          <KpiCard aria-label="Unique visitors">
            <KpiLabel>Unique Visitors</KpiLabel>
            <KpiValue data-numeric="true">
              {loading ? '—' : traffic.uniqueVisitors.toLocaleString()}
            </KpiValue>
          </KpiCard>
          <KpiCard aria-label="Active users">
            <KpiLabel>Active Users</KpiLabel>
            <KpiValue data-numeric="true">
              {loading ? '—' : traffic.activeUsers.toLocaleString()}
            </KpiValue>
          </KpiCard>
          <KpiCard aria-label="Bounce rate">
            <KpiLabel>Bounce Rate</KpiLabel>
            <KpiValue data-numeric="true">
              {loading ? '—' : `${traffic.bounceRate.toFixed(1)}%`}
            </KpiValue>
          </KpiCard>
          <KpiCard aria-label="Performance score">
            <KpiLabel>Perf Score</KpiLabel>
            <KpiValue data-numeric="true">{loading ? '—' : `${perfScore}/100`}</KpiValue>
            <PerfBar
              $score={perfScore}
              role="progressbar"
              aria-valuenow={perfScore}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </KpiCard>
          <KpiCard aria-label="Avg session duration">
            <KpiLabel>Avg Session</KpiLabel>
            <KpiValue data-numeric="true">
              {loading ? '—' : `${traffic.avgSessionDuration}s`}
            </KpiValue>
          </KpiCard>
        </KpiGrid>

        {/* ── AI / ML Modules ───────────────────────────────────────── */}
        <SectionTitle>AI Modules</SectionTitle>
        <InsightGrid>
          <InsightTile aria-label="Lead scoring module">
            <TileIcon>🎯</TileIcon>
            <TileTitle>Lead Scoring Engine</TileTitle>
            <TileBody>
              Behavioral + source-based lead prioritization. Ranks inbound leads by conversion
              probability using interaction signals and Dubai market affinity scores.
            </TileBody>
            <Badge $status="beta">Beta</Badge>
          </InsightTile>

          <InsightTile aria-label="AVM property valuation">
            <TileIcon>🏠</TileIcon>
            <TileTitle>AVM — Automated Valuation</TileTitle>
            <TileBody>
              Comparable-sales model trained on DLD transaction data. Delivers price-per-sqft
              estimates with ±4% accuracy for 85% of Dubai postcodes.
            </TileBody>
            <Badge $status="beta">Beta</Badge>
          </InsightTile>

          <InsightTile aria-label="Property recommendations">
            <TileIcon>✨</TileIcon>
            <TileTitle>Property Recommendations</TileTitle>
            <TileBody>
              Buyer-intent collaborative filtering model. Cross-references saved searches, viewed
              properties, and budget signals to surface ranked matches.
            </TileBody>
            <Badge $status="coming-soon">Coming Soon</Badge>
          </InsightTile>

          <InsightTile aria-label="Market trend analysis">
            <TileIcon>📊</TileIcon>
            <TileTitle>Market Trend Analysis</TileTitle>
            <TileBody>
              District-level price trend reports updated weekly from DLD, RERA, and developer data
              feeds. Alerts agents on emerging hotspots.
            </TileBody>
            <Badge $status="live">Live</Badge>
          </InsightTile>

          <PermissionGuard require="view_all_reports">
            <InsightTile aria-label="Agent performance AI">
              <TileIcon>👤</TileIcon>
              <TileTitle>Agent Performance AI</TileTitle>
              <TileBody>
                Tracks conversion rates, follow-up speed, and deal velocity per agent. Flags at-risk
                deals and recommends optimal follow-up timing.
              </TileBody>
              <Badge $status="beta">Beta</Badge>
            </InsightTile>
          </PermissionGuard>

          <PermissionGuard require="view_all_reports">
            <InsightTile aria-label="WhatsApp sentiment analysis">
              <TileIcon>💬</TileIcon>
              <TileTitle>WhatsApp Sentiment</TileTitle>
              <TileBody>
                NLP pipeline on WhatsApp CRM conversations. Classifies lead intent as Hot / Warm /
                Cold and flags urgent responses needed.
              </TileBody>
              <Badge $status="coming-soon">Coming Soon</Badge>
            </InsightTile>
          </PermissionGuard>
        </InsightGrid>

        <AccessDeniedBanner role="note" aria-label="Data notice">
          Some modules require elevated access — contact your platform admin to enable full AI
          features.
        </AccessDeniedBanner>
      </Inner>
    </PageWrap>
  );
};

export default AIIntelligencePage;

