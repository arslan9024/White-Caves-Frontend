/**
 * Owner Information Card — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating header, badges, display, and edit panels
 * Strictly < 350 lines
 */

import React from 'react';
import { User, CheckCircle, AlertCircle, Edit } from 'lucide-react';
import type { OwnerInformationCardProps } from './OwnerInformationCard.types';
import { useOwnerInformationCardLogic } from './OwnerInformationCard.logic';
import { OwnerEmptyPanel, OwnerDisplayPanel, OwnerEditPanel } from './OwnerInformationCard.panels';
import '../OwnerInformationCard.css';

export const OwnerInformationCard: React.FC<OwnerInformationCardProps> = props => {
  const { owner } = props;
  const {
    isEditing,
    setIsEditing,
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
  } = useOwnerInformationCardLogic(props);

  if (!owner) {
    return <OwnerEmptyPanel />;
  }

  const isVerified = owner?.isVerified || false;

  return (
    <div className="owner-information-card">
      <div className="card-header">
        <div className="header-title">
          <User size={24} />
          <div>
            <h2>Owner Information</h2>
            {isVerified && (
              <div className="verification-badge">
                <CheckCircle size={14} />
                <span>Verified</span>
              </div>
            )}
          </div>
        </div>
        {!isEditing && (
          <button className="btn-edit" onClick={() => setIsEditing(true)} title="Edit owner">
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
        <OwnerEditPanel
          formData={formData}
          errors={errors}
          loading={loading}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          newPhone={newPhone}
          setNewPhone={setNewPhone}
          handleInputChange={handleInputChange}
          handleAddEmail={handleAddEmail}
          handleRemoveEmail={handleRemoveEmail}
          handleAddPhone={handleAddPhone}
          handleRemovePhone={handleRemovePhone}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <OwnerDisplayPanel owner={owner} />
      )}
    </div>
  );
};

export default OwnerInformationCard;

