import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  DashboardTab,
  UserStats,
  FavoriteItem,
  SavedSearch,
  UserAlert,
  PropertyItem,
} from './UserDashboard.types';
import { INITIAL_STATS } from './UserDashboard.data';

export const useUserDashboard = () => {
  const user = useSelector((state: any) => state?.user?.currentUser);
  const properties = useSelector((state: any) => state?.properties?.properties || []);

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);

  const loadDashboardData = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [favRes, searchRes, alertRes] = await Promise.all([
        fetch(`/api/favorites?userId=${user.id}`).catch(() => ({ ok: false })),
        fetch(`/api/saved-searches?userId=${user.id}`).catch(() => ({ ok: false })),
        fetch(`/api/alerts?userId=${user.id}`).catch(() => ({ ok: false })),
      ]);

      if (favRes && 'ok' in favRes && favRes.ok) {
        const favData = await (favRes as Response).json();
        setFavorites(favData);
      }
      if (searchRes && 'ok' in searchRes && searchRes.ok) {
        const searchData = await (searchRes as Response).json();
        setSavedSearches(searchData);
      }
      if (alertRes && 'ok' in alertRes && alertRes.ok) {
        const alertData = await (alertRes as Response).json();
        setAlerts(alertData);
      }

      setStats({
        totalViews: Math.floor(Math.random() * 150) + 50,
        totalInquiries: Math.floor(Math.random() * 20) + 5,
        scheduledViewings: Math.floor(Math.random() * 5) + 1,
      });
    } catch {
      // ignore network errors in mock mode
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const removeFavorite = async (propertyId: string | number) => {
    try {
      if (user?.id) {
        await fetch(`/api/favorites/${propertyId}?userId=${user.id}`, {
          method: 'DELETE',
        });
      }
      setFavorites(prev => prev.filter(f => f.propertyId !== propertyId));
    } catch {
      // ignore
    }
  };

  const deleteSavedSearch = async (searchId: string) => {
    try {
      await fetch(`/api/saved-searches/${searchId}`, {
        method: 'DELETE',
      });
      setSavedSearches(prev => prev.filter(s => s._id !== searchId));
    } catch {
      // ignore
    }
  };

  const toggleAlert = async (alertId: string, currentActive: boolean) => {
    try {
      await fetch(`/api/alerts/${alertId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      });
      setAlerts(prev => prev.map(a => (a._id === alertId ? { ...a, active: !currentActive } : a)));
    } catch {
      // ignore
    }
  };

  const getPropertyById = (id: string | number): PropertyItem | null => {
    return properties.find((p: PropertyItem) => p.id === id) || null;
  };

  const tabs = [
    { id: 'overview' as DashboardTab, label: 'Overview', icon: '📊' },
    { id: 'favorites' as DashboardTab, label: 'Favorites', icon: '❤️', count: favorites.length },
    {
      id: 'searches' as DashboardTab,
      label: 'Saved Searches',
      icon: '🔍',
      count: savedSearches.length,
    },
    {
      id: 'alerts' as DashboardTab,
      label: 'Alerts',
      icon: '🔔',
      count: alerts.filter(a => a.active).length,
    },
    { id: 'activity' as DashboardTab, label: 'Activity', icon: '📅' },
  ];

  return {
    user,
    loading,
    activeTab,
    setActiveTab,
    tabs,
    stats,
    favorites,
    savedSearches,
    alerts,
    getPropertyById,
    removeFavorite,
    deleteSavedSearch,
    toggleAlert,
  };
};
