import React from 'react';
import { InventoryDashboard } from '../../components/dashboard/InventoryDashboard';
import { MaryInventoryRbacBar } from '../../components/dashboard/MaryInventoryRbacBar';
import './InventoryManagementPage.css';

const InventoryManagementPage = () => {
  return (
    <div className="inventory-management-page">
      <MaryInventoryRbacBar />
      <InventoryDashboard />
    </div>
  );
};

export default InventoryManagementPage;
