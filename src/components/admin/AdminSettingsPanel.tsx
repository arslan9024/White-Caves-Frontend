import React, { FormEvent } from 'react';
import { Settings } from 'lucide-react';
import { createLogger } from '../../utils/logger';
import * as S from './AdminDashboard.styles';

const logger = createLogger('AdminSettingsPanel');

export interface SettingsPanelProps {
  panelId: string;
  tabId: string;
}

export const AdminSettingsPanel = ({ panelId, tabId }: SettingsPanelProps) => (
  <S.AdminSettings id={panelId} role="tabpanel" aria-labelledby={tabId}>
    <S.SectionHeader>
      <Settings size={20} />
      <h3>System Settings</h3>
    </S.SectionHeader>

    <S.SettingsGroups
      as="form"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const settings = Object.fromEntries(formData.entries());
        logger.info('Settings form submitted (backend pending):', settings);
      }}
    >
      <S.SettingGroup>
        <h4>General Settings</h4>
        <S.SettingItem>
          <label htmlFor="admin-platform-name">Platform Name</label>
          <input
            id="admin-platform-name"
            name="platformName"
            type="text"
            defaultValue="White Caves"
            required
            maxLength={100}
          />
        </S.SettingItem>
        <S.SettingItem>
          <label htmlFor="admin-support-email">Support Email</label>
          <input
            id="admin-support-email"
            name="supportEmail"
            type="email"
            defaultValue="support@whitecaves.ae"
            required
            maxLength={254}
          />
        </S.SettingItem>
      </S.SettingGroup>

      <S.SettingGroup>
        <h4>Performance Settings</h4>
        <S.SettingItem>
          <label htmlFor="admin-cache-enabled">Cache Enabled</label>
          <input id="admin-cache-enabled" name="cacheEnabled" type="checkbox" defaultChecked />
        </S.SettingItem>
        <S.SettingItem>
          <label htmlFor="admin-backup-interval">Auto-backup Interval (hours)</label>
          <input
            id="admin-backup-interval"
            name="backupInterval"
            type="number"
            defaultValue="24"
            min={1}
            max={168}
            required
          />
        </S.SettingItem>
      </S.SettingGroup>

      <S.SettingGroup>
        <h4>Security Settings</h4>
        <S.SettingItem>
          <label htmlFor="admin-2fa">Two-Factor Authentication</label>
          <select id="admin-2fa" name="twoFactorAuth" defaultValue="enabled">
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </S.SettingItem>
        <S.SettingItem>
          <label htmlFor="admin-session-timeout">Session Timeout (minutes)</label>
          <input
            id="admin-session-timeout"
            name="sessionTimeout"
            type="number"
            defaultValue="30"
            min={5}
            max={1440}
            required
          />
        </S.SettingItem>
      </S.SettingGroup>

      <S.SaveBtn type="submit">Save Settings</S.SaveBtn>
    </S.SettingsGroups>
  </S.AdminSettings>
);
