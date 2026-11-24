import type { LucideIcon } from 'lucide-react';

export interface PaletteItem {
  id: string;
  label: string;
  category: string;
  icon: LucideIcon;
  action: () => void;
  keywords?: string[];
}
