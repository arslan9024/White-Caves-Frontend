import React, { useState, useEffect, useCallback } from 'react';
import { Bot } from 'lucide-react';
import PropertyCard, { formatPrice } from './properties/FeaturedPropertyCard';
import PropertyModal from './properties/FeaturedPropertyModal';
import './FeaturedProperties.css';

export { PropertyCard, PropertyModal, formatPrice };

export interface FeaturedPropertiesProps {}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [viewMode] = useState<string>('grid');
  const [dateActive, setDateActive] = useState<string | null>(null);

  const fetchFeaturedProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/featured-properties');
      const data = await response.json();

      if (data.success && data.featuredProperties) {
        setProperties(data.featuredProperties);
        setDateActive(data.dateActive);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to load properties');
      }
    } catch {
      setError('Unable to load featured properties');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProperties();
  }, [fetchFeaturedProperties]);

  const openModal = (property: any) => {
    setSelectedProperty(property);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProperty(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <section className="featured-properties-section">
        <div className="featured-container">
          <div className="featured-header">
            <h2 className="featured-title">Featured Properties</h2>
            <p className="featured-subtitle">Loading today's selection...</p>
          </div>
          <div className="loading-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="property-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || properties.length === 0) {
    return (
      <section className="featured-properties-section">
        <div className="featured-container">
          <div className="featured-header">
            <h2 className="featured-title">Featured Properties</h2>
            <p className="featured-subtitle">{error || 'No properties available at this time'}</p>
          </div>
          <button className="retry-btn" onClick={fetchFeaturedProperties}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const formattedDate = dateActive
    ? new Date(dateActive).toLocaleDateString('en-AE', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <section className="featured-properties-section">
      <div className="featured-container">
        <div className="featured-header">
          <div className="header-content">
            <h2 className="featured-title">
              <span className="highlight">Featured Properties</span> in Dubai
            </h2>
            <p className="featured-subtitle">
              <Bot size={16} /> Curated by Olivia AI | Updated Daily | {formattedDate}
            </p>
          </div>
          <div className="header-badges">
            <span className="ai-badge">
              <Bot size={14} /> AI Selected
            </span>
            <span className="count-badge">{properties.length} Properties</span>
          </div>
        </div>

        <div className={`properties-grid ${viewMode}`}>
          {properties.map((property, index) => (
            <PropertyCard
              key={property.propertyRef || index}
              property={property}
              rank={index + 1}
              onViewDetails={openModal}
            />
          ))}
        </div>

        <div className="ai-note">
          <Bot size={18} />
          <p>
            These properties are automatically selected daily by <strong>Olivia</strong>, our
            Marketing AI, using a scoring algorithm based on inquiries, views, quality, and listing
            freshness.
          </p>
        </div>
      </div>

      {selectedProperty && <PropertyModal property={selectedProperty} onClose={closeModal} />}
    </section>
  );
};

export default FeaturedProperties;
