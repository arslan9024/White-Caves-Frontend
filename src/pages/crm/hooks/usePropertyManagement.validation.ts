import { Property, PropertyFormData } from './usePropertyManagement.types';
import { MAX_PRICE, MAX_BEDROOMS, MAX_BATHROOMS, MAX_SQFT } from '../../../utils/validation';

export function validatePropertyFormData(formData: PropertyFormData): {
  error: string | null;
  parsed: { price: number; bedrooms: number; bathrooms: number; sqft: number };
} {
  if (!formData.title.trim() || !formData.location.trim()) {
    return {
      error: 'Title and location are required.',
      parsed: { price: 0, bedrooms: 0, bathrooms: 0, sqft: 0 },
    };
  }

  const price = Number(formData.price);
  if (isNaN(price) || price < 0 || price > MAX_PRICE) {
    return {
      error: `Price must be between 0 and ${MAX_PRICE.toLocaleString()} AED`,
      parsed: { price: 0, bedrooms: 0, bathrooms: 0, sqft: 0 },
    };
  }

  const bedrooms = formData.bedrooms ? Number(formData.bedrooms) : 0;
  if (isNaN(bedrooms) || bedrooms < 0 || bedrooms > MAX_BEDROOMS) {
    return {
      error: `Bedrooms must be between 0 and ${MAX_BEDROOMS}`,
      parsed: { price, bedrooms: 0, bathrooms: 0, sqft: 0 },
    };
  }

  const bathrooms = formData.bathrooms ? Number(formData.bathrooms) : 0;
  if (isNaN(bathrooms) || bathrooms < 0 || bathrooms > MAX_BATHROOMS) {
    return {
      error: `Bathrooms must be between 0 and ${MAX_BATHROOMS}`,
      parsed: { price, bedrooms, bathrooms: 0, sqft: 0 },
    };
  }

  const sqft = formData.sqft ? Number(formData.sqft) : 0;
  if (isNaN(sqft) || sqft < 0 || sqft > MAX_SQFT) {
    return {
      error: `Square footage must be between 0 and ${MAX_SQFT.toLocaleString()}`,
      parsed: { price, bedrooms, bathrooms, sqft: 0 },
    };
  }

  return { error: null, parsed: { price, bedrooms, bathrooms, sqft } };
}

export function buildPropertyPayload(
  formData: PropertyFormData,
  parsed: { price: number; bedrooms: number; bathrooms: number; sqft: number }
) {
  return {
    title: formData.title.trim(),
    type: formData.type,
    status: formData.status,
    location: formData.location.trim(),
    price: parsed.price,
    bedrooms: parsed.bedrooms,
    bathrooms: parsed.bathrooms,
    sqft: parsed.sqft,
    description: formData.description.trim(),
    agent_name: formData.agent_name.trim(),
    featured: formData.featured,
    created_at: new Date().toISOString(),
  };
}

export function populateEditForm(property: Property): PropertyFormData {
  return {
    title: property.title,
    type: property.type,
    status: property.status,
    location: property.location,
    price: property.price?.toString() || '',
    bedrooms: property.bedrooms?.toString() || '',
    bathrooms: property.bathrooms?.toString() || '',
    sqft: property.sqft?.toString() || '',
    description: property.description || '',
    agent_name: property.agent_name || '',
    featured: property.featured || false,
  };
}
