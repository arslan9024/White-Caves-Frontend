import React from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { EchoClient, EchoTimelineItem, ChannelStat } from './EchoCRM.types';
import { CLIENTS, typeConfig } from './EchoCRM.data';

interface TimelineTabPanelProps {
  selectedClient: EchoClient;
  setSelectedClient: (client: EchoClient) => void;
  timeline: EchoTimelineItem[];
}

export const TimelineTabPanel: React.FC<TimelineTabPanelProps> = ({
  selectedClient,
  setSelectedClient,
  timeline,
}) => (
  <div className="tab-content">
    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
      {CLIENTS.map(c => (
        <button
          key={c.id}
          onClick={() => setSelectedClient(c)}
          style={{
            padding: '6px 14px',
            borderRadius: 20,
            border: `2px solid ${selectedClient.id === c.id ? '#06B6D4' : '#e5e7eb'}`,
            background: selectedClient.id === c.id ? '#e0f7fa' : '#fff',
            fontSize: 13,
            fontWeight: selectedClient.id === c.id ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          {c.name}
        </button>
      ))}
    </div>
    <div style={{ position: 'relative', paddingLeft: 24 }}>
      <div
        style={{
          position: 'absolute',
          left: 8,
          top: 0,
          bottom: 0,
          width: 2,
          background: '#e5e7eb',
        }}
      />
      {timeline.map(e => {
        const cfg = typeConfig[e.type];
        const Icon = cfg.icon;
        return (
          <div key={e.id} style={{ marginBottom: 20, position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: -24,
                top: 0,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: cfg.color,
                border: '2px solid #fff',
                boxShadow: '0 0 0 2px ' + cfg.color + '44',
              }}
            />
            <div
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                padding: '12px 14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: cfg.color,
                  }}
                >
                  <Icon size={12} /> {cfg.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary, #9ca3af)' }}>
                  {e.time}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 13 }}>{e.content}</p>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-secondary, #6b7280)',
                  marginTop: 6,
                }}
              >
                via {e.agent}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

interface ClientsTabPanelProps {
  search: string;
  setSearch: (s: string) => void;
  filteredClients: EchoClient[];
  onSelectClient: (client: EchoClient) => void;
}

export const ClientsTabPanel: React.FC<ClientsTabPanelProps> = ({
  search,
  setSearch,
  filteredClients,
  onSelectClient,
}) => (
  <div className="tab-content">
    <div className="tab-toolbar">
      <div className="search-box">
        <Search size={16} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search clients…"
        />
      </div>
    </div>
    <table className="data-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Last Contact</th>
          <th>Channel</th>
          <th>Interactions</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredClients.map(c => (
          <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => onSelectClient(c)}>
            <td>
              <strong>{c.name}</strong>
            </td>
            <td>{c.lastContact}</td>
            <td>
              <span className="status-badge">{c.channel}</span>
            </td>
            <td>{c.totalInteractions}</td>
            <td>
              <span
                className="status-badge"
                style={{
                  background: c.open ? '#f0fdf4' : '#f9fafb',
                  color: c.open ? '#16a34a' : '#6b7280',
                }}
              >
                {c.open ? 'Open' : 'Dormant'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface ChannelsTabPanelProps {
  channelStats: ChannelStat[];
}

export const ChannelsTabPanel: React.FC<ChannelsTabPanelProps> = ({ channelStats }) => (
  <div className="tab-content">
    <h3 style={{ marginBottom: 16 }}>Channel Breakdown</h3>
    {channelStats.map(ch => (
      <div
        key={ch.label}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 14,
          background: '#f9fafb',
          borderRadius: 10,
          padding: '12px 16px',
          border: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: ch.color + '22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MessageSquare size={16} color={ch.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{ch.label}</div>
          <div
            style={{
              height: 6,
              background: 'var(--color-e5e7eb, #e5e7eb)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(ch.count / 63) * 100}%`,
                height: '100%',
                background: ch.color,
                borderRadius: 4,
              }}
            />
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, color: ch.color }}>{ch.count}</div>
      </div>
    ))}
  </div>
);
