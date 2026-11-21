import React, { FC } from 'react';
import { spacing } from '../../../design-tokens';
import { type ThemeMode } from '../../../context/ThemeContext';
import { type LanguageType } from '../../../context/LanguageContext';
import { type CurrencyCode } from '../../../context/CurrencyContext';
import { ROLE_LABELS, type UserRole } from '../../../context/UserRoleContext';
import {
  Card,
  OptionBtn,
  OptionButtonGroup,
  PreferenceBox,
  PreferencesGrid,
  RoleSelectInput,
  SaveButton,
  ToggleRow,
} from './ProfilePage.styles';

interface ProfilePreferencesTabProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  supportedLanguages: Record<string, { code: string; flag: string }>;
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencies: Record<string, { code: string; flag: string }>;
  measurementUnit: 'sqft' | 'sqm';
  setMeasurementUnit: (unit: 'sqft' | 'sqm') => void;
  currentRole: UserRole;
  accessLevel: number;
  loginAsRole: (role: UserRole) => void;
  notifyWhatsApp: boolean;
  setNotifyWhatsApp: (val: boolean) => void;
  notifyEmail: boolean;
  setNotifyEmail: (val: boolean) => void;
  notifySms: boolean;
  setNotifySms: (val: boolean) => void;
  isSaving: boolean;
  onSave: () => void;
}

const labelStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: '0.88rem',
  color: 'var(--text-primary)',
};

const subtextStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: 'var(--text-muted)',
  margin: '2px 0 8px',
};

export const ProfilePreferencesTab: FC<ProfilePreferencesTabProps> = ({
  themeMode,
  setThemeMode,
  language,
  setLanguage,
  supportedLanguages,
  currency,
  setCurrency,
  currencies,
  measurementUnit,
  setMeasurementUnit,
  currentRole,
  accessLevel,
  loginAsRole,
  notifyWhatsApp,
  setNotifyWhatsApp,
  notifyEmail,
  setNotifyEmail,
  notifySms,
  setNotifySms,
  isSaving,
  onSave,
}) => (
  <Card>
    <h2>
      <span>⚙️</span> Universal Preferences & Customization
    </h2>
    <PreferencesGrid>
      <PreferenceBox>
        <label style={labelStyle}>🎨 Theme Mode</label>
        <p style={subtextStyle}>Select appearance mode</p>
        <OptionButtonGroup>
          <OptionBtn $selected={themeMode === 'light'} onClick={() => setThemeMode('light')}>
            ☀️ Light
          </OptionBtn>
          <OptionBtn $selected={themeMode === 'dark'} onClick={() => setThemeMode('dark')}>
            🌙 Dark
          </OptionBtn>
          <OptionBtn $selected={themeMode === 'system'} onClick={() => setThemeMode('system')}>
            💻 System
          </OptionBtn>
        </OptionButtonGroup>
      </PreferenceBox>

      <PreferenceBox>
        <label style={labelStyle}>🌐 Language</label>
        <p style={subtextStyle}>Universal 4-language support</p>
        <OptionButtonGroup>
          {Object.values(supportedLanguages).map(l => (
            <OptionBtn
              key={l.code}
              $selected={language === l.code}
              onClick={() => setLanguage(l.code as LanguageType)}
            >
              <span>{l.flag}</span> {l.code.toUpperCase()}
            </OptionBtn>
          ))}
        </OptionButtonGroup>
      </PreferenceBox>

      <PreferenceBox>
        <label style={labelStyle}>💵 Base Currency</label>
        <p style={subtextStyle}>Display property values in</p>
        <OptionButtonGroup>
          {Object.values(currencies).map(c => (
            <OptionBtn
              key={c.code}
              $selected={currency === c.code}
              onClick={() => setCurrency(c.code as CurrencyCode)}
            >
              <span>{c.flag}</span> {c.code}
            </OptionBtn>
          ))}
        </OptionButtonGroup>
      </PreferenceBox>

      <PreferenceBox>
        <label style={labelStyle}>📐 Area Measurement</label>
        <p style={subtextStyle}>Floor plan surface metric</p>
        <OptionButtonGroup>
          <OptionBtn
            $selected={measurementUnit === 'sqft'}
            onClick={() => setMeasurementUnit('sqft')}
          >
            Sq.Ft (Feet²)
          </OptionBtn>
          <OptionBtn
            $selected={measurementUnit === 'sqm'}
            onClick={() => setMeasurementUnit('sqm')}
          >
            Sq.M (Meters²)
          </OptionBtn>
        </OptionButtonGroup>
      </PreferenceBox>

      <PreferenceBox style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>🏛️ Operational Role & Access Level</label>
        <p style={subtextStyle}>
          Active Identity: {ROLE_LABELS[currentRole] || currentRole} (Level {accessLevel})
        </p>
        <RoleSelectInput
          value={currentRole}
          onChange={e => loginAsRole(e.target.value as UserRole)}
        >
          <optgroup label="Tier 1: Internal Corporate Machinery">
            <option value="managing_director">👑 Managing Director (L5 Sovereign)</option>
            <option value="manager">📊 Department Manager (L4)</option>
            <option value="supervisor">⚡ Team Supervisor (L3)</option>
            <option value="agent">💼 Licensed Broker (L2)</option>
            <option value="intern">🎓 Corporate Intern (L1)</option>
          </optgroup>
          <optgroup label="Tier 2: Paired Client Portals">
            <option value="tenant">🔑 Leasing Tenant (Client L1)</option>
            <option value="landlord">🏢 Property Landlord (Asset Owner L2)</option>
            <option value="buyer">🏡 Secondary Buyer (Client L1)</option>
            <option value="seller">📜 Property Seller (Mandate L1)</option>
            <option value="offplan_buyer">🏗️ Off-Plan Purchaser (HNWI L1)</option>
            <option value="developer">🏙️ Primary Developer Partner (L2)</option>
          </optgroup>
          <optgroup label="Tier 3: Strategic Partners & Public">
            <option value="conveyancer">⚖️ DLD Conveyancer / Trustee (L2)</option>
            <option value="contractor">🛠️ Maintenance Contractor (L2)</option>
            <option value="guest">🌐 Executive Guest (Public L1)</option>
          </optgroup>
        </RoleSelectInput>
      </PreferenceBox>
    </PreferencesGrid>

    <div style={{ marginTop: spacing[6] }}>
      <label
        style={{
          fontWeight: 800,
          fontSize: '0.92rem',
          color: 'var(--text-primary)',
          display: 'block',
          marginBottom: '8px',
        }}
      >
        🔔 Notification Channels
      </label>
      <ToggleRow>
        <span>📱 Priority WhatsApp Deal & Lead Alerts</span>
        <input
          type="checkbox"
          checked={notifyWhatsApp}
          onChange={e => setNotifyWhatsApp(e.target.checked)}
        />
      </ToggleRow>
      <ToggleRow>
        <span>📧 Weekly Market Intelligence & Executive Digest</span>
        <input
          type="checkbox"
          checked={notifyEmail}
          onChange={e => setNotifyEmail(e.target.checked)}
        />
      </ToggleRow>
      <ToggleRow>
        <span>💬 SMS Instant Viewing Schedule Alerts</span>
        <input type="checkbox" checked={notifySms} onChange={e => setNotifySms(e.target.checked)} />
      </ToggleRow>
    </div>

    <div style={{ marginTop: spacing[6] }}>
      <SaveButton onClick={onSave} disabled={isSaving}>
        {isSaving ? 'Saving Preferences...' : 'Save & Synchronize All Preferences'}
      </SaveButton>
    </div>
  </Card>
);
