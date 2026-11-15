/**
 * AEGIS V5.0 Web Worker: Offloads heavy CSV/TSV parsing off the main thread.
 */

export interface CsvParseRequest {
  id: string;
  text: string;
  delimiter?: string;
}

export interface CsvParseResponse {
  id: string;
  headers: string[];
  rows: Record<string, string>[];
  error?: string;
}

export function parseCsvText(
  text: string,
  delimiter = ','
): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''));
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] ?? '';
    }
    rows.push(row);
  }

  return { headers, rows };
}

if (typeof self !== 'undefined' && typeof (self as unknown as Worker).postMessage === 'function') {
  self.onmessage = (event: MessageEvent<CsvParseRequest>) => {
    const { id, text, delimiter } = event.data;
    try {
      const result = parseCsvText(text, delimiter);
      const response: CsvParseResponse = { id, ...result };
      (self as unknown as Worker).postMessage(response);
    } catch (err) {
      const response: CsvParseResponse = {
        id,
        headers: [],
        rows: [],
        error: err instanceof Error ? err.message : 'CSV parse failed',
      };
      (self as unknown as Worker).postMessage(response);
    }
  };
}
