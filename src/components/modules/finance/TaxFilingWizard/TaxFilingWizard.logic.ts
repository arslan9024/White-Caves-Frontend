import { useState, ChangeEvent } from 'react';
import { TaxFilingWizardProps, TaxFilingFormData, FormErrors } from './TaxFilingWizard.types';
import { INITIAL_FORM_DATA } from './TaxFilingWizard.data';

export const useTaxFilingWizardLogic = ({
  onSubmit = () => {},
  onCancel = () => {},
}: TaxFilingWizardProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TaxFilingFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Required';
      if (!formData.taxId.trim()) newErrors.taxId = 'Required';
    } else if (currentStep === 2) {
      if (!formData.totalRevenue) newErrors.totalRevenue = 'Required';
      if (!formData.totalExpenses) newErrors.totalExpenses = 'Required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(Math.min(step + 1, 5));
    }
  };

  const handlePrevious = () => {
    setStep(Math.max(step - 1, 1));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof TaxFilingFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (formData.agreement) {
      onSubmit(formData);
    } else {
      setErrors(prev => ({ ...prev, agreement: 'You must agree to continue' }));
    }
  };

  return {
    step,
    formData,
    errors,
    handleNext,
    handlePrevious,
    handleInputChange,
    handleFileUpload,
    removeDocument,
    handleSubmit,
    onCancel,
  };
};
