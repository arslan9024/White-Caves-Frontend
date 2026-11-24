  UserRole,
  ChevronIcon,
  DropdownDivider,
  DropdownItem,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  DropdownFooter,
  SidebarToggleButton,
} from './styles';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UserProp {
  displayName?: string;
  email?: string;
  photoURL?: string;
}

interface NotificationItem_T {
  id?: string | number;
  isRead: boolean;
  title: string;
  time?: string;
  color?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
}

interface QuickStats {
  properties?: number;
  users?: number;
  leads?: number;
  systemHealth?: string;
}

interface MainNavBarProps {
  theme?: string;
  onThemeToggle?: () => void;
  user?: UserProp | null;
  notifications?: NotificationItem_T[];
  onLogout?: () => void;
  isSuperUser?: boolean;
  quickStats?: QuickStats | null;
  leftSidebarCollapsed?: boolean;
  onToggleLeftSidebar?: () => void;
}

type ProfileAction = 'admin' | 'profile' | 'settings' | 'billing' | 'help' | 'logout';

// ---------------------------------------------------------------------------
// Component
