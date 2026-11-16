import { useState, useEffect } from 'react';

export function useLindaLiveClock(): string {
  const [currentTimeGST, setCurrentTimeGST] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeGST(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Dubai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' GST'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return currentTimeGST;
}
