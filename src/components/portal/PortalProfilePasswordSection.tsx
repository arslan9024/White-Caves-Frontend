import React, { FC } from 'react';

export interface PortalProfilePasswordSectionProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isChangingPassword: boolean;
  passwordError: string | null;
  passwordSuccess: string | null;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onChangePassword: () => void;
}

export const PortalProfilePasswordSection: FC<PortalProfilePasswordSectionProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  isChangingPassword,
  passwordError,
  passwordSuccess,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onChangePassword,
}) => (
  <div className="profile-section" data-testid="profile-section-password">
    <h4>Change Password</h4>

    <div className="profile-field">
      <label htmlFor="profile-current-password">Current password</label>
      <input
        id="profile-current-password"
        type="password"
        value={currentPassword}
        onChange={e => onCurrentPasswordChange(e.target.value)}
        placeholder="Enter your current password"
        autoComplete="current-password"
        data-testid="profile-current-password-input"
      />
    </div>

    <div className="profile-field">
      <label htmlFor="profile-new-password">New password</label>
      <input
        id="profile-new-password"
        type="password"
        value={newPassword}
        onChange={e => onNewPasswordChange(e.target.value)}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        data-testid="profile-new-password-input"
      />
    </div>

    <div className="profile-field">
      <label htmlFor="profile-confirm-password">Confirm new password</label>
      <input
        id="profile-confirm-password"
        type="password"
        value={confirmPassword}
        onChange={e => onConfirmPasswordChange(e.target.value)}
        placeholder="Repeat new password"
        autoComplete="new-password"
        data-testid="profile-confirm-password-input"
      />
    </div>

    {passwordError && (
      <p className="profile-error-msg" role="alert" data-testid="password-error">
        {passwordError}
      </p>
    )}
    {passwordSuccess && (
      <p className="profile-success-msg" role="status" data-testid="password-success">
        {passwordSuccess}
      </p>
    )}

    <button
      type="button"
      className="profile-save-btn"
      onClick={onChangePassword}
      disabled={isChangingPassword}
      aria-disabled={isChangingPassword}
      data-testid="profile-change-password-btn"
    >
      {isChangingPassword ? 'Updating…' : 'Change Password'}
    </button>
  </div>
);
