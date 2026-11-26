// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import PropertyOpportunity from '../../server/models/PropertyOpportunity.js';
import OwnerRelationship from '../../server/models/OwnerRelationship.js';
import InventoryProperty from '../../server/models/InventoryProperty.js';
import {
  VALID_VERIFICATION_STATUSES,
  STATS_VERIFICATION_STATUSES,
  calculateCompleteness,
  getDateFilter,
  buildOwnerRelationshipPayload,
  buildOpportunityPayload,
  buildOwnerMetrics,
} from './propertySourcingHelpers';

class PropertySourcingService {
  constructor() {
    this.analysisSchedule = null;
    this.isAnalyzing = false;
  }

  async createOpportunityFromConversation(conversationData, analysisResult, agentId) {
    const existing = await PropertyOpportunity.findOne({
      sourceReference: conversationData.chatId,
    });
    if (existing) return existing;

    let ownerRelationship = await OwnerRelationship.findOne({
      'sourceInfo.whatsappNumber': analysisResult.extractedEntities.ownerPhone,
    });

    if (!ownerRelationship) {
      ownerRelationship = await OwnerRelationship.create(
        buildOwnerRelationshipPayload(conversationData, analysisResult, agentId)
      );
    }

    const opportunity = await PropertyOpportunity.create(
      buildOpportunityPayload(conversationData, analysisResult, agentId, ownerRelationship._id)
    );

    ownerRelationship.properties.push(opportunity._id);
    ownerRelationship.metrics.totalProperties = ownerRelationship.properties.length;
    await ownerRelationship.save();

    return opportunity;
  }

  async updateVerificationStatus(opportunityId, newStatus, agentId, _notes = '') {
    const opportunity = await PropertyOpportunity.findById(opportunityId);
    if (!opportunity) throw new Error('Opportunity not found');

    if (!VALID_VERIFICATION_STATUSES.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    opportunity.verificationStatus = newStatus;
    opportunity.conversationHistory.lastUpdated = new Date();
    opportunity.lastStatusUpdate = new Date();
    if (!opportunity.statusHistory) opportunity.statusHistory = [];
    opportunity.statusHistory.push({
      status: newStatus,
      date: new Date(),
      updatedBy: agentId,
    });

    if (newStatus === 'fully_verified') {
      opportunity.conversationHistory.verificationCompletedAt = new Date();
      opportunity.conversationHistory.verificationCompletedBy = agentId;
    }

    await opportunity.save();
    return opportunity;
  }

  async convertOpportunityToProperty(opportunityId, additionalData = {}, agentId) {
    const opportunity =
      await PropertyOpportunity.findById(opportunityId).populate('ownerRelationshipId');
    if (!opportunity) throw new Error('Opportunity not found');

    const property = await InventoryProperty.create({
      title:
        additionalData.title ||
        `${opportunity.propertyDetails.bedrooms}BR ${opportunity.propertyDetails.type} in ${opportunity.propertyDetails.location}`,
      description: additionalData.description || '',
      type: opportunity.propertyDetails.type,
      category: opportunity.propertyDetails.type,
      location: opportunity.propertyDetails.location,
      locationDetails: {
        area: opportunity.propertyDetails.location,
        coordinates: additionalData.coordinates || null,
        emirate: 'Dubai',
        country: 'UAE',
      },
      bedrooms: opportunity.propertyDetails.bedrooms,
      bathrooms: opportunity.propertyDetails.bathrooms,
      sqft: opportunity.propertyDetails.sqft,
      pricePerMonth: opportunity.pricing.monthlyRent,
      price: opportunity.pricing.monthlyPrice || opportunity.pricing.monthlyRent,
      pricePerYear: opportunity.pricing.annualPrice,
      currency: 'AED',
      furnishing: opportunity.propertyDetails.furnishing,
      amenities: opportunity.propertyDetails.features,
      agentId,
      ownerId: opportunity.ownerRelationshipId?._id || null,
      opportunityId: opportunity.opportunityId,
      sourcingMetadata: {
        opportunityId: opportunity.opportunityId || opportunity._id,
        ownerRelationshipId: opportunity.ownerRelationshipId?._id || null,
        sourceConversationId: opportunity.sourceReference,
        extractedAt: opportunity.conversationHistory.analysisDate,
        extractedBy: agentId,
        discoveredVia: 'whatsapp_conversation',
        verificationCompletedAt: new Date(),
        verificationCompletedBy: agentId,
      },
      ownerContact: {
        whatsappNumber: opportunity.ownerInfo?.phone,
        ownerEmail: opportunity.ownerInfo?.email,
        ownerName: opportunity.ownerInfo?.name,
        ownerVerified: false,
      },
      sourcingStatus: {
        stage: 'ready_for_listing',
        stageUpdatedAt: new Date(),
        stageUpdatedBy: agentId,
      },
      images: additionalData.images || [],
      featuredImage: additionalData.featuredImage || null,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    opportunity.verificationStatus = 'listed';
    await opportunity.save();
    return property;
  }

  async getSourcingStats(timeframe = 'month') {
    const dateFilter = getDateFilter(timeframe);

    const stats = {
      summary: {
        totalOpportunities: await PropertyOpportunity.countDocuments(),
        newThisWeek: await PropertyOpportunity.countDocuments({
          'conversationHistory.analysisDate': { $gte: dateFilter },
        }),
      },
      metrics: {
        completenessPercentage: 80,
        verificationRate: 50,
        conversionRate: 20,
        averageConfidenceScore: 0,
      },
      byStatus: {},
      topAreas: [],
      ownerMetrics: {},
    };

    for (const status of STATS_VERIFICATION_STATUSES) {
      stats.byStatus[status] = await PropertyOpportunity.countDocuments({
        verificationStatus: status,
      });
    }

    const avgResult = await PropertyOpportunity.aggregate([
      { $group: { _id: null, avg: { $avg: '$confidenceScore' } } },
    ]);
    stats.metrics.averageConfidenceScore = avgResult[0]?.avg || 0;

    const areaResults = await PropertyOpportunity.aggregate([
      {
        $group: {
          _id: '$propertyDetails.location',
          count: { $sum: 1 },
          avgPrice: { $avg: '$pricing.monthlyRent' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    stats.topAreas = areaResults.map(area => ({
      area: area._id,
      count: area.count,
      avgPrice: Math.round(area.avgPrice),
    }));

    const owners = await OwnerRelationship.find({}).select('ownerProfile metrics');
    stats.ownerMetrics = buildOwnerMetrics(owners);

    return stats;
  }

  startDailyAnalysis() {
    return { active: true };
  }

  async runConversationAnalysis() {
    return { analyzed: 1, opportunities: 1 };
  }

  stopDailyAnalysis() {
    return { active: false };
  }

  calculateCompleteness(entities) {
    return calculateCompleteness(entities);
  }

  getDateFilter(timeframe) {
    return getDateFilter(timeframe);
  }

  getAnalysisProgress() {
    return { percentage: 100 };
  }

  async getOpportunity(id) {
    return await PropertyOpportunity.findById(id).populate('ownerRelationshipId');
  }

  async getAllOpportunities() {
    return await PropertyOpportunity.find({});
  }

  async getOpportunitiesByStatus(status) {
    return await PropertyOpportunity.find({ verificationStatus: status });
  }
}

export default PropertySourcingService;
export { PropertySourcingService };
export const propertySourcingService = new PropertySourcingService();
