import { Image, FileImage, Globe } from 'lucide-react';
import { DataToolItem } from './MaryInventoryCRM.types';

export const FEATURE_TO_TAB: Record<string, string | null> = {
  dashboard: null,
  inventory: null,
  data_tools: 'damac_fetcher',
  asset_fetcher: 'damac_fetcher',
  data_import: 'image_extractor',
};

export const DATA_TOOLS: DataToolItem[] = [
  { id: 'assets', label: 'DAMAC Assets', icon: Image, color: '#8b5cf6' },
  { id: 'ocr', label: 'Image Scanner', icon: FileImage, color: '#f59e0b' },
  { id: 'harvester', label: 'Web Harvester', icon: Globe, color: '#EF4444' },
];

