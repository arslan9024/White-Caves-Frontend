import React from 'react';
import {
  UserStats,
  FavoriteItem,
  SavedSearch,
  UserAlert,
  PropertyItem,
} from './UserDashboard.types';
import { formatPrice, formatDate } from './UserDashboard.data';

interface OverviewTabProps {
  stats: UserStats;
  favorites: FavoriteItem[];
  alerts: UserAlert[];
  getPropertyById: (id: string | number) => PropertyItem | null;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  stats,
  favorites,
  alerts,
  getPropertyById,
}) => (
  <div className="overview-tab">
    <div className="stats-grid">
      <div className="stat-card slide-up">
        <div className="stat-icon">👁️</div>
        <div className="stat-info">
          <span className="stat-value">{stats.totalViews}</span>
          <span className="stat-label">Properties Viewed</span>
        </div>
      </div>
      <div className="stat-card slide-up">
        <div className="stat-icon">💬</div>
        <div className="stat-info">
          <span className="stat-value">{stats.totalInquiries}</span>
          <span className="stat-label">Inquiries Sent</span>
        </div>
      </div>
      <div className="stat-card slide-up">
        <div className="stat-icon">📅</div>
        <div className="stat-info">
          <span className="stat-value">{stats.scheduledViewings}</span>
          <span className="stat-label">Scheduled Viewings</span>
        </div>
      </div>
      <div className="stat-card slide-up">
        <div className="stat-icon">❤️</div>
        <div className="stat-info">
          <span className="stat-value">{favorites.length}</span>
          <span className="stat-label">Saved Properties</span>
        </div>
      </div>
    </div>

    <div className="overview-sections">
      <div className="overview-section">
        <h3>Recent Favorites</h3>
        {favorites.length > 0 ? (
          <div className="mini-property-list">
            {favorites.slice(0, 3).map(fav => {
              const property = getPropertyById(fav.propertyId);
              return property ? (
                <div key={fav.propertyId} className="mini-property-card">
                  <div
                    className="mini-property-image"
                    style={{
                      backgroundImage: `url(${
                        property.images?.[0] ||
                        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
                      })`,
                    }}
                  ></div>
                  <div className="mini-property-info">
                    <h4>{property.title}</h4>
                    <p>{formatPrice(property.price)}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <p className="empty-message">No favorites yet. Start exploring!</p>
        )}
      </div>

      <div className="overview-section">
        <h3>Active Alerts</h3>
        {alerts.filter(a => a.active).length > 0 ? (
          <div className="alert-list">
            {alerts
              .filter(a => a.active)
              .slice(0, 3)
              .map(alert => (
                <div key={alert._id} className="alert-item">
                  <span className="alert-name">{alert.name}</span>
                  <span className="alert-frequency">{alert.frequency}</span>
                </div>
              ))}
          </div>
        ) : (
          <p className="empty-message">No active alerts. Set up notifications!</p>
        )}
      </div>
    </div>
  </div>
);

interface FavoritesTabProps {
  favorites: FavoriteItem[];
  getPropertyById: (id: string | number) => PropertyItem | null;
  removeFavorite: (propertyId: string | number) => void;
}

export const FavoritesTab: React.FC<FavoritesTabProps> = ({
  favorites,
  getPropertyById,
  removeFavorite,
}) => (
  <div className="favorites-tab">
    <h3>Your Favorite Properties</h3>
    {favorites.length > 0 ? (
      <div className="favorites-grid">
        {favorites.map(fav => {
          const property = getPropertyById(fav.propertyId);
          return property ? (
            <div key={fav.propertyId} className="favorite-card">
              <div
                className="favorite-image"
                style={{
                  backgroundImage: `url(${
                    property.images?.[0] ||
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
                  })`,
                }}
              >
                <button className="remove-favorite" onClick={() => removeFavorite(fav.propertyId)}>
                  ×
                </button>
              </div>
              <div className="favorite-details">
                <h4>{property.title}</h4>
                <p className="favorite-location">{property.location}</p>
                <div className="favorite-specs">
                  <span>🛏️ {property.beds}</span>
                  <span>🚿 {property.baths}</span>
                  <span>📏 {property.sqft?.toLocaleString()} sqft</span>
                </div>
                <p className="favorite-price">{formatPrice(property.price)}</p>
                <p className="favorite-date">Saved {formatDate(fav.createdAt || new Date())}</p>
              </div>
            </div>
          ) : null;
        })}
      </div>
    ) : (
      <div className="empty-state">
        <span className="empty-icon">❤️</span>
        <h4>No favorites yet</h4>
        <p>Click the heart icon on properties you love to save them here</p>
      </div>
    )}
  </div>
);

interface SearchesTabProps {
  savedSearches: SavedSearch[];
  deleteSavedSearch: (searchId: string) => void;
}

export const SearchesTab: React.FC<SearchesTabProps> = ({ savedSearches, deleteSavedSearch }) => (
  <div className="searches-tab">
    <h3>Your Saved Searches</h3>
    {savedSearches.length > 0 ? (
      <div className="searches-list">
        {savedSearches.map(search => (
          <div key={search._id} className="search-card">
            <div className="search-info">
              <h4>{search.name}</h4>
              <div className="search-criteria">
                {search.criteria?.location && (
                  <span className="criteria-tag">📍 {search.criteria.location}</span>
                )}
                {search.criteria?.propertyType && (
                  <span className="criteria-tag">🏠 {search.criteria.propertyType}</span>
                )}
                {(search.criteria?.minPrice || search.criteria?.maxPrice) && (
                  <span className="criteria-tag">
                    💰 {search.criteria.minPrice ? formatPrice(search.criteria.minPrice) : 'Any'} -{' '}
                    {search.criteria.maxPrice ? formatPrice(search.criteria.maxPrice) : 'Any'}
                  </span>
                )}
                {search.criteria?.beds && (
                  <span className="criteria-tag">🛏️ {search.criteria.beds}+ beds</span>
                )}
              </div>
              <p className="search-date">Saved {formatDate(search.createdAt || new Date())}</p>
            </div>
            <div className="search-actions">
              <button className="run-search-btn">Run Search</button>
              <button className="delete-search-btn" onClick={() => deleteSavedSearch(search._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <h4>No saved searches</h4>
        <p>Save your search criteria to quickly find matching properties later</p>
      </div>
    )}
  </div>
);

interface AlertsTabProps {
  alerts: UserAlert[];
  toggleAlert: (alertId: string, currentActive: boolean) => void;
}

export const AlertsTab: React.FC<AlertsTabProps> = ({ alerts, toggleAlert }) => (
  <div className="alerts-tab">
    <h3>Price & Property Alerts</h3>
    {alerts.length > 0 ? (
      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert._id} className={`alert-card ${alert.active ? 'active' : 'inactive'}`}>
            <div className="alert-info">
              <h4>{alert.name}</h4>
              <p className="alert-type">{alert.type} Alert</p>
              <div className="alert-criteria">
                {alert.criteria?.location && <span>📍 {alert.criteria.location}</span>}
                {alert.criteria?.maxPrice && (
                  <span>💰 Under {formatPrice(alert.criteria.maxPrice)}</span>
                )}
              </div>
              <p className="alert-frequency-info">
                {alert.frequency} notifications via {alert.notificationMethod || 'email'}
              </p>
            </div>
            <div className="alert-controls">
              <label className="alert-toggle">
                <input
                  type="checkbox"
                  checked={alert.active}
                  onChange={() => toggleAlert(alert._id, alert.active)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <span className="empty-icon">🔔</span>
        <h4>No alerts set up</h4>
        <p>Get notified when new properties match your criteria or prices drop</p>
      </div>
    )}
  </div>
);

export const ActivityTab: React.FC = () => (
  <div className="activity-tab">
    <h3>Recent Activity</h3>
    <div className="activity-timeline">
      <div className="activity-item">
        <div className="activity-icon">👁️</div>
        <div className="activity-content">
          <p>
            Viewed <strong>Beachfront Villa - Palm Jumeirah</strong>
          </p>
          <span className="activity-time">2 hours ago</span>
        </div>
      </div>
      <div className="activity-item">
        <div className="activity-icon">❤️</div>
        <div className="activity-content">
          <p>
            Saved <strong>Penthouse - Downtown Dubai</strong> to favorites
          </p>
          <span className="activity-time">Yesterday</span>
        </div>
      </div>
      <div className="activity-item">
        <div className="activity-icon">💬</div>
        <div className="activity-content">
          <p>
            Sent inquiry for <strong>Villa - Emirates Hills</strong>
          </p>
          <span className="activity-time">3 days ago</span>
        </div>
      </div>
      <div className="activity-item">
        <div className="activity-icon">📅</div>
        <div className="activity-content">
          <p>
            Scheduled viewing for <strong>Apartment - Dubai Marina</strong>
          </p>
          <span className="activity-time">1 week ago</span>
        </div>
      </div>
      <div className="activity-item">
        <div className="activity-icon">🔍</div>
        <div className="activity-content">
          <p>
            Created saved search: <strong>Palm Jumeirah Villas</strong>
          </p>
          <span className="activity-time">2 weeks ago</span>
        </div>
      </div>
    </div>
  </div>
);

