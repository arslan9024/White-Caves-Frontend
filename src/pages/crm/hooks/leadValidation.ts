import { isValidEmail, isValidPhone } from '../../../utils/validation';
import type { LeadFormData } from './leadTypes';

export interface LeadValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

export const validateLeadForm = (
  formData: LeadFormData,
  requireName: boolean = true
): LeadValidationResult => {
  if (requireName && !formData.name.trim()) {
    return { isValid: false, errorMessage: 'Lead name is required.' };
  }
  if (formData.email && !isValidEmail(formData.email)) {
    return { isValid: false, errorMessage: 'Please enter a valid email address.' };
  }
  if (formData.phone && !isValidPhone(formData.phone)) {
    return { isValid: false, errorMessage: 'Please enter a valid UAE phone number.' };
  }
  if (formData.budget && Number(formData.budget) < 0) {
    return { isValid: false, errorMessage: 'Budget cannot be negative.' };
  }

  return { isValid: true, errorMessage: null };
};
