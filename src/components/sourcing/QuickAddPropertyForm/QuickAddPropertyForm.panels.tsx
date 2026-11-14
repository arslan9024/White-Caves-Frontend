import React from 'react';
import { CheckCircle } from 'lucide-react';
import { QuickAddFormData, ExtractedData } from './QuickAddPropertyForm.types';

interface SuccessPanelProps {
  formData: QuickAddFormData;
  onClose: () => void;
}

export const SuccessPanel: React.FC<SuccessPanelProps> = ({ formData, onClose }) => (
  <div className="quick-add-form success-screen">
    <div className="success-container">
      <CheckCircle size={64} />
      <h2>Property added successfully</h2>
      <p>Your property has been added to Mary inventory</p>
      <div className="property-summary">
        <h3>
          {formData.propertyType} - {formData.location}
        </h3>
        <div className="summary-details">
          <span>{formData.bedrooms} BR</span>
          <span>AED {parseInt(String(formData.price) || '0', 10).toLocaleString()}/month</span>
        </div>
      </div>
      <button className="btn-done" onClick={onClose}>
        Done
      </button>
    </div>
  </div>
);

interface ExtractionPreviewProps {
  initialData?: ExtractedData;
}

export const ExtractionPreview: React.FC<ExtractionPreviewProps> = ({ initialData }) => {
  const confidence = initialData?.confidenceScore ?? 0;
  return (
    <div className="form-section">
      <h3 className="section-title">
        <CheckCircle size={18} /> Extraction Preview
      </h3>
      <div className="preview-grid">
        <div className="preview-item">
          <span className="label">Extracted from</span>
          <p className="value">{initialData?.ownerName || 'Unknown'}</p>
        </div>
        <div className="preview-item">
          <span className="label">Confidence</span>
          <div className="confidence-score">
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${confidence}%` }} />
            </div>
            <span className="score-value">{confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeaturesPanelProps {
  poolSelected: boolean;
  gardenSelected: boolean;
  parkingSelected: boolean;
  customList: string[];
  customFeature: string;
  setCustomFeature: (v: string) => void;
  onTogglePool: () => void;
  onToggleGarden: () => void;
  onToggleParking: () => void;
  onAddCustom: (v?: string) => void;
}

export const FeaturesPanel: React.FC<FeaturesPanelProps> = ({
  poolSelected,
  gardenSelected,
  parkingSelected,
  customList,
  customFeature,
  setCustomFeature,
  onTogglePool,
  onToggleGarden,
  onToggleParking,
  onAddCustom,
}) => (
  <div className="form-section">
    <h3 className="section-title">Features</h3>
    <div className="features-section">
      <p className="features-hint">Select features</p>
      <div className="features-grid feature-grid">
        <button
          type="button"
          className={`feature-btn ${poolSelected ? 'selected' : ''}`}
          onClick={onTogglePool}
        >
          Swimming pool
        </button>
        <button
          type="button"
          className={`feature-btn ${gardenSelected ? 'selected' : ''}`}
          onClick={onToggleGarden}
        >
          Garden
        </button>
        <button
          type="button"
          className={`feature-btn ${parkingSelected ? 'selected' : ''}`}
          onClick={onToggleParking}
        >
          Parking
        </button>
        {customList.map(c => (
          <button key={c} type="button" className="feature-btn selected">
            {c}
          </button>
        ))}
      </div>

      <div
        className="custom-feature-input"
        style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}
      >
        <input
          type="text"
          placeholder="Add custom feature"
          value={customFeature}
          onChange={e => setCustomFeature(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onAddCustom();
            }
          }}
          onKeyPress={e => {
            if (e.key === 'Enter' || e.charCode === 13) {
              e.preventDefault();
              onAddCustom((e.target as HTMLInputElement).value);
            }
          }}
          className="form-input"
        />
        <button type="button" onClick={() => onAddCustom()} className="btn-cancel">
          Add
        </button>
      </div>
    </div>
  </div>
);
