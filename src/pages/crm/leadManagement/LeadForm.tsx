import React, { FC } from 'react';
import {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormRow,
  ErrorBanner,
  SecondaryButton,
} from '../styles/CrmPageStyles';
import { STATUS_CONFIG, SOURCE_LABELS } from '../hooks/useLeadManagement';
import type { LeadFormData } from '../hooks/useLeadManagement';

export interface LeadFormProps {
  formData: LeadFormData;
  setFormData: React.Dispatch<React.SetStateAction<LeadFormData>>;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

export const LeadForm: FC<LeadFormProps> = ({
  formData,
  setFormData,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <>
      {errorMessage && (
        <ErrorBanner role="alert" aria-live="polite">
          <span>⚠️ {errorMessage}</span>
          <SecondaryButton onClick={() => setErrorMessage(null)}>Dismiss</SecondaryButton>
        </ErrorBanner>
      )}
      <FormRow>
        <FormGroup>
          <FormLabel>Full Name *</FormLabel>
          <FormInput
            type="text"
            aria-label="Lead full name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ahmed Al Rashid"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Company</FormLabel>
          <FormInput
            type="text"
            aria-label="Lead company"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Global Investments LLC"
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormInput
            type="email"
            aria-label="Lead email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. ahmed@company.com"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Phone</FormLabel>
          <FormInput
            type="tel"
            aria-label="Lead phone"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +971 50 123 4567"
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup>
          <FormLabel>Status</FormLabel>
          <FormSelect
            aria-label="Lead status"
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
          >
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel>Source</FormLabel>
          <FormSelect
            aria-label="Lead source"
            value={formData.source}
            onChange={e => setFormData({ ...formData, source: e.target.value })}
          >
            {Object.entries(SOURCE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
      </FormRow>
      <FormGroup>
        <FormLabel>Budget (AED)</FormLabel>
        <FormInput
          type="number"
          min={0}
          step={50000}
          aria-label="Lead budget in AED"
          value={formData.budget}
          onChange={e => setFormData({ ...formData, budget: e.target.value })}
          placeholder="e.g. 2000000"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Notes</FormLabel>
        <FormTextarea
          aria-label="Lead notes"
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes about this lead..."
        />
      </FormGroup>
    </>
  );
};
