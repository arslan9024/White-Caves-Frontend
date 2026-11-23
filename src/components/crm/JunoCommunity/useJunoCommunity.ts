import { useState, useEffect } from 'react';
import type { CommunityTab } from './types';
import { initialBookings, initialTickets, initialNotices } from './data';

export const useJunoCommunity = (moduleId?: string) => {
  const [activeTab, setActiveTab] = useState<CommunityTab>('booking');
  const [bookings, setBookings] = useState(initialBookings);
  const [tickets, setTickets] = useState(initialTickets);
  const [notices, setNotices] = useState(initialNotices);

  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('booking') || moduleId.includes('facility')) {
      setActiveTab('booking');
    } else if (moduleId.includes('maintenance')) {
      setActiveTab('maintenance');
    } else if (moduleId.includes('service')) {
      setActiveTab('service');
    } else if (moduleId.includes('notice')) {
      setActiveTab('notices');
    }
  }, [moduleId]);

  return {
    activeTab,
    setActiveTab,
    bookings,
    setBookings,
    tickets,
    setTickets,
    notices,
    setNotices,
  };
};
