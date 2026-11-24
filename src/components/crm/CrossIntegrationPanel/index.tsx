/**
 * CrossIntegrationPanel
 *
 * Live status panel for all 5 AI assistants (Linda, Nadia, Nina, Mary, Henry)
 * and their cross-integration connections via the AssistantOrchestrator event bus.
 *
 * Design: Gold (#C9A84C) / Black / White luxury theme.
 * Polling: /api/orchestrator/status every 30 seconds.
 * Events: Last 5 from /api/orchestrator/events (newest first).
 * No external packages — inline styles only.
 */

import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
import {
  type CrossIntegrationPanelProps, type OrchestratorStatus, type OrchestratorLogEntry,
  GOLD, PANEL_BG, CARD_BG, CARD_BORDER, TEXT_MAIN, TEXT_MUTED,
  ASSISTANTS, STATE_COLOR, CrossIntegrationEventsSection,
} from './CrossIntegrationEventsSection';
export type { CrossIntegrationPanelProps };

export const CrossIntegrationPanel: FC<CrossIntegrationPanelProps> = ({ className }) => {
  const [status,      setStatus]      = useState<OrchestratorStatus | null>(null);
  const [events,      setEvents]      = useState<OrchestratorLogEntry[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [fetchError,  setFetchError]  = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      const [statusRes, eventsRes] = await Promise.all([
        fetch('/api/orchestrator/status'),
        fetch('/api/orchestrator/events?limit=5'),
      ]);

      if (statusRes.ok) {
        const body = (await statusRes.json()) as { success: boolean; data: OrchestratorStatus };
        if (body.success) setStatus(body.data);
      }

      if (eventsRes.ok) {
        const body = (await eventsRes.json()) as {
          success: boolean;
          data: { events: OrchestratorLogEntry[]; count: number };
        };
        if (body.success) {
          const sorted = [...body.data.events].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setEvents(sorted.slice(0, 5));
        }
      }

      setLastUpdated(new Date());
      setFetchError(null);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
    const interval = setInterval(() => void fetchData(), 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  /** Returns 'active' | 'idle' | 'unknown' for a given assistant ID */
  const getState = (id: string): 'active' | 'idle' | 'unknown' => {
    if (!status) return 'unknown';
    return status.registeredAssistants.includes(id) ? 'active' : 'idle';
  };

  return (
    <section
      className={className}
      aria-label="AI Assistant Cross-Integration Panel"
      style={{
        background:   PANEL_BG,
        border:       `1px solid ${CARD_BORDER}`,
        borderRadius: '14px',
        padding:      '28px',
        fontFamily:   "'Inter', 'Segoe UI', system-ui, sans-serif",
        color:        TEXT_MAIN,
        boxShadow:    '0 4px 24px rgba(0,0,0,0.45)',
      }}
    >

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          marginBottom:   '28px',
          gap:            '16px',
          flexWrap:       'wrap',
        }}
      >
        <div>
          <h2
            id="xip-heading"
            style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: GOLD, letterSpacing: '0.3px' }}
          >
            ⚡ AI Orchestrator — Cross-Integration
          </h2>
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: TEXT_MUTED }}>
            Live status of all 5 AI assistants · event bus health · recent cross-events
          </p>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          {loading && (
            <span style={{ fontSize: '12px', color: TEXT_MUTED, fontStyle: 'italic' }}>
              Connecting…
            </span>
          )}
          {!loading && fetchError && (
            <span role="alert" style={{ fontSize: '12px', color: 'var(--color-f87171, #f87171)' }}>
              ⚠ {fetchError}
            </span>
          )}
          {!loading && !fetchError && lastUpdated && (
            <>
              <div style={{ fontSize: '12px', color: TEXT_MUTED }}>
                Updated {lastUpdated.toLocaleTimeString()}
              </div>
              {status && (
                <div style={{ fontSize: '12px', color: GOLD, marginTop: '3px' }}>
                  {status.totalEventsEmitted.toLocaleString()} events · {status.uptime}s uptime
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* ── Assistant Nodes ─────────────────────────────────────────────────── */}
      <div
        role="list"
        aria-labelledby="xip-heading"
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
          gap:                 '12px',
          marginBottom:        '22px',
        }}
      >
        {ASSISTANTS.map(a => {
          const state    = getState(a.id);
          const dotColor = STATE_COLOR[state];
          const isActive = state === 'active';

          return (
            <article
              key={a.id}
              role="listitem"
              aria-label={`${a.name} — ${state}`}
              style={{
                background:   CARD_BG,
                border:       `1px solid ${isActive ? `${GOLD}44` : CARD_BORDER}`,
                borderRadius: '12px',
                padding:      '18px 16px',
                position:     'relative',
                transition:   'border-color 0.3s',
              }}
            >
              {/* Status dot */}
              <div
                aria-hidden="true"
                title={`Status: ${state}`}
                style={{
                  position:     'absolute',
                  top:          '12px',
                  right:        '12px',
                  width:        '10px',
                  height:       '10px',
                  borderRadius: '50%',
                  background:   dotColor,
                  boxShadow:    isActive ? `0 0 8px ${dotColor}88` : 'none',
                }}
              />

              <div style={{ fontSize: '26px', marginBottom: '10px', lineHeight: 1 }} aria-hidden="true">
                {a.emoji}
              </div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--white, #fff)', marginBottom: '2px' }}>
                {a.name}
              </div>
              <div style={{ fontSize: '11px', color: GOLD, marginBottom: '4px', fontWeight: 500 }}>
                {a.role}
              </div>
              <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: '10px' }}>
                {a.metric}
              </div>

              <div
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          '5px',
                  padding:      '3px 8px',
                  borderRadius: '999px',
                  background:   `${dotColor}22`,
                  border:       `1px solid ${dotColor}44`,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: dotColor }}
                />
                <span
                  style={{
                    fontSize:      '10px',
                    color:         dotColor,
                    fontWeight:    600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                  }}
                >
                  {state}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Topology Map ────────────────────────────────────────────────────── */}
      <CrossIntegrationEventsSection status={status} events={events} loading={loading} />
    </section>
  );
};

export default CrossIntegrationPanel;

