// @ts-nocheck
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
  const message = `${payload.event}${JSON.stringify(payload.data)}${timestamp}`;
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
    url: `https://www.propertyfinder.ae/property/${pfProperty.id}`,
    status: pfProperty.status,
  };
}

