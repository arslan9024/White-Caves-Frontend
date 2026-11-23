import { AssistantFeatureItem } from '../features.types';

export type NinaFeatureItem = AssistantFeatureItem & {
  openSource?: boolean;
  cost?: string;
};
