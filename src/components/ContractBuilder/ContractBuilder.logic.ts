import { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../../utils/authFetch';
import { ContractTemplate, ContractFormData, ContractBuilderStep } from './ContractBuilder.types';
import { DEFAULT_TEMPLATES } from './ContractBuilder.data';

export const useContractBuilder = (
  onContractCreated?: (contract: any) => void,
  partyData?: any
) => {
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [formData, setFormData] = useState<ContractFormData>({});
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<ContractBuilderStep>('select');

  const fetchTemplates = useCallback(async () => {
    try {
      const response = await authFetch('/api/contracts');
      const data = await response.json();
      if (data.success) {
        const apiTemplates = data.data || data.contracts || [];
        if (Array.isArray(apiTemplates) && apiTemplates.length > 0) {
          setTemplates(
            apiTemplates.map((item: any) => ({
              _id: item.id || item._id,
              name: item.name || item.contractNumber || 'Contract Template',
              description:
                item.description ||
                `Lessor: ${item.lessorName || '—'} · Tenant: ${item.tenantName || '—'}`,
              category: item.propertyType || item.category || 'General',
            }))
          );
        } else {
          setTemplates(DEFAULT_TEMPLATES);
        }
      }
    } catch {
      setTemplates(DEFAULT_TEMPLATES);
      setError('Failed to load templates');
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleSelectTemplate = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setPreview('');
    setError('');
    setStep('fill');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreview = async () => {
    setLoading(true);
    setError('');

    try {
      if (!formData.landlordName?.trim()) {
        setError('Landlord name is required.');
        return;
      }
      if (!formData.tenantName?.trim()) {
        setError('Tenant name is required.');
        return;
      }
      if (!formData.rentAmount || Number(formData.rentAmount) <= 0) {
        setError('Monthly rent must be greater than 0.');
        return;
      }
      if (!formData.startDate) {
        setError('Start date is required.');
        return;
      }

      const html = `
        <h4>${selectedTemplate?.name || 'Tenancy Contract'}</h4>
        <p><strong>Property:</strong> ${formData.propertyAddress || '—'}</p>
        <p><strong>Property Type:</strong> ${formData.propertyType || '—'}</p>
        <p><strong>Landlord:</strong> ${formData.landlordName || '—'} (${formData.landlordEmail || 'no email'})</p>
        <p><strong>Tenant:</strong> ${formData.tenantName || '—'} (${formData.tenantEmail || 'no email'})</p>
        <p><strong>Monthly Rent:</strong> AED ${Number(formData.rentAmount || 0).toLocaleString()}</p>
        <p><strong>Lease Start:</strong> ${formData.startDate || '—'}</p>
        <p><strong>Security Deposit:</strong> AED ${Number(formData.securityDeposit || 0).toLocaleString()}</p>
      `;

      setPreview(html);
      setStep('review');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContract = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await authFetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessorName: formData.landlordName?.trim(),
          tenantName: formData.tenantName?.trim(),
          propertyType: formData.propertyType || selectedTemplate?.category || 'Apartment',
          annualRent: Math.round(Number(formData.rentAmount || 0) * 12),
          metadata: {
            templateId: selectedTemplate?._id,
            templateName: selectedTemplate?.name,
            monthlyRent: Number(formData.rentAmount || 0),
            durationMonths: Number(formData.durationMonths || 12),
            startDate: formData.startDate,
            securityDeposit: Number(formData.securityDeposit || 0),
            propertyAddress: formData.propertyAddress,
            partyData: partyData || {},
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (onContractCreated) {
          onContractCreated(data.contract || data.data || data);
        }
        setSelectedTemplate(null);
        setFormData({});
        setPreview('');
        setStep('select');
        await fetchTemplates();
      } else {
        setError(data.error || 'Failed to create contract');
      }
    } catch {
      setError('Failed to create contract');
    } finally {
      setLoading(false);
    }
  };

  return {
    templates,
    selectedTemplate,
    formData,
    preview,
    loading,
    error,
    step,
    setStep,
    handleSelectTemplate,
    handleInputChange,
    handlePreview,
    handleCreateContract,
  };
};
