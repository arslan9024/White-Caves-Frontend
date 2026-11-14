import React from 'react';
import { ContractTemplate, ContractFormData } from './ContractBuilder.types';

interface TemplateSelectPanelProps {
  templates: ContractTemplate[];
  onSelect: (template: ContractTemplate) => void;
}

export const TemplateSelectPanel: React.FC<TemplateSelectPanelProps> = ({
  templates,
  onSelect,
}) => (
  <div className="step select-template">
    <h3>Select a Template</h3>
    <div className="template-grid">
      {templates.length > 0 ? (
        templates.map(template => (
          <div key={template._id} className="template-card" onClick={() => onSelect(template)}>
            <div className="template-icon">📄</div>
            <h4>{template.name}</h4>
            <p>{template.description}</p>
            <span className="template-category">{template.category}</span>
          </div>
        ))
      ) : (
        <p>No templates available</p>
      )}
    </div>
  </div>
);

interface ContractFormPanelProps {
  template: ContractTemplate;
  formData: ContractFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onPreview: () => void;
  loading: boolean;
}

export const ContractFormPanel: React.FC<ContractFormPanelProps> = ({
  template,
  formData,
  onChange,
  onBack,
  onPreview,
  loading,
}) => (
  <div className="step fill-form">
    <h3>Fill Contract Details: {template.name}</h3>

    <form className="contract-form">
      {/* Property Details Section */}
      <fieldset>
        <legend>Property Details</legend>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress || ''}
            onChange={onChange}
            placeholder="Enter property address"
          />
        </div>
        <div className="form-group">
          <label>Area (sqft)</label>
          <input
            type="number"
            name="propertyArea"
            value={formData.propertyArea || ''}
            onChange={onChange}
            placeholder="e.g., 75000"
          />
        </div>
        <div className="form-group">
          <label>Property Type</label>
          <select name="propertyType" value={formData.propertyType || ''} onChange={onChange}>
            <option value="">Select type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>
      </fieldset>

      {/* Tenant Section */}
      <fieldset>
        <legend>Tenant Information</legend>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="tenantName"
            value={formData.tenantName || ''}
            onChange={onChange}
            placeholder="Tenant full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="tenantEmail"
            value={formData.tenantEmail || ''}
            onChange={onChange}
            placeholder="tenant@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="tenantPhone"
            value={formData.tenantPhone || ''}
            onChange={onChange}
            placeholder="+971 5X XXX XXXX"
          />
        </div>
        <div className="form-group">
          <label>Emirates ID</label>
          <input
            type="text"
            name="tenantEmiratesId"
            value={formData.tenantEmiratesId || ''}
            onChange={onChange}
            placeholder="123 4567 8901234"
          />
        </div>
      </fieldset>

      {/* Landlord Section */}
      <fieldset>
        <legend>Landlord Information</legend>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="landlordName"
            value={formData.landlordName || ''}
            onChange={onChange}
            placeholder="Landlord full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="landlordEmail"
            value={formData.landlordEmail || ''}
            onChange={onChange}
            placeholder="landlord@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="landlordPhone"
            value={formData.landlordPhone || ''}
            onChange={onChange}
            placeholder="+971 5X XXX XXXX"
          />
        </div>
      </fieldset>

      {/* Lease Terms Section */}
      <fieldset>
        <legend>Lease Terms</legend>
        <div className="form-group">
          <label>Monthly Rent (AED)</label>
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount || ''}
            onChange={onChange}
            placeholder="e.g., 50000"
          />
        </div>
        <div className="form-group">
          <label>Duration (months)</label>
          <input
            type="number"
            name="durationMonths"
            value={formData.durationMonths || ''}
            onChange={onChange}
            placeholder="e.g., 12"
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate || ''}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Security Deposit (AED)</label>
          <input
            type="number"
            name="securityDeposit"
            value={formData.securityDeposit || ''}
            onChange={onChange}
            placeholder="e.g., 100000"
          />
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onPreview} disabled={loading}>
          {loading ? 'Validating...' : 'Preview Contract'}
        </button>
      </div>
    </form>
  </div>
);

interface ContractReviewPanelProps {
  preview: string;
  onBack: () => void;
  onCreate: () => void;
  loading: boolean;
}

export const ContractReviewPanel: React.FC<ContractReviewPanelProps> = ({
  preview,
  onBack,
  onCreate,
  loading,
}) => (
  <div className="step review-contract">
    <h3>Review Contract</h3>

    <div className="contract-preview">
      <div className="preview-content" dangerouslySetInnerHTML={{ __html: preview }} />
    </div>

    <div className="form-actions">
      <button type="button" className="btn-secondary" onClick={onBack}>
        Back to Edit
      </button>
      <button
        type="button"
        className="btn-primary btn-create"
        onClick={onCreate}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Contract'}
      </button>
    </div>
  </div>
);
