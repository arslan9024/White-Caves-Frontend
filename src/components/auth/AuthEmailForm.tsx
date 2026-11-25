import React from 'react';
import FormField from '../ui/FormField/FormField';
import { LockIcon } from './Auth.icons';
import type { AuthFormValues } from './Auth.types';
import type { ValidationErrors } from '../../utils/validation';

interface AuthEmailFormProps {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  values: AuthFormValues;
  errors: ValidationErrors;
  touched: Record<keyof AuthFormValues, boolean>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleBlur: (e: { target: { name: string } }) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleEmailSubmit: (e: React.FormEvent) => void;
}

export const AuthEmailForm: React.FC<AuthEmailFormProps> = ({
  isSignUp,
  setIsSignUp,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  showPassword,
  setShowPassword,
  loading,
  handleEmailSubmit,
}) => {
  return (
    <form className="auth-form" onSubmit={handleEmailSubmit}>
      {isSignUp && (
        <FormField
          label="Full Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : undefined}
          placeholder="Enter your full name"
        />
      )}
      <FormField
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
        placeholder="Enter your email"
      />
      {/* Password: manual for show/hide toggle */}
      <div className="input-group">
        <label className="input-label">Password</label>
        <div className="input-wrapper">
          <span className="input-icon">
            <LockIcon />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            className={`auth-input ${errors.password && touched.password ? 'error' : ''}`}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(p => !p)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && touched.password && (
          <span className="input-error">{errors.password}</span>
        )}
      </div>
      {isSignUp && (
        <FormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          placeholder="Confirm your password"
        />
      )}
      {!isSignUp && (
        <div className="forgot-password">
          <button type="button" className="forgot-btn">
            Forgot password?
          </button>
        </div>
      )}
      <button type="submit" className="auth-submit-btn" disabled={loading}>
        {loading ? (
          <span className="btn-loading">
            <span className="spinner" />
            Please wait...
          </span>
        ) : isSignUp ? (
          'Create Account'
        ) : (
          'Sign In'
        )}
      </button>
      <p className="auth-toggle">
        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        <button type="button" onClick={() => setIsSignUp(s => !s)} className="auth-toggle-btn">
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </form>
  );
};
