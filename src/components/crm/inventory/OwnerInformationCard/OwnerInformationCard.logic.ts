/**
 * Owner Information Card — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing form validation, contact lists (emails, phones), edit mode, and submission
 * Strictly < 350 lines
 */

import { useState } from 'react';
import type {
  OwnerData,
  OwnerFormData,
  OwnerInformationCardProps,
} from './OwnerInformationCard.types';

export function useOwnerInformationCardLogic({ owner, onUpdate }: OwnerInformationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<OwnerFormData>({
    name: owner?.name || '',
    nationality: owner?.nationality || '',
    country: owner?.country || '',
    emails: owner?.emails || [],
    phones: owner?.phones || [],
    notes: owner?.notes || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.emails.length === 0) newErrors.emails = 'At least one email is required';
    if (formData.phones.length === 0) newErrors.phones = 'At least one phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^\+?[\d\s\-()]{7,}$/;
    return regex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const handleAddEmail = () => {
    if (!newEmail.trim()) return;
    if (!validateEmail(newEmail)) {
      setErrors(prev => ({
        ...prev,
        newEmail: 'Invalid email format',
      }));
      return;
    }
    if (formData.emails.includes(newEmail)) {
      setErrors(prev => ({
        ...prev,
        newEmail: 'Email already added',
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      emails: [...prev.emails, newEmail],
    }));
    setNewEmail('');
    setErrors(prev => ({
      ...prev,
      newEmail: '',
    }));
  };

  const handleRemoveEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.filter(e => e !== email),
    }));
  };

  const handleAddPhone = () => {
    if (!newPhone.trim()) return;
    if (!validatePhone(newPhone)) {
      setErrors(prev => ({
        ...prev,
        newPhone: 'Invalid phone format',
      }));
      return;
    }
    if (formData.phones.includes(newPhone)) {
      setErrors(prev => ({
        ...prev,
        newPhone: 'Phone already added',
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, newPhone],
    }));
    setNewPhone('');
    setErrors(prev => ({
      ...prev,
      newPhone: '',
    }));
  };

  const handleRemovePhone = (phone: string) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.filter(p => p !== phone),
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
      setErrors({ submit: error?.message || 'Failed to update owner' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: owner?.name || '',
      nationality: owner?.nationality || '',
      country: owner?.country || '',
      emails: owner?.emails || [],
      phones: owner?.phones || [],
      notes: owner?.notes || '',
    });
    setNewEmail('');
    setNewPhone('');
    setErrors({});
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    formData,
    errors,
    loading,
    newEmail,
    setNewEmail,
    newPhone,
    setNewPhone,
    handleInputChange,
    handleAddEmail,
    handleRemoveEmail,
    handleAddPhone,
    handleRemovePhone,
    handleSave,
    handleCancel,
  };
}

