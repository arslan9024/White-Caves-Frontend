/**
 * NinaWhatsAppBotCRM — Styling Tokens & Layout Primitives
 * Standard: Mary Allen Wilkes Protocol (.styles.ts)
 * Single Purpose File Law: < 350 lines
 */

export const ninaStyles = {
  container: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    background: '#0B132B',
    color: '#F8FAFC',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  } as React.CSSProperties,

  headerCard: {
    background: '#1C2541',
    border: '1px solid #3A506B',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  } as React.CSSProperties,

  stagePill: (isActive: boolean, isConnected: boolean) =>
    ({
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: 700,
      fontSize: '0.875rem',
      cursor: isConnected || isActive ? 'pointer' : 'not-allowed',
      background: isActive ? '#06B6D4' : '#1C2541',
      color: isActive ? '#FFFFFF' : isConnected ? '#CBD5E1' : '#64748B',
      border: `1px solid ${isActive ? '#06B6D4' : '#3A506B'}`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
    }) as React.CSSProperties,

  statusBadge: (status: string) => {
    const isLive = status === 'LIVE_CONNECTED_STREAM';
    const isConnecting = status === 'ESTABLISHING_LINK_STREAM';
    return {
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 800,
      background: isLive
        ? 'rgba(16, 185, 129, 0.2)'
        : isConnecting
          ? 'rgba(245, 158, 11, 0.2)'
          : 'rgba(239, 68, 68, 0.2)',
      color: isLive ? '#10B981' : isConnecting ? '#F59E0B' : '#EF4444',
      border: `1px solid ${isLive ? '#10B981' : isConnecting ? '#F59E0B' : '#EF4444'}`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
    } as React.CSSProperties;
  },

  pairingCard: {
    background: '#1C2541',
    border: '1px solid #3A506B',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '540px',
    margin: '0 auto',
    textAlign: 'center',
  } as React.CSSProperties,

  codeDisplay: {
    fontFamily: 'monospace',
    fontSize: '1.75rem',
    fontWeight: 900,
    letterSpacing: '3px',
    color: '#06B6D4',
    background: '#0B132B',
    padding: '12px 24px',
    borderRadius: '12px',
    border: '2px dashed #06B6D4',
    display: 'inline-block',
    margin: '1.5rem 0',
  } as React.CSSProperties,
};

export default ninaStyles;

