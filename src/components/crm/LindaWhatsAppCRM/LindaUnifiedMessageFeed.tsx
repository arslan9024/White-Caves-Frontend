import React, { memo } from 'react';

interface FeedItem {
  id: string;
  sender: string;
  text: string;
  time: string;
  channel: string;
}

export const LindaUnifiedMessageFeed: React.FC<{ items?: FeedItem[] }> = memo(({ items }) => {
  const feeds = items || [
    {
      id: '1',
      sender: 'Khalid Al Mansoori',
      text: 'Confirmed viewing for V2 Villa.',
      time: '14:22',
      channel: 'WhatsApp Line 1',
    },
    {
      id: '2',
      sender: 'Elena Rostova',
      text: 'Please send latest price guide.',
      time: '14:20',
      channel: 'WhatsApp Line 2',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {feeds.map(f => (
        <div
          key={f.id}
          style={{
            padding: '6px 10px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '6px',
            fontSize: '11px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontWeight: 600, color: '#fff' }}>{f.sender}: </span>
            <span style={{ color: '#aaa' }}>{f.text}</span>
          </div>
          <span style={{ fontSize: '9px', color: '#666' }}>{f.time}</span>
        </div>
      ))}
    </div>
  );
});

export default LindaUnifiedMessageFeed;
