import React from 'react';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Shield,
  Car,
  Dumbbell,
  Waves,
  Building,
  ChevronRight,
} from 'lucide-react';
import { formatPrice } from '../../../utils';
import type { PropertyData } from './PropertyDetailModal.types';
import { AMENITY_ICONS, PROPERTY_DETAIL_TABS } from './PropertyDetailModal.constants';

export interface PropertyDetailTabsProps {
  property: PropertyData;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onRequestFloorPlan: () => void;
}

export function PropertyDetailHeader({ property }: { property: PropertyData }): React.ReactElement {
  return (
    <>
      <div className="property-header">
        <div className="header-info">
          <h1>{property.title}</h1>
          <p className="location">
            <MapPin size={16} />
            {property.location}, Dubai
          </p>
        </div>
        <div className="header-price">
          <span className="price">
            {formatPrice(property.price, { priceType: property.priceType })}
          </span>
          {property.pricePerSqft && (
            <span className="price-sqft">AED {property.pricePerSqft}/sqft</span>
          )}
        </div>
      </div>

      <div className="property-specs-bar">
        <div className="spec-item">
          <Bed size={20} />
          <div className="spec-info">
            <span className="spec-value">{property.beds}</span>
            <span className="spec-label">Bedrooms</span>
          </div>
        </div>
        <div className="spec-item">
          <Bath size={20} />
          <div className="spec-info">
            <span className="spec-value">{property.baths}</span>
            <span className="spec-label">Bathrooms</span>
          </div>
        </div>
        <div className="spec-item">
          <Maximize size={20} />
          <div className="spec-info">
            <span className="spec-value">{property.sqft?.toLocaleString()}</span>
            <span className="spec-label">Sq.Ft</span>
          </div>
        </div>
        <div className="spec-item">
          <Calendar size={20} />
          <div className="spec-info">
            <span className="spec-value">{property.yearBuilt || '2023'}</span>
            <span className="spec-label">Year Built</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function PropertyDetailTabs({
  property,
  activeTab,
  onTabChange,
  onRequestFloorPlan,
}: PropertyDetailTabsProps): React.ReactElement {
  return (
    <>
      <div className="content-tabs">
        {PROPERTY_DETAIL_TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <h3>Property Description</h3>
            <p className="description">
              {property.description ||
                `Experience luxury living at its finest in this stunning ${property.type.toLowerCase()} located in the prestigious ${property.location} area. This exceptional property offers ${property.beds} spacious bedrooms, ${property.baths} modern bathrooms, and ${property.sqft?.toLocaleString()} sq.ft of premium living space.

The property features high-end finishes throughout, floor-to-ceiling windows with breathtaking views, a gourmet kitchen with top-of-the-line appliances, and elegant living spaces perfect for both relaxation and entertaining.

Residents will enjoy world-class amenities and the convenience of being close to Dubai's finest dining, shopping, and entertainment destinations.`}
            </p>

            <h3>Key Features</h3>
            <ul className="features-list">
              <li>
                <ChevronRight size={14} /> Premium location in {property.location}
              </li>
              <li>
                <ChevronRight size={14} /> High-quality finishes and materials
              </li>
              <li>
                <ChevronRight size={14} /> Spacious {property.sqft?.toLocaleString()} sq.ft layout
              </li>
              <li>
                <ChevronRight size={14} /> Modern kitchen with premium appliances
              </li>
              <li>
                <ChevronRight size={14} /> Floor-to-ceiling windows
              </li>
              <li>
                <ChevronRight size={14} /> 24/7 security and concierge services
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="amenities-tab">
            <h3>Property Amenities</h3>
            <div className="amenities-grid">
              {property.amenities?.map(amenity => {
                // eslint-disable-next-line security/detect-object-injection
                const IconComponent = AMENITY_ICONS[amenity] || Building;
                return (
                  <div key={amenity} className="amenity-item">
                    <IconComponent size={20} />
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>

            <h3>Building Amenities</h3>
            <div className="amenities-grid">
              <div className="amenity-item">
                <Shield size={20} />
                <span>24/7 Security</span>
              </div>
              <div className="amenity-item">
                <Car size={20} />
                <span>Covered Parking</span>
              </div>
              <div className="amenity-item">
                <Dumbbell size={20} />
                <span>Fitness Center</span>
              </div>
              <div className="amenity-item">
                <Waves size={20} />
                <span>Swimming Pool</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="location-tab">
            <h3>Location</h3>
            <p className="location-desc">
              Located in {property.location}, one of Dubai&apos;s most sought-after neighborhoods.
              The property offers easy access to major highways, world-class shopping destinations,
              fine dining restaurants, and top international schools.
            </p>
            <div className="location-map">
              <div className="map-placeholder">
                <MapPin size={48} />
                <span>{property.location}, Dubai</span>
              </div>
            </div>
            <h3>Nearby Attractions</h3>
            <ul className="nearby-list">
              <li>
                <span>Dubai Mall</span> <span>5 min drive</span>
              </li>
              <li>
                <span>Dubai Metro Station</span> <span>3 min walk</span>
              </li>
              <li>
                <span>International Airport</span> <span>15 min drive</span>
              </li>
              <li>
                <span>Beach</span> <span>10 min drive</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'floorplan' && (
          <div className="floorplan-tab">
            <h3>Floor Plan</h3>
            <div className="floorplan-placeholder">
              <Building size={64} />
              <p>Floor plan available upon request</p>
              <button className="request-btn" onClick={onRequestFloorPlan}>
                Request Floor Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
