import React, { FC } from 'react';
import { Popup } from 'react-leaflet';
import { formatPrice } from '../../utils';
import { MapProperty } from './DubaiMap.types';

export const PropertyMarkerPopup: FC<{
  marker: MapProperty;
  isActive: boolean;
  onPropertyClick?: (property: MapProperty) => void;
}> = ({ marker, isActive, onPropertyClick }) => {
  return (
    <Popup className="property-map-popup">
      <div
        className={`property-popup-card ${isActive ? 'active' : ''}`}
        onClick={() => onPropertyClick?.(marker)}
        role="button"
        tabIndex={0}
      >
        <img
          src={marker.image}
          alt={marker.title}
          className="popup-card-image"
          loading="lazy"
        />
        <div className="popup-card-info">
          <span className="popup-card-type">{marker.type}</span>
          <h4 className="popup-card-title">{marker.title}</h4>
          <p className="popup-card-location">{marker.location}</p>
          <div className="popup-card-specs">
            <span>{marker.beds} BD</span>
            <span>{marker.baths} BA</span>
            <span>{marker.sqft.toLocaleString()} sqft</span>
          </div>
          <span className="popup-card-price">{formatPrice(marker.price)}</span>
        </div>
        {marker.featured && <span className="popup-featured-badge">★ Featured</span>}
      </div>
    </Popup>
  );
};

export const DubaiMapLegend: FC = () => (
  <div className="dubai-map-legend">
    <div className="legend-item">
      <span className="legend-dot featured" />
      <span>Featured</span>
    </div>
    <div className="legend-item">
      <span className="legend-dot standard" />
      <span>Standard</span>
    </div>
    <div className="legend-item">
      <span className="legend-circle" />
      <span>Community</span>
    </div>
  </div>
);
