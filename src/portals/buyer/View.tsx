import React, { FC } from 'react';
import { PortalShell } from '../shared/PortalShell';
import { useBuyerPortalLogic } from './Logic.logic';

export const BuyerPortalView: FC = () => {
  const { data, handleRefresh } = useBuyerPortalLogic();
  return <PortalShell {...data} onRefresh={handleRefresh} />;
};
export default BuyerPortalView;

