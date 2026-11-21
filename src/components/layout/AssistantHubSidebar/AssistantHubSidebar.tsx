import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Search,
  X,
  Star,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Building2,
  Target,
  Bot,
  Users,
  TrendingUp,
  Home,
  Wallet,
  Megaphone,
  Briefcase,
  Shield,
  Server,
  Palette,
  Database,
  Scale,
  Eye,
  Zap,
  Activity,
  Clock,
  Command,
  Crown,
  PieChart,
  Map,
  Wrench,
  Building,
  LineChart,
} from 'lucide-react';
import { DEPARTMENTS, getAllAssistants } from '../../../config/assistantRegistry';
import { getAssistantWithFeatures } from '../../../config/assistants';
import { setSidebarSearchQuery, toggleFavoriteAssistant } from '../../../store/appSlice';
import './AssistantHubSidebar.css';

const ICON_MAP: Record<string, any> = {
  MessageSquare,
  Building2,
  Target,
  Bot,
  Users,
  TrendingUp,
  Home,
  Wallet,
  Megaphone,
  Briefcase,
  Shield,
  Server,
  Palette,
  Database,
  Scale,
  Eye,
  Search,
  Zap,
  Activity,
  Clock,
  Command,
  Crown,
  PieChart,
  Map,
  Wrench,
  Building,
  LineChart,
};

const AssistantHubSidebar = ({
  isOpen,
  onClose,
  onAssistantSelect,
  activeAssistant,
  isCollapsed = false,
  userRole = 'owner',
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onAssistantSelect: (assistant: any) => void;
  activeAssistant?: any;
  isCollapsed?: boolean;
  userRole?: string;
}) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.app?.sidebarSearchQuery || '');
  const favoriteAssistants = useSelector((state: any) => state.app?.favoriteAssistants || []);
  const assistantStatuses = useSelector((state: any) => state.app?.assistantStatuses || {});
  const notifications = useSelector((state: any) => state.app?.notifications || {});

  const [expandedDepartments, setExpandedDepartments] = useState<Record<string, boolean>>({
    executive: true,
    communications: true,
    operations: true,
    sales: true,
    finance: false,
    marketing: false,
    compliance: false,
    legal: false,
    technology: false,
    intelligence: false,
  });

  const allAssistants = useMemo(() => getAllAssistants(), []);

  const roleFilteredAssistants = useMemo(() => {
    if (userRole === 'owner') return allAssistants;
    return allAssistants.filter(a => {
      const viewableBy = a.permissions?.viewableBy || ['owner'];
      return viewableBy.includes(userRole) || viewableBy.includes('all');
    });
  }, [allAssistants, userRole]);

  const filteredAssistants = useMemo(() => {
    if (!searchQuery) return roleFilteredAssistants;
    const query = searchQuery.toLowerCase();
    return roleFilteredAssistants.filter(
      a =>
        a.name.toLowerCase().includes(query) ||
        a.title.toLowerCase().includes(query) ||
        a.department.toLowerCase().includes(query)
    );
  }, [roleFilteredAssistants, searchQuery]);

  const assistantsByDepartment = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    filteredAssistants.forEach(assistant => {
      if (!grouped[assistant.department]) {
        grouped[assistant.department] = [];
      }
      grouped[assistant.department].push(assistant);
    });
    return grouped;
  }, [filteredAssistants]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSidebarSearchQuery(e.target.value));
  };

  const toggleDepartment = (dept: string) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [dept]: !prev[dept],
    }));
  };

  const handleAssistantClick = (assistant: any) => {
    const fullAssistant = getAssistantWithFeatures(assistant.id);
    onAssistantSelect(fullAssistant);
  };

  const handleFavoriteToggle = (e: React.SyntheticEvent, assistantId: string) => {
    e.stopPropagation();
    dispatch(toggleFavoriteAssistant(assistantId));
  };

  const getAssistantIcon = (iconName: string) => {
    return ICON_MAP[iconName] || Building2;
  };

  const getNotificationCount = (assistantId: string) => {
    const notifs = notifications[assistantId];
    return Array.isArray(notifs) ? notifs.filter((n: any) => !n.isRead).length : 0;
  };

  const departmentOrder = [
    'executive',
    'communications',
    'operations',
    'sales',
    'finance',
    'marketing',
    'compliance',
    'legal',
    'technology',
    'intelligence',
  ];

  if (!isOpen && !isCollapsed) return null;

  return (
    <aside
      className={`assistant-hub-sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
    >
      <div className="sidebar-header">
        {!isCollapsed && (
          <>
            <div className="sidebar-title">
              <Command size={20} className="title-icon" />
              <span>AI Assistants</span>
            </div>
            <button className="close-btn mobile-only" onClick={onClose}>
              <X size={20} />
            </button>
          </>
        )}
        {isCollapsed && (
          <div className="collapsed-icon">
            <Command size={24} />
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="sidebar-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search assistants..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => dispatch(setSidebarSearchQuery(''))}>
              <X size={14} />
            </button>
          )}
        </div>
      )}

      <div className="assistant-list">
        {departmentOrder.map(deptId => {
          const dept = (DEPARTMENTS as Record<string, any>)[deptId];
          const assistants = assistantsByDepartment[deptId];

          if (!dept || !assistants || assistants.length === 0) return null;

          const isExpanded = expandedDepartments[deptId];
          const DeptIcon = getAssistantIcon(dept.icon);
          const hasActiveAssistant = assistants.some((a: any) => activeAssistant?.id === a.id);

          return (
            <div
              key={deptId}
              className={`department-section ${hasActiveAssistant ? 'has-active' : ''}`}
            >
              <button
                className="department-header"
                onClick={() => toggleDepartment(deptId)}
                style={{ '--dept-color': dept.color } as React.CSSProperties}
              >
                {isCollapsed ? (
                  <DeptIcon size={20} style={{ color: dept.color }} />
                ) : (
                  <>
                    <div className="dept-indicator" style={{ background: dept.color }} />
                    <span className="dept-name">{dept.label}</span>
                    <span className="dept-count">{assistants.length}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </>
                )}
              </button>

              {isExpanded && !isCollapsed && (
                <div className="assistants-grid">
                  {assistants.map((assistant: any) => {
                    const Icon = getAssistantIcon(assistant.icon);
                    const isActive = activeAssistant?.id === assistant.id;
                    const isFavorite = favoriteAssistants.includes(assistant.id);
                    const status = assistantStatuses[assistant.id] || 'online';
                    const notifCount = getNotificationCount(assistant.id);

                    return (
                      <button
                        key={assistant.id}
                        className={`assistant-card ${isActive ? 'active' : ''}`}
                        onClick={() => handleAssistantClick(assistant)}
                        style={{ '--assistant-color': assistant.color } as React.CSSProperties}
                      >
                        <div className="card-header">
                          <div
                            className="assistant-icon"
                            style={{ background: `${assistant.color}20` }}
                          >
                            <Icon size={18} style={{ color: assistant.color }} />
                          </div>
                          <span
                            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                            onClick={e => handleFavoriteToggle(e, assistant.id)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleFavoriteToggle(e, assistant.id);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Star size={14} fill={isFavorite ? 'currentColor' : 'none'} />
                          </span>
                        </div>

                        <div className="card-content">
                          <div className="assistant-name-row">
                            <span className="assistant-name">{assistant.name}</span>
                            <span className={`status-dot ${status}`} />
                          </div>
                          <span className="assistant-title">{assistant.title}</span>
                        </div>

                        {notifCount > 0 && <span className="notification-badge">{notifCount}</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="footer-stats">
            <span className="stat">
              <span className="stat-value">{allAssistants.length}</span>
              <span className="stat-label">Assistants</span>
            </span>
            <span className="stat">
              <span className="stat-value online">24</span>
              <span className="stat-label">Online</span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AssistantHubSidebar;

