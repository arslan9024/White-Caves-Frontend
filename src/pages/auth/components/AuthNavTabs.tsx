import React, { memo } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import type { AuthMode } from './authTypes';

interface AuthNavTabsProps {
  mode: AuthMode;
  onSelectMode: (mode: AuthMode) => void;
  disabled?: boolean;
}

export const AuthNavTabs = memo(function AuthNavTabs({
  mode,
  onSelectMode,
  disabled = false,
}: AuthNavTabsProps) {
  return (
    <div className="auth-segmented-nav" role="tablist" aria-label="Authentication Flow Selection">
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'signin'}
        className={`auth-segmented-btn ${mode === 'signin' ? 'active' : ''}`}
        onClick={() => onSelectMode('signin')}
        disabled={disabled}
      >
        <span className="auth-nav-icon">
          <LogIn size={16} />
        </span>
        Sign In
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'signup'}
        className={`auth-segmented-btn ${mode === 'signup' ? 'active' : ''}`}
        onClick={() => onSelectMode('signup')}
        disabled={disabled}
      >
        <span className="auth-nav-icon">
          <UserPlus size={16} />
        </span>
        Register
      </button>
    </div>
  );
});

export default AuthNavTabs;
