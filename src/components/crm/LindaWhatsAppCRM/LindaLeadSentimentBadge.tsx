import React, { memo } from 'react';

interface Props {
  sentiment: 'positive' | 'neutral' | 'urgent' | 'objection';
}

const CONFIG = {
  positive: { label: 'Interested', color: '#25D366', bg: 'rgba(37,211,102,0.1)' },
  neutral: { label: 'Inquiry', color: '#00B0FF', bg: 'rgba(0,176,255,0.1)' },
  urgent: { label: 'High Priority', color: '#E040FB', bg: 'rgba(224,64,251,0.1)' },
  objection: { label: 'Price Objection', color: '#FFA500', bg: 'rgba(255,165,0,0.1)' },
};

export const LindaLeadSentimentBadge: React.FC<Props> = memo(({ sentiment }) => {
  const item = CONFIG[sentiment] || CONFIG.neutral;

  return (
    <span
      style={{
        background: item.bg,
        color: item.color,
        border: `1px solid ${item.color}40`,
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '10px',
        fontWeight: 600,
      }}
    >
      {item.label}
    </span>
  );
});

export default LindaLeadSentimentBadge;
