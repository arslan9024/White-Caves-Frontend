import React, { memo } from 'react';
import { ShieldCheck } from 'lucide-react';

interface AuthHeaderProps {
  isSignup: boolean;
}

export const AuthHeader = memo(function AuthHeader({ isSignup }: AuthHeaderProps) {
  return (
    <div className="auth-header">
      <div className="auth-logo">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(239, 68, 68, 0.14)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <ShieldCheck size={15} color="#EF4444" />
          <span className="auth-logo-text" style={{ WebkitTextFillColor: '#FFFFFF' }}>
            White Caves
          </span>
        </div>
      </div>
      <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
      <p className="auth-subtitle">
        {isSignup
          ? 'Join White Caves to explore luxury properties in Dubai'
          : 'Sign in to access your personalized dashboard'}
      </p>
    </div>
  );
});

export default AuthHeader;
