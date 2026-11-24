import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PUBLIC_NAV } from '../../../config/navigation';
import type { NavItem } from '../../../config/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { selectSessionUser } from '../../../store/selectors/sessionSelectors';
import { UserPreferencesDropdown } from './UserPreferencesDropdown';
import './PublicNavbar.css';

// ---------------------------------------------------------------------------
// Dropdown menu config – each top-level item may have a sub-menu
// ---------------------------------------------------------------------------
export DropdownGroup {
  label: string;
  path: string;
  children?: NavItem[];
}

// ---------------------------------------------------------------------------
// DropdownItem component (desktop)
// ---------------------------------------------------------------------------
export DropdownNavItemProps {
  group: DropdownGroup;
}

export DropdownNavItem: React.FC<DropdownNavItemProps> = ({ group }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  if (!group.children?.length) {
    return (
      <NavLink
        to={group.path}
        className={({ isActive }) => `public-navbar__link${isActive ? ' active' : ''}`}
      >
        {group.label}
      </NavLink>
    );
  }

  return (
    <div
      ref={ref}
      className={`public-navbar__dropdown-wrap${open ? ' open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={group.path}
        className={({ isActive }) =>
          `public-navbar__link public-navbar__link--has-caret${isActive ? ' active' : ''}`
        }
        onClick={() => setOpen(false)}
        aria-haspopup="menu"
      >
        {group.label}
        <svg
          className="public-navbar__caret"
          aria-hidden="true"
          width="10"
          height="6"
          viewBox="0 0 10 6"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NavLink>

      {open && (
        <div className="public-navbar__dropdown">
          {group.children!.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="public-navbar__dropdown-item"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="public-navbar__dropdown-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main PublicNavbar component
// ---------------------------------------------------------------------------
