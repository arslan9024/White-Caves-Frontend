import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCommandPalette } from '../../../store/slices/sidebarSlice';

/**
 * Custom hook to manage TopBar dropdowns and keyboard shortcuts
 * Decomposed under AEGIS V5.1 AEG-042 (< 310 lines)
 */
export function useTopBarDropdowns() {
  const dispatch = useDispatch();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: Cmd+K / Ctrl+K → open command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        dispatch(toggleCommandPalette());
      }

      if (e.key === 'Escape') {
        setShowUserMenu(false);
        setShowNotifMenu(false);
        setShowQuickActions(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch]);

  // Click outside to close open dropdowns
  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(target)) {
        setShowUserMenu(false);
      }

      if (showNotifMenu && notifMenuRef.current && !notifMenuRef.current.contains(target)) {
        setShowNotifMenu(false);
      }

      if (
        showQuickActions &&
        quickActionsRef.current &&
        !quickActionsRef.current.contains(target)
      ) {
        setShowQuickActions(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [showUserMenu, showNotifMenu, showQuickActions]);

  const toggleUserMenu = () => {
    setShowUserMenu(p => !p);
    setShowNotifMenu(false);
    setShowQuickActions(false);
  };

  const toggleNotifMenu = () => {
    setShowNotifMenu(p => !p);
    setShowUserMenu(false);
    setShowQuickActions(false);
  };

  const toggleQuickActions = () => {
    setShowQuickActions(p => !p);
    setShowNotifMenu(false);
    setShowUserMenu(false);
  };

  const closeUserMenu = () => setShowUserMenu(false);
  const closeNotifMenu = () => setShowNotifMenu(false);
  const closeQuickActions = () => setShowQuickActions(false);

  return {
    showUserMenu,
    showNotifMenu,
    showQuickActions,
    userMenuRef,
    notifMenuRef,
    quickActionsRef,
    toggleUserMenu,
    toggleNotifMenu,
    toggleQuickActions,
    closeUserMenu,
    closeNotifMenu,
    closeQuickActions,
  };
}
