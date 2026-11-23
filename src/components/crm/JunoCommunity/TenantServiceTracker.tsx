import * as React from 'react';
import { junoCommunityStyles } from './styles';

export const TenantServiceTracker: React.FC = () => {
  return (
    <div style={junoCommunityStyles.paddedCard}>
      <h4
        style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Tenant Concierge & Service Desk Inquiries
      </h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #64748B)' }}>
        All tenant tickets are routed with automated Nadia WhatsApp notification updates.
      </p>
    </div>
  );
};
