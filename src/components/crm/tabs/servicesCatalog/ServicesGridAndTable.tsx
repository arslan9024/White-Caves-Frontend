import React, { type FC } from 'react';
import { DollarSign, Eye, Star, Users } from 'lucide-react';
import {
  formatServiceRevenue,
  SERVICE_CATEGORIES,
  TIER_CONFIG,
  type ServiceCatalogItem,
} from './servicesCatalogData';

interface ServicesGridAndTableProps {
  viewMode: 'grid' | 'list';
  services: ServiceCatalogItem[];
}

export const ServicesGridAndTable: FC<ServicesGridAndTableProps> = ({ viewMode, services }) => {
  if (viewMode === 'grid') {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {services.map(service => {
          const tierConfig = TIER_CONFIG[service.tier];
          const category = SERVICE_CATEGORIES.find(c => c.id === service.category);
          return (
            <div
              key={service.id}
              className="crm-card"
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: category?.color || 'var(--text-muted)',
                    background: 'var(--surface-secondary)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {service.id}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: tierConfig.bg,
                    color: tierConfig.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {tierConfig.label}
                </span>
              </div>

              <h3
                style={{
                  margin: '0 0 4px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                }}
              >
                {service.name}
              </h3>
              <p style={{ margin: '0 0 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {service.description}
              </p>

              <div
                style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '0.8rem' }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--crm-gold)',
                    fontWeight: '600',
                  }}
                >
                  <DollarSign size={14} /> {service.price}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Users size={14} /> {service.clients}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--accent-green, #10B981)',
                  }}
                >
                  <Star size={14} /> {service.rating}%
                </span>
              </div>

              <div
                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}
              >
                Revenue:{' '}
                <span style={{ color: 'var(--crm-navy)', fontWeight: '600' }}>
                  {formatServiceRevenue(service.revenue)}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="crm-btn crm-btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.8rem' }}
                >
                  <Eye size={14} /> View
                </button>
                <button
                  className="crm-btn crm-btn-gold"
                  style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.8rem' }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="crm-table-wrapper">
      <table className="crm-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Service Name</th>
            <th>Category</th>
            <th>Tier</th>
            <th>Price</th>
            <th>Clients</th>
            <th>Rating</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            const tierConfig = TIER_CONFIG[service.tier];
            const category = SERVICE_CATEGORIES.find(c => c.id === service.category);
            return (
              <tr key={service.id}>
                <td>
                  <code
                    style={{
                      background: 'var(--surface-secondary)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      color: category?.color,
                    }}
                  >
                    {service.id}
                  </code>
                </td>
                <td>
                  <div style={{ fontWeight: '500' }}>{service.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {service.description}
                  </div>
                </td>
                <td style={{ fontSize: '0.8rem' }}>{category?.code}</td>
                <td>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '10px',
                      background: tierConfig.bg,
                      color: tierConfig.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    {tierConfig.label}
                  </span>
                </td>
                <td style={{ color: 'var(--crm-gold)', fontWeight: '500' }}>{service.price}</td>
                <td>{service.clients}</td>
                <td>
                  <span style={{ color: 'var(--accent-green, #10B981)', fontWeight: '500' }}>
                    {service.rating}%
                  </span>
                </td>
                <td style={{ fontWeight: '500' }}>{formatServiceRevenue(service.revenue)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
