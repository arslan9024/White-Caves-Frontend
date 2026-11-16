import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../authSlice";
import { getErrorMessage } from "../../constants";
import type {
  InventoryProperty,
  InventoryOwner,
  Ownerships,
  InventoryManifest,
  InventoryData,
  InventoryFilters,
  InventoryState,
} from "./inventory/types";

// ── Re-exports ──
export type * from "./inventory/types";
export * from "./inventory/selectors";

export const loadInventoryData = createAsyncThunk<
  InventoryData,
  void,
  { rejectValue: string }
>(
  'inventory/loadData',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch JSON data from public/ at runtime — zero bundle size impact
      const safeFetch = async (url: string): Promise<unknown> => {
        const r = await fetch(url);
        if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
        return r.json();
      };

      // Use Promise.allSettled for error isolation — partial failures don't kill the whole load
      const results = await Promise.allSettled([
        safeFetch('/data/damacHills2/properties.json'),
        safeFetch('/data/damacHills2/owners.json'),
        safeFetch('/data/damacHills2/ownerships.json'),
        safeFetch('/data/damacHills2/manifest.json')
      ]);

      // Check for any failures
      const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
      if (failures.length > 0) {
        throw new Error(`Failed to load inventory: ${failures.map(f => f.reason?.message || 'Unknown error').join('; ')}`);
      }

      const [propertiesData, ownersData, ownershipsData, manifestData] = (results as PromiseFulfilledResult<unknown>[]).map(r => r.value);

      const propertiesById: Record<string, InventoryProperty> = {};
      const propertyIds: string[] = [];
      (propertiesData as InventoryProperty[]).forEach((p: InventoryProperty) => {
        propertiesById[p.pNumber] = p;
        propertyIds.push(p.pNumber);
      });
      
      const ownersById: Record<string, InventoryOwner> = {};
      const ownerIds: string[] = [];
      (ownersData as InventoryOwner[]).forEach((o: InventoryOwner) => {
        ownersById[o.id] = o;
        ownerIds.push(o.id);
      });
      
      return {
        properties: { byId: propertiesById, allIds: propertyIds },
        owners: { byId: ownersById, allIds: ownerIds },
        ownerships: ownershipsData as Ownerships,
        manifest: manifestData as InventoryManifest
      };
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Failed to load inventory data');
      return rejectWithValue(message);
    }
  }
);

const initialState: InventoryState = {
  properties: { byId: {}, allIds: [] },
  owners: { byId: {}, allIds: [] },
  ownerships: { byPropertyId: {}, byOwnerId: {} },
  manifest: { sheets: [], clusters: [], stats: {}, filterOptions: {} },
  filters: {
    cluster: null,
    status: null,
    area: null,
    layout: null,
    view: null,
    floor: null,
    rooms: null,
    masterProject: null,
    searchQuery: '',
    showMultiOwner: false,
    showMultiPhone: false,
    showMultiProperty: false
  },
  selectedPropertyId: null,
  selectedOwnerId: null,
  loading: false,
  error: null
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ key: keyof InventoryFilters; value: string | boolean | null }>) => {
      const { key, value } = action.payload;
      (state.filters[key] as string | boolean | null) = value;
    },
    clearFilters: (state) => {
      state.filters = {
        cluster: null,
        status: null,
        area: null,
        layout: null,
        view: null,
        floor: null,
        rooms: null,
        masterProject: null,
        searchQuery: '',
        showMultiOwner: false,
        showMultiPhone: false,
        showMultiProperty: false
      };
    },
    selectProperty: (state, action: PayloadAction<string>) => {
      state.selectedPropertyId = action.payload;
    },
    selectOwner: (state, action: PayloadAction<string>) => {
      state.selectedOwnerId = action.payload;
    },
    toggleMultiOwnerFilter: (state) => {
      state.filters.showMultiOwner = !state.filters.showMultiOwner;
    },
    toggleMultiPhoneFilter: (state) => {
      state.filters.showMultiPhone = !state.filters.showMultiPhone;
    },
    toggleMultiPropertyFilter: (state) => {
      state.filters.showMultiProperty = !state.filters.showMultiProperty;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInventoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInventoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.owners = action.payload.owners;
        state.ownerships = action.payload.ownerships;
        state.manifest = action.payload.manifest;
      })
      .addCase(loadInventoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

    // --- SECURITY: Reset inventory data on logout ---
    builder.addCase(logout, () => initialState);
  }
});

export const {
  setFilter,
  clearFilters,
  selectProperty,
  selectOwner,
  toggleMultiOwnerFilter,
  toggleMultiPhoneFilter,
  toggleMultiPropertyFilter
} = inventorySlice.actions;


export default inventorySlice.reducer;

