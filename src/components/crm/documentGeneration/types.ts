export interface DocTemplateField {
  label: string;
  key: string;
  defaultValue: string;
}

export interface DocTemplate {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: string;
  fields: DocTemplateField[];
}

export type GenerationStatus = 'idle' | 'generating' | 'done' | 'error';

export interface GeneratedDoc {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  sizeKb: number;
  status: 'ready';
}

export interface ToastItem {
  id: number;
  message: string;
  color: string;
}

export interface StatItem {
  label: string;
  value: number;
  color: string;
}
