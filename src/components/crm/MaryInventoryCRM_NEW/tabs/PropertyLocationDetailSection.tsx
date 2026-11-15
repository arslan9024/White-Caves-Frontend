import React from 'react';
import type { InventoryProperty } from '../../../../store/slices/inventorySlice';

interface PropertyLocationDetailSectionProps {
  property: InventoryProperty;
}

export const PropertyLocationDetailSection: React.FC<PropertyLocationDetailSectionProps> = ({ property }) => {
  return (
    <div className="detail-location">
      <div className="detail-section">
        <h3>Location Details</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">Area</span>
            <span className="value">{property.area || '-'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Project</span>
            <span className="value">{property.project || '-'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Cluster</span>
            <span className="value">{property.cluster || '-'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Master Project</span>
            <span className="value">{property.masterProject || '-'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Building</span>
            <span className="value">{String(property.building || '-')}</span>
          </div>
          <div className="detail-item">
            <span className="label">Unit Number</span>
            <span className="value">{String(property.unitNumber || '-')}</span>
          </div>
          <div className="detail-item">
            <span className="label">Floor</span>
            <span className="value">{property.floor || '-'}</span>
          </div>
          <div className="detail-item">
            <span className="label">Municipality No</span>
            <span className="value">{String(property.municipalityNo || '-')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
