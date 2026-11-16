export type {
  PlatformFeature,
  FeatureStats,
  FeatureCategory,
  FeatureStatus,
  CategoryInfo,
} from './platformFeatures/platformFeatures.types';

export {
  FEATURE_CATEGORIES,
  FEATURE_STATUS,
} from './platformFeatures/platformFeatures.types';

export { PLATFORM_FEATURES } from './platformFeatures/platformFeatures.data';

export {
  CATEGORY_INFO,
  getFeaturesByCategory,
  getFeatureById,
  getActiveFeatures,
  getFeatureStats,
} from './platformFeatures/platformFeatures.helpers';

