import React, { FC, useState, useMemo, useCallback } from 'react';

import {
  RED, WHITE, SLATE, BORDER, CARD_BG, TEXT_MUTED, GREEN, ORANGE, BLUE, PURPLE,
  ViewingStatus, ViewingType, Viewing, SEED_VIEWINGS
} from './viewingScheduler.data';

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
const AGENTS = ['Nadia Yusuf', 'Clara Osei', 'Sophia Lin', 'Mark Johnson', 'Laila Hassan'];

import { ViewingSchedulerBookingForm } from './ViewingSchedulerBookingForm';
const statusConfig = {
  Confirmed: { bg: '#DEF7EC', color: GREEN, icon: '✅' },
  Pending: { bg: '#FFFBEB', color: ORANGE, icon: '⏳' },
  Completed: { bg: '#EFF6FF', color: BLUE, icon: '🏁' },
  Cancelled: { bg: '#FEF2F2', color: RED, icon: '❌' },
  'No-Show': { bg: '#FEF2F2', color: RED, icon: '🚫' },
};

function getDaysInWeek(baseDate: Date): Date[] {
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - baseDate.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

interface Toast { id: number; message: string; color: string; }

export const ViewingSchedulerPanel: FC = () => {
  const [viewings, setViewings] = useState<Viewing[]>(SEED_VIEWINGS);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date('2026-07-28'));
  const [activeView, setActiveView] = useState<'week' | 'list' | 'new'>('week');
  const [selectedViewing, setSelectedViewing] = useState<Viewing | null>(null);
  const [filterAgent, setFilterAgent] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, color = GREEN) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  // New viewing form state
  const [newViewing, setNewViewing] = useState({
    clientName: '', clientPhone: '', propertyTitle: '', agentName: AGENTS[0],
    date: fmt(new Date('2026-07-29')), timeSlot: '10:00', type: 'In-Person' as 'In-Person' | 'Virtual', notes: '',
  });

  const weekDays = useMemo(() => getDaysInWeek(currentWeek), [currentWeek]);

  const filtered = viewings.filter(v => {
    const matchAgent = filterAgent === 'ALL' || v.agentName === filterAgent;
    const matchStatus = filterStatus === 'ALL' || v.status === filterStatus;
    return matchAgent && matchStatus;
  });

  const getViewingsForCell = (date: string, slot: string) =>
    filtered.filter(v => v.date === date && v.timeSlot === slot);

  const handleAddViewing = () => {
    if (!newViewing.clientName || !newViewing.propertyTitle) return;
    const v: Viewing = {
      id: `VW-${String(viewings.length + 1).padStart(3, '0')}`,
      clientName: newViewing.clientName,
      clientPhone: newViewing.clientPhone,
      propertyTitle: newViewing.propertyTitle,
      propertyId: `prop-new`,
      agentName: newViewing.agentName,
      date: newViewing.date,
      timeSlot: newViewing.timeSlot,
      status: 'Pending',
      type: newViewing.type,
      notes: newViewing.notes,
    };
    setViewings(prev => [v, ...prev]);
    setActiveView('week');
    setNewViewing({ clientName: '', clientPhone: '', propertyTitle: '', agentName: AGENTS[0], date: fmt(new Date('2026-07-29')), timeSlot: '10:00', type: 'In-Person', notes: '' });
    showToast(`✅ Viewing booked for ${v.clientName} on ${v.date} at ${v.timeSlot}. WhatsApp confirmation sent.`);
  };

  const handleStatusChange = (id: string, status: Viewing['status']) => {
    setViewings(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    if (selectedViewing?.id === id) setSelectedViewing(prev => prev ? { ...prev, status } : null);
  };

  const todayStr = '2026-07-28';
  const todayViewings = viewings.filter(v => v.date === todayStr);
  const upcomingViewings = viewings.filter(v => v.date > todayStr && v.status !== 'Cancelled');
  const noShows = viewings.filter(v => v.status === 'No-Show').length;

  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const SLOT_SUBSET = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  return (
    <div style={{ padding: '24px', background: WHITE, minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: SLATE }}>📅 Viewing Scheduler</h2>
          <p style={{ margin: '6px 0 0 0', color: TEXT_MUTED, fontSize: '0.875rem' }}>
            Calendar-based property viewing management · Auto WhatsApp reminders · Agent assignment
          </p>
        </div>
        <button onClick={() => setActiveView('new')}
          style={{ background: RED, color: WHITE, border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem' }}>
          + Book Viewing
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: "Today's Viewings", value: todayViewings.length, color: RED },
          { label: 'Upcoming Confirmed', value: upcomingViewings.filter(v => v.status === 'Confirmed').length, color: GREEN },
          { label: 'Pending Approval', value: viewings.filter(v => v.status === 'Pending').length, color: ORANGE },
          { label: 'No-Shows (tracked)', value: noShows, color: TEXT_MUTED },
        ].map(s => (
          <div key={s.label} style={{ background: CARD_BG, padding: '14px', borderRadius: '8px', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: '0.72rem', color: TEXT_MUTED, textTransform: 'uppercase', fontWeight: 700 }}>{s.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color, marginTop: '4px' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* View Switcher + Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${BORDER}`, marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex' }}>
          {(['week', 'list'] as const).map(v => (
            <button key={v} onClick={() => setActiveView(v)}
              style={{ background: 'none', border: 'none', borderBottom: activeView === v ? `3px solid ${RED}` : '3px solid transparent', padding: '10px 20px', cursor: 'pointer', fontWeight: activeView === v ? 700 : 500, color: activeView === v ? RED : TEXT_MUTED, fontSize: '0.9rem', marginBottom: '-2px' }}>
              {v === 'week' ? '📆 Week View' : '📋 List View'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '10px' }}>
          <select value={filterAgent} onChange={e => setFilterAgent(e.target.value)}
            style={{ padding: '6px 10px', border: `1px solid ${BORDER}`, borderRadius: '6px', fontSize: '0.8rem' }}>
            <option value="ALL">All Agents</option>
            {AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
      {/* NEW VIEWING FORM */}
      {activeView === 'new' && (
        <ViewingSchedulerBookingForm
          newViewing={newViewing}
          setNewViewing={setNewViewing}
          setActiveView={setActiveView}
          handleAddViewing={handleAddViewing}
          AGENTS={AGENTS}
          TIME_SLOTS={TIME_SLOTS}
        />
      )}
            <button onClick={() => { const d = new Date(currentWeek); d.setDate(d.getDate() - 7); setCurrentWeek(d); }}
              style={{ padding: '6px 12px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: WHITE, cursor: 'pointer', fontWeight: 700 }}>‹ Prev</button>
            <span style={{ fontWeight: 700, color: SLATE, fontSize: '0.95rem' }}>
              {weekDays[0].toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} — {weekDays[6].toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <button onClick={() => { const d = new Date(currentWeek); d.setDate(d.getDate() + 7); setCurrentWeek(d); }}
              style={{ padding: '6px 12px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: WHITE, cursor: 'pointer', fontWeight: 700 }}>Next ›</button>
            <button onClick={() => setCurrentWeek(new Date('2026-07-28'))}
              style={{ padding: '6px 12px', border: `1px solid ${RED}`, borderRadius: '6px', background: '#FEF2F2', color: RED, cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>Today</button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: SLATE }}>
                  <th style={{ padding: '10px', color: WHITE, textAlign: 'left', fontSize: '0.8rem', width: '60px' }}>TIME</th>
                  {weekDays.map((d, i) => {
                    const isToday = fmt(d) === todayStr;
                    return (
                      <th key={i} style={{ padding: '10px', color: isToday ? '#FCA5A5' : WHITE, textAlign: 'center', fontSize: '0.8rem', background: isToday ? '#7F1D1D' : SLATE }}>
                        <div style={{ fontWeight: 700 }}>{DAY_LABELS[i]}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {SLOT_SUBSET.map(slot => (
                  <tr key={slot} style={{ borderBottom: '1px solid var(--text-secondary, #E2E8F0)' }}>
                    <td style={{ padding: '8px 10px', fontSize: '0.75rem', color: TEXT_MUTED, fontWeight: 700, background: CARD_BG, borderRight: '1px solid var(--text-secondary, #E2E8F0)' }}>{slot}</td>
                    {weekDays.map((d, i) => {
                      const dayStr = fmt(d);
                      const cells = getViewingsForCell(dayStr, slot);
                      const isToday = dayStr === todayStr;
                      return (
                        <td key={i} style={{ padding: '4px', verticalAlign: 'top', minHeight: '50px', background: isToday ? '#FFFBEB' : WHITE, borderRight: '1px solid #E2E8F0' }}>
                          {cells.map(v => {
                            const sc = statusConfig[v.status];
                            return (
                              <div key={v.id} onClick={() => setSelectedViewing(v === selectedViewing ? null : v)}
                                style={{ background: sc.bg, border: `1px solid ${sc.color}40`, borderLeft: `3px solid ${sc.color}`, padding: '4px 7px', borderRadius: '6px', fontSize: '0.68rem', marginBottom: '3px', cursor: 'pointer' }}>
                                <div style={{ fontWeight: 700, color: SLATE, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.clientName}</div>
                                <div style={{ color: sc.color, fontWeight: 600 }}>{v.type === 'Virtual' ? '🖥 ' : '🏠 '}{v.agentName.split(' ')[0]}</div>
                              </div>
                            );
                          })}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Viewing Detail */}
          {selectedViewing && (
            <div style={{ marginTop: '20px', background: CARD_BG, padding: '20px', borderRadius: '12px', border: `2px solid ${statusConfig[selectedViewing.status].color}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, color: SLATE, fontSize: '1rem' }}>Viewing Detail — {selectedViewing.id}</h3>
                  <button onClick={() => setSelectedViewing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: TEXT_MUTED }}>✕</button>
                </div>
                {[
                  { label: 'Client', value: selectedViewing.clientName },
                  { label: 'Phone', value: selectedViewing.clientPhone },
                  { label: 'Property', value: selectedViewing.propertyTitle },
                  { label: 'Agent', value: selectedViewing.agentName },
                  { label: 'Date & Time', value: `${selectedViewing.date} at ${selectedViewing.timeSlot}` },
                  { label: 'Type', value: selectedViewing.type },
                  { label: 'Status', value: `${statusConfig[selectedViewing.status].icon} ${selectedViewing.status}` },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--text-secondary, #E2E8F0)', padding: '7px 0', fontSize: '0.82rem' }}>
                    <span style={{ color: TEXT_MUTED, fontWeight: 600 }}>{row.label}</span>
                    <span style={{ fontWeight: 700, color: SLATE }}>{row.value}</span>
                  </div>
                ))}
                {selectedViewing.notes && (
                  <div style={{ marginTop: '10px', background: WHITE, padding: '10px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #E2E8F0' }}>
                    <strong>Notes:</strong> {selectedViewing.notes}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: SLATE, marginBottom: '10px' }}>Update Status</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                  {(Object.keys(statusConfig) as Viewing['status'][]).map(s => (
                    <button key={s} onClick={() => handleStatusChange(selectedViewing.id, s)}
                      style={{ padding: '8px', background: selectedViewing.status === s ? statusConfig[s].color : WHITE, color: selectedViewing.status === s ? WHITE : SLATE, border: `1px solid ${statusConfig[s].color}`, borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem' }}>
                      {statusConfig[s].icon} {s}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => showToast(`💬 WhatsApp reminder sent to ${selectedViewing.clientPhone}`, GREEN)}
                    style={{ padding: '9px', background: GREEN, color: WHITE, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
                    💬 Send WhatsApp Reminder
                  </button>
                  <button onClick={() => showToast(`📋 Lead conversion initiated for viewing ${selectedViewing.id}`, BLUE)}
                    style={{ padding: '9px', background: BLUE, color: WHITE, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
                    📋 Convert to Offer / Lead
                  </button>
                  <button onClick={() => showToast(`📄 Generating PDF confirmation for ${selectedViewing.clientName}...`, SLATE)}
                    style={{ padding: '9px', background: SLATE, color: WHITE, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
                    📄 Export Viewing Confirmation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* LIST VIEW */}
      {activeView === 'list' && (
        <div style={{ background: WHITE, borderRadius: '10px', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: SLATE, color: WHITE }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>CLIENT</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>PROPERTY</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>AGENT</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>DATE & TIME</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>TYPE</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>STATUS</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.sort((a, b) => a.date < b.date ? 1 : -1).map((v, idx) => {
                const sc = statusConfig[v.status];
                return (
                  <tr key={v.id} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? WHITE : CARD_BG }}>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700 }}>{v.clientName}</div>
                      <div style={{ fontSize: '0.72rem', color: TEXT_MUTED }}>{v.clientPhone}</div>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: '0.82rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.propertyTitle}</td>
                    <td style={{ padding: '10px 14px', color: TEXT_MUTED }}>{v.agentName}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.78rem' }}>{v.date} {v.timeSlot}</td>
                    <td style={{ padding: '10px 14px' }}>{v.type === 'Virtual' ? '🖥 Virtual' : '🏠 In-Person'}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ background: sc.bg, color: sc.color, padding: '2px 8px', borderRadius: '10px', fontWeight: 700, fontSize: '0.72rem' }}>
                        {sc.icon} {v.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <button onClick={() => { setSelectedViewing(v); setActiveView('week'); }}
                        style={{ background: 'var(--color-e2e8f0, #E2E8F0)', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600 }}>
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* ── Toast Notification Stack ── */}
      {toasts.length > 0 && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
          {toasts.map(t => (
            <div key={t.id} style={{ background: t.color, color: WHITE, padding: '12px 18px', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem', boxShadow: '0 4px 20px rgba(0,0,0,0.18)', maxWidth: '360px', animation: 'slideInRight 0.3s ease-out' }}>
              {t.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewingSchedulerPanel;

