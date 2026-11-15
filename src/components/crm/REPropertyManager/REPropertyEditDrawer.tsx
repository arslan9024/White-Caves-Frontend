/**
 * REPropertyEditDrawer.tsx
 * 7-Category Architecture: View Layer (Property Inventory Add/Edit Drawer)
 * Single Purpose File Law: < 350 lines
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import { X, Save, Plus } from 'lucide-react';
import type {
  REPropertyNode,
  REPropertyType,
  REPropertyPurpose,
  REPropertyStatus,
} from './REPropertyManager.types';
import { useDirtyStateGuard } from '../../../hooks/useDirtyStateGuard';
import { UnsavedChangesModal, TaskActionBar } from '../../common/UnsavedChangesModal';
import { REPropertyFormFields } from './REPropertyFormFields';

export interface REPropertyEditDrawerProps {
  isOpen: boolean;
  property: REPropertyNode | null;
  onClose: () => void;
  onSave: (payload: Omit<REPropertyNode, '_id' | 'repropertyId' | 'createdAt'>) => void;
  onUpdate?: (id: string, patch: Partial<REPropertyNode>) => void;
}

export const REPropertyEditDrawer: FC<REPropertyEditDrawerProps> = ({
  isOpen,
  property,
  onClose,
  onSave,
  onUpdate,
}) => {
  const [initialSnapshot, setInitialSnapshot] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'VILLA' as REPropertyType,
    purpose: 'BUY' as REPropertyPurpose,
    status: 'AVAILABLE' as REPropertyStatus,
    location: 'Palm Jumeirah',
    subLocation: 'Beachfront',
    priceAED: 25000000,
    areaSqft: 6500,
    bedrooms: 5,
    bathrooms: 6,
    developer: 'Emaar Properties',
    completionStatus: 'READY' as 'READY' | 'OFF_PLAN',
    trakheesiPermit: 'TRAK-8810294-A',
    dldTitleDeedNumber: 'TD-991024',
    assignedBroker: 'Layla Mansoori',
    supervisorCode: 'SUP-01',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Luxury turnkey Dubai residence with premium architectural finishes.',
    features: ['Private Pool', 'Smart Home', 'Balcony', 'Covered Parking'],
  });

  useEffect(() => {
    if (property) {
      const snap = {
        title: property.title,
        propertyType: property.propertyType,
        purpose: property.purpose,
        status: property.status as any,
        location: property.location,
        subLocation: property.subLocation,
        priceAED: property.priceAED,
        areaSqft: property.areaSqft,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        developer: property.developer,
        completionStatus: property.completionStatus,
        trakheesiPermit: property.trakheesiPermit,
        dldTitleDeedNumber: property.dldTitleDeedNumber,
        assignedBroker: property.assignedBroker,
        supervisorCode: property.supervisorCode,
        featured: property.featured,
        images: property.images,
        description: property.description,
        features: property.features,
      };
      setFormData(snap);
      setInitialSnapshot(JSON.stringify(snap));
    } else {
      const defaultState = {
        title: '',
        propertyType: 'VILLA' as REPropertyType,
        purpose: 'BUY' as REPropertyPurpose,
        status: 'AVAILABLE' as REPropertyStatus,
        location: 'Palm Jumeirah',
        subLocation: 'Beachfront Frond',
        priceAED: 25000000,
        areaSqft: 6500,
        bedrooms: 5,
        bathrooms: 6,
        developer: 'Emaar Properties',
        completionStatus: 'READY' as 'READY' | 'OFF_PLAN',
        trakheesiPermit: `TRAK-${Date.now().toString().slice(-7)}-A`,
        dldTitleDeedNumber: `TD-${Date.now().toString().slice(-6)}`,
        assignedBroker: 'Layla Mansoori',
        supervisorCode: 'SUP-01',
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ],
        description: 'Luxury turnkey Dubai residence with premium architectural finishes.',
        features: ['Private Pool', 'Smart Home', 'Balcony', 'Covered Parking'],
      };
      setFormData(defaultState);
      setInitialSnapshot(JSON.stringify(defaultState));
    }
  }, [property, isOpen]);

  const isDirty = useMemo(() => {
    if (!isOpen) return false;
    return Boolean(initialSnapshot && JSON.stringify(formData) !== initialSnapshot);
  }, [isOpen, formData, initialSnapshot]);

  const { showPrompt, proceed, cancel, confirmExit } = useDirtyStateGuard({
    isDirty,
    onConfirmDiscard: onClose,
  });

  if (!isOpen) return null;

  const handleSaveData = (shouldClose: boolean) => {
    if (!formData.title.trim()) return;

    if (property && onUpdate) {
      onUpdate(property.repropertyId, formData);
    } else {
      onSave(formData);
    }
    if (shouldClose) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveData(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex justify-end"
      data-testid="property-edit-drawer"
    >
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full overflow-y-auto flex flex-col justify-between shadow-2xl">
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              {property ? <Save size={18} /> : <Plus size={18} />}
            </span>
            <h2 className="text-base font-bold text-white">
              {property ? `Edit Property (${property.repropertyId})` : 'Register New Property Unit'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1">
          <REPropertyFormFields formData={formData} setFormData={setFormData} />

          <div className="mt-4 pt-3 border-t border-slate-800">
            <TaskActionBar
              isDirty={isDirty}
              onSave={() => handleSaveData(false)}
              onSaveAndClose={() => handleSaveData(true)}
              onCancel={() => confirmExit(onClose)}
              saveLabel={property ? 'Save Property Changes' : 'Confirm & Register'}
              saveAndCloseLabel="Save & Close"
              saveTestId="submit-property-btn"
            />
          </div>
        </form>
      </div>

      <UnsavedChangesModal
        isOpen={showPrompt}
        onProceed={proceed}
        onCancel={cancel}
      />
    </div>
  );
};
