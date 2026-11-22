import React, { useMemo, useState } from 'react';
import { Briefcase, DollarSign, Plus, Search, Tag, Users } from 'lucide-react';
import {
  formatServiceRevenue,
  SERVICE_CATEGORIES,
  SERVICES_DATA,
  TIER_CONFIG,
} from './servicesCatalog/servicesCatalogData';
import { ServicesGridAndTable } from './servicesCatalog/ServicesGridAndTable';

export default function ServicesCRMTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => {
    const totalClients = SERVICES_DATA.reduce((sum, s) => sum + s.clients, 0);
    const totalRevenue = SERVICES_DATA.reduce((sum, s) => sum + s.revenue, 0);
    const avgRating = (
      SERVICES_DATA.reduce((sum, s) => sum + s.rating, 0) / SERVICES_DATA.length
    ).toFixed(1);
    return { totalClients, totalRevenue, avgRating };
  }, []);

  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return SERVICES_DATA.filter(service => {
      const matchesSearch =
        service.name.toLowerCase().includes(q) ||
        service.id.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesTier = selectedTier === 'all' || service.tier === selectedTier;
      return matchesSearch && matchesCategory && matchesTier;
    });
  }, [searchQuery, selectedCategory, selectedTier]);

  return (
    <div>
      <div className="crm-main-header">
        <div>
          <h1 className="crm-main-title">Services Catalog</h1>
          <p className="crm-main-subtitle">40 services across 8 categories | 5-tier access model</p>
        </div>
        <button className="crm-btn crm-btn-primary">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="crm-stats-grid">
        <div className="crm-stat-card">
          <div className="crm-stat-icon navy">
            <Briefcase size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">40</div>
            <div className="crm-stat-label">Total Services</div>
          </div>
        </div>
        <div className="crm-stat-card">
          <div className="crm-stat-icon gold">
            <Tag size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">8</div>
            <div className="crm-stat-label">Categories</div>
          </div>
        </div>
        <div className="crm-stat-card">
          <div className="crm-stat-icon success">
            <Users size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">{stats.totalClients.toLocaleString()}</div>
            <div className="crm-stat-label">Active Clients</div>
          </div>
        </div>
        <div className="crm-stat-card">
          <div className="crm-stat-icon info">
            <DollarSign size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">{formatServiceRevenue(stats.totalRevenue)}</div>
            <div className="crm-stat-label">Total Revenue</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '12px',
          }}
        >
          Categories (5 services each)
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`crm-btn ${selectedCategory === 'all' ? 'crm-btn-primary' : 'crm-btn-secondary'}`}
            onClick={() => setSelectedCategory('all')}
          >
            All (40)
          </button>
          {SERVICE_CATEGORIES.map(cat => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                className={`crm-btn ${selectedCategory === cat.id ? 'crm-btn-primary' : 'crm-btn-secondary'}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={selectedCategory === cat.id ? {} : { borderColor: cat.color }}
              >
                <IconComponent
                  size={14}
                  style={{ color: selectedCategory === cat.id ? 'inherit' : cat.color }}
                />
                {cat.code} ({cat.count})
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '12px',
          }}
        >
          Access Tiers
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`crm-btn ${selectedTier === 'all' ? 'crm-btn-primary' : 'crm-btn-secondary'}`}
            onClick={() => setSelectedTier('all')}
          >
            All Tiers
          </button>
          {Object.entries(TIER_CONFIG).map(([key, config]) => (
            <button
              key={key}
              className={`crm-btn ${selectedTier === key ? 'crm-btn-primary' : 'crm-btn-secondary'}`}
              onClick={() => setSelectedTier(key)}
              style={selectedTier === key ? {} : { borderColor: config.color, color: config.color }}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      <div className="crm-card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="crm-search" style={{ flex: 1 }}>
            <Search size={18} className="crm-search-icon" />
            <input
              type="text"
              className="crm-search-input"
              placeholder="Search services by name, code, or description..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className={`crm-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`crm-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '16px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Showing {filteredServices.length} of 40 services
      </div>

      <ServicesGridAndTable viewMode={viewMode} services={filteredServices} />
    </div>
  );
}
