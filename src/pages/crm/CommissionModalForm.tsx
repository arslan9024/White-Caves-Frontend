import React from 'react';
import styled from 'styled-components';
import {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormRow,
} from './styles/CrmPageStyles';
import { STATUS_CONFIG, TYPE_LABELS } from './hooks/useCommissionTracking';

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div<{ $color: string }>`
  background: #0f0f0f;
  border: 1px solid #c9a84c;
  border-radius: 12px;
  padding: 1.25rem;
  border-left: 4px solid ${props => props.$color};
`;

export const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
`;

interface CommissionModalFormProps {
  formData: {
    agent_name: string;
    property_title: string;
    amount: string | number;
    percentage: string | number;
    type: string;
    status: string;
    notes: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const CommissionModalForm: React.FC<CommissionModalFormProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <>
      <FormRow>
        <FormGroup>
          <FormLabel>Agent Name *</FormLabel>
          <FormInput
            type="text"
            value={formData.agent_name}
            onChange={e => setFormData((prev: any) => ({ ...prev, agent_name: e.target.value }))}
            placeholder="e.g. Ahmed Al Rashid"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Property</FormLabel>
          <FormInput
            type="text"
            value={formData.property_title}
            onChange={e => setFormData((prev: any) => ({ ...prev, property_title: e.target.value }))}
            placeholder="e.g. Palm Jumeirah Villa"
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup>
          <FormLabel>Amount (AED) *</FormLabel>
          <FormInput
            type="number"
            value={formData.amount}
            onChange={e => setFormData((prev: any) => ({ ...prev, amount: e.target.value }))}
            placeholder="e.g. 50000"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Percentage (%)</FormLabel>
          <FormInput
            type="number"
            value={formData.percentage}
            onChange={e => setFormData((prev: any) => ({ ...prev, percentage: e.target.value }))}
            placeholder="e.g. 2.5"
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup>
          <FormLabel>Type</FormLabel>
          <FormSelect
            value={formData.type}
            onChange={e => setFormData((prev: any) => ({ ...prev, type: e.target.value }))}
          >
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel>Status</FormLabel>
          <FormSelect
            value={formData.status}
            onChange={e => setFormData((prev: any) => ({ ...prev, status: e.target.value }))}
          >
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
      </FormRow>
      <FormGroup>
        <FormLabel>Notes</FormLabel>
        <FormTextarea
          value={formData.notes}
          onChange={e => setFormData((prev: any) => ({ ...prev, notes: e.target.value }))}
          placeholder="Additional notes about this commission..."
        />
      </FormGroup>
    </>
  );
};
