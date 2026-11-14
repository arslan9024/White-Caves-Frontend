import { useState, ChangeEvent } from 'react';
import {
  PropertyData,
  PropertyInformationCardProps,
  PropertyFormErrors,
} from './PropertyInformationCard.types';

export const usePropertyInformationCardLogic = ({
  property,
  onUpdate,
}: PropertyInformationCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PropertyData>({
    type: property?.type || '',
    area: property?.area || '',
    beds: property?.beds || 0,
    baths: property?.baths || 0,
    price: property?.price || '',
    furnishing: property?.furnishing || 'unfurnished',
    features: property?.features || [],
    description: property?.description || '',
  });
  const [errors, setErrors] = useState<PropertyFormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: PropertyFormErrors = {};

    if (!formData.type) newErrors.type = 'Property type is required';
    if (!formData.area) newErrors.area = 'Area is required';
    if (formData.beds !== undefined && formData.beds < 0)
      newErrors.beds = 'Bedrooms must be 0 or more';
    if (formData.baths !== undefined && formData.baths < 0)
      newErrors.baths = 'Bathrooms must be 0 or more';
    if (formData.price && isNaN(Number(formData.price))) newErrors.price = 'Price must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: (prev.features || []).includes(feature)
        ? (prev.features || []).filter(f => f !== feature)
        : [...(prev.features || []), feature],
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (onUpdate) {
        await onUpdate(formData);
      }
      setIsEditing(false);
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to update property' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      type: property?.type || '',
      area: property?.area || '',
      beds: property?.beds || 0,
      baths: property?.baths || 0,
      price: property?.price || '',
      furnishing: property?.furnishing || 'unfurnished',
      features: property?.features || [],
      description: property?.description || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    formData,
    errors,
    loading,
    handleInputChange,
    handleNumberChange,
    toggleFeature,
    handleSave,
    handleCancel,
  };
};
