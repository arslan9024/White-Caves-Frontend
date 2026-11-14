import React from 'react';
import { Menu, Bot, Search, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { DashboardHeaderProps } from './DashboardHeader.types';
import { ICON_MAP } from './DashboardHeader.data';
import { useDashboardHeaderLogic } from './DashboardHeader.logic';
import { NotificationsDropdownPanel, UserMenuDropdownPanel } from './DashboardHeader.panels';
import '../DashboardHeader.css';

export const DashboardHeaderView: React.FC<DashboardHeaderProps> = props => {
  const { activeAssistant, onMenuToggle, notifications = [], user = null } = props;

  const {
    theme,
    language,
    searchQuery,
    setSearchQuery,
    showNotifications,
    setShowNotifications,
    showUserMenu,
    setShowUserMenu,
    searchFocused,
    setSearchFocused,
    activeFeature,
    notifRef,
    userMenuRef,
    unreadCount,
    features,
    handleThemeToggle,
    handleFeatureClick,
    getUserInitials,
    handleProfileAction,
    setLanguage,
    t,
  } = useDashboardHeaderLogic(props);

  return (
    <header className="dashboard-header-crimson">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>

        {activeAssistant && (
          <div className="active-assistant-context">
            <div
              className="assistant-badge"
              style={{
                background: `${activeAssistant.color || '#EF4444'}20`,
                color: activeAssistant.color || '#EF4444',
              }}
            >
              <Bot size={16} />
              <span>{activeAssistant.name}</span>
            </div>
          </div>
        )}

        <div className="header-tabs">
          {features.map(feature => {
            const Icon = (feature.icon && ICON_MAP[feature.icon]) || LayoutDashboard;
            return (
              <button
                key={feature.id}
                className={`header-tab ${activeFeature === feature.id ? 'active' : ''}`}
                onClick={() => handleFeatureClick(feature)}
                style={
                  {
                    '--tab-color': activeAssistant?.color || 'var(--accent-red, #D32F2F)',
                  } as React.CSSProperties
                }
              >
                <Icon size={18} />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="header-center">
        <div className={`dashboard-search ${searchFocused ? 'focused' : ''}`}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="dashboard-search-input"
            placeholder={`Search ${activeAssistant?.name || 'assistants'}...`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="search-shortcut">
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          className="header-icon-btn theme-toggle"
          onClick={handleThemeToggle}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <NotificationsDropdownPanel
          notifRef={notifRef as React.RefObject<HTMLDivElement>}
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
        />

        <UserMenuDropdownPanel
          userMenuRef={userMenuRef as React.RefObject<HTMLDivElement>}
          user={user}
          getUserInitials={getUserInitials}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          handleProfileAction={handleProfileAction}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      </div>
    </header>
  );
};
