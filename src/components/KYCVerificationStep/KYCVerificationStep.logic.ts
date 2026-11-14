/**
 * KYC Verification Step — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing form state, document uploads, validation, and submission
 */

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/slices/kycAmlSlice';
import type { KycFormData, KycStep, KYCUser } from './KYCVerificationStep.types';
import { DOCUMENT_TYPES } from './KYCVerificationStep.types';

export function useKycVerificationStepLogic({
  user,
  token,
  role,
  onComplete,
}: {
  user?: KYCUser;
  token?: string;
  role?: string;
  onComplete?: (result: { kycSubmitted: boolean }) => void;
}) {
  const dispatch = useDispatch();
  const [step, setStep] = useState<KycStep>('intro');
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Record<string, File>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [formData, setFormData] = useState<KycFormData>({
    nationality: '',
    emiratesId: '',
    dateOfBirth: '',
    sourceOfFunds: '',
    occupation: '',
    employerName: '',
    annualIncome: '',
  });

  const requiredDocs = Object.entries(DOCUMENT_TYPES)
    .filter(([_, info]) => info.required)
    .map(([type]) => type);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = useCallback(
    (docType: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          setErrors(prev => ({ ...prev, [docType]: 'File size must be less than 10MB' }));
          return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
          setErrors(prev => ({ ...prev, [docType]: 'Only JPG, PNG, or PDF files are allowed' }));
          return;
        }
        setDocuments(prev => ({ ...prev, [docType]: file }));
        setErrors(prev => ({ ...prev, [docType]: null }));
      }
    },
    []
  );

  const removeDocument = useCallback((docType: string) => {
    setDocuments(prev => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  }, []);

  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.emiratesId && role !== 'tourist') {
      newErrors.emiratesId = 'Emirates ID number is required';
    }
    if (formData.emiratesId && !/^784-\d{4}-\d{7}-\d$/.test(formData.emiratesId)) {
      newErrors.emiratesId = 'Invalid format (e.g., 784-XXXX-XXXXXXX-X)';
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.sourceOfFunds) newErrors.sourceOfFunds = 'Source of funds is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDocuments = () => {
    const newErrors: Record<string, string> = {};
    requiredDocs.forEach(docType => {
      if (!documents[docType]) {
        newErrors[docType] = `${DOCUMENT_TYPES[docType].label} is required`;
      }
    });
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('userId', user?.id || '');
      formDataToSend.append('userType', (role || '').toUpperCase());
      formDataToSend.append('fullName', user?.name || '');
      formDataToSend.append('email', user?.email || '');
      formDataToSend.append('nationality', formData.nationality);
      formDataToSend.append('emiratesIdNumber', formData.emiratesId);
      formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      formDataToSend.append('sourceOfFunds', formData.sourceOfFunds);
      formDataToSend.append('occupation', formData.occupation);
      formDataToSend.append('employerName', formData.employerName || '');
      formDataToSend.append('annualIncome', formData.annualIncome || '');

      Object.entries(documents).forEach(([docType, file]) => {
        formDataToSend.append(`document_${docType}`, file);
      });

      const response = await fetch('/api/compliance/kyc', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'KYC submission failed');
      }

      dispatch(
        addNotification({
          type: 'kyc_submitted',
          title: 'KYC Verification Submitted',
          message:
            'Your documents have been submitted for verification. We will notify you once reviewed.',
          severity: 'success',
        } as any)
      );

      setStep('success');
    } catch (error: any) {
      setErrors({ submit: error.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 'intro') {
      setStep('personal');
    } else if (step === 'personal') {
      if (validatePersonalInfo()) {
        setStep('documents');
      }
    } else if (step === 'documents') {
      if (validateDocuments()) {
        handleSubmit();
      }
    }
  };

  return {
    step,
    setStep,
    loading,
    documents,
    errors,
    formData,
    handleInputChange,
    handleFileChange,
    removeDocument,
    handleNext,
    handleSubmit,
  };
}
