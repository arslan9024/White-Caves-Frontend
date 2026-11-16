import React from 'react';
import {
  MapPin,
  Bed,
  Square,
  Star,
  Bot,
} from 'lucide-react';
import PricePerSqftTooltip from './PricePerSqftTooltip';

export const formatPrice = (price?: number | null): string => {
  if (!price) return 'Price on Request';
  if (price >= 1000000) {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  } else if (price >= 1000) {
    return `AED ${(price / 1000).toFixed(0)}K`;
  }
  return `AED ${price.toLocaleString()}`;
};

export interface PropertyCardProps {
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
    purpose?: string;
    scoreBreakdown?: {
      inquiriesScore?: number;
      viewsScore?: number;
      qualityScore?: number;
      newListingBonus?: number;
    };
  };
  rank: number;
  onViewDetails: (property: any) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, rank, onViewDetails }) => {
  const { title, propertyType, area, askingPrice, rooms, actualArea, images, score, purpose } =
    property;
  const primaryImage = images?.[0] || '/placeholder-property.jpg';

  return (
    <div className="featured-property-card" onClick={() => onViewDetails(property)}>
      {rank <= 3 && (
        <div className={`rank-badge rank-${rank}`}>
          <Star size={12} />#{rank}
        </div>
      )}
      <div className="property-image-container">
        <img
          src={primaryImage}
          alt={title || ''}
          className="property-image"
          onError={(e: any) => {
            e.target.src = '/placeholder-property.jpg';
          }}
        />
        <div className="property-purpose-badge">{purpose === 'sale' ? 'For Sale' : 'For Rent'}</div>
        {score !== undefined && score !== null && (
          <div className="property-score-badge">
            <Bot size={12} />
            {Math.round(score)}
          </div>
        )}
      </div>
      <div className="property-content">
        <h3 className="property-title">{title || `${propertyType} in ${area}`}</h3>
        <div className="property-location">
          <MapPin size={14} />
          <span>{area}</span>
        </div>
        <div className="property-price-row flex items-center justify-between gap-2 my-1">
          <div className="property-price">{formatPrice(askingPrice)}</div>
          {!!actualArea && actualArea > 0 && !!askingPrice && askingPrice > 0 && (
            <PricePerSqftTooltip priceAed={askingPrice} areaSqft={actualArea} />
          )}
        </div>
        <div className="property-specs">
          {rooms && (
            <span className="spec">
              <Bed size={14} />
              {rooms} {rooms === 1 ? 'Bed' : 'Beds'}
            </span>
          )}
          {actualArea && (
            <span className="spec">
              <Square size={14} />
              {actualArea.toLocaleString()} sqft
            </span>
          )}
        </div>
        <div className="property-type-badge">{propertyType}</div>
      </div>
    </div>
  );
};

export default PropertyCard;

