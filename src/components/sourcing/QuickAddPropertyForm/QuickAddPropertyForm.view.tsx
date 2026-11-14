import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { QuickAddPropertyFormProps } from './QuickAddPropertyForm.types';
import { useQuickAddPropertyForm } from './QuickAddPropertyForm.logic';
import { SuccessPanel, ExtractionPreview, FeaturesPanel } from './QuickAddPropertyForm.panels';
import '../QuickAddPropertyForm.css';

export const QuickAddPropertyFormView: React.FC<QuickAddPropertyFormProps> = props => {
  const {
    formData,
    errors,
    submitted,
    isSubmitting,
    initialData,
    customFeature,
    setCustomFeature,
    poolSelected,
    gardenSelected,
    parkingSelected,
    customList,
    handleTogglePool,
    handleToggleGarden,
    handleToggleParking,
    handleChange,
    handleSubmit,
    handleAddCustomFeature,
    handleCancel,
  } = useQuickAddPropertyForm(props);

  if (submitted) {
    return <SuccessPanel formData={formData} onClose={handleCancel} />;
  }

  return (
    <div className="quick-add-form form-container responsive">
      <div className="form-header">
        <div className="header-content">
          <Zap size={24} />
          <div>
            <h2>Quick Add Property</h2>
            <p>Add this property to your inventory in seconds</p>
          </div>
        </div>
      </div>

      <form role="form" onSubmit={handleSubmit} className="form-content">
        <ExtractionPreview initialData={initialData} />

        <div className="form-section">
          <h3 className="section-title">Property Information</h3>

          <div className="form-group">
            <label htmlFor="propertyType">Property Type *</label>
            <input
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={`form-input ${errors.propertyType ? 'error' : ''}`}
            />
            {errors.propertyType && (
              <span role="alert" className="error-message">
                {errors.propertyType}
              </span>
            )}
          </div>

          <div className="form-row form-grid mobile-stack">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Arabian Ranches"
                className={`form-input ${errors.location ? 'error' : ''}`}
              />
              {errors.location && (
                <span role="alert" className="error-message">
                  {errors.location}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms *</label>
              <input
                id="bedrooms"
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={`form-input ${errors.bedrooms ? 'error' : ''}`}
              />
              {errors.bedrooms && (
                <span role="alert" className="error-message">
                  {errors.bedrooms}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                id="bathrooms"
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                max="10"
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Pricing & Availability</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (AED) *</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className={`form-input ${errors.price ? 'error' : ''}`}
              />
              {errors.price && (
                <span role="alert" className="error-message">
                  {errors.price}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="furnishing">Furnishing Status</label>
              <select
                id="furnishing"
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
                className="form-input"
              >
                <option value="unfurnished">Unfurnished</option>
                <option value="semi_furnished">Semi-Furnished</option>
                <option value="furnished">Furnished</option>
              </select>
            </div>
          </div>
        </div>

        <FeaturesPanel
          poolSelected={poolSelected}
          gardenSelected={gardenSelected}
          parkingSelected={parkingSelected}
          customList={customList}
          customFeature={customFeature}
          setCustomFeature={setCustomFeature}
          onTogglePool={handleTogglePool}
          onToggleGarden={handleToggleGarden}
          onToggleParking={handleToggleParking}
          onAddCustom={handleAddCustomFeature}
        />

        <div className="form-section">
          <h3 className="section-title">Owner Information</h3>

          <div className="form-group">
            <label htmlFor="ownerRelationshipType">Owner Relationship Type</label>
            <select
              id="ownerRelationshipType"
              name="ownerRelationshipType"
              value={formData.ownerRelationshipType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="direct_owner">Direct Owner</option>
              <option value="property_manager">Property Manager</option>
              <option value="broker">Broker</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                id="contactPhone"
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                id="contactEmail"
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="description">Additional Details / Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details about the property..."
              rows={4}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="publish-option">
            <input
              id="publishImmediately"
              type="checkbox"
              name="publishImmediately"
              checked={formData.publishImmediately}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="publishImmediately" className="checkbox-label">
              Publish to inventory immediately
            </label>
          </div>
          {!formData.publishImmediately && (
            <p className="info-message">
              <AlertCircle size={16} />
              Property will be saved as draft and can be published later
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            <Zap size={18} />
            {isSubmitting ? 'Saving...' : 'Publish to Inventory'}
          </button>
        </div>
      </form>
    </div>
  );
};
