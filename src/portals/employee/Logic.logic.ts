import { useCallback, useState } from 'react';
import { EMPLOYEE_PORTAL_DATA } from './Data.data';

export function useEmployeePortalLogic() {
  const [lastSynced, setLastSynced] = useState<string>(() => new Date().toISOString());
  const handleRefresh = useCallback(() => setLastSynced(new Date().toISOString()), []);
  return { data: EMPLOYEE_PORTAL_DATA, lastSynced, handleRefresh };
}
