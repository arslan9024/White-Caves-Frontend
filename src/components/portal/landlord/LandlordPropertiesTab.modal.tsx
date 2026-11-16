import React, { FC } from 'react';

export interface ApiLease {
  id: string;
  propertyId: string;
  tenantId: string;
  monthlyRent: number;
  depositAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  tenant: { id: string; name: string; email: string; phone: string } | null;
  property: { id: string; title: string; location: string; type: string } | null;
}

export interface ApiProperty {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  rentalPrice: number | null;
  price: number;
}

export interface PropertyData {
  id: string;
  title: string;
  address: string;
  type: string;
  status: 'vacant' | 'occupied';
  monthlyRent: number;
  tenantName?: string;
  leaseStart?: string;
  leaseEnd?: string;
  deposit?: number;
}

export const FALLBACK_PROPERTIES: ApiProperty[] = [
  {
    id: 'prop-1',
    title: 'Marina View 2BR Apartment',
    location: 'Dubai Marina, Plot 12',
    type: 'Apartment',
    status: 'active',
    rentalPrice: 8000,
    price: 1200000,
  },
  {
    id: 'prop-2',
    title: 'Downtown Studio',
    location: 'Downtown Dubai, Boulevard',
    type: 'Apartment',
    status: 'active',
    rentalPrice: 6500,
    price: 900000,
  },
  {
    id: 'prop-3',
    title: 'JBR 3BR Villa',
    location: 'JBR, Beachfront Lane',
    type: 'Villa',
    status: 'active',
    rentalPrice: 15000,
    price: 2400000,
  },
];

export const FALLBACK_LEASES: ApiLease[] = [
  {
    id: 'lease-1',
    propertyId: 'prop-1',
    tenantId: 'tenant-1',
    monthlyRent: 8000,
    depositAmount: 16000,
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-12-31T00:00:00.000Z',
    status: 'active',
    tenant: {
      id: 'tenant-1',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.ae',
      phone: '971-50-123-4567',
    },
    property: {
      id: 'prop-1',
      title: 'Marina View 2BR Apartment',
      location: 'Dubai Marina, Plot 12',
      type: 'Apartment',
    },
  },
  {
    id: 'lease-2',
    propertyId: 'prop-2',
    tenantId: 'tenant-2',
    monthlyRent: 6500,
    depositAmount: 13000,
    startDate: '2023-01-01T00:00:00.000Z',
    endDate: '2023-12-31T00:00:00.000Z',
    status: 'expired',
    tenant: {
      id: 'tenant-2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.ae',
      phone: '971-55-888-1111',
    },
    property: {
      id: 'prop-2',
      title: 'Downtown Studio',
      location: 'Downtown Dubai, Boulevard',
      type: 'Apartment',
    },
  },
];

export interface DetailModalProps {
  property: PropertyData;
  onClose: () => void;
}

export const PropertyDetailModal: FC<DetailModalProps> = ({ property, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose} data-testid="property-detail-modal">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{property.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>Property Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Address</span>
                <span className="value">{property.address}</span>
              </div>
              <div className="detail-item">
                <span className="label">Type</span>
                <span className="value">{property.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status</span>
                <span className={`badge badge-${property.status}`}>
                  {property.status === 'occupied' ? 'Occupied' : 'Vacant'}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Monthly Rent</span>
                <span className="value">AED {property.monthlyRent.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {property.tenantName && (
            <div className="detail-section">
              <h3>Tenant Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Tenant Name</span>
                  <span className="value">{property.tenantName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Lease Start</span>
                  <span className="value">{property.leaseStart}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Lease End</span>
                  <span className="value">{property.leaseEnd}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Deposit Amount</span>
                  <span className="value">AED {property.deposit?.toLocaleString() ?? 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

