export type DashboardTab = 'overview' | 'favorites' | 'searches' | 'alerts' | 'activity';

export interface UserStats {
  totalViews: number;
  totalInquiries: number;
  scheduledViewings: number;
}

export interface FavoriteItem {
  propertyId: string | number;
  createdAt?: string | Date;
}

export interface SavedSearch {
  _id: string;
  name: string;
  createdAt?: string | Date;
  criteria?: {
    location?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
  };
}

export interface UserAlert {
  _id: string;
  name: string;
  type: string;
  active: boolean;
  frequency: string;
  notificationMethod?: string;
  criteria?: {
    location?: string;
    maxPrice?: number;
  };
}

export interface PropertyItem {
  id: string | number;
  title: string;
  location?: string;
  price: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  images?: string[];
}
