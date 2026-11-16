const fs = require('fs');

let helpers = fs.readFileSync('src/adapters/SkyloovAdapter.helpers.ts', 'utf8');

const extraHelpers = `
export function handleSkyloovWebhook(payload, isValidSignature, normalizePropertyFn, normalizeLeadFn) {
  if (!isValidSignature) {
    throw new Error('Invalid webhook signature');
  }

  const result = {
    event: payload.event,
    data: payload.data,
    type: null,
  };

  if (payload.event?.includes('property')) {
    result.type = 'property';
    result.data = normalizePropertyFn(payload.data);
  } else if (payload.event?.includes('inquiry')) {
    result.type = 'lead';
    result.data = normalizeLeadFn(payload.data);
  } else if (payload.event?.includes('payment')) {
    result.type = 'payment';
  } else if (payload.event?.includes('maintenance')) {
    result.type = 'maintenance';
  }

  return result;
}

export function buildMaintenanceRequest(requestData) {
  return {
    title: requestData.title,
    description: requestData.description,
    category: requestData.category,
    priority: requestData.priority || 'normal',
    assignedTo: requestData.assignedTo,
  };
}

export function buildFilterParams(filters, allowedKeys) {
  const params = new URLSearchParams();
  for (const key of allowedKeys) {
    if (filters[key] !== undefined && filters[key] !== null) {
      params.append(key, filters[key]);
    }
  }
  return params.toString();
}
`;

helpers += extraHelpers;
fs.writeFileSync('src/adapters/SkyloovAdapter.helpers.ts', helpers);

let adapter = fs.readFileSync('src/adapters/SkyloovAdapter.ts', 'utf8');

// Add new helper imports
adapter = adapter.replace(
  "formatSkyloovPropertyData,\n} from './SkyloovAdapter.helpers';",
  "formatSkyloovPropertyData,\n  handleSkyloovWebhook,\n  buildMaintenanceRequest,\n  buildFilterParams,\n} from './SkyloovAdapter.helpers';"
);

// Delegate handleWebhookPayload
adapter = adapter.replace(
  /async handleWebhookPayload\(payload\) \{[\s\S]*?return result;\n  \}/,
  `async handleWebhookPayload(payload) {
    const isValid = this.validateWebhookSignature(payload, payload.signature, this.webhookSecret);
    return handleSkyloovWebhook(payload, isValid, p => this.normalizeProperty(p), l => this.normalizeLead(l));
  }`
);

// Delegate createMaintenanceRequest
adapter = adapter.replace(
  /async createMaintenanceRequest\(propertyId, requestData\) \{[\s\S]*?return response\.data \|\| null;\n  \}/,
  `async createMaintenanceRequest(propertyId, requestData) {
    const request = buildMaintenanceRequest(requestData);
    const response = await this.makeRequest('POST', \`/properties/\${propertyId}/maintenance-requests\`, request);
    return response.data || null;
  }`
);

// Delegate getMaintenanceRequests
adapter = adapter.replace(
  /async getMaintenanceRequests\(propertyId, filters = \{\}\) \{[\s\S]*?return \[\];\n  \}/,
  `async getMaintenanceRequests(propertyId, filters = {}) {
    const qs = buildFilterParams(filters, ['status', 'priority']);
    const response = await this.makeRequest('GET', \`/properties/\${propertyId}/maintenance-requests\${qs ? '?' + qs : ''}\`);
    return (response.data && Array.isArray(response.data)) ? response.data : [];
  }`
);

// Delegate getPayments
adapter = adapter.replace(
  /async getPayments\(propertyId, filters = \{\}\) \{[\s\S]*?return \[\];\n  \}/,
  `async getPayments(propertyId, filters = {}) {
    const qs = buildFilterParams(filters, ['status', 'dateFrom', 'dateTo']);
    const response = await this.makeRequest('GET', \`/properties/\${propertyId}/payments\${qs ? '?' + qs : ''}\`);
    return (response.data && Array.isArray(response.data)) ? response.data : [];
  }`
);

// Delegate getTenants
adapter = adapter.replace(
  /async getTenants\(propertyId, filters = \{\}\) \{[\s\S]*?return \[\];\n  \}/,
  `async getTenants(propertyId, filters = {}) {
    const qs = buildFilterParams(filters, ['status']);
    const response = await this.makeRequest('GET', \`/properties/\${propertyId}/tenants\${qs ? '?' + qs : ''}\`);
    return (response.data && Array.isArray(response.data)) ? response.data : [];
  }`
);

fs.writeFileSync('src/adapters/SkyloovAdapter.ts', adapter);
console.log('SkyloovAdapter trimmed successfully');
