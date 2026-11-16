// @ts-nocheck
/**
 * NinaMaryIntelligenceHelpers
 * Question categorization, general fallback templates, and preference inference
 */

export const GENERAL_RESPONSES: Record<string, string> = {
  greeting: 'Hello! 👋 Welcome to White Caves Real Estate. How can I help you today? Are you looking for a property to buy, rent, or just gathering information?',
  viewing_request: 'I\'d be happy to help you schedule a viewing! 📅 Can you tell me which property you\'re interested in, or would you like me to help you find the perfect property first?',
  documentation: 'We have comprehensive documentation available for all our properties, including floor plans, legal documents, and more. Which property would you like information about?',
  complaint: 'We\'re sorry to hear you\'re experiencing an issue. Our team is here to help! Please let us know more details about your concern, and we\'ll resolve it promptly.',
  opt_out: 'Thank you for reaching out. We respect your preference. You\'ll be removed from our communications list.',
  thank_you: 'You\'re welcome! Feel free to reach out anytime if you need more information. We\'re here to help! 😊',
  urgency: 'I understand this is urgent! Let me connect you with an available agent right away who can assist you immediately.',
  default: 'Thank you for your message! Our team will get back to you shortly with the information you need.'
};

export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `AED ${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `AED ${(price / 1000).toFixed(0)}K`;
  }
  return `AED ${price}`;
};

export const isAboutPrice = (question: string): boolean => {
  const priceKeywords = ['price', 'cost', 'how much', 'expense', 'rate', 'per month', 'per year'];
  return priceKeywords.some(kw => question.toLowerCase().includes(kw));
};

export const isAboutSize = (question: string): boolean => {
  const sizeKeywords = ['size', 'area', 'sqft', 'square', 'bedroom', 'bathroom', 'big', 'large', 'space'];
  return sizeKeywords.some(kw => question.toLowerCase().includes(kw));
};

export const isAboutAvailability = (question: string): boolean => {
  const availKeywords = ['available', 'ready', 'occupied', 'when', 'vacant', 'free', 'open'];
  return availKeywords.some(kw => question.toLowerCase().includes(kw));
};

export const isAboutLocation = (question: string): boolean => {
  const locKeywords = ['where', 'location', 'area', 'community', 'neighborhood', 'address', 'region'];
  return locKeywords.some(kw => question.toLowerCase().includes(kw));
};

export const inferPreferencesFromConversation = (messages: any[], parsePriceFn?: (str: string) => number) => {
  const preferences: any = {};
  const conversationText = messages.map(m => m.text || '').join(' ').toLowerCase();

  const priceMatch = conversationText.match(/(\d+(?:\.\d+)?)\s*[mk](?:illions?)?/i);
  if (priceMatch && parsePriceFn) {
    const priceStr = priceMatch[1] + (conversationText.includes('m') ? 'M' : 'K');
    preferences.maxPrice = parsePriceFn(priceStr);
  }

  const roomMatch = conversationText.match(/(\d)[\s-]?br(?:edroom)?/i);
  if (roomMatch) {
    preferences.minRooms = parseInt(roomMatch[1]);
    preferences.maxRooms = parseInt(roomMatch[1]) + 1;
  }

  if (conversationText.includes('villa')) preferences.propertyType = 'villa';
  else if (conversationText.includes('apartment')) preferences.propertyType = 'apartment';
  else if (conversationText.includes('townhouse')) preferences.propertyType = 'townhouse';

  return preferences;
};

