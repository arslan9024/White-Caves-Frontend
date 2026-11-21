import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useGlobalCurrency } from '../../context/CurrencyContext';
import { useUserRole } from '../../context/UserRoleContext';
import { safeStorage } from '../../utils/safeStorage';
import {
  MainContentArea,
  ProfileWrapper,
  WorkspaceLayout,
  type ProfileTabId,
} from './profile/ProfilePage.styles';
import { ProfileSidebar } from './profile/ProfileSidebar';
import { ProfileInfoTab } from './profile/ProfileInfoTab';
import { ProfilePreferencesTab } from './profile/ProfilePreferencesTab';
import { ProfileReraTab } from './profile/ProfileReraTab';
import {
  ProfileGoalsTab,
  ProfileSecurityTab,
  ProfileSessionsTab,
} from './profile/ProfileGoalsSecurityTabs';

export const ProfilePage: FC = () => {
  useDocumentTitle('Executive Workspace & Preferences | White Caves');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTabId>(() => {
    return (sessionStorage.getItem('profileActiveTab') as ProfileTabId) || 'profile';
  });

  useEffect(() => {
    sessionStorage.setItem('profileActiveTab', activeTab);
  }, [activeTab]);

  const {
    user,
    profileName,
    setProfileName,
    profilePhone,
    setProfilePhone,
    profilePhotoUrl,
    setProfilePhotoUrl,
    handleSaveProfile,
    isSaving,
  } = useUserProfile();

  const { themeMode, setThemeMode } = useTheme();
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const { currency, setCurrency, currencies } = useGlobalCurrency();
  const { role: currentRole, accessLevel, isFounder, loginAsRole } = useUserRole();

  const [measurementUnit, setMeasurementUnit] = useState<'sqft' | 'sqm'>(() => {
    return (safeStorage.get('whitecaves_unit') as 'sqft' | 'sqm') || 'sqft';
  });
  const [notifyWhatsApp, setNotifyWhatsApp] = useState<boolean>(true);
  const [notifyEmail, setNotifyEmail] = useState<boolean>(true);
  const [notifySms, setNotifySms] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSavePreferences = async () => {
    safeStorage.set('whitecaves_unit', measurementUnit);
    safeStorage.set(
      'whitecaves_notifications',
      JSON.stringify({ notifyWhatsApp, notifyEmail, notifySms })
    );
    await handleSaveProfile();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const displayName = profileName || user?.name || 'Executive User';
  const avatarSrc =
    profilePhotoUrl ||
    user?.photoURL ||
    'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(displayName) +
      '&background=EF4444&color=fff';

  return (
    <ProfileWrapper data-testid="crm-profile-page">
      <WorkspaceLayout>
        <ProfileSidebar
          avatarSrc={avatarSrc}
          displayName={displayName}
          email={user?.email}
          accessLevel={accessLevel}
          isFounder={isFounder}
          currentRole={currentRole}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onNavigateDashboard={() => navigate('/dashboard')}
        />

        <MainContentArea>
          {activeTab === 'profile' && (
            <ProfileInfoTab
              profileName={profileName}
              setProfileName={setProfileName}
              profilePhone={profilePhone}
              setProfilePhone={setProfilePhone}
              profilePhotoUrl={profilePhotoUrl}
              setProfilePhotoUrl={setProfilePhotoUrl}
              isSaving={isSaving}
              saveSuccess={saveSuccess}
              onSave={handleSavePreferences}
            />
          )}

          {activeTab === 'preferences' && (
            <ProfilePreferencesTab
              themeMode={themeMode}
              setThemeMode={setThemeMode}
              language={language}
              setLanguage={setLanguage}
              supportedLanguages={supportedLanguages}
              currency={currency}
              setCurrency={setCurrency}
              currencies={currencies}
              measurementUnit={measurementUnit}
              setMeasurementUnit={setMeasurementUnit}
              currentRole={currentRole}
              accessLevel={accessLevel}
              loginAsRole={loginAsRole}
              notifyWhatsApp={notifyWhatsApp}
              setNotifyWhatsApp={setNotifyWhatsApp}
              notifyEmail={notifyEmail}
              setNotifyEmail={setNotifyEmail}
              notifySms={notifySms}
              setNotifySms={setNotifySms}
              isSaving={isSaving}
              onSave={handleSavePreferences}
            />
          )}

          {activeTab === 'rera' && <ProfileReraTab />}
          {activeTab === 'goals' && <ProfileGoalsTab />}
          {activeTab === 'security' && <ProfileSecurityTab />}
          {activeTab === 'sessions' && <ProfileSessionsTab />}
        </MainContentArea>
      </WorkspaceLayout>
    </ProfileWrapper>
  );
};

export default ProfilePage;
