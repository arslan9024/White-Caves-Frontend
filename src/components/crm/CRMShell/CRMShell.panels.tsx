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

export const CRMSidebarNav: React.FC<{
  navTree: CRMNavGroup[];
  expandedGroups: string[];
  activeCategory: string | null;
  activeSubItem: string | null;
  handleGroupToggle: (id: string) => void;
  handleSubItemClick: (group: CRMNavGroup, item: CRMNavSubItem) => void;
}> = ({
  navTree,
  expandedGroups,
  activeCategory,
  activeSubItem,
  handleGroupToggle,
  handleSubItemClick,
}) => (
  <aside className="crm-sidebar">
    <div className="crm-sidebar-header">
      <div className="crm-sidebar-title">CRM Navigation</div>
    </div>
    <nav className="crm-sidebar-nav">
      {navTree.map(group => {
        const GroupIcon = ICON_MAP[group.icon] || LayoutDashboard;
        const isExpanded = expandedGroups.includes(group.id);
        const isActiveGroup = activeCategory === group.id;

        return (
          <div
            key={group.id}
            className={`nav-group ${isExpanded ? 'expanded' : ''} ${isActiveGroup ? 'active-group' : ''}`}
          >
            <button className="nav-group-header" onClick={() => handleGroupToggle(group.id)}>
              <GroupIcon size={18} className="nav-group-icon" />
              <span className="nav-group-label">{group.label}</span>
              {group.badge && <span className="nav-group-badge">{group.badge}</span>}
              <span className="nav-group-chevron">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {isExpanded && (
              <div className="nav-group-items">
                {group.items.map(item => {
                  const ItemIcon = ICON_MAP[item.icon] || LayoutDashboard;
                  const isActive = activeSubItem === item.id;

                  return (
                    <button
                      key={item.id}
                      className={`nav-sub-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleSubItemClick(group, item)}
                    >
                      <ItemIcon size={16} className="nav-sub-icon" />
                      <span>{item.label}</span>
                      {item.badge && <span className="nav-sub-badge">{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  </aside>
);

export const CRMAiPanel: React.FC<{
  aiAssistants: CRMAssistant[];
  groupedAssistants: Record<string, CRMAssistant[]>;
  selectedAssistantForChat: string | null;
  handleAssistantClick: (id: string) => void;
  dispatch: any;
}> = ({
  aiAssistants,
  groupedAssistants,
  selectedAssistantForChat,
  handleAssistantClick,
  dispatch,
}) => (
  <aside className="crm-ai-panel">
    <div className="crm-ai-panel-header">
      <div className="crm-ai-panel-title">
        <span className="ai-icon">
          <Sparkles size={14} />
        </span>
        AI Command Center
      </div>
      <button
        className="crm-toggle-btn"
        onClick={() => dispatch(toggleAiPanel())}
        style={{ width: '32px', height: '32px' }}
      >
        <X size={16} />
      </button>
    </div>
    <div className="crm-ai-panel-content">
      <div className="ai-panel-stats">
        <div className="ai-stat">
          <div className="ai-stat-value">{aiAssistants.length}</div>
          <div className="ai-stat-label">Assistants</div>
        </div>
        <div className="ai-stat">
          <div className="ai-stat-value">
            {aiAssistants.filter(a => a.status === 'online').length}
          </div>
          <div className="ai-stat-label">Online</div>
        </div>
        <div className="ai-stat">
          <div className="ai-stat-value">{Object.keys(groupedAssistants).length}</div>
          <div className="ai-stat-label">Departments</div>
        </div>
      </div>

      <div className="ai-assistant-groups">
        {Object.entries(groupedAssistants).map(([dept, assistants]) => (
          <div key={dept} className="ai-assistant-group">
            <div className="ai-group-header">{DEPARTMENT_LABELS[dept] || dept}</div>
            <div className="ai-assistant-list">
              {assistants
                .filter(a => !a.reportsTo)
                .map(assistant => (
                  <div key={assistant.id}>
                    <div
                      className={`ai-assistant-item ${selectedAssistantForChat === assistant.id ? 'active' : ''} ${assistant.isTeamLead ? 'team-lead' : ''}`}
                      onClick={() => handleAssistantClick(assistant.id)}
                    >
                      <div className="ai-assistant-avatar" style={{ background: assistant.color }}>
                        {assistant.name.charAt(0)}
                      </div>
                      <div className="ai-assistant-info">
                        <div className="ai-assistant-name">
                          {assistant.name}
                          {assistant.isTeamLead && <span className="team-lead-badge">Lead</span>}
                        </div>
                        <div className="ai-assistant-role">{assistant.role}</div>
                      </div>
                      <div className={`ai-assistant-status ${assistant.status}`} />
                    </div>
                    {assistant.isTeamLead && (
                      <div className="ai-team-members">
                        <div className="ai-team-label">{assistant.teamName}</div>
                        {aiAssistants
                          .filter(m => m.reportsTo === assistant.id)
                          .map(member => (
                            <div
                              key={member.id}
                              className={`ai-assistant-item team-member ${selectedAssistantForChat === member.id ? 'active' : ''}`}
                              onClick={() => handleAssistantClick(member.id)}
                            >
                              <div
                                className="ai-assistant-avatar"
                                style={{ background: member.color }}
                              >
                                {member.name.charAt(0)}
                              </div>
                              <div className="ai-assistant-info">
                                <div className="ai-assistant-name">{member.name}</div>
                                <div className="ai-assistant-role">
                                  {member.specialty || member.role}
                                </div>
                              </div>
                              <div className={`ai-assistant-status ${member.status}`} />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedAssistantForChat && (
        <div className="ai-chat-preview">
          <div className="ai-chat-preview-header">
            <div
              className="ai-assistant-avatar"
              style={{
                background: aiAssistants.find(a => a.id === selectedAssistantForChat)?.color,
                width: '36px',
                height: '36px',
                fontSize: '0.875rem',
              }}
            >
              {aiAssistants.find(a => a.id === selectedAssistantForChat)?.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: '600' }}>
                {aiAssistants.find(a => a.id === selectedAssistantForChat)?.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {aiAssistants.find(a => a.id === selectedAssistantForChat)?.role}
              </div>
            </div>
          </div>
          <div className="ai-quick-actions">
            <button className="ai-quick-action">
              <MessageSquare size={14} /> Chat
            </button>
            <button className="ai-quick-action">
              <FileText size={14} /> Report
            </button>
            <button className="ai-quick-action">
              <Settings size={14} /> Config
            </button>
          </div>
          <button
            className="crm-btn crm-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <MessageSquare size={16} /> Start Conversation
          </button>
        </div>
      )}
    </div>
  </aside>
);
