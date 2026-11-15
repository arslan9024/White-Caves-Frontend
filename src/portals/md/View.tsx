import React, { FC } from 'react';
import { PortalShell } from '../shared/PortalShell';
import { useMdPortalLogic } from './Logic.logic';

export const MdPortalView: FC = () => {
  const { data, handleRefresh } = useMdPortalLogic();
  return <PortalShell {...data} onRefresh={handleRefresh} />;
};
export default MdPortalView;
