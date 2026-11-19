import React, { memo } from 'react';

export const LindaDirectImageMessageThumbnail: React.FC<{ caption?: string; src?: string }> = memo(
  ({ caption = 'Villa Layout', src }) => (
    <div
      style={{ borderRadius: '6px', overflow: 'hidden', background: '#111B21', maxWidth: '240px' }}
    >
      <div
        style={{
          height: '120px',
          background: '#334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94A3B8',
          fontSize: '11px',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={caption}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          '📸 Villa Photo'
        )}
      </div>
      {caption && (
        <div style={{ padding: '4px 8px', fontSize: '11px', color: '#E9EDEF' }}>{caption}</div>
      )}
    </div>
  )
);
export default LindaDirectImageMessageThumbnail;
