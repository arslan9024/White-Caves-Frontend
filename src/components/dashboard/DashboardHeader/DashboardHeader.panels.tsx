import React, { RefObject } from 'react';
import {
  Bell,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  Command,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { NotificationItem, DashboardUser } from './DashboardHeader.types';

export const NotificationsDropdownPanel: React.FC<{
  notifRef: RefObject<HTMLDivElement>;
  unreadCount: number;
  showNotifications: boolean;
  setShowNotifications: (val: boolean) => void;
  notifications: NotificationItem[];
}> = ({ notifRef, unreadCount, showNotifications, setShowNotifications, notifications }) => {
  return (
    <div className="notifications-wrapper" ref={notifRef}>
      <button
        className={`header-icon-btn ${unreadCount > 0 ? 'has-unread' : ''}`}
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="dropdown-header">
            <h4>Notifications</h4>
            <button className="mark-all-read">Mark all read</button>
          </div>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notif, index) => (
                <div
                  key={notif.id || index}
                  className={`notification-item ${!notif.isRead ? 'unread' : ''}`}
                >
                  <div className="notif-icon">
                    <Bell size={14} />
                  </div>
                  <div className="notif-content">
                    <p className="notif-message">{notif.message}</p>
                    {notif.timestamp && <span className="notif-time">{notif.timestamp}</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-notifications">
                <Bell size={32} strokeWidth={1.5} />
                <p>No new notifications</p>
              </div>
            )}
          </div>
          {notifications.length > 0 && (
            <div className="dropdown-footer">
              <button>View all notifications</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const UserMenuDropdownPanel: React.FC<{
  userMenuRef: RefObject<HTMLDivElement>;
  user: DashboardUser | null;
  getUserInitials: () => string;
  showUserMenu: boolean;
  setShowUserMenu: (val: boolean) => void;
  handleProfileAction: (action: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}> = ({
  userMenuRef,
  user,
  getUserInitials,
  showUserMenu,
  setShowUserMenu,
  handleProfileAction,
  language,
  setLanguage,
  t,
}) => {
  return (
    <div className="user-menu-wrapper" ref={userMenuRef}>
      <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
        <div className="user-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || 'User'} />
          ) : (
            <span>{getUserInitials()}</span>
          )}
        </div>
        <div className="user-info">
          <span className="user-name">{user?.displayName || 'Company Owner'}</span>
          <span className="user-role">Owner</span>
        </div>
        <ChevronDown size={16} className={`chevron ${showUserMenu ? 'open' : ''}`} />
      </button>

      {showUserMenu && (
        <div className="user-dropdown">
          <div className="dropdown-user-header">
            <div className="dropdown-avatar">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} />
              ) : (
                <span>{getUserInitials()}</span>
              )}
            </div>
            <div className="dropdown-user-info">
              <span className="dropdown-user-name">{user?.displayName || 'Company Owner'}</span>
              <span className="dropdown-user-email">{user?.email || 'owner@whitecaves.ae'}</span>
            </div>
          </div>
          <div className="dropdown-divider" />
          <div className="dropdown-menu-items">
            <button className="dropdown-item" onClick={() => handleProfileAction('profile')}>
              <User size={18} />
              <span>My Profile</span>
            </button>
            <button className="dropdown-item" onClick={() => handleProfileAction('settings')}>
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button className="dropdown-item" onClick={() => handleProfileAction('billing')}>
              <CreditCard size={18} />
              <span>Billing</span>
            </button>
            <div className="dropdown-divider" />
            <button className="dropdown-item" onClick={() => handleProfileAction('help')}>
              <HelpCircle size={18} />
              <span>Help Center</span>
            </button>
            <button
              className="dropdown-item"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            >
              <Command size={18} />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <div className="dropdown-divider" />
            <button className="dropdown-item logout" onClick={() => handleProfileAction('logout')}>
              <LogOut size={18} />
              <span>{t('dashboard.logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
