import React, { FC } from 'react';
import { PortalShell } from '../shared/PortalShell';
import { useEmployeePortalLogic } from './Logic.logic';

export const EmployeePortalView: FC = () => {
  const { data, handleRefresh } = useEmployeePortalLogic();
  return <PortalShell {...data} onRefresh={handleRefresh} />;
};
export default EmployeePortalView;

