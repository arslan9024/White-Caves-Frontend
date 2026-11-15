/**
 * Socket-driven toast notification formatter for leads & Linda pings (Point 48).
 */
export function formatSocketToast(event: 'inbound_lead' | 'linda_ping', sender: string) {
  const title = event === 'inbound_lead' ? 'New Inbound Lead' : 'Linda WhatsApp Ping';
  return { title, message: `${sender} requires attention`, severity: 'info' as const };
}
