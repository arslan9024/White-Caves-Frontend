import React, { memo } from 'react';

interface AccountQuota {
  phone: string;
  used: number;
  limit: number;
}

interface Props {
  quotas?: AccountQuota[];
}

export const LindaMultiAccountQuotaTracker: React.FC<Props> = memo(({ quotas }) => {
  const defaultQuotas: AccountQuota[] = [
    { phone: '+971505760056', used: 28, limit: 45 },
    { phone: '+971503869886', used: 14, limit: 45 },
    { phone: '+971505110636', used: 33, limit: 45 },
    { phone: '+971589969886', used: 9, limit: 45 },
    { phone: '+971553633595', used: 41, limit: 45 },
  ];
  const list = quotas || defaultQuotas;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '10px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '8px',
      }}
    >
      <div style={{ fontSize: '11px', color: '#888', fontWeight: 600 }}>
        5-Line Daily WhatsApp Quotas
      </div>
      {list.map(q => {
        const pct = Math.min(100, Math.round((q.used / q.limit) * 100));
        return (
          <div
            key={q.phone}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px' }}
          >
            <span style={{ width: '85px', color: '#ccc' }}>{q.phone.slice(-4)}</span>
            <div
              style={{
                flex: 1,
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: pct > 80 ? '#FF5252' : '#25D366',
                }}
              />
            </div>
            <span style={{ width: '45px', textAlign: 'right', color: '#888' }}>
              {q.used}/{q.limit}
            </span>
          </div>
        );
      })}
    </div>
  );
});

export default LindaMultiAccountQuotaTracker;
