// @ts-nocheck
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import {
  formatWhatsAppPhoneNumber,
  normalizeWhatsAppChat,
  normalizeWhatsAppMessage,
} from './whatsAppWebIntegration.helpers';

export {
  formatWhatsAppPhoneNumber,
  normalizeWhatsAppChat,
  normalizeWhatsAppMessage,
};

class WhatsAppWebIntegrationService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.conversationCache = new Map();
    this.cacheExpiry = 60 * 60 * 1000;
    this.currentQRCode = null;
    this.qrCodeExpiryTime = null;
    this.eventHandlers = {
      onReady: null,
      onMessage: null,
      onDisconnected: null,
      onQR: null,
      onAuthFailure: null,
    };
    this.retryAttempts = 0;
    this.maxRetries = 3;
  }

  async initializeConnection() {
    try {
      if (this.client && this.isReady) {
        return this.isReady;
      }

      this.client = new Client({
        puppeteer: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          timeout: 30000,
        },
        authStrategy: new LocalAuth(),
      });

      this.client.on('qr', qr => {
        this.currentQRCode = qr;
        this.qrCodeExpiryTime = Date.now() + 45000;

        qrcode.generate(qr, { small: true });

        if (this.eventHandlers.onQR) {
          this.eventHandlers.onQR({
            qrCode: qr,
            timestamp: new Date(),
            expiresAt: new Date(this.qrCodeExpiryTime),
          });
        }
      });

      this.client.on('ready', () => {
        this.isReady = true;
        if (this.eventHandlers.onReady) {
          this.eventHandlers.onReady();
        }
      });

      this.client.on('message', message => {
        if (this.eventHandlers.onMessage) {
          this.eventHandlers.onMessage(message);
        }
      });

      this.client.on('disconnected', reason => {
        this.isReady = false;
        if (this.eventHandlers.onDisconnected) {
          this.eventHandlers.onDisconnected(reason);
        }
      });

      await this.client.initialize();
      return this.isReady;
    } catch (error) {
      throw new Error(`WhatsApp initialization failed: ${error.message}`);
    }
  }

  async getConversations(options = {}) {
    if (!this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    const { daysBack = 30, minMessages = 1, excludeGroups = true, limit = 100 } = options;

    const chats = await this.client.getChats();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);

    let filteredChats = chats.filter(chat => {
      if (excludeGroups && chat.isGroup) return false;
      if (chat.getUnreadCount() < minMessages && chat.archive) return false;
      return true;
    });

    filteredChats = filteredChats
      .sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || 0;
        const bTime = b.lastMessage?.timestamp || 0;
        return bTime - aTime;
      })
      .slice(0, limit);

    return filteredChats.map(normalizeWhatsAppChat);
  }

  async getConversationById(chatId, limit = 100) {
    const cached = this.conversationCache.get(chatId);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    if (!this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    const chat = await this.client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit });

    const conversationData = {
      chatId: chat.id._serialized,
      name: chat.name,
      isGroup: chat.isGroup,
      messages: messages.map(normalizeWhatsAppMessage),
      contact: chat.contact
        ? {
            name: chat.contact.name,
            number: chat.contact.number,
            pushname: chat.contact.pushname,
          }
        : null,
    };

    this.conversationCache.set(chatId, {
      data: conversationData,
      timestamp: Date.now(),
    });

    return conversationData;
  }

  async searchConversations(keywords, options = {}) {
    const { limit = 20, excludeGroups = true } = options;

    const conversations = await this.getConversations({
      limit: 200,
      excludeGroups,
    });

    const regex = new RegExp(keywords, 'gi');
    const results = [];

    for (const conversation of conversations) {
      if (results.length >= limit) break;

      const chatData = await this.getConversationById(conversation.chatId);
      let matchCount = 0;

      const matches = chatData.messages.filter(msg => {
        if (regex.test(msg.text)) {
          matchCount++;
          return true;
        }
        return false;
      });

      if (matches.length > 0) {
        results.push({
          ...conversation,
          relevanceScore: (matchCount / chatData.messages.length) * 100,
          matchedMessages: matches.length,
        });
      }
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  async sendMessage(number, messageText) {
    if (!this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    const formattedNumber = this.formatPhoneNumber(number);
    const chatId = `${formattedNumber}@c.us`;

    const sentMessage = await this.client.sendMessage(chatId, messageText);

    return {
      success: true,
      messageId: sentMessage.id._serialized,
      timestamp: sentMessage.timestamp,
      to: formattedNumber,
    };
  }

  formatPhoneNumber(number) {
    return formatWhatsAppPhoneNumber(number);
  }

  getStatus() {
    return {
      isReady: this.isReady,
      isConnected: this.client ? !this.client._disconnected : false,
      clientId: this.client?.info?.wid?._serialized || null,
      cacheSize: this.conversationCache.size,
    };
  }

  async disconnect() {
    if (this.client) {
      await this.client.destroy();
      this.client = null;
      this.isReady = false;
      this.conversationCache.clear();
    }
  }

  on(event, handler) {
    if (Object.prototype.hasOwnProperty.call(this.eventHandlers, event)) {
      this.eventHandlers[event] = handler;
    } else {
      throw new Error(`Unknown event: ${event}`);
    }
  }

  getCurrentQRCode() {
    if (!this.currentQRCode) {
      return null;
    }

    if (this.qrCodeExpiryTime && Date.now() > this.qrCodeExpiryTime) {
      this.currentQRCode = null;
      return null;
    }

    return {
      qrCode: this.currentQRCode,
      expiresAt: new Date(this.qrCodeExpiryTime),
      expiresIn: Math.round((this.qrCodeExpiryTime - Date.now()) / 1000),
    };
  }

  getAuthStatus() {
    return {
      isAuthenticated: this.isReady,
      isConnecting: this.client && !this.isReady,
      hasQRCode: this.currentQRCode !== null,
      qrExpiryTime: this.qrCodeExpiryTime,
    };
  }

  async retryConnection() {
    if (this.retryAttempts >= this.maxRetries) {
      throw new Error('Maximum connection attempts reached');
    }

    this.retryAttempts++;

    if (this.client) {
      await this.disconnect();
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    return this.initializeConnection();
  }

  clearCache() {
    this.conversationCache.clear();
  }
}

export default WhatsAppWebIntegrationService;
export { WhatsAppWebIntegrationService };
export const whatsappWebIntegration = new WhatsAppWebIntegrationService();

