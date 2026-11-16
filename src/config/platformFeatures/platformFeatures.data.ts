import { PlatformFeature } from './platformFeatures.types';
import { featuresPart1 } from './featuresPart1.data';
import { featuresPart2 } from './featuresPart2.data';

export const PLATFORM_FEATURES: readonly PlatformFeature[] = [
  ...featuresPart1,
  ...featuresPart2,
];

