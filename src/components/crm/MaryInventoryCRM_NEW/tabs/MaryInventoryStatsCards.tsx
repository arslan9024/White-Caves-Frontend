import React from 'react';
import { Building2, Users, Phone } from 'lucide-react';

interface MaryInventoryStatsCardsProps {
  stats: {
    totalProperties?: number;
    totalOwners?: number;
    multiOwnerProperties?: number;
    ownersWithMultiplePhones?: number;
  };
}

export const MaryInventoryStatsCards: React.FC<MaryInventoryStatsCardsProps> = ({ stats }) => {
  return (
    <div className="inventory-stats">
      <div className="stat-card">
        <Building2 size={24} />
        <div className="stat-content">
          <span className="stat-value">{stats.totalProperties?.toLocaleString() || 0}</span>
          <span className="stat-label">Total Properties</span>
        </div>
      </div>
      <div className="stat-card">
        <Users size={24} color="#8b5cf6" />
        <div className="stat-content">
          <span className="stat-value">{stats.totalOwners?.toLocaleString() || 0}</span>
          <span className="stat-label">Total Owners</span>
        </div>
      </div>
      <div className="stat-card warning">
        <Users size={24} color="#f59e0b" />
        <div className="stat-content">
          <span className="stat-value">{stats.multiOwnerProperties?.toLocaleString() || 0}</span>
          <span className="stat-label">Multi-Owner</span>
        </div>
      </div>
      <div className="stat-card">
        <Phone size={24} color="#EF4444" />
        <div className="stat-content">
          <span className="stat-value">
            {stats.ownersWithMultiplePhones?.toLocaleString() || 0}
          </span>
          <span className="stat-label">Multi-Phone Owners</span>
        </div>
      </div>
    </div>
  );
};
