import React, { useState } from 'react';
import { X } from 'lucide-react';
import PropertyImageSlider from './PropertyImageSlider';
import './PropertyDetailModal.css';

// Re-export types, constants, hooks, actions, and subcomponents
export * from './PropertyDetailModal.types';
export * from './PropertyDetailModal.constants';
export * from './usePropertyViewing';
export * from './propertyContactActions';
export * from './PropertyDetailTabs';
export * from './PropertyDetailSidebar';

import type { PropertyDetailModalProps } from './PropertyDetailModal.types';
import { usePropertyViewing } from './usePropertyViewing';
import {
  openWhatsAppContact,
  openPhoneContact,
  openEmailInquiry,
  shareProperty,
} from './propertyContactActions';
import { PropertyDetailHeader, PropertyDetailTabs } from './PropertyDetailTabs';
import { PropertyDetailSidebar } from './PropertyDetailSidebar';

export default function PropertyDetailModal({
  property,
  onClose,
  onContact: _onContact,
  onFavorite,
  isFavorite,
}: PropertyDetailModalProps): React.ReactElement | null {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const viewing = usePropertyViewing({ property });

  if (!property) return null;

  const handleWhatsApp = (): void => openWhatsAppContact(property);
  const handleCall = (): void => openPhoneContact();
  const handleEmail = (): void => openEmailInquiry(property);
  const handleShare = (): void => shareProperty(property);

  return (
    <div
      className="property-detail-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Property details"
    >
      <div className="property-detail-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-gallery">
          <PropertyImageSlider
            images={property.images || [property.image || '']}
            title={property.title}
            onFavorite={onFavorite}
            isFavorite={isFavorite}
            showThumbnails={true}
            aspectRatio="16/9"
          />

          <div className="property-badges">
            {property.featured && <span className="badge featured">Featured</span>}
            <span className={`badge purpose ${property.purpose}`}>
              {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
            </span>
            <span className="badge type">{property.type}</span>
          </div>
        </div>

        <div className="modal-content">
          <div className="content-main">
            <PropertyDetailHeader property={property} />
            <PropertyDetailTabs
              property={property}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onRequestFloorPlan={handleEmail}
            />
          </div>

          <PropertyDetailSidebar
            property={property}
            isFavorite={isFavorite}
            onFavorite={onFavorite}
            onWhatsApp={handleWhatsApp}
            onCall={handleCall}
            onEmail={handleEmail}
            onShare={handleShare}
            viewingDate={viewing.viewingDate}
            setViewingDate={viewing.setViewingDate}
            viewingTime={viewing.viewingTime}
            setViewingTime={viewing.setViewingTime}
            viewingStatus={viewing.viewingStatus}
            viewingError={viewing.viewingError}
            onRequestViewing={() => {
              void viewing.handleRequestViewing();
            }}
            onResetViewing={viewing.resetViewingForm}
          />
        </div>
      </div>
    </div>
  );
}
