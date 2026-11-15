import React, { FC } from 'react';
import { PortalShell } from '../shared/PortalShell';
import { useTenantPortalLogic } from './Logic.logic';

export const TenantPortalView: FC = () => {
  const { data, handleRefresh } = useTenantPortalLogic();
  return <PortalShell {...data} onRefresh={handleRefresh} />;
};
export default TenantPortalView;
