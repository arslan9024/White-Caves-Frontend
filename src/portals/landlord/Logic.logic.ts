import { useCallback, useState } from 'react';
import { LANDLORD_PORTAL_DATA } from './Data.data';

export function useLandlordPortalLogic() {
  const [lastSynced, setLastSynced] = useState<string>(() => new Date().toISOString());
  const handleRefresh = useCallback(() => setLastSynced(new Date().toISOString()), []);
  return { data: LANDLORD_PORTAL_DATA, lastSynced, handleRefresh };
}
