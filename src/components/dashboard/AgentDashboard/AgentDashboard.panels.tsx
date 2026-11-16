/**
 * Agent Dashboard — Panels Layer (Mary Allen Wilkes Architecture)
 * Metric KPI cards, Lead Funnel, Activity Charts, and Top Leads Table
 */

import React from 'react';
import { Users, TrendingUp, CheckCircle2, Clock, Phone, MessageSquare } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { AgentMetrics, DailyActivityItem, TopLeadItem } from './AgentDashboard.types';

export const AgentMetricsOverview: React.FC<{ metrics: AgentMetrics }> = ({ metrics }) => (
  <div
    className="agent-metrics-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1.25rem',
    }}
  >
    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>TOTAL LEADS</span>
        <Users size={18} color="#3B82F6" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E293B', marginTop: '6px' }}>
        {metrics.totalLeads}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>
        +{metrics.weeklyAchieved} this week
      </div>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>HOT PIPELINE</span>
        <TrendingUp size={18} color="#EF4444" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#DC2626', marginTop: '6px' }}>
        {metrics.hotLeads}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
        Score &gt; 90+ Priority
      </div>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
          CONVERSION RATE
        </span>
        <CheckCircle2 size={18} color="#10B981" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16A34A', marginTop: '6px' }}>
        {metrics.conversionRate}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
        Target: 25% (+3%)
      </div>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>AVG RESPONSE</span>
        <Clock size={18} color="#8B5CF6" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7C3AED', marginTop: '6px' }}>
        {metrics.avgResponseTime}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>Under 15m SLA</div>
    </div>
  </div>
);

export const DailyActivityChart: React.FC<{ data: DailyActivityItem[] }> = ({ data }) => (
  <div
    style={{
      background: '#FFFFFF',
      padding: '1.25rem',
      borderRadius: '10px',
      border: '1px solid #E2E8F0',
      marginBottom: '1.25rem',
    }}
  >
    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 800, color: '#1E293B' }}>
      Weekly Outreach & Activities
    </h3>
    <div style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="day" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Legend />
          <Bar dataKey="calls" fill="#3B82F6" name="Phone Calls" radius={[4, 4, 0, 0]} />
          <Bar dataKey="messages" fill="#10B981" name="WhatsApp Messages" radius={[4, 4, 0, 0]} />
          <Bar dataKey="meetings" fill="#F59E0B" name="Client Viewings" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const TopLeadsTable: React.FC<{ leads: TopLeadItem[] }> = ({ leads }) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: '10px',
      border: '1px solid #E2E8F0',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid #E2E8F0',
        fontWeight: 800,
        fontSize: '0.95rem',
        color: '#1E293B',
      }}
    >
      Top Priority Pipeline Leads
    </div>
    <table
      style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}
    >
      <thead>
        <tr
          style={{
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            color: '#475569',
            fontWeight: 800,
          }}
        >
          <th style={{ padding: '10px 14px' }}>Client</th>
          <th style={{ padding: '10px 14px' }}>Property Target</th>
          <th style={{ padding: '10px 14px' }}>Budget</th>
          <th style={{ padding: '10px 14px' }}>Lead Score</th>
          <th style={{ padding: '10px 14px' }}>Last Touch</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1E293B' }}>{lead.name}</td>
            <td style={{ padding: '10px 14px', color: '#475569' }}>{lead.property}</td>
            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0F766E' }}>
              {lead.budget}
            </td>
            <td style={{ padding: '10px 14px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: lead.score >= 90 ? '#FEE2E2' : '#FEF3C7',
                  color: lead.score >= 90 ? '#991B1B' : '#92400E',
                }}
              >
                {lead.score} / 100
              </span>
            </td>
            <td style={{ padding: '10px 14px', color: '#64748B', fontSize: '0.78rem' }}>
              {lead.lastContact}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

