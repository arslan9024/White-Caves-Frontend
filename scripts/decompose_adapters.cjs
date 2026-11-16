const fs = require('fs');

// 1. SkyloovAdapter.helpers.ts
const skyloovHelpers = `// @ts-nocheck
import crypto from 'crypto';

export function generateSkyloovSignature(method, endpoint, timestamp, data, apiSecret) {
  const message = \`\${method}\${endpoint}\${timestamp}\${data ? JSON.stringify(data) : ''}\`;
  return crypto
    .createHmac('sha256', apiSecret)
    .update(message)
    .digest('hex');
}

export function mapUpdatesToSkyloovFormat(updates) {
  const mapped = {};
  if (updates.title) mapped.title = updates.title;
  if (updates.description) mapped.description = updates.description;
  if (updates.price) mapped.rentalPrice = updates.price;
  if (updates.images) mapped.images = updates.images;
  if (updates.specifications) {
    if (updates.specifications.bedrooms) mapped.bedrooms = updates.specifications.bedrooms;
    if (updates.specifications.bathrooms) mapped.bathrooms = updates.specifications.bathrooms;
    if (updates.specifications.area) mapped.builtUpArea = updates.specifications.area;
  }
  return mapped;
}

export function mapEventsToSkyloovFormat(events) {
  const mapping = {
    'property.created': 'property.created',
    'property.updated': 'property.updated',
    'property.deleted': 'property.deleted',
    'lead.created': 'inquiry.created',
    'lead.updated': 'inquiry.updated',
    'payment.received': 'payment.received',
    'tenant.created': 'tenant.added',
    'maintenance.created': 'maintenance.requested',
  };
  return events.map(event => mapping[event] || event);
}

export function validateSkyloovWebhookSignature(payload, signature, secret) {
  if (!signature || !secret) return false;
  const timestamp = payload.timestamp;
  const message = \`\${payload.event}\${JSON.stringify(payload.data)}\${timestamp}\`;
  const computed_signature = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');
  return computed_signature === signature;
}

export function formatSkyloovPropertyData(skyloovProperty) {
  return {
    id: skyloovProperty.id,
    title: skyloovProperty.title,
    description: skyloovProperty.description,
    price: skyloovProperty.rentalPrice,
    currency: skyloovProperty.currency || 'AED',
    type: skyloovProperty.type,
    images: skyloovProperty.images || [],
    location: skyloovProperty.address,
    city: skyloovProperty.city,
    latitude: skyloovProperty.latitude,
    longitude: skyloovProperty.longitude,
    tenants: skyloovProperty.tenants || [],
    maintenanceRequests: skyloovProperty.maintenanceRequests || [],
    createdAt: skyloovProperty.createdDate,
    updatedAt: skyloovProperty.updatedDate,
    url: \`https://www.skyloov.com/property/\${skyloovProperty.id}\`,
    status: skyloovProperty.status,
  };
}
`;
fs.writeFileSync('src/adapters/SkyloovAdapter.helpers.ts', skyloovHelpers);

// Update SkyloovAdapter.ts
let skyloovSrc = fs.readFileSync('src/adapters/SkyloovAdapter.ts', 'utf8');

skyloovSrc = skyloovSrc.replace(
  "// @ts-nocheck\nimport crypto from 'crypto';\nimport BasePortalAdapter from './BasePortalAdapter';",
  `// @ts-nocheck
import BasePortalAdapter from './BasePortalAdapter';
import {
  generateSkyloovSignature,
  mapUpdatesToSkyloovFormat,
  mapEventsToSkyloovFormat,
  validateSkyloovWebhookSignature,
  formatSkyloovPropertyData,
} from './SkyloovAdapter.helpers';`
);

skyloovSrc = skyloovSrc.replace(
  /generateSignature\(method, endpoint, timestamp, data = null\) \{[\s\S]*?digest\('hex'\);\n  \}/,
  `generateSignature(method, endpoint, timestamp, data = null) {
    return generateSkyloovSignature(method, endpoint, timestamp, data, this.apiSecret);
  }`
);

skyloovSrc = skyloovSrc.replace(
  /mapUpdatesTOSkyloovFormat\(updates\) \{[\s\S]*?return mapped;\n  \}/,
  `mapUpdatesTOSkyloovFormat(updates) {
    return mapUpdatesToSkyloovFormat(updates);
  }`
);

skyloovSrc = skyloovSrc.replace(
  /mapEventsToSkyloovFormat\(events\) \{[\s\S]*?return events\.map\(event => mapping\[event\] \|\| event\);\n  \}/,
  `mapEventsToSkyloovFormat(events) {
    return mapEventsToSkyloovFormat(events);
  }`
);

skyloovSrc = skyloovSrc.replace(
  /validateWebhookSignature\(payload, signature, secret\) \{[\s\S]*?return computed_signature === signature;\n  \}/,
  `validateWebhookSignature(payload, signature, secret) {
    return validateSkyloovWebhookSignature(payload, signature, secret);
  }`
);

skyloovSrc = skyloovSrc.replace(
  /normalizeProperty\(skyloovProperty\) \{[\s\S]*?return normalized;\n  \}/,
  `normalizeProperty(skyloovProperty) {
    return super.normalizeProperty(formatSkyloovPropertyData(skyloovProperty));
  }`
);

fs.writeFileSync('src/adapters/SkyloovAdapter.ts', skyloovSrc);
console.log('SkyloovAdapter updated');

// 2. PropertyFinderAdapter.helpers.ts
const pfHelpers = `// @ts-nocheck
import crypto from 'crypto';

export function mapUpdatesToPFFormat(updates) {
  const mapped = {};
  if (updates.title) mapped.title = updates.title;
  if (updates.description) mapped.description = updates.description;
  if (updates.price) mapped.price = updates.price;
  if (updates.specifications) {
    if (updates.specifications.bedrooms) mapped.bedrooms = updates.specifications.bedrooms;
    if (updates.specifications.bathrooms) mapped.bathrooms = updates.specifications.bathrooms;
    if (updates.specifications.area) mapped.area = updates.specifications.area;
  }
  if (updates.images) mapped.images = updates.images;
  return mapped;
}

export function mapEventsToPFFormat(events) {
  const mapping = {
    'property.created': 'property.created',
    'property.updated': 'property.updated',
    'property.deleted': 'property.deleted',
    'lead.created': 'lead.created',
    'lead.updated': 'lead.updated',
  };
  return events.map(event => mapping[event] || event);
}

export function validatePFWebhookSignature(payload, signature, secret) {
  if (!signature || !secret) return false;
  const timestamp = payload.timestamp;
  const message = \`\${payload.event}\${JSON.stringify(payload.data)}\${timestamp}\`;
  const computed_signature = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');
  return computed_signature === signature;
}

export function formatPFPropertyData(pfProperty) {
  return {
    id: pfProperty.id,
    title: pfProperty.title,
    description: pfProperty.description,
    price: pfProperty.price,
    currency: pfProperty.currency || 'AED',
    type: pfProperty.property_type,
    purpose: pfProperty.offering_type,
    images: pfProperty.images || [],
    location: pfProperty.location?.address_line_1,
    city: pfProperty.location?.city,
    latitude: pfProperty.location?.coordinates?.latitude,
    longitude: pfProperty.location?.coordinates?.longitude,
    bedrooms: pfProperty.specifications?.bedrooms,
    bathrooms: pfProperty.specifications?.bathrooms,
    area: pfProperty.specifications?.area,
    createdAt: pfProperty.created_at,
    updatedAt: pfProperty.updated_at,
    url: \`https://www.propertyfinder.ae/property/\${pfProperty.id}\`,
    status: pfProperty.status,
  };
}
`;
fs.writeFileSync('src/adapters/PropertyFinderAdapter.helpers.ts', pfHelpers);

// Update PropertyFinderAdapter.ts
let pfSrc = fs.readFileSync('src/adapters/PropertyFinderAdapter.ts', 'utf8');

pfSrc = pfSrc.replace(
  "// @ts-nocheck\nimport crypto from 'crypto';\nimport BasePortalAdapter from './BasePortalAdapter';",
  `// @ts-nocheck
import BasePortalAdapter from './BasePortalAdapter';
import {
  mapUpdatesToPFFormat,
  mapEventsToPFFormat,
  validatePFWebhookSignature,
  formatPFPropertyData,
} from './PropertyFinderAdapter.helpers';`
);

pfSrc = pfSrc.replace(
  /mapUpdatesToPFFormat\(updates\) \{[\s\S]*?return mapped;\n  \}/,
  `mapUpdatesToPFFormat(updates) {
    return mapUpdatesToPFFormat(updates);
  }`
);

pfSrc = pfSrc.replace(
  /mapEventsToPFFormat\(events\) \{[\s\S]*?return events\.map\(event => mapping\[event\] \|\| event\);\n  \}/,
  `mapEventsToPFFormat(events) {
    return mapEventsToPFFormat(events);
  }`
);

pfSrc = pfSrc.replace(
  /validateWebhookSignature\(payload, signature, secret\) \{[\s\S]*?return computed_signature === signature;\n  \}/,
  `validateWebhookSignature(payload, signature, secret) {
    return validatePFWebhookSignature(payload, signature, secret);
  }`
);

pfSrc = pfSrc.replace(
  /normalizeProperty\(pfProperty\) \{[\s\S]*?return normalized;\n  \}/,
  `normalizeProperty(pfProperty) {
    return super.normalizeProperty(formatPFPropertyData(pfProperty));
  }`
);

fs.writeFileSync('src/adapters/PropertyFinderAdapter.ts', pfSrc);
console.log('PropertyFinderAdapter updated');
