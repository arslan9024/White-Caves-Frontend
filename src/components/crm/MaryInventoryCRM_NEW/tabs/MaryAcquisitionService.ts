import { AcquisitionFormData, AcquisitionPayload } from './MaryAcquisitionTypes';
import { authFetch } from '../../../../utils/authFetch';

export function buildAcquisitionPayload(form: AcquisitionFormData): AcquisitionPayload {
  return {
    title: form.title,
    type: form.type,
    unitNumber: form.unitNumber || undefined,
    floorPlan: form.floorPlan || undefined,
    area: form.area || undefined,
    location: form.location,
    bedrooms: parseInt(form.bedrooms, 10) || 0,
    bathrooms: parseInt(form.bathrooms, 10) || 0,
    sqft: parseInt(form.sqft, 10) || 0,
    price: parseFloat(form.rentalPrice) || 0,
    rentalPrice: parseFloat(form.rentalPrice) || undefined,
    commissionPercent: parseFloat(form.commissionPercent) || 5,
    currency: form.currency,
    availabilityDate: form.availabilityDate || undefined,
    agentName: form.landlordName || undefined,
    inventoryStage: 'draft_collected',
    titleDeedMissing: !form.hasTitleDeed,
    landlordPassportMissing: !form.hasLandlordPassport,
    ejariMissing: !form.hasEjari,
    description: form.notes || undefined,
  };
}

export async function submitAcquisition(payload: AcquisitionPayload): Promise<void> {
  const res = await authFetch('/api/properties', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || `Server error: ${res.status}`);
  }
}
