/**
 * useDashboardSidebar Hook
 * ========================
 * Manages sidebar flyout state, selected assistant, and Ctrl+B keyboard shortcuts.
 */

import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import {
  openFlyout,
  closeFlyout,
  selectAssistant,
  selectFlyoutOpen,
  selectFlyoutDepartment,
  selectSelectedAssistant as selectSelectedAssistantSelector,
  selectSelectedDepartment as selectSelectedDepartmentSelector,
} from '../../store/slices/sidebarSlice';

export function useDashboardSidebar() {
  const dispatch = useAppDispatch();

  // ─── Sidebar State from Redux ─────────────────────────────
  const flyoutOpen = useSelector(selectFlyoutOpen);
  const flyoutDepartment = useSelector(selectFlyoutDepartment);
  const selectedAssistantRedux = useSelector(selectSelectedAssistantSelector);
  const selectedDepartment = useSelector(selectSelectedDepartmentSelector);
  const leftCollapsed = !flyoutOpen;

  // Keep latest sidebar values in refs so keyboard listener can stay stable.
  const flyoutOpenRef = useRef(flyoutOpen);
  const flyoutDepartmentRef = useRef(flyoutDepartment);
  const selectedDepartmentRef = useRef(selectedDepartment);

  useEffect(() => {
    flyoutOpenRef.current = flyoutOpen;
  }, [flyoutOpen]);

  useEffect(() => {
    flyoutDepartmentRef.current = flyoutDepartment;
  }, [flyoutDepartment]);

  useEffect(() => {
    selectedDepartmentRef.current = selectedDepartment;
  }, [selectedDepartment]);

  // ─── Sidebar Handlers ─────────────────────────────────────
  const handleToggleLeftSidebar = useCallback(() => {
    if (flyoutOpen) {
      dispatch(closeFlyout());
    } else {
      dispatch(openFlyout(flyoutDepartment || selectedDepartment || 'general'));
    }
  }, [dispatch, flyoutOpen, flyoutDepartment, selectedDepartment]);

  const handleSelectAssistant = useCallback(
    (assistant: string | { id?: string }): void => {
      const id = typeof assistant === 'string' ? assistant : assistant?.id || '';
      dispatch(selectAssistant(id));
    },
    [dispatch]
  );

  // Keyboard shortcut: Ctrl+B / Cmd+B to toggle sidebar flyout
  useEffect((): (() => void) => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyB') {
        e.preventDefault();
        if (flyoutOpenRef.current) {
          dispatch(closeFlyout());
        } else {
          dispatch(
            openFlyout(flyoutDepartmentRef.current || selectedDepartmentRef.current || 'general')
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return {
    flyoutOpen,
    leftCollapsed,
    selectedDepartment,
    selectedAssistantRedux,
    handleToggleLeftSidebar,
    handleSelectAssistant,
  };
}
