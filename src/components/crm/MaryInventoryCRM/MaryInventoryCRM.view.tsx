import React from 'react';
import { Building2, Plus, Download, Bot, Users, Phone, Star, Eye, Wrench } from 'lucide-react';
import AssistantFeatureMatrix from '../shared/AssistantFeatureMatrix';
import { MARY_FEATURES } from '../data/assistantFeatures';
import DataQualityIndicators from '../inventory/DataQualityIndicators';
import ClusterBrowser from '../inventory/ClusterBrowser';
import PropertyMatrix from '../inventory/PropertyMatrix';
import OwnerDetailDrawer from '../inventory/OwnerDetailDrawer';
import FilterPanel from '../inventory/FilterPanel';
import { MaryInventoryCRMProps } from './MaryInventoryCRM.types';
import { useMaryInventoryCRM } from './MaryInventoryCRM.logic';
import { DataToolsSection, ActiveFilterTags, PropertyDetailModal } from './MaryInventoryCRM.panels';
import '../MaryInventoryCRM.css';

export const MaryInventoryCRMView: React.FC<MaryInventoryCRMProps> = ({ activeFeature }) => {
  const {
    properties,
    stats,
    filters,
    filterOptions,
    activeFiltersCount,
    loading,
    showFeatures,
    setShowFeatures,
    setShowAddForm,
    selectedProperty,
    showDetailModal,
    setShowDetailModal,
    selectedOwner,
    setSelectedOwner,
    showOwnerDrawer,
    setShowOwnerDrawer,
    showFilters,
    setShowFilters,
    selectedCluster,
    setSelectedCluster,
    activeToolTab,
    setActiveToolTab,
    handleOwnerClick,
    handlePropertyClick,
    handleFilterChange,
    handleClearFilters,
    handleFilterToggle,
    getOwnerProperties,
    getPropertyOwners,
    setEditProperty,
  } = useMaryInventoryCRM(activeFeature);

  return (
    <div className="mary-crm-container">
      <div className="mary-header">
        <div className="mary-info">
          <div className="mary-avatar">
            <Bot size={28} />
          </div>
          <div className="mary-details">
            <h2>Mary - Inventory Manager</h2>
            <span className="mary-status">
              {loading ? 'Loading...' : `Managing ${properties.length.toLocaleString()} properties`}
            </span>
          </div>
        </div>
        <div className="mary-actions">
          <button className="mary-action-btn">
            <Download size={18} /> Export
          </button>
          <button
            className={`mary-action-btn tools ${activeToolTab ? 'active' : ''}`}
            onClick={() => setActiveToolTab(activeToolTab ? null : 'assets')}
          >
            <Wrench size={18} /> Data Tools
          </button>
          <button
            className={`mary-action-btn features ${showFeatures ? 'active' : ''}`}
            onClick={() => setShowFeatures(!showFeatures)}
          >
            <Star size={18} /> Features ({MARY_FEATURES.length})
          </button>
          <button className="mary-action-btn primary" onClick={() => setShowAddForm(true)}>
            <Plus size={18} /> Add Property
          </button>
        </div>
      </div>

      {activeToolTab && (
        <DataToolsSection
          activeToolTab={activeToolTab}
          setActiveToolTab={setActiveToolTab}
          selectedProperty={selectedProperty}
        />
      )}

      {showFeatures && (
        <div className="mary-features-panel">
          <AssistantFeatureMatrix
            features={MARY_FEATURES}
            assistantName="Mary"
            accentColor="#8b5cf6"
          />
        </div>
      )}

      <DataQualityIndicators onFilterClick={handleFilterToggle} />

      <div className="filter-toggle-row">
        <button
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Eye size={16} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {activeFiltersCount > 0 && <span className="filter-count">{activeFiltersCount}</span>}
        </button>
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFiltersCount={activeFiltersCount}
        />
      )}

      <ClusterBrowser
        selectedCluster={selectedCluster}
        onClusterSelect={cluster => {
          setSelectedCluster(cluster);
          handleFilterChange('cluster', cluster === 'all' ? null : cluster);
        }}
      />

      <div className="inventory-stats">
        <div className="stat-card">
          <Building2 size={24} />
          <div className="stat-content">
            <span className="stat-value">{stats.totalProperties?.toLocaleString() || 0}</span>
            <span className="stat-label">Total Properties</span>
          </div>
        </div>
        <div className="stat-card">
          <Users size={24} color="#8b5cf6" />
          <div className="stat-content">
            <span className="stat-value">{stats.totalOwners?.toLocaleString() || 0}</span>
            <span className="stat-label">Total Owners</span>
          </div>
        </div>
        <div className="stat-card warning">
          <Users size={24} color="#f59e0b" />
          <div className="stat-content">
            <span className="stat-value">{stats.multiOwnerProperties?.toLocaleString() || 0}</span>
            <span className="stat-label">Multi-Owner</span>
          </div>
        </div>
        <div className="stat-card">
          <Phone size={24} color="#EF4444" />
          <div className="stat-content">
            <span className="stat-value">
              {stats.ownersWithMultiplePhones?.toLocaleString() || 0}
            </span>
            <span className="stat-label">Multi-Phone Owners</span>
          </div>
        </div>
      </div>

      <ActiveFilterTags
        filters={filters}
        onMultiOwnerToggle={() => handleFilterToggle('showMultiOwner')}
        onMultiPhoneToggle={() => handleFilterToggle('showMultiPhone')}
        onMultiPropertyToggle={() => handleFilterToggle('showMultiProperty')}
        onFilterChange={handleFilterChange}
      />

      <PropertyMatrix onPropertySelect={handlePropertyClick} onOwnerSelect={handleOwnerClick} />

      {showOwnerDrawer && selectedOwner && (
        <OwnerDetailDrawer
          owner={selectedOwner}
          properties={getOwnerProperties(selectedOwner.id)}
          onClose={() => {
            setShowOwnerDrawer(false);
            setSelectedOwner(null);
          }}
          onPropertyClick={handlePropertyClick}
        />
      )}

      <PropertyDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        selectedProperty={selectedProperty}
        getPropertyOwners={getPropertyOwners}
        handleOwnerClick={handleOwnerClick}
        setEditProperty={setEditProperty}
      />
    </div>
  );
};
