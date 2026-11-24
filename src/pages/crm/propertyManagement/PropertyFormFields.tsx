import React, { FC } from 'react';
import {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormRow,
} from '../styles/CrmPageStyles';
import { STATUS_MAP, TYPE_MAP } from '../hooks/usePropertyManagement';
import type { PropertyFormData } from '../hooks/usePropertyManagement';

export interface PropertyFormFieldsProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export const PropertyFormFields: FC<PropertyFormFieldsProps> = ({ formData, setFormData }) => {
  return (
    <>
      <FormGroup>
        <FormLabel>Property Title *</FormLabel>
        <FormInput
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Luxury Villa - Palm Jumeirah"
        />
      </FormGroup>
      <FormRow>
        <FormGroup>
          <FormLabel>Type</FormLabel>
          <FormSelect
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value })}
          >
            {Object.entries(TYPE_MAP).map(([k, v]) => (
              <option key={k} value={k}>
                {v.icon} {v.label}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel>Status</FormLabel>
          <FormSelect
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
          >
            {Object.entries(STATUS_MAP).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
      </FormRow>
      <FormGroup>
        <FormLabel>Location</FormLabel>
        <FormInput
          type="text"
          value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g. Palm Jumeirah, Dubai"
        />
      </FormGroup>
      <FormRow>
        <FormGroup>
          <FormLabel>Price (AED)</FormLabel>
          <FormInput
            type="number"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g. 5000000"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Area (sqft)</FormLabel>
          <FormInput
            type="number"
            value={formData.sqft}
            onChange={e => setFormData({ ...formData, sqft: e.target.value })}
            placeholder="e.g. 2500"
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup>
          <FormLabel>Bedrooms</FormLabel>
          <FormInput
            type="number"
            value={formData.bedrooms}
            onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
            placeholder="e.g. 3"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Bathrooms</FormLabel>
          <FormInput
            type="number"
            value={formData.bathrooms}
            onChange={e => setFormData({ ...formData, bathrooms: e.target.value })}
            placeholder="e.g. 4"
          />
        </FormGroup>
      </FormRow>
      <FormGroup>
        <FormLabel>Assigned Agent</FormLabel>
        <FormInput
          type="text"
          value={formData.agent_name}
          onChange={e => setFormData({ ...formData, agent_name: e.target.value })}
          placeholder="e.g. Ahmed Al Rashid"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Description</FormLabel>
        <FormTextarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="Property description..."
        />
      </FormGroup>
      <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={e => setFormData({ ...formData, featured: e.target.checked })}
          id="featured-check"
        />
        <FormLabel htmlFor="featured-check" style={{ margin: 0 }}>
          Featured Property
        </FormLabel>
      </FormGroup>
    </>
  );
};
