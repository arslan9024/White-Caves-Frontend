import React from 'react';
import { Home, Search, Filter } from 'lucide-react';
import { usePropertyOpportunityList } from './PropertyOpportunityList.logic';
import { StatusBanner, FilterPanel, OpportunityCard } from './PropertyOpportunityList.panels';
import '../PropertyOpportunityList.css';

export const PropertyOpportunityListView: React.FC = () => {
  const {
    opportunities,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterConfidence,
    setFilterConfidence,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    selectedOpportunity,
    setSelectedOpportunity,
    statusMessage,
    filteredAndSorted,
    handleAddToInventory,
    handleUpdateStatus,
  } = usePropertyOpportunityList();

  return (
    <div className="opportunity-list">
      <StatusBanner statusMessage={statusMessage} />

      {/* Header */}
      <div className="opportunity-header">
        <div className="header-title">
          <Home size={24} />
          <div>
            <h1>Property Opportunities</h1>
            <p>Manage and verify properties discovered from conversations</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-value">{opportunities.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {opportunities.filter(o => o.confidence >= 80).length}
            </span>
            <span className="stat-label">High Confidence</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {opportunities.filter(o => o.status === 'fully_verified').length}
            </span>
            <span className="stat-label">Verified</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by location, owner, property type..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      <FilterPanel
        showFilters={showFilters}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterConfidence={filterConfidence}
        setFilterConfidence={setFilterConfidence}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Opportunities Grid */}
      <div className="opportunities-grid">
        {filteredAndSorted.length === 0 ? (
          <div className="empty-state">
            <Home size={48} />
            <h3>No opportunities found</h3>
            <p>Try adjusting your filters or check back later for new property opportunities</p>
          </div>
        ) : (
          filteredAndSorted.map(opp => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              isSelected={selectedOpportunity?.id === opp.id}
              onToggleSelect={() =>
                setSelectedOpportunity(selectedOpportunity?.id === opp.id ? null : opp)
              }
              onUpdateStatus={handleUpdateStatus}
              onAddToInventory={handleAddToInventory}
            />
          ))
        )}
      </div>
    </div>
  );
};
