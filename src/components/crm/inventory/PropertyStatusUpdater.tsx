import React, { useState } from 'react';
import { AlertCircle, Home, Building2, TrendingUp, Hammer, CheckCircle } from 'lucide-react';
import {
  FURNISHING_OPTIONS,
  OCCUPANCY_OPTIONS,
  MARKET_OPTIONS,
  CONSTRUCTION_OPTIONS,
  LEGAL_OPTIONS,
  PropertyStatusFormData,
  getOptionLabel,
  getOptionColor,
} from './PropertyStatusUpdater.data';
import { PropertyStatusForm } from './PropertyStatusForm';
import './PropertyStatusUpdater.css';

interface PropertyStatusUpdaterProps {
  property?: any;
  onUpdate?: (formData: PropertyStatusFormData) => Promise<void> | void;
}

const PropertyStatusUpdater: React.FC<PropertyStatusUpdaterProps> = ({ property, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PropertyStatusFormData>({
    furnishing: property?.furnishing || 'unfurnished',
    occupancyStatus: property?.occupancyStatus || 'vacant',
    marketAvailability: property?.marketAvailability || 'available',
    constructionStage: property?.constructionStage || 'handed_over',
    legalStatus: property?.legalStatus || 'registered',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (field: keyof PropertyStatusFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (onUpdate) {
        await onUpdate(formData);
      }
      setIsEditing(false);
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to update status' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      furnishing: property?.furnishing || 'unfurnished',
      occupancyStatus: property?.occupancyStatus || 'vacant',
      marketAvailability: property?.marketAvailability || 'available',
      constructionStage: property?.constructionStage || 'handed_over',
      legalStatus: property?.legalStatus || 'registered',
    });
    setErrors({});
    setIsEditing(false);
  };

  if (!property) {
    return (
      <div className="property-status-updater empty">
        <div className="empty-state">
          <Home size={48} />
          <p>No property selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-status-updater">
      <div className="card-header">
        <h2>Property Status</h2>
        {!isEditing && (
          <button className="btn-edit" onClick={() => setIsEditing(true)} title="Edit status">
            Update
          </button>
        )}
      </div>

      {errors.submit && (
        <div className="alert alert-error">
          <AlertCircle size={16} />
          <span>{errors.submit}</span>
        </div>
      )}

      {isEditing ? (
        <PropertyStatusForm
          formData={formData}
          onChange={handleStatusChange}
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      ) : (
        <div className="info-section">
          {/* Furnishing Status */}
          <div className="status-item">
            <span className="status-label">
              <Home size={14} /> Furnishing
            </span>
            <span
              className="status-badge"
              style={{
                backgroundColor: getOptionColor(property.furnishing, FURNISHING_OPTIONS),
              }}
            >
              {getOptionLabel(property.furnishing, FURNISHING_OPTIONS)}
            </span>
          </div>

          {/* Occupancy Status */}
          <div className="status-item">
            <span className="status-label">
              <Building2 size={14} /> Occupancy
            </span>
            <span
              className="status-badge"
              style={{
                backgroundColor: getOptionColor(property.occupancyStatus, OCCUPANCY_OPTIONS),
              }}
            >
              {getOptionLabel(property.occupancyStatus, OCCUPANCY_OPTIONS)}
            </span>
          </div>

          {/* Market Availability */}
          <div className="status-item">
            <span className="status-label">
              <TrendingUp size={14} /> Market
            </span>
            <span
              className="status-badge"
              style={{
                backgroundColor: getOptionColor(property.marketAvailability, MARKET_OPTIONS),
              }}
            >
              {getOptionLabel(property.marketAvailability, MARKET_OPTIONS)}
            </span>
          </div>

          {/* Construction Stage */}
          <div className="status-item">
            <span className="status-label">
              <Hammer size={14} /> Construction
            </span>
            <span
              className="status-badge"
              style={{
                backgroundColor: getOptionColor(property.constructionStage, CONSTRUCTION_OPTIONS),
              }}
            >
              {getOptionLabel(property.constructionStage, CONSTRUCTION_OPTIONS)}
            </span>
          </div>

          {/* Legal Status */}
          <div className="status-item">
            <span className="status-label">
              <CheckCircle size={14} /> Legal
            </span>
            <span
              className="status-badge"
              style={{
                backgroundColor: getOptionColor(property.legalStatus, LEGAL_OPTIONS),
              }}
            >
              {getOptionLabel(property.legalStatus, LEGAL_OPTIONS)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyStatusUpdater;

