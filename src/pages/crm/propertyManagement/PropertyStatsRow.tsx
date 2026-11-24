import React, { FC } from 'react';
import {
  StatsRow,
  StatCard,
  StatValue,
  StatLabel,
} from './PropertyManagementStyles';

export interface PropertyStatsProps {
  stats: {
    total: number;
    available: number;
    reserved: number;
    sold: number;
    totalValue: number;
  };
  formatCurrency: (amount: number) => string;
}

export const PropertyStatsRow: FC<PropertyStatsProps> = ({ stats, formatCurrency }) => {
  return (
    <StatsRow>
      <StatCard $color="#3B82F6">
        <StatValue>{stats.total}</StatValue>
        <StatLabel>Total Properties</StatLabel>
      </StatCard>
      <StatCard $color="#10B981">
        <StatValue>{stats.available}</StatValue>
        <StatLabel>Available</StatLabel>
      </StatCard>
      <StatCard $color="#F59E0B">
        <StatValue>{stats.reserved}</StatValue>
        <StatLabel>Reserved</StatLabel>
      </StatCard>
      <StatCard $color="#EF4444">
        <StatValue>{stats.sold}</StatValue>
        <StatLabel>Sold</StatLabel>
      </StatCard>
      <StatCard $color="#8B5CF6">
        <StatValue>{formatCurrency(stats.totalValue)}</StatValue>
        <StatLabel>Portfolio Value</StatLabel>
      </StatCard>
    </StatsRow>
  );
};
