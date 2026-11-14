import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTheme } from '../../../store/navigationSlice';
import { setMainViewContent } from '../../../store/appSlice';
import { useTranslation } from '../../../context/TranslationContext';
import { DashboardHeaderProps, DashboardFeature } from './DashboardHeader.types';

export const useDashboardHeaderLogic = (props: DashboardHeaderProps) => {
  const { activeAssistant, onFeatureSelect, notifications = [], user = null, onLogout } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();
  const theme = useSelector((state: any) => state.navigation?.theme || 'light');

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const features = useMemo(() => {
    if (!activeAssistant?.features) return [];
    return activeAssistant.features;
  }, [activeAssistant]);

  useEffect(() => {
    if (features.length > 0 && !activeFeature) {
      setActiveFeature(features[0].id);
    }
  }, [features, activeFeature]);

  useEffect(() => {
    if (activeAssistant) {
      setActiveFeature(activeAssistant.features?.[0]?.id || null);
    }
  }, [activeAssistant?.id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        (document.querySelector('.dashboard-search-input') as HTMLInputElement | null)?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  const handleFeatureClick = (feature: DashboardFeature) => {
    setActiveFeature(feature.id);
    dispatch(
      setMainViewContent({
        component: feature.component,
        props: { assistantId: activeAssistant?.id },
      })
    );
    onFeatureSelect?.(feature);
  };

  const getUserInitials = () => {
    if (!user) return 'WC';
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'WC';
  };

  const handleProfileAction = (action: string) => {
    setShowUserMenu(false);
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'billing':
        navigate('/billing');
        break;
      case 'help':
        window.open('https://help.whitecaves.ae', '_blank');
        break;
      case 'logout':
        onLogout?.();
        break;
      default:
        break;
    }
  };

  return {
    theme,
    language,
    searchQuery,
    setSearchQuery,
    showNotifications,
    setShowNotifications,
    showUserMenu,
    setShowUserMenu,
    searchFocused,
    setSearchFocused,
    activeFeature,
    notifRef,
    userMenuRef,
    unreadCount,
    features,
    handleThemeToggle,
    handleFeatureClick,
    getUserInitials,
    handleProfileAction,
    setLanguage,
    t,
  };
};
