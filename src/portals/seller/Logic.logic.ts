import { useCallback, useState } from 'react';
import { SELLER_PORTAL_DATA } from './Data.data';

export function useSellerPortalLogic() {
  const [lastSynced, setLastSynced] = useState<string>(() => new Date().toISOString());
  const handleRefresh = useCallback(() => setLastSynced(new Date().toISOString()), []);
  return { data: SELLER_PORTAL_DATA, lastSynced, handleRefresh };
}
