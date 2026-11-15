import { useCallback, useState } from 'react';
import { MD_PORTAL_DATA } from './Data.data';

export function useMdPortalLogic() {
  const [lastSynced, setLastSynced] = useState<string>(() => new Date().toISOString());
  const handleRefresh = useCallback(() => setLastSynced(new Date().toISOString()), []);
  return { data: MD_PORTAL_DATA, lastSynced, handleRefresh };
}
