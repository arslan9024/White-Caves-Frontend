import { useState, useCallback } from 'react';
import { AcquisitionFormData } from './MaryAcquisitionTypes';
import { initialForm } from './MaryAcquisitionConstants';
import { buildAcquisitionPayload, submitAcquisition } from './MaryAcquisitionService';

export function useMaryAcquisition() {
  const [form, setForm] = useState<AcquisitionFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      if (type === 'checkbox') {
        setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      } else {
        setForm(prev => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError(null);

      try {
        const payload = buildAcquisitionPayload(form);
        await submitAcquisition(payload);
        setSubmitted(true);
        setForm(initialForm);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Submission failed');
      } finally {
        setSubmitting(false);
      }
    },
    [form]
  );

  return {
    form,
    setForm,
    submitted,
    setSubmitted,
    submitting,
    error,
    setError,
    handleChange,
    resetForm,
    handleSubmit,
  };
}
