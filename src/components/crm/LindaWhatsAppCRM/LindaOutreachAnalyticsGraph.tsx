import React, { memo } from 'react';

interface MetricItem {
  hour: string;
  count: number;
}

interface Props {
  data?: MetricItem[];
}

export const LindaOutreachAnalyticsGraph: React.FC<Props> = memo(({ data }) => {
  const defaultData: MetricItem[] = [
    { hour: '10:00', count: 12 },
    { hour: '12:00', count: 24 },
    { hour: '14:00', count: 18 },
    { hour: '16:00', count: 35 },
    { hour: '18:00', count: 22 },
  ];
  const items = data || defaultData;
  const max = Math.max(...items.map(d => d.count), 1);

  return (
    <div
      style={{
        padding: '12px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
        Hourly Outbound Distribution
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '8px' }}>
        {items.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: `${(d.count / max) * 45}px`,
                background: 'linear-gradient(180deg, #25D366, rgba(37,211,102,0.2))',
                borderRadius: '2px',
              }}
            />
            <span style={{ fontSize: '9px', color: '#aaa' }}>{d.hour}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default LindaOutreachAnalyticsGraph;
