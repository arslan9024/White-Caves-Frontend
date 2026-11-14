import React from 'react';
import {
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowUpRight,
  MapPin,
  Home,
  DollarSign,
} from 'lucide-react';
import { PropertyOpportunity, StatusMessage, SortByOption } from './PropertyOpportunityList.types';
import { getStatusColor, getConfidenceColor } from './PropertyOpportunityList.data';

interface StatusBannerProps {
  statusMessage: StatusMessage | null;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ statusMessage }) => {
  if (!statusMessage) return null;

  return (
    <div
      role={statusMessage.type === 'error' ? 'alert' : 'status'}
      data-testid="opportunity-status-banner"
      style={{
        marginBottom: '12px',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        borderLeft: `4px solid ${statusMessage.type === 'error' ? '#F04438' : '#12B76A'}`,
        background: statusMessage.type === 'error' ? '#FEF3F2' : '#ECFDF3',
        color: statusMessage.type === 'error' ? '#B42318' : '#027A48',
      }}
    >
      {statusMessage.type === 'error' ? '⚠️' : '✅'} {statusMessage.text}
    </div>
  );
};

interface FilterPanelProps {
  showFilters: boolean;
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  filterConfidence: number;
  setFilterConfidence: (c: number) => void;
  sortBy: SortByOption;
  setSortBy: (s: SortByOption) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  filterStatus,
  setFilterStatus,
  filterConfidence,
  setFilterConfidence,
  sortBy,
  setSortBy,
}) => {
  if (!showFilters) return null;

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>Status</label>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="initial_detection">Detected</option>
          <option value="waiting_for_photos">Awaiting Photos</option>
          <option value="partially_verified">Partially Verified</option>
          <option value="fully_verified">Fully Verified</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Confidence Score</label>
        <div className="confidence-slider">
          <input
            type="range"
            min="0"
            max="100"
            value={filterConfidence}
            onChange={e => setFilterConfidence(parseInt(e.target.value, 10))}
            className="slider"
          />
          <div className="slider-value">≥ {filterConfidence}%</div>
        </div>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortByOption)}
          className="filter-select"
        >
          <option value="confidence">Confidence (High to Low)</option>
          <option value="completeness">Completeness (High to Low)</option>
          <option value="recent">Most Recent</option>
          <option value="price">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

interface OpportunityCardProps {
  opp: PropertyOpportunity;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onAddToInventory: (opp: PropertyOpportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opp,
  isSelected,
  onToggleSelect,
  onUpdateStatus,
  onAddToInventory,
}) => {
  const statusColor = getStatusColor(opp.status);

  return (
    <div className="opportunity-card" onClick={onToggleSelect}>
      {/* Card Header */}
      <div className="card-header">
        <div className="card-title">
          <h3>{opp.propertyType.charAt(0).toUpperCase() + opp.propertyType.slice(1)}</h3>
          <div className="property-meta">
            <span className="meta-badge">
              <MapPin size={14} /> {opp.location}
            </span>
            <span className="meta-badge">
              <Home size={14} /> {opp.bedrooms} BR
            </span>
          </div>
        </div>

        <div className="card-badges">
          <div
            className="confidence-badge"
            style={{ backgroundColor: getConfidenceColor(opp.confidence) }}
            title={`${opp.confidence}% confidence score`}
          >
            {opp.confidence}%
          </div>
          <div
            className="status-badge"
            style={{
              backgroundColor: statusColor.bg,
              color: statusColor.text,
            }}
          >
            {statusColor.label}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Completeness Bar */}
        <div className="completeness-section">
          <div className="completeness-header">
            <label>Data Completeness</label>
            <span className="percentage">{opp.completeness}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${opp.completeness}%`,
                backgroundColor: opp.completeness >= 80 ? '#10B981' : '#F59E0B',
              }}
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Price</span>
            <span className="detail-value">
              <DollarSign size={14} />
              {opp.price.toLocaleString()} {opp.currency}
              <span className="frequency">{opp.availability === 'for_rent' ? '/month' : ''}</span>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Availability</span>
            <span className="detail-value">
              {opp.availability === 'for_rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Owner</span>
            <span className="detail-value">{opp.ownerName}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Phone</span>
            <span className="detail-value detail-phone">{opp.ownerPhone}</span>
          </div>

          <div className="detail-item full-width">
            <span className="detail-label">Extracted</span>
            <span className="detail-value">
              <Clock size={14} /> {opp.extractedAt}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer - Actions */}
      {isSelected && (
        <div className="card-footer" onClick={e => e.stopPropagation()}>
          {opp.status !== 'fully_verified' && (
            <button
              className="action-btn action-verify"
              onClick={() => onUpdateStatus(opp.id, 'fully_verified')}
            >
              <CheckCircle size={16} /> Mark as Verified
            </button>
          )}

          {opp.status === 'initial_detection' && (
            <button
              className="action-btn action-photos"
              onClick={() => onUpdateStatus(opp.id, 'waiting_for_photos')}
            >
              <AlertCircle size={16} /> Request Photos
            </button>
          )}

          {opp.status === 'fully_verified' && (
            <button className="action-btn action-add" onClick={() => onAddToInventory(opp)}>
              <ArrowUpRight size={16} /> Add to Mary Inventory
            </button>
          )}

          <button className="action-btn action-contact">Contact Owner</button>
        </div>
      )}
    </div>
  );
};
