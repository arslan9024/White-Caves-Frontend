import React from 'react';
import { Home, Building2, TrendingUp, Hammer, CheckCircle, Save, X } from 'lucide-react';
import {
  FURNISHING_OPTIONS,
  OCCUPANCY_OPTIONS,
  MARKET_OPTIONS,
  CONSTRUCTION_OPTIONS,
  LEGAL_OPTIONS,
  PropertyStatusFormData,
} from './PropertyStatusUpdater.data';

interface StatusFormProps {
  formData: PropertyStatusFormData;
  onChange: (field: keyof PropertyStatusFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

export const PropertyStatusForm: React.FC<StatusFormProps> = ({
  formData,
  onChange,
  onSave,
  onCancel,
  loading,
}) => {
  return (
    <div className="form-section">
      {/* Furnishing */}
      <div className="status-group">
        <label>
          <Home size={16} /> Furnishing
        </label>
        <div className="button-group">
          {FURNISHING_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              className={`status-button ${formData.furnishing === option.value ? 'selected' : ''}`}
              onClick={() => onChange('furnishing', option.value)}
              style={
                formData.furnishing === option.value
                  ? { backgroundColor: option.color, color: 'white' }
                  : {}
              }
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Occupancy Status */}
      <div className="status-group">
        <label>
          <Building2 size={16} /> Occupancy Status
        </label>
        <div className="button-group">
          {OCCUPANCY_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              className={`status-button ${
                formData.occupancyStatus === option.value ? 'selected' : ''
              }`}
              onClick={() => onChange('occupancyStatus', option.value)}
              style={
                formData.occupancyStatus === option.value
                  ? { backgroundColor: option.color, color: 'white' }
                  : {}
              }
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Market Availability */}
      <div className="status-group">
        <label>
          <TrendingUp size={16} /> Market Availability
        </label>
        <div className="button-group">
          {MARKET_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              className={`status-button ${
                formData.marketAvailability === option.value ? 'selected' : ''
              }`}
              onClick={() => onChange('marketAvailability', option.value)}
              style={
                formData.marketAvailability === option.value
                  ? { backgroundColor: option.color, color: 'white' }
                  : {}
              }
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Construction Stage */}
      <div className="status-group">
        <label>
          <Hammer size={16} /> Construction Stage
        </label>
        <div className="button-group">
          {CONSTRUCTION_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              className={`status-button ${
                formData.constructionStage === option.value ? 'selected' : ''
              }`}
              onClick={() => onChange('constructionStage', option.value)}
              style={
                formData.constructionStage === option.value
                  ? { backgroundColor: option.color, color: 'white' }
                  : {}
              }
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Legal Status */}
      <div className="status-group">
        <label>
          <CheckCircle size={16} /> Legal Status
        </label>
        <div className="button-group">
          {LEGAL_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              className={`status-button ${formData.legalStatus === option.value ? 'selected' : ''}`}
              onClick={() => onChange('legalStatus', option.value)}
              style={
                formData.legalStatus === option.value
                  ? { backgroundColor: option.color, color: 'white' }
                  : {}
              }
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button className="btn btn-primary" onClick={onSave} disabled={loading}>
          {loading ? (
            'Updating...'
          ) : (
            <>
              <Save size={16} /> Update Status
            </>
          )}
        </button>
        <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
};

