/**
 * Tenancy Contract Form — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing 6-step form data, save draft, PDF activation, and agreement list fetching
 * Strictly < 350 lines
 */

import { useState, useCallback, useEffect } from 'react';
import { authFetch } from '../../utils/authFetch';
import type {
  TenancyFormData,
  TenancyAgreementSummary,
  StatusBannerMessage,
  TenancyContractFormProps,
} from './TenancyContractForm.types';

export const INITIAL_FORM_DATA: TenancyFormData = {
  propertyInfo: {
    description: '',
    address: '',
    city: '',
    emirate: '',
    plotNumber: '',
    buildingNumber: '',
    floorNumber: '',
    unitNumber: '',
    unitArea: '',
    propertyType: 'Apartment',
    furnished: 'Unfurnished',
  },
  landlordInfo: {
    name: '',
    nationalId: '',
    passportNumber: '',
    nationality: '',
    emiratesId: '',
    email: '',
    phone: '',
    mobileNumber: '',
    address: '',
    bankName: '',
    bankAccountNumber: '',
    iban: '',
  },
  tenantInfo: {
    name: '',
    nationalId: '',
    passportNumber: '',
    nationality: '',
    emiratesId: '',
    email: '',
    phone: '',
    mobileNumber: '',
    address: '',
    occupation: '',
    employer: '',
    visaNumber: '',
    visaExpiryDate: '',
  },
  contactDetails: {
    landlordContactPerson: '',
    landlordContactPhone: '',
    landlordContactEmail: '',
    tenantContactPerson: '',
    tenantContactPhone: '',
    tenantContactEmail: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  },
  tenancyTerms: {
    leaseStartDate: '',
    leaseEndDate: '',
    leasePeriodMonths: '',
    renewalOption: 'Negotiable',
    renewalTermMonths: '',
    rentAmount: '',
    rentCurrency: 'AED',
    securityDeposit: '',
    maintenanceFees: '',
    maintenanceIncludedIn: 'Rent',
    utilities: {
      water: false,
      electricity: false,
      gas: false,
      internet: false,
      chiller: false,
    },
    paymentMethod: 'Bank Transfer',
    paymentDay: 1,
    maintenanceResponsibility: 'Landlord',
    breakTerms: '',
    allowedActivities: 'Residential',
    restrictions: '',
    damageResponsibility: '',
  },
};

export function useTenancyContractFormLogic({
  onSuccess,
  initialContractId,
}: TenancyContractFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusBannerMessage | null>(null);
  const [contractId, setContractId] = useState<string | null>(initialContractId || null);
  const [agreements, setAgreements] = useState<TenancyAgreementSummary[]>([]);
  const [formData, setFormData] = useState<TenancyFormData>(INITIAL_FORM_DATA);

  const loadAgreements = useCallback(async () => {
    try {
      const response = await authFetch('/api/tenancy-agreements');
      const json = await response.json();
      if (response.ok && json.success) {
        setAgreements(json.data || []);
      }
    } catch {
      // Safe error swallow for background agreement sync
    }
  }, []);

  useEffect(() => {
    void loadAgreements();
  }, [loadAgreements]);

  const updateFormSection = <K extends keyof TenancyFormData>(
    section: K,
    data: Partial<TenancyFormData[K]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      setError(null);
      setStatusMessage(null);

      const payload = {
        propertyId:
          formData.propertyInfo.unitNumber?.trim() ||
          formData.propertyInfo.plotNumber?.trim() ||
          `property_${Date.now()}`,
        landlordName: formData.landlordInfo.name?.trim(),
        tenantName: formData.tenantInfo.name?.trim(),
        startDate: formData.tenancyTerms.leaseStartDate,
        endDate: formData.tenancyTerms.leaseEndDate,
        annualRent: Number(formData.tenancyTerms.rentAmount || 0),
      };

      if (!payload.landlordName || !payload.tenantName) {
        throw new Error('Landlord and tenant names are required');
      }
      if (!payload.startDate || !payload.endDate) {
        throw new Error('Lease start and end dates are required');
      }
      if (!payload.annualRent || payload.annualRent <= 0) {
        throw new Error('Annual rent must be greater than 0');
      }

      let response: Response;
      if (contractId) {
        response = await authFetch(`/api/tenancy-agreements/${contractId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            status: 'draft',
          }),
        });
      } else {
        response = await authFetch('/api/tenancy-agreements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            status: 'draft',
          }),
        });
      }

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Error saving draft');
      }

      if (!contractId && json.data?.id) {
        setContractId(json.data.id);
      }

      await loadAgreements();
      setError(null);
      const message = contractId ? 'Draft updated successfully' : 'Draft created successfully';
      setStatusMessage({ type: 'success', text: message });
    } catch (err: any) {
      const message = err?.message || 'Error saving draft';
      setError(message);
      setStatusMessage({ type: 'error', text: message });
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!contractId) {
      setError('Please save the draft first');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setStatusMessage(null);

      const response = await authFetch(`/api/tenancy-agreements/${contractId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' }),
      });
      const json = await response.json();

      if (response.ok && json.success) {
        setStatusMessage({ type: 'success', text: 'Tenancy agreement activated successfully!' });
        if (onSuccess) {
          onSuccess({
            contractId,
            agreement: json.data,
          });
        }
        await loadAgreements();
      } else {
        throw new Error(json.error || 'Error activating tenancy agreement');
      }
    } catch (err: any) {
      const message = err?.message || 'Error activating tenancy agreement';
      setError(message);
      setStatusMessage({ type: 'error', text: message });
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    loading,
    error,
    statusMessage,
    contractId,
    agreements,
    formData,
    updateFormSection,
    handleNext,
    handlePrevious,
    handleSaveDraft,
    handleGeneratePDF,
  };
}

