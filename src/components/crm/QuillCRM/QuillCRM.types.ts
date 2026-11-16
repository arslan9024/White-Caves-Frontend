export type QuillTab = 'recent' | 'templates' | 'generate' | 'docs' | 'lifecycle';

export interface DocumentTemplate {
  id: number;
  name: string;
  category: string;
  lang: string;
  lastUsed: string;
  uses: number;
}

export interface RecentDocument {
  id: number;
  title: string;
  type: string;
  status: 'signed' | 'pending' | 'sent' | 'draft' | string;
  created: string;
}

