import React, { FC } from 'react';
import { PortalShell } from '../shared/PortalShell';
import { useLandlordPortalLogic } from './Logic.logic';

export const LandlordPortalView: FC = () => {
  const { data, handleRefresh } = useLandlordPortalLogic();
  return <PortalShell {...data} onRefresh={handleRefresh} />;
};
export default LandlordPortalView;

