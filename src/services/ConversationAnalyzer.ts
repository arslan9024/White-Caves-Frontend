// @ts-nocheck
/**
 * ConversationAnalyzer Service
 * Analyzes WhatsApp conversations for property opportunities
 * Extracts entities, calculates confidence scores, and identifies property owners
 */

import { CONVERSATION_KEYWORDS, CONFIDENCE_WEIGHTS } from './conversationAnalyzer/keywords.data';
import {
  extractSizeFromText,
  extractPriceFromText,
  extractNamedEntities,
  buildAutoReply,
  buildQuickReplies,
} from './conversationAnalyzer/extractors';

class ConversationAnalyzer {
  constructor() {
    this.keywords = CONVERSATION_KEYWORDS;
    this.confidenceWeights = CONFIDENCE_WEIGHTS;
  }

  analyzeConversation(messages) {
    if (!Array.isArray(messages) || messages.length === 0) {
      return { properties: [], overallConfidence: 0, reasoning: 'No messages provided' };
    }

    const analysis = {
      properties: [],
      overallConfidence: 0,
      ownerIdentification: null,
      extractedEntities: [],
      reasoning: '',
    };

    let currentProperty = null;
    const confidenceComponents = {
      propertyTypeMentioned: false,
      availabilityMentioned: false,
      locationMentioned: false,
      sizeOrRoomsMentioned: false,
      priceMentioned: false,
      ownerIdentified: false,
      furnishingMentioned: false,
      featuresCount: 0,
    };

    const fullConversation = messages.map(m => m.content || m.text).join(' ').toLowerCase();

    for (const [type, keywords] of Object.entries(this.keywords.propertyTypes)) {
      if (this.hasKeywords(fullConversation, keywords)) {
        currentProperty = { type, confidence: 0, extractedData: {} };
        confidenceComponents.propertyTypeMentioned = true;
        break;
      }
    }

    if (!currentProperty) {
      return {
        properties: [],
        overallConfidence: 0,
        reasoning: 'No property type keywords detected',
      };
    }

    let availabilityType = null;
    if (this.hasKeywords(fullConversation, this.keywords.availability.forRent)) {
      availabilityType = 'for_rent';
      confidenceComponents.availabilityMentioned = true;
    }
    if (this.hasKeywords(fullConversation, this.keywords.availability.forSale)) {
      availabilityType = availabilityType ? 'for_both' : 'for_sale';
      confidenceComponents.availabilityMentioned = true;
    }

    if (availabilityType) {
      currentProperty.extractedData.availability = availabilityType;
    }

    const location = this.extractLocation(fullConversation);
    if (location) {
      currentProperty.extractedData.location = location;
      confidenceComponents.locationMentioned = true;
    }

    const sizeData = this.extractSize(fullConversation);
    if (sizeData) {
      currentProperty.extractedData.size = sizeData;
      confidenceComponents.sizeOrRoomsMentioned = true;
    }

    const priceData = this.extractPrice(fullConversation);
    if (priceData) {
      currentProperty.extractedData.price = priceData;
      confidenceComponents.priceMentioned = true;
    }

    const ownerData = this.identifyOwner(messages, fullConversation);
    if (ownerData) {
      currentProperty.extractedData.owner = ownerData;
      analysis.ownerIdentification = ownerData;
      confidenceComponents.ownerIdentified = true;
    }

    const furnishing = this.extractFurnishing(fullConversation);
    if (furnishing) {
      currentProperty.extractedData.furnishing = furnishing;
      confidenceComponents.furnishingMentioned = true;
    }

    const features = this.extractFeatures(fullConversation);
    if (features.length > 0) {
      currentProperty.extractedData.features = features;
      confidenceComponents.featuresCount = features.length;
    }

    currentProperty.confidence = this.calculateConfidence(confidenceComponents);
    currentProperty.confidenceComponents = confidenceComponents;

    analysis.properties.push(currentProperty);
    analysis.overallConfidence = currentProperty.confidence;
    analysis.extractedEntities = this.extractEntities(messages);

    return analysis;
  }

  calculateConfidence(components) {
    let score = 0;
    if (components.propertyTypeMentioned) score += this.confidenceWeights.propertyTypeMentioned;
    if (components.availabilityMentioned) score += this.confidenceWeights.availabilityMentioned;
    if (components.locationMentioned) score += this.confidenceWeights.locationMentioned;
    if (components.sizeOrRoomsMentioned) score += this.confidenceWeights.sizeOrRoomsMentioned;
    if (components.priceMentioned) score += this.confidenceWeights.priceMentioned;
    if (components.ownerIdentified) score += this.confidenceWeights.ownerIdentified;
    if (components.furnishingMentioned) score += this.confidenceWeights.furnishingMentioned;
    score += Math.min(components.featuresCount * this.confidenceWeights.featuresListedCount, 10);
    return Math.min(score, 100);
  }

  hasKeywords(text, keywords) {
    return keywords.some(keyword => text.includes(keyword.toLowerCase()));
  }

  extractLocation(text) {
    for (const location of this.keywords.locationKeywords) {
      if (text.includes(location.toLowerCase())) {
        return location.charAt(0).toUpperCase() + location.slice(1);
      }
    }
    return null;
  }

  extractSize(text) {
    return extractSizeFromText(text);
  }

  extractPrice(text) {
    return extractPriceFromText(text);
  }

  identifyOwner(messages, text) {
    const ownerData = {
      name: null,
      phone: null,
      whatsappNumber: null,
      ownershipType: 'uncertain',
    };

    if (messages && messages.length > 0) {
      const firstMessage = messages[0];
      if (firstMessage.senderName) ownerData.name = firstMessage.senderName;
      if (firstMessage.senderPhone) ownerData.whatsappNumber = firstMessage.senderPhone;
    }

    const phonePattern = /(\+?971\d{9}|0\d{9})/g;
    const phoneMatch = phonePattern.exec(text);
    if (phoneMatch && !ownerData.phone) {
      ownerData.whatsappNumber = phoneMatch[1];
    }

    if (this.hasKeywords(text, this.keywords.ownershipIndicators.owner)) {
      ownerData.ownershipType = 'direct_owner';
    } else if (this.hasKeywords(text, this.keywords.ownershipIndicators.propertyManager)) {
      ownerData.ownershipType = 'property_manager';
    } else if (this.hasKeywords(text, this.keywords.ownershipIndicators.broker)) {
      ownerData.ownershipType = 'broker';
    }

    return ownerData.name || ownerData.phone ? ownerData : null;
  }

  extractFurnishing(text) {
    if (this.hasKeywords(text, this.keywords.furnishingIndicators.furnished)) return 'furnished';
    if (this.hasKeywords(text, this.keywords.furnishingIndicators.semiFurnished)) {
      return 'semi_furnished';
    }
    if (this.hasKeywords(text, this.keywords.furnishingIndicators.unfurnished)) {
      return 'unfurnished';
    }
    return null;
  }

  extractFeatures(text) {
    const features = [];
    for (const feature of this.keywords.featureKeywords) {
      if (text.includes(feature.toLowerCase())) {
        features.push(feature);
      }
    }
    return features;
  }

  extractEntities(messages) {
    return extractNamedEntities(messages);
  }

  generateAutoReply(analysis) {
    return buildAutoReply(analysis);
  }

  generateQuickReplies(analysis) {
    return buildQuickReplies(analysis);
  }
}

export default ConversationAnalyzer;
export { ConversationAnalyzer };
export const conversationAnalyzer = new ConversationAnalyzer();
