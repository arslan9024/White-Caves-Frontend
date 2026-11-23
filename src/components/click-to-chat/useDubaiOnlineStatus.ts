import { useState, useEffect } from 'react';

/**
 * Checks online availability based on Dubai business hours (UTC+4, 9am - 10pm).
 */
export const useDubaiOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const checkOnlineStatus = () => {
      const dubaiHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dubai',
          hour: 'numeric',
          hour12: false,
        }).format(new Date()),
        10
      );
      setIsOnline(dubaiHour >= 9 && dubaiHour < 22);
    };

    checkOnlineStatus();
    const interval = setInterval(checkOnlineStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOnline;
};
