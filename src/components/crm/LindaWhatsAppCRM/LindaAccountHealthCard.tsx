import React, { memo } from 'react';
import { Smartphone, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

interface Props {
  phone: string;
  name: string;
  role: string;
  uptimeHours: number;
  status: 'healthy' | 'warning' | 'critical';
  sentToday: number;
}

export const LindaAccountHealthCard: React.FC<Props> = memo(
  ({ phone, name, role, uptimeHours, status, sentToday }) => {
    const getBadge = () => {
      if (status === 'healthy') return <CheckCircle size={14} color="#25D366" />;
      if (status === 'warning') return <AlertTriangle size={14} color="#FFA500" />;
      return <ShieldAlert size={14} color="#FF5252" />;
    };

    return (
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Smartphone size={14} color="#aaa" /> {name}
          </span>
          {getBadge()}
        </div>
        <div style={{ fontSize: '11px', color: '#888' }}>
          {phone} • <span style={{ textTransform: 'uppercase', color: '#00B0FF' }}>{role}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '6px',
            fontSize: '11px',
            color: '#aaa',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '6px',
          }}
        >
          <span>Uptime: {uptimeHours}h</span>
          <span>Sent: {sentToday}/45</span>
        </div>
      </div>
    );
  }
);

export default LindaAccountHealthCard;
