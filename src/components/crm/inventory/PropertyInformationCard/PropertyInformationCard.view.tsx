import React from 'react';
import { Home, Edit, AlertCircle } from 'lucide-react';
import { PropertyInformationCardProps } from './PropertyInformationCard.types';
import { usePropertyInformationCardLogic } from './PropertyInformationCard.logic';
import { PropertyEditFormPanel, PropertyInfoDisplayPanel } from './PropertyInformationCard.panels';
import '../PropertyInformationCard.css';

export const PropertyInformationCardView: React.FC<PropertyInformationCardProps> = props => {
  const { property } = props;
  const {
    isEditing,
    setIsEditing,
    formData,
    errors,
    loading,
    handleInputChange,
    handleNumberChange,
    toggleFeature,
    handleSave,
    handleCancel,
  } = usePropertyInformationCardLogic(props);

  if (!property) {
    return (
      <div className="property-information-card empty">
        <div className="empty-state">
          <Home size={48} />
          <p>No property selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-information-card">
      <div className="card-header">
        <div className="header-title">
          <Home size={24} />
          <h2>Property Information</h2>
        </div>
        {!isEditing && (
          <button className="btn-edit" onClick={() => setIsEditing(true)} title="Edit property">
            <Edit size={18} />
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
        <PropertyEditFormPanel
          formData={formData}
          errors={errors}
          loading={loading}
          handleInputChange={handleInputChange}
          handleNumberChange={handleNumberChange}
          toggleFeature={toggleFeature}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <PropertyInfoDisplayPanel property={property} />
      )}
    </div>
  );
};

