import express from 'express';
import AnalyticsService from '../../services/AnalyticsService.js';

const router = express.Router();

// GET /api/property-inventory/analytics/dashboard
// Get all dashboard analytics at once
router.get('/analytics/dashboard', async (req, res) => {
  try {
    const stats = await AnalyticsService.getOverallStats();

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching analytics dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics dashboard',
    });
  }
});

// GET /api/property-inventory/analytics/stats
// Get key metrics only
router.get('/analytics/stats', async (req, res) => {
  try {
    const stats = await AnalyticsService.getKeyMetrics();

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching key metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch key metrics',
    });
  }
});

// GET /api/property-inventory/analytics/distribution
// Get property distribution data
router.get('/analytics/distribution', async (req, res) => {
  try {
    const distribution = await AnalyticsService.getPropertyDistribution();

    res.json({
      success: true,
      data: distribution,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching property distribution:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch property distribution',
    });
  }
});

// GET /api/property-inventory/analytics/pricing
// Get pricing analytics
router.get('/analytics/pricing', async (req, res) => {
  try {
    const pricing = await AnalyticsService.getPricingAnalytics();

    res.json({
      success: true,
      data: pricing,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching pricing analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing analytics',
    });
  }
});

// GET /api/property-inventory/analytics/occupancy
// Get occupancy metrics
router.get('/analytics/occupancy', async (req, res) => {
  try {
    const occupancy = await AnalyticsService.getOccupancyMetrics();

    res.json({
      success: true,
      data: occupancy,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching occupancy metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch occupancy metrics',
    });
  }
});

// GET /api/property-inventory/analytics/areas
// Get analytics for all areas
router.get('/analytics/areas', async (req, res) => {
  try {
    const areaAnalytics = await AnalyticsService.getAllAreaAnalytics();

    res.json({
      success: true,
      data: areaAnalytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching area analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch area analytics',
    });
  }
});

// GET /api/property-inventory/analytics/area/:area
// Get analytics for a specific area
router.get('/analytics/area/:area', async (req, res) => {
  try {
    const { area } = req.params;
    const areaAnalytics = await AnalyticsService.getAreaAnalytics(area);

    res.json({
      success: true,
      data: areaAnalytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching area analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch area analytics',
    });
  }
});

// GET /api/property-inventory/analytics/trends
// Get trend data over time
router.get('/analytics/trends', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const trends = await AnalyticsService.getTrendData(startDate, endDate);

    res.json({
      success: true,
      data: trends,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching trend data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trend data',
    });
  }
});

// GET /api/property-inventory/analytics/export
// Export all dashboard data
router.get('/analytics/export', async (req, res) => {
  try {
    const data = await AnalyticsService.exportDashboardData();

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error exporting dashboard data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export dashboard data',
    });
  }
});

export default router;
