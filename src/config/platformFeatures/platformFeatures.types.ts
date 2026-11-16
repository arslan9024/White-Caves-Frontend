// Platform Features Types
export const FEATURE_CATEGORIES = {
  AUTHENTICATION: 'authentication',
  USER_MANAGEMENT: 'user_management',
  PROPERTY: 'property',
  TRANSACTIONS: 'transactions',
  COMMUNICATION: 'communication',
  ANALYTICS: 'analytics',
  INTEGRATIONS: 'integrations',
  UI_COMPONENTS: 'ui_components',
  TOOLS: 'tools',
  SYSTEM: 'system',
} as const;

export const FEATURE_STATUS = {
  ACTIVE: 'active',
  BETA: 'beta',
  DEVELOPMENT: 'development',
  PLANNED: 'planned',
  DEPRECATED: 'deprecated',
} as const;

// ---------------------------------------------------------------------------
// Derived Types from const assertions
// ---------------------------------------------------------------------------

type FeatureCategory = (typeof FEATURE_CATEGORIES)[keyof typeof FEATURE_CATEGORIES];
type FeatureStatus = (typeof FEATURE_STATUS)[keyof typeof FEATURE_STATUS];

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface PlatformFeature {
  readonly id: string;
  readonly name: string;
  readonly category: FeatureCategory;
  readonly status: FeatureStatus;
  readonly icon: string;
  readonly description: string;
  readonly details: readonly string[];
  readonly implementedDate: string;
  readonly files: readonly string[];
}

export interface FeatureStats {
  readonly total: number;
  readonly byCategory: Record<string, number>;
  readonly byStatus: Record<string, number>;
}

interface CategoryInfo {
  readonly name: string;
  readonly icon: string;
  readonly color: string;
}

export type { FeatureCategory, FeatureStatus, CategoryInfo };

