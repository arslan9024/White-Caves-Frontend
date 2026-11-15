export type DevelopmentStatus = 'selling' | 'upcoming' | 'almost_sold';

export type NovaTabId = 'developments' | 'pipeline' | 'tracker' | 'docs' | 'lifecycle';

export interface Development {
  id: number;
  name: string;
  developer: string;
  location: string;
  launchDate: string;
  handover: string;
  units: number;
  startPrice: string;
  soldPct: number;
  status: DevelopmentStatus;
}

export interface PipelineItem {
  name: string;
  est: string;
  units: number;
  developer: string;
}

export interface NovaTab {
  id: NovaTabId;
  label: string;
}
