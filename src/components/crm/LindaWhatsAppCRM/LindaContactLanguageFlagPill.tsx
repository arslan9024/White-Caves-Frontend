import React, { memo } from 'react';

export const LindaContactLanguageFlagPill: React.FC<{ lang?: 'en' | 'ar' | 'ru' }> = memo(
  ({ lang = 'en' }) => {
    const flags = { en: '🇬🇧 English', ar: '🇦🇪 Arabic', ru: '🇷🇺 Russian' };
    return (
      <span
        style={{
          fontSize: '10px',
          background: 'rgba(255,255,255,0.05)',
          padding: '2px 6px',
          borderRadius: '4px',
          color: '#aaa',
        }}
      >
        {flags[lang] || flags.en}
      </span>
    );
  }
);
export default LindaContactLanguageFlagPill;
