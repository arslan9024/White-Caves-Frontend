import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { AcquisitionFormData } from './MaryAcquisitionTypes';
import { DocumentFlags, AcquisitionSuccessView } from './MaryAcquisitionSubviews';
import {
  PropertyDetailsSection,
  PricingSection,
  LandlordContactSection,
  DocumentChecklistSection,
  NotesSection,
} from './MaryAcquisitionSections';
import { useMaryAcquisition } from './useMaryAcquisition';
import '../MaryInventoryCRM.css';

// Re-export types, constants, services, subviews, and hooks for backwards compatibility
export * from './MaryAcquisitionTypes';
export * from './MaryAcquisitionConstants';
export * from './MaryAcquisitionService';
export * from './MaryAcquisitionSubviews';
export * from './MaryAcquisitionSections';
export * from './useMaryAcquisition';

// ─── Main Component ──────────────────────────────────────────────────────────

export const MaryAcquisitionTab: React.FC = () => {
  const {
    form,
    submitted,
    submitting,
    error,
    handleChange,
    resetForm,
    handleSubmit,
    setSubmitted,
  } = useMaryAcquisition();

  if (submitted) {
    return <AcquisitionSuccessView onAddAnother={() => setSubmitted(false)} />;
  }

  return (
    <div className="mary-acquisition-tab">
      <div className="tab-header">
        <div className="header-content">
          <h3>Property Acquisition Form</h3>
          <p className="header-subtitle">
            Collect landlord property details and add to pending inventory
          </p>
        </div>
      </div>

      <form className="acquisition-form" onSubmit={handleSubmit} noValidate>
        {/* Document Flags Banner */}
        <DocumentFlags form={form} />

        {/* ── Property Details ── */}
        <PropertyDetailsSection form={form} onChange={handleChange} />

        {/* ── Pricing ── */}
        <PricingSection form={form} onChange={handleChange} />

        {/* ── Landlord Contact ── */}
        <LandlordContactSection form={form} onChange={handleChange} />

        {/* ── Document Checklist ── */}
        <DocumentChecklistSection form={form} onChange={handleChange} />

        {/* ── Notes ── */}
        <NotesSection form={form} onChange={handleChange} />

        {error && (
          <div className="acquisition-error">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="action-btn" onClick={resetForm} disabled={submitting}>
            Reset
          </button>
          <button type="submit" className="action-btn primary" disabled={submitting}>
            {submitting ? 'Saving…' : '+ Add to Inventory'}
          </button>
        </div>
      </form>
    </div>
  );
};

MaryAcquisitionTab.displayName = 'MaryAcquisitionTab';

export default MaryAcquisitionTab;
