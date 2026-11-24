/**
 * CRM Shell — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for TopBar, Sidebar Navigation, and Right AI Command Center
 * Strictly < 350 lines
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  Moon,
  Sun,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Sparkles,
  MessageSquare,
  FileText,
  LayoutDashboard,
} from 'lucide-react';
import { SUPER_ADMIN } from '../../../config/superAdmin';
import { ICON_MAP, DEPARTMENT_LABELS } from './CRMShell.types';
import type { CRMNavGroup, CRMNavSubItem, CRMAssistant, CRMBreadcrumb } from './CRMShell.types';
import { toggleSidebar, toggleAiPanel } from '../../../store/slices/crmViewSlice';

export const CRMTopBar: React.FC<{
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  breadcrumbs: CRMBreadcrumb[];
  searchQuery: string;
  theme: string;
  user: any;
  showUserMenu: boolean;
  setSearchQuery: (q: string) => void;
  setShowUserMenu: (s: boolean | ((prev: boolean) => boolean)) => void;
  toggleTheme: () => void;
  handleBreadcrumbClick: (id: string) => void;
  handleLogout: () => void;
  dispatch: any;
  navigate: (p: string) => void;
}> = ({
  sidebarOpen,
  aiPanelOpen,
  breadcrumbs,
  searchQuery,
  theme,
  user,
  showUserMenu,
  setSearchQuery,
  setShowUserMenu,
  toggleTheme,
  handleBreadcrumbClick,
  handleLogout,
  dispatch,
  navigate,
}) => (
  <header className="crm-topnav">
    <div className="crm-topnav-left">
      <button
        className={`crm-toggle-btn ${sidebarOpen ? 'active' : ''}`}
        onClick={() => dispatch(toggleSidebar())}
        title="Toggle CRM Menu"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <Link to="/" className="crm-brand">
        <div className="crm-brand-logo">W</div>
        <span>White Caves</span>
      </Link>

      {breadcrumbs.length > 0 && (
        <div className="crm-breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              {index > 0 && <ChevronRight size={14} className="breadcrumb-sep" />}
              <button className="breadcrumb-item" onClick={() => handleBreadcrumbClick(crumb.id)}>
                {crumb.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>

    <div className="crm-topnav-center">
      <div className="crm-search">
        <Search size={18} className="crm-search-icon" />
        <input
          type="text"
          className="crm-search-input"
          placeholder="Search properties, leads, clients..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

    <div className="crm-topnav-right">
      <button className="crm-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <button className="crm-toggle-btn" title="Notifications">
        <Bell size={18} />
      </button>

      <button
        className={`crm-toggle-btn ai-toggle ${aiPanelOpen ? 'active' : ''}`}
        onClick={() => dispatch(toggleAiPanel())}
        title="AI Command Center"
      >
        <Sparkles size={18} />
        <span className="ai-toggle-label">AI</span>
      </button>

      <div className="user-menu-container" style={{ position: 'relative' }}>
        <button
          className="crm-toggle-btn"
          onClick={() => setShowUserMenu(prev => !prev)}
          style={{
            width: 'auto',
            padding: '6px 12px',
            gap: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'var(--crm-navy)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: '600',
            }}
          >
            {user?.displayName?.charAt(0) || 'A'}
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
            {user?.displayName || SUPER_ADMIN.name.split(' ')[0]}
          </span>
          <ChevronDown size={16} />
        </button>

        {showUserMenu && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              background: 'var(--surface-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '8px',
              minWidth: '180px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 200,
            }}
          >
            <div
              style={{
                padding: '8px 12px',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '8px',
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                {user?.displayName || SUPER_ADMIN.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {user?.email || SUPER_ADMIN.email}
              </div>
              <div
                style={{
                  marginTop: '6px',
                  fontSize: '0.625rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '3px 8px',
                  background: 'var(--crm-gold)',
                  color: 'var(--crm-navy)',
                  borderRadius: '4px',
                  display: 'inline-block',
                }}
              >
                Managing Director
              </div>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="crm-nav-item"
              style={{ width: '100%', margin: 0 }}
            >
              <Settings size={16} /> Settings
            </button>
            <button
              onClick={handleLogout}
              className="crm-nav-item"
              style={{ width: '100%', margin: 0, color: 'var(--accent-red, #EF4444)' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);

export { CRMSidebarNav, CRMAiPanel } from './CRMShell.sidePanels';
