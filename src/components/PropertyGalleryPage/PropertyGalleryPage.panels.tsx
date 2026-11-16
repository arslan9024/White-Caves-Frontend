import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Maximize2,
  DollarSign,
  MapPin,
  Bed,
  Bath,
} from 'lucide-react';
import { PropertyDetails, StatusMessage } from './PropertyGalleryPage.types';

export const GalleryStatusBanner: React.FC<{ statusMessage: StatusMessage | null }> = ({
  statusMessage,
}) => {
  if (!statusMessage) return null;
  return (
    <div
      role={statusMessage.type === 'error' ? 'alert' : 'status'}
      data-testid="property-gallery-status-banner"
      style={{
        margin: '12px',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        borderLeft: `4px solid ${statusMessage.type === 'error' ? '#F04438' : '#12B76A'}`,
        background: statusMessage.type === 'error' ? '#FEF3F2' : '#ECFDF3',
        color: statusMessage.type === 'error' ? '#B42318' : '#027A48',
      }}
    >
      {statusMessage.type === 'error' ? '⚠️' : '✅'} {statusMessage.text}
    </div>
  );
};

export const GalleryHeader: React.FC<{
  onBack: () => void;
  onShare: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}> = ({ onBack, onShare, onFavorite, isFavorite }) => (
  <div className="gallery-header">
    <button className="btn-back" onClick={onBack}>
      <ChevronLeft size={24} />
    </button>
    <div className="gallery-actions">
      <button className="btn-action" onClick={onShare} title="Share">
        <Share2 size={20} />
      </button>
      <button
        className={`btn-action ${isFavorite ? 'favorite-active' : ''}`}
        onClick={onFavorite}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart size={20} />
      </button>
    </div>
  </div>
);

export const GalleryMainViewer: React.FC<{
  images: string[];
  currentImage: string;
  currentImageIndex: number;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
}> = ({
  images,
  currentImage,
  currentImageIndex,
  isFullscreen,
  onPrev,
  onNext,
  onToggleFullscreen,
}) => (
  <div className={`gallery-main ${isFullscreen ? 'fullscreen' : ''}`}>
    <img
      src={currentImage}
      alt={`Property view ${currentImageIndex + 1}`}
      className="gallery-image"
    />
    <button className="gallery-nav gallery-nav-prev" onClick={onPrev} disabled={images.length <= 1}>
      <ChevronLeft size={32} />
    </button>
    <button className="gallery-nav gallery-nav-next" onClick={onNext} disabled={images.length <= 1}>
      <ChevronRight size={32} />
    </button>
    <div className="gallery-counter">
      {currentImageIndex + 1} / {images.length}
    </div>
    <button className="btn-fullscreen" onClick={onToggleFullscreen}>
      <Maximize2 size={20} />
    </button>
  </div>
);

export const GalleryInfoTab: React.FC<{ property: PropertyDetails }> = ({ property }) => (
  <div className="gallery-info">
    <h1>{property.title}</h1>
    <div className="property-meta">
      <div className="meta-item">
        <DollarSign size={18} />
        <span>
          {property.price
            ? `AED ${parseInt(String(property.price), 10).toLocaleString()}`
            : 'Price on request'}
        </span>
      </div>
      <div className="meta-item">
        <MapPin size={18} />
        <span>{property.area || property.location}</span>
      </div>
    </div>
    <p className="property-description">{property.description}</p>
  </div>
);

export const GalleryDetailsTab: React.FC<{ property: PropertyDetails }> = ({ property }) => {
  const priceNum = property.price ? Number(property.price) : 0;
  const sqftNum = property.sqft ? Number(property.sqft) : 0;
  return (
    <div className="property-details">
      <div className="details-grid">
        <div className="detail-item">
          <Bed size={20} />
          <div>
            <label>Bedrooms</label>
            <span>{property.beds || property.bedrooms || 'N/A'}</span>
          </div>
        </div>
        <div className="detail-item">
          <Bath size={20} />
          <div>
            <label>Bathrooms</label>
            <span>{property.baths || property.bathrooms || 'N/A'}</span>
          </div>
        </div>
        <div className="detail-item">
          <Maximize2 size={20} />
          <div>
            <label>Area</label>
            <span>{property.sqft || property.area_sqft || 'N/A'} sqft</span>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-label">Price Per Sqft</span>
          <span className="detail-value">
            {priceNum && sqftNum ? `AED ${Math.round(priceNum / sqftNum)}` : 'N/A'}
          </span>
        </div>
      </div>

      <div className="amenities-section">
        <h3>Amenities</h3>
        <div className="amenities-list">
          {property.amenities && property.amenities.length > 0 ? (
            property.amenities.map((amenity, idx) => (
              <span key={idx} className="amenity-tag">
                {amenity}
              </span>
            ))
          ) : (
            <p>No amenities listed</p>
          )}
        </div>
      </div>
    </div>
  );
};

