import { authFetch } from '../../utils/authFetch';
import { ChatMessage } from './types';

/**
 * Sends a conversation to the AI assistant endpoint and retrieves reply.
 */
export const sendAiChatMessage = async (messages: ChatMessage[]): Promise<string> => {
  const res = await authFetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    throw new Error('API error');
  }
  const data = (await res.json()) as { reply: string };
  return data.reply;
};

/**
 * Formats and sanitizes a phone number.
 */
export const sanitizePhoneNumber = (
  rawPhone: string
): { phoneDigits: string; phoneNumber: string } => {
  const phoneDigits = rawPhone.replace(/[^\d]/g, '');
  const phoneNumber = `+${phoneDigits}`;
  return { phoneDigits, phoneNumber };
};

/**
 * Safely opens a WhatsApp conversation link.
 */
export const openWhatsAppChat = (
  phoneNumber: string,
  phoneDigits: string,
  msgText: string
): void => {
  if (typeof window === 'undefined') return;
  if (!/^\+\d{7,15}$/.test(phoneNumber)) return;
  const encodedMessage = encodeURIComponent(msgText);
  window.open(
    `https://wa.me/${phoneDigits}?text=${encodedMessage}`,
    '_blank',
    'noopener,noreferrer'
  );
};

/**
 * Safely opens an external application URL.
 */
export const openExternalApp = (url: string): void => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
