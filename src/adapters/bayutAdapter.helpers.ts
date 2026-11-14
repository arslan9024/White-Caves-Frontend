// @ts-nocheck
import crypto from 'crypto';

export const mapUpdatesToBayutFormat = (updates: any) => {
  const mapped: any = {};

  if (updates.title) mapped.title = updates.title;
  if (updates.description) mapped.description = updates.description;
  if (updates.price) mapped.price = updates.price;
  if (updates.specifications) {
    if (updates.specifications.bedrooms) mapped.beds = updates.specifications.bedrooms;
    if (updates.specifications.bathrooms) mapped.baths = updates.specifications.bathrooms;
    if (updates.specifications.area) mapped.area = updates.specifications.area;
  }
  if (updates.images) mapped.images = updates.images;
  if (updates.amenities) mapped.amenities = updates.amenities;

  return mapped;
};

export const mapEventsToBayutFormat = (events: string[]) => {
  const mapping: Record<string, string> = {
    'property.created': 'property:created',
    'property.updated': 'property:updated',
    'property.deleted': 'property:deleted',
    'lead.created': 'lead:created',
    'lead.updated': 'lead:updated',
  };

  return events.map(event => mapping[event] || event);
};

export const validateBayutWebhookSignature = (payload: any, signature: string, secret: string) => {
  if (!signature || !secret) return false;

  const payload_string = JSON.stringify(payload.data);
  const computed_signature = crypto
    .createHmac('sha256', secret)
    .update(payload_string)
    .digest('hex');

  return computed_signature === signature;
};

export const normalizeBayutPropertyData = (bayutProperty: any) => {
  return {
    id: bayutProperty.id,
    title: bayutProperty.title,
    description: bayutProperty.description,
    price: bayutProperty.price,
    currency: bayutProperty.currency || 'AED',
    bedrooms: bayutProperty.beds,
    bathrooms: bayutProperty.baths,
    area: bayutProperty.area,
    areaUnit: 'sqft',
    type: bayutProperty.propertyType,
    purpose: bayutProperty.transactionType,
    furnished: bayutProperty.furnish === 'furnished',
    parking: bayutProperty.parking,
    images: bayutProperty.photos || [],
    amenities: bayutProperty.amenities || [],
    location: bayutProperty.location?.name || '',
    city: bayutProperty.location?.city,
    latitude: bayutProperty.location?.lat,
    longitude: bayutProperty.location?.lng,
    agent: bayutProperty.agent,
    createdAt: bayutProperty.createdDate,
    updatedAt: bayutProperty.updatedDate,
    url: bayutProperty.externalUrl || `https://www.bayut.com/property/${bayutProperty.id}`,
    verified: bayutProperty.isVerified,
  };
};
