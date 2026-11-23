import React from 'react';
import {
  Home,
  FileText,
  Calendar,
  DollarSign,
  User,
  Phone,
  Mail,
  Building2,
  Layers,
  PercentCircle,
} from 'lucide-react';
import { AcquisitionFormData } from './MaryAcquisitionTypes';
import { PROPERTY_TYPES, CURRENCIES } from './MaryAcquisitionConstants';

interface FormSectionProps {
  form: AcquisitionFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

export const PropertyDetailsSection: React.FC<FormSectionProps> = ({ form, onChange }) => (
  <section className="form-section">
    <h4 className="form-section-title">
      <Building2 size={16} /> Property Details
    </h4>

    <div className="form-row form-row-2">
      <label className="form-label">
        Property Title *
        <input
          className="form-input"
          type="text"
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="e.g. 2BR Apartment in Downtown Dubai"
          required
        />
      </label>
      <label className="form-label">
        Property Type *
        <select className="form-input" name="type" value={form.type} onChange={onChange} required>
          {PROPERTY_TYPES.map(t => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div className="form-row form-row-3">
      <label className="form-label">
        <Home size={14} /> Unit Number
        <input
          className="form-input"
          type="text"
          name="unitNumber"
          value={form.unitNumber}
          onChange={onChange}
          placeholder="e.g. A-1204"
        />
      </label>
      <label className="form-label">
        <Layers size={14} /> Floor Plan
        <input
          className="form-input"
          type="text"
          name="floorPlan"
          value={form.floorPlan}
          onChange={onChange}
          placeholder="e.g. 2BR-TypeA"
        />
      </label>
      <label className="form-label">
        Size (sqft)
        <input
          className="form-input"
          type="number"
          name="sqft"
          value={form.sqft}
          onChange={onChange}
          placeholder="0"
          min="0"
        />
      </label>
    </div>

    <div className="form-row form-row-2">
      <label className="form-label">
        Area / Community
        <input
          className="form-input"
          type="text"
          name="area"
          value={form.area}
          onChange={onChange}
          placeholder="e.g. Dubai Marina"
        />
      </label>
      <label className="form-label">
        Full Location *
        <input
          className="form-input"
          type="text"
          name="location"
          value={form.location}
          onChange={onChange}
          placeholder="e.g. Marina Gate Tower 1, Dubai Marina"
          required
        />
      </label>
    </div>

    <div className="form-row form-row-2">
      <label className="form-label">
        Bedrooms
        <input
          className="form-input"
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={onChange}
          min="0"
        />
      </label>
      <label className="form-label">
        Bathrooms
        <input
          className="form-input"
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={onChange}
          min="0"
        />
      </label>
    </div>
  </section>
);

export const PricingSection: React.FC<FormSectionProps> = ({ form, onChange }) => (
  <section className="form-section">
    <h4 className="form-section-title">
      <DollarSign size={16} /> Pricing & Availability
    </h4>

    <div className="form-row form-row-3">
      <label className="form-label">
        Rental Price (Annual) *
        <input
          className="form-input"
          type="number"
          name="rentalPrice"
          value={form.rentalPrice}
          onChange={onChange}
          placeholder="0"
          min="0"
          required
        />
      </label>
      <label className="form-label">
        Currency
        <select className="form-input" name="currency" value={form.currency} onChange={onChange}>
          {CURRENCIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="form-label">
        <PercentCircle size={14} /> Commission %
        <input
          className="form-input"
          type="number"
          name="commissionPercent"
          value={form.commissionPercent}
          onChange={onChange}
          min="0"
          max="100"
          step="0.5"
        />
      </label>
    </div>

    <div className="form-row form-row-2">
      <label className="form-label">
        <Calendar size={14} /> Availability Date
        <input
          className="form-input"
          type="date"
          name="availabilityDate"
          value={form.availabilityDate}
          onChange={onChange}
        />
      </label>
    </div>
  </section>
);

export const LandlordContactSection: React.FC<FormSectionProps> = ({ form, onChange }) => (
  <section className="form-section">
    <h4 className="form-section-title">
      <User size={16} /> Landlord Contact
    </h4>

    <div className="form-row form-row-3">
      <label className="form-label">
        <User size={14} /> Landlord Name
        <input
          className="form-input"
          type="text"
          name="landlordName"
          value={form.landlordName}
          onChange={onChange}
          placeholder="Full Name"
        />
      </label>
      <label className="form-label">
        <Phone size={14} /> Phone
        <input
          className="form-input"
          type="tel"
          name="landlordPhone"
          value={form.landlordPhone}
          onChange={onChange}
          placeholder="+971 50 000 0000"
        />
      </label>
      <label className="form-label">
        <Mail size={14} /> Email
        <input
          className="form-input"
          type="email"
          name="landlordEmail"
          value={form.landlordEmail}
          onChange={onChange}
          placeholder="landlord@email.com"
        />
      </label>
    </div>
  </section>
);

export const DocumentChecklistSection: React.FC<FormSectionProps> = ({ form, onChange }) => (
  <section className="form-section">
    <h4 className="form-section-title">
      <FileText size={16} /> Document Checklist
    </h4>
    <p className="form-section-hint">
      Tick only documents already received. Missing items will be flagged.
    </p>

    <div className="doc-checklist">
      <label className="doc-check-item">
        <input
          type="checkbox"
          name="hasTitleDeed"
          checked={form.hasTitleDeed}
          onChange={onChange}
        />
        <span>Title Deed</span>
      </label>
      <label className="doc-check-item">
        <input
          type="checkbox"
          name="hasLandlordPassport"
          checked={form.hasLandlordPassport}
          onChange={onChange}
        />
        <span>Landlord Passport / Emirates ID</span>
      </label>
      <label className="doc-check-item">
        <input type="checkbox" name="hasEjari" checked={form.hasEjari} onChange={onChange} />
        <span>Ejari</span>
      </label>
    </div>
  </section>
);

export const NotesSection: React.FC<FormSectionProps> = ({ form, onChange }) => (
  <section className="form-section">
    <h4 className="form-section-title">Additional Notes</h4>
    <textarea
      className="form-input form-textarea"
      name="notes"
      value={form.notes}
      onChange={onChange}
      rows={3}
      placeholder="Any additional information about the property or landlord..."
    />
  </section>
);
