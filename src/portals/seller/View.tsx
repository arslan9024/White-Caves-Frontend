import React, { FC } from 'react';
import { PortalShell } from '../shared/PortalShell';
import { useSellerPortalLogic } from './Logic.logic';

export const SellerPortalView: FC = () => {
  const { data, handleRefresh } = useSellerPortalLogic();
  return <PortalShell {...data} onRefresh={handleRefresh} />;
};
export default SellerPortalView;

