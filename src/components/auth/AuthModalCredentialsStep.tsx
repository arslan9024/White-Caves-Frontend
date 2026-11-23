import React, { FC, FormEvent, RefObject } from 'react';
import { SocialAuthButtons } from '../../pages/auth/components/SocialAuthButtons';
import { AuthMethodTabs } from '../../pages/auth/components/AuthMethodTabs';
import { AuthModeSwitch } from '../../pages/auth/components/AuthModeSwitch';
import { AuthCopy } from './authModalConstants';
import { authModalStyles } from './authModalStyles';

export interface AuthModalCredentialsStepProps {
  mode: 'signin' | 'signup';
  copy: AuthCopy;
  error?: string | null;
  loading: boolean;
  forgotPasswordLoading: boolean;
  socialSyncRecovery?: { provider: string; reason: string } | null;
  socialRetryAttempts: number;
  isGoogleAuthAvailable: boolean;
  activeTab: 'email' | 'phone';
  setActiveTab: (tab: 'email' | 'phone') => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  fullName: string;
  setFullName: (val: string) => void;
  emailInputRef: RefObject<HTMLInputElement>;
  handleEmailSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> | void;
  handleForgotPassword: () => Promise<void> | void;
  handleSocialAuth: (provider: string) => void;
  retrySocialAuth: () => Promise<void> | void;
  clearSocialRecovery: () => void;
  switchMode: () => void;
}

export const AuthModalCredentialsStep: FC<AuthModalCredentialsStepProps> = ({
  mode,
  copy,
  error,
  loading,
  forgotPasswordLoading,
  socialSyncRecovery,
  socialRetryAttempts,
  isGoogleAuthAvailable,
  activeTab,
  setActiveTab,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  fullName,
  setFullName,
  emailInputRef,
  handleEmailSubmit,
  handleForgotPassword,
  handleSocialAuth,
  retrySocialAuth,
  clearSocialRecovery,
  switchMode,
}) => {
  const retryLimitReached = socialRetryAttempts >= 3;

  return (
    <>
      <div className="auth-intro">
        <h1>{mode === 'signup' ? copy.signUpTitle : copy.signInTitle}</h1>
        <p className="auth-subtitle">
          {mode === 'signup' ? copy.signUpSubtitle : copy.signInSubtitle}
        </p>
      </div>

      {error && <div style={authModalStyles.errorAlert}>{error}</div>}

      {socialSyncRecovery && (
        <div style={authModalStyles.socialRecoveryBox}>
          <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>
            {socialSyncRecovery.provider.toUpperCase()} Sign-in interrupted
          </p>
          <p style={{ margin: '0 0 12px 0' }}>{socialSyncRecovery.reason}</p>
          <button
            className="btn btn-secondary btn-full"
            disabled={loading || retryLimitReached}
            onClick={() => {
              void retrySocialAuth();
            }}
            style={authModalStyles.socialRetryButton}
          >
            {loading ? 'Retrying...' : 'Retry Sign-in'}
          </button>
          <button
            className="auth-forgot-link"
            style={authModalStyles.socialDismissButton}
            onClick={clearSocialRecovery}
          >
            Dismiss
          </button>
        </div>
      )}

      <SocialAuthButtons
        loading={loading}
        onSocialAuth={handleSocialAuth}
        label={copy.socialLabel}
        googleText={copy.google}
        facebookText={copy.facebook}
        appleText={copy.apple}
        googleDisabled={!isGoogleAuthAvailable}
      />

      <div className="auth-divider">
        <span>{copy.email}</span>
      </div>

      <AuthMethodTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        emailLabel={copy.email}
        phoneLabel={copy.phone}
      />

      <div className="auth-content" style={authModalStyles.contentContainer}>
        {activeTab === 'email' && (
          <form onSubmit={handleEmailSubmit} className="auth-form">
            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="signin-fullname">Full Name</label>
                <input
                  id="signin-fullname"
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="signin-email">Email Address</label>
              <input
                ref={emailInputRef}
                id="signin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </div>
            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="signin-confirm-password">Confirm Password</label>
                <input
                  id="signin-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
            {mode === 'signin' && (
              <button
                type="button"
                className="auth-forgot-link"
                onClick={() => {
                  void handleForgotPassword();
                }}
                disabled={forgotPasswordLoading || loading}
                style={authModalStyles.forgotPasswordLink}
              >
                {forgotPasswordLoading ? 'Sending...' : 'Forgot password?'}
              </button>
            )}
          </form>
        )}
      </div>

      <AuthModeSwitch
        mode={mode}
        onSwitch={switchMode}
        signInPromptText={copy.signInPromptText}
        signUpPromptText={copy.signUpPromptText}
      />
    </>
  );
};
