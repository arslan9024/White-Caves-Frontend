// @ts-nocheck
import crypto from 'crypto';

export function generateSkyloovSignature(method, endpoint, timestamp, data, apiSecret) {
  const message = `${method}${endpoint}${timestamp}${data ? JSON.stringify(data) : ''}`;
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
  const message = `${payload.event}${JSON.stringify(payload.data)}${timestamp}`;
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
    url: `https://www.skyloov.com/property/${skyloovProperty.id}`,
    status: skyloovProperty.status,
  };
}

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

