import { parseCsvText, CsvParseResponse } from '../workers/csvParser.worker';

/**
 * Parses CSV text in a Web Worker when available, falling back to synchronous parsing
 * in SSR or test environments without Worker support.
 */
export async function parseCsvInWorker(
  text: string,
  delimiter = ','
): Promise<{ headers: string[]; rows: Record<string, string>[] }> {
  if (typeof Worker === 'undefined') {
    return parseCsvText(text, delimiter);
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/csvParser.worker.ts', import.meta.url), {
      type: 'module',
    });
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    worker.onmessage = (event: MessageEvent<CsvParseResponse>) => {
      if (event.data.id !== id) return;
      worker.terminate();
      if (event.data.error) {
        reject(new Error(event.data.error));
      } else {
        resolve({ headers: event.data.headers, rows: event.data.rows });
      }
    };

    worker.onerror = err => {
      worker.terminate();
      reject(new Error(err.message || 'CSV worker error'));
    };

    worker.postMessage({ id, text, delimiter });
  });
}

