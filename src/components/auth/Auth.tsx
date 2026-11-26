/**
 * Auth.tsx  (view – <350 lines, AEG-042)
 * Single-purpose: Renders the White Caves authentication UI.
 * All controller hooks live in useAuthController.ts; business logic in Auth.logic.ts.
 */

import React from 'react';
import Profile from '../Profile';
import { AuthEmailForm } from './AuthEmailForm';
import { AuthPhoneForm } from './AuthPhoneForm';
import ProfileCompletion from '../ProfileCompletion';
import { GoogleIcon, AppleIcon, FacebookIcon, EmailIcon, PhoneIcon } from './Auth.icons';
import { useAuthController } from './useAuthController';
import type { AuthMode, AuthProps, AuthUser } from './Auth.types';
import '../../pages/auth/AuthPages.css';

const ProfileView = Profile as unknown as React.ComponentType<{
  user: AuthUser;
  onLogout: () => Promise<void>;
}>;

export default function Auth({ onLogin }: AuthProps) {
  const {
    currentUser,
    authMode,
    setAuthMode,
    isSignUp,
    setIsSignUp,
    loading,
    confirmationResult,
    setConfirmationResult,
    showProfileCompletion,
    pendingUser,
    pendingToken,
    otpCountdown,
    showPassword,
    setShowPassword,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSocial,
    handleEmailSubmit,
    handleSendOTP,
    handleVerifyOTP,
    onLogout,
    onProfileComplete,
    onProfileSkip,
  } = useAuthController(onLogin);

  if (showProfileCompletion && pendingUser && pendingToken) {
    return (
      <ProfileCompletion
        user={pendingUser}
        token={pendingToken}
        onComplete={onProfileComplete}
        onSkip={onProfileSkip}
      />
    );
  }

  if (currentUser) {
    return <ProfileView user={currentUser} onLogout={onLogout} />;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon">WC</div>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your account</p>
        </div>

        <div className="auth-method-selector">
          {(['phone', 'email'] as AuthMode[]).map(m => (
            <button
              key={m}
              type="button"
              className={`method-btn ${authMode === m ? 'active' : ''}`}
              onClick={() => setAuthMode(m)}
            >
              {m === 'phone' ? <PhoneIcon /> : <EmailIcon />}
              <span>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
            </button>
          ))}
        </div>

        <div className="auth-content">
          {authMode === 'email' && (
            <AuthEmailForm
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              loading={loading}
              handleEmailSubmit={handleEmailSubmit}
            />
          )}
          {authMode === 'phone' && (
            <AuthPhoneForm
              confirmationResult={confirmationResult}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              loading={loading}
              handleSendOTP={handleSendOTP}
              handleVerifyOTP={handleVerifyOTP}
              setConfirmationResult={setConfirmationResult}
              otpCountdown={otpCountdown}
              setFieldValue={setFieldValue}
            />
          )}

          <div className="auth-divider">
            <span>or continue with</span>
          </div>
          <div className="social-buttons">
            {(['google', 'apple', 'facebook'] as const).map(p => (
              <button
                key={p}
                type="button"
                className={`social-btn ${p}`}
                onClick={() => handleSocial(p)}
                disabled={loading}
              >
                {p === 'google' ? <GoogleIcon /> : p === 'apple' ? <AppleIcon /> : <FacebookIcon />}
                <span>{p.charAt(0).toUpperCase() + p.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="auth-footer">
          <p>
            By continuing, you agree to our <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
