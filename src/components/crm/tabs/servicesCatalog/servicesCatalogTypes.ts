import type { LucideIcon } from 'lucide-react';

export type ServiceTierKey = 'basic' | 'essential' | 'premium' | 'ultra' | 'corporate';

export interface ServiceCategory {
  id: string;
  name: string;
  code: string;
  count: number;
  color: string;
  icon: LucideIcon;
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  category: string;
  tier: ServiceTierKey;
  price: string;
  description: string;
  clients: number;
  rating: number;
  revenue: number;
}
