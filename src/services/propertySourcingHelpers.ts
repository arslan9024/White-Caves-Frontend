/**
 * propertySourcingHelpers.ts — Pure payload builders & scoring helpers for PropertySourcingService
 * Extracted for AEGIS AEG-042 (< 350 lines single-purpose compliance).
 */

export const VALID_VERIFICATION_STATUSES = [
  'initial_detection',
  'waiting_for_photos',
  'partially_verified',
  'fully_verified',
  'archived',
  'listed',
] as const;

export const STATS_VERIFICATION_STATUSES = [
  'initial_detection',
  'waiting_for_photos',
  'partially_verified',
  'fully_verified',
  'listed',
] as const;

export interface ExtractedPropertyEntities {
  propertyType?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  furnishing?: string;
  features?: string[];
  availability?: string;
  price?: number;
  monthlyPrice?: number;
  annualPrice?: number;
  ownerPhone?: string;
  ownerEmail?: string;
  [key: string]: unknown;
}

export interface SourcingConversationData {
  chatId: string;
  name?: string;
  messages?: unknown[];
}

export interface SourcingAnalysisResult {
  confidenceScore?: number;
  overallConfidence?: number;
  extractedEntities: ExtractedPropertyEntities;
  ownerIdentification: {
    name?: string;
    type?: string;
  };
}

export interface OwnerRecordSummary {
  engagementStatus?: string;
  ownerProfile: { name: string };
  metrics: { totalProperties: number; successScore: number };
}

export function calculateCompleteness(entities: ExtractedPropertyEntities): number {
  let completeness = 0;
  let maxScore = 0;

  const fields: Record<string, number> = {
    propertyType: 20,
    location: 20,
    bedrooms: 15,
    monthlyPrice: 20,
    furnishing: 10,
    features: 15,
  };

  for (const [field, weight] of Object.entries(fields)) {
    maxScore += weight;
    if (entities[field]) completeness += weight;
  }

  return Math.round((completeness / maxScore) * 100);
}

export function getDateFilter(timeframe: string): Date {
  const past = new Date();
  if (timeframe === 'week') {
    past.setDate(past.getDate() - 7);
  } else if (timeframe === 'month') {
    past.setMonth(past.getMonth() - 1);
  } else if (timeframe === 'year') {
    past.setFullYear(past.getFullYear() - 1);
  }
  return past;
}

export function buildOwnerRelationshipPayload(
  conversationData: SourcingConversationData,
  analysisResult: SourcingAnalysisResult,
  agentId: string
) {
  return {
    ownerProfile: {
      name: analysisResult.ownerIdentification.name || 'Unknown Owner',
      email: analysisResult.extractedEntities.ownerEmail || '',
      verificationStatus: 'unverified',
      verificationDate: null,
      reliabilityScore: 50,
    },
    sourceInfo: {
      whatsappNumber: analysisResult.extractedEntities.ownerPhone,
      discoveredVia: 'whatsapp_conversation',
      firstContactDate: new Date(),
      source: conversationData.name,
    },
    interactionHistory: [
      {
        date: new Date(),
        type: 'initial_discovery',
        notes: 'Discovered through WhatsApp conversation',
        performedBy: agentId,
      },
    ],
    properties: [],
    engagementStatus: 'prospect',
    metrics: {
      totalProperties: 0,
      closedDeals: 0,
      averageDaysToClose: 0,
      successScore: 50,
    },
  };
}

export function buildOpportunityPayload(
  conversationData: SourcingConversationData,
  analysisResult: SourcingAnalysisResult,
  agentId: string,
  ownerRelationshipId: unknown
) {
  const e = analysisResult.extractedEntities;
  return {
    sourceReference: conversationData.chatId,
    confidenceScore: analysisResult.confidenceScore || analysisResult.overallConfidence || 0,
    verificationStatus: 'initial_detection',
    createdAt: new Date(),
    statusHistory: [
      {
        status: 'initial_detection',
        date: new Date(),
        updatedBy: agentId || 'system',
      },
    ],
    ownerInfo: {
      name: analysisResult.ownerIdentification.name || 'Unknown',
      phone: e.ownerPhone,
      email: e.ownerEmail,
      type: analysisResult.ownerIdentification.type,
    },
    propertyDetails: {
      type: e.propertyType,
      propertyType: e.propertyType,
      location: e.location,
      bedrooms: e.bedrooms || 0,
      bathrooms: e.bathrooms || 0,
      sqft: e.squareFeet || 0,
      furnishing: e.furnishing || 'unfurnished',
      features: e.features || [],
    },
    availability: {
      status: e.availability,
      moveInDate: null,
      leaseTerm: null,
    },
    pricing: {
      monthlyPrice: e.price || e.monthlyPrice || 0,
      monthlyRent: e.price || e.monthlyPrice || 0,
      annualPrice: e.annualPrice || 0,
      currency: 'AED',
      negotiable: null,
    },
    conversationHistory: {
      chatId: conversationData.chatId,
      messages: conversationData.messages || [],
      analysisDate: new Date(),
      lastUpdated: new Date(),
    },
    ownerRelationshipId,
    completenessPercentage: calculateCompleteness(e),
  };
}

export function buildOwnerMetrics(owners: OwnerRecordSummary[]) {
  return {
    totalOwners: owners.length,
    activeOwners: owners.filter(o => o.engagementStatus === 'active').length,
    averagePropertiesPerOwner:
      owners.length > 0
        ? owners.reduce((sum, o) => sum + o.metrics.totalProperties, 0) / owners.length
        : 0,
    topOwners: [...owners]
      .sort((a, b) => b.metrics.totalProperties - a.metrics.totalProperties)
      .slice(0, 5)
      .map(o => ({
        name: o.ownerProfile.name,
        properties: o.metrics.totalProperties,
        successScore: o.metrics.successScore,
      })),
  };
}
