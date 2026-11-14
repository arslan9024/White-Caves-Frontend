import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyGallery } from './PropertyGalleryPage.logic';
import { GALLERY_TABS } from './PropertyGalleryPage.data';
import {
  GalleryStatusBanner,
  GalleryHeader,
  GalleryMainViewer,
  GalleryInfoTab,
  GalleryDetailsTab,
} from './PropertyGalleryPage.panels';
import '../PropertyGalleryPage.css';

export const PropertyGalleryPageView: React.FC = () => {
  const navigate = useNavigate();
  const {
    propertyId,
    property,
    images,
    currentImage,
    currentImageIndex,
    setCurrentImageIndex,
    isFullscreen,
    setIsFullscreen,
    isFavorite,
    similarProperties,
    loading,
    error,
    selectedTab,
    setSelectedTab,
    statusMessage,
    handlePrevImage,
    handleNextImage,
    handleShare,
    handleFavorite,
  } = usePropertyGallery();

  if (loading) return <div className="property-gallery-loading">Loading property...</div>;
  if (error) return <div className="property-gallery-error">Error: {error}</div>;
  if (!property) return <div className="property-gallery-error">Property not found</div>;

  return (
    <div className="property-gallery-page">
      <GalleryStatusBanner statusMessage={statusMessage} />

      <GalleryHeader
        onBack={() => navigate(-1)}
        onShare={handleShare}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
      />

      <GalleryMainViewer
        images={images}
        currentImage={currentImage}
        currentImageIndex={currentImageIndex}
        isFullscreen={isFullscreen}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />

      {!isFullscreen && (
        <div className="gallery-thumbnails">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(idx)}
              style={{ backgroundImage: `url(${img})` }}
              aria-label={`Image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {!isFullscreen && (
        <div className="gallery-tabs">
          {GALLERY_TABS.map(tab => (
            <button
              key={tab.id}
              className={`tab ${selectedTab === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {!isFullscreen && (
        <div className="gallery-content">
          {selectedTab === 'gallery' && <GalleryInfoTab property={property} />}
          {selectedTab === 'details' && <GalleryDetailsTab property={property} />}

          {selectedTab === 'documents' && (
            <div className="property-documents">
              <h3>Documents & Floor Plans</h3>
              {property.documents && property.documents.length > 0 ? (
                <ul className="documents-list">
                  {property.documents.map((doc, idx) => (
                    <li key={idx}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        {doc.name || `Document ${idx + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-documents">
                  No documents available. <button className="link-btn">Request floor plan</button>
                </p>
              )}
            </div>
          )}

          <div className="gallery-contact-section">
            <h3>Interested in this property?</h3>
            <button
              className="btn-contact-agent"
              onClick={() => navigate(`/property/${propertyId}/contact-agent`)}
            >
              Contact Agent
            </button>
          </div>

          {similarProperties.length > 0 && (
            <div className="similar-properties-section">
              <h3>Similar Properties</h3>
              <div className="similar-properties-grid">
                {similarProperties.slice(0, 4).map(prop => (
                  <div
                    key={prop._id || prop.id}
                    className="similar-property-card"
                    onClick={() => navigate(`/property-gallery/${prop._id || prop.id}`)}
                  >
                    <img src={prop.image || prop.images?.[0]} alt={prop.title} />
                    <div className="card-overlay">
                      <h4>{prop.title}</h4>
                      <p className="card-price">
                        AED {parseInt(String(prop.price), 10).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
