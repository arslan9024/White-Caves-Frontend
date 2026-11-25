import Tesseract from 'tesseract.js';
import { createLogger } from '../../../utils/logger';

export interface ParsedData {
  phones: string[];
  emails: string[];
  unitNumbers: string[];
  sdNumbers: string[];
  names: string[];
  [key: string]: string[];
}

/** A single extraction result from one image */
export interface ExtractedDataItem {
  id: number;
  fileName: string;
  imageUrl: string | ArrayBuffer | null;
  rawText: string;
  parsed: ParsedData;
}

/** Upload tracking entry */
export interface UploadEntry {
  id: number;
  file: File;
  name: string;
  status: 'processing' | 'complete' | 'error';
}

/** Editing state for a single cell */
export interface EditingCell {
  dataId: number;
  field: string;
  index: number;
}

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const patterns = {
  phone: /(?:\+971|00971|971)?[\s-]?(?:50|52|54|55|56|58)[\s-]?\d{3}[\s-]?\d{4}/g,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  unitNumber: /(?:Villa|Apt|Unit|Apartment|Plot|Shop)\s*(?:#|No\.?|Number)?\s*\d+[A-Za-z]?/gi,
  sdNumber: /SD\d{3,5}/gi,
  name: /(?:Mr\.?|Mrs\.?|Ms\.?|Dr\.?)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}/g,
};

export const parseTextData = (text: string): ParsedData => {
  return {
    phones: [...new Set(text.match(patterns.phone) || [])],
    emails: [...new Set(text.match(patterns.email) || [])],
    unitNumbers: [...new Set(text.match(patterns.unitNumber) || [])],
    sdNumbers: [...new Set(text.match(patterns.sdNumber) || [])],
    names: [...new Set(text.match(patterns.name) || [])],
  };
};

export const processImage = async (file: File): Promise<ExtractedDataItem> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = async () => {
      const imageUrl = reader.result;
      try {
        const { data } = await Tesseract.recognize(file, 'eng');
        const rawText = data?.text?.trim() || '';
        const effectiveText = rawText || `No text detected in ${file.name}`;
        const parsed = parseTextData(effectiveText);
        resolve({
          id: Date.now() + Math.floor(Math.random() * 1000),
          fileName: file.name,
          imageUrl,
          rawText: effectiveText,
          parsed,
        });
      } catch (err) {
        const log = createLogger('ImageDataExtractor');
        log.error('OCR processing failed for file', { fileName: file.name, error: err });
        resolve({
          id: Date.now() + Math.floor(Math.random() * 1000),
          fileName: file.name,
          imageUrl,
          rawText: `Failed to extract text from ${file.name}`,
          parsed: { phones: [], emails: [], unitNumbers: [], sdNumbers: [], names: [] },
        });
      }
    };
    reader.onerror = () => {
      resolve({
        id: Date.now() + Math.floor(Math.random() * 1000),
        fileName: file.name,
        imageUrl: null,
        rawText: `Error reading file ${file.name}`,
        parsed: { phones: [], emails: [], unitNumbers: [], sdNumbers: [], names: [] },
      });
    };
    reader.readAsDataURL(file);
  });
};
