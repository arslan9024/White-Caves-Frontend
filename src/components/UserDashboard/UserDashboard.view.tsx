import React from 'react';
import '../UserDashboard.css';
import { useUserDashboard } from './UserDashboard.logic';
import {
  OverviewTab,
  FavoritesTab,
  SearchesTab,
  AlertsTab,
  ActivityTab,
} from './UserDashboard.panels';

export const UserDashboardView: React.FC = () => {
  const {
    user,
    loading,
    activeTab,
    setActiveTab,
    tabs,
    stats,
    favorites,
    savedSearches,
    alerts,
    getPropertyById,
    removeFavorite,
    deleteSavedSearch,
    toggleAlert,
  } = useUserDashboard();

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <div className="user-avatar glow-effect">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div className="welcome-text">
            <h2>Welcome back, {user?.name || 'User'}!</h2>
            <p>Here's what's happening with your property search</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.count !== undefined && <span className="tab-count">{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className="dashboard-content stagger-entry">
        {activeTab === 'overview' && (
          <OverviewTab
            stats={stats}
            favorites={favorites}
            alerts={alerts}
            getPropertyById={getPropertyById}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesTab
            favorites={favorites}
            getPropertyById={getPropertyById}
            removeFavorite={removeFavorite}
          />
        )}

        {activeTab === 'searches' && (
          <SearchesTab savedSearches={savedSearches} deleteSavedSearch={deleteSavedSearch} />
        )}

        {activeTab === 'alerts' && <AlertsTab alerts={alerts} toggleAlert={toggleAlert} />}

        {activeTab === 'activity' && <ActivityTab />}
      </div>
    </div>
  );
};

