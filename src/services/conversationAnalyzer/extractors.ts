// @ts-nocheck
/**
 * ConversationAnalyzer — Extraction & Reply Helpers
 */

export function extractSizeFromText(text) {
  const sizeData = {};

  const roomsPattern = /(\d+)\s*(?:br|bedroom|bedrooms|room|rooms)/gi;
  const roomsMatch = roomsPattern.exec(text);
  if (roomsMatch) {
    sizeData.rooms = parseInt(roomsMatch[1]);
  }

  const sqftPattern = /(\d+(?:,\d+)*)\s*(?:sqft|sq\.ft|square feet)/gi;
  const sqftMatch = sqftPattern.exec(text);
  if (sqftMatch) {
    sizeData.sqft = parseInt(sqftMatch[1].replace(/,/g, ''));
  }

  const sqmPattern = /(\d+(?:,\d+)*)\s*(?:sqm|sq\.m|square meters)/gi;
  const sqmMatch = sqmPattern.exec(text);
  if (sqmMatch) {
    sizeData.sqm = parseInt(sqmMatch[1].replace(/,/g, ''));
  }

  return Object.keys(sizeData).length > 0 ? sizeData : null;
}

export function extractPriceFromText(text) {
  const priceData = {};

  const monthlyPattern = /aed\s*(\d+(?:,\d+)*)\s*(?:per\s*month|\/month|monthly|\/m|pm)/gi;
  const monthlyMatch = monthlyPattern.exec(text);
  if (monthlyMatch) {
    priceData.monthlyRent = parseInt(monthlyMatch[1].replace(/,/g, ''));
    priceData.currency = 'AED';
  }

  const annualPattern = /aed\s*(\d+(?:,\d+)*)\s*(?:per\s*year|\/year|annually|pa)/gi;
  const annualMatch = annualPattern.exec(text);
  if (annualMatch) {
    priceData.annualRent = parseInt(annualMatch[1].replace(/,/g, ''));
    priceData.currency = 'AED';
  }

  return Object.keys(priceData).length > 0 ? priceData : null;
}

export function extractNamedEntities(messages) {
  const entities = [];
  const phonePattern = /(\+?971\d{9}|0\d{9})/g;
  const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

  for (const message of messages) {
    const content = message.content || message.text;
    if (!content) continue;

    const phones = content.match(phonePattern);
    if (phones) {
      phones.forEach(phone => {
        if (!entities.find(e => e.type === 'phone' && e.value === phone)) {
          entities.push({ type: 'phone', value: phone });
        }
      });
    }

    const emails = content.match(emailPattern);
    if (emails) {
      emails.forEach(email => {
        if (!entities.find(e => e.type === 'email' && e.value === email)) {
          entities.push({ type: 'email', value: email });
        }
      });
    }
  }

  return entities;
}

export function buildAutoReply(analysis) {
  if (analysis.overallConfidence < 60) {
    return {
      shouldAutoReply: true,
      replyType: 'clarification',
      template: 'clarification_needed',
      message:
        'Thanks for reaching out! To help you better, could you please share:\n1. Exact location of the property\n2. Monthly rent or asking price\n3. Number of bedrooms\n4. Furnishing level',
    };
  }

  if (analysis.overallConfidence >= 80 && analysis.properties.length > 0) {
    const prop = analysis.properties[0];
    let message = `Thanks for sharing! I'm interested in your ${prop.type}`;
    if (prop.extractedData.location) {
      message += ` in ${prop.extractedData.location}`;
    }
    message +=
      '. Could you please send us:\n1. Photos of the property\n2. Available from date\n3. Lease terms';

    return {
      shouldAutoReply: true,
      replyType: 'confirmation',
      template: 'details_request',
      message,
    };
  }

  return {
    shouldAutoReply: false,
    replyType: null,
    message: null,
  };
}

export function buildQuickReplies(analysis) {
  const quickReplies = [
    { text: 'Can you send photos?', priority: 'high' },
    { text: "What's the asking price?", priority: 'high' },
  ];

  if (analysis.properties.length > 0) {
    const prop = analysis.properties[0];

    if (!prop.extractedData.price) {
      quickReplies.push({ text: 'Monthly rent: _____ AED', priority: 'high' });
    }
    if (!prop.extractedData.size) {
      quickReplies.push({ text: 'How many bedrooms?', priority: 'medium' });
    }
    if (!prop.extractedData.furnishing) {
      quickReplies.push({ text: 'Is it furnished?', priority: 'medium' });
    }
  }

  quickReplies.push({ text: "Great! Let's schedule a viewing", priority: 'medium' });
  return quickReplies;
}
