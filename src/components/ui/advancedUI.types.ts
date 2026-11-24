/**
 * Advanced UI Components - Type Definitions
 * =========================================
 * Complete type system for professional UI components including
 * Notifications, Badges, Alerts, Dropdowns, and Toast messages
 */

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface NotificationConfig {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // milliseconds (0 = persistent)
  position?: NotificationPosition;
  action?: {
    label: string;
    callback: () => void;
  };
  icon?: string; // Icon name from lucide-react
  dismissible?: boolean;
  closable?: boolean;
  timestamp: string;
}

export interface NotificationContextType {
  notifications: NotificationConfig[];
  addNotification: (config: Omit<NotificationConfig, 'id' | 'timestamp'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: (type?: NotificationType) => void;
  updateNotification: (id: string, config: Partial<NotificationConfig>) => void;
}

// ============================================================================
// BADGE COMPONENT
// ============================================================================

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeShape = 'rounded' | 'pill' | 'square';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  children: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  count?: number; // For badge counter display
  dotOnly?: boolean; // Show as dot indicator
  pulse?: boolean; // Animated pulse effect
  tooltip?: string;
}

export interface BadgeConfig {
  variant: BadgeVariant;
  size: BadgeSize;
  shape: BadgeShape;
  colors: {
    background: string;
    text: string;
    border: string;
  };
  padding: string;
  fontSize: string;
  borderRadius: string;
}

// ============================================================================
// ALERT COMPONENT
// ============================================================================

export type AlertType = 'info' | 'success' | 'warning' | 'error';
export type AlertPosition = 'top' | 'inline';

export interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  description?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }[];
  className?: string;
  position?: AlertPosition;
  filled?: boolean; // Filled vs outlined style
}

export interface AlertConfig {
  type: AlertType;
  colors: {
    background: string;
    border: string;
    text: string;
    icon: string;
  };
  icon: React.ReactNode;
}

// ============================================================================
// DROPDOWN COMPONENT
// ============================================================================

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  divider?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  submenu?: DropdownItem[];
  badge?: {
    label: string;
    variant?: BadgeVariant;
  };
}

export type DropdownTriggerType = 'click' | 'hover';
export type DropdownAlignment = 'left' | 'center' | 'right';

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  triggerType?: DropdownTriggerType;
  alignment?: DropdownAlignment;
  maxHeight?: number; // pixels
  width?: number; // pixels
  className?: string;
  onItemSelect?: (item: DropdownItem) => void;
  onOpenChange?: (isOpen: boolean) => void;
  searchable?: boolean;
  filterable?: boolean;
  closeOnSelect?: boolean;
}

// ============================================================================
// TOAST NOTIFICATION
// ============================================================================

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastConfig {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number; // milliseconds (0 = persistent)
  position?: ToastPosition;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  onClose?: () => void;
  timestamp: string;
}

export interface ToastContextType {
  toasts: ToastConfig[];
  addToast: (config: Omit<ToastConfig, 'id' | 'timestamp'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  addSuccess: (message: string, options?: Partial<ToastConfig>) => string;
  addError: (message: string, options?: Partial<ToastConfig>) => string;
  addWarning: (message: string, options?: Partial<ToastConfig>) => string;
  addInfo: (message: string, options?: Partial<ToastConfig>) => string;
}

// ============================================================================
// POPOVER COMPONENT
// ============================================================================

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto';
export type PopoverTrigger = 'click' | 'hover' | 'focus';

export interface PopoverProps {
  content: React.ReactNode | string;
  children: React.ReactNode;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  title?: string;
  closable?: boolean;
  maxWidth?: number;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
  delay?: {
    open?: number;
    close?: number;
  };
}

// ============================================================================
// TOOLTIP COMPONENT
// ============================================================================

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
export * from './advancedUIExtended.types';
