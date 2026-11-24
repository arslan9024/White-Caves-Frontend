import React, { FC } from 'react';

export interface CrossIntegrationPanelProps {
  /** Optional extra className for the root section element */
  className?: string;
}

export OrchestratorStatus {
  handlerCount: Record<string, number>;
  registeredAssistants: string[];
  totalEventsEmitted: number;
  ringBufferSize: number;
  uptime: number;
}

export OrchestratorLogEntry {
  id: string;
  event: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export AssistantConfig {
  id: string;
  name: string;
  role: string;
  metric: string;
  emoji: string;
  color: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export GOLD        = '#C9A84C';
export PANEL_BG    = '#111111';
export CARD_BG     = '#1a1a1a';
export CARD_BORDER = '#2c2c2c';
export DARK_ROW    = '#0d0d0d';
export TEXT_MAIN   = '#f0ece0';
export TEXT_MUTED  = '#888888';

export ASSISTANTS: AssistantConfig[] = [
  { id: 'linda', name: 'Linda',  role: 'WhatsApp Device',  metric: 'WA Broadcast',          emoji: '💬', color: '#22c55e' },
  { id: 'nadia', name: 'Nadia',  role: 'Meta Cloud API',   metric: 'Official WABA',          emoji: '📡', color: '#38bdf8' },
  { id: 'nina',  name: 'Nina',   role: 'NLP Engine',       metric: 'Intent Classification',  emoji: '🧠', color: '#a78bfa' },
  { id: 'mary',  name: 'Mary',   role: 'Inventory CRM',    metric: '9,378+ Units',           emoji: '🏠', color: '#fb923c' },
  { id: 'henry', name: 'Henry',  role: 'Document Hub',     metric: 'Compliance Engine',      emoji: '📄', color: '#f472b6' },
];

export TOPOLOGY: Array<{ from: string; to: string; label: string }> = [
  { from: 'Linda', to: 'Nina',  label: 'NLP route'          },
  { from: 'Nina',  to: 'Nadia', label: 'intent → response'  },
  { from: 'Nina',  to: 'Mary',  label: 'inventory search'   },
  { from: 'Mary',  to: 'Linda', label: 'status broadcast'   },
  { from: 'Nadia', to: 'Henry', label: 'compliance alert'   },
  { from: 'Henry', to: 'Nadia', label: 'document generated' },
];


export const STATE_COLOR: Record<'active' | 'idle' | 'unknown', string> = {
  active: '#22c55e',
  idle: '#eab308',
  unknown: '#6b7280',
};

export const eventColor = (eventName: string): string => {
  if (eventName.startsWith('linda')) return '#22c55e';
  if (eventName.startsWith('nadia')) return '#38bdf8';
  if (eventName.startsWith('nina')) return '#a78bfa';
  if (eventName.startsWith('mary')) return '#fb923c';
  if (eventName.startsWith('henry')) return '#f472b6';
  return GOLD;
};

export const CrossIntegrationEventsSection: FC<{ status: OrchestratorStatus | null; events: OrchestratorLogEntry[]; loading: boolean }> = ({ status, events, loading }) => (
  <>
      <div
        aria-label="Event topology map"
        style={{
          background:   DARK_ROW,
          border:       `1px solid ${CARD_BORDER}`,
          borderRadius: '10px',
          padding:      '16px 20px',
          marginBottom: '22px',
        }}
      >
        <div
          style={{ fontSize: '11px', color: GOLD, fontWeight: 700, marginBottom: '12px', letterSpacing: '0.8px' }}
        >
          EVENT TOPOLOGY
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TOPOLOGY.map(link => (
            <div
              key={`${link.from}-${link.to}`}
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '5px',
                padding:      '4px 10px',
                background:   '#1e1e1e',
                borderRadius: '6px',
                border:       `1px solid ${CARD_BORDER}`,
                fontSize:     '11px',
              }}
            >
              <span style={{ color: TEXT_MAIN, fontWeight: 600 }}>{link.from}</span>
              <span style={{ color: GOLD }} aria-hidden="true">→</span>
              <span style={{ color: TEXT_MAIN, fontWeight: 600 }}>{link.to}</span>
              <span style={{ color: TEXT_MUTED, fontSize: '10px' }}>({link.label})</span>
            </div>
          ))}
        </div>

        {status && (
          <div
            style={{ marginTop: '12px', fontSize: '11px', color: TEXT_MUTED, display: 'flex', gap: '18px', flexWrap: 'wrap' }}
          >
            <span>
              <span style={{ color: GOLD }}>{status.registeredAssistants.length}</span>/5 handlers active
            </span>
            <span>
              Buffer: <span style={{ color: GOLD }}>{status.ringBufferSize}</span>/50
            </span>
            <span>
              Total: <span style={{ color: GOLD }}>{status.totalEventsEmitted.toLocaleString()}</span> events
            </span>
          </div>
        )}
      </div>

      {/* ── Recent Cross-Events ──────────────────────────────────────────────── */}
      <div>
        <h3
          style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 700, color: GOLD, letterSpacing: '0.4px' }}
        >
          Recent Cross-Events
        </h3>

        {loading && (
          <p style={{ margin: 0, fontSize: '12px', color: TEXT_MUTED, fontStyle: 'italic' }}>
            Loading events…
          </p>
        )}

        {!loading && events.length === 0 && (
          <p style={{ margin: 0, fontSize: '12px', color: TEXT_MUTED }}>
            No events recorded yet. Use{' '}
            <code
              style={{ fontSize: '11px', background: 'var(--color-1e1e1e, #1e1e1e)', padding: '1px 5px', borderRadius: '3px', color: GOLD }}
            >
              POST /api/orchestrator/emit
            </code>{' '}
            to emit a test event.
          </p>
        )}

        {events.length > 0 && (
          <ul
            aria-label="Recent orchestrator events"
            style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            {events.map(ev => {
              const accentColor    = eventColor(ev.event);
              const payloadPreview = JSON.stringify(ev.payload)
                .replace(/["{}]/g, '')
                .slice(0, 90);

              return (
                <li
                  key={ev.id}
                  style={{
                    background:   DARK_ROW,
                    borderLeft:   `3px solid ${accentColor}`,
                    borderRadius: '0 8px 8px 0',
                    padding:      '10px 16px',
                    display:      'flex',
                    alignItems:   'center',
                    gap:          '14px',
                    flexWrap:     'wrap',
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'ui-monospace, "Cascadia Code", monospace',
                      fontSize:   '11px',
                      color:      accentColor,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {ev.event}
                  </code>

                  <span
                    style={{
                      fontSize:     '11px',
                      color:        '#ccc',
                      flex:         1,
                      minWidth:     0,
                      overflow:     'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace:   'nowrap',
                    }}
                  >
                    {payloadPreview}
                  </span>

                  <time
                    dateTime={ev.timestamp}
                    style={{ fontSize: '10px', color: TEXT_MUTED, whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {new Date(ev.timestamp).toLocaleTimeString()}
                  </time>
                </li>
              );
            })}
          </ul>
        )}
      </div>
  </>
);
