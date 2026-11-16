// @ts-nocheck
import crypto from 'crypto';

export function mapEventsToDubizzleFormat(events: string[]): string[] {
  const mapping: Record<string, string> = {
    'property.created': 'listing.created',
    'property.updated': 'listing.updated',
    'property.deleted': 'listing.deleted',
    'lead.created': 'inquiry.created',
    'lead.updated': 'inquiry.updated'
  };

  return events.map(event => mapping[event] || event);
}

export function mapUpdatesToDubizzleFormat(updates: any): Record<string, any> {
  const mapped: Record<string, any> = {};

  if (updates.title) mapped.title = updates.title;
  if (updates.description) mapped.description = updates.description;
  if (updates.price) mapped.price = updates.price;
  if (updates.specifications?.bedrooms) {
    mapped.rooms = updates.specifications.bedrooms;
  }
  if (updates.images) mapped.images = updates.images;

  return mapped;
}

export function validateDubizzleWebhookSignature(payload: any, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;

  const payload_string = JSON.stringify(payload.data);
  const computed_signature = crypto
    .createHmac('sha256', secret)
    .update(payload_string)
    .digest('hex');

  return computed_signature === signature;
}

export function formatDubizzleListingPayload(listingData: any): Record<string, any> {
  return {
    category: 'real-estate',
    subcategory: listingData.type,
    title: listingData.title,
    description: listingData.description,
    price: listingData.price,
    offerType: listingData.purpose === 'rent' ? 'rent' : 'sale',
    rooms: listingData.specifications?.bedrooms,
    location: listingData.location?.address,
    images: listingData.images || [],
    contact: {
      name: listingData.name,
      email: listingData.email,
      phone: listingData.phone
    }
  };
}

