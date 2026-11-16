// @ts-nocheck
export function normalizePortalLocation(portalProperty) {
  return {
    address: portalProperty.location || portalProperty.address,
    city: portalProperty.city,
    state: portalProperty.state || portalProperty.area,
    zipCode: portalProperty.zipCode || portalProperty.postCode,
    country: portalProperty.country || "UAE",
    latitude: portalProperty.latitude,
    longitude: portalProperty.longitude,
    coordinates: {
      lat: portalProperty.latitude,
      lng: portalProperty.longitude
    }
  };
}

export function normalizePortalSpecifications(portalProperty) {
  return {
    bedrooms: portalProperty.bedrooms || portalProperty.beds,
    bathrooms: portalProperty.bathrooms || portalProperty.baths,
    area: portalProperty.area || portalProperty.sqft,
    areaUnit: portalProperty.areaUnit || "sqft",
    type: portalProperty.type || portalProperty.propertyType,
    purpose: portalProperty.purpose || portalProperty.transactionType,
    furnished: portalProperty.furnished || false,
    parking: portalProperty.parking || 1,
    yearBuilt: portalProperty.yearBuilt || portalProperty.built
  };
}

export function normalizePortalAgent(portalProperty) {
  const agent = portalProperty.agent || portalProperty.contact || {};
  return {
    id: agent.id,
    name: agent.name,
    email: agent.email,
    phone: agent.phone,
    whatsapp: agent.whatsapp,
    avatar: agent.avatar || agent.image,
    agency: agent.agency || agent.company,
    verified: agent.verified || false
  };
}

export function normalizePortalLead(portalLead, portalName) {
  return {
    id: portalLead.id,
    portalId: portalName,
    name: portalLead.name,
    email: portalLead.email,
    phone: portalLead.phone,
    whatsapp: portalLead.whatsapp || portalLead.phone,
    message: portalLead.message || portalLead.inquiry,
    propertyId: portalLead.propertyId,
    leadType: portalLead.leadType || "inquiry",
    source: portalName,
    status: portalLead.status || "new",
    createdAt: portalLead.createdAt || new Date().toISOString(),
    updatedAt: portalLead.updatedAt || new Date().toISOString(),
    raw: portalLead
  };
}

export function normalizePortalProperty(portalProperty, portalName, apiBaseUrl, normalizeLocationFn, normalizeSpecificationsFn, normalizeAgentFn) {
  return {
    id: portalProperty.id,
    portalId: portalName,
    title: portalProperty.title || portalProperty.name,
    description: portalProperty.description,
    price: portalProperty.price,
    currency: portalProperty.currency || "AED",
    location: normalizeLocationFn(portalProperty),
    specifications: normalizeSpecificationsFn(portalProperty),
    images: portalProperty.images || [],
    amenities: portalProperty.amenities || [],
    agent: normalizeAgentFn(portalProperty),
    createdAt: portalProperty.createdAt || new Date().toISOString(),
    updatedAt: portalProperty.updatedAt || new Date().toISOString(),
    portalUrl: portalProperty.url || (apiBaseUrl + "/property/" + portalProperty.id),
    raw: portalProperty
  };
}

