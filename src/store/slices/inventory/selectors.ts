/* eslint-disable security/detect-object-injection */
import { createSelector } from "@reduxjs/toolkit";
import type { InventoryState } from "./types";

const selectInventory = (state: { inventory: InventoryState }) => state.inventory;
const selectProperties = (state: { inventory: InventoryState }) => state.inventory.properties;
export const selectOwners = (state: { inventory: InventoryState }) => state.inventory.owners;
const selectOwnerships = (state: { inventory: InventoryState }) => state.inventory.ownerships;
export const selectFilters = (state: { inventory: InventoryState }) => state.inventory.filters;
const selectManifest = (state: { inventory: InventoryState }) => state.inventory.manifest;

export const selectAllProperties = createSelector(
  [selectProperties],
  (properties) => properties.allIds.map((id: string) => properties.byId[id])
);

export const selectAllOwners = createSelector(
  [selectOwners],
  (owners) => owners.allIds.map((id: string) => owners.byId[id])
);

export const selectMultiOwnerProperties = createSelector(
  [selectAllProperties],
  (properties) => properties.filter(p => p.owners && p.owners.length > 1)
);

export const selectOwnersWithMultipleProperties = createSelector(
  [selectAllOwners],
  (owners) => owners.filter(o => o.properties && o.properties.length > 1)
);

export const selectOwnersWithMultiplePhones = createSelector(
  [selectAllOwners],
  (owners) => owners.filter((o) => {
    const phones = o.contacts?.filter((c) => c.type === 'mobile' || c.type === 'phone') || [];
    return phones.length > 1;
  })
);

export const selectUniqueClusters = createSelector(
  [selectManifest],
  (manifest) => manifest.clusters || []
);

export const selectUniqueAreas = createSelector(
  [selectAllProperties],
  (properties) => [...new Set(properties.map(p => p.area).filter(Boolean))].sort()
);

export const selectUniqueStatuses = createSelector(
  [selectAllProperties],
  (properties) => [...new Set(properties.map(p => p.status).filter(Boolean))].sort()
);

export const selectFilterOptions = createSelector(
  [selectManifest],
  (manifest) => ({
    ...manifest.filterOptions,
    clusters: manifest.clusters || []
  })
);

export const selectActiveFiltersCount = createSelector(
  [selectFilters],
  (filters: InventoryFilters) => {
    const filterKeys: (keyof InventoryFilters)[] = ['cluster', 'status', 'area', 'layout', 'view', 'floor', 'rooms', 'masterProject'];
    return filterKeys.filter(key => filters[key] !== null).length;
  }
);

export const selectFilteredProperties = createSelector(
  [selectAllProperties, selectFilters, selectOwners],
  (properties: InventoryProperty[], filters: InventoryFilters, owners: { byId: Record<string, InventoryOwner>; allIds: string[] }) => {
    return properties.filter((property: InventoryProperty) => {
      if (filters.cluster && property.cluster !== filters.cluster) return false;
      if (filters.status && property.status !== filters.status) return false;
      if (filters.area && property.area !== filters.area) return false;
      if (filters.layout && property.layout !== filters.layout) return false;
      if (filters.view && property.view !== filters.view) return false;
      if (filters.floor && String(property.floor) !== filters.floor) return false;
      if (filters.rooms && String(property.rooms) !== filters.rooms) return false;
      if (filters.masterProject && property.masterProject !== filters.masterProject) return false;
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesPNumber = property.pNumber?.toLowerCase().includes(query);
        const matchesProject = property.project?.toLowerCase().includes(query);
        const matchesPlot = property.plotNumber?.toLowerCase().includes(query);
        const matchesOwnerName = property.owners?.some((oid: string) => {
          const owner = owners.byId[oid];
          return owner?.name?.toLowerCase().includes(query);
        });
        if (!matchesPNumber && !matchesProject && !matchesPlot && !matchesOwnerName) return false;
      }
      
      if (filters.showMultiOwner && (!property.owners || property.owners.length <= 1)) return false;
      
      if (filters.showMultiPhone) {
        const hasOwnerWithMultiPhone = property.owners?.some((oid: string) => {
          const owner = owners.byId[oid];
          if (!owner) return false;
          const phones = owner.contacts?.filter((c) => ['mobile', 'phone', 'secondaryMobile'].includes(c.type)) || [];
          return phones.length > 1;
        });
        if (!hasOwnerWithMultiPhone) return false;
      }
      
      if (filters.showMultiProperty) {
        const hasOwnerWithMultiProps = property.owners?.some((oid: string) => {
          const owner = owners.byId[oid];
          return owner?.properties?.length && owner.properties.length > 1;
        });
        if (!hasOwnerWithMultiProps) return false;
      }
      
      return true;
    });
  }
);

export const selectFilteredOwners = createSelector(
  [selectAllOwners, selectFilters],
  (owners: InventoryOwner[], filters: InventoryFilters) => {
    return owners.filter((owner: InventoryOwner) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!owner.name?.toLowerCase().includes(query)) return false;
      }
      
      if (filters.showMultiPhone) {
        const phones = owner.contacts?.filter((c) => c.type === 'mobile' || c.type === 'phone') || [];
        if (phones.length <= 1) return false;
      }
      
      if (filters.showMultiProperty) {
        if (!owner.properties || owner.properties.length <= 1) return false;
      }
      
      return true;
    });
  }
);

export const selectPropertyById = (propertyId: string) => createSelector(
  [selectProperties],
  (properties) => properties.byId[propertyId]
);

export const selectOwnerById = (ownerId: string) => createSelector(
  [selectOwners],
  (owners) => owners.byId[ownerId]
);

export const selectOwnersByPropertyId = (propertyId: string) => createSelector(
  [selectOwnerships, selectOwners],
  (ownerships, owners) => {
    const ownerIds = ownerships.byPropertyId[propertyId] || [];
    return ownerIds.map((id: string) => owners.byId[id]).filter(Boolean);
  }
);

export const selectPropertiesByOwnerId = (ownerId: string) => createSelector(
  [selectOwnerships, selectProperties],
  (ownerships, properties) => {
    const propertyIds = ownerships.byOwnerId[ownerId] || [];
    return propertyIds.map((id: string) => properties.byId[id]).filter(Boolean);
  }
);

export const selectInventoryStats = createSelector(
  [selectManifest],
  (manifest) => manifest.stats || {}
);

export const selectSheetsMeta = createSelector(
  [selectManifest],
  (manifest) => manifest.sheets || []
);


