import React from 'react';
import type { ConfirmationResult } from 'firebase/auth';
import FormField from '../ui/FormField/FormField';
import { ArrowLeftIcon } from './Auth.icons';
import type { AuthFormValues } from './Auth.types';
import type { ValidationErrors } from '../../utils/validation';

interface AuthPhoneFormProps {
  confirmationResult: ConfirmationResult | null;
  values: AuthFormValues;
  errors: ValidationErrors;
  touched: Record<keyof AuthFormValues, boolean>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleBlur: (e: { target: { name: string } }) => void;
  loading: boolean;
  handleSendOTP: (e: React.FormEvent) => void;
  handleVerifyOTP: (e: React.FormEvent) => void;
  setConfirmationResult: (res: ConfirmationResult | null) => void;
  otpCountdown: number;
  setFieldValue: (name: keyof AuthFormValues, value: unknown) => void;
}

export const AuthPhoneForm: React.FC<AuthPhoneFormProps> = ({
  confirmationResult,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  loading,
  handleSendOTP,
  handleVerifyOTP,
  setConfirmationResult,
  otpCountdown,
  setFieldValue,
}) => {
  return (
    <form className="auth-form" onSubmit={confirmationResult ? handleVerifyOTP : handleSendOTP}>
      <div id="recaptcha-container" />
      {!confirmationResult ? (
        <>
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : undefined}
            placeholder="+971 50 123 4567"
          />
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Sending...
              </span>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </>
      ) : (
        <>
          <div className="otp-header">
            <button type="button" className="back-btn" onClick={() => setConfirmationResult(null)}>
              <ArrowLeftIcon />
            </button>
            <div className="otp-info">
              <h3>Verify Your Phone</h3>
              <p>
                Enter the 6-digit code sent to <strong>{values.phone}</strong>
              </p>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Verification Code</label>
            <div className="otp-input-container">
              <input
                type="text"
                name="otp"
                value={values.otp}
                onChange={e =>
                  handleChange({
                    target: { name: 'otp', value: e.target.value.replace(/\D/g, '').slice(0, 6) },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                onBlur={handleBlur}
                placeholder="000000"
                className={`otp-input ${errors.otp && touched.otp ? 'error' : ''}`}
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>
            {errors.otp && touched.otp && <span className="input-error">{errors.otp}</span>}
          </div>
          {otpCountdown > 0 ? (
            <p className="resend-timer">Resend code in {otpCountdown}s</p>
          ) : (
            <button
              type="button"
              className="resend-btn"
              onClick={() => {
                setConfirmationResult(null);
                setFieldValue('otp', '');
              }}
            >
              Didn't receive code? Send again
            </button>
          )}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Verifying...
              </span>
            ) : (
              'Verify & Continue'
            )}
          </button>
        </>
      )}
    </form>
  );
};
