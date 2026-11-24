interface ParsedData {
  phones: string[];
  emails: string[];
  unitNumbers: string[];
  sdNumbers: string[];
  names: string[];
  [key: string]: string[];
}

/** A single extraction result from one image */
interface ExtractedDataItem {
  id: number;
  fileName: string;
  imageUrl: string | ArrayBuffer | null;
  rawText: string;
  parsed: ParsedData;
}

/** Upload tracking entry */
interface UploadEntry {
  id: number;
  file: File;
  name: string;
  status: 'processing' | 'complete' | 'error';
}

/** Editing state for a single cell */
interface EditingCell {
  dataId: number;
  field: string;
  index: number;
}

const ImageDataExtractor = ({
  onDataExtracted,
}: {
  onDataExtracted?: (data: ExtractedDataItem[]) => void;
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadEntry[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedDataItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const patterns = {
    phone: /(?:\+971|00971|971)?[\s-]?(?:50|52|54|55|56|58)[\s-]?\d{3}[\s-]?\d{4}/g,
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    unitNumber: /(?:Villa|Apt|Unit|Apartment|Plot|Shop)\s*(?:#|No\.?|Number)?\s*\d+[A-Za-z]?/gi,
    sdNumber: /SD\d{3,5}/gi,
    name: /(?:Mr\.?|Mrs\.?|Ms\.?|Dr\.?)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}/g,
  };

  const parseTextData = (text: string) => {
    const results = {
      phones: [...new Set(text.match(patterns.phone) || [])],
      emails: [...new Set(text.match(patterns.email) || [])],
      unitNumbers: [...new Set(text.match(patterns.unitNumber) || [])],
      sdNumbers: [...new Set(text.match(patterns.sdNumber) || [])],
      names: [...new Set(text.match(patterns.name) || [])],
    };
    return results;
  };

  const processImage = async (file: File): Promise<ExtractedDataItem> => {
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

  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleFiles = useCallback(async (files: FileList) => {
    const allFiles = Array.from(files);

    // Filter by type
    const typeValidFiles = allFiles.filter(
      f => f.type.startsWith('image/') || f.type === 'application/pdf'
    );

    // Filter by size and collect oversized names
    const oversized = typeValidFiles.filter(f => f.size > MAX_FILE_SIZE_BYTES);
    const validFiles = typeValidFiles.filter(f => f.size <= MAX_FILE_SIZE_BYTES);

    if (oversized.length > 0) {
      // Notify user about oversized files (silently skip them)
      const log = createLogger('ImageDataExtractor');
      log.warn(
        `Skipped ${oversized.length} file(s) exceeding ${MAX_FILE_SIZE_MB}MB limit: ${oversized.map(f => f.name).join(', ')}`
      );
    }

    if (validFiles.length === 0) return;

    setProcessing(true);
    const newUploads: UploadEntry[] = validFiles.map(f => ({
      id: Date.now() + Math.random(),
      file: f,
