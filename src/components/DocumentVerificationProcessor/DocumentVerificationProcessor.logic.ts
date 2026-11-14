/**
 * Document Verification Processor — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing file upload, drag-and-drop, verification dispatch, and copy/download
 * Strictly < 350 lines
 */

import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { verifyDocument } from '../../store/slices/kycAmlSlice';
import type {
  StatusMessage,
  VerificationResult,
  DocumentVerificationProcessorProps,
} from './DocumentVerificationProcessor.types';

export function formatFieldLabel(fieldName: string): string {
  return fieldName
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function useDocumentVerificationProcessorLogic({
  documentType,
  userId,
  token,
  onSuccess,
  onError,
}: DocumentVerificationProcessorProps) {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [showRawData, setShowRawData] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;

      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, GIF)');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setResult(null);

      const reader = new FileReader();
      reader.onload = e => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    },
    []
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-active');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-active');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-active');

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
      handleFileSelect({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleUpload = useCallback(async () => {
    if (!file) {
      setError('No file selected');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    let progressInterval: any = null;

    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentType', documentType);
      formData.append('userId', userId || '');

      progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const verifyDocumentAny = verifyDocument as any;
      const response = await dispatch(verifyDocumentAny({ formData, token })).unwrap();

      clearInterval(progressInterval);
      setUploadProgress(100);

      const verificationData: VerificationResult = {
        success: true,
        documentType,
        rawText: response.rawText,
        confidence: response.confidence || 0,
        parsedData: response.parsedData,
        validation: response.validation,
        verification: response.verification,
        timestamp: new Date(response.timestamp || Date.now()),
      };

      setResult(verificationData);

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err: any) {
      if (progressInterval) clearInterval(progressInterval);
      const errMsg = err?.message || 'Failed to process document. Please try again.';
      setError(errMsg);
      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }, [file, documentType, userId, token, dispatch, onSuccess, onError]);

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setShowRawData(false);
    setUploadProgress(0);
    setStatusMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatusMessage({ type: 'success', text: 'Copied to clipboard!' });
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to copy text.' });
    }
  };

  const handleDownloadResult = () => {
    if (!result) return;
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentType}-verification-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    fileInputRef,
    file,
    preview,
    loading,
    result,
    error,
    setError,
    statusMessage,
    setStatusMessage,
    showRawData,
    setShowRawData,
    uploadProgress,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleUpload,
    handleReset,
    handleCopyText,
    handleDownloadResult,
  };
}
