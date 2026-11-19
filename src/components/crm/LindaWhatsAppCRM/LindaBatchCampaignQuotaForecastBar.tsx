import React, { memo } from 'react';

export const LindaBatchCampaignQuotaForecastBar: React.FC<{
  projected?: number;
  maxQuota?: number;
}> = memo(({ projected = 185, maxQuota = 225 }) => {
  const pct = Math.min(100, Math.round((projected / maxQuota) * 100));
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '9px',
        color: '#aaa',
        width: '100%',
      }}
    >
      <span>Quota Forecast:</span>
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
          style={{ width: `${pct}%`, height: '100%', background: pct > 90 ? '#FFA500' : '#25D366' }}
        />
      </div>
      <span style={{ fontWeight: 600, color: '#fff' }}>
        {projected}/{maxQuota}
      </span>
    </div>
  );
});
export default LindaBatchCampaignQuotaForecastBar;
