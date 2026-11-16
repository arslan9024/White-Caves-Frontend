import { FeatureCategory, FeatureStats, CategoryInfo, PlatformFeature, FEATURE_CATEGORIES, FEATURE_STATUS } from './platformFeatures.types';
import { PLATFORM_FEATURES } from './platformFeatures.data';

export const getFeaturesByCategory = (category: FeatureCategory): readonly PlatformFeature[] => {
  return PLATFORM_FEATURES.filter(f => f.category === category);
};

export const getFeatureById = (id: string): PlatformFeature | undefined => {
  return PLATFORM_FEATURES.find(f => f.id === id);
};

export const getActiveFeatures = (): readonly PlatformFeature[] => {
  return PLATFORM_FEATURES.filter(f => f.status === FEATURE_STATUS.ACTIVE);
};

export const getFeatureStats = (): FeatureStats => {
  const byCategory: Record<string, number> = {};
  const byStatus: Record<string, number> = {};

  PLATFORM_FEATURES.forEach(f => {
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
    byStatus[f.status] = (byStatus[f.status] || 0) + 1;
  });

  return {
    total: PLATFORM_FEATURES.length,
    byCategory,
    byStatus,
  };
};

// ---------------------------------------------------------------------------
// Category Info Lookup
// ---------------------------------------------------------------------------

export const CATEGORY_INFO: Record<FeatureCategory, CategoryInfo> = {
  [FEATURE_CATEGORIES.AUTHENTICATION]: { name: 'Authentication', icon: '🔐', color: '#E31E24' },
  [FEATURE_CATEGORIES.USER_MANAGEMENT]: { name: 'User Management', icon: '👥', color: '#2563EB' },
  [FEATURE_CATEGORIES.PROPERTY]: { name: 'Property', icon: '🏠', color: '#16A34A' },
  [FEATURE_CATEGORIES.TRANSACTIONS]: { name: 'Transactions', icon: '💰', color: '#E31E24' },
  [FEATURE_CATEGORIES.COMMUNICATION]: { name: 'Communication', icon: '💬', color: '#8B5CF6' },
  [FEATURE_CATEGORIES.ANALYTICS]: { name: 'Analytics', icon: '📊', color: '#EC4899' },
  [FEATURE_CATEGORIES.INTEGRATIONS]: { name: 'Integrations', icon: '🔗', color: '#14B8A6' },
  [FEATURE_CATEGORIES.UI_COMPONENTS]: { name: 'UI Components', icon: '🎨', color: '#F59E0B' },
  [FEATURE_CATEGORIES.TOOLS]: { name: 'Tools & Calculators', icon: '🧮', color: '#6366F1' },
  [FEATURE_CATEGORIES.SYSTEM]: { name: 'System', icon: '⚙️', color: '#64748B' },
};

