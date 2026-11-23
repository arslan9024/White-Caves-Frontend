import React, { FC, FormEvent } from 'react';
import { USER_CATEGORIES } from '../../hooks/useSignIn';
import { authModalStyles } from './authModalStyles';

export interface CategorySelectionStepProps {
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  proceedToRoleSelection: () => void;
  goBackToStep: (step: number) => void;
}

export const CategorySelectionStep: FC<CategorySelectionStepProps> = ({
  selectedCategory,
  setSelectedCategory,
  proceedToRoleSelection,
  goBackToStep,
}) => {
  return (
    <>
      <div className="auth-intro">
        <h1>I am a...</h1>
        <p className="auth-subtitle">Select your account type</p>
      </div>

      <div className="category-selection" style={authModalStyles.categoryGrid}>
        {USER_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-card category-card--${cat.id} ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              type="button"
              style={authModalStyles.categoryCard(isSelected)}
            >
              <span style={authModalStyles.categoryIcon}>{cat.icon}</span>
              <strong style={authModalStyles.categoryLabel}>{cat.label}</strong>
              <span style={authModalStyles.categoryDesc}>{cat.desc}</span>
            </button>
          );
        })}
      </div>

      <button
        className="btn btn-primary btn-full"
        onClick={proceedToRoleSelection}
        disabled={!selectedCategory}
      >
        Continue
      </button>
      <button
        className="auth-forgot-link"
        style={authModalStyles.stepBackButton}
        onClick={() => goBackToStep(1)}
      >
        Go Back
      </button>
    </>
  );
};

export interface RoleOption {
  id: string;
  label: string;
  desc: string;
  icon: string;
}

export interface RoleSelectionStepProps {
  roles: RoleOption[];
  selectedRole: string;
  setSelectedRole: (roleId: string) => void;
  completeSignUp: () => void;
  loading: boolean;
  goBackToStep: (step: number) => void;
}

export const RoleSelectionStep: FC<RoleSelectionStepProps> = ({
  roles,
  selectedRole,
  setSelectedRole,
  completeSignUp,
  loading,
  goBackToStep,
}) => {
  return (
    <>
      <div className="auth-intro">
        <h1>Select Your Role</h1>
        <p className="auth-subtitle">Choose your exact position</p>
      </div>

      <div style={authModalStyles.roleListGrid}>
        {roles.map(role => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              style={authModalStyles.roleCard(isSelected)}
            >
              <span style={authModalStyles.roleIcon}>{role.icon}</span>
              <div>
                <strong style={authModalStyles.roleLabel}>{role.label}</strong>
                <span style={authModalStyles.roleDesc}>{role.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="btn btn-primary btn-full"
        onClick={completeSignUp}
        disabled={!selectedRole || loading}
      >
        {loading ? 'Please wait...' : 'Complete Registration'}
      </button>
      <button
        className="auth-forgot-link"
        style={authModalStyles.stepBackButton}
        onClick={() => goBackToStep(2)}
      >
        Go Back
      </button>
    </>
  );
};

export interface TwoFactorStepProps {
  twoFactorCode: string;
  setTwoFactorCode: (code: string) => void;
  handleTwoFactorSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> | void;
  loading: boolean;
  error?: string | null;
  goBackToStep: (step: number) => void;
}

export const TwoFactorStep: FC<TwoFactorStepProps> = ({
  twoFactorCode,
  setTwoFactorCode,
  handleTwoFactorSubmit,
  loading,
  error,
  goBackToStep,
}) => {
  return (
    <>
      <div className="auth-intro">
        <h1>Two-Factor Authentication</h1>
        <p className="auth-subtitle">Enter the 6-digit code from your authenticator app</p>
      </div>

      {error && <div style={authModalStyles.errorAlert}>{error}</div>}

      <form onSubmit={handleTwoFactorSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="totp-code">Authentication Code</label>
          <input
            id="totp-code"
            type="text"
            value={twoFactorCode}
            onChange={e => setTwoFactorCode(e.target.value)}
            placeholder="000000"
            maxLength={8}
            required
            autoComplete="one-time-code"
            inputMode="numeric"
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading || twoFactorCode.trim().length === 0}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <button
        className="auth-forgot-link"
        style={authModalStyles.stepBackButton}
        onClick={() => goBackToStep(1)}
      >
        Back to Sign In
      </button>
    </>
  );
};
