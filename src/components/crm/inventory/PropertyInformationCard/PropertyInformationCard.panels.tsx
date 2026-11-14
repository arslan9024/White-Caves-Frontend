import React, { ChangeEvent } from 'react';
import {
  Home,
  Maximize2,
  Bed,
  Bath,
  DollarSign,
  Sparkles,
  CheckCircle,
  Save,
  X,
} from 'lucide-react';
import { PropertyData, PropertyFormErrors } from './PropertyInformationCard.types';
import { PROPERTY_TYPES, FURNISHING_OPTIONS, FEATURES_LIST } from './PropertyInformationCard.data';

export const PropertyEditFormPanel: React.FC<{
  formData: PropertyData;
  errors: PropertyFormErrors;
  loading: boolean;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleFeature: (feature: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}> = ({
  formData,
  errors,
  loading,
  handleInputChange,
  handleNumberChange,
  toggleFeature,
  handleSave,
  handleCancel,
}) => {
  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="type">
          <Home size={16} /> Property Type
          {errors.type && <span className="error-text">{errors.type}</span>}
        </label>
        <select
          id="type"
          name="type"
          value={formData.type || ''}
          onChange={handleInputChange}
          className={errors.type ? 'input-error' : ''}
        >
          <option value="">Select Type</option>
          {PROPERTY_TYPES.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="area">
          <Maximize2 size={16} /> Area (Sq. Ft.)
          {errors.area && <span className="error-text">{errors.area}</span>}
        </label>
        <input
          id="area"
          type="text"
          name="area"
          value={formData.area || ''}
          onChange={handleInputChange}
          placeholder="e.g., 1,200 sqft"
          className={errors.area ? 'input-error' : ''}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="beds">
            <Bed size={16} /> Bedrooms
            {errors.beds && <span className="error-text">{errors.beds}</span>}
          </label>
          <input
            id="beds"
            type="number"
            name="beds"
            value={formData.beds ?? 0}
            onChange={handleNumberChange}
            min="0"
            className={errors.beds ? 'input-error' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="baths">
            <Bath size={16} /> Bathrooms
            {errors.baths && <span className="error-text">{errors.baths}</span>}
          </label>
          <input
            id="baths"
            type="number"
            name="baths"
            value={formData.baths ?? 0}
            onChange={handleNumberChange}
            min="0"
            className={errors.baths ? 'input-error' : ''}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="price">
          <DollarSign size={16} /> Price (AED)
          {errors.price && <span className="error-text">{errors.price}</span>}
        </label>
        <input
          id="price"
          type="text"
          name="price"
          value={formData.price || ''}
          onChange={handleInputChange}
          placeholder="e.g., 500,000"
          className={errors.price ? 'input-error' : ''}
        />
      </div>

      <div className="form-group">
        <label htmlFor="furnishing">Furnishing</label>
        <select
          id="furnishing"
          name="furnishing"
          value={formData.furnishing || 'unfurnished'}
          onChange={handleInputChange}
        >
          {FURNISHING_OPTIONS.map(option => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          <Sparkles size={16} /> Features
        </label>
        <div className="features-grid">
          {FEATURES_LIST.map(feature => (
            <button
              key={feature}
              type="button"
              className={`feature-badge ${
                (formData.features || []).includes(feature) ? 'selected' : ''
              }`}
              onClick={() => toggleFeature(feature)}
            >
              <CheckCircle size={14} />
              {feature}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Additional property details..."
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
};

export const PropertyInfoDisplayPanel: React.FC<{
  property: PropertyData;
}> = ({ property }) => {
  return (
    <div className="info-section">
      <div className="info-item">
        <span className="info-label">
          <Home size={16} /> Type
        </span>
        <span className="info-value">{property.type || 'Not specified'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">
          <Maximize2 size={16} /> Area
        </span>
        <span className="info-value">{property.area || 'Not specified'}</span>
      </div>

      <div className="info-row">
        <div className="info-item">
          <span className="info-label">
            <Bed size={16} /> Beds
          </span>
          <span className="info-value">{property.beds || 0}</span>
        </div>
        <div className="info-item">
          <span className="info-label">
            <Bath size={16} /> Baths
          </span>
          <span className="info-value">{property.baths || 0}</span>
        </div>
      </div>

      <div className="info-item">
        <span className="info-label">
          <DollarSign size={16} /> Price
        </span>
        <span className="info-value">{property.price || 'On Request'}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Furnishing</span>
        <span className="info-badge">{property.furnishing || 'Not specified'}</span>
      </div>

      {property.features && property.features.length > 0 && (
        <div className="info-item full-width">
          <span className="info-label">
            <Sparkles size={16} /> Features
          </span>
          <div className="features-list">
            {property.features.map(feature => (
              <span key={feature} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {property.description && (
        <div className="info-item full-width">
          <span className="info-label">Description</span>
          <p className="info-description">{property.description}</p>
        </div>
      )}
    </div>
  );
};
