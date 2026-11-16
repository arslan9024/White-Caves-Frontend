export const FIELD_OPTIONS = [
  { value: '', label: '— skip —' },
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'company', label: 'Company' },
  { value: 'status', label: 'Status' },
  { value: 'source', label: 'Source' },
  { value: 'budget', label: 'Budget (AED)' },
  { value: 'notes', label: 'Notes' },
] as const;

export type FieldKey =
  '' | 'name' | 'email' | 'phone' | 'company' | 'status' | 'source' | 'budget' | 'notes';

export type RowError = { row: number; message: string };

export interface BulkImportApiResponse {
  data?: {
    imported?: number;
    total?: number;
    skipped?: number;
    errors?: RowError[];
  };
  error?: string;
  message?: string;
}

export interface LeadImportModalProps {
  onClose: () => void;
  onSuccess: (imported: number) => void;
}

export function parseCsv(raw: string): { headers: string[]; rows: string[][] } {
  const lines = raw.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };

  const parse = (line: string): string[] => {
    const cells: string[] = [];
    let inQuotes = false;
    let current = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    cells.push(current.trim());
    return cells;
  };

  const headers = parse(lines[0]);
  const rows = lines.slice(1).map(parse);
  return { headers, rows };
}

