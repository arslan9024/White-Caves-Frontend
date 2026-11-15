import { useCallback, useState } from 'react';
import { TENANT_PORTAL_DATA } from './Data.data';

export function useTenantPortalLogic() {
  const [lastSynced, setLastSynced] = useState<string>(() => new Date().toISOString());
  const handleRefresh = useCallback(() => setLastSynced(new Date().toISOString()), []);
  return { data: TENANT_PORTAL_DATA, lastSynced, handleRefresh };
}
