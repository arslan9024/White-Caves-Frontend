import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSignIn } from '../../hooks/useSignIn';
import '../../pages/auth/AuthPages.css';

import { AUTH_COPY, getAuthLocale } from './authModalConstants';
import { authModalStyles } from './authModalStyles';
import { AuthModalCredentialsStep } from './AuthModalCredentialsStep';
import {
  CategorySelectionStep,
  RoleSelectionStep,
  TwoFactorStep,
} from './AuthModalSteps';

export { AUTH_COPY, getAuthLocale } from './authModalConstants';
export type { AuthLocale, AuthCopy } from './authModalConstants';
export { authModalStyles } from './authModalStyles';
export { AuthModalCredentialsStep } from './AuthModalCredentialsStep';
export type { AuthModalCredentialsStepProps } from './AuthModalCredentialsStep';
export {
  CategorySelectionStep,
  RoleSelectionStep,
  TwoFactorStep,
} from './AuthModalSteps';
export type {
  CategorySelectionStepProps,
  RoleOption,
  RoleSelectionStepProps,
  TwoFactorStepProps,
} from './AuthModalSteps';

export interface AuthModalProps {
  mode?: 'signin' | 'signup';
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ mode: initialMode = 'signin', onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const locale = getAuthLocale();
  const copy = AUTH_COPY[locale];

  const {
    mode,
    step,
    activeTab,
    setActiveTab,
    loading,
    forgotPasswordLoading,
    error,
    socialSyncRecovery,
    socialRetryAttempts,
    isGoogleAuthAvailable,
    switchMode,
    goBackToStep,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fullName,
    setFullName,
    selectedCategory,
    setSelectedCategory,
    selectedRole,
    setSelectedRole,
    twoFactorCode,
    setTwoFactorCode,
    handleTwoFactorSubmit,
    handleSocialAuth,
    retrySocialAuth,
    clearSocialRecovery,
    handleEmailSubmit,
    handleForgotPassword,
    proceedToRoleSelection,
    getRolesForCategory,
    completeSignUp,
  } = useSignIn();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (initialMode === 'signup' && mode === 'signin') {
      switchMode();
    } else if (initialMode === 'signin' && mode === 'signup') {
      switchMode();
    }
  }, [initialMode, mode, switchMode]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const container = modalRef.current;
      if (!container) {
        return;
      }

      const focusable = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      className="auth-modal-overlay"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="auth-modal-window"
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'signup' ? 'Sign up window' : 'Sign in window'}
        ref={modalRef}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <button
          type="button"
          className="auth-close-btn"
          onClick={() => {
            onClose();
          }}
          aria-label="Close authentication popup"
          ref={closeButtonRef}
        >
          ×
        </button>

        <Link to="/" className="auth-logo">
          <img src="/company-logo.jpg" alt="White Caves" />
          <span>White Caves</span>
        </Link>

        {step === 1 && (
          <AuthModalCredentialsStep
            mode={mode}
            copy={copy}
            error={error}
            loading={loading}
            forgotPasswordLoading={forgotPasswordLoading}
            socialSyncRecovery={socialSyncRecovery}
            socialRetryAttempts={socialRetryAttempts}
            isGoogleAuthAvailable={isGoogleAuthAvailable}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            fullName={fullName}
            setFullName={setFullName}
            emailInputRef={emailInputRef}
            handleEmailSubmit={handleEmailSubmit}
            handleForgotPassword={handleForgotPassword}
            handleSocialAuth={handleSocialAuth}
            retrySocialAuth={retrySocialAuth}
            clearSocialRecovery={clearSocialRecovery}
            switchMode={switchMode}
          />
        )}

        {step === 2 && (
          <CategorySelectionStep
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            proceedToRoleSelection={proceedToRoleSelection}
            goBackToStep={goBackToStep}
          />
        )}

        {step === 3 && (
          <RoleSelectionStep
            roles={getRolesForCategory()}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            completeSignUp={completeSignUp}
            loading={loading}
            goBackToStep={goBackToStep}
          />
        )}

        {step === 4 && (
          <TwoFactorStep
            twoFactorCode={twoFactorCode}
            setTwoFactorCode={setTwoFactorCode}
            handleTwoFactorSubmit={handleTwoFactorSubmit}
            loading={loading}
            error={error}
            goBackToStep={goBackToStep}
          />
        )}

        <p className="auth-footer" style={authModalStyles.footerText}>
          By continuing, you agree to our{' '}
          <a href="/terms" style={authModalStyles.footerLinkTerms}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" style={authModalStyles.footerLinkPrivacy}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
