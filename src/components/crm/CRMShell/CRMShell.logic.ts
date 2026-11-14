/**
 * CRM Shell — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing navigation, theme toggling, search, Redux dispatchers, and panel states
 * Strictly < 350 lines
 */

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setActiveObjectId,
  setActiveAssistant,
  toggleSidebar,
  toggleAiPanel,
  setSelectedAssistantForChat,
  navigateToBreadcrumb,
  toggleNavGroup,
  setActiveSubItem,
  selectActiveCategory,
  selectSidebarOpen,
  selectAiPanelOpen,
  selectAllAiAssistants,
  selectBreadcrumbs,
  selectSelectedAssistantForChat,
  selectNavTree,
  selectExpandedGroups,
  selectActiveSubItem,
} from '../../../store/slices/crmViewSlice';
import type { CRMNavGroup, CRMNavSubItem, CRMAssistant } from './CRMShell.types';

export function useCRMShellLogic(onTabChange?: (tabId: string) => void) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user?.currentUser);

  const sidebarOpen = useSelector(selectSidebarOpen);
  const aiPanelOpen = useSelector(selectAiPanelOpen);
  const activeCategory = useSelector(selectActiveCategory);
  const activeSubItem = useSelector(selectActiveSubItem);
  const aiAssistants: CRMAssistant[] = useSelector(selectAllAiAssistants) || [];
  const breadcrumbs = useSelector(selectBreadcrumbs) || [];
  const selectedAssistantForChat = useSelector(selectSelectedAssistantForChat);
  const navTree: CRMNavGroup[] = useSelector(selectNavTree) || [];
  const expandedGroups = useSelector(selectExpandedGroups) || [];

  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const handleGroupToggle = (groupId: string) => {
    dispatch(toggleNavGroup(groupId));
  };

  const handleSubItemClick = (group: CRMNavGroup, item: CRMNavSubItem) => {
    dispatch(
      setActiveSubItem({
        categoryId: group.id,
        subItemId: item.id,
        categoryLabel: group.label,
        subItemLabel: item.label,
      })
    );
    if (onTabChange) {
      onTabChange(item.id);
    }
  };

  const handleBreadcrumbClick = (crumbId: string) => {
    dispatch(navigateToBreadcrumb(crumbId));
    if (onTabChange) {
      onTabChange(crumbId);
    }
  };

  const handleAssistantClick = (assistantId: string) => {
    dispatch(setActiveAssistant(assistantId));
    dispatch(setSelectedAssistantForChat(assistantId));
    dispatch(setActiveObjectId(assistantId));
    if (onTabChange) {
      onTabChange(assistantId);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const groupedAssistants = aiAssistants.reduce<Record<string, CRMAssistant[]>>(
    (acc, assistant) => {
      const dept = assistant.dept || 'other';
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(assistant);
      return acc;
    },
    {}
  );

  return {
    dispatch,
    navigate,
    user,
    sidebarOpen,
    aiPanelOpen,
    activeCategory,
    activeSubItem,
    aiAssistants,
    breadcrumbs,
    selectedAssistantForChat,
    navTree,
    expandedGroups,
    theme,
    searchQuery,
    setSearchQuery,
    showUserMenu,
    setShowUserMenu,
    toggleTheme,
    handleGroupToggle,
    handleSubItemClick,
    handleBreadcrumbClick,
    handleAssistantClick,
    handleLogout,
    groupedAssistants,
  };
}
