export interface HarvestResult {
  url: string;
  data: {
    name: string;
    phone: string;
    email: string;
    unit: string;
  };
}

export interface HarvestError {
  url: string;
  error: string;
}

export interface HarvestConfig {
  startPage: number;
  endPage: number;
  delay: number;
  selectors: {
    name: string;
    phone: string;
    email: string;
    unit: string;
  };
}

export type HarvestStatus = 'idle' | 'fetching' | 'paused' | 'completed' | 'stopped' | 'error';

