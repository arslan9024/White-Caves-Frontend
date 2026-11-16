/**
 * Owner Information Card — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Read-Only View, Edit Form, and Empty State
 * Strictly < 350 lines
 */

import React from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  Save,
  X,
  Plus,
  Trash2,
} from 'lucide-react';
import { COUNTRIES } from './OwnerInformationCard.types';
import type { OwnerData, OwnerFormData } from './OwnerInformationCard.types';

export const OwnerEmptyPanel: React.FC = () => (
  <div className="owner-information-card empty">
    <div className="empty-state">
      <User size={48} />
      <p>No owner selected</p>
    </div>
  </div>
);

export const OwnerDisplayPanel: React.FC<{ owner: OwnerData }> = ({ owner }) => (
  <div className="info-section">
    <div className="info-item">
      <span className="info-label">
        <User size={16} /> Name
      </span>
      <span className="info-value">{owner.name || 'Not specified'}</span>
    </div>

    {(owner.nationality || owner.country) && (
      <div className="info-row">
        {owner.nationality && (
          <div className="info-item">
            <span className="info-label">
              <Shield size={16} /> Nationality
            </span>
            <span className="info-value">{owner.nationality}</span>
          </div>
        )}
        {owner.country && (
          <div className="info-item">
            <span className="info-label">
              <MapPin size={16} /> Country
            </span>
            <span className="info-value">{owner.country}</span>
          </div>
        )}
      </div>
    )}

    {owner.emails && owner.emails.length > 0 && (
      <div className="info-item full-width">
        <span className="info-label">
          <Mail size={16} /> Emails
        </span>
        <div className="contact-list">
          {owner.emails.map(email => (
            <a key={email} href={`mailto:${email}`} className="contact-link">
              <Mail size={14} />
              <span>{email}</span>
            </a>
          ))}
        </div>
      </div>
    )}

    {owner.phones && owner.phones.length > 0 && (
      <div className="info-item full-width">
        <span className="info-label">
          <Phone size={16} /> Phones
        </span>
        <div className="contact-list">
          {owner.phones.map(phone => (
            <a key={phone} href={`tel:${phone}`} className="contact-link">
              <Phone size={14} />
              <span>{phone}</span>
            </a>
          ))}
        </div>
      </div>
    )}

    {owner.notes && (
      <div className="info-item full-width">
        <span className="info-label">Notes</span>
        <p className="info-description">{owner.notes}</p>
      </div>
    )}
  </div>
);

export const OwnerEditPanel: React.FC<{
  formData: OwnerFormData;
  errors: Record<string, string>;
  loading: boolean;
  newEmail: string;
  setNewEmail: (email: string) => void;
  newPhone: string;
  setNewPhone: (phone: string) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleAddEmail: () => void;
  handleRemoveEmail: (email: string) => void;
  handleAddPhone: () => void;
  handleRemovePhone: (phone: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}> = ({
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
}) => (
  <div className="form-section">
    <div className="form-group">
      <label htmlFor="name">
        <User size={16} /> Full Name
        {errors.name && <span className="error-text">{errors.name}</span>}
      </label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Owner name"
        className={errors.name ? 'input-error' : ''}
      />
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="nationality">
          <Shield size={16} /> Nationality
        </label>
        <input
          id="nationality"
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          placeholder="e.g., Emirati"
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">
          <MapPin size={16} /> Country
        </label>
        <select id="country" name="country" value={formData.country} onChange={handleInputChange}>
          <option value="">Select Country</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="form-group">
      <label>
        <Mail size={16} /> Email Addresses
        {errors.emails && <span className="error-text">{errors.emails}</span>}
      </label>
      <div className="contact-input-group">
        <input
          type="email"
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          placeholder="Add email address"
          onKeyPress={e => e.key === 'Enter' && handleAddEmail()}
          className={errors.newEmail ? 'input-error' : ''}
        />
        <button type="button" className="btn-add" onClick={handleAddEmail} title="Add email">
          <Plus size={18} />
        </button>
      </div>
      {errors.newEmail && <span className="error-text">{errors.newEmail}</span>}
      <div className="contact-list">
        {formData.emails.map(email => (
          <div key={email} className="contact-item">
            <Mail size={14} />
            <span>{email}</span>
            <button
              type="button"
              className="btn-remove"
              onClick={() => handleRemoveEmail(email)}
              title="Remove email"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="form-group">
      <label>
        <Phone size={16} /> Phone Numbers
        {errors.phones && <span className="error-text">{errors.phones}</span>}
      </label>
      <div className="contact-input-group">
        <input
          type="tel"
          value={newPhone}
          onChange={e => setNewPhone(e.target.value)}
          placeholder="Add phone number"
          onKeyPress={e => e.key === 'Enter' && handleAddPhone()}
          className={errors.newPhone ? 'input-error' : ''}
        />
        <button type="button" className="btn-add" onClick={handleAddPhone} title="Add phone">
          <Plus size={18} />
        </button>
      </div>
      {errors.newPhone && <span className="error-text">{errors.newPhone}</span>}
      <div className="contact-list">
        {formData.phones.map(phone => (
          <div key={phone} className="contact-item">
            <Phone size={14} />
            <span>{phone}</span>
            <button
              type="button"
              className="btn-remove"
              onClick={() => handleRemovePhone(phone)}
              title="Remove phone"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleInputChange}
        placeholder="Additional owner information..."
        rows={3}
      />
    </div>

    <div className="form-actions">
      <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
        {loading ? (
          'Saving...'
        ) : (
          <>
            <Save size={16} /> Save Changes
          </>
        )}
      </button>
      <button className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
        <X size={16} /> Cancel
      </button>
    </div>
  </div>
);

