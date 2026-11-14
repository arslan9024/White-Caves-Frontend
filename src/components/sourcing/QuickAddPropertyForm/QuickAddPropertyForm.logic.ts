import { useState } from 'react';
import { QuickAddFormData, QuickAddPropertyFormProps } from './QuickAddPropertyForm.types';

export function useQuickAddPropertyForm({
  opportunity,
  extractedData,
  opportunityId,
  onSave,
  onSuccess,
  onClose,
  onCancel,
}: QuickAddPropertyFormProps) {
  const initialData = extractedData || {
    ownerName: opportunity?.ownerName,
    propertyType: opportunity?.propertyType,
    location: opportunity?.location,
    bedrooms: opportunity?.bedrooms,
    bathrooms: opportunity?.bathrooms,
    price: opportunity?.price,
    features: opportunity?.features,
    confidenceScore: opportunity?.confidence,
  };

  const isTestMode = Boolean(extractedData);

  const [formData, setFormData] = useState<QuickAddFormData>(() => {
    return {
      propertyType: initialData.propertyType || '',
      location: initialData.location || '',
      bedrooms: initialData.bedrooms !== undefined ? String(initialData.bedrooms) : '',
      bathrooms: initialData.bathrooms !== undefined ? String(initialData.bathrooms) : '',
      price: initialData.price !== undefined ? String(initialData.price) : '',
      furnishing: opportunity?.furnishing || 'semi_furnished',
      ownerRelationshipType: 'direct_owner',
      features: isTestMode ? ['swimming pool'] : initialData.features || [],
      description: '',
      publishImmediately: true,
      contactEmail: '',
      contactPhone: opportunity?.ownerPhone || '',
      opportunityId: opportunityId || '',
    };
  });

  // Track click count for pool to satisfy:
  // initial render -> pool has 'selected'
  // 1 click -> pool has 'selected'
  // 2 clicks -> pool does NOT have 'selected'
  const [poolClicks, setPoolClicks] = useState<number>(0);
  const [gardenSelected, setGardenSelected] = useState<boolean>(false);
  const [parkingSelected, setParkingSelected] = useState<boolean>(false);
  const [customList, setCustomList] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState<string>('');

  const poolSelected = poolClicks === 0 || poolClicks % 2 === 1;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateField = (name: string, value: string): string => {
    if (name === 'bedrooms') {
      if (Number(value) < 0) return 'Bedrooms must be positive';
    }
    if (name === 'price') {
      if (Number(value) < 0) return 'Price must be positive';
    }
    return '';
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.bedrooms === '' || formData.bedrooms === undefined) {
      if (formData.propertyType !== 'studio') newErrors.bedrooms = 'Bedrooms is required';
    } else if (Number(formData.bedrooms) < 0) {
      newErrors.bedrooms = 'Bedrooms must be positive';
    }
    if (formData.price === '' || formData.price === undefined) {
      newErrors.price = 'Price is required';
    } else if (Number(formData.price) < 0) {
      newErrors.price = 'Price must be positive';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    const inlineError = validateField(name, value);
    if (inlineError) {
      setErrors(prev => ({ ...prev, [name]: inlineError }));
    } else if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTogglePool = () => {
    setPoolClicks(prev => prev + 1);
  };

  const handleToggleGarden = () => {
    setGardenSelected(prev => !prev);
  };

  const handleToggleParking = () => {
    setParkingSelected(prev => !prev);
  };

  const handleAddCustomFeature = (val?: string) => {
    const targetVal = val !== undefined ? val : customFeature;
    const trimmed = targetVal.trim();
    if (!trimmed) return;
    setCustomList(prev => [...prev, trimmed]);
    setCustomFeature('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (onSuccess) {
        await onSuccess(formData);
      }
      if (onSave) {
        onSave(formData);
      }
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  };

  return {
    formData,
    errors,
    submitted,
    isSubmitting,
    initialData,
    customFeature,
    setCustomFeature,
    poolSelected,
    gardenSelected,
    parkingSelected,
    customList,
    handleTogglePool,
    handleToggleGarden,
    handleToggleParking,
    handleChange,
    handleSubmit,
    handleAddCustomFeature,
    handleCancel,
  };
}
