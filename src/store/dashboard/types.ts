import {
  type Property,
  type Lead,
  type RegulatoryContract,
  mockProperties,
  mockLeads,
  mockRegulatoryContracts,
} from "../../mocks/dubaiRealEstateMocks";

export interface FavoriteItem {
  id: string;
  title: string;
  location: string;
  price: string;
  image?: string;
}

export interface RecentlyViewedItem {
  id: string;
  title: string;
  location: string;
  price: string;
  image?: string;
  viewedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  type?: string;
  timestamp?: string;
  title?: string;
}

export interface NotificationState {
  unreadCount: number;
  items: Notification[];
}

export interface LoadingState {
  metrics: boolean;
  properties: boolean;
  leads: boolean;
  [key: string]: boolean;
}

export interface Metrics {
  buyer: Record<string, unknown> | null;
  seller: Record<string, unknown> | null;
  landlord: Record<string, unknown> | null;
  tenant: Record<string, unknown> | null;
  leasingAgent: Record<string, unknown> | null;
  salesAgent: Record<string, unknown> | null;
  owner: Record<string, unknown> | null;
  [key: string]: Record<string, unknown> | null | undefined;
}

export interface DashboardState {
  activeTabs: { [key: string]: string };
  filters: { [key: string]: unknown };
  metrics: Metrics;
  loading: LoadingState;
  error: string | null;
  favorites: FavoriteItem[];
  favoriteIds: string[];
  favoritesLoading: boolean;
  recentlyViewed: RecentlyViewedItem[];
  notifications: NotificationState;
  pipelineStages: {
    leasing: string[];
    sales: string[];
  };
  properties: Property[];
  leads: Lead[];
  contracts: RegulatoryContract[];
  isOfflineMode: boolean;
}


const initialState: DashboardState = {
  activeTabs: {},
  filters: {},
  metrics: {
    buyer: null,
    seller: null,
    landlord: null,
    tenant: null,
    leasingAgent: null,
    salesAgent: null,
    owner: null,
  },
  loading: {
    metrics: false,
    properties: false,
    leads: false,
  },
  error: null,
  favorites: [],
  favoriteIds: [],
  favoritesLoading: false,
  recentlyViewed: [],
  notifications: {
    unreadCount: 0,
    items: [],
  },
  pipelineStages: {
    leasing: ['Lead', 'Qualified', 'Viewing', 'Negotiation', 'Documentation', 'Closing'],
    sales: [
      'Lead',
      'Qualified',
      'Viewing',
      'Negotiation',
      'Due Diligence',
      'Documentation',
      'Closing',
    ],
  },
  properties: mockProperties,
  leads: mockLeads,
  contracts: mockRegulatoryContracts,
  isOfflineMode: true,
};

export { initialState };

