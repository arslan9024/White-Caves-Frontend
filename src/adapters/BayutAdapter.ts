// @ts-nocheck
/**
 * BayutAdapter
 * 
 * Integration adapter for Bayut.com API
 * https://www.bayut.com/
 * 
 * Handles:
 * - Property listing retrieval and search
 * - Lead capture and management
 * - Agent information
 * - Webhook integration for real-time updates
 */

import { BasePortalAdapter } from './BasePortalAdapter';
import crypto from 'crypto';
import {
  mapUpdatesToBayutFormat,
  mapEventsToBayutFormat,
  validateBayutWebhookSignature,
  normalizeBayutPropertyData,
} from './bayutAdapter.helpers';

export class BayutAdapter extends BasePortalAdapter {
  constructor() {
    super('bayut', 'https://api.bayut.com/v1');
  }

  /**
   * Connect to Bayut API
   * Requires: apiKey, apiSecret
   */
  async connect(credentials) {
    if (!credentials.apiKey || !credentials.apiSecret) {
      throw new Error('Bayut requires apiKey and apiSecret');
    }

    this.apiKey = credentials.apiKey;
    this.apiSecret = credentials.apiSecret;
    this.webhookSecret = credentials.webhookSecret || crypto.randomBytes(32).toString('hex');

    try {
      const response = await this.makeRequest('GET', '/properties?pageNumber=1&pageSize=1');
      
      if (response && response.data) {
        this.isConnected = true;
        return true;
      }
    } catch (error) {
      this.isConnected = false;
      throw error;
    }
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
    const params = new URLSearchParams();

    if (filters.location) params.append('location', filters.location);
    if (filters.priceMin) params.append('priceMin', filters.priceMin);
    if (filters.priceMax) params.append('priceMax', filters.priceMax);
    if (filters.beds) params.append('beds', filters.beds);
    if (filters.baths) params.append('baths', filters.baths);
    if (filters.type) params.append('propertyType', filters.type);
    if (filters.purpose) params.append('transactionType', filters.purpose);
    if (filters.furnished !== undefined) params.append('furnish', filters.furnished ? 'furnished' : 'unfurnished');
    if (filters.sort) params.append('sort', filters.sort);

    params.append('pageSize', filters.pageSize || 50);
    params.append('pageNumber', filters.page || 1);

    const response = await this.makeRequest('GET', `/properties/search?${params.toString()}`);
    
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(prop => this.normalizeProperty(prop));
    }

    return [];
  }

  /**
   * Get all properties with pagination
   */
  async getAllProperties(page = 1, pageSize = 50) {
    const response = await this.makeRequest(
      'GET',
      `/properties?pageNumber=${page}&pageSize=${pageSize}`
    );

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(prop => this.normalizeProperty(prop));
    }

    return [];
  }

  /**
   * Create a lead on Bayut
   */
  async createLead(leadData) {
    const bayutLead = {
      propertyId: leadData.propertyId,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      message: leadData.message,
      leadSource: 'integration'
    };

    const response = await this.makeRequest('POST', '/leads', bayutLead);
    
    if (response.data) {
      return this.normalizeLead(response.data);
    }

    return null;
  }

  /**
   * Get leads from Bayut
   */
  async getLeads(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.propertyId) params.append('propertyId', filters.propertyId);
    if (filters.status) params.append('status', filters.status);
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);

    params.append('pageSize', filters.pageSize || 50);
    params.append('pageNumber', filters.page || 1);

    const response = await this.makeRequest('GET', `/leads?${params.toString()}`);
    
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(lead => this.normalizeLead(lead));
    }

    return [];
  }

  /**
   * Update a property
   */
  async updateProperty(propertyId, updates) {
    const bayutUpdates = this.mapUpdatesToBayutFormat(updates);
    
    const response = await this.makeRequest('PUT', `/properties/${propertyId}`, bayutUpdates);
    
    if (response.data) {
      return this.normalizeProperty(response.data);
    }

    return null;
  }

  /**
   * Delete a property
   */
  async deleteProperty(propertyId) {
    await this.makeRequest('DELETE', `/properties/${propertyId}`);
    return true;
  }

  mapUpdatesToBayutFormat(updates) {
    return mapUpdatesToBayutFormat(updates);
  }

  /**
   * Setup webhook for real-time updates
   */
  async setupWebhook(webhookUrl, events = ['property.created', 'property.updated', 'lead.created']) {
    this.webhookUrl = webhookUrl;
    
    const webhook = {
      url: webhookUrl,
      events: this.mapEventsToBayutFormat(events),
      active: true,
      secret: this.webhookSecret
    };

    const response = await this.makeRequest('POST', '/webhooks', webhook);
    
    if (response.data) {
      return response.data;
    }

    return null;
  }

  mapEventsToBayutFormat(events) {
    return mapEventsToBayutFormat(events);
  }

  /**
   * Handle webhook payload from Bayut
   */
  async handleWebhookPayload(payload) {
    if (!this.validateWebhookSignature(payload, payload.signature, this.webhookSecret)) {
      throw new Error('Invalid webhook signature');
    }

    const result = {
      event: payload.event,
      data: null,
      type: null
    };

    if (payload.event.includes('property')) {
      result.type = 'property';
      result.data = this.normalizeProperty(payload.data);
    } else if (payload.event.includes('lead')) {
      result.type = 'lead';
      result.data = this.normalizeLead(payload.data);
    }

    return result;
  }

  validateWebhookSignature(payload, signature, secret) {
    return validateBayutWebhookSignature(payload, signature, secret);
  }

  /**
   * Normalize Bayut property to standard format
   */
  normalizeProperty(bayutProperty) {
    return super.normalizeProperty(normalizeBayutPropertyData(bayutProperty));
  }

  /**
   * Get Bayut property categories
   */
  async getCategories() {
    const response = await this.makeRequest('GET', '/properties/categories');
    return response.data || [];
  }

  /**
   * Get locations
   */
  async getLocations(city = 'Dubai') {
    const response = await this.makeRequest('GET', `/locations?city=${city}`);
    return response.data || [];
  }

  /**
   * Get agencies
   */
  async getAgencies(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.city) params.append('city', filters.city);
    if (filters.page) params.append('pageNumber', filters.page);

    const response = await this.makeRequest('GET', `/agencies?${params.toString()}`);
    return response.data || [];
  }

  /**
   * Get agency details
   */
  async getAgency(agencyId) {
    const response = await this.makeRequest('GET', `/agencies/${agencyId}`);
    return response.data || null;
  }
}

export default BayutAdapter;

