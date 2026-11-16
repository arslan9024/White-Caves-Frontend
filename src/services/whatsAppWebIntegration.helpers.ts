// @ts-nocheck
export const formatWhatsAppPhoneNumber = (number: string): string => {
  let cleaned = number.replace(/[\s\-\(\)]/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = '971' + cleaned.substring(1);
  }

  if (!cleaned.match(/^\d{1,3}/)) {
    throw new Error('Invalid phone number format');
  }

  return cleaned;
};

export const normalizeWhatsAppChat = (chat: any) => ({
  chatId: chat.id._serialized,
  name: chat.name,
  isGroup: chat.isGroup,
  unreadCount: typeof chat.getUnreadCount === 'function' ? chat.getUnreadCount() : (chat.unreadCount || 0),
  lastMessage: chat.lastMessage
    ? {
        text: chat.lastMessage.body,
        timestamp: chat.lastMessage.timestamp,
        from: chat.lastMessage.from,
      }
    : null,
  contact: chat.contact
    ? {
        name: chat.contact.name,
        pushname: chat.contact.pushname,
        number: chat.contact.number,
      }
    : null,
});

export const normalizeWhatsAppMessage = (msg: any) => ({
  id: msg.id._serialized,
  text: msg.body,
  timestamp: msg.timestamp,
  from: msg.from,
  isFromMe: msg.fromMe,
  hasMedia: msg.hasMedia,
  mediaType: msg.type,
});

