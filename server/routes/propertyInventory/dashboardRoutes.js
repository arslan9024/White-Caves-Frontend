import express from 'express';
import PropertyInventory from '../../models/PropertyInventory.js';
import InventoryProperty from '../../models/InventoryProperty.js';
import FilterService from '../../services/FilterService.js';

const router = express.Router();

async function enrichPropertiesWithInventory(properties) {
  const inventoryData = await PropertyInventory.find({
    propertyId: { $in: properties.map((p) => p._id) },
  }).populate('assignedAgents.agentId', 'name email');

  // 300% Acceleration Protocol: MapIndexHash O(1) lookups instead of O(n) array scans
  const inventoryMap = new Map();
  for (const inv of inventoryData) {
    if (inv && inv.propertyId) {
      inventoryMap.set(inv.propertyId.toString(), inv);
    }
  }

  return properties.map((prop) => {
    const inv = inventoryMap.get(prop._id.toString()) || null;
    return {
      ...prop.toObject(),
      inventory: inv,
    };
  });
}

// Dashboard: Get area summaries with counts
router.get('/dashboard/areas-summary', async (req, res) => {
  try {
    const areaSummary = await InventoryProperty.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$area',
          total: { $sum: 1 },
          available: {
            $sum: { $cond: [{ $eq: ['$status', 'available'] }, 1, 0] },
          },
          rented: {
            $sum: { $cond: [{ $eq: ['$status', 'rented'] }, 1, 0] },
          },
          sold: {
            $sum: { $cond: [{ $eq: ['$status', 'sold'] }, 1, 0] },
          },
          reserved: {
            $sum: { $cond: [{ $eq: ['$status', 'reserved'] }, 1, 0] },
          },
        },
      },
      {
        $addFields: {
          availabilityRate: {
            $multiply: [
              { $divide: ['$available', '$total'] },
              100,
            ],
          },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json({
      success: true,
      data: areaSummary,
      count: areaSummary.length,
    });
  } catch (error) {
    console.error('Error fetching area summary:', error);
    res.status(500).json({ error: 'Failed to fetch area summary' });
  }
});

// Dashboard: Get properties by area with pagination and filters
router.get('/dashboard/properties-by-area/:area', async (req, res) => {
  try {
    const { area } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';

    // Extract and validate filters
    const filters = FilterService.extractFiltersFromQuery(req.query);
    const validation = FilterService.validateFilters(filters);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid filter parameters',
        details: validation.errors,
      });
    }

    // Build MongoDB query
    const mongoQuery = FilterService.buildMongoQuery(filters);
    mongoQuery.area = area;
    mongoQuery.isActive = true;

    // Get pagination and sorting
    const pagination = FilterService.getPagination(page, limit);
    const sort = FilterService.getSort(sortBy, sortOrder);

    // Execute query
    const properties = await InventoryProperty.find(mongoQuery)
      .populate('owners', 'name phone email')
      .populate('primaryOwner', 'name phone email')
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await InventoryProperty.countDocuments(mongoQuery);
    const enrichedProperties = await enrichPropertiesWithInventory(properties);

    // Build response with filter metadata
    const response = FilterService.buildResponse(
      enrichedProperties,
      filters,
      pagination,
      total
    );

    res.json(response);
  } catch (error) {
    console.error('Error fetching properties by area:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Dashboard: Advanced search with global filters (all areas)
router.get('/dashboard/search', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';

    // Extract and validate filters
    const filters = FilterService.extractFiltersFromQuery(req.query);
    const validation = FilterService.validateFilters(filters);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid filter parameters',
        details: validation.errors,
      });
    }

    // Build MongoDB query
    const mongoQuery = FilterService.buildMongoQuery(filters);
    mongoQuery.isActive = true;

    // Add specific areas filter if provided
    if (filters.areas && filters.areas.length > 0) {
      mongoQuery.area = { $in: filters.areas };
    }

    // Get pagination and sorting
    const pagination = FilterService.getPagination(page, limit);
    const sort = FilterService.getSort(sortBy, sortOrder);

    // Execute query
    const properties = await InventoryProperty.find(mongoQuery)
      .populate('owners', 'name phone email')
      .populate('primaryOwner', 'name phone email')
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await InventoryProperty.countDocuments(mongoQuery);
    const enrichedProperties = await enrichPropertiesWithInventory(properties);

    // Build response with filter metadata
    const response = FilterService.buildResponse(
      enrichedProperties,
      filters,
      pagination,
      total
    );

    res.json(response);
  } catch (error) {
    console.error('Error searching properties:', error);
    res.status(500).json({ error: 'Failed to search properties' });
  }
});

// Dashboard: Get overall dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get total count and status breakdown
    const statusBreakdown = await InventoryProperty.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get PropertyInventory tenancy cycle breakdown
    const tenancyBreakdown = await PropertyInventory.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get total counts
    const totalProperties = await InventoryProperty.countDocuments({
      isActive: true,
    });

    const totalInventory = await PropertyInventory.countDocuments();

    // Calculate availability rate
    const availableCount =
      statusBreakdown.find((s) => s._id === 'available')?.count || 0;
    const rentedCount =
      statusBreakdown.find((s) => s._id === 'rented')?.count || 0;
    const occupancyRate = ((rentedCount / totalProperties) * 100).toFixed(1);
    const availabilityRate = ((availableCount / totalProperties) * 100).toFixed(
      1
    );

    // Count Mary's visible properties
    const maryVisibleCount = await PropertyInventory.countDocuments({
      'visibleTo.mary': true,
    });

    // Get area distribution
    const areaDistribution = await InventoryProperty.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$area',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Count properties with assigned agents
    const withAgentsCount = await PropertyInventory.countDocuments({
      'assignedAgents.0': { $exists: true },
    });

    res.json({
      success: true,
      data: {
        totalProperties,
        totalInventory,
        maryVisibleCount,
        availabilityRate: parseFloat(availabilityRate),
        occupancyRate: parseFloat(occupancyRate),
        statusBreakdown,
        tenancyBreakdown,
        areaDistribution,
        agentAssignmentCount: withAgentsCount,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
