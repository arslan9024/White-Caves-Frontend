import { useCallback, useState } from 'react';

export interface ClientOcrResult {
  text: string;
  confidence: number;
  extractedFields: Record<string, string>;
}

export interface UseClientOcrState {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  runOcr: (file: File | Blob | string) => Promise<ClientOcrResult | null>;
}

/**
 * Extracts structured UAE real estate document fields (Emirates ID, Passport MRZ,
 * Title Deed, Ejari) from raw OCR text.
 */
export function extractStructuredFields(rawText: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const emiratesIdMatch = rawText.match(/784-\d{4}-\d{7}-\d/);
  if (emiratesIdMatch) fields.emiratesId = emiratesIdMatch[0];

  const ejariMatch = rawText.match(/\b(?:EJARI|CONTRACT)\s*(?:NO\.?|#|:)?\s*([A-Z0-9-]{6,20})/i);
  if (ejariMatch?.[1]) fields.ejariNumber = ejariMatch[1];

  const deedMatch = rawText.match(
    /\b(?:TITLE\s*DEED|CERTIFICATE)\s*(?:NO\.?|#|:)?\s*([A-Z0-9-]{5,20})/i
  );
  if (deedMatch?.[1]) fields.titleDeedNumber = deedMatch[1];

  return fields;
}

/**
 * Zero-Server-RAM Browser OCR Hook.
 * Runs Tesseract.js Web Workers locally using `/tessdata/eng.traineddata`.
 */
export function useClientOcr(): UseClientOcrState {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const runOcr = useCallback(
    async (file: File | Blob | string): Promise<ClientOcrResult | null> => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      try {
        const { createWorker } = await import('tesseract.js');
        const worker = await createWorker('eng', 1, {
          langPath: '/tessdata',
          logger: (m: { status?: string; progress?: number }) => {
            if (typeof m.progress === 'number') {
              setProgress(Math.round(m.progress * 100));
            }
          },
        });

        const {
          data: { text, confidence },
        } = await worker.recognize(file);

        await worker.terminate();

        return {
          text,
          confidence,
          extractedFields: extractStructuredFields(text),
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Client OCR failed';
        setError(message);
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return { isProcessing, progress, error, runOcr };
}

