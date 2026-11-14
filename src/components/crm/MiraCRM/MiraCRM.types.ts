export interface TranslationJob {
  id: number;
  doc: string;
  from: string;
  to: string;
  status: 'completed' | 'in_progress' | 'pending';
  pages: number;
  requestedBy: string;
  time: string;
}

export interface LanguageInfo {
  code: string;
  name: string;
  flag: string;
  docs: number;
  rtl?: boolean;
}

export type MiraTabType = 'queue' | 'live' | 'languages' | 'docs' | 'lifecycle';
