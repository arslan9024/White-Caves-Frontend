export type TooltipTrigger = 'hover' | 'focus';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  delay?: number;
  theme?: 'dark' | 'light';
  className?: string;
}

// ============================================================================
// MODAL/DIALOG OVERLAY
// ============================================================================

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  centered?: boolean;
  closeButton?: boolean;
  backdrop?: boolean;
  onBackdropClick?: () => void;
  className?: string;
  footer?: React.ReactNode;
}

// ============================================================================
// PROGRESS COMPONENT
// ============================================================================

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface ProgressProps {
  value: number; // 0-100
  variant?: ProgressVariant;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  striped?: boolean;
  animated?: boolean;
  className?: string;
  label?: string;
}

// ============================================================================
// SKELETON LOADER
// ============================================================================

export type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  count?: number;
  height?: number;
  width?: number | string;
  circle?: boolean;
  className?: string;
  animated?: boolean;
}

// ============================================================================
// TABS COMPONENT
// ============================================================================

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

export type TabsVariant = 'default' | 'pills' | 'underline';

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  variant?: TabsVariant;
  onChange?: (activeId: string) => void;
  className?: string;
}

// ============================================================================
// PAGINATION COMPONENT
// ============================================================================

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  showFirstLastButtons?: boolean;
  showPageJumper?: boolean;
  maxPages?: number; // Max page numbers to show
  className?: string;
}

// ============================================================================
// SPINNER/LOADING COMPONENT
// ============================================================================

export type SpinnerVariant = 'default' | 'dots' | 'bounce' | 'pulse';
export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: string;
  label?: string;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const NOTIFICATION_DEFAULTS = {
  duration: 5000,
  position: 'top-right' as NotificationPosition,
  dismissible: true,
};

export const BADGE_VARIANTS: Record<BadgeVariant, BadgeConfig> = {
  primary: {
    variant: 'primary',
    size: 'medium',
    shape: 'rounded',
    colors: { background: '#0066cc', text: '#ffffff', border: '#0052a3' },
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '4px',
  },
  secondary: {
    variant: 'secondary',
    size: 'medium',
    shape: 'rounded',
    colors: { background: '#e0e0e0', text: '#333333', border: '#b3b3b3' },
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '4px',
  },
  success: {
    variant: 'success',
    size: 'medium',
    shape: 'rounded',
    colors: { background: '#4caf50', text: '#ffffff', border: '#388e3c' },
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '4px',
  },
  warning: {
    variant: 'warning',
    size: 'medium',
    shape: 'rounded',
    colors: { background: '#ff9800', text: '#ffffff', border: '#f57c00' },
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '4px',
  },
  error: {
    variant: 'error',
    size: 'medium',
    shape: 'rounded',
    colors: { background: '#f44336', text: '#ffffff', border: '#d32f2f' },
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '4px',
  },
  info: {
    variant: 'info',
    size: 'medium',
    shape: 'rounded',
    colors: { background: '#2196f3', text: '#ffffff', border: '#1565c0' },
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '4px',
  },
};

export const ALERT_ICONS: Record<AlertType, string> = {
  info: 'Info',
  success: 'CheckCircle',
  warning: 'AlertCircle',
  error: 'X',
};

export const TOAST_POSITIONS: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export const MODAL_SIZES: Record<ModalSize, string> = {
  small: '400px',
  medium: '600px',
  large: '800px',
  fullscreen: '100%',
};


