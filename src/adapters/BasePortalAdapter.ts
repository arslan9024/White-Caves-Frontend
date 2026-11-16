// @ts-nocheck
import {
  normalizePortalLocation,
  normalizePortalSpecifications,
  normalizePortalAgent,
  normalizePortalLead,
  normalizePortalProperty,
} from "./BasePortalAdapter.helpers";

/**
 * BasePortalAdapter
 * 
 * Abstract base class for all real estate portal integrations.
 * Provides standard interface for property and lead data extraction.
 * 
 * Usage:
 * class BayutAdapter extends BasePortalAdapter {
 *   constructor() {
 *     super('bayut', 'https://api.bayut.com');
 *   }
 * }
 */

export class BasePortalAdapter {
  constructor(portalName, apiBaseUrl) {
    if (new.target === BasePortalAdapter) {
      throw new TypeError('Cannot instantiate abstract class BasePortalAdapter');
    }
    
    this.portalName = portalName;
    this.apiBaseUrl = apiBaseUrl;
    this.isConnected = false;
    this.lastSync = null;
    this.syncInterval = 5 * 60 * 1000; // 5 minutes
    this.webhookUrl = null;
    this.apiKey = null;
    this.rateLimitRemaining = 0;
    this.rateLimitReset = null;
    this.requestQueue = [];
    this.isProcessing = false;
  }

  /**
   * Initialize connection to portal API
   * Must be implemented by child classes
   */
  async connect(credentials) {
    throw new Error('connect() must be implemented by subclass');
  }

  /**
   * Disconnect from portal
   */
  async disconnect() {
    this.isConnected = false;
    this.apiKey = null;
  }

  /**
   * Verify connection status
   */
  isHealthy() {
    return this.isConnected && (Date.now() - this.lastSync < 60000);
  }

  /**
   * Get property by ID
   * Must be implemented by child classes
   */
  async getProperty(propertyId) {
    throw new Error('getProperty() must be implemented by subclass');
  }

  /**
   * Search properties with filters
   * Must be implemented by child classes
   */
  async searchProperties(filters = {}) {
    throw new Error('searchProperties() must be implemented by subclass');
  }

  /**
   * Get all properties (paginated)
   * Must be implemented by child classes
   */
  async getAllProperties(page = 1, pageSize = 50) {
    throw new Error('getAllProperties() must be implemented by subclass');
  }

  /**
   * Create a lead on the portal
   * Must be implemented by child classes
   */
  async createLead(leadData) {
    throw new Error('createLead() must be implemented by subclass');
  }

  /**
   * Get leads from portal
   * Must be implemented by child classes
   */
  async getLeads(filters = {}) {
    throw new Error('getLeads() must be implemented by subclass');
  }

  /**
   * Update a property
   * Must be implemented by child classes
   */
  async updateProperty(propertyId, updates) {
    throw new Error('updateProperty() must be implemented by subclass');
  }

  /**
   * Delete a property
   * Must be implemented by child classes
   */
  async deleteProperty(propertyId) {
    throw new Error('deleteProperty() must be implemented by subclass');
  }

  /**
   * Normalize property data to standard format
   * Should be overridden by child classes for portal-specific mapping
   */
  normalizeProperty(portalProperty) {
    return normalizePortalProperty(
      portalProperty,
      this.portalName,
      this.apiBaseUrl,
      p => this.normalizeLocation(p),
      p => this.normalizeSpecifications(p),
      p => this.normalizeAgent(p)
    );
  }

  normalizeLocation(portalProperty) {
    return normalizePortalLocation(portalProperty);
  }

  normalizeSpecifications(portalProperty) {
    return normalizePortalSpecifications(portalProperty);
  }

  normalizeAgent(portalProperty) {
    return normalizePortalAgent(portalProperty);
  }

  normalizeLead(portalLead) {
    return normalizePortalLead(portalLead, this.portalName);
  }

  /**
   * Make API request with rate limiting
   */
  async makeRequest(method, endpoint, data = null, headers = {}) {
    const url = `${this.apiBaseUrl}${endpoint}`;
    
    try {
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
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

      // Check for rate limit exceeded
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
   * Setup webhook for real-time updates
   * Must be implemented by child classes
   */
  async setupWebhook(webhookUrl, events = ['property.created', 'property.updated', 'lead.created']) {
    this.webhookUrl = webhookUrl;
    throw new Error('setupWebhook() must be implemented by subclass');
  }

  /**
   * Handle webhook payload
   * Must be implemented by child classes
   */
  async handleWebhookPayload(payload) {
    throw new Error('handleWebhookPayload() must be implemented by subclass');
  }

  /**
   * Validate webhook signature
   * Must be implemented by child classes
   */
  validateWebhookSignature(payload, signature, secret) {
    throw new Error('validateWebhookSignature() must be implemented by subclass');
  }

  /**
   * Sync all data from portal
   */
  async sync() {
    if (this.isProcessing) {
      
      return;
    }

    this.isProcessing = true;
    const startTime = Date.now();

    try {

      const [properties, leads] = await Promise.all([
        this.getAllProperties(),
        this.getLeads()
      ]);

      this.lastSync = new Date().toISOString();
      
      const duration = Date.now() - startTime;

      return {
        success: true,
        portalName: this.portalName,
        timestamp: this.lastSync,
        duration,
        properties: properties.length,
        leads: leads.length
      };
    } catch (error) {
      
      return {
        success: false,
        portalName: this.portalName,
        error: error.message
      };
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Start auto-sync
   */
  startAutoSync(interval = this.syncInterval) {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
    }

    this.autoSyncInterval = setInterval(() => {
      this.sync().catch(err => {
        this.log('error', 'Auto-sync failed', { error: err?.message || String(err) });
      });
    }, interval);

    // Initial sync
    this.sync();
  }

  /**
   * Stop auto-sync
   */
  stopAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
      
    }
  }

  /**
   * Get sync status
   */
  getSyncStatus() {
    return {
      portalName: this.portalName,
      isConnected: this.isConnected,
      lastSync: this.lastSync,
      isProcessing: this.isProcessing,
      rateLimitRemaining: this.rateLimitRemaining,
      rateLimitReset: this.rateLimitReset,
      health: this.isHealthy() ? 'healthy' : 'unhealthy'
    };
  }

  /**
   * Get adapter info
   */
  getInfo() {
    return {
      name: this.portalName,
      baseUrl: this.apiBaseUrl,
      status: this.getSyncStatus()
    };
  }

  /**
   * Log operation
   */
  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      portal: this.portalName,
      message,
      ...data
    };
    
  }
}

export default BasePortalAdapter;

