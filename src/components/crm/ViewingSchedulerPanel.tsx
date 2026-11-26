import React, { FC, useState, useMemo, useCallback } from 'react';
import { CalendarDays, ClipboardList } from 'lucide-react';
import {
  RED,
  WHITE,
  BORDER,
  TEXT_MUTED,
  GREEN,
  type Viewing,
  SEED_VIEWINGS,
} from './viewingScheduler.data';
import { ViewingSchedulerBookingForm } from './ViewingSchedulerBookingForm';
import {
  TIME_SLOTS,
  AGENTS,
  STATUS_CONFIG,
  TODAY_STR,
  getDaysInWeek,
  formatIsoDate,
  type ViewingToast,
} from './viewingScheduler/viewingScheduler.constants';
import {
  ViewingSchedulerHeaderStats,
  ViewingSchedulerToastStack,
} from './viewingScheduler/ViewingSchedulerHeaderStats';
import { ViewingWeekCalendar } from './viewingScheduler/ViewingWeekCalendar';
import { ViewingDetailCard } from './viewingScheduler/ViewingDetailCard';
import { ViewingListTable } from './viewingScheduler/ViewingListTable';

export const ViewingSchedulerPanel: FC = () => {
  const [viewings, setViewings] = useState<Viewing[]>(SEED_VIEWINGS);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date(TODAY_STR));
  const [activeView, setActiveView] = useState<'week' | 'list' | 'new'>('week');
  const [selectedViewing, setSelectedViewing] = useState<Viewing | null>(null);
  const [filterAgent, setFilterAgent] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [toasts, setToasts] = useState<ViewingToast[]>([]);

  const showToast = useCallback((message: string, color = GREEN) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const [newViewing, setNewViewing] = useState({
    clientName: '',
    clientPhone: '',
    propertyTitle: '',
    agentName: AGENTS[0],
    date: formatIsoDate(new Date('2026-07-29')),
    timeSlot: '10:00',
    type: 'In-Person' as 'In-Person' | 'Virtual',
    notes: '',
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
      propertyId: 'prop-new',
      agentName: newViewing.agentName,
      date: newViewing.date,
      timeSlot: newViewing.timeSlot,
      status: 'Pending',
      type: newViewing.type,
      notes: newViewing.notes,
    };
    setViewings(prev => [v, ...prev]);
    setActiveView('week');
    setNewViewing({
      clientName: '',
      clientPhone: '',
      propertyTitle: '',
      agentName: AGENTS[0],
      date: formatIsoDate(new Date('2026-07-29')),
      timeSlot: '10:00',
      type: 'In-Person',
      notes: '',
    });
    showToast(
      `Viewing booked for ${v.clientName} on ${v.date} at ${v.timeSlot}. WhatsApp confirmation sent.`
    );
  };

  const handleStatusChange = (id: string, status: Viewing['status']) => {
    setViewings(prev => prev.map(v => (v.id === id ? { ...v, status } : v)));
    if (selectedViewing?.id === id) {
      setSelectedViewing(prev => (prev ? { ...prev, status } : null));
    }
  };

  const todayViewings = viewings.filter(v => v.date === TODAY_STR);
  const upcomingConfirmedCount = viewings.filter(
    v => v.date > TODAY_STR && v.status === 'Confirmed'
  ).length;
  const pendingCount = viewings.filter(v => v.status === 'Pending').length;
  const noShowCount = viewings.filter(v => v.status === 'No-Show').length;

  return (
    <div style={{ padding: '24px', background: WHITE, minHeight: '80vh' }}>
      <ViewingSchedulerHeaderStats
        todayCount={todayViewings.length}
        upcomingConfirmedCount={upcomingConfirmedCount}
        pendingCount={pendingCount}
        noShowCount={noShowCount}
        onBookNew={() => setActiveView('new')}
      />

      {/* View Switcher + Filters */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `2px solid ${BORDER}`,
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex' }}>
          {(['week', 'list'] as const).map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setActiveView(v)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                borderBottom: activeView === v ? `3px solid ${RED}` : '3px solid transparent',
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: activeView === v ? 700 : 500,
                color: activeView === v ? RED : TEXT_MUTED,
                fontSize: '0.9rem',
                marginBottom: '-2px',
              }}
            >
              {v === 'week' ? <CalendarDays size={15} /> : <ClipboardList size={15} />}
              <span>{v === 'week' ? 'Week View' : 'List View'}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '10px' }}>
          <select
            value={filterAgent}
            onChange={e => setFilterAgent(e.target.value)}
            style={{
              padding: '6px 10px',
              border: `1px solid ${BORDER}`,
              borderRadius: '6px',
              fontSize: '0.8rem',
            }}
          >
            <option value="ALL">All Agents</option>
            {AGENTS.map(a => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{
              padding: '6px 10px',
              border: `1px solid ${BORDER}`,
              borderRadius: '6px',
              fontSize: '0.8rem',
            }}
          >
            <option value="ALL">All Statuses</option>
            {Object.keys(STATUS_CONFIG).map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

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

      {activeView === 'week' && (
        <div>
          <ViewingWeekCalendar
            currentWeek={currentWeek}
            weekDays={weekDays}
            selectedViewing={selectedViewing}
            getViewingsForCell={getViewingsForCell}
            onChangeWeek={setCurrentWeek}
            onSelectViewing={setSelectedViewing}
          />
          {selectedViewing && (
            <ViewingDetailCard
              viewing={selectedViewing}
              onClose={() => setSelectedViewing(null)}
              onStatusChange={handleStatusChange}
              onNotify={showToast}
            />
          )}
        </div>
      )}

      {activeView === 'list' && (
        <ViewingListTable
          viewings={filtered}
          onInspectViewing={v => {
            setSelectedViewing(v);
            setActiveView('week');
          }}
        />
      )}

      <ViewingSchedulerToastStack toasts={toasts} />
    </div>
  );
};

export default ViewingSchedulerPanel;
