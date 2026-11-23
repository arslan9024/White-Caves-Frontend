/* ═══════════════════════════════════════════════════════════════
   TOP BAR — Re-export barrel for styles
   Decomposed to satisfy AEGIS V5.1 rule AEG-042 (<310 lines/file)
   ═══════════════════════════════════════════════════════════════ */

// Navigation & structural components
export {
  TopBarContainer,
  LogoSection,
  LogoMark,
  LogoName,
  VerticalDivider,
  BreadcrumbsSection,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from './styles.nav';

// Action buttons, search trigger, notification badges, mobile hamburger
export {
  ActionsSection,
  ActionAnchor,
  SearchTrigger,
  SearchShortcut,
  QuickActionButton,
  IconButton,
  NotifBadge,
  HamburgerButton,
} from './styles.actions';

// User trigger and profile dropdown
export {
  UserButton,
  UserAvatar,
  UserName,
  DropdownOverlay,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownHeader,
  DropdownHeaderName,
  DropdownHeaderEmail,
  DropdownHeaderRole,
} from './styles.userDropdown';
