/**
 * NinaWhatsAppBotCRM — Fallback / Access Denied Presentation
 * Standard: Mary Allen Wilkes Protocol (.fallback.tsx)
 * Single Purpose File Law: < 350 lines
 */

import React from 'react';

export interface NinaFallbackProps {
  reason?: 'ACCESS_DENIED' | 'GATEWAY_ERROR';
  errorMessage?: string;
  onRetry?: () => void;
}

export const NinaFallbackView: React.FC<NinaFallbackProps> = ({
  reason = 'ACCESS_DENIED',
  errorMessage,
  onRetry,
}) => {
  if (reason === 'ACCESS_DENIED') {
    return (
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#0f0f0f',
          border: '2px solid #EF4444',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)',
          margin: '2rem 0',
        }}
        data-testid="nina-access-denied"
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⛔</div>
        <span
          style={{
            background: 'var(--color-fef2f2, #FEF2F2)',
            color: 'var(--accent-red, #B91C1C)',
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 900,
            textTransform: 'uppercase',
          }}
        >
          Sovereign Security Policy Enforced
        </span>
        <h2
          style={{
            fontSize: '1.8rem',
            fontWeight: 900,
            margin: '1rem 0 0.5rem',
            color: 'var(--color-0f0f0f, #0f0f0f)',
          }}
        >
          Access Denied — Managing Director Sovereign Access Only
        </h2>
        <p
          style={{
            color: 'var(--text-secondary, #64748B)',
            fontSize: '0.95rem',
            maxWidth: '560px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}
        >
          Nina AI Assistant (
          <strong style={{ color: 'var(--color-d4af37, #D4AF37)' }}>Desk 3.2</strong>) and primary
          executive line <strong style={{ color: '#D4AF37' }}>+971 50 576 0056</strong> are strictly
          authorized for <strong>Managing Director (Arslan Malik)</strong> only. No other roles,
          employees, or freelancers may access this control center.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: '12px',
        background: '#1e293b',
        border: '1px solid #ef4444',
        color: '#f8fafc',
        textAlign: 'center',
      }}
      data-testid="nina-gateway-error"
    >
      <h3 style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        WhatsApp Gateway Stream Offline
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
        {errorMessage || 'Unable to establish connection to the local WhatsApp Web Auth instance.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            background: '#06b6d4',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Retry Connection
        </button>
      )}
    </div>
  );
};

export default NinaFallbackView;
