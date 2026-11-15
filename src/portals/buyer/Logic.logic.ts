import { useCallback, useState } from 'react';
import { BUYER_PORTAL_DATA } from './Data.data';

export function useBuyerPortalLogic() {
  const [lastSynced, setLastSynced] = useState<string>(() => new Date().toISOString());
  const handleRefresh = useCallback(() => setLastSynced(new Date().toISOString()), []);
  return { data: BUYER_PORTAL_DATA, lastSynced, handleRefresh };
}
