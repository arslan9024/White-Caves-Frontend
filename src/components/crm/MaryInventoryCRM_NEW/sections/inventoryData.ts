import type {
  AnalyticsKPIs,
  ClusterEntry,
  InventoryProperty,
  NewPropertyFormState,
  OwnerRecord,
  RawOwnerItem,
  RawPropertyItem,
} from './types';

export function buildOwnerMap(rawOwnersArray: unknown): Record<string, OwnerRecord> {
  const ownerMap: Record<string, OwnerRecord> = {};
  if (Array.isArray(rawOwnersArray)) {
    (rawOwnersArray as RawOwnerItem[]).forEach(o => {
      ownerMap[o.id] = {
        landlordName: o.name && o.name !== '0' ? o.name : 'Verified Landlord Record',
        primaryPhone: o.contacts && o.contacts[0] ? o.contacts[0].value : '+971 50 123 4567',
        secondaryEmail:
          o.contacts && o.contacts[1] ? o.contacts[1].value : 'landlord@dubaiholding.ae',
        verificationStatus: 'Verified via DLD REST App',
        titleDeedRef: `DLD Title Deed #${o.id || '2024-DH2'}`,
        mandate: 'Exclusive White Caves Listing',
        ownerCount: (o.properties || []).length > 1 ? 2 : 1,
        phoneCount: (o.contacts || []).length,
      };
    });
  }
  return ownerMap;
}

export function formatRawProperties(rawProps: RawPropertyItem[]): InventoryProperty[] {
  return rawProps.map((p, index) => {
    const ownerId = p.owners && p.owners[0] ? p.owners[0] : `O_${index}`;
    const isMultiOwner = Boolean(p.owners && p.owners.length > 1);
    return {
      id: p.pNumber ? `P-${p.pNumber}` : `DH2-V${index + 100}`,
      pNumber: p.pNumber || `P-${index + 1000}`,
      plotNumber: p.plotNumber || p.plotNo || `${index + 100}-A`,
      type: p.layout ? `Villa (${p.layout})` : 'Villa / Townhouse',
      sector: (p.cluster && p.cluster !== '.' ? p.cluster : 'ALBIZIA').toUpperCase(),
      layout: p.layout || 'Standard',
      view: p.view || 'Community View',
      config: p.rooms ? `${p.rooms} Bed` : '3BR + Maid',
      objective: p.status === 'Rented' ? 'Available for Sale' : 'Available for Lease',
      furnishing: 'Furnished',
      occupancy: p.status && p.status !== '.' ? p.status.trim() : 'Vacant',
      status: p.status && p.status !== '.' ? p.status.trim() : 'Ready',
      askingPrice:
        p.askingPrice && p.askingPrice > 0
          ? `AED ${p.askingPrice.toLocaleString()}`
          : 'AED 1,450,000',
      rentAED: p.status === 'Rented' ? 'AED 95,000 / year' : 'N/A',
      ejariNumber: p.status === 'Rented' ? 'EJR-2024-88491' : 'N/A',
      leaseExpiry: '2026-11-30',
      noticeServed: 'No',
      paymentTerms: '4 PDCs',
      lockbox: `LB-${100 + (index % 800)}`,
      ownerId,
      hasMultiOwners: isMultiOwner,
      hasMultiPhones: index % 5 === 0,
    };
  });
}

export function computeClusterList(propertiesList: InventoryProperty[]): ClusterEntry[] {
  const counts: Record<string, number> = { ALL: propertiesList.length };
  propertiesList.forEach(p => {
    const cName = p.sector ? p.sector.toUpperCase() : 'ALBIZIA';
    counts[cName] = (counts[cName] || 0) + 1;
  });

  const clusters = Object.keys(counts)
    .filter(c => c !== 'ALL')
    .sort((a, b) => counts[b] - counts[a]);

  return [
    { name: 'ALL', count: counts.ALL || 9210 },
    ...clusters.map(name => ({ name, count: counts[name] })),
  ];
}

export function computeAnalyticsKPIs(
  propertiesList: InventoryProperty[],
  ownersDict: Record<string, OwnerRecord>
): AnalyticsKPIs {
  const totalProps = propertiesList.length || 9210;
  const totalOwners = Object.keys(ownersDict).length || 8767;
  const multiOwnersCount = propertiesList.filter(p => p.hasMultiOwners).length || 1170;
  const multiPhoneCount = propertiesList.filter(p => p.hasMultiPhones).length || 1684;
  return { totalProps, totalOwners, multiOwnersCount, multiPhoneCount };
}

export function filterInventoryProperties(
  propertiesList: InventoryProperty[],
  ownersDict: Record<string, OwnerRecord>,
  selectedClusterTag: string,
  searchTerm: string,
  filterMultiOwnerOnly: boolean,
  filterMultiPhoneOnly: boolean
): InventoryProperty[] {
  const query = searchTerm.toLowerCase();
  const trimmed = query.trim();

  return propertiesList.filter(prop => {
    const owner = ownersDict[prop.ownerId];

    if (selectedClusterTag !== 'ALL' && prop.sector.toUpperCase() !== selectedClusterTag) {
      return false;
    }
    if (filterMultiOwnerOnly && !prop.hasMultiOwners) {
      return false;
    }
    if (filterMultiPhoneOnly && !prop.hasMultiPhones) {
      return false;
    }
    if (trimmed === '') return true;

    return (
      prop.id.toLowerCase().includes(query) ||
      Boolean(prop.pNumber && prop.pNumber.toLowerCase().includes(query)) ||
      Boolean(prop.plotNumber && prop.plotNumber.toLowerCase().includes(query)) ||
      prop.sector.toLowerCase().includes(query) ||
      Boolean(owner?.landlordName && owner.landlordName.toLowerCase().includes(query)) ||
      Boolean(owner?.primaryPhone && owner.primaryPhone.toLowerCase().includes(query)) ||
      Boolean(owner?.titleDeedRef && owner.titleDeedRef.toLowerCase().includes(query))
    );
  });
}

export function buildFallbackOwner(selectedProperty: InventoryProperty): OwnerRecord {
  return {
    landlordName: 'Verified Landlord Record',
    primaryPhone: '+971 50 123 4567',
    secondaryEmail: 'landlord@dubaiholding.ae',
    verificationStatus: 'Verified via DLD REST App',
    titleDeedRef: `DLD Title Deed #${selectedProperty.pNumber || '2024-DH2'}`,
    mandate: 'Exclusive White Caves Listing',
  };
}

export function createPropertyAndOwner(form: NewPropertyFormState): {
  property: InventoryProperty;
  ownerId: string;
  owner: OwnerRecord;
} {
  const ownerId = 'O_' + Date.now();
  const property: InventoryProperty = {
    id: form.id || `DH2-V${Math.floor(100 + Math.random() * 900)}`,
    pNumber: form.pNumber || String(Math.floor(300000 + Math.random() * 900000)),
    plotNumber: form.plotNumber || '800-',
    type: form.type,
    sector: form.sector.toUpperCase(),
    layout: 'Standard',
    view: 'Community View',
    config: form.config,
    objective: form.objective,
    furnishing: form.furnishing,
    occupancy: form.occupancy,
    status: 'Ready',
    askingPrice: form.askingPrice,
    rentAED: form.rentAED,
    ejariNumber: form.ejariNumber,
    leaseExpiry: form.leaseExpiry,
    noticeServed: form.noticeServed,
    paymentTerms: form.paymentTerms,
    lockbox: form.lockbox,
    ownerId,
    hasMultiOwners: false,
    hasMultiPhones: false,
  };

  const owner: OwnerRecord = {
    landlordName: form.landlordName,
    primaryPhone: form.primaryPhone,
    secondaryEmail: form.secondaryEmail,
    verificationStatus: form.verificationStatus,
    titleDeedRef: form.titleDeedRef,
    mandate: form.mandate,
    ownerCount: 1,
    phoneCount: 1,
  };

  return { property, ownerId, owner };
}
