import React from 'react';
import { headerBannerStyle, headerTopRowStyle, badgeStyle, bannerDescriptionStyle } from './nativeEngine.styles';

export const NativeEngineHeaderBanner: React.FC = () => {
  return (
    <div style={headerBannerStyle}>
      <div style={headerTopRowStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span style={{ fontSize: '2.2rem' }}>⚙️</span>
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--color-38bdf8, #38BDF8)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              whatsapp-web.js + Nina Native Hybrid Architecture
            </span>
            <h3
              style={{
                margin: '2px 0 0',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--white, #FFFFFF)',
              }}
            >
              Nina Independent Engine & whatsapp-web.js Control Panel
            </h3>
          </div>
        </div>
        <span style={badgeStyle}>200% Feature Suite Active</span>
      </div>

      <p style={bannerDescriptionStyle}>
        Nina AI integrates all core features of <strong>whatsapp-web.js v1.34.4</strong>{' '}
        (LocalAuth session persistence, QR code streams, PDF document sharing, location pins,
        VCards) with her own <strong>Native AI Property Matcher</strong> (9,210 DAMAC Hills 2
        properties) for complete independence and reliability!
      </p>
    </div>
  );
};
