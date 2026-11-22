/**
 * NINA NLP Engine - Message Normalization, Entity, Sentiment & Topic Extractors
 */
import {
  AMENITIES,
  DUBAI_LOCATIONS,
  NEGATIVE_SENTIMENT_KEYWORDS,
  POSITIVE_SENTIMENT_KEYWORDS,
  PROPERTY_TYPES,
} from './keywords';
import { Entity, SentimentResult } from './types';

/**
 * Normalize message (lowercase, trim, remove extra spaces)
 */
export function normalizeMessage(message: string): string {
  return message
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s\d.-]/g, '');
}

/**
 * Extract entities from message
 */
export function extractEntities(message: string): Entity[] {
  const entities: Entity[] = [];
  const lowerMessage = message.toLowerCase();

  // Property types
  for (const type of PROPERTY_TYPES) {
    if (message.includes(type)) {
      entities.push({
        type: 'PROPERTY_TYPE',
        value: type,
        confidence: 0.95,
      });
    }
  }

  // Locations (Dubai neighborhoods)
  for (const location of DUBAI_LOCATIONS) {
    if (lowerMessage.includes(location)) {
      entities.push({
        type: 'LOCATION',
        value: location,
        confidence: 0.9,
      });
    }
  }

  // Prices (AED amounts)
  const priceMatches = message.match(/(\d{3,},?\d{3}|\d+)\s*(aed|درهم)?/gi);
  if (priceMatches) {
    for (const price of priceMatches) {
      const cleanPrice = price.replace(/[^\d]/g, '');
      if (cleanPrice.length >= 4) {
        entities.push({
          type: 'PRICE',
          value: `AED ${cleanPrice}`,
          confidence: 0.85,
        });
      }
    }
  }

  // Bedrooms
  const bedroomMatches = message.match(/(\d+)\s*(bed|br|bedroom|bedrooms)?/gi);
  if (bedroomMatches) {
    for (const match of bedroomMatches) {
      const rooms = match.match(/\d+/)?.[0];
      if (rooms && parseInt(rooms, 10) <= 10) {
        entities.push({
          type: 'BEDROOMS',
          value: `${rooms}BR`,
          confidence: 0.8,
        });
      }
    }
  }

  // Sizes (sqft/sqm)
  const sizeMatches = message.match(/(\d{2,})\s*(sqft|sq\.?ft|sqm|sq\.?m|m2|ft2)/gi);
  if (sizeMatches) {
    for (const size of sizeMatches) {
      entities.push({
        type: 'SIZE',
        value: size,
        confidence: 0.85,
      });
    }
  }

  // Amenities
  for (const amenity of AMENITIES) {
    if (lowerMessage.includes(amenity)) {
      entities.push({
        type: 'AMENITY',
        value: amenity,
        confidence: 0.8,
      });
    }
  }

  return entities;
}

/**
 * Analyze sentiment of message
 */
export function analyzeSentiment(message: string): SentimentResult {
  let score = 0;
  const keywords: string[] = [];

  for (const keyword of POSITIVE_SENTIMENT_KEYWORDS) {
    const count = (message.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []).length;
    if (count > 0) {
      score += count * 0.5;
      keywords.push(keyword);
    }
  }

  for (const keyword of NEGATIVE_SENTIMENT_KEYWORDS) {
    const count = (message.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []).length;
    if (count > 0) {
      score -= count * 0.5;
      keywords.push(keyword);
    }
  }

  // Normalize sentiment to -1.0 to 1.0
  const normalizedScore = Math.max(-1, Math.min(1, score / 3));

  let sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  if (normalizedScore > 0.2) {
    sentiment = 'POSITIVE';
  } else if (normalizedScore < -0.2) {
    sentiment = 'NEGATIVE';
  } else {
    sentiment = 'NEUTRAL';
  }

  return {
    sentiment,
    score: normalizedScore,
    keywords,
  };
}

/**
 * Extract topics from message and detected entities
 */
export function extractTopics(message: string, entities: Entity[]): string[] {
  const topics: Set<string> = new Set();

  for (const entity of entities) {
    topics.add(entity.type.toLowerCase());
  }

  if (message.match(/view|tour|see|visit/i)) topics.add('VIEWING');
  if (message.match(/buy|purchase|acquire|invest/i)) topics.add('PURCHASE');
  if (message.match(/price|cost|afford|budget/i)) topics.add('PRICING');
  if (message.match(/available|stock|inventory/i)) topics.add('AVAILABILITY');
  if (message.match(/help|assist|support|issue|problem/i)) topics.add('SUPPORT');

  return Array.from(topics);
}
