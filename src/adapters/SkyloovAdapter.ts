// @ts-nocheck
/**
 * SkyloovAdapter
 * 
 * Integration adapter for Skyloov API
 * https://www.skyloov.com/
 * 
 * Handles:
 * - Property portfolio management
 * - Tenant management
 * - Maintenance requests
 * - Payment processing
 * - Webhook integration
 */

import { BasePortalAdapter } from './BasePortalAdapter';
import crypto from 'crypto';

export class SkyloovAdapter extends BasePortalAdapter {
  constructor() {
    super('skyloov', 'https://api.skyloov.com/v1');
  }

  /**
   * Connect to Skyloov API
   * Requires: apiKey, apiSecret
   */
  async connect(credentials) {
    if (!credentials.apiKey || !credentials.apiSecret) {
      throw new Error('Skyloov requires apiKey and apiSecret');
    }

    this.apiKey = credentials.apiKey;
    this.apiSecret = credentials.apiSecret;
    this.webhookSecret = credentials.webhookSecret || crypto.randomBytes(32).toString('hex');

    try {
      // Verify credentials
      const response = await this.makeRequest('GET', '/properties?limit=1');
      
      if (response) {
        this.isConnected = true;
        
        return true;
      }
    } catch (error) {
      
      this.isConnected = false;
      throw error;
    }
  }

  /**
   * Override makeRequest to use proper Skyloov auth
   */
  async makeRequest(method, endpoint, data = null, headers = {}) {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = this.generateSignature(method, endpoint, timestamp, data);
    
    try {
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Signature': signature,
          'X-Timestamp': timestamp.toString(),
          ...headers
        }
      };

      if (data) {
        requestOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url, requestOptions);
      
      // Handle rate limiting
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const reset = response.headers.get('X-RateLimit-Reset');
      
      if (remaining) this.rateLimitRemaining = parseInt(remaining);
      if (reset) this.rateLimitReset = parseInt(reset);

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 60;
        throw new Error(`Rate limited. Retry after ${retryAfter}s`);
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      
      throw error;
    }
  }

  /**
   * Generate API signature
   */
  generateSignature(method, endpoint, timestamp, data = null) {
    return generateSkyloovSignature(method, endpoint, timestamp, data, this.apiSecret);
  }

  /**
   * Get property by ID
   */
  async getProperty(propertyId) {
    const response = await this.makeRequest('GET', `/properties/${propertyId}`);
    
    if (response.data) {
      return this.normalizeProperty(response.data);
    }
    
    return null;
  }

  /**
   * Search properties
   */
  async searchProperties(filters = {}) {
    const qs = buildFilterParams(filters, ["location", "priceMin", "priceMax", "type", "status"]);
    const response = await this.makeRequest("GET", `/properties${qs ? "?" + qs : ""}`);
    return (response.data && Array.isArray(response.data)) ? response.data.map(p => this.normalizeProperty(p)) : [];
  }

  /**
   * Get all properties
   */
  async getAllProperties(page = 1, pageSize = 50) {
    const offset = (page - 1) * pageSize;
    const response = await this.makeRequest(
      'GET',
      `/properties?limit=${pageSize}&offset=${offset}`
    );

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(prop => this.normalizeProperty(prop));
    }

    return [];
  }

  /**
   * Create a lead/inquiry
   */
  async createLead(leadData) {
    const skyloovLead = {
      propertyId: leadData.propertyId,
      inquirerName: leadData.name,
      inquirerEmail: leadData.email,
      inquirerPhone: leadData.phone,
      inquiryMessage: leadData.message,
      inquiryType: 'general_inquiry'
    };

    const response = await this.makeRequest('POST', '/inquiries', skyloovLead);
    
    if (response.data) {
      return this.normalizeLead(response.data);
    }

    return null;
  }

  /**
   * Get inquiries/leads
   */
  async getLeads(filters = {}) {
    const qs = buildFilterParams(filters, ["propertyId", "status"]);
    const response = await this.makeRequest("GET", `/inquiries${qs ? "?" + qs : ""}`);
    return (response.data && Array.isArray(response.data)) ? response.data.map(l => this.normalizeLead(l)) : [];
  }

  /**
   * Update property
   */
  async updateProperty(propertyId, updates) {
    const skyloovUpdates = this.mapUpdatesTOSkyloovFormat(updates);
    
    const response = await this.makeRequest('PUT', `/properties/${propertyId}`, skyloovUpdates);
    
    if (response.data) {
      return this.normalizeProperty(response.data);
    }

    return null;
  }

  /**
   * Delete property
   */
  async deleteProperty(propertyId) {
    await this.makeRequest('DELETE', `/properties/${propertyId}`);
    return true;
  }

  /**
   * Map updates to Skyloov format
   */
  mapUpdatesTOSkyloovFormat(updates) {
    return mapUpdatesToSkyloovFormat(updates);
  }

  /**
   * Get tenants for a property
   */
  async getTenants(propertyId, filters = {}) {
    const qs = buildFilterParams(filters, ['status']);
    const response = await this.makeRequest('GET', `/properties/${propertyId}/tenants${qs ? '?' + qs : ''}`);
    return (response.data && Array.isArray(response.data)) ? response.data : [];
  }

  /**
   * Get tenant by ID
   */
  async getTenant(propertyId, tenantId) {
    const response = await this.makeRequest('GET', `/properties/${propertyId}/tenants/${tenantId}`);
    return response.data || null;
  }

  /**
   * Create maintenance request
   */
  async createMaintenanceRequest(propertyId, requestData) {
    const request = buildMaintenanceRequest(requestData);
    const response = await this.makeRequest('POST', `/properties/${propertyId}/maintenance-requests`, request);
    return response.data || null;
  }

  /**
   * Get maintenance requests
   */
  async getMaintenanceRequests(propertyId, filters = {}) {
    const qs = buildFilterParams(filters, ['status', 'priority']);
    const response = await this.makeRequest('GET', `/properties/${propertyId}/maintenance-requests${qs ? '?' + qs : ''}`);
    return (response.data && Array.isArray(response.data)) ? response.data : [];
  }

  /**
   * Get payments
   */
  async getPayments(propertyId, filters = {}) {
    const qs = buildFilterParams(filters, ['status', 'dateFrom', 'dateTo']);
    const response = await this.makeRequest('GET', `/properties/${propertyId}/payments${qs ? '?' + qs : ''}`);
    return (response.data && Array.isArray(response.data)) ? response.data : [];
  }

  /**
   * Setup webhook
   */
  async setupWebhook(webhookUrl, events = ['property.updated', 'inquiry.created', 'payment.received']) {
    this.webhookUrl = webhookUrl;
    
    const webhook = {
      url: webhookUrl,
      events: this.mapEventsToSkyloovFormat(events),
      active: true,
      secret: this.webhookSecret
    };

    const response = await this.makeRequest('POST', '/webhooks', webhook);
    
    if (response.data) {
      
      return response.data;
    }

    return null;
  }

  /**
   * Map events to Skyloov format
   */
  mapEventsToSkyloovFormat(events) {
    return mapEventsToSkyloovFormat(events);
  }

  /**
   * Handle webhook payload
   */
  async handleWebhookPayload(payload) {
    const isValid = this.validateWebhookSignature(payload, payload.signature, this.webhookSecret);
    return handleSkyloovWebhook(payload, isValid, p => this.normalizeProperty(p), l => this.normalizeLead(l));
  }

  /**
   * Validate webhook signature
   */
  validateWebhookSignature(payload, signature, secret) {
    return validateSkyloovWebhookSignature(payload, signature, secret);
  }

  /**
   * Normalize Skyloov property
   */
  normalizeProperty(skyloovProperty) {
    return super.normalizeProperty(formatSkyloovPropertyData(skyloovProperty));
  }

  /**
   * Get portfolio summary
   */
  async getPortfolioSummary() {
    const response = await this.makeRequest('GET', '/portfolio/summary');
    return response.data || null;
  }

  /**
   * Get revenue analytics
   */
  async getRevenueAnalytics(filters = {}) {
    const qs = buildFilterParams(filters, ["dateFrom", "dateTo"]);
    const response = await this.makeRequest("GET", `/portfolio/revenue${qs ? "?" + qs : ""}`);
    return response.data || null;
  }
}

export default SkyloovAdapter;

