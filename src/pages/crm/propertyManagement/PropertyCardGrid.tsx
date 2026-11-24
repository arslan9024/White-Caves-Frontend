import React, { FC } from 'react';
import { Badge } from '../../../components/ui';
import { SecondaryButton, DangerButton } from '../styles/CrmPageStyles';
import { STATUS_MAP, TYPE_MAP } from '../hooks/usePropertyManagement';
import type { Property } from '../hooks/usePropertyManagement';
import {
  Grid,
  PropertyCardStyled,
  PropertyImage,
  FeaturedBadge,
  PropertyBody,
  PropertyTitle,
  PropertyLocation,
  PropertyPrice,
  PropertyMeta,
  PropertyActions,
  EmptyState,
} from './PropertyManagementStyles';

export interface PropertyCardGridProps {
  properties: Property[];
  search: string;
  statusFilter: string;
  typeFilter: string;
  formatCurrency: (amount: number) => string;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

export const PropertyCardGrid: FC<PropertyCardGridProps> = ({
  properties,
  search,
  statusFilter,
  typeFilter,
  formatCurrency,
  onEdit,
  onDelete,
}) => {
  if (properties.length === 0) {
    return (
      <EmptyState>
        {search || statusFilter !== 'all' || typeFilter !== 'all'
          ? 'No properties match your filters'
          : 'No properties yet — add your first listing!'}
      </EmptyState>
    );
  }

  return (
    <Grid>
      {properties.map((property: Property) => (
        <PropertyCardStyled key={property.id} $featured={property.featured}>
          <PropertyImage $type={property.type}>
            {TYPE_MAP[property.type]?.icon || '🏠'}
            {property.featured && <FeaturedBadge>⭐ Featured</FeaturedBadge>}
            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
              <Badge variant={STATUS_MAP[property.status]?.variant || 'secondary'} size="small">
                {STATUS_MAP[property.status]?.label || property.status}
              </Badge>
            </div>
          </PropertyImage>
          <PropertyBody>
            <PropertyTitle>{property.title}</PropertyTitle>
            <PropertyLocation>📍 {property.location}</PropertyLocation>
            <PropertyPrice>{formatCurrency(property.price)}</PropertyPrice>
            <PropertyMeta>
              {property.bedrooms !== undefined && property.bedrooms > 0 && (
                <span>🛏️ {property.bedrooms} Bed</span>
              )}
              {property.bathrooms !== undefined && property.bathrooms > 0 && (
                <span>🚿 {property.bathrooms} Bath</span>
              )}
              {property.sqft && <span>📐 {property.sqft.toLocaleString()} sqft</span>}
            </PropertyMeta>
            {property.agent_name && (
              <div style={{ fontSize: '0.78rem', color: 'var(--color-888, #888)', marginBottom: '0.5rem' }}>
                👤 {property.agent_name}
              </div>
            )}
            <PropertyActions>
              <SecondaryButton onClick={() => onEdit(property)}>Edit</SecondaryButton>
              <DangerButton onClick={() => onDelete(property)}>Delete</DangerButton>
            </PropertyActions>
          </PropertyBody>
        </PropertyCardStyled>
      ))}
    </Grid>
  );
};
