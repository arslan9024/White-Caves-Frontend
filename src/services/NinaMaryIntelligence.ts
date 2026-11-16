// @ts-nocheck
/**
 * NinaMaryIntelligence
 * Enhances Nina's chatbot responses with real-time Mary inventory data
 * Enables: "Do you have 2BR villas with pools under 2.5M in Arabian Ranches?"
 */

import PropertyQueryService from './PropertyQueryService.js';
import {
  GENERAL_RESPONSES,
  formatPrice,
  isAboutPrice,
  isAboutSize,
  isAboutAvailability,
  isAboutLocation,
  inferPreferencesFromConversation,
} from './NinaMaryIntelligenceHelpers';

class NinaMaryIntelligence {
  constructor() {
    this.propertyQueryService = new PropertyQueryService();
    this.responseCache = new Map();
    this.cacheExpiry = 300000; // 5 minutes
  }

  /**
   * Enhanced response generation incorporating inventory data
   */
  async generateEnhancedResponse(userMessage, intent, entities, conversationContext = {}) {
    try {
      if (!this.isPropertyInquiry(intent)) {
        return this.generateGeneralResponse(intent, entities);
      }

      const cacheKey = `${userMessage.substring(0, 30)}`;
      if (this.responseCache.has(cacheKey)) {
        const cached = this.responseCache.get(cacheKey);
        if (Date.now() - cached.timestamp < this.cacheExpiry) {
          return cached.response;
        }
      }

      const searchResult = await this.propertyQueryService.searchPropertiesNaturalLanguage(
        userMessage,
        5
      );

      let response;
      if (searchResult.success && searchResult.properties.length > 0) {
        response = this.generatePropertyMatchResponse(searchResult, userMessage);
      } else {
        response = this.generateNoMatchResponse(userMessage, searchResult.query_filters);
      }

      this.responseCache.set(cacheKey, {
        response,
        timestamp: Date.now()
      });

      return response;
    } catch (error) {
      return {
        type: 'error',
        text: 'I encountered an issue searching our inventory. Please contact our sales team for assistance.',
        error: error.message
      };
    }
  }

  isPropertyInquiry(intent) {
    const propertyIntents = [
      'property_inquiry',
      'viewing_request',
      'price_inquiry',
      'property_details',
      'availability_check'
    ];
    return propertyIntents.includes(intent);
  }

  generatePropertyMatchResponse(searchResult, originalQuery) {
    const { properties, count } = searchResult;

    let responseText = `Great! I found ${count} matching propert${count === 1 ? 'y' : 'ies'}:\n\n`;

    properties.forEach((prop, index) => {
      responseText += `${index + 1}. ${prop.description}\n`;
      if (prop.features && prop.features.length > 0) {
        responseText += `   Features: ${prop.features.join(', ')}\n`;
      }
      responseText += `   📍 ${prop.area}\n`;
    });

    responseText += `\nWould you like more details about any of these properties, or would you like to schedule a viewing? 🏠`;

    return {
      type: 'property_list',
      text: responseText,
      properties: properties.map(p => ({
        id: p.id,
        description: p.description,
        area: p.area,
        type: p.type,
        image: p.images?.[0]
      })),
      actionButtons: [
        { text: 'More Details', value: 'more_details' },
        { text: 'Schedule Viewing', value: 'schedule_viewing' },
        { text: 'New Search', value: 'new_search' }
      ]
    };
  }

  generateNoMatchResponse(query, filters) {
    let responseText = `I couldn't find properties matching exactly "${query}", but let me try some alternatives:\n\n`;

    responseText += `Here are some options:\n`;
    responseText += `• Would you be interested in a ${filters.minRooms || '1'}-${filters.maxRooms || '5'}BR property?\n`;
    
    if (filters.area) {
      responseText += `• Looking specifically for ${filters.area}, or open to other communities?\n`;
    }
    
    if (filters.maxPrice) {
      responseText += `• Your budget is ${this.formatPrice(filters.maxPrice)} - would a slightly higher price work?\n`;
    }

    responseText += `\nLet me know your preferences, and I can show you available options! 😊`;

    return {
      type: 'no_match_suggestions',
      text: responseText,
      suggestedFilters: filters,
      actionButtons: [
        { text: 'Adjust Budget', value: 'adjust_budget' },
        { text: 'Different Location', value: 'change_location' },
        { text: 'Any Property Type', value: 'flexible_type' },
        { text: 'Speak with Agent', value: 'human_agent' }
      ]
    };
  }

  generateGeneralResponse(intent, entities) {
    return {
      type: 'text',
      text: GENERAL_RESPONSES[intent] || GENERAL_RESPONSES.default,
      intent: intent
    };
  }

  formatPrice(price) {
    return formatPrice(price);
  }

  async handlePropertyFollowUp(propertyId, question) {
    try {
      const property = await this.propertyQueryService.getPropertyDetails(propertyId);

      if (!property.success) {
        return {
          type: 'error',
          text: 'Unable to retrieve property details. Please try again.'
        };
      }

      const prop = property.property;
      let responseText = '';

      if (isAboutPrice(question)) {
        responseText = `The asking price for this property is ${this.formatPrice(prop.askingPrice)}. `;
        if (prop.currency !== 'AED') {
          responseText += `(Currency: ${prop.currency}) `;
        }
        responseText += 'Would you like information about financing options?';
      } else if (isAboutSize(question)) {
        responseText = `This property is ${prop.actualArea} ${prop.areaUnit}. `;
        if (prop.rooms) {
          responseText += `It has ${prop.rooms} bedrooms. `;
        }
        responseText += 'Would you like to know more details?';
      } else if (isAboutAvailability(question)) {
        responseText = `This property is currently ${(prop.marketAvailability || 'available').replace('_', ' ')}. `;
        if (prop.occupancyStatus) {
          responseText += `Status: ${String(prop.occupancyStatus).replace('_', ' ')}. `;
        }
        responseText += 'Would you like to schedule a viewing?';
      } else if (isAboutLocation(question)) {
        responseText = `This property is located in ${prop.area || 'Dubai'}`;
        if (prop.cluster) {
          responseText += `, ${prop.cluster}`;
        }
        responseText += `. It's a great community with excellent amenities!`;
      } else {
        responseText = `Here's more information about this ${prop.propertyType || 'Property'}:\n`;
        responseText += `• Location: ${prop.area || 'Dubai'}\n`;
        responseText += `• Size: ${prop.actualArea || 0} ${prop.areaUnit || 'sq.ft'}\n`;
        responseText += `• Bedrooms: ${prop.rooms || 'Studio'}\n`;
        responseText += `• Price: ${this.formatPrice(prop.askingPrice)}\n`;
        responseText += `• Furnishing: ${(prop.furnishingLevel || 'unfurnished').replace('_', ' ')}\n`;
      }

      return {
        type: 'property_detail',
        text: responseText,
        propertyId: propertyId,
        property: prop
      };
    } catch (error) {
      return {
        type: 'error',
        text: 'I encountered an issue retrieving those details. Please ask our agent for help.'
      };
    }
  }

  isAboutPrice(question) {
    return isAboutPrice(question);
  }

  isAboutSize(question) {
    return isAboutSize(question);
  }

  isAboutAvailability(question) {
    return isAboutAvailability(question);
  }

  isAboutLocation(question) {
    return isAboutLocation(question);
  }

  async getConversationBasedRecommendations(conversationHistory) {
    try {
      const preferences = this.inferPreferencesFromConversation(conversationHistory);
      const result = await this.propertyQueryService.queryProperties(preferences);

      if (result.success && result.data.length > 0) {
        return {
          success: true,
          recommendations: result.data,
          basis: preferences,
          message: 'Based on our conversation, I think you might like these properties:'
        };
      }

      return {
        success: false,
        message: 'No properties found matching your preferences. Would you like to adjust your criteria?'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  inferPreferencesFromConversation(messages) {
    return inferPreferencesFromConversation(messages, str => this.propertyQueryService.parsePrice(str));
  }

  clearOldCacheEntries() {
    const now = Date.now();
    for (const [key, value] of this.responseCache.entries()) {
      if (now - value.timestamp > this.cacheExpiry) {
        this.responseCache.delete(key);
      }
    }
  }
}

export default NinaMaryIntelligence;

