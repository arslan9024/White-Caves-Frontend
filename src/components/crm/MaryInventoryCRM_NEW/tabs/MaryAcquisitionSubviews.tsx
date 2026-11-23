import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { AcquisitionFormData } from './MaryAcquisitionTypes';

export interface DocumentFlagsProps {
  form: AcquisitionFormData;
}

export const DocumentFlags: React.FC<DocumentFlagsProps> = ({ form }) => {
  const missing = [
    !form.hasTitleDeed && 'Title Deed',
    !form.hasLandlordPassport && 'Landlord Passport',
    !form.hasEjari && 'Ejari',
  ].filter(Boolean) as string[];

  if (missing.length === 0) {
    return (
      <div className="doc-flags-banner doc-flags-ok">
        <CheckCircle size={16} />
        <span>All required documents confirmed.</span>
      </div>
    );
  }

  return (
    <div className="doc-flags-banner doc-flags-warn">
      <AlertTriangle size={16} />
      <span>
        <strong>Missing Documents:</strong> {missing.join(', ')} — property will be flagged as
        incomplete.
      </span>
    </div>
  );
};

export interface AcquisitionSuccessViewProps {
  onAddAnother: () => void;
}

export const AcquisitionSuccessView: React.FC<AcquisitionSuccessViewProps> = ({ onAddAnother }) => {
  return (
    <div className="mary-acquisition-tab">
      <div className="acquisition-success">
        <CheckCircle size={48} color="#10b981" />
        <h3>Property Acquired!</h3>
        <p>
          The property has been added to inventory as <strong>Draft / Collected</strong>. @Mary will
          process it for verification.
        </p>
        <button className="action-btn primary" onClick={onAddAnother}>
          Add Another Property
        </button>
      </div>
    </div>
  );
};
