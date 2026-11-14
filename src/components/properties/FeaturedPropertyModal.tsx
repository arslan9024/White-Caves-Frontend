import React, { useState } from 'react';
import {
  Home,
  MapPin,
  Bed,
  Square,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  FileText,
  Bot,
} from 'lucide-react';
import { formatPrice } from './FeaturedPropertyCard';

export interface PropertyModalProps {
  property: {
    propertyRef?: string;
    title?: string;
    propertyType?: string;
    area?: string;
    project?: string;
    askingPrice?: number;
    rooms?: number;
    actualArea?: number;
    images?: string[];
    score?: number;
    scoreBreakdown?: {
      inquiriesScore?: number;
      viewsScore?: number;
      qualityScore?: number;
      newListingBonus?: number;
    };
  };
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images && property.images.length > 0 ? property.images : ['/placeholder-property.jpg'];

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="property-modal-overlay" onClick={onClose}>
      <div className="property-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-gallery">
          <div className="main-image-container">
            <img
              src={images[currentImageIndex]}
              alt={property.title || ''}
              className="main-image"
              onError={(e: any) => {
                e.target.src = '/placeholder-property.jpg';
              }}
            />
            {images.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={prevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="gallery-nav next" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>
                <div className="image-counter">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-header">
            <h2>{property.title || `${property.propertyType} in ${property.area}`}</h2>
            <div className="modal-price">{formatPrice(property.askingPrice)}</div>
          </div>

          <div className="modal-location">
            <MapPin size={16} />
            <span>
              {property.area}
              {property.project ? `, ${property.project}` : ''}
            </span>
          </div>

          <div className="modal-specs">
            <div className="spec-item">
              <Home size={20} />
              <span className="spec-value">{property.propertyType}</span>
              <span className="spec-label">Type</span>
            </div>
            {property.rooms && (
              <div className="spec-item">
                <Bed size={20} />
                <span className="spec-value">{property.rooms}</span>
                <span className="spec-label">Bedrooms</span>
              </div>
            )}
            {property.actualArea && (
              <div className="spec-item">
                <Square size={20} />
                <span className="spec-value">{property.actualArea.toLocaleString()}</span>
                <span className="spec-label">Sqft</span>
              </div>
            )}
          </div>

          {property.scoreBreakdown && (
            <div className="ai-score-section">
              <h4>
                <Bot size={16} /> AI Score Breakdown
              </h4>
              <div className="score-breakdown">
                <div className="score-item">
                  <span>Inquiries</span>
                  <span className="score-value">+{property.scoreBreakdown.inquiriesScore}</span>
                </div>
                <div className="score-item">
                  <span>Views</span>
                  <span className="score-value">+{property.scoreBreakdown.viewsScore}</span>
                </div>
                <div className="score-item">
                  <span>Quality</span>
                  <span className="score-value">+{property.scoreBreakdown.qualityScore}</span>
                </div>
                {!!property.scoreBreakdown.newListingBonus && property.scoreBreakdown.newListingBonus > 0 && (
                  <div className="score-item highlight">
                    <span>New Listing Bonus</span>
                    <span className="score-value">+{property.scoreBreakdown.newListingBonus}</span>
                  </div>
                )}
                <div className="score-total">
                  <span>Total Score</span>
                  <span className="score-value">{property.score}</span>
                </div>
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button className="action-btn primary">
              <Phone size={16} /> Schedule Viewing
            </button>
            <button className="action-btn secondary">
              <MessageCircle size={16} /> Inquire via WhatsApp
            </button>
            <button className="action-btn tertiary">
              <FileText size={16} /> Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
