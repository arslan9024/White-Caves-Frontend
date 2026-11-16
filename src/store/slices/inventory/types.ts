/** Property record from properties.json */
export interface InventoryProperty {
  pNumber: string;
  area?: string;
  status?: string;
  cluster?: string;
  layout?: string;
  view?: string;
  floor?: string | number;
  rooms?: string | number;
  masterProject?: string;
  project?: string;
  plotNumber?: string;
  owners?: string[];
  [key: string]: unknown;
}

/** Owner record from owners.json */
export interface InventoryOwner {
  id: string;
  name?: string;
  properties?: string[];
  contacts?: Array<{ type: string; value: string }>;
  [key: string]: unknown;
}

/** Ownerships mapping from ownerships.json */
export interface Ownerships {
  byPropertyId: Record<string, string[]>;
  byOwnerId: Record<string, string[]>;
}

/** Manifest metadata from manifest.json */
export interface InventoryManifest {
  sheets: string[];
  clusters: string[];
  stats: Record<string, unknown>;
  filterOptions: Record<string, unknown>;
}

export interface InventoryData {
  properties: {
    byId: Record<string, InventoryProperty>;
    allIds: string[];
  };
  owners: {
    byId: Record<string, InventoryOwner>;
    allIds: string[];
  };
  ownerships: Ownerships;
  manifest: InventoryManifest;
}

export interface InventoryFilters {
  cluster: string | null;
  status: string | null;
  area: string | null;
  layout: string | null;
  view: string | null;
  floor: string | null;
  rooms: string | null;
  masterProject: string | null;
  searchQuery: string;
  showMultiOwner: boolean;
  showMultiPhone: boolean;
  showMultiProperty: boolean;
}

export interface InventoryState {
  properties: {
    byId: Record<string, InventoryProperty>;
    allIds: string[];
  };
  owners: {
    byId: Record<string, InventoryOwner>;
    allIds: string[];
  };
  ownerships: Ownerships;
  manifest: InventoryManifest;
  filters: InventoryFilters;
  selectedPropertyId: string | null;
  selectedOwnerId: string | null;
  loading: boolean;
  error: string | null;
}

