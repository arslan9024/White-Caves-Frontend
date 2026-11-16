import { describe, it, expect } from 'vitest';
import WhatsAppWebIntegrationService, {
  formatWhatsAppPhoneNumber,
  normalizeWhatsAppChat,
  normalizeWhatsAppMessage,
} from './WhatsAppWebIntegration';

describe('WhatsAppWebIntegration', () => {
  it('instantiates service cleanly', () => {
    const service = new WhatsAppWebIntegrationService();
    expect(service).toBeDefined();
    expect(service.isReady).toBe(false);
  });

  it('formats UAE phone numbers correctly', () => {
    expect(formatWhatsAppPhoneNumber('0501234567')).toBe('971501234567');
    expect(formatWhatsAppPhoneNumber('971501234567')).toBe('971501234567');
  });

  it('normalizes chat and message objects correctly', () => {
    const rawChat = {
      id: { _serialized: '123@c.us' },
      name: 'Client A',
      isGroup: false,
      unreadCount: 2,
      lastMessage: { body: 'Hello', timestamp: 123456, from: '123@c.us' },
      contact: { name: 'Client A', pushname: 'Client', number: '971501234567' },
    };
    const normalized = normalizeWhatsAppChat(rawChat);
    expect(normalized.chatId).toBe('123@c.us');
    expect(normalized.name).toBe('Client A');

    const rawMsg = {
      id: { _serialized: 'msg-1' },
      body: 'Test',
      timestamp: 123456,
      from: '123@c.us',
      fromMe: false,
      hasMedia: false,
      type: 'chat',
    };
    const normalizedMsg = normalizeWhatsAppMessage(rawMsg);
    expect(normalizedMsg.id).toBe('msg-1');
    expect(normalizedMsg.text).toBe('Test');
  });
});

