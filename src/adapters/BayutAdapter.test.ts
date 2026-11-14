import { describe, it, expect } from 'vitest';
import BayutAdapter from './BayutAdapter';
import {
  mapUpdatesToBayutFormat,
  mapEventsToBayutFormat,
  validateBayutWebhookSignature,
} from './bayutAdapter.helpers';

describe('BayutAdapter', () => {
  it('instantiates cleanly and inherits BasePortalAdapter', () => {
    const adapter = new BayutAdapter();
    expect(adapter).toBeDefined();
    expect(adapter.portalName).toBe('bayut');
  });

  it('correctly maps updates and webhook events', () => {
    const updates = mapUpdatesToBayutFormat({
      title: 'Luxury Villa',
      price: 5000000,
      specifications: { bedrooms: 4, bathrooms: 5, area: 4500 },
    });
    expect(updates.title).toBe('Luxury Villa');
    expect(updates.price).toBe(5000000);
    expect(updates.beds).toBe(4);

    const events = mapEventsToBayutFormat(['property.created', 'lead.created']);
    expect(events).toEqual(['property:created', 'lead:created']);
  });

  it('validates webhook signature correctly', () => {
    expect(validateBayutWebhookSignature({}, '', '')).toBe(false);
  });
});
