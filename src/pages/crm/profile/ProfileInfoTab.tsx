import React, { FC } from 'react';
import { Card, FormGroup, SaveButton } from './ProfilePage.styles';

interface ProfileInfoTabProps {
  profileName: string;
  setProfileName: (value: string) => void;
  profilePhone: string;
  setProfilePhone: (value: string) => void;
  profilePhotoUrl: string;
  setProfilePhotoUrl: (value: string) => void;
  isSaving: boolean;
  saveSuccess: boolean;
  onSave: () => void;
}

const UAE_PHONE_REGEX = /^\+971\s?\d{2}\s?\d{3}\s?\d{4}$/;

export const ProfileInfoTab: FC<ProfileInfoTabProps> = ({
  profileName,
  setProfileName,
  profilePhone,
  setProfilePhone,
  profilePhotoUrl,
  setProfilePhotoUrl,
  isSaving,
  saveSuccess,
  onSave,
}) => {
  const isValidUaePhone = Boolean(profilePhone && UAE_PHONE_REGEX.test(profilePhone));

  return (
    <Card>
      <h2>
        <span>👤</span> Personal Profile Information
      </h2>
      <FormGroup>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter full name"
          value={profileName}
          onChange={e => setProfileName(e.target.value)}
        />
      </FormGroup>
      <FormGroup style={{ position: 'relative' }}>
        <label>Direct Contact Line</label>
        <input
          type="text"
          placeholder="+971 50 XXX XXXX"
          value={profilePhone}
          onChange={e => setProfilePhone(e.target.value)}
          style={{
            borderColor: profilePhone && !isValidUaePhone ? '#EF4444' : '',
          }}
        />
        {isValidUaePhone && (
          <span style={{ position: 'absolute', right: '16px', top: '38px', color: '#10B981' }}>
            ✓
          </span>
        )}
      </FormGroup>
      <FormGroup>
        <label>Profile Avatar Image URL</label>
        <input
          type="url"
          placeholder="https://example.com/avatar.jpg"
          value={profilePhotoUrl}
          onChange={e => setProfilePhotoUrl(e.target.value)}
        />
      </FormGroup>
      {saveSuccess && (
        <div
          role="status"
          data-testid="profile-status-banner"
          style={{
            padding: '10px 14px',
            marginBottom: '12px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#10B981',
            fontSize: '0.84rem',
            fontWeight: 700,
          }}
        >
          Profile updated successfully!
        </div>
      )}
      <SaveButton onClick={onSave} disabled={isSaving}>
        {isSaving ? (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid white',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            Synchronizing Profile...
          </span>
        ) : saveSuccess ? (
          '✓ Saved Successfully'
        ) : (
          'Save Profile Changes'
        )}
      </SaveButton>
    </Card>
  );
};
